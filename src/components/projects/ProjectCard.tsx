import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Project } from "@/types/projects";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  project: Project;
  number: number;
}

const linksPerRow = 3;

export function ProjectCard({ project, number }: ProjectCardProps) {
  const { t } = useLanguage();
  const rows: (typeof project.links)[] = [];
  for (let i = 0; i < project.links.length; i += linksPerRow) rows.push(project.links.slice(i, i + linksPerRow));

  return (
    <article className={styles.card}>
      <div className={styles.text}>
        <header className={styles.header}>
          <h3 className={styles.name}>{project.name}</h3>
          <span className={styles.number}>{String(number).padStart(2, "0")}</span>
        </header>
        <p className={styles.description}>{t.projects.descriptions[project.id]}</p>
        <p className={styles.stack}>{project.stack.join(" · ")}</p>
      </div>
      <div className={styles.links}>
        {rows.map((row) => (
          <div key={row.map((link) => link.href).join()} className={styles.row}>
            {row.map((link) => (
              <a
                key={link.href}
                className={styles.link}
                data-primary={link.primary ?? false}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {typeof link.label === "string" ? link.label : t.projects[link.label.translated]}
                <ArrowUpRightIcon className={styles.icon} />
              </a>
            ))}
          </div>
        ))}
      </div>
    </article>
  );
}
