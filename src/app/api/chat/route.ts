import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

Para contato direto: WhatsApp +55 31 98449-6889
Site: ivsolucoesia.com.br

Se perguntas fugirem do escopo de IA e tecnologia, redirecione educadamente ao nosso time.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
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

    // Convert {role, content} → Gemini format {role, parts:[{text}]}
    const converted = (history ?? []).map((e) => ({
      role: e.role,
      parts: [{ text: e.content }],
    }));

    // Enforce strict alternation: keep the *last* entry when two consecutive same-role
    // messages appear (e.g. the uiOnly transition message that the client already excluded,
    // but just in case any duplicate slips through).
    const alternated: typeof converted = [];
    for (const entry of converted) {
      const prev = alternated[alternated.length - 1];
      if (prev && prev.role === entry.role) {
        alternated[alternated.length - 1] = entry; // replace with the later duplicate
      } else {
        alternated.push(entry);
      }
    }

    // Gemini requires history to start with 'user'
    const firstUserIdx = alternated.findIndex((e) => e.role === 'user');
    const safeHistory = firstUserIdx === -1 ? [] : alternated.slice(firstUserIdx);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: systemContext ?? SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: safeHistory,
      generationConfig: { maxOutputTokens: 600, temperature: 0.7 },
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('[chat/route] Gemini error:', error);
    return NextResponse.json(
      { response: 'Ocorreu um erro ao processar sua mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
