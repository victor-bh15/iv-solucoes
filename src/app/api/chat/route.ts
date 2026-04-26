import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const SYSTEM_PROMPT = `Você é o Gênio, assistente virtual da IV Soluções em IA.
A IV Soluções é uma empresa brasileira especializada em soluções de inteligência artificial, fundada por Inamar Miranda e Victor Andrade.
Você é prestativo, profissional, direto e sempre responde em português do Brasil.
Mantenha respostas concisas (máximo 3 parágrafos).

Serviços que oferecemos:
- Chatbots com IA: atendimento inteligente 24/7 com NLP
- Automação de Processos: fluxos inteligentes para eliminar tarefas repetitivas
- Consultoria em IA: estratégia personalizada de implementação
- Desenvolvimento de Sistemas: sistemas inteligentes sob medida
- Integração de APIs: conectamos ferramentas com IA centralizada
- Treinamento de Equipes: capacitação com as melhores ferramentas de IA

Para contato direto: WhatsApp +55 31 99671-5639
Site: ivsolucoesia.com.br

Se perguntas fugirem do escopo de IA e tecnologia, redirecione educadamente ao nosso time.`;

const apiKey = process.env.GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey });

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { response: 'Serviço de IA temporariamente indisponível.' },
        { status: 503 }
      );
    }

    const { message, history, systemContext } = (await req.json()) as {
      message: string;
      history: Array<{ role: 'user' | 'model'; content: string }>;
      systemContext?: string;
    };

    if (!message?.trim()) {
      return NextResponse.json({ response: 'Mensagem inválida.' }, { status: 400 });
    }

    // Enforce strict alternation: keep the *last* entry of consecutive same-role messages
    const alternated: typeof history = [];
    for (const entry of history ?? []) {
      const prev = alternated[alternated.length - 1];
      if (prev && prev.role === entry.role) {
        alternated[alternated.length - 1] = entry;
      } else {
        alternated.push(entry);
      }
    }

    // Gemini requires history to start with 'user'
    const firstUserIdx = alternated.findIndex((e) => e.role === 'user');
    const safeHistory = firstUserIdx === -1 ? [] : alternated.slice(firstUserIdx);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...safeHistory.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
        { role: 'user', parts: [{ text: message }] },
      ],
      config: {
        systemInstruction: systemContext ?? SYSTEM_PROMPT,
      },
    });

    const text = response.text ?? 'Desculpe, não foi possível obter uma resposta.';
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('[chat/route] Gemini error:', error);
    return NextResponse.json(
      { response: 'Ocorreu um erro ao processar sua mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
