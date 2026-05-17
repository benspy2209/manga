"use client";

import { useMemo, useState } from "react";
import { CharacterProfile, PagePlan, ProjectDraft, StoryArcMemory, StoryboardPage, GeneratedPage, CinematicPageType } from "@/lib/types";
import { matteoVsHugoDemo } from "@/lib/demo-data";

const pageTypes: CinematicPageType[] = ["Match intense", "Entraînement", "Flashback", "Révélation", "Rivalité", "Fraternité", "Solitude", "Défaite", "Transformation mentale", "Moment légendaire"];
const emptyArc: StoryArcMemory = { emotionalEvolution: [], rivalries: [], transformations: [], majorScenes: [], previousStakes: [] };
const isDemoMode = !process.env.NEXT_PUBLIC_OPENAI_AVAILABLE;
const newCharacter = (): CharacterProfile => ({ id: crypto.randomUUID(), firstName: "", age: "", role: "", personality: "", relationship: "", playStyle: "", visualTraits: "", referencePhotos: [], dna: { face: "", hairstyle: "", expressions: "", outfit: "", silhouette: "", posture: "", gaze: "", bodyStyle: "" }, energy: { auraColor: "", energyStyle: "", graphicTexture: "", movementStyle: "", visualSignature: "" } });
const newPage = (i: number): PagePlan => ({ pageNumber: i + 1, objective: "", dominantEmotion: "", dramaticIntensity: 7, emotionalStake: "", momentTension: "", sceneType: "Match intense", presentCharacters: [], keyMoment: "", endingType: "tension" });

