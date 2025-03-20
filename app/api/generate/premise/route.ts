import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { premise } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um experiente roteirista e escritor. Sua tarefa é expandir premissas de histórias e criar títulos impactantes."
        },
        {
          role: "user",
          content: `Dada a seguinte premissa básica: "${premise}"
          
          Por favor, forneça:
          1. Um título criativo e memorável para a história
          2. Uma versão expandida e mais detalhada da premissa (2-3 parágrafos)
          
          Responda em formato JSON com as chaves "title" e "expandedPremise".`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating premise:', error);
    return NextResponse.json(
      { error: 'Failed to generate premise' },
      { status: 500 }
    );
  }
} 