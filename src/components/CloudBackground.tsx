/**
 * Fundo procedural — substitui a grade antiga.
 * Sem imagem pesada, sem WebGL/Three.js: SVG feTurbulence (fumaça real) +
 * brilhos radiais. Drift por transform (GPU). aria-hidden.
 *
 * variant:
 *  - 'hero'   : nuvem azul densa (topo do site)
 *  - 'soft'   : nuvem azul suave (meio/baixo, p/ a nuvem aparecer mais embaixo)
 *  - 'desert' : nuvem de areia varrendo (parte final do site)
 */
export default function CloudBackground({
  variant = 'hero',
}: {
  variant?: 'hero' | 'soft' | 'desert';
}) {
  if (variant === 'desert') return <DesertDust />;

  const dense = variant === 'hero';
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* Corpo colorido da nuvem — brilhos radiais azuis */}
      <div className="absolute inset-0 cloud-drift">
        <div
          className="absolute top-[-10%] left-[-5%] w-[70%] h-[80%] rounded-full blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(46,85,212,0.45), transparent 65%)' }}
        />
        <div
          className="absolute top-[20%] right-[-10%] w-[65%] h-[75%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(30,52,140,0.42), transparent 65%)' }}
        />
        <div
          className="absolute bottom-[-15%] left-[25%] w-[60%] h-[70%] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(75,116,242,0.30), transparent 70%)' }}
        />
      </div>

      {/* Textura de fumaça — feTurbulence, duas camadas com drift independente */}
      <svg
        className="absolute inset-0 w-full h-full cloud-drift-slow"
        style={{ opacity: dense ? 0.55 : 0.3 }}
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <defs>
          <filter id="smoke-a" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0085 0.013" numOctaves="4" seed="11" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.18  0 0 0 0 0.33  0 0 0 0 0.83  0 0 0 1.5 -0.5" />
          </filter>
          <filter id="smoke-b" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="3" seed="29" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.45  0 0 0 0 0.95  0 0 0 1.3 -0.42" />
          </filter>
        </defs>
        <rect width="800" height="600" filter="url(#smoke-a)" />
        <rect width="800" height="600" filter="url(#smoke-b)" opacity="0.7" />
      </svg>

      {/* Vinheta inferior — funde no fundo das seções seguintes */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg))' }}
      />
    </div>
  );
}

/* Nuvem de areia do deserto — tons quentes, varredura horizontal */
function DesertDust() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* vinheta superior: entra suave vindo do azul do site */}
      <div
        className="absolute inset-x-0 top-0 h-1/3 z-10"
        style={{ background: 'linear-gradient(to top, transparent, var(--color-bg))' }}
      />
      <div className="absolute inset-0 sand-blow">
        <div className="absolute top-[10%] left-[-10%] w-[80%] h-[70%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(201,163,107,0.30), transparent 66%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[75%] h-[70%] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(166,124,72,0.28), transparent 68%)' }} />
      </div>
      <div className="absolute inset-0 sand-blow-2">
        <div className="absolute bottom-0 left-[20%] w-[70%] h-[60%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(224,196,150,0.22), transparent 70%)' }} />
      </div>

      <svg className="absolute inset-0 w-full h-full sand-blow" style={{ opacity: 0.5 }}
        preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600">
        <defs>
          <filter id="sand-a" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.006" numOctaves="4" seed="7" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.79  0 0 0 0 0.64  0 0 0 0 0.42  0 0 0 1.4 -0.46" />
          </filter>
        </defs>
        <rect width="800" height="600" filter="url(#sand-a)" />
      </svg>
    </div>
  );
}