export default function StudioForm() {
  const [title, setTitle] = useState("Manga Director Studio");
  const [characters, setCharacters] = useState<CharacterProfile[]>([newCharacter()]);
  const [pages, setPages] = useState<PagePlan[]>([newPage(0), newPage(1)]);
  const [pageCount, setPageCount] = useState(2);
  const [synopsis, setSynopsis] = useState("");
  const [theme, setTheme] = useState("");
  const [styleInfluence, setStyleInfluence] = useState<ProjectDraft["globalScenario"]["styleInfluence"]>("Blue Lock");
  const [storyboard, setStoryboard] = useState<StoryboardPage[]>([]);
  const [generated, setGenerated] = useState<GeneratedPage[]>([]);
  const [status, setStatus] = useState("Prêt.");
  const [loading, setLoading] = useState<"idle"|"storyboard"|"generate"|"export">("idle");

  const project: ProjectDraft = useMemo(() => ({ projectTitle: title, characters, pages, arcMemory: emptyArc, globalScenario: { synopsis, emotionalTheme: theme, mangaStyle: "cinématique", styleInfluence, intensity: 8 } }), [title, characters, pages, synopsis, theme, styleInfluence]);

  const loadDemo = () => {
    setTitle(matteoVsHugoDemo.projectTitle); setCharacters(matteoVsHugoDemo.characters); setPages(matteoVsHugoDemo.pages); setPageCount(matteoVsHugoDemo.pages.length); setSynopsis(matteoVsHugoDemo.globalScenario.synopsis); setTheme(matteoVsHugoDemo.globalScenario.emotionalTheme); setStyleInfluence(matteoVsHugoDemo.globalScenario.styleInfluence); setStoryboard([]); setGenerated([]); setStatus("Démo Matteo vs Hugo chargée.");
  };

  const generateStoryboard = async () => { setLoading("storyboard"); setStatus("Génération du storyboard...");
    try { const r = await fetch('/api/storyboard',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({project})}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Erreur storyboard'); setStoryboard(d.storyboard||[]); setStatus("Storyboard prêt. Vous pouvez modifier les dialogues."); } catch (e) { setStatus(`Erreur: ${(e as Error).message}`);} finally {setLoading("idle");}
  };
  const generatePages = async () => { setLoading("generate"); setStatus("Génération des planches...");
    try { const r = await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({project,storyboard})}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'Erreur génération'); setGenerated(d.pages||[]); setStatus(d.mode==='demo'?"Planches mock générées en mode démo.":"Planches générées avec succès."); } catch (e) { setStatus(`Erreur: ${(e as Error).message}`);} finally {setLoading("idle");}
  };
  const exportPdf = async () => { setLoading("export"); setStatus("Export PDF en cours...");
    try { const r=await fetch('/api/export',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pages:generated,format:'pdf'})}); if(!r.ok) throw new Error('Export impossible'); const blob=await r.blob(); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='manga-forge-studio.pdf'; a.click(); URL.revokeObjectURL(url); setStatus("Export PDF réussi."); } catch(e){ setStatus(`Erreur: ${(e as Error).message}`);} finally { setLoading("idle"); }
  };

  return <div className="min-h-screen p-8 grid lg:grid-cols-2 gap-6">
    <section className="glass p-4 space-y-3 overflow-y-auto max-h-[92vh]"><h1 className="text-2xl font-semibold">Director Engine Studio</h1>
      <p className="text-sm text-amber-300">Mode démo actif — aucune génération IA réelle.</p>
      <p className="text-sm text-zinc-400">{status}</p>
      <button className="bg-emerald-500 text-black px-3 py-2 rounded" onClick={loadDemo}>Charger une démo Matteo vs Hugo</button>
      <input className="w-full bg-zinc-900 p-2 rounded" value={title} onChange={(e)=>setTitle(e.target.value)} />
      <textarea className="w-full bg-zinc-900 p-2 rounded" placeholder="Synopsis général" value={synopsis} onChange={(e)=>setSynopsis(e.target.value)} />
      <textarea className="w-full bg-zinc-900 p-2 rounded" placeholder="Thème émotionnel principal" value={theme} onChange={(e)=>setTheme(e.target.value)} />
      <select className="w-full bg-zinc-900 p-2 rounded" value={styleInfluence} onChange={(e)=>setStyleInfluence(e.target.value as ProjectDraft["globalScenario"]["styleInfluence"])}>{["Slam Dunk","Blue Lock","Vagabond","Haikyuu","Jujutsu Kaisen","Naruto","One Punch Man","Akira","Chainsaw Man"].map(x=><option key={x}>{x}</option>)}</select>
      {characters.map((c,i)=><div key={c.id} className="bg-black/30 rounded p-2 space-y-2"><p>Personnage {i+1} — {c.firstName}</p><input className="w-full bg-zinc-900 p-2 rounded" value={c.firstName} onChange={(e)=>{const n=[...characters];n[i].firstName=e.target.value;setCharacters(n);}}/><input className="w-full bg-zinc-900 p-2 rounded" value={c.energy.auraColor} onChange={(e)=>{const n=[...characters];n[i].energy.auraColor=e.target.value;setCharacters(n);}}/></div>)}
      <input type="number" min={1} max={12} className="w-full bg-zinc-900 p-2 rounded" value={pageCount} onChange={(e)=>{const p=Number(e.target.value);setPageCount(p);setPages(Array.from({length:p},(_,i)=>pages[i]||newPage(i)));}}/>
      {pages.map((p,i)=><div key={i} className="bg-black/30 rounded p-2 space-y-2"><p>Planche {i+1}</p><input className="w-full bg-zinc-900 p-2 rounded" value={p.objective} onChange={(e)=>{const n=[...pages];n[i].objective=e.target.value;setPages(n);}}/><input className="w-full bg-zinc-900 p-2 rounded" value={p.dominantEmotion} onChange={(e)=>{const n=[...pages];n[i].dominantEmotion=e.target.value;setPages(n);}}/><select className="w-full bg-zinc-900 p-2 rounded" value={p.sceneType} onChange={(e)=>{const n=[...pages];n[i].sceneType=e.target.value as CinematicPageType;setPages(n);}}>{pageTypes.map(t=><option key={t}>{t}</option>)}</select></div>)}
      <button disabled={loading!=="idle"} className="w-full py-2 rounded bg-white text-black disabled:opacity-50" onClick={generateStoryboard}>{loading==="storyboard"?"Chargement storyboard...":"Générer storyboard réalisateur"}</button>
    </section>
    <section className="glass p-4 space-y-3 overflow-y-auto max-h-[92vh]"><h2 className="text-xl">Storyboard / Planches</h2>
      {storyboard.map((s,si)=><div key={s.pageNumber} className="bg-black/30 rounded p-3"><p>{s.title}</p>{s.panels.map((pn,pi)=><textarea key={pn.panelNumber} className="w-full bg-zinc-900 p-2 rounded mt-2" value={pn.dialogueFr} onChange={(e)=>{const n=[...storyboard];n[si].panels[pi].dialogueFr=e.target.value;setStoryboard(n);}}/> )}</div>)}
      <button disabled={loading!=="idle"||!storyboard.length} className="w-full py-2 rounded bg-accent disabled:opacity-50" onClick={generatePages}>{loading==="generate"?"Génération en cours...":"Générer planches mock"}</button>
      <button disabled={loading!=="idle"||!generated.length} className="w-full py-2 rounded bg-zinc-200 text-black disabled:opacity-50" onClick={exportPdf}>{loading==="export"?"Export...":"Exporter PDF"}</button>
      {generated.map((g)=><div key={g.pageNumber} className="bg-black/30 rounded p-2"><p>Planche {g.pageNumber} — {g.continuity}</p>{g.imageUrl ? <img src={g.imageUrl} alt="planche" className="rounded"/> : <p className="text-zinc-400">Carte mock indisponible.</p>}</div>)}
    </section>
  </div>;
}
