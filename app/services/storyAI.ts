import { StoryIdea, Plot, BeatSheet, StoryDetails } from '../types/story';

export async function generateFromPremise(premise: string): Promise<StoryIdea> {
  const response = await fetch('/api/generate/premise', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ premise }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate from premise');
  }

  const { title, expandedPremise } = await response.json();
  return { title, premise, expandedPremise };
}

export async function generatePlotAndBeatSheet(storyIdea: StoryIdea): Promise<{ plot: Plot; beatSheet: BeatSheet }> {
  const response = await fetch('/api/generate/plot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(storyIdea),
  });

  if (!response.ok) {
    throw new Error('Failed to generate plot and beat sheet');
  }

  const { plot, beatSheet } = await response.json();
  return {
    plot: { content: plot },
    beatSheet: { beats: beatSheet },
  };
}

export async function generateStoryDetails(
  storyIdea: StoryIdea,
  plot: Plot,
  beatSheet: BeatSheet
): Promise<StoryDetails> {
  const response = await fetch('/api/generate/details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ storyIdea, plot, beatSheet }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate story details');
  }

  return await response.json();
} 