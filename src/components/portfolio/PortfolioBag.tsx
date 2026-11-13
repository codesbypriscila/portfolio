import { useId } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./PortfolioBag.module.css";

interface PortfolioBagProps {
  isOpen: boolean;
  onToggle: () => void;
}

/** Back board of the folder with its tab, drawn in a 460 × 360 box. */
const BACK_PATH =
  "M0 16Q0 0 16 0H128Q141 0 149 10L158 21Q164 28 175 28H444Q460 28 460 44V344Q460 360 444 360H16Q0 360 0 344Z";

/** The chocolate-brown folder, drawn with vector shapes so it stays sharp. Opening it lowers the front. */
export function PortfolioBag({ isOpen, onToggle }: PortfolioBagProps) {
  const { t } = useLanguage();
  const gradientId = useId();
  return (
    <button
      type="button"
      className={styles.bag}
      data-open={isOpen}
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls="portfolio-items"
      aria-label={isOpen ? t.portfolio.close : t.portfolio.open}
    >
      <span className={styles.folder} aria-hidden="true">
        <svg className={styles.back} viewBox="0 0 460 360" preserveAspectRatio="none" focusable="false">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a251e" />
              <stop offset="1" stopColor="#2e1d17" />
            </linearGradient>
          </defs>
          <path d={BACK_PATH} fill={`url(#${gradientId})`} />
        </svg>
        <span className={styles.inside} />
        <span className={styles.front} />
      </span>
    </button>
  );
}
