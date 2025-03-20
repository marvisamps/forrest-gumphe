export interface StoryIdea {
  title: string;
  premise: string;
  expandedPremise?: string;
}

export interface Plot {
  content: string;
}

export interface BeatSheet {
  beats: string[];
}

export interface Character {
  name: string;
  description: string;
  arc: string;
}

export interface Scene {
  title: string;
  description: string;
}

export interface StoryDetails {
  characters: Character[];
  scenes: Scene[];
  themes: string[];
}

export interface Story {
  idea: StoryIdea;
  plot: Plot;
  beatSheet: BeatSheet;
  details: StoryDetails;
} 