"use client";

import {
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Stage } from "@/components/stage/Stage";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";
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
/* A horizontal drag longer than this (px) on a touch screen is a swipe. */
const swipeMin = 40;

const wrap = (i: number) => ((i % count) + count) % count;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The projects carousel turns by itself every 5 s and can still be moved by hand: the arrows, a click on
 * the cards at either side or a swipe. Moving it by hand restarts the timer; hovering, keyboard focus or
 * the pause button stop it, and it never turns by itself with reduced motion.
 */
export function ProjectsSection() {
  const [index, setIndex] = useState(count);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [restart, setRestart] = useState(0);
  const busy = useRef(false);
  const settle = useRef<number | undefined>(undefined);
  const viewportRef = useRef<HTMLDivElement>(null);
  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);
  const swiped = useRef(false);

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

  /** A move asked for by the visitor: it also restarts the autoplay timer. */
  const move = useCallback(
    (direction: 1 | -1) => {
      go(direction);
      setRestart((n) => n + 1);
    },
    [go],
  );

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

  const paused = hovered || stopped;

  useEffect(() => {
    if (!inView || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") go(1);
    }, autoplayMs);
    return () => window.clearInterval(timer);
  }, [inView, paused, go, restart]);

  /* A click beside the centred card moves the carousel towards that side instead of following a link. */
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (swiped.current) {
      swiped.current = false;
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    const activeCard = viewportRef.current?.querySelector<HTMLElement>("[data-active='true']");
    if (!activeCard) return;
    const { left, right } = activeCard.getBoundingClientRect();
    if (e.clientX >= left && e.clientX <= right) return;
    e.preventDefault();
    e.stopPropagation();
    move(e.clientX < left ? -1 : 1);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    swiped.current = false;
    if (e.pointerType === "mouse") return;
    swipe.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) < swipeMin || Math.abs(dx) < Math.abs(e.clientY - start.y)) return;
    swiped.current = true;
    move(dx < 0 ? 1 : -1);
  };

  const active = wrap(index);
  const { t } = useLanguage();

  return (
    <Stage id="projects" label={t.projects.label}>
      <SectionTitle script={t.projects.script} title={t.projects.title} />

      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-roledescription={t.projects.carouselRole}
        aria-label={t.projects.carousel}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipe.current = null;
        }}
        onClickCapture={onClickCapture}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
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
                data-active={position === index}
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
        onPrev={() => move(-1)}
        onNext={() => move(1)}
      />

      <div className={styles.autoplay}>
        <button
          type="button"
          className={styles.pause}
          onClick={() => setStopped((s) => !s)}
          aria-label={stopped ? t.projects.play : t.projects.pause}
        >
          {stopped ? <PlayIcon className={styles.pauseIcon} /> : <PauseIcon className={styles.pauseIcon} />}
        </button>
        <span className={styles.autoplayLabel} data-stopped={stopped}>
          {t.projects.autoplay}
        </span>
      </div>
    </Stage>
  );
}
