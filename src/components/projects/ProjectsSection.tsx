"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { Stage } from "@/components/stage/Stage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StepControls } from "@/components/ui/StepControls";
import { projects } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";
import { ProjectCard } from "./ProjectCard";
import styles from "./ProjectsSection.module.css";

const count = projects.length;
/* Three copies of the list let the track always slide; it jumps back to the middle copy once a slide ends. */
const track = [...projects, ...projects, ...projects];
const slideMs = 700;
const autoplayMs = 5000;

const wrap = (i: number) => ((i % count) + count) % count;
const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectsSection() {
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const busy = useRef(false);
  const settle = useRef<number | undefined>(undefined);

  const go = useCallback((direction: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    setAnimate(true);
    setIndex((i) => i + direction);
    settle.current = window.setTimeout(() => {
      setAnimate(false);
      setIndex((i) => wrap(i) + count);
      busy.current = false;
    }, slideMs);
  }, []);

  useEffect(() => () => window.clearTimeout(settle.current), []);

  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? false), {
      threshold: 0.5,
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") go(1);
    }, autoplayMs);
    return () => window.clearInterval(timer);
  }, [inView, paused, go]);

  const active = wrap(index);
  const { t } = useLanguage();

  return (
    <Stage id="projects" label={t.projects.label}>
      <SectionTitle script={t.projects.script} title={t.projects.title} />

      <div
        className={styles.viewport}
        role="region"
        aria-roledescription={t.projects.carouselRole}
        aria-label={t.projects.carousel}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ul
          className={styles.track}
          data-animate={animate}
          style={{ "--index": index } as CSSProperties}
        >
          {track.map((project, position) => {
            const isOriginal = position >= count && position < count * 2;
            return (
              <li
                key={`${project.id}-${position}`}
                className={styles.slide}
                aria-hidden={!isOriginal}
                inert={!isOriginal}
              >
                <ProjectCard project={project} number={wrap(position) + 1} />
              </li>
            );
          })}
        </ul>
      </div>

      <StepControls
        className={styles.controls}
        counter={`${pad(active + 1)}  /  ${pad(count)}`}
        progress={(active + 1) / count}
        prevLabel={t.projects.previous}
        nextLabel={t.projects.next}
        onPrev={() => go(-1)}
        onNext={() => go(1)}
      />
    </Stage>
  );
}
