import type { Dictionary } from "@/i18n/en";

export interface ItemPlacement {
  x: number;
  y: number;
  width: number;
  labelY: number;
}

export interface ItemImage {
  src: string;
  width: number;
  height: number;
  padding: number;
}

export interface FloatMotion {
  duration: number;
  delay: number;
}

export interface PortfolioItem {
  /** Also the key of its label in the dictionaries. */
  id: keyof Dictionary["portfolio"]["items"];
  href: string;
  image: ItemImage;
  wide: ItemPlacement;
  tall: ItemPlacement;
  float: FloatMotion;
}
