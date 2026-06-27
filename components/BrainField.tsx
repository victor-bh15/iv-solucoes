"use client";

/**
 * "Dala" — campo de partículas que MORFA no TEMPO entre duas formas: cérebro
 * (/models/brain.fbx) ↔ chip de IA (procedural). Cada forma é amostrada com o
 * MESMO número de pontos; a interpolação posição+cor roda no SHADER (GPU).
 *
 * Cores por altura + sombreamento pela normal. Cérebro em roxo→magenta→âmbar;
 * chip em ciano → azul → ciano. Céu estrelado realista.
 *
 * SCROLL com PLATÔ (curvaScroll) quando controla a página; ou via prop
 * `progressRef` quando um host (HeroBrain) dirige o progresso pela sua seção.
 *
 * MOVIMENTO: gira em Y + balança. A LÂMPADA atravessa a tela + a luz "respira".
 * REPULSÃO: o cursor empurra os pontos de leve (LOCAL e SUTIL); recua ao sair.
 *
 * RESPONSIVO: no mobile reduz a contagem de partículas e o devicePixelRatio.
 * Renderiza só no cliente (WebGL) — montar via dynamic({ ssr: false }).
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useFBX } from "@react-three/drei";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { Suspense, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";

// ---- paletas por forma (cor por altura t∈[0,1], 3 paradas) -------------------
type Paleta = readonly [THREE.Color, THREE.Color, THREE.Color];
const cor = (hex: string) => new THREE.Color(hex);
const P_BRAIN: Paleta = [cor("#7c3aed"), cor("#d946ef"), cor("#f59e0b")]; // roxo → magenta → âmbar
const P_CHIP: Paleta = [cor("#0e7490"), cor("#3b82f6"), cor("#67e8f9")]; //  ciano → azul → ciano (chip/IA)

function corDe(p: Paleta, t: number, out: THREE.Color) {
  if (t < 0.5) out.copy(p[0]).lerp(p[1], t / 0.5);
  else out.copy(p[1]).lerp(p[2], (t - 0.5) / 0.5);
}

const LUZ = new THREE.Vector3(0.4, 1, 0.45).normalize();

/** Morph automático no tempo com HOLD: segura o cérebro (0) e a lâmpada (1)
 *  "completos" por um tempo antes de morfar; transição suave (easeInOut). */
function morphAuto(t: number) {
  const HOLD = 4.0; // segura cada forma "completa" (s)
  const MORPH = 3.0; // transição (s)
  const ciclo = (HOLD + MORPH) * 2;
  const ph = t % ciclo;
  if (ph < HOLD) return 0; // cérebro completo
  if (ph < HOLD + MORPH) {
    const x = (ph - HOLD) / MORPH;
    return x * x * (3 - 2 * x); // cérebro → lâmpada
  }
  if (ph < HOLD * 2 + MORPH) return 1; // lâmpada completa
  const x = (ph - HOLD * 2 - MORPH) / MORPH;
  return 1 - x * x * (3 - 2 * x); // lâmpada → cérebro
}

/** Área de superfície da malha (soma dos triângulos, em world space). */
function areaMesh(mesh: THREE.Mesh) {
  const geo = mesh.geometry;
  const pos = geo.attributes.position;
  const index = geo.index;
  const mw = mesh.matrixWorld;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const cc = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const ntri = index ? index.count / 3 : pos.count / 3;
  let area = 0;
  for (let i = 0; i < ntri; i++) {
    const i0 = index ? index.getX(i * 3) : i * 3;
    const i1 = index ? index.getX(i * 3 + 1) : i * 3 + 1;
    const i2 = index ? index.getX(i * 3 + 2) : i * 3 + 2;
    a.fromBufferAttribute(pos, i0).applyMatrix4(mw);
    b.fromBufferAttribute(pos, i1).applyMatrix4(mw);
    cc.fromBufferAttribute(pos, i2).applyMatrix4(mw);
    area += ab.subVectors(b, a).cross(ac.subVectors(cc, a)).length() * 0.5;
  }
  return area;
}

/** Amostra `count` pontos da superfície de `root`. 1 malha (cérebro) → espaço
 *  local. Multi-peça (lâmpada) → todas as peças nas posições reais (world),
 *  distribuindo os pontos proporcional à área de cada uma. */
