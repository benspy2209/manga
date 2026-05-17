export type CinematicPageType =
  | "Match intense"
  | "Entraînement"
  | "Flashback"
  | "Révélation"
  | "Rivalité"
  | "Fraternité"
  | "Solitude"
  | "Défaite"
  | "Transformation mentale"
  | "Moment légendaire";

export type CharacterDNAProfile = {
  face: string;
  hairstyle: string;
  expressions: string;
  outfit: string;
  silhouette: string;
  posture: string;
  gaze: string;
  bodyStyle: string;
};

export type CharacterEnergySignature = {
  auraColor: string;
  energyStyle: string;
  graphicTexture: string;
  movementStyle: string;
  visualSignature: string;
};

export type CharacterProfile = {
  id: string;
  firstName: string;
  age: string;
  role: string;
  personality: string;
  relationship: string;
  playStyle: string;
  visualTraits: string;
  referencePhotos: string[];
  dna: CharacterDNAProfile;
  energy: CharacterEnergySignature;
};

export type PagePlan = {
  pageNumber: number;
  objective: string;
  dominantEmotion: string;
  dramaticIntensity: number;
  emotionalStake: string;
  momentTension: string;
  sceneType: CinematicPageType;
  presentCharacters: string[];
  keyMoment: string;
  endingType: "calme" | "tension" | "cliffhanger" | "révélation" | "impact";
};

export type GlobalScenario = {
  synopsis: string;
  emotionalTheme: string;
  mangaStyle: string;
  styleInfluence:
    | "Slam Dunk"
    | "Blue Lock"
    | "Vagabond"
    | "Haikyuu"
    | "Jujutsu Kaisen"
    | "Naruto"
    | "One Punch Man"
    | "Akira"
    | "Chainsaw Man";
  intensity: number;
};

export type DirectorAnalysis = {
  visualRhythm: string;
  cameraStrategy: string;
  panelComposition: string;
  graphicDensity: string;
  motionLinesDensity: string;
  visualEnergy: string;
  emotionalPacing: string;
  storyArcBeat: string;
};

export type StoryboardPanel = {
  panelNumber: number;
  description: string;
  cameraAngle: string;
  shotType: string;
  emotion: string;
  dialogueFr: string;
  sfxFr: string;
  flowNote: string;
};

export type StoryboardPage = {
  pageNumber: number;
  title: string;
  panelCount: number;
  analysis: DirectorAnalysis;
  panels: StoryboardPanel[];
};

export type StoryArcMemory = {
  emotionalEvolution: string[];
  rivalries: string[];
  transformations: string[];
  majorScenes: string[];
  previousStakes: string[];
};

export type ProjectDraft = {
  projectTitle: string;
  characters: CharacterProfile[];
  globalScenario: GlobalScenario;
  pages: PagePlan[];
  arcMemory: StoryArcMemory;
};

export type GeneratedPage = {
  pageNumber: number;
  objective: string;
  imageUrl: string;
  continuity: string;
  promptUsed: string;
};
