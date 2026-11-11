import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priscila Pérez — Portfolio",
  description:
    "Priscila Pérez's portfolio: projects, experience, education and how to reach me. / Portafolio de Priscila Pérez: proyectos, experiencia, educación y contacto.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // data-locked: the page starts on the closed folder; picking a section unlocks scrolling (src/lib/explore.ts).
    <html lang="en" className={fontVariables} data-locked="true" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
