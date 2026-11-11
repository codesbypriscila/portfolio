"use client";

import { Stage } from "@/components/stage/Stage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useLanguage } from "@/i18n/LanguageProvider";
import { AboutBook } from "./AboutBook";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <Stage id="about" label={t.about.label}>
      <SectionTitle script={t.about.script} title={t.about.title} />
      <AboutBook />
    </Stage>
  );
}
