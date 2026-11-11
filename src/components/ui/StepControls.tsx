import { ArrowLeftIcon, ArrowRightIcon } from "./Icons";
import styles from "./StepControls.module.css";

interface StepControlsProps {
  className?: string;
  counter: string;
  progress: number;
  prevLabel: string;
  nextLabel: string;
  onPrev: () => void;
  onNext: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

/** Round previous/next buttons around a counter and a gold progress bar. */
export function StepControls({
  className,
  counter,
  progress,
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
}: StepControlsProps) {
  return (
    <div className={[styles.controls, className].filter(Boolean).join(" ")}>
      <button type="button" className={styles.button} onClick={onPrev} disabled={prevDisabled} aria-label={prevLabel}>
        <ArrowLeftIcon className={styles.icon} />
      </button>
      <div className={styles.progress}>
        <p className={styles.counter} aria-live="polite">
          {counter}
        </p>
        <span className={styles.bar} aria-hidden="true">
          <span className={styles.fill} style={{ transform: `scaleX(${progress})` }} />
        </span>
      </div>
      <button type="button" className={styles.button} onClick={onNext} disabled={nextDisabled} aria-label={nextLabel}>
        <ArrowRightIcon className={styles.icon} />
      </button>
    </div>
  );
}
