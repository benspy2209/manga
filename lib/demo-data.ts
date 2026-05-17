import { ProjectDraft } from "@/lib/types";

export const matteoVsHugoDemo: ProjectDraft = {
  projectTitle: "Matteo vs Hugo — Frères de court",
  characters: [
    {
      id: "matteo",
      firstName: "Matteo",
      age: "16",
      role: "Grand frère / attaquant",
      personality: "Volontaire, protecteur, fier",
      relationship: "Frère aîné de Hugo",
      playStyle: "Puissance explosive en fond de court",
      visualTraits: "Yeux déterminés, bandeau rouge, posture ancrée",
      referencePhotos: [],
      dna: { face: "mâchoire marquée", hairstyle: "cheveux bruns en bataille", expressions: "regard intense", outfit: "tenue sport rouge/noir", silhouette: "athlétique", posture: "buste vers l'avant", gaze: "fixe et perçant", bodyStyle: "appuis lourds" },
      energy: { auraColor: "orange/rouge", energyStyle: "explosive", graphicTexture: "encre épaisse", movementStyle: "frappes lourdes", visualSignature: "impact et éclats" }
    },
    {
      id: "hugo",
      firstName: "Hugo",
      age: "11",
      role: "Petit frère / prodige instinctif",
      personality: "Curieux, rapide, intuitif",
      relationship: "Frère cadet de Matteo",
      playStyle: "Vitesse fluide et lecture instinctive",
      visualTraits: "Regard vif, mèches claires, déplacements légers",
      referencePhotos: [],
      dna: { face: "traits fins", hairstyle: "cheveux courts bleutés", expressions: "sourire nerveux", outfit: "tenue sport bleu/blanc", silhouette: "fine et nerveuse", posture: "souple", gaze: "mobile", bodyStyle: "léger" },
      energy: { auraColor: "bleu/blanc", energyStyle: "fluide", graphicTexture: "lignes fines", movementStyle: "accélérations imprévisibles", visualSignature: "traînées lumineuses" }
    }
  ],
  globalScenario: {
    synopsis:
      "Deux frères s’entraînent au tennis. Matteo, 16 ans, joue avec puissance. Hugo, 11 ans, joue avec instinct. Ils rêvent de s’affronter, mais la vraie victoire est leur lien fraternel.",
    emotionalTheme: "Grandir sans se perdre, se dépasser ensemble",
    mangaStyle: "cinématique",
    styleInfluence: "Blue Lock",
    intensity: 8
  },
  pages: [
    { pageNumber: 1, objective: "Installer la rivalité fraternelle sur le court", dominantEmotion: "défi", dramaticIntensity: 7, emotionalStake: "prouver sa valeur", momentTension: "montée", sceneType: "Entraînement", presentCharacters: ["Matteo", "Hugo"], keyMoment: "premier échange explosif", endingType: "tension" },
    { pageNumber: 2, objective: "Montrer l’escalade émotionnelle et technique", dominantEmotion: "tension", dramaticIntensity: 9, emotionalStake: "ne pas céder", momentTension: "domination inversée", sceneType: "Match intense", presentCharacters: ["Matteo", "Hugo"], keyMoment: "rallye impossible", endingType: "cliffhanger" },
    { pageNumber: 3, objective: "Conclure sur le lien fraternel sans vainqueur", dominantEmotion: "émotion", dramaticIntensity: 8, emotionalStake: "rester frères avant tout", momentTension: "apaisement", sceneType: "Fraternité", presentCharacters: ["Matteo", "Hugo"], keyMoment: "balle impossible arrêtée", endingType: "révélation" }
  ],
  arcMemory: {
    emotionalEvolution: ["rivalité ludique", "conflit intérieur", "réconciliation"],
    rivalries: ["Matteo vs Hugo"],
    transformations: ["Matteo apprend à lâcher le contrôle", "Hugo assume son instinct"],
    majorScenes: ["échange d’ouverture", "rallye impossible", "arrêt du match sur balle injouable"],
    previousStakes: ["devenir le meilleur", "protéger le lien fraternel"]
  }
};
