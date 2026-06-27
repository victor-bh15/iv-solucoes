"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import { useLang } from "@/components/providers/LanguageProvider";
import { whatsappLink } from "@/lib/site";

/** Logo do chatbot: um CHIP com "IV" escrito (identidade IV Soluções). */
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
      {/* corpo do chip */}
      <rect x="9" y="9" width="14" height="14" rx="2.5" />
      {/* pinos (4 lados) */}
      <path d="M13 9V5.5M16 9V5.5M19 9V5.5M13 23v3.5M16 23v3.5M19 23v3.5M9 13H5.5M9 16H5.5M9 19H5.5M23 13h3.5M23 16h3.5M23 19h3.5" />
      {/* IV no centro */}
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

export function Chatbot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
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
        body: JSON.stringify({
          lang,
          messages: next.filter((m) => m.role === "user" || m.role === "assistant"),
        }),
      });

      // Rate-limit: mensagem específica em vez do erro genérico.
      if (res.status === 429) {
        setMessages([...next, { role: "assistant", content: t.chatbot.rate }]);
        return;
      }

      if (!res.ok) throw new Error("bad response");
      const data = await res.json();
      if (!data?.reply) throw new Error("no reply");

      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: t.chatbot.error }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Rótulo "Fale com a IA" ao lado do botão (desktop, quando fechado) —
          deixa claro que ali é o atendimento. */}
      {!open && (
        <span className="fixed bottom-[1.85rem] right-[5.25rem] z-50 hidden rounded-full border border-border bg-surface/90 px-3.5 py-2 text-xs font-semibold text-foreground shadow-lg shadow-black/30 backdrop-blur md:block">
          {lang === "en" ? "Talk to our AI" : "Fale com a IA"}
        </span>
      )}

      {/* Botão flutuante */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.chatbot.close : t.chatbot.open}
        style={{
          backgroundImage: "linear-gradient(135deg, #2563eb, #5b6bff, #7c5cff)",
        }}
        className="group fixed bottom-5 right-5 z-60 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl shadow-black/40 ring-2 ring-white/25 transition-transform duration-300 hover:scale-110 focus-visible:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <ChipIVIcon className="h-9 w-9" />}
      </button>

      {/* Janela do chat */}
      {open && (
        <div
          role="dialog"
          aria-label={t.chatbot.title}
          className="fixed bottom-24 right-5 z-50 flex h-[min(560px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/50"
        >
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 bg-linear-to-br from-electric via-iris to-violet px-4 py-3.5 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <ChipIVIcon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-bold leading-tight">
                {t.chatbot.title}
              </p>
              <p className="truncate text-xs text-white/70">
                {t.chatbot.subtitle}
              </p>
            </div>
          </div>

          {/* Mensagens */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {/* Mensagem de boas-vindas (sempre visível, acompanha o idioma) */}
            <div className="flex justify-start">
              <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-surface-2 px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                {t.chatbot.welcome}
              </div>
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-iris text-white"
                      : "rounded-bl-sm bg-surface-2 text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-background px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted" />
                </div>
              </div>
            )}
          </div>

          {/* Atalho para o WhatsApp */}
          <a
            href={whatsappLink(t.contact.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-4 mb-2 rounded-lg bg-[#25D366]/10 px-3 py-2 text-center text-xs font-medium text-[#128C4A] transition-colors hover:bg-[#25D366]/20 dark:text-[#3ddc84]"
          >
            {t.chatbot.whatsappFallback}
          </a>

          {/* Campo de envio */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatbot.placeholder}
              aria-label={t.chatbot.placeholder}
              maxLength={1000}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-brand"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={t.chatbot.send}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-iris text-white transition-colors hover:bg-violet disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
