import Image from "next/image";
import { type CSSProperties, memo, type ReactNode } from "react";
import { aboutImages, ownerName } from "@/data/about";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./BookPage.module.css";

type Picture = (typeof aboutImages)[keyof typeof aboutImages];

/** Which paper a page is printed on: the gutter shading sits on the spine side. */
export type PaperSide = "left" | "right";

/** Page sizes in the design's pixels: square pages on a spread, one tall sheet at a time on portrait screens. */
export const spreadPage = { width: 409, height: 409 } as const;
export const singlePage = { width: 328, height: 544 } as const;

interface Box {
  x: number;
  y: number;
  w?: number;
  h?: number;
  /** Clockwise degrees, pivoting on the top-left corner. */
  r?: number;
}

const cx = (...names: (string | false | undefined)[]) => names.filter(Boolean).join(" ");

/** Positions an element on a page in the design's page pixels. */
function place({ x, y, w, h, r }: Box): { className: string; style: CSSProperties } {
  return {
    className: cx(styles.at, w !== undefined && styles.sized, r !== undefined && styles.tilted),
    style: { "--x": x, "--y": y, "--w": w, "--h": h, "--r": r === undefined ? undefined : `${r}deg` } as CSSProperties,
  };
}

/** Places an element with `place`, or tilts it in the flow of a sheet when no position is given. */
function placeOrTilt(box: Box | undefined, tilt: number | undefined) {
  if (box) return place(box);
  return {
    className: cx(styles.inline, tilt !== undefined && styles.tiltedCenter),
    style: { "--r": tilt === undefined ? undefined : `${tilt}deg` } as CSSProperties,
  };
}

function Paper({ side, single = false, children }: { side: PaperSide; single?: boolean; children?: ReactNode }) {
  return (
    <div className={cx(styles.page, styles.paper, side === "left" ? styles.paperLeft : styles.paperRight)}>
      {single ? <div className={styles.sheet}>{children}</div> : children}
    </div>
  );
}

function Sticker({ image, box, size }: { image: Picture; box?: Box; size?: [number, number] }) {
  const { className, style } = box ? place(box) : { className: styles.inline, style: {} };
  return (
    <Image
      className={cx(className, styles.image)}
      style={size ? { ...style, width: `calc(${size[0]} * var(--p))`, height: `calc(${size[1]} * var(--p))` } : style}
      src={image.src}
      width={image.width}
      height={image.height}
      sizes="200px"
      quality={90}
      draggable={false}
      alt=""
    />
  );
}

function Tape({ box, variant = "pink" }: { box: Box; variant?: "pink" | "sand" }) {
  const { className, style } = place(box);
  return (
    <span
      className={cx(className, variant === "pink" ? styles.tape : styles.noteTape)}
      style={style}
      aria-hidden="true"
    />
  );
}

function TextBlock({ box, children }: { box: Box; children: ReactNode }) {
  const { className, style } = place(box);
  return (
    <div className={cx(className, styles.text)} style={style}>
      {children}
    </div>
  );
}

function Heading({ script, title }: { script: string; title: string }) {
  return (
    <h3 className={styles.heading}>
      <span className={styles.script}>{script}</span>
      {title}
    </h3>
  );
}

const Divider = ({ space }: { space?: number }) => (
  <span className={styles.divider} style={{ "--space": space } as CSSProperties} aria-hidden="true" />
);

function Print({ box, tilt, width, image, imageSize, alt, children }: {
  box?: Box;
  tilt?: number;
  width: number;
  image: Picture;
  imageSize: [number, number];
  alt: string;
  children?: ReactNode;
}) {
  const { className, style } = placeOrTilt(box, tilt);
  return (
    <figure className={cx(className, styles.print)} style={{ ...style, width: `calc(${width} * var(--p))` }}>
      <Image
        className={styles.printImage}
        style={{ "--iw": imageSize[0], "--ih": imageSize[1] } as CSSProperties}
        src={image.src}
        width={image.width}
        height={image.height}
        sizes="300px"
        quality={90}
        draggable={false}
        alt={alt}
      />
      {children}
    </figure>
  );
}

