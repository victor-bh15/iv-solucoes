/** Fundo global do site — nuvem densa azul, fixa, visível em TODAS as seções.
 *  Fica atrás de tudo (-z-10). Drift por transform (GPU). aria-hidden. */
export default function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {/* base */}
      <div className="absolute inset-0" style={{ background: 'var(--color-bg)' }} />

      {/* brilhos da nuvem — cobrem topo, meio e base do viewport */}
      <div className="absolute inset-0 cloud-drift">
        <div className="absolute -top-[10%] -left-[5%] w-[70%] h-[55%] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(46,85,212,0.50), transparent 65%)' }} />
        <div className="absolute top-[28%] -right-[10%] w-[65%] h-[55%] rounded-full blur-[110px]"
          style={{ background: 'radial-gradient(circle, rgba(30,52,140,0.45), transparent 65%)' }} />
        <div className="absolute top-[58%] left-[15%] w-[70%] h-[55%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(75,116,242,0.34), transparent 68%)' }} />
      </div>
      <div className="absolute inset-0 cloud-drift-slow">
        <div className="absolute top-[12%] left-[30%] w-[55%] h-[50%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(46,85,212,0.30), transparent 70%)' }} />
        <div className="absolute top-[75%] -left-[5%] w-[60%] h-[50%] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(60,90,200,0.30), transparent 70%)' }} />
      </div>

      {/* textura de fumaça */}
      <svg className="absolute inset-0 w-full h-full cloud-drift-slow" style={{ opacity: 0.5 }}
        preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600">
        <defs>
          <filter id="bg-smoke-a" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.0085 0.013" numOctaves="4" seed="11" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.18  0 0 0 0 0.33  0 0 0 0 0.83  0 0 0 1.4 -0.48" />
          </filter>
          <filter id="bg-smoke-b" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.008" numOctaves="3" seed="29" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.29  0 0 0 0 0.45  0 0 0 0 0.95  0 0 0 1.25 -0.4" />
          </filter>
        </defs>
        <rect width="800" height="600" filter="url(#bg-smoke-a)" />
        <rect width="800" height="600" filter="url(#bg-smoke-b)" opacity="0.65" />
      </svg>

      {/* scrim — mantém o texto legível por cima da nuvem */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(6,9,18,0.55), rgba(6,9,18,0.40) 40%, rgba(6,9,18,0.55))' }} />
    </div>
  );
}