function amostrar(root: THREE.Object3D, count: number, rotX: number, paleta: Paleta) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  root.updateMatrixWorld(true);
  const meshes: THREE.Mesh[] = [];
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (m.isMesh && m.geometry) {
      if (!m.geometry.attributes.normal) m.geometry.computeVertexNormals();
      meshes.push(m);
    }
  });
  if (!meshes.length) return { positions, colors };

  const p = new THREE.Vector3();
  const nrm = new THREE.Vector3();
  const c = new THREE.Color();
  const orienta = new THREE.Euler(rotX, 0, 0);
  const escreve = (i: number) => {
    p.applyEuler(orienta);
    nrm.applyEuler(orienta);
    positions[i * 3] = p.x;
    positions[i * 3 + 1] = p.y;
    positions[i * 3 + 2] = p.z;
    corDe(paleta, THREE.MathUtils.clamp((p.y + 1.5) / 3.0, 0, 1), c);
    const brilho = 0.3 + 0.85 * Math.max(0, nrm.dot(LUZ));
    c.multiplyScalar(brilho);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  };

  // --- 1 malha (cérebro): espaço local, intacto ------------------------------
  if (meshes.length === 1) {
    const mt = meshes[0];
    mt.geometry.computeBoundingBox();
    const bb = mt.geometry.boundingBox!;
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    bb.getCenter(center);
    bb.getSize(size);
    const escala = 3.0 / Math.max(size.x, size.y, size.z);
    const sampler = new MeshSurfaceSampler(mt).build();
    for (let i = 0; i < count; i++) {
      sampler.sample(p, nrm);
      p.sub(center).multiplyScalar(escala);
      escreve(i);
    }
    return { positions, colors };
  }

  // --- multi-peça (lâmpada): world space, todas as peças ---------------------
  const box = new THREE.Box3();
  const areas: number[] = [];
  let areaTot = 0;
  for (const m of meshes) {
    m.geometry.computeBoundingBox();
    box.union(m.geometry.boundingBox!.clone().applyMatrix4(m.matrixWorld));
    const ar = areaMesh(m);
    areas.push(ar);
    areaTot += ar;
  }
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  box.getCenter(center);
  box.getSize(size);
  const escala = 3.0 / Math.max(size.x, size.y, size.z);
  const normalMat = new THREE.Matrix3();

  let escrito = 0;
  for (let mi = 0; mi < meshes.length; mi++) {
    const m = meshes[mi];
    const sampler = new MeshSurfaceSampler(m).build();
    normalMat.getNormalMatrix(m.matrixWorld);
    const n =
      mi === meshes.length - 1
        ? count - escrito
        : Math.min(count - escrito, Math.round((count * areas[mi]) / (areaTot || 1)));
    for (let k = 0; k < n; k++) {
      sampler.sample(p, nrm);
      p.applyMatrix4(m.matrixWorld).sub(center).multiplyScalar(escala);
      nrm.applyMatrix3(normalMat).normalize();
      escreve(escrito + k);
    }
    escrito += n;
  }
  return { positions, colors };
}

/** Monta um CHIP de IA (QFP) VIRADO PARA A CÂMERA: corpo + die central + pinos
 *  nas 4 bordas, no plano XY (face em +Z). */
function criarChip(): THREE.Group {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.0, 0.26))); // corpo (face em +Z)
  g.add(new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.34))); // die central
  const nPinos = 9;
  const passo = 0.2;
  const pinoV = new THREE.BoxGeometry(0.09, 0.42, 0.08); // pino vertical (top/bottom)
  const pinoH = new THREE.BoxGeometry(0.42, 0.09, 0.08); // pino horizontal (left/right)
  for (let i = 0; i < nPinos; i++) {
    const off = (i - (nPinos - 1) / 2) * passo;
    const top = new THREE.Mesh(pinoV);
    top.position.set(off, 1.18, 0);
    g.add(top);
    const bot = new THREE.Mesh(pinoV);
    bot.position.set(off, -1.18, 0);
    g.add(bot);
    const lef = new THREE.Mesh(pinoH);
    lef.position.set(-1.18, off, 0);
    g.add(lef);
    const rig = new THREE.Mesh(pinoH);
    rig.position.set(1.18, off, 0);
    g.add(rig);
  }
  g.updateMatrixWorld(true);
  return g;
}

