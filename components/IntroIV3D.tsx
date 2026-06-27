"use client";

/**
 * Abertura 3D (WebGL): partículas espalhadas no espaço se juntam formando
 * "IV Soluções" + um CHIP (azul, com "IV" branco) ao lado — bem ALINHADO (texto
 * quase plano, pontos nítidos, bloom suave). Seguram e dispersam revelando o
 * site. Controlada pelo `dispersingRef`. Renderiza só no cliente (ssr:false).
 *
 * A cor de cada partícula vem do PIXEL desenhado (texto = gradiente azul→branco;
 * chip = azul; "IV" do chip = branco).
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

const VERT = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (11.0 / -mv.z);
  }
`;
const FRAG = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, pow(a, 1.6) * uOpacity);
  }
`;

function seg(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
/** Desenha um CHIP de IA REALISTA (azul), com pinos, trilhas de circuito, die
 *  central e "IV" branco. Centrado em (cx,cy), lado `s`. */
function desenharChip(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  const h = s / 2;
  const AZUL = "#2563eb";
  const AZUL_CLARO = "#7cb0ff";
  const AZUL_ESC = "#15307a";
  const pinLen = s * 0.16;
  const pinW = s * 0.06; // largura do pino (grosso/sólido)
  const nP = 7; // pinos por lado
  const passo = s * 0.118;
  const dieH = s * 0.27; // meio-lado do die

  // 1) PINOS sólidos (pads retangulares grossos, como num chip real)
  ctx.fillStyle = AZUL_CLARO;
  for (let i = 0; i < nP; i++) {
    const off = (i - (nP - 1) / 2) * passo;
    ctx.fillRect(cx + off - pinW / 2, cy - h - pinLen, pinW, pinLen); // top
    ctx.fillRect(cx + off - pinW / 2, cy + h, pinW, pinLen); // bottom
    ctx.fillRect(cx - h - pinLen, cy + off - pinW / 2, pinLen, pinW); // left
    ctx.fillRect(cx + h, cy + off - pinW / 2, pinLen, pinW); // right
  }

  // 2) CORPO (azul) + bevel interno
  ctx.fillStyle = AZUL;
  roundRect(ctx, cx - h, cy - h, s, s, s * 0.1);
  ctx.fill();
  ctx.strokeStyle = AZUL_CLARO;
  ctx.lineWidth = Math.max(1.5, s * 0.02);
  roundRect(ctx, cx - h + s * 0.05, cy - h + s * 0.05, s * 0.9, s * 0.9, s * 0.07);
  ctx.stroke();

  // 3) TRILHAS de circuito (do die até cada pino)
  ctx.strokeStyle = AZUL_CLARO;
  ctx.lineWidth = Math.max(1, s * 0.013);
  for (let i = 0; i < nP; i++) {
    const off = (i - (nP - 1) / 2) * passo;
    seg(ctx, cx + off, cy - h + s * 0.05, cx + off, cy - dieH);
    seg(ctx, cx + off, cy + h - s * 0.05, cx + off, cy + dieH);
    seg(ctx, cx - h + s * 0.05, cy + off, cx - dieH, cy + off);
    seg(ctx, cx + h - s * 0.05, cy + off, cx + dieH, cy + off);
  }

  // 4) DIE central (silício)
  ctx.fillStyle = AZUL_ESC;
  roundRect(ctx, cx - dieH, cy - dieH, dieH * 2, dieH * 2, s * 0.03);
  ctx.fill();
  ctx.strokeStyle = AZUL_CLARO;
  ctx.lineWidth = Math.max(1, s * 0.014);
  roundRect(ctx, cx - dieH, cy - dieH, dieH * 2, dieH * 2, s * 0.03);
  ctx.stroke();

  // 5) "IV" branco no die
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = `800 ${Math.round(dieH * 1.15)}px Arial, Helvetica, sans-serif`;
  ctx.fillText("IV", cx, cy + dieH * 0.04);
  ctx.textAlign = "left";

  // 6) marca de orientação (círculo no canto sup-esq)
  ctx.fillStyle = AZUL_CLARO;
  ctx.beginPath();
  ctx.arc(cx - h + s * 0.14, cy - h + s * 0.14, s * 0.028, 0, Math.PI * 2);
  ctx.fill();
}

