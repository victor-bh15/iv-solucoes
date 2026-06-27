'use client';

/** Amostra visual de cada projeto (o "print" do portfólio).
 *  UI representativa, montada em CSS — leve, responsiva e temática. */

const A = 'var(--color-accent)';

function BrowserFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[#0b1020] shadow-2xl">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0e1426] border-b border-[var(--color-border)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[10px] text-faint truncate">{label}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[210px] rounded-[1.6rem] border-[6px] border-[#0e1426] bg-[#0b1020] overflow-hidden shadow-2xl">
      <div className="h-5 bg-[#0e1426] flex items-center justify-center">
        <span className="w-12 h-1.5 rounded-full bg-[#1b2238]" />
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

const bar = (w: string, o = 1) => (
  <div className="h-2 rounded-full" style={{ width: w, background: A, opacity: o }} />
);
const line = (w: string) => <div className="h-2 rounded-full bg-[#1b2238]" style={{ width: w }} />;

export default function ProjectMock({ id }: { id: string }) {
  switch (id) {
    case 'siem':
      return (
        <BrowserFrame label="siem.ivsolucoes.com.br">
          <div className="flex gap-4">
            <div className="flex flex-col items-center justify-center w-28 shrink-0">
              <div className="relative w-20 h-20 rounded-full grid place-items-center"
                style={{ background: `conic-gradient(${A} 0 78%, #1b2238 78% 100%)` }}>
                <div className="w-14 h-14 rounded-full bg-[#0b1020] grid place-items-center">
                  <span className="font-display font-bold text-ink text-xl tabular-nums">92</span>
                </div>
              </div>
              <span className="text-[9px] text-muted mt-2 text-center">Índice de Excelência</span>
            </div>
            <div className="flex-1 space-y-3">
              {[['Clínica', '88%'], ['Farmácia', '74%'], ['UTI', '95%'], ['Pronto-socorro', '69%']].map(([k, v]) => (
                <div key={k}>
                  <div className="flex justify-between text-[9px] text-muted mb-1"><span>{k}</span><span className="tabular-nums">{v}</span></div>
                  {bar(v)}
                </div>
              ))}
            </div>
          </div>
        </BrowserFrame>
      );

    case 'villas':
      return (
        <PhoneFrame>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-ink text-sm">Villas Park</span>
              <span className="w-6 h-6 rounded-full" style={{ background: A }} />
            </div>
            {['Reservar Gourmet', 'Ouvidoria', 'Comunicados', 'Inspeções'].map((s, i) => (
              <div key={s} className="flex items-center gap-2 rounded-lg bg-[#0e1426] border border-[var(--color-border)] px-3 py-2.5">
                <span className="w-5 h-5 rounded-md" style={{ background: A, opacity: 0.85 - i * 0.12 }} />
                <span className="text-[11px] text-ink">{s}</span>
              </div>
            ))}
          </div>
        </PhoneFrame>
      );

    case 'genio':
      return (
        <BrowserFrame label="Gênio IV · RAG">
          <div className="space-y-2.5">
            <div className="ml-auto w-fit max-w-[80%] text-[10px] text-white rounded-xl rounded-br-sm px-3 py-2" style={{ background: A }}>
              Qual a política de reembolso?
            </div>
            <div className="w-fit max-w-[88%] text-[10px] text-ink/90 rounded-xl rounded-bl-sm px-3 py-2 bg-[#0e1426] border border-[var(--color-border)]">
              O reembolso ocorre em até 7 dias úteis.
              <div className="mt-1.5 flex items-center gap-1 text-[8px] text-[var(--color-accent)]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: A }} /> fonte: politica_v3.pdf · p.4
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[#0b1020] px-3 py-2">
              <span className="text-[9px] text-faint flex-1">Pergunte ao Gênio…</span>
              <span className="w-5 h-5 rounded-full" style={{ background: A }} />
            </div>
          </div>
        </BrowserFrame>
      );

    case 'chronos':
      return (
        <BrowserFrame label="Chronos · Ponto Médico">
          <div className="space-y-3">
            <div className="flex justify-between text-[9px] text-muted">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d) => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 21 }).map((_, i) => (
                <div key={i} className="h-5 rounded"
                  style={{ background: [2, 4, 9, 11, 16, 18].includes(i) ? A : '#0e1426', opacity: [2, 4, 9, 11, 16, 18].includes(i) ? 0.9 : 1 }} />
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] tabular-nums text-ink font-display font-bold">07:58</span>
              <span className="text-[9px] text-muted">plantão registrado ✓</span>
            </div>
          </div>
        </BrowserFrame>
      );

    case 'painel':
      return (
        <BrowserFrame label="Painel de Gestão">
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[['Receita', 'R$ 128k'], ['Ordens', '342'], ['SLA', '98%']].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-[#0e1426] border border-[var(--color-border)] p-2">
                  <div className="text-[8px] text-muted">{k}</div>
                  <div className="text-[11px] font-display font-bold text-ink tabular-nums">{v}</div>
                </div>
              ))}
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {[40, 65, 50, 80, 60, 95, 72].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: A, opacity: 0.55 + i * 0.06 }} />
              ))}
            </div>
          </div>
        </BrowserFrame>
      );

    case 'site':
    default:
      return (
        <BrowserFrame label="ivsolucoes.com.br">
          <div className="relative h-36 rounded-lg overflow-hidden bg-[#0b1020]">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 30% 0%, rgba(46,85,212,0.4), transparent 60%)' }} />
            <div className="relative p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded" style={{ background: A }} /><span className="text-[9px] text-ink">Soluções</span></div>
                <div className="flex gap-2">{line('14px')}{line('14px')}{line('14px')}</div>
              </div>
              <div className="pt-4 space-y-1.5">
                <div className="h-3 w-2/3 rounded bg-ink/80" />
                <div className="h-3 w-1/2 rounded" style={{ background: A }} />
                {bar('40%', 0.8)}
              </div>
            </div>
          </div>
        </BrowserFrame>
      );
  }
}
