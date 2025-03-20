import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { StoryIdea, Plot, BeatSheet } from '@/types/story';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { storyIdea, plot, beatSheet }: {
      storyIdea: StoryIdea;
      plot: Plot;
      beatSheet: BeatSheet;
    } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um experiente roteirista especializado em desenvolvimento de personagens e cenas. Sua tarefa é criar detalhes ricos para histórias."
        },
        {
          role: "user",
          content: `Com base nas seguintes informações:
          
          Título: ${storyIdea.title}
          Premissa: ${storyIdea.premise}
          Plot: ${plot.content}
          Beats: ${beatSheet.beats.join('\n')}
          
          Por favor, forneça:
          1. Descrições detalhadas dos personagens principais (nome, características, arco)
          2. Esboços das cenas principais alinhadas com o beatsheet
          3. Temas e subtextos da história
          
          Responda em formato JSON com as chaves:
          - "characters" (array de objetos com name, description, arc)
          - "scenes" (array de objetos com title, description)
          - "themes" (array de strings)`
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating details:', error);
    return NextResponse.json(
      { error: 'Failed to generate details' },
      { status: 500 }
    );
  }
} 