"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Clapperboard } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";
import { useLang } from "@/components/providers/LanguageProvider";

/**
 * Seção de apresentação em vídeo.
 *
 * Custo R$ 0: nada é baixado ou incorporado até ser necessário.
 * Para publicar o vídeo, escolha UMA das opções abaixo:
 *
 *  1) Arquivo próprio (RECOMENDADO — leve, sem dependência externa):
 *     coloque o MP4 em `public/video/apresentacao.mp4` e um frame em
 *     `public/video/apresentacao.jpg`, depois preencha:
 *       VIDEO_SRC = "/video/apresentacao.mp4"
 *       POSTER_SRC = "/video/apresentacao.jpg"   (opcional, mas recomendado)
 *     Com VIDEO_SRC definido, o clipe toca em autoplay mudo + loop (sem som),
 *     respeitando prefers-reduced-motion (nesse caso mostra só o pôster + play).
 *
 *  2) YouTube/Vimeo: defina EMBED_URL com a URL de incorporação, ex.:
 *     "https://www.youtube.com/embed/SEU_ID". O iframe só carrega após o clique
 *     (facade leve) — não pesa no carregamento da página.
 *
 * Enquanto ambos estiverem vazios, mostramos um pôster premium com o estado
 * "vídeo em breve" — casando com a identidade escura/futurista do site.
 */
const VIDEO_SRC: string = ""; // ex.: "/video/apresentacao.mp4" — vazio = sem vídeo (seção fora da home)
const POSTER_SRC: string = ""; // ex.: "/video/apresentacao.jpg"
const EMBED_URL: string = ""; // ex.: "https://www.youtube.com/embed/SEU_ID"

const hasVideo = VIDEO_SRC !== "" || EMBED_URL !== "";

export function Video({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLang();
  const reduce = useReducedMotion();

  // Autoplay mudo + loop para arquivo próprio, exceto se o usuário pedir
  // prefers-reduced-motion (aí mostramos só pôster + botão play).
  const autoplay = VIDEO_SRC !== "" && !reduce;
  const sectionRef = useRef<HTMLElement>(null);

  // Só começa a tocar (e a baixar o vídeo) quando a seção entra no viewport —
  // assim o arquivo não pesa no carregamento inicial da página.
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!autoplay) return;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPlaying(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoplay]);

  return (
    <section ref={sectionRef} id="video" className="relative overflow-hidden py-20 sm:py-28">
      <AuroraBackground variant="subtle" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            eyebrow={t.video.eyebrow}
            title={t.video.title}
            subtitle={t.video.subtitle}
          />
        )}

        <Reveal className="mt-14">
          <div className="group relative mx-auto aspect-video w-full overflow-hidden rounded-2xl border border-border bg-navy-950 shadow-xl shadow-navy-900/20">
            {/* Barra superior estilo "janela", igual ao padrão do Portfólio */}
            <div className="absolute inset-x-0 top-0 z-20 flex h-8 items-center gap-1.5 bg-navy-900/80 px-3.5 backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="ml-2 truncate text-[11px] font-medium text-white/40">
                {t.video.caption}
              </span>
            </div>

            {/* Conteúdo do player */}
            {playing && VIDEO_SRC ? (
              <Clip
                src={VIDEO_SRC}
                poster={POSTER_SRC || undefined}
                autoplay={autoplay}
                label={t.video.caption}
              />
            ) : playing && EMBED_URL ? (
              <iframe
                src={`${EMBED_URL}${EMBED_URL.includes("?") ? "&" : "?"}autoplay=1`}
                title={t.video.caption}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Poster
                reduce={reduce}
                hasVideo={hasVideo}
                posterSrc={POSTER_SRC}
                playLabel={t.video.play}
                soon={t.video.soon}
                soonDesc={t.video.soonDesc}
                onPlay={() => setPlaying(true)}
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Player de arquivo próprio: autoplay mudo + loop, ou controles se acionado por clique. */
function Clip({
  src,
  poster,
  autoplay,
  label,
}: {
  src: string;
  poster?: string;
  autoplay: boolean;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Garante o autoplay mudo em navegadores que exigem interação programática.
  useEffect(() => {
    if (autoplay) {
      ref.current?.play().catch(() => {
        // Se o navegador bloquear o autoplay, o pôster/controles seguem visíveis.
      });
    }
  }, [autoplay]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
      // Quando é autoplay decorativo: sem controles, mudo, em loop.
      // Quando acionado por clique (reduced-motion): mostra controles e som.
      controls={!autoplay}
      autoPlay={autoplay}
      muted={autoplay}
      loop={autoplay}
      playsInline
      preload="none"
    />
  );
}

/** Pôster — usa imagem própria se houver, senão um fundo CSS leve e premium. */
function Poster({
  reduce,
  hasVideo,
  posterSrc,
  playLabel,
  soon,
  soonDesc,
  onPlay,
}: {
  reduce: boolean | null;
  hasVideo: boolean;
  posterSrc: string;
  playLabel: string;
  soon: string;
  soonDesc: string;
  onPlay: () => void;
}) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-black">
      {/* Imagem de pôster, se fornecida */}
      {posterSrc && (
        // eslint-disable-next-line @next/next/no-img-element -- pôster decorativo full-bleed; next/image não agrega aqui
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
      )}

      {/* Grade técnica sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
      />
      {/* Brilho central */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-navy-400/20 blur-[100px]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        {hasVideo ? (
          <motion.button
            type="button"
            onClick={onPlay}
            aria-label={playLabel}
            whileHover={reduce ? undefined : { scale: 1.06 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            {/* Pulso sutil ao redor do play */}
            {!reduce && (
              <span className="absolute inset-0 animate-ping rounded-full bg-white/10" />
            )}
            <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
          </motion.button>
        ) : (
          <>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white/80 ring-1 ring-white/15 backdrop-blur">
              <Clapperboard className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-white/90">
                {soon}
              </p>
              <p className="mx-auto mt-1.5 max-w-sm text-sm text-white/55">
                {soonDesc}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
