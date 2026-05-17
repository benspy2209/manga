import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/clients";
import { buildImagePrompt, continuityNotes } from "@/lib/engines";
import { ProjectDraft, StoryboardPage, GeneratedPage } from "@/lib/types";

function createMockCard(page: StoryboardPage, objective: string, aura: string) {
  const lines = page.panels.slice(0, 3).map((p) => `${p.dialogueFr} (${p.sfxFr})`).join(" • ");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='1600'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%' stop-color='#0a0a0a'/><stop offset='100%' stop-color='#1f2937'/></linearGradient></defs>
  <rect width='100%' height='100%' fill='url(#g)'/>
  <rect x='45' y='45' width='1110' height='1510' fill='none' stroke='${aura}' stroke-width='6'/>
  <text x='80' y='120' fill='#fff' font-size='48' font-family='Arial'>${page.title}</text>
  <text x='80' y='190' fill='#d4d4d8' font-size='30' font-family='Arial'>Objectif: ${objective}</text>
  <text x='80' y='250' fill='#a1a1aa' font-size='28' font-family='Arial'>Composition: ${page.analysis.panelComposition}</text>
  <text x='80' y='310' fill='#a1a1aa' font-size='28' font-family='Arial'>Émotion: ${page.analysis.emotionalPacing}</text>
  <text x='80' y='370' fill='${aura}' font-size='28' font-family='Arial'>Aura dominante: ${aura}</text>
  <foreignObject x='80' y='440' width='1020' height='1000'><div xmlns='http://www.w3.org/1999/xhtml' style='color:#fff;font-family:Arial;font-size:26px;line-height:1.4'>${lines}</div></foreignObject>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export async function POST(req: NextRequest) {
  try {
    const { project, storyboard } = (await req.json()) as { project: ProjectDraft; storyboard: StoryboardPage[] };
    if (!project || !storyboard?.length) {
      return NextResponse.json({ error: "Payload invalide pour la génération." }, { status: 400 });
    }

    const generated: GeneratedPage[] = [];
    const isDemoMode = !process.env.OPENAI_API_KEY;

    for (const page of storyboard) {
      const prompt = buildImagePrompt(project, page);
      if (isDemoMode) {
        const aura = project.characters[0]?.energy.auraColor || "#f97316";
        generated.push({ pageNumber: page.pageNumber, objective: project.pages[page.pageNumber - 1]?.objective || "", imageUrl: createMockCard(page, project.pages[page.pageNumber - 1]?.objective || "", aura), continuity: "", promptUsed: `[DEMO] ${prompt}` });
      } else {
        const image = await openai.images.generate({ model: "gpt-image-1", prompt, size: "1536x1024" });
        generated.push({ pageNumber: page.pageNumber, objective: project.pages[page.pageNumber - 1]?.objective || "", imageUrl: image.data[0]?.url || "", continuity: "", promptUsed: prompt });
      }
    }

    return NextResponse.json({ pages: continuityNotes(generated), mode: isDemoMode ? "demo" : "live" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur pendant la génération." }, { status: 500 });
  }
}
