import type { CSSProperties } from "react";
import type { ItemImage, ItemPlacement, PortfolioItem } from "@/types/portfolio";

/** Images include transparent padding for their shadow; the box must grow to keep the object at its design width. */
const boxWidth = (placement: ItemPlacement, image: ItemImage) =>
  (placement.width * image.width) / (image.width - 2 * image.padding);

const placementVariables = (prefix: "wide" | "tall", placement: ItemPlacement, image: ItemImage) => ({
  [`--${prefix}-x`]: placement.x,
  [`--${prefix}-y`]: placement.y,
  [`--${prefix}-box`]: boxWidth(placement, image),
  [`--${prefix}-label-offset`]: placement.labelY - placement.y,
});

export function getItemStyle(item: PortfolioItem, order: number): CSSProperties {
  return {
    ...placementVariables("wide", item.wide, item.image),
    ...placementVariables("tall", item.tall, item.image),
    "--order": order,
    "--float-duration": `${item.float.duration}s`,
    "--float-delay": `${item.float.delay}s`,
  } as CSSProperties;
}
