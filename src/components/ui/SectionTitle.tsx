import styles from "./SectionTitle.module.css";

interface SectionTitleProps {
  script: string;
  title: string;
}

/** "Here's" in script resting on the top-right of the bold title, as in every section of the design. */
export function SectionTitle({ script, title }: SectionTitleProps) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>
        <span className={styles.script}>{script} </span>
        {title}
      </h2>
    </div>
  );
}
