'use client'

import { useState, useRef, useEffect } from 'react'
import Lottie from 'lottie-react'
import animationData from '../../public/ai-animation.json'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useLanguage } from '@/context/LanguageContext'

type Step = 'greeting' | 'collecting' | 'forwarding' | 'chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
  uiOnly?: boolean
}

const WHATSAPP        = '5531996715639' // WhatsApp do Inamar
const EMAILJS_SERVICE  = 'service_w6ppzei'
const EMAILJS_TEMPLATE = 'template_yf2q82g'

type Lang = 'pt' | 'en'

const STR = {
  pt: {
    welcome: `Olá! 👋 Você está conversando com o IVY, o Gênio da IV Soluções.\n\nQual será o seu primeiro pedido de hoje?\n\nPara começarmos, me informe:\n• Seu nome\n• Seu contato (telefone ou e-mail)\n• Se for para uma empresa, o nome dela`,
    noContact: 'Parece que você não informou um contato (telefone ou e-mail).\n\nPor favor, me informe para que o Inamar possa te retornar. 😊',
    thanks: 'Obrigado pelas informações! 😊\n\nVou encaminhar nossa conversa para Inamar Miranda para que ele possa continuar o seu atendimento.\n\nDeseja que eu encaminhe agora?',
    redirect: 'Perfeito! Você será redirecionado para o WhatsApp do Inamar agora. Até logo! 🚀',
    noThanks: 'Sem problemas! 😊 Estou aqui para tirar todas as suas dúvidas sobre a IV Soluções em IA. O que você gostaria de saber?',
    procErr: 'Desculpe, não consegui processar. Tente novamente.',
    genErr: 'Desculpe, ocorreu um erro. Tente novamente.',
    header: 'IVY · Gênio da IV',
    online: 'Online agora',
    restart: 'Reiniciar',
    typing: 'IVY está digitando...',
    yes: '✅ Sim, encaminhar',
    no: '❌ Não, obrigado',
    phChat: 'Tire sua dúvida sobre a IV Soluções...',
    phCollect: 'Nome · contato · empresa (se houver)',
    aria: 'Abrir chat com IVY',
    sysLang: 'Responda sempre em português.',
    leadMsg: (info: string) => `Olá Inamar! Um cliente chegou pelo site da IV Soluções.\n\n📋 *Informações do cliente:*\n${info}\n\nEle está aguardando atendimento.`,
  },
  en: {
    welcome: `Hi! 👋 You're chatting with IVY, the Genius of IV Soluções.\n\nWhat's your first request today?\n\nTo get started, please tell me:\n• Your name\n• Your contact (phone or e-mail)\n• If it's for a company, its name`,
    noContact: "It looks like you didn't share a contact (phone or e-mail).\n\nPlease share it so Inamar can get back to you. 😊",
    thanks: 'Thank you! 😊\n\nI will forward our conversation to Inamar Miranda so he can continue helping you.\n\nWould you like me to forward it now?',
    redirect: "Perfect! You'll be redirected to Inamar's WhatsApp now. See you! 🚀",
    noThanks: "No problem! 😊 I'm here to answer all your questions about IV Soluções. What would you like to know?",
    procErr: "Sorry, I couldn't process that. Please try again.",
    genErr: 'Sorry, an error occurred. Please try again.',
    header: 'IVY · IV Genius',
    online: 'Online now',
    restart: 'Restart',
    typing: 'IVY is typing...',
    yes: '✅ Yes, forward',
    no: '❌ No, thanks',
    phChat: 'Ask anything about IV Soluções...',
    phCollect: 'Name · contact · company (if any)',
    aria: 'Open chat with IVY',
    sysLang: 'Always reply in English.',
    leadMsg: (info: string) => `Hi Inamar! A client arrived through the IV Soluções website.\n\n📋 *Client info:*\n${info}\n\nThey are waiting for service.`,
  },
} as const

const fmt = (text: string) =>
  text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')

const hasValidContact = (text: string): boolean => {
  const hasEmail = text.includes('@')
  const digitCount = text.replace(/\D/g, '').length
  return hasEmail || digitCount >= 8
}

