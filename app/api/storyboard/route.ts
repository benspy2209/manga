import { NextRequest, NextResponse } from "next/server";
import { directorEngine } from "@/lib/engines";
import { ProjectDraft } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { project } = (await req.json()) as { project: ProjectDraft };
  return NextResponse.json({ storyboard: directorEngine(project) });
}
