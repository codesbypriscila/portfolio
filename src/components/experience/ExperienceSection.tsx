"use client";

import Image from "next/image";
import { Stage } from "@/components/stage/Stage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { company, roleIsCurrent } from "@/data/experience";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./ExperienceSection.module.css";

export function ExperienceSection() {
  const { t } = useLanguage();
  const copy = t.experience;

  return (
    <Stage id="experience" label={copy.label} flow>
      <SectionTitle script={copy.script} title={copy.title} />

      <div className={styles.company}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <div className={styles.companyName}>
          <h3 className={styles.name}>{company.name}</h3>
          <Image
            className={styles.logo}
            src={company.logo.src}
            width={company.logo.width}
            height={company.logo.height}
            alt={copy.logoAlt}
          />
        </div>
        <div className={styles.meta}>
          {copy.meta.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <span className={styles.divider} aria-hidden="true" />
        <p className={styles.since}>{copy.since}</p>
        <p className={styles.sinceLabel}>{copy.sinceLabel}</p>
      </div>

      <ol className={styles.timeline}>
        {copy.roles.map((role, index) => {
          const current = roleIsCurrent[index] ?? false;
          return (
            <li key={role.dates} className={styles.role}>
              <span className={styles.dot} data-current={current} aria-hidden="true" />
              <div className={styles.content}>
                <p className={styles.dates}>
                  {role.dates}
                  {current && <span className={styles.current}>{copy.current}</span>}
                </p>
                <h3 className={styles.title}>{role.title}</h3>
                <p className={styles.place}>{role.place}</p>
                <ul className={styles.highlights}>
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul className={styles.tags} aria-label={copy.skills}>
                  {role.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </Stage>
  );
}
