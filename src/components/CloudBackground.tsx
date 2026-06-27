/**
 * Nuvem densa procedural (violeta) — substitui a grade laranja antiga.
 * Sem imagem pesada, sem WebGL/Three.js: SVG feTurbulence (fumaça real) +
 * brilhos radiais. Drift por transform/opacity (GPU). aria-hidden.
 */
export default function CloudBackground({
  variant = 'hero',
}: {
  variant?: 'hero' | 'soft';
}) {
  const dense = variant === 'hero';
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Corpo colorido da nuvem — brilhos radiais violeta */}
      <div className="absolute inset-0 cloud-drift">
        <div
          className="absolute top-[-10%] left-[-5%] w-[70%] h-[80%] rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(124,108,255,0.42), transparent 65%)' }}
        />
        <div
          className="absolute top-[20%] right-[-10%] w-[65%] h-[75%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(91,74,224,0.38), transparent 65%)' }}
        />
        <div
          className="absolute bottom-[-15%] left-[25%] w-[60%] h-[70%] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(150,134,255,0.30), transparent 70%)' }}
        />
      </div>

      {/* Textura de fumaça — feTurbulence, duas camadas com drift independente */}
      <svg
        className="absolute inset-0 w-full h-full cloud-drift-slow"
        style={{ opacity: dense ? 0.55 : 0.28 }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <defs>
          <filter id="smoke-a" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.0085 0.013"
              numOctaves="4"
              seed="11"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.486
                      0 0 0 0 0.424
                      0 0 0 0 1
                      0 0 0 1.5 -0.5"
            />
          </filter>
          <filter id="smoke-b" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.009"
              numOctaves="3"
              seed="29"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.59
                      0 0 0 0 0.52
                      0 0 0 0 1
                      0 0 0 1.3 -0.42"
            />
          </filter>
        </defs>
        <rect width="800" height="600" filter="url(#smoke-a)" />
        <rect width="800" height="600" filter="url(#smoke-b)" opacity="0.7" />
      </svg>

      {/* Vinheta inferior — funde a nuvem no fundo das seções seguintes */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
      />
    </div>
  );
}