/** "IV" em partículas BRANCAS, no plano da face do chip (logo à frente). */
function amostrarIV(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const W = 256;
  const H = 256;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { positions, colors };
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "900 150px Arial, Helvetica, sans-serif";
  ctx.fillText("IV", W / 2, H / 2);
  const data = ctx.getImageData(0, 0, W, H).data;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4 + 3] > 128) {
        xs.push(x);
        ys.push(y);
      }
    }
  }
  const nc = xs.length;
  const escala = 1.15 / W; // largura ~1,15 u (cabe no die do chip)
  for (let i = 0; i < count; i++) {
    const k = nc > 0 ? Math.floor(Math.random() * nc) : 0;
    const px = (xs[k] ?? W / 2) + (Math.random() - 0.5) * 2;
    const py = (ys[k] ?? H / 2) + (Math.random() - 0.5) * 2;
    positions[i * 3] = (px - W / 2) * escala;
    positions[i * 3 + 1] = -(py - H / 2) * escala;
    positions[i * 3 + 2] = 0.2; // à frente da face do chip
    colors[i * 3] = 1;
    colors[i * 3 + 1] = 1;
    colors[i * 3 + 2] = 1; // branco
  }
  return { positions, colors };
}

/** Forma "chip de IA" = chip (ciano) + "IV" branco gravado na face. */
function amostrarChipIV(count: number) {
  const nIV = Math.floor(count * 0.26);
  const nChip = count - nIV;
  const chip = amostrar(criarChip(), nChip, 0, P_CHIP);
  const iv = amostrarIV(nIV);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  positions.set(chip.positions, 0);
  colors.set(chip.colors, 0);
  positions.set(iv.positions, nChip * 3);
  colors.set(iv.colors, nChip * 3);
  return { positions, colors };
}

// ---- campo de estrelas realista --------------------------------------------
const EST_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aFase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vColor = aColor;
    vTwinkle = 0.65 + 0.35 * sin(uTime * 1.3 + aFase);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (250.0 / -mv.z);
  }
`;
const EST_FRAG = /* glsl */ `
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor * vTwinkle, pow(core, 2.5));
  }
`;

function CampoEstrelas({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const fases = new Float32Array(count);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 50 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.5 + Math.pow(Math.random(), 6) * 4.2;
      const temp = Math.random();
      if (temp < 0.12) c.setRGB(0.72, 0.82, 1.0);
      else if (temp < 0.55) c.setRGB(1.0, 1.0, 1.0);
      else if (temp < 0.85) c.setRGB(1.0, 0.94, 0.78);
      else c.setRGB(1.0, 0.8, 0.62);
      const brilho = 0.35 + Math.random() * 0.65;
      colors[i * 3] = c.r * brilho;
      colors[i * 3 + 1] = c.g * brilho;
      colors[i * 3 + 2] = c.b * brilho;
      fases[i] = Math.random() * Math.PI * 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("aFase", new THREE.BufferAttribute(fases, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    }),
    [],
  );

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.004;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={EST_VERT}
        fragmentShader={EST_FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const VERT = /* glsl */ `
  attribute vec3 aPosA; attribute vec3 aPosB;
  attribute vec3 aColA; attribute vec3 aColB;
  uniform float uProgress;   // 0..1  (0=cérebro, 1=lâmpada)
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uPulse;
  uniform vec2 uMouse;
  uniform float uAspect;
  varying vec3 vColor;
  void main() {
    vec3 pos = mix(aPosA, aPosB, uProgress);
    vColor = mix(aColA, aColB, uProgress) * (1.0 + uPulse);
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec4 clip = projectionMatrix * mv;

    // repulsão local e sutil
    vec2 ndc = clip.xy / clip.w;
    vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
    float dist = length(d);
    float raio = 0.16;
    float f = smoothstep(raio, 0.0, dist);
    vec2 dir = dist > 0.0001 ? d / dist : vec2(0.0, 1.0);
    vec2 push = dir * f * 0.05;
    push.x /= uAspect;
    clip.xy += push * clip.w;

    gl_Position = clip;
    gl_PointSize = uSize * uPixelRatio * (1.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.15, d);
    gl_FragColor = vec4(vColor, a);
  }