function Note({ box }: { box: Box }) {
  const { t } = useLanguage();
  const note = place(box);
  return (
    <p className={cx(note.className, styles.note)} style={note.style}>
      {t.about.inspiration.note}
    </p>
  );
}

function Sources() {
  const { t } = useLanguage();
  return (
    <ul className={styles.sources}>
      {t.about.inspiration.sources.map((source) => (
        <li key={source.name}>
          <strong className={styles.sourceName}>{source.name}</strong>
          <span className={styles.sourceText}>{source.description}</span>
        </li>
      ))}
    </ul>
  );
}

function Cover() {
  return (
    <div className={styles.page}>
      <Image
        className={styles.cover}
        src={aboutImages.cover.src}
        fill
        sizes="(min-aspect-ratio: 1/1) 29vw, 92vw"
        quality={90}
        loading="eager"
        draggable={false}
        alt=""
      />
    </div>
  );
}

/* ---------- Spread pages (wide screens), in reading order. Odd pages sit on the left. ---------- */

function PhotoPage({ side }: { side: PaperSide }) {
  const { t } = useLanguage();
  return (
    <Paper side={side}>
      <Print box={{ x: 81, y: 60, r: -3 }} width={246} image={aboutImages.photo} imageSize={[222, 222]} alt={t.about.intro.photoAlt}>
        <figcaption className={styles.caption}>{t.about.intro.caption}</figcaption>
      </Print>
      <Tape box={{ x: 157, y: 36, w: 94, h: 28, r: 4 }} />
    </Paper>
  );
}

function IntroPage({ side }: { side: PaperSide }) {
  const { t } = useLanguage();
  return (
    <Paper side={side}>
      <TextBlock box={{ x: 48, y: 48 }}>
        <Heading script={t.about.intro.hello} title={ownerName} />
        <p className={styles.age}>{t.about.intro.age}</p>
        <Divider space={12} />
        <p className={cx(styles.paragraph, styles.bio)}>{t.about.intro.bio}</p>
      </TextBlock>
      <Sticker image={aboutImages.clip} box={{ x: 332, y: -36, w: 41, h: 115, r: 8 }} />
    </Paper>
  );
}

function VideosPage({ side }: { side: PaperSide }) {
  const { t } = useLanguage();
  return (
    <Paper side={side}>
      <TextBlock box={{ x: 48, y: 52 }}>
        <Heading script={t.about.inspiration.script} title={t.about.inspiration.title} />
        <Divider />
        <p className={styles.paragraph}>{t.about.inspiration.videos}</p>
      </TextBlock>
    </Paper>
  );
}

function SourcesPage({ side }: { side: PaperSide }) {
  const { t } = useLanguage();
  return (
    <Paper side={side}>
      <TextBlock box={{ x: 48, y: 62 }}>
        <p className={styles.paragraph}>{t.about.inspiration.intro}</p>
        <Sources />
      </TextBlock>
      <Note box={{ x: 284, y: 326, w: 108, h: 68, r: -5 }} />
      <Tape box={{ x: 314, y: 317, w: 46, h: 16, r: 3 }} variant="sand" />
    </Paper>
  );
}

function NarutoPage({ side }: { side: PaperSide }) {
  const { t } = useLanguage();
  return (
    <Paper side={side}>
      <Print box={{ x: 41, y: 52, r: -4 }} width={190} image={aboutImages.narutoTeam} imageSize={[166, 250]} alt={t.about.anime.teamAlt} />
      <Tape box={{ x: 89, y: 34, w: 84, h: 24, r: 5 }} />
      <Sticker image={aboutImages.naruto} box={{ x: 205, y: 90, w: 169, h: 300 }} />
    </Paper>
  );
}

