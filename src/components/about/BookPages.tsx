import Image from "next/image";
import { type CSSProperties, memo, type ReactNode } from "react";
import { aboutImages, ownerName } from "@/data/about";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./BookPage.module.css";

type Picture = (typeof aboutImages)[keyof typeof aboutImages];

/** Which paper a page is printed on: the gutter shading sits on the spine side. */
export type PaperSide = "left" | "right";

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

function Paper({ side, children }: { side: PaperSide; children?: ReactNode }) {
  const paper = side === "left" ? aboutImages.pageLeft : aboutImages.pageRight;
  return (
    <div className={styles.page}>
      <Image
        className={styles.paper}
        src={paper.src}
        fill
        sizes="(min-aspect-ratio: 1/1) 29vw, 92vw"
        quality={90}
        loading="eager"
        draggable={false}
        alt=""
      />
      {children}
    </div>
  );
}

function Sticker({ image, box }: { image: Picture; box: Box }) {
  const { className, style } = place(box);
  return (
    <Image
      className={cx(className, styles.image)}
      style={style}
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

function Print({ box, width, image, imageSize, alt, children }: {
  box: Box;
  width: number;
  image: Picture;
  imageSize: [number, number];
  alt: string;
  children?: ReactNode;
}) {
  const { className, style } = place(box);
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

/* ---------- The pages, in reading order. Odd pages sit on the left of a spread. ---------- */

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
  const note = place({ x: 284, y: 326, w: 108, h: 68, r: -5 });
  return (
    <Paper side={side}>
      <TextBlock box={{ x: 48, y: 62 }}>
        <p className={styles.paragraph}>{t.about.inspiration.intro}</p>
        <ul className={styles.sources}>
          {t.about.inspiration.sources.map((source) => (
            <li key={source.name}>
              <strong className={styles.sourceName}>{source.name}</strong>
              <span className={styles.sourceText}>{source.description}</span>
            </li>
          ))}
        </ul>
      </TextBlock>
      <p className={cx(note.className, styles.note)} style={note.style}>
        {t.about.inspiration.note}
      </p>
      <Tape box={{ x: 314, y: 317, w: 46, h: 16, r: 3 }} variant="sand" />
    </Paper>
  );
}

function CookiePage({ side }: { side: PaperSide }) {
  const { t } = useLanguage();
  return (
    <Paper side={side}>
      <TextBlock box={{ x: 48, y: 34 }}>
        <Heading script={t.about.baking.script} title={t.about.baking.title} />
        <Divider />
        <p className={styles.paragraph}>{t.about.baking.first}</p>
      </TextBlock>
      <Sticker image={aboutImages.cookie} box={{ x: 209, y: 212, w: 150, h: 150 }} />
    </Paper>
  );
}

function CheesecakePage({ side }: { side: PaperSide }) {
  const { t } = useLanguage();
  return (
    <Paper side={side}>
      <Sticker image={aboutImages.cheesecake} box={{ x: 213, y: 50, w: 155, h: 140 }} />
      <TextBlock box={{ x: 48, y: 204 }}>
        <p className={styles.paragraph}>{t.about.baking.second}</p>
      </TextBlock>
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

/** Page 0 is the cover; pages 1–8 are the content, two per spread on wide screens. */
const pageComponents = [
  null,
  PhotoPage,
  IntroPage,
  VideosPage,
  SourcesPage,
  CookiePage,
  CheesecakePage,
  NarutoPage,
  AnimePage,
] as const;

export const pageCount = pageComponents.length - 1;

/** One square page of the book. On a spread odd pages lie on the left; a single-page book uses the right paper. */
export const BookPage = memo(function BookPage({ index, single }: { index: number; single: boolean }) {
  if (index === 0) return <Cover />;
  const Component = pageComponents[index];
  if (!Component) return <Paper side="right" />;
  return <Component side={single || index % 2 === 0 ? "right" : "left"} />;
});

/** The back of a page that has nothing printed on it. */
export function BlankPage() {
  return <Paper side="left" />;
}