function Particulas({
  dispersingRef,
  isMobile,
}: {
  dispersingRef: RefObject<boolean>;
  isMobile: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const startRef = useRef(0);
  const velRef = useRef<Float32Array | null>(null);

  const dados = useMemo(() => {
    const W = 1800;
    const H = 440;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const ctx = cv.getContext("2d", { willReadFrequently: true });
    const vazio = new Float32Array(0);
    if (!ctx) return { g: new THREE.BufferGeometry(), positions: vazio, alvos: vazio, fases: vazio, n: 0 };

    const txt = "IV Soluções";
    const fonte = (px: number) => `800 ${px}px "Space Grotesk", Inter, Arial, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    let fs = 210;
    ctx.font = fonte(fs);
    while (ctx.measureText(txt).width > W * 0.86 && fs > 28) {
      fs -= 4;
      ctx.font = fonte(fs);
    }
    const txtW = ctx.measureText(txt).width;
    const x0 = (W - txtW) / 2; // centraliza o texto

    // texto (gradiente azul → branco → azul)
    const grad = ctx.createLinearGradient(x0, 0, x0 + txtW, 0);
    grad.addColorStop(0, "#2563eb");
    grad.addColorStop(0.5, "#e8f1ff");
    grad.addColorStop(1, "#3b82f6");
    ctx.fillStyle = grad;
    ctx.fillText(txt, x0, H / 2);

    const data = ctx.getImageData(0, 0, W, H).data;
    const step = isMobile ? 3 : 2; // densidade alta (~4K)
    const txs: number[] = [];
    const tys: number[] = [];
    const cr: number[] = [];
    const cg: number[] = [];
    const cb: number[] = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4;
        if (data[idx + 3] > 128) {
          txs.push(x);
          tys.push(y);
          cr.push(data[idx]);
          cg.push(data[idx + 1]);
          cb.push(data[idx + 2]);
        }
      }
    }
    const n = txs.length;
    const positions = new Float32Array(n * 3);
    const alvos = new Float32Array(n * 3);
    const colors = new Float32Array(n * 3);
    const sizes = new Float32Array(n);
    const fases = new Float32Array(n);
    const c = new THREE.Color();
    const esc = 7.2 / W;
    for (let i = 0; i < n; i++) {
      alvos[i * 3] = (txs[i] - W / 2) * esc;
      alvos[i * 3 + 1] = -(tys[i] - H / 2) * esc;
      alvos[i * 3 + 2] = (Math.random() - 0.5) * 0.1; // quase PLANO (alinhado)
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;
      c.setRGB(cr[i] / 255, cg[i] / 255, cb[i] / 255);
      c.convertSRGBToLinear();
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 0.8 + Math.random() * 0.7;
      fases[i] = Math.random() * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    return { g, positions, alvos, fases, n };
  }, [isMobile]);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
      uOpacity: { value: 1 },
    }),
    [],
  );

  useFrame((state, dt) => {
    const { positions, alvos, fases, n } = dados;
    if (!n) return;
    if (!startRef.current) startRef.current = state.clock.elapsedTime;
    const el = state.clock.elapsedTime - startRef.current;
    const SPREAD = 2.5;
    const FORM = 2.2;
    const disp = dispersingRef.current;

    if (disp) {
      if (!velRef.current) velRef.current = new Float32Array(n * 3);
      const vel = velRef.current;
      for (let i = 0; i < n; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        const d = Math.hypot(x, y, z) || 1;
        vel[i * 3] += (x / d) * 0.05;
        vel[i * 3 + 1] += (y / d) * 0.05;
        vel[i * 3 + 2] += (z / d) * 0.05;
        positions[i * 3] += vel[i * 3];
        positions[i * 3 + 1] += vel[i * 3 + 1];
        positions[i * 3 + 2] += vel[i * 3 + 2];
      }
      if (matRef.current) {
        matRef.current.uniforms.uOpacity.value = Math.max(
          0,
          matRef.current.uniforms.uOpacity.value - dt * 1.6,
        );
      }
    } else if (el < SPREAD) {
      const tt = state.clock.elapsedTime;
      for (let i = 0; i < n; i++) {
        positions[i * 3] += Math.sin(tt * 0.5 + fases[i]) * 0.004;
        positions[i * 3 + 1] += Math.cos(tt * 0.5 + fases[i] * 1.3) * 0.004;
      }
    } else {
      // SE JUNTA: converge firme para o alvo (assenta bem alinhado)
      const t = Math.min(1, (el - SPREAD) / FORM);
      const k = 0.04 + t * 0.16;
      for (let i = 0; i < n; i++) {
        positions[i * 3] += (alvos[i * 3] - positions[i * 3]) * k;
        positions[i * 3 + 1] += (alvos[i * 3 + 1] - positions[i * 3 + 1]) * k;
        positions[i * 3 + 2] += (alvos[i * 3 + 2] - positions[i * 3 + 2]) * k;
      }
    }
    dados.g.attributes.position.needsUpdate = true;

    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.025; // quase parado
      ref.current.scale.setScalar(Math.min(1, state.viewport.width / 8.5));
    }
  });

  return (
    <points ref={ref} geometry={dados.g}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function IntroIV3D({ dispersingRef }: { dispersingRef: RefObject<boolean> }) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      dpr={isMobile ? [1, 1.25] : [1, 2]}
      gl={{ antialias: !isMobile, alpha: true }}
    >
      <Particulas dispersingRef={dispersingRef} isMobile={isMobile} />
      <EffectComposer>
        {/* bloom contido no mobile (não estoura sobre o "IV Soluções") */}
        <Bloom
          intensity={isMobile ? 0.22 : 0.38}
          luminanceThreshold={isMobile ? 0.62 : 0.55}
          luminanceSmoothing={0.5}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
