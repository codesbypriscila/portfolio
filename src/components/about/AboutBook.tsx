"use client";

import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { type KeyboardEvent, type PointerEvent, type ReactNode, useEffect, useMemo, useRef } from "react";
import { StepControls } from "@/components/ui/StepControls";
import { aboutImages } from "@/data/about";
import { useElementWidth } from "@/hooks/useElementWidth";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { type FlipDirection, usePageFlip } from "@/hooks/usePageFlip";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./AboutBook.module.css";
import { BlankPage, BookPage, pageCounts, singlePage, spreadPage } from "./BookPages";
import { TurningLeaf } from "./TurningLeaf";

interface Leaf {
  front: number | null;
  back: number | null;
}

/** Wide screens: leaf n carries pages (2n, 2n+1). Portrait: every sheet is its own leaf. */
function buildLeaves(single: boolean): Leaf[] {
  const total = (single ? pageCounts.single : pageCounts.spread) + 1;
  if (single) return Array.from({ length: total }, (_, i) => ({ front: i, back: null }));
  return Array.from({ length: Math.ceil(total / 2) }, (_, n) => ({
    front: 2 * n,
    back: 2 * n + 1 < total ? 2 * n + 1 : null,
  }));
}

interface PointerState {
  id: number;
  startX: number;
  startY: number;
  lastX: number;
  lastT: number;
  vx: number;
  side: "left" | "right";
  dir: FlipDirection | null;
  dragging: boolean;
}

/** The About Me book: turn its pages by dragging, clicking either side, the arrows or the keyboard. */
export function AboutBook() {
  const areaRef = useRef<HTMLDivElement>(null);
  const width = useElementWidth(areaRef);
  const single = useMediaQuery("(max-aspect-ratio: 1/1)");

  return (
    <div ref={areaRef} className={styles.area}>
      {width > 0 && <Book key={single ? "single" : "spread"} single={single} size={single ? width : width / 2} />}
    </div>
  );
}

