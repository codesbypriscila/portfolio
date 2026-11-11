import type { ReactNode } from "react";
import styles from "./Stage.module.css";

interface StageProps {
  id: string;
  label: string;
  /** On portrait screens, let the content flow and the section grow instead of fitting one screen. */
  flow?: boolean;
  children: ReactNode;
}

/** A full-screen section whose content is laid out in design pixels (`--u`). */
export function Stage({ id, label, flow = false, children }: StageProps) {
  return (
    <section id={id} className={flow ? `${styles.scene} ${styles.flow}` : styles.scene} aria-label={label}>
      <div className={styles.stage}>{children}</div>
    </section>
  );
}