function AnimePage({ side }: { side: PaperSide }) {
  const { t } = useLanguage();
  const thanks = place({ x: 48, y: 287 });
  return (
    <Paper side={side}>
      <TextBlock box={{ x: 48, y: 49 }}>
        <Heading script={t.about.anime.script} title={t.about.anime.title} />
        <Divider />
        <p className={styles.paragraph}>{t.about.anime.text}</p>
      </TextBlock>
      <p className={cx(thanks.className, styles.thanks)} style={thanks.style}>
        {t.about.anime.thanks}
      </p>
    </Paper>
  );
}

/* ---------- Single sheets (portrait screens): each one holds the pictures and the words together. ---------- */

function PhotoSheet() {
  const { t } = useLanguage();
  return (
    <Paper side="right" single>
      <div className={styles.pictures}>
        <Print tilt={-3} width={156} image={aboutImages.photo} imageSize={[132, 132]} alt={t.about.intro.photoAlt}>
          <figcaption className={cx(styles.caption, styles.captionSmall)}>{t.about.intro.caption}</figcaption>
        </Print>
      </div>
      <div>
        <Heading script={t.about.intro.hello} title={ownerName} />
        <p className={styles.age}>{t.about.intro.age}</p>
        <Divider space={12} />
        <p className={cx(styles.paragraph, styles.bio)}>{t.about.intro.bio}</p>
      </div>
      <Tape box={{ x: 122, y: 20, w: 80, h: 28, r: 4 }} />
      <Sticker image={aboutImages.clip} box={{ x: 268, y: -26, w: 33, h: 92, r: 8 }} />
    </Paper>
  );
}

function IdeasSheet() {
  const { t } = useLanguage();
  return (
    <Paper side="right" single>
      <div>
        <Heading script={t.about.inspiration.script} title={t.about.inspiration.title} />
        <Divider />
        <p className={styles.paragraph}>{t.about.inspiration.videos}</p>
      </div>
      <div className={styles.compact}>
        <p className={styles.paragraph}>{t.about.inspiration.intro}</p>
        <Sources />
      </div>
      <Note box={{ x: 200, y: 466, w: 100, h: 62, r: -5 }} />
      <Tape box={{ x: 228, y: 458, w: 46, h: 16, r: 3 }} variant="sand" />
    </Paper>
  );
}

function AnimeSheet() {
  const { t } = useLanguage();
  return (
    <Paper side="right" single>
      <div className={cx(styles.pictures, styles.picturesRow)}>
        <Print tilt={-4} width={136} image={aboutImages.narutoTeam} imageSize={[112, 168]} alt={t.about.anime.teamAlt} />
        <Sticker image={aboutImages.naruto} size={[104, 184]} />
      </div>
      <div>
        <Heading script={t.about.anime.script} title={t.about.anime.title} />
        <Divider />
        <p className={styles.paragraph}>{t.about.anime.text}</p>
        <p className={cx(styles.thanks, styles.thanksSheet)}>{t.about.anime.thanks}</p>
      </div>
      <Tape box={{ x: 62, y: 22, w: 70, h: 26, r: 5 }} />
    </Paper>
  );
}

/** Page 0 is the cover; then the content pages, two per spread on wide screens. */
const spreadPages = [null, PhotoPage, IntroPage, VideosPage, SourcesPage, NarutoPage, AnimePage] as const;
const singleSheets = [null, PhotoSheet, IdeasSheet, AnimeSheet] as const;

/** Content pages (the cover not included) for each layout. */
export const pageCounts = { spread: spreadPages.length - 1, single: singleSheets.length - 1 } as const;

/** One page of the book. On a spread odd pages lie on the left; a single-page book shows tall sheets. */
export const BookPage = memo(function BookPage({ index, single }: { index: number; single: boolean }) {
  if (index === 0) return <Cover />;
  if (single) {
    const Sheet = singleSheets[index];
    return Sheet ? <Sheet /> : <Paper side="right" />;
  }
  const Component = spreadPages[index];
  if (!Component) return <Paper side="right" />;
  return <Component side={index % 2 === 0 ? "right" : "left"} />;
});

/** The back of a page that has nothing printed on it. */
export function BlankPage() {
  return <Paper side="left" />;
}
