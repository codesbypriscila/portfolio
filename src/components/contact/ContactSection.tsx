"use client";

import { useEffect, useState } from "react";
import { Stage } from "@/components/stage/Stage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { contactLinks } from "@/data/contact";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ContactIcon } from "./ContactIcon";
import styles from "./ContactSection.module.css";

export function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const copy = t.contact;

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <Stage id="contact" label={copy.label}>
      <SectionTitle script={copy.script} title={copy.title} />

      <div className={styles.scene} data-open={isOpen}>
        <span className={styles.floor} aria-hidden="true" />

        <div className={styles.envelope}>
          <span className={styles.inside} aria-hidden="true" />

          <span className={styles.flapShadow} aria-hidden="true">
            <span className={styles.flap}>
              <span className={styles.flapOuter} />
              <span className={styles.flapInner} />
            </span>
          </span>

          <div className={styles.slot}>
            <div id="contact-letter" className={styles.letter} inert={!isOpen}>
              <h3 className={styles.heading}>
                <span className={styles.script}>{copy.letterScript}</span>
                {copy.letterTitle}
              </h3>
              <p className={styles.intro}>{copy.intro}</p>
              <ul className={styles.links}>
                {contactLinks.map((link) => (
                  <li key={link.icon}>
                    <a
                      className={styles.link}
                      href={link.href(copy.emailSubject)}
                      {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      <span className={styles.icon} data-icon={link.icon}>
                        <ContactIcon icon={link.icon} />
                      </span>
                      <span className={styles.label}>
                        <span className={styles.name}>{copy.names[link.icon]}</span>
                        <span className={styles.handle}>{link.handle}</span>
                      </span>
                      <ArrowUpRightIcon className={styles.arrow} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <span className={`${styles.piece} ${styles.left}`} aria-hidden="true" />
          <span className={`${styles.piece} ${styles.right}`} aria-hidden="true" />
          <span className={styles.bottomShadow} aria-hidden="true">
            <span className={`${styles.piece} ${styles.bottom}`} />
          </span>

          <span className={styles.seal} aria-hidden="true">
            <span className={styles.sealRing}>P</span>
          </span>

          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="contact-letter"
            aria-label={isOpen ? copy.close : copy.open}
          />
        </div>

        <p className={styles.hint}>{copy.hint}</p>
      </div>
    </Stage>
  );
}
