"use client";

import Image from "next/image";
import { Stage } from "@/components/stage/Stage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { schools } from "@/data/education";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./EducationSection.module.css";

export function EducationSection() {
  const { t } = useLanguage();
  const copy = t.education;

  return (
    <Stage id="education" label={copy.label} flow>
      <SectionTitle script={copy.script} title={copy.title} />

      <ol className={styles.timeline}>
        {schools.map((school, index) => {
          const study = copy.studies[index];
          if (!study) return null;
          return (
            <li key={school.school} className={styles.step}>
              <p className={styles.when}>
                <span className={styles.dot} data-current={school.current} aria-hidden="true" />
                <span className={styles.dates}>{study.dates}</span>
              </p>
              <article className={styles.card}>
                <header className={styles.header}>
                  <h3 className={styles.school}>
                    <Image
                      className={styles.logo}
                      src={school.logo.src}
                      width={school.logo.width}
                      height={school.logo.height}
                      alt=""
                    />
                    {school.school}
                  </h3>
                  <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                </header>
                <p className={styles.fullName}>{study.fullName}</p>
                <p className={styles.title}>{study.title}</p>
                <p className={styles.description}>{study.description}</p>
                <ul className={styles.badges}>
                  {study.badges.map((badge, badgeIndex) => (
                    <li key={badge} data-tone={school.badgeTones[badgeIndex] ?? "sand"}>
                      {badge}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          );
        })}
      </ol>
    </Stage>
  );
}
