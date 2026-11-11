import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./PortfolioTitle.module.css";

interface PortfolioTitleProps {
  isOpen: boolean;
}

export function PortfolioTitle({ isOpen }: PortfolioTitleProps) {
  const { t } = useLanguage();
  return (
    <header className={styles.header} data-open={isOpen}>
      <h1 className={styles.title}>
        <span className={styles.script}>{t.portfolio.script} </span>
        {t.portfolio.title}
      </h1>
      <p className={styles.hint}>{t.portfolio.hint}</p>
    </header>
  );
}
