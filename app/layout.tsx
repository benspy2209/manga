import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manga Forge Studio",
  description: "Cinematic full-color manga page generator"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
