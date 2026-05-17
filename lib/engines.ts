import { ProjectDraft, StoryboardPage, GeneratedPage, PagePlan } from "@/lib/types";

const SFX = ["PAF", "TAC", "FWOOSH", "BAM", "CLAC", "VRRRT"];

function cameraSystem(page: PagePlan) {
  if (page.dominantEmotion.toLowerCase().includes("trist")) return ["plan large émotionnel", "plongée dramatique", "silence visuel"];
  if (page.momentTension.toLowerCase().includes("domination")) return ["contre-plongée héroïque", "perspective extrême manga", "focales agressives"];
  if (page.dramaticIntensity >= 8) return ["gros plan yeux", "panels inclinés", "compression dramatique"];
  return ["split panels", "plan américain", "vitesse cinétique"];
}

function panelFlowEngine(page: PagePlan) {
  return {
    visualRhythm: page.dramaticIntensity >= 8 ? "diagonales dynamiques + climax final" : "respiration visuelle progressive",
    transitions: page.endingType === "cliffhanger" ? "panels cassés + overlap + débordement final" : "transitions fluides",
    splash: page.sceneType === "Moment légendaire" || page.endingType === "impact" ? "splash panel automatique" : "sans splash"
  };
}

export function characterDNAEngine(project: ProjectDraft) {
  return project.characters.map((c) =>
    `${c.firstName}: DNA visage ${c.dna.face}, cheveux ${c.dna.hairstyle}, expressions ${c.dna.expressions}, tenue ${c.dna.outfit}, silhouette ${c.dna.silhouette}, posture ${c.dna.posture}, regard ${c.dna.gaze}, corps ${c.dna.bodyStyle}.`
  );
}

export function mangaEnergySystem(project: ProjectDraft) {
  return project.characters.map((c) =>
    `${c.firstName}: aura ${c.energy.auraColor}, énergie ${c.energy.energyStyle}, texture ${c.energy.graphicTexture}, mouvement ${c.energy.movementStyle}, signature ${c.energy.visualSignature}.`
  );
}

export function directorEngine(project: ProjectDraft): StoryboardPage[] {
  return project.pages.map((page) => {
    const cameras = cameraSystem(page);
    const flow = panelFlowEngine(page);
    const panelCount = page.endingType === "cliffhanger" || page.sceneType === "Match intense" ? 6 : 5;

    const analysis = {
      visualRhythm: flow.visualRhythm,
      cameraStrategy: cameras.join(" + "),
      panelComposition: `${flow.transitions}; ${flow.splash}`,
      graphicDensity: page.dramaticIntensity >= 7 ? "encrage dense contrasté" : "densité moyenne aérée",
      motionLinesDensity: page.dramaticIntensity >= 8 ? "élevée" : "modérée",
      visualEnergy: page.sceneType,
      emotionalPacing: page.dominantEmotion,
      storyArcBeat: `${project.arcMemory.emotionalEvolution[page.pageNumber - 1] || "montée"} / enjeu ${page.emotionalStake}`
    };

    const panels = Array.from({ length: panelCount }).map((_, i) => ({
      panelNumber: i + 1,
      description: `Case ${i + 1}: ${page.keyMoment}; objectif ${page.objective}; enjeu ${page.emotionalStake}.`,
      cameraAngle: cameras[i % cameras.length],
      shotType: i === panelCount - 1 ? "impact final" : i % 2 === 0 ? "plan serré" : "plan dynamique",
      emotion: page.dominantEmotion,
      dialogueFr: `"${page.presentCharacters[0] || "Héros"}, on avance ensemble."`,
      sfxFr: SFX[i % SFX.length],
      flowNote: i === panelCount - 1 ? "climax de page" : "montée progressive"
    }));

    return { pageNumber: page.pageNumber, title: `Planche ${page.pageNumber} — ${page.sceneType}`, panelCount, analysis, panels };
  });
}

export function buildImagePrompt(project: ProjectDraft, storyboard: StoryboardPage) {
  const dna = characterDNAEngine(project).join(" ");
  const energy = mangaEnergySystem(project).join(" ");
  const panelText = storyboard.panels
    .map((p) => `Case ${p.panelNumber}: ${p.description}; caméra ${p.cameraAngle}; plan ${p.shotType}; émotion ${p.emotion}; dialogue ${p.dialogueFr}; SFX ${p.sfxFr}; flow ${p.flowNote}`)
    .join("\n");

  return [
    "Réalisation manga premium couleur, lisible, cohérente et cinématique.",
    `Synopsis: ${project.globalScenario.synopsis}`,
    `Thème émotionnel: ${project.globalScenario.emotionalTheme}`,
    `Influence de rythme/composition/textures: ${project.globalScenario.styleInfluence} (sans imitation directe).`,
    `Director analysis: rythme ${storyboard.analysis.visualRhythm}; caméra ${storyboard.analysis.cameraStrategy}; composition ${storyboard.analysis.panelComposition}; densité ${storyboard.analysis.graphicDensity}; motion lines ${storyboard.analysis.motionLinesDensity}.`,
    `Character DNA: ${dna}`,
    `Manga Energy Signatures: ${energy}`,
    panelText,
    "Inclure panels dynamiques, split panels, overlaps, halftone, encrage texturé, speed lines, contrastes forts, perspectives dramatiques, aura symbolique, dialogues manuscrits en français et narration émotionnelle fluide."
  ].join("\n");
}

export function continuityNotes(pages: GeneratedPage[]) {
  return pages.map((p, i) => ({ ...p, continuity: i === 0 ? "Setup émotionnel initial." : `Suit l'évolution dramatique depuis la planche ${i}.` }));
}