export default function ChatBot() {
  const { lang } = useLanguage()
  const L: Lang = lang
  const tr = STR[L]

  const sysPrompt = `Você é IVY, assistente de IA da IV Soluções em IA.
Responda perguntas sobre a empresa de forma amigável, clara e profissional.
Informações da empresa:
- Nome: IV Soluções em IA
- Proprietários: Inamar Miranda e Victor Andrade
- Especialidades: automação com IA, chatbots, agentes inteligentes, consultoria em IA
- Tagline: "A melhor maneira de pensar, interagir e agir."
- Contato: WhatsApp 31 99671-5639
${tr.sysLang} Seja conciso e útil.`

  const [open, setOpen]         = useState(false)
  const [step, setStep]         = useState<Step>('greeting')
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: STR.pt.welcome }])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [userInfo, setUserInfo] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => { emailjs.init('U19Oc-PSSnv2R8RBV') }, [])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  // Se trocar o idioma antes de interagir, reescreve a saudação no idioma novo.
  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].role === 'assistant' && step === 'greeting'
        ? [{ role: 'assistant', content: tr.welcome }]
        : prev
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const push = (role: 'user' | 'assistant', content: string, uiOnly = false) =>
    setMessages(prev => [...prev, { role, content, uiOnly }])

  const handleSend = async () => {
    if (!input.trim() || loading) return
    const text = input.trim()
    setInput('')
    push('user', text)

    if (step === 'greeting' || step === 'collecting') {
      if (!hasValidContact(text)) {
        setLoading(true)
        setTimeout(() => {
          push('assistant', tr.noContact)
          setStep('collecting')
          setLoading(false)
          inputRef.current?.focus()
        }, 800)
        return
      }
      setUserInfo(text)
      setLoading(true)
      setTimeout(() => {
        push('assistant', tr.thanks)
        setStep('forwarding')
        setLoading(false)
      }, 800)
      return
    }

    if (step === 'chat') {
      setLoading(true)
      try {
        const allMsgs = [...messages, { role: 'user' as const, content: text }]
        const apiMsgs = allMsgs.filter(m => !m.uiOnly)
        const firstUser = apiMsgs.findIndex(m => m.role === 'user')
        const sliced = apiMsgs.slice(firstUser, -1)

        const history: { role: 'user' | 'model'; content: string }[] = []
        let lastRole: string | null = null
        for (const m of sliced) {
          const role = m.role === 'assistant' ? 'model' : 'user'
          if (role === lastRole) continue
          history.push({ role, content: m.content })
          lastRole = role
        }
        const safeHistory = history[0]?.role === 'user' ? history : history.slice(1)

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, history: safeHistory, systemContext: sysPrompt }),
        })

        if (!res.ok || !res.body) { push('assistant', tr.procErr); return }

        setLoading(false)
        setMessages(prev => [...prev, { role: 'assistant', content: '' }])
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          setMessages(prev => {
            const copy = [...prev]
            const last = copy[copy.length - 1]
            if (last?.role === 'assistant') copy[copy.length - 1] = { ...last, content: last.content + chunk }
            return copy
          })
        }
      } catch {
        push('assistant', tr.genErr)
      } finally {
        setLoading(false)
        inputRef.current?.focus()
      }
    }
  }

  const handleYes = () => {
    const waMsg = encodeURIComponent(tr.leadMsg(userInfo))
    window.open(`https://wa.me/${WHATSAPP}?text=${waMsg}`, '_blank')
    push('assistant', tr.redirect)
    emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      user_info: userInfo,
      time: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    }).catch(() => {})
  }

  const handleNo = () => {
    push('assistant', tr.noThanks, true)
    setStep('chat')
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const reset = () => {
    setStep('greeting')
    setUserInfo('')
    setMessages([{ role: 'assistant', content: tr.welcome }])
    setInput('')
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={tr.aria}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105"
        style={{ background: 'var(--accent)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} color="#fff" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} color="#fff" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <div className="relative w-80 sm:w-96">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
                className="absolute -left-32 bottom-8 z-50 hidden sm:block"
                aria-hidden="true"
              >
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [-3, 3, -3], opacity: [0.85, 1, 0.85] }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <Lottie animationData={animationData} loop style={{ width: 120, height: 120 }} />
                </motion.div>
              </motion.div>

              <div className="w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', maxHeight: '540px' }}>
                <div className="flex items-center justify-between px-4 py-3" style={{ background: 'var(--accent)' }}>
                  <div>
                    <p className="font-bold text-white text-sm leading-tight">{tr.header}</p>
                    <p className="text-xs text-white/70">{tr.online}</p>
                  </div>
                  <button onClick={reset} className="text-white opacity-60 hover:opacity-100 text-xs underline transition-opacity">
                    {tr.restart}
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 300 }}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className="max-w-[82%] rounded-2xl px-4 py-2 text-sm leading-relaxed"
                        style={{ background: msg.role === 'user' ? 'var(--accent)' : 'var(--color-bg-soft)', color: '#f2f4fa' }}
                        dangerouslySetInnerHTML={{ __html: fmt(msg.content) }}
                      />
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl px-4 py-2 text-sm italic" style={{ background: 'var(--color-bg-soft)', color: 'var(--color-muted)' }}>
                        {tr.typing}
                      </div>
                    </div>
                  )}

                  {step === 'forwarding' && !loading && (
                    <div className="flex gap-2 pt-1">
                      <button onClick={handleYes} className="flex-1 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80" style={{ background: 'var(--accent)' }}>
                        {tr.yes}
                      </button>
                      <button onClick={handleNo} className="flex-1 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80" style={{ background: 'var(--color-border)', color: '#f2f4fa' }}>
                        {tr.no}
                      </button>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {step !== 'forwarding' && (
                  <div className="flex items-center gap-2 px-3 py-3" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <input
                      ref={inputRef}
                      autoFocus
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder={step === 'chat' ? tr.phChat : tr.phCollect}
                      disabled={loading}
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#5a6178]"
                      style={{ color: '#f2f4fa' }}
                    />
                    <button onClick={handleSend} disabled={loading || !input.trim()}
                      className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 transition-opacity" style={{ background: 'var(--accent)' }}>
                      <Send size={14} color="#fff" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