/** `size` is the width of one page; single sheets are taller than they are wide. */
function Book({ single, size }: { single: boolean; size: number }) {
  const { t } = useLanguage();
  const leaves = useMemo(() => buildLeaves(single), [single]);
  const base = single ? singlePage : spreadPage;
  const height = (size * base.height) / base.width;
  const pageCount = single ? pageCounts.single : pageCounts.spread;
  // The last leaf never turns: the book ends on its last spread (or its last sheet).
  const turnable = leaves.length - 1;
  const flip = usePageFlip({ leafCount: turnable });

  const stageRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState | null>(null);
  const interacted = useRef(false);

  const pad = (n: number) => String(n).padStart(2, "0");
  const counter =
    flip.current === 0
      ? `${t.about.cover}  /  ${single ? pad(pageCount) : pageCount}`
      : single
        ? `${pad(flip.current)}  /  ${pad(pageCount)}`
        : `${pad(flip.current * 2 - 1)} — ${pad(flip.current * 2)}  /  ${pageCount}`;

  const next = () => {
    interacted.current = true;
    flip.next();
  };
  const prev = () => {
    interacted.current = true;
    flip.prev();
  };

  // ---- The closed book sits centred; the open book is centred on its spine ----
  const bookX = useMotionValue(0);
  const closedOffset = single ? 0 : -size / 2;
  const settled = flip.turn ? flip.current + flip.turn.dir : flip.current;
  const centredX = settled === 0 ? closedOffset : 0;
  const placed = useRef(false);
  useEffect(() => {
    const controls = animate(bookX, centredX, { duration: placed.current ? 1 : 0, ease: [0.16, 1, 0.3, 1] });
    placed.current = true;
    return () => controls.stop();
  }, [bookX, centredX]);

  // ---- Entrance: the book tilts up as it scrolls in, then opens itself ----
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "center center"] });
  const tilt = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const inView = useInView(stageRef, { amount: 0.6, once: true });
  const flipRef = useRef(flip);
  useEffect(() => {
    flipRef.current = flip;
  });
  useEffect(() => {
    if (!inView) return;
    const timer = window.setTimeout(() => {
      if (!interacted.current && flipRef.current.current === 0) flipRef.current.next();
    }, 700);
    return () => window.clearTimeout(timer);
  }, [inView]);

  // ---- Pointer: click a side to turn, drag to bend the page ----
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const rect = bookRef.current?.getBoundingClientRect();
    const spineX = rect ? (single ? rect.left + rect.width / 2 : rect.left + size) : e.clientX;
    pointer.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastT: e.timeStamp,
      vx: 0,
      side: e.clientX >= spineX ? "right" : "left",
      dir: null,
      dragging: false,
    };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.startX;
    const dy = e.clientY - p.startY;

    if (!p.dragging) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      const dir: FlipDirection = single ? (dx < 0 ? 1 : -1) : p.side === "right" ? 1 : -1;
      if ((dir === 1 && dx > 0) || (dir === -1 && dx < 0) || !flip.drag.start(dir)) {
        pointer.current = null;
        return;
      }
      interacted.current = true;
      p.dir = dir;
      p.dragging = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // The pointer may already be gone (e.g. a cancelled touch); the drag still works without capture.
      }
    }

    const dt = Math.max(1, e.timeStamp - p.lastT);
    p.vx = 0.8 * ((e.clientX - p.lastX) / dt) + 0.2 * p.vx;
    p.lastX = e.clientX;
    p.lastT = e.timeStamp;

    const travel = single ? size * 1.1 : size * 1.6;
    flip.drag.move(p.dir === 1 ? -dx / travel : 1 - dx / travel);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const p = pointer.current;
    pointer.current = null;
    if (!p || p.id !== e.pointerId) return;

    if (p.dragging && p.dir) {
      const progress = flip.progress.get();
      const commit = p.dir === 1 ? progress > 0.35 || p.vx < -0.45 : progress < 0.65 || p.vx > 0.45;
      flip.drag.end(commit);
      return;
    }
    // A plain click or tap turns towards the side that was pressed.
    if (Math.abs(e.clientX - p.startX) > 8) return;
    if (flip.current === 0) return next();
    if (p.side === "right") next();
    else prev();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  // ---- What lies where ----
  const { turn, current } = flip;
  const leftLeaf = turn ? (turn.dir === 1 ? current - 1 : current - 2) : current - 1;
  const rightLeaf = turn ? (turn.dir === 1 ? current + 1 : current) : current;
  const turning = turn ? leaves[turn.leaf] : undefined;

  const page = (index: number | null | undefined): ReactNode =>
    index === null || index === undefined ? <BlankPage /> : <BookPage index={index} single={single} />;

  const scale = size / base.width;
  const scaled = (node: ReactNode) => (
    <div className={styles.scaled} style={{ width: base.width, height: base.height, transform: `scale(${scale})` }}>
      {node}
    </div>
  );

  // Shadows the turning leaf casts on the pages underneath.
  const edge = useTransform(flip.progress, (p) => Math.cos(p * Math.PI));
  const castOpacity = useTransform(flip.progress, (p) => Math.sin(p * Math.PI) * 0.5);
  const rightCastLeft = useTransform(edge, (v) => `${Math.max(0, v) * 100}%`);
  const leftCastRight = useTransform(edge, (v) => `${Math.max(0, -v) * 100}%`);

  const bookWidth = single ? size : size * 2;
  const spineLeft = single ? 0 : size;
  const showLeft = !single && (leftLeaf >= 0 || (turn !== null && turn.dir === 1));
  const rightPage = rightLeaf < leaves.length ? leaves[rightLeaf] : undefined;

  return (
    <>
      <div ref={stageRef} className={styles.stage} style={{ perspective: single ? 1600 : 2600 }}>
        <span aria-hidden className={styles.floor} style={{ width: bookWidth * 0.85 }} />

        <motion.div
          className={styles.tilt}
          style={{ width: bookWidth, height, rotateX: tilt, y: lift }}
        >
          <motion.div
            ref={bookRef}
            role="region"
            aria-roledescription={t.about.bookRole}
            aria-label={t.about.bookLabel}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className={styles.book}
            style={{ x: bookX }}
          >
            {/* Leather boards behind the paper */}
            <span
              aria-hidden
              className={`${styles.board} ${single ? styles.boardSingle : styles.boardRight}`}
              style={{ left: single ? undefined : spineLeft }}
            >
              <Image src={aboutImages.leather.src} fill sizes="30vw" quality={90} alt="" draggable={false} />
              {showLeft && <span className={`${styles.edges} ${styles.edgesRight}`} />}
            </span>
            {showLeft && (
              <span aria-hidden className={`${styles.board} ${styles.boardLeft}`} style={{ right: `calc(100% - ${size}px)` }}>
                <Image src={aboutImages.leather.src} fill sizes="30vw" quality={90} alt="" draggable={false} />
                <span className={`${styles.edges} ${styles.edgesLeft}`} />
              </span>
            )}

            {!single && leftLeaf >= 0 && (
              <div className={styles.page} style={{ left: 0, width: size, height }}>
                {scaled(page(leaves[leftLeaf]?.back))}
                <div className={styles.castClip}>
                  <motion.div
                    aria-hidden
                    className={`${styles.cast} ${styles.castLeft}`}
                    style={{ right: leftCastRight, opacity: turn ? castOpacity : 0 }}
                  />
                </div>
              </div>
            )}

            {rightPage && (
              <div className={styles.page} style={{ left: spineLeft, width: size, height }}>
                {scaled(page(rightPage.front))}
                <div className={styles.castClip}>
                  <motion.div
                    aria-hidden
                    className={`${styles.cast} ${styles.castRight}`}
                    style={{ left: rightCastLeft, opacity: turn ? castOpacity : 0 }}
                  />
                </div>
                {/* Single sheets fill their page with words, so the lifted corner only shows on a spread. */}
                {!single && !turn && rightLeaf > 0 && rightLeaf < turnable && <span aria-hidden className={styles.peel} />}
              </div>
            )}

            {/* Fold line over the seam between the two pages, so no board shows through it. */}
            {showLeft && <span aria-hidden className={styles.fold} style={{ left: spineLeft, height }} />}

            {turn && turning && (
              <div className={styles.turning} style={{ left: spineLeft, width: size, height }}>
                <TurningLeaf
                  progress={flip.progress}
                  dir={turn.dir}
                  width={size}
                  height={height}
                  base={base}
                  front={page(turning.front)}
                  back={single ? <BlankPage /> : page(turning.back)}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      <StepControls
        className={styles.controls}
        counter={counter}
        progress={flip.current === 0 ? 9 / 224 : flip.current / turnable}
        prevLabel={flip.current === 1 ? t.about.closeBook : t.about.previous}
        nextLabel={flip.current === 0 ? t.about.openBook : t.about.next}
        onPrev={prev}
        onNext={next}
        prevDisabled={!flip.canPrev}
        nextDisabled={!flip.canNext}
      />
    </>
  );
}
