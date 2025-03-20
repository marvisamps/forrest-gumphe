import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { StoryIdea } from '@/types/story';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const storyIdea: StoryIdea = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um experiente roteirista especializado em estrutura narrativa. Sua tarefa é desenvolver plots e beatsheets detalhados."
        },
        {
          role: "user",
          content: `Com base nas seguintes informações:
          
          Título: ${storyIdea.title}
          Premissa: ${storyIdea.premise}
          
          Por favor, forneça:
          1. Um plot detalhado da história (3-4 parágrafos)
          2. Um beatsheet com 8-12 beats principais da história
          
          Responda em formato JSON com as chaves "plot" (string) e "beatSheet" (array de strings).`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating plot:', error);
    return NextResponse.json(
      { error: 'Failed to generate plot' },
      { status: 500 }
    );
  }
} 