`;

function MorphPontos({
  count,
  pointSize,
  progressRef,
  auto,
}: {
  count: number;
  pointSize: number;
  progressRef: RefObject<number>;
  auto: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const alvoMouse = useRef(new THREE.Vector2(99, 99));
  const brain = useFBX("/models/brain.fbx");
  const { viewport } = useThree();

  // repulsão lê o mouse no WINDOW (funciona mesmo como fundo global
  // pointer-events-none, com o conteúdo do site por cima)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      alvoMouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    const onLeave = () => alvoMouse.current.set(99, 99);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const geometry = useMemo(() => {
    const a = amostrar(brain, count, -Math.PI / 2, P_BRAIN); // FBX do cérebro vinha deitado
    const b = amostrarChipIV(count); // chip de IA + "IV" branco na face
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(a.positions, 3)); // base
    g.setAttribute("aPosA", new THREE.BufferAttribute(a.positions, 3));
    g.setAttribute("aPosB", new THREE.BufferAttribute(b.positions, 3));
    g.setAttribute("aColA", new THREE.BufferAttribute(a.colors, 3));
    g.setAttribute("aColB", new THREE.BufferAttribute(b.colors, 3));
    return g;
  }, [brain, count]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uSize: { value: pointSize },
      uPixelRatio: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
      uPulse: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uAspect: { value: 1 },
    }),
    [pointSize],
  );

  useFrame((state, dt) => {
    const pts = ref.current;
    const mat = matRef.current;
    if (!pts || !mat) return;
    const t = state.clock.elapsedTime;
    // morph AUTOMÁTICO com HOLD (cérebro e lâmpada ficam "completos" mais tempo
    // antes de morfar); ou segue o progressRef se controlado externamente.
    const alvo = auto ? morphAuto(t) : (progressRef.current ?? 0);
    const u = mat.uniforms.uProgress;
    u.value += (alvo - u.value) * Math.min(1, dt * 3);
    const pl = THREE.MathUtils.clamp(u.value, 0, 1); // peso da lâmpada (0=cérebro, 1=lâmpada)

    // gira POUCO: oscilação leve (vai e volta, sem dar voltas) — fica estável na
    // forma; o chip se alinha de frente (p/ ler "IV"). Deriva ampla pela tela.
    const w = state.viewport.width;
    pts.rotation.y = Math.sin(t * 0.1) * 0.4 * (1 - pl);
    pts.rotation.x = Math.sin(t * 0.13) * 0.14 * (1 - 0.85 * pl);
    pts.rotation.z = Math.sin(t * 0.09) * 0.06 * (1 - 0.85 * pl);
    // trajetória ORGÂNICA (ondas com frequências incomensuráveis → quase nunca
    // repete) + PROFUNDIDADE 3D (aproxima/afasta, dá dimensão ao percurso)
    const driftAmp = 1 - 0.5 * pl;
    pts.position.x =
      (Math.sin(t * 0.107) * w * 0.15 + Math.sin(t * 0.043) * w * 0.09 + Math.cos(t * 0.071) * w * 0.06) *
      driftAmp;
    pts.position.y =
      (Math.sin(t * 0.083) * 0.75 + Math.cos(t * 0.037) * 0.5 + Math.sin(t * 0.131) * 0.25) * driftAmp;
    pts.position.z = (Math.sin(t * 0.061) * 0.6 + Math.cos(t * 0.029) * 0.35) * (1 - 0.4 * pl);
    // o chip "processa" — leve pulso de brilho
    mat.uniforms.uPulse.value = Math.sin(t * 2.2) * 0.1 * pl;

    // repulsão segue o alvo (mouse no window) com arrasto suave
    mat.uniforms.uMouse.value.lerp(alvoMouse.current, 1 - Math.pow(0.0016, dt));
    mat.uniforms.uAspect.value = state.size.width / state.size.height;
  });

  const scale = Math.min(1, viewport.width / 5.4);

  return (
    <points ref={ref} geometry={geometry} scale={scale}>
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

export function BrainField({ progressRef: externalProgress }: { progressRef?: RefObject<number> } = {}) {
  // init correto já na 1ª render (componente é dynamic ssr:false → window existe)
  const mqStr = "(max-width: 768px), (pointer: coarse)";
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(mqStr).matches,
  );
  const [reduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const internalProgress = useRef(0);
  const progressRef = externalProgress ?? internalProgress;

  useEffect(() => {
    const mq = window.matchMedia(mqStr);
    const on = () => setIsMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Performance: no mobile reduz densidade e resolução (LCP/INP/bateria); cheio no PC.
  const count = isMobile ? 16000 : 40000;
  const pointSize = isMobile ? 13 : 10;
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5];

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={dpr}
        frameloop={reduce ? "demand" : "always"}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
      >
        {/* céu estrelado realista ao fundo (tamanhos/cores variados + cintilação) */}
        <CampoEstrelas count={2400} />
        <Suspense fallback={null}>
          <MorphPontos
            count={count}
            pointSize={pointSize}
            progressRef={progressRef}
            auto={!externalProgress}
          />
        </Suspense>
        <EffectComposer>
          {/* bloom CONTIDO no mobile (tela menor satura) e cheio no PC */}
          <Bloom
            intensity={isMobile ? 0.5 : 0.95}
            luminanceThreshold={isMobile ? 0.42 : 0.16}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

useFBX.preload("/models/brain.fbx");
