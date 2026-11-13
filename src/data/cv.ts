import type { Language } from "@/i18n/LanguageProvider";

/** The one-page CV in each language (made in Overleaf), served from `public/cv`. */
export const cvFiles: Record<Language, { href: string; fileName: string }> = {
  es: { href: "/cv/priscila-perez-cv-es.pdf", fileName: "Priscila-Perez-CV-ES.pdf" },
  en: { href: "/cv/priscila-perez-cv-en.pdf", fileName: "Priscila-Perez-CV-EN.pdf" },
};
