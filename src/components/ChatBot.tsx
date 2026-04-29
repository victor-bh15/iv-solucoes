'use client'

import { useState, useRef, useEffect } from 'react'
import Lottie from 'lottie-react'
import animationData from '../../public/ai-animation.json'
import { MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

type Step = 'greeting' | 'collecting' | 'forwarding' | 'chat'

interface Message {
  role: 'user' | 'assistant'
  content: string
  uiOnly?: boolean // exibida na UI mas excluída do histórico enviado ao Gemini
}

const WHATSAPP        = '5531996715639'
const EMAILJS_SERVICE  = 'service_w6ppzei'
const EMAILJS_TEMPLATE = 'template_yf2q82g'

const WELCOME = `Olá! 👋 Você está conversando com o IVY, o Gênio da IV Soluções.\n\nQual será o seu primeiro pedido de hoje?\n\nPara começarmos, me informe:\n• Seu nome\n• Seu contato (telefone ou e-mail)\n• Se for para uma empresa, o nome dela`

const SYSTEM_PROMPT = `Você é IVY, assistente de IA da IV Soluções em IA.
Responda perguntas sobre a empresa de forma amigável, clara e profissional.
Informações da empresa:
- Nome: IV Soluções em IA
- Proprietários: Inamar Miranda e Victor Andrade
- Especialidades: automação com IA, chatbots, agentes inteligentes, consultoria em IA
- Tagline: "A melhor maneira de pensar, interagir e agir."
- Contato: WhatsApp 31 99671-5639
Responda sempre em português. Seja conciso e útil.`

const fmt = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>')

const hasValidContact = (text: string): boolean => {
  const hasEmail = text.includes('@')
  const digitCount = text.replace(/\D/g, '').length
  return hasEmail || digitCount >= 8
}

export default function ChatBot() {
  const [open, setOpen]         = useState(false)
  const [step, setStep]         = useState<Step>('greeting')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME },
  ])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [userInfo, setUserInfo] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    emailjs.init('U19Oc-PSSnv2R8RBV')
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

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
          push(
            'assistant',
            'Parece que você não informou um contato (telefone ou e-mail).\n\nPor favor, me informe para que o Inamar possa te retornar. 😊'
          )
          setStep('collecting')
          setLoading(false)
          inputRef.current?.focus()
        }, 800)
        return
      }

      setUserInfo(text)
      setLoading(true)
      setTimeout(() => {
        push(
          'assistant',
          'Obrigado pelas informações! 😊\n\nVou encaminhar nossa conversa para Inamar Miranda para que ele possa continuar o seu atendimento.\n\nDeseja que eu encaminhe agora?'
        )
        setStep('forwarding')
        setLoading(false)
      }, 800)
      return
    }

    if (step === 'chat') {
      setLoading(true)
      try {
        const allMsgs = [...messages, { role: 'user' as const, content: text }]

        // Exclui mensagens uiOnly — a mensagem de transição do "Não, obrigado"
        // só existe na UI, nunca chega ao Gemini.
        const apiMsgs = allMsgs.filter(m => !m.uiOnly)

        const firstUser = apiMsgs.findIndex(m => m.role === 'user')
        const sliced = apiMsgs.slice(firstUser, -1)

        // Garante alternância user → model → user → model (Gemini exige isso)
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
          body: JSON.stringify({
            message: text,
            history: safeHistory,
            systemContext: SYSTEM_PROMPT,
          }),
        })

        if (!res.ok || !res.body) {
          push('assistant', 'Desculpe, não consegui processar. Tente novamente.')
          return
        }

        // Stream iniciado — esconde indicador de digitando e abre bolha da resposta
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
            if (last?.role === 'assistant') {
              copy[copy.length - 1] = { ...last, content: last.content + chunk }
            }
            return copy
          })
        }
      } catch {
        push('assistant', 'Desculpe, ocorreu um erro. Tente novamente.')
      } finally {
        setLoading(false)
        inputRef.current?.focus()
      }
    }
  }

  const handleYes = () => {
    const waMsg = encodeURIComponent(
      `Olá Inamar! Um cliente chegou pelo site da IV Soluções.\n\n📋 *Informações do cliente:*\n${userInfo}\n\nEle está aguardando atendimento.`
    )
    window.open(`https://wa.me/${WHATSAPP}?text=${waMsg}`, '_blank')
    push('assistant', 'Perfeito! Você será redirecionado para o WhatsApp do Inamar agora. Até logo! 🚀')

    emailjs
      .send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        user_info: userInfo,
        time: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      })
      .catch(() => {})
  }

  const handleNo = () => {
    push(
      'assistant',
      'Sem problemas! 😊 Estou aqui para tirar todas as suas dúvidas sobre a IV Soluções em IA. O que você gostaria de saber?',
      true // uiOnly — não entra no histórico do Gemini
    )
    setStep('chat')
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const reset = () => {
    setStep('greeting')
    setUserInfo('')
    setMessages([{ role: 'assistant', content: WELCOME }])
    setInput('')
  }

  return (
    <>
      {/* Botão flutuante de abrir/fechar */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir chat com IVY"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105"
        style={{ background: 'var(--laranja)' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}>
              <X size={22} color="#fff" />
            </motion.div>
          ) : (
            <motion.div key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}>
              <MessageCircle size={22} color="#fff" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Painel do chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50"
          >
            {/*
              Wrapper relativo: mantém o gênio fora do overflow-hidden do painel,
              mas posicionado em relação a ele.
            */}
            <div className="relative w-80 sm:w-96">

              {/* Gênio — visível apenas em sm+ para não sobrepor em mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
                className="absolute -left-32 bottom-8 z-50 hidden sm:block"
                aria-hidden="true"
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [-3, 3, -3],
                    opacity: [0.85, 1, 0.85],
                  }}
                  transition={{
                    y:       { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    rotate:  { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    style={{ width: 120, height: 120 }}
                  />
                </motion.div>
              </motion.div>

              {/* Painel do chat */}
              <div
                className="w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                style={{
                  background: '#111',
                  border: '1px solid #222',
                  maxHeight: '540px',
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ background: 'var(--laranja)' }}
                >
                  <div>
                    <p className="font-bold text-white text-sm leading-tight">
                      IVY · Gênio da IV Soluções
                    </p>
                    <p className="text-xs text-orange-100">Online agora</p>
                  </div>
                  <button
                    onClick={reset}
                    className="text-white opacity-60 hover:opacity-100 text-xs underline transition-opacity"
                  >
                    Reiniciar
                  </button>
                </div>

                {/* Mensagens */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-3"
                  style={{ minHeight: 300 }}
                >
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className="max-w-[82%] rounded-2xl px-4 py-2 text-sm leading-relaxed"
                        style={{
                          background: msg.role === 'user' ? 'var(--laranja)' : '#1e1e1e',
                          color: '#f5f5f5',
                        }}
                        dangerouslySetInnerHTML={{ __html: fmt(msg.content) }}
                      />
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div
                        className="rounded-2xl px-4 py-2 text-sm italic"
                        style={{ background: '#1e1e1e', color: '#8a8a8a' }}
                      >
                        IVY está digitando...
                      </div>
                    </div>
                  )}

                  {step === 'forwarding' && !loading && (
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleYes}
                        className="flex-1 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80"
                        style={{ background: 'var(--laranja)' }}
                      >
                        ✅ Sim, encaminhar
                      </button>
                      <button
                        onClick={handleNo}
                        className="flex-1 py-2 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
                        style={{ background: '#2a2a2a', color: '#f5f5f5' }}
                      >
                        ❌ Não, obrigado
                      </button>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>

                {/* Input */}
                {step !== 'forwarding' && (
                  <div
                    className="flex items-center gap-2 px-3 py-3"
                    style={{ borderTop: '1px solid #222' }}
                  >
                    <input
                      ref={inputRef}
                      autoFocus
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder={
                        step === 'chat'
                          ? 'Tire sua dúvida sobre a IV Soluções...'
                          : 'Nome · contato · empresa (se houver)'
                      }
                      disabled={loading}
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#555]"
                      style={{ color: '#f5f5f5' }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={loading || !input.trim()}
                      className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30 transition-opacity"
                      style={{ background: 'var(--laranja)' }}
                    >
                      <Send size={14} color="#fff" />
                    </button>
                  </div>
                )}
              </div>
              {/* fim painel */}
            </div>
            {/* fim wrapper relativo */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
