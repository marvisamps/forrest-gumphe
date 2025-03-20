export interface StoryIdea {
  id: string;
  title: string;
  premise: string;
}

export interface Plot {
  mainPlot: string;
  subplots: string[];
}

export interface BeatSheet {
  openingImage: string;
  setup: string;
  catalyst: string;
  debate: string;
  breakIntoTwo: string;
  bPlot: string;
  funAndGames: string;
  midpoint: string;
  badGuysCloseIn: string;
  allIsLost: string;
  darkNightOfSoul: string;
  breakIntoThree: string;
  finale: string;
  finalImage: string;
}

export interface StoryDetails {
  logline: string;
  synopsis: string;
  treatment: string;
}

export interface SceneOutline {
  id: string;
  sceneNumber: number;
  location: string;
  timeOfDay: string;
  description: string;
  characters: string[];
}

export interface CompleteStory {
  storyIdea: StoryIdea;
  plot: Plot;
  beatSheet: BeatSheet;
  storyDetails: StoryDetails;
  sceneOutline: SceneOutline[];
} 