"use client";

import { type MouseEvent, useEffect, useId, useRef } from "react";
import { CloseIcon, DownloadIcon } from "@/components/ui/Icons";
import { cvFiles } from "@/data/cv";
import { type Language, useLanguage } from "@/i18n/LanguageProvider";
import styles from "./CvModal.module.css";

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Asks which language to download the CV in. It speaks the site's current language and offers that
 * version first. Built on <dialog>: focus stays inside, Escape and a click outside close it.
 */
export function CvModal({ open, onClose }: CvModalProps) {
  const { language, t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const order: Language[] = language === "es" ? ["es", "en"] : ["en", "es"];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    // A click on the backdrop lands on the dialog itself; Escape already closes it natively.
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={onBackdropClick}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            <span className={styles.script}>{t.portfolio.cv.script}</span>
            {t.portfolio.cv.title}
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label={t.portfolio.cv.close}>
            <CloseIcon className={styles.closeIcon} />
          </button>
        </div>

        <p className={styles.question}>{t.portfolio.cv.question}</p>

        <div className={styles.options}>
          {order.map((option, index) => (
            <a
              key={option}
              className={styles.option}
              data-primary={index === 0}
              href={cvFiles[option].href}
              download={cvFiles[option].fileName}
              hrefLang={option}
              onClick={onClose}
            >
              <span className={styles.optionTop}>
                <span className={styles.code}>{option.toUpperCase()}</span>
                <DownloadIcon className={styles.downloadIcon} />
              </span>
              <span className={styles.language}>{t.portfolio.cv.languages[option]}</span>
              <span className={styles.format}>{t.portfolio.cv.format}</span>
            </a>
          ))}
        </div>
      </div>
    </dialog>
  );
}
