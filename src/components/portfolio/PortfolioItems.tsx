"use client";

import { useState } from "react";
import { portfolioItems } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import { CvModal } from "./CvModal";
import { FloatingItem } from "./FloatingItem";
import styles from "./PortfolioItems.module.css";

interface PortfolioItemsProps {
  isOpen: boolean;
}

export function PortfolioItems({ isOpen }: PortfolioItemsProps) {
  const { t } = useLanguage();
  const [cvOpen, setCvOpen] = useState(false);
  return (
    <>
      <nav aria-label={t.portfolio.sections} inert={!isOpen}>
        <ul id="portfolio-items" className={styles.list}>
          {portfolioItems.map((item, order) => (
            <FloatingItem
              key={item.id}
              item={item}
              label={t.portfolio.items[item.id]}
              order={order}
              isOpen={isOpen}
              onActivate={item.id === "cv" ? () => setCvOpen(true) : undefined}
            />
          ))}
        </ul>
      </nav>
      <CvModal open={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
