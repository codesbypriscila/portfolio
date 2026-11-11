import Image from "next/image";
import { goToSection } from "@/lib/explore";
import { getItemStyle } from "@/lib/placement";
import type { PortfolioItem } from "@/types/portfolio";
import styles from "./FloatingItem.module.css";

interface FloatingItemProps {
  item: PortfolioItem;
  label: string;
  order: number;
  isOpen: boolean;
}

export function FloatingItem({ item, label, order, isOpen }: FloatingItemProps) {
  return (
    <li className={styles.item} style={getItemStyle(item, order)} data-open={isOpen}>
      <a
        className={styles.link}
        href={item.href}
        onClick={(event) => {
          event.preventDefault();
          goToSection(item.href);
        }}
      >
        <span className={styles.float}>
          <Image
            className={styles.image}
            src={item.image.src}
            width={item.image.width}
            height={item.image.height}
            sizes="(min-aspect-ratio: 1/1) 24vw, 50vw"
            quality={90}
            loading="eager"
            alt=""
          />
        </span>
        <span className={styles.label}>{label}</span>
      </a>
    </li>
  );
}
