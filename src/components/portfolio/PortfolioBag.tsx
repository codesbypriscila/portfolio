import Image from "next/image";
import { portfolioBagImage } from "@/data/portfolio";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./PortfolioBag.module.css";

interface PortfolioBagProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function PortfolioBag({ isOpen, onToggle }: PortfolioBagProps) {
  const { t } = useLanguage();
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
      <Image
        className={styles.image}
        src={portfolioBagImage.src}
        width={portfolioBagImage.width}
        height={portfolioBagImage.height}
        sizes="(min-aspect-ratio: 1/1) 55vw, 100vw"
        quality={90}
        loading="eager"
        fetchPriority="high"
        alt=""
      />
    </button>
  );
}
