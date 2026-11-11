"use client";

import { useEffect } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { languages, useLanguage } from "@/i18n/LanguageProvider";
import { unlockSite, useSiteUnlocked } from "@/lib/explore";
import styles from "./SiteNav.module.css";

const sectionIds = ["home", "about", "projects", "experience", "education"] as const;

/** Hidden on the first screen; it slides in once the visitor picks a section from the folder. */
export function SiteNav() {
  const active = useActiveSection(sectionIds);
  const { language, setLanguage, t } = useLanguage();
  const unlocked = useSiteUnlocked();

  useEffect(() => {
    // A link straight to a section (…/#projects) skips the folder; otherwise always start at the top.
    if (window.location.hash) unlockSite();
    else history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (unlocked) return;
    // While locked, nothing (a restored position, the keyboard, a touch fling) may move the page.
    const keepTop = () => {
      // The attribute goes away the instant a section is picked, before this listener is removed.
      if (document.documentElement.dataset.locked && window.scrollY !== 0) window.scrollTo(0, 0);
    };
    keepTop();
    window.addEventListener("scroll", keepTop, { passive: true });
    return () => window.removeEventListener("scroll", keepTop);
  }, [unlocked]);

  return (
    <header className={styles.nav} data-visible={unlocked} inert={!unlocked}>
      <span className={styles.spacer} aria-hidden="true" />
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
