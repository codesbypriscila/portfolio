"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { languages, useLanguage } from "@/i18n/LanguageProvider";
import styles from "./SiteNav.module.css";

const sectionIds = ["home", "about", "projects", "experience", "education"] as const;

export function SiteNav() {
  const active = useActiveSection(sectionIds);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.nav}>
      <a className={styles.brand} href="#home">
        Priscila
      </a>
      <nav className={styles.main} aria-label={t.nav.main}>
        <ul className={styles.links}>
          {sectionIds.map((id) => (
            <li key={id}>
              <a className={styles.link} href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                {t.nav.links[id]}
                <span className={styles.dot} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.actions}>
        <div className={styles.switch} role="group" aria-label={t.nav.language}>
          {languages.map((code) => (
            <button
              key={code}
              type="button"
              className={styles.lang}
              lang={code}
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <a className={styles.contact} href="#contact">
          <span className={styles.contactDot} aria-hidden="true" />
          {t.nav.contact}
        </a>
      </div>
    </header>
  );
}
