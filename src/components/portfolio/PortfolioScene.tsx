"use client";

import { usePortfolioToggle } from "@/hooks/usePortfolioToggle";
import { useLanguage } from "@/i18n/LanguageProvider";
import { PortfolioBag } from "./PortfolioBag";
import { PortfolioItems } from "./PortfolioItems";
import { PortfolioTitle } from "./PortfolioTitle";
import styles from "./PortfolioScene.module.css";

export function PortfolioScene() {
  const { isOpen, toggle } = usePortfolioToggle();
  const { t } = useLanguage();

  return (
    <section id="home" className={styles.scene} aria-label={t.portfolio.label}>
      <div className={styles.stage}>
        <PortfolioTitle isOpen={isOpen} />
        <PortfolioItems isOpen={isOpen} />
        <PortfolioBag isOpen={isOpen} onToggle={toggle} />
      </div>
    </section>
  );
}
