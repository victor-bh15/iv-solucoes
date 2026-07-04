"use client";

import { useEffect, useRef, useState } from "react";
import { DICT, type Lang, whatsappLink } from "@/lib/i18n";

/** Ícone do assistente: chip com "IV" (identidade IV Soluções). */
function ChipIVIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="14" height="14" rx="2.5" />
      <path d="M13 9V5.5M16 9V5.5M19 9V5.5M13 23v3.5M16 23v3.5M19 23v3.5M9 13H5.5M9 16H5.5M9 19H5.5M23 13h3.5M23 16h3.5M23 19h3.5" />
      <text
        x="16"
        y="19.9"
        textAnchor="middle"
        fontSize="8.5"
        fontWeight="800"
        fill="currentColor"
        stroke="none"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        IV
      </text>
    </svg>
  );
}

type Msg = { role: "user" | "assistant"; content: string };

export default function Chatbot({ lang }: { lang: Lang }) {
  const t = DICT[lang].chatbot;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: next }),
      });

      if (res.status === 429) {
        setMessages([...next, { role: "assistant", content: t.rate }]);
        return;
      }
      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      if (!data?.reply) throw new Error("no reply");

      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: t.error }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Rótulo ao lado do botão (desktop, fechado) — deixa claro que é a IA */}
      {!open && (
        <span className="fixed right-21 bottom-7 z-40 hidden rounded-sm border border-white/20 bg-iv-panel/90 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm md:block">
          {t.label}
        </span>
      )}

      {/* Botão flutuante */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.close : t.open}
        className="fixed right-5 bottom-5 z-40 flex h-13 w-13 items-center justify-center rounded-full border border-iv-mist/40 bg-iv-navy/90 text-white/90 backdrop-blur-sm transition-all hover:border-iv-mist hover:bg-iv-navy"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <ChipIVIcon className="h-8 w-8" />
        )}
      </button>

      {/* Janela do chat */}
      {open && (
        <div
          role="dialog"
          aria-label={t.title}
          className="fixed right-5 bottom-21 z-40 flex h-[min(540px,calc(100dvh-7rem))] w-[min(370px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-sm border border-white/15 bg-iv-panel/95 backdrop-blur-md"
        >
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-iv-navy/60 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/15 text-white/90">
              <ChipIVIcon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-white">{t.title}</p>
              <p className="truncate text-xs text-white/55">{t.subtitle}</p>
            </div>
          </div>

          {/* Mensagens */}
          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-sm bg-white/8 px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap text-white/85">
                {t.welcome}
              </div>
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-sm px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-iv-navy text-white"
                      : "bg-white/8 text-white/85"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-sm bg-white/8 px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-iv-mist [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-iv-mist [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-iv-mist" />
                </div>
              </div>
            )}
          </div>

          {/* Atalho para o WhatsApp */}
          <a
            href={whatsappLink(DICT[lang].contact.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 mb-2 rounded-sm border border-white/15 px-3 py-2 text-center text-xs text-white/70 transition-colors hover:border-iv-mist hover:text-white"
          >
            {t.whatsappFallback}
          </a>

          {/* Campo de envio */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              maxLength={1000}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              data-form-type="other"
              className="flex-1 rounded-sm border border-white/15 bg-transparent px-3.5 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-iv-mist"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t.send}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-iv-mist/50 text-white/90 transition-colors hover:border-iv-mist hover:bg-iv-navy disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
