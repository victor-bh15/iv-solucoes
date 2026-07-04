"use client";

import { useEffect, useRef } from "react";

/**
 * HORIZONTE IV — cena de amanhecer em WebGL puro.
 * Shader autoral com a paleta oficial: #010204 (céu noturno) → #01284F (Azul IV)
 * → luz nascendo na linha do horizonte. O ponto de luz é o mesmo "ponto" da logo IV.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;   // 0..1 (suavizado no JS)
uniform float uScroll;  // 0..1 progresso de scroll do hero

// Paleta oficial IV
const vec3 NIGHT = vec3(0.0039, 0.0078, 0.0157); // #010204
const vec3 DEEP  = vec3(0.0118, 0.0549, 0.1412); // #030E24
const vec3 NAVY  = vec3(0.0039, 0.1569, 0.3098); // #01284F
const vec3 MIST  = vec3(0.4902, 0.5882, 0.7020); // #7D96B3 azul-névoa
const vec3 DAWN  = vec3(0.9200, 0.9600, 1.0000); // luz fria do amanhecer

float hash21(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

// estrelas procedurais com cintilação
float stars(vec2 uv, float density, float t) {
  vec2 grid = uv * density;
  vec2 id = floor(grid);
  vec2 gv = fract(grid) - 0.5;
  float h = hash21(id);
  if (h < 0.92) return 0.0;
  vec2 offset = vec2(hash21(id + 1.7), hash21(id + 4.3)) - 0.5;
  float d = length(gv - offset * 0.7);
  float twinkle = 0.6 + 0.4 * sin(t * (1.0 + h * 3.0) + h * 6.28);
  float star = smoothstep(0.08, 0.0, d) * twinkle;
  return star * smoothstep(0.92, 1.0, h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;

  // parallax sutil do mouse
  vec2 par = (uMouse - 0.5) * vec2(0.025, 0.012);
  vec2 p = uv + par;

  // linha do horizonte (sobe levemente com o scroll — viagem em direção à luz)
  // baixa o suficiente p/ o bloco de texto viver em céu escuro, sem disputar com a luz
  float horizon = 0.22 + uScroll * 0.06;

  // amanhecer "respira" devagar
  float breath = 0.95 + 0.1 * sin(uTime * 0.22);

  // posição do sol nascente — eco do ponto da logo (à direita, acima do horizonte)
  vec2 sunPos = vec2(0.615 - par.x * 2.2, horizon + 0.055 + uScroll * 0.05);
  vec2 sunDelta = (p - sunPos) * vec2(aspect, 1.0);
  float sunDist = length(sunDelta);

  vec3 col;

  if (p.y > horizon) {
    // ---- CÉU ----
    float t = (p.y - horizon) / (1.0 - horizon); // 0 no horizonte, 1 no topo
    // gradiente da marca: luz no horizonte -> NAVY -> DEEP no topo
    // (dia chegando: o topo não fecha em preto puro)
    vec3 sky = mix(NAVY * 1.25, DEEP, smoothstep(0.0, 0.6, t));
    sky = mix(sky, mix(DEEP, NIGHT, 0.55), smoothstep(0.5, 1.05, t));
    sky += NAVY * 0.12; // luz ambiente do amanhecer

    // brilho do amanhecer concentrado na linha do horizonte (mais alto e presente)
    float glowBand = exp(-t * 4.5) * breath;
    vec3 glowColor = mix(MIST, DAWN, 0.4);
    sky += glowColor * glowBand * 0.7;

    // halo radial do sol
    float halo = exp(-sunDist * 5.5) * 0.55 * breath;
    float core = smoothstep(0.028, 0.008, sunDist);
    sky += glowColor * halo;
    sky += DAWN * core;

    // estrelas: só no céu alto, desaparecem perto da luz
    float starField = stars(p * vec2(aspect, 1.0), 42.0, uTime);
    starField += stars(p * vec2(aspect, 1.0) + 7.31, 90.0, uTime * 0.7) * 0.6;
    float starFade = smoothstep(0.15, 0.55, t) * (1.0 - glowBand * 1.4);
    sky += vec3(0.85, 0.9, 1.0) * starField * max(starFade, 0.0) * 0.85;

    col = sky;
  } else {
    // ---- MAR / SOLO ESCURO ----
    float d = (horizon - p.y) / horizon; // 0 no horizonte, 1 embaixo
    vec3 sea = mix(DEEP * 1.15, mix(NIGHT, DEEP, 0.4), smoothstep(0.0, 0.7, d));

    // reflexo da luz: coluna vertical sob o sol, trêmula
    float ripple = sin(p.y * 190.0 + uTime * 0.9) * 0.5 + 0.5;
    float column = exp(-pow(abs(p.x - sunPos.x) * aspect, 2.0) * 60.0);
    float reflFade = exp(-d * 5.0);
    vec3 glowColor = mix(MIST, DAWN, 0.35);
    sea += glowColor * column * reflFade * (0.10 + 0.10 * ripple) * breath;

    // brilho difuso do céu refletido perto da linha
    sea += NAVY * exp(-d * 7.0) * 0.7;
    sea += glowColor * exp(-d * 12.0) * 0.15 * breath;

    col = sea;
  }

  // linha do horizonte: um fio de luz (1px de rigor — o traço da IV)
  float lineGlow = exp(-abs(p.y - horizon) * uRes.y * 0.55);
  col += mix(MIST, DAWN, 0.5) * lineGlow * 0.30 * breath;

  // vinheta sóbria (mais leve — a cena não pode "apagar" nas bordas)
  float vig = 1.0 - 0.22 * pow(length((uv - 0.5) * vec2(1.25, 1.0)), 2.2);
  col *= vig;

  // dithering: mata o banding do gradiente escuro
  float dither = (hash21(gl_FragCoord.xy) - 0.5) / 255.0 * 2.0;
  col += dither;

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function HorizonHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return; // fallback: fica o gradiente CSS do container

    // --- compilação ---
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // quad de tela cheia
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uScroll = gl.getUniformLocation(prog, "uScroll");

    // --- estado ---
    const mouse = { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 }; // s* = suavizado
    let scroll = 0;
    let raf = 0;
    let covered = false; // cena totalmente encoberta pelo conteúdo → não desenhar
    let lost = false; // contexto WebGL perdido → canvas some, fica o gradiente CSS
    const start = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (reduced && !lost) raf = requestAnimationFrame(drawStatic);
    };

    const draw = (t: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.sx, mouse.sy);
      gl.uniform1f(uScroll, scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const drawStatic = () => draw(0);

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1 - e.clientY / window.innerHeight;
    };
    const onScroll = () => {
      const vh = window.innerHeight;
      scroll = Math.min(window.scrollY / vh, 1);
      // cena visível no hero e na seção #contato; entre os dois está encoberta
      const contato = document.getElementById("contato");
      const heroGone = window.scrollY > vh * 1.2;
      const contatoVisivel = contato
        ? window.scrollY + vh > contato.offsetTop + vh * 0.1
        : true;
      covered = heroGone && !contatoVisivel;
    };

    // perda de contexto (pressão de GPU no mobile etc.): canvas some,
    // o gradiente CSS do wrapper assume — nunca tela preta
    const onContextLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      cancelAnimationFrame(raf);
      canvas.style.display = "none";
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    window.addEventListener("resize", resize);
    resize();
    if (!reduced) {
      window.addEventListener("mousemove", onMouse);
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const frame = () => {
      // suavização do parallax (lerp)
      mouse.sx += (mouse.x - mouse.sx) * 0.04;
      mouse.sy += (mouse.y - mouse.sy) * 0.04;
      if (!covered) draw((performance.now() - start) / 1000);
      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      // sem loop: 1 frame estático (redesenha só em resize) — zero movimento
      raf = requestAnimationFrame(drawStatic);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    // wrapper com o gradiente da marca: fallback p/ sem-WebGL e p/ contexto perdido
    <div
      aria-hidden
      className="fixed inset-0"
      style={{ background: "linear-gradient(#010204, #01284F 65%, #010204)" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
