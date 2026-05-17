import { NextRequest, NextResponse } from "next/server";
import jsPDF from "jspdf";

export async function POST(req: NextRequest) {
  const { pages, format } = (await req.json()) as { pages: { imageUrl: string; pageNumber: number }[]; format: "pdf" | "png" };

  if (format === "png") {
    return NextResponse.json({
      pngExports: pages.map((p) => ({ pageNumber: p.pageNumber, downloadUrl: p.imageUrl }))
    });
  }

  const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i];
    if (i > 0) pdf.addPage();
    pdf.setFontSize(14);
    pdf.text(`Planche ${page.pageNumber}`, 24, 24);
    pdf.setFontSize(10);
    pdf.text(`Source PNG HD: ${page.imageUrl}`, 24, 44);
  }

  const file = pdf.output("arraybuffer");
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=manga-forge-studio.pdf"
    }
  });
}
