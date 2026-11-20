import type { PortfolioItem } from "@/types/portfolio";

const imagePath = (name: string) => `/images/portfolio/${name}.png`;

export const portfolioItems: readonly PortfolioItem[] = [
  {
    id: "about",
    href: "#about",
    image: { src: imagePath("about"), width: 888, height: 1039, padding: 114 },
    wide: { x: 230, y: 455, width: 120, labelY: 550 },
    tall: { x: 285, y: 295, width: 85, labelY: 370 },
    float: { duration: 5.6, delay: -1.2 },
  },
  {
    id: "projects",
    href: "#projects",
    image: { src: imagePath("projects"), width: 1408, height: 1363, padding: 154 },
    wide: { x: 455, y: 350, width: 165, labelY: 445 },
    tall: { x: 105, y: 130, width: 125, labelY: 215 },
    float: { duration: 6.4, delay: -3.4 },
  },
  {
    id: "experience",
    href: "#experience",
    image: { src: imagePath("experience"), width: 1280, height: 1263, padding: 140 },
    wide: { x: 720, y: 350, width: 160, labelY: 445 },
    tall: { x: 285, y: 130, width: 120, labelY: 215 },
    float: { duration: 5.2, delay: -0.6 },
  },
  {
    id: "education",
    href: "#education",
    image: { src: imagePath("education"), width: 1152, height: 1033, padding: 126 },
    wide: { x: 985, y: 350, width: 165, labelY: 445 },
    tall: { x: 105, y: 295, width: 115, labelY: 370 },
    float: { duration: 6, delay: -2.5 },
  },
  {
    id: "cv",
    href: "#cv",
    image: { src: imagePath("cv"), width: 485, height: 631, padding: 69 },
    wide: { x: 1210, y: 455, width: 105, labelY: 550 },
    tall: { x: 195, y: 500, width: 72, labelY: 585 },
    float: { duration: 6.8, delay: -4.1 },
  },
  {
    id: "socials",
    href: "#contact",
    image: { src: imagePath("socials"), width: 698, height: 694, padding: 76 },
    wide: { x: 1125, y: 650, width: 130, labelY: 733 },
    tall: { x: 320, y: 515, width: 88, labelY: 585 },
    float: { duration: 5.8, delay: -1.9 },
  },
  {
    id: "contact",
    href: "#contact",
    image: { src: imagePath("contact"), width: 1152, height: 1007, padding: 126 },
    wide: { x: 315, y: 650, width: 140, labelY: 733 },
    tall: { x: 70, y: 520, width: 80, labelY: 585 },
    float: { duration: 6.2, delay: -3 },
  },
];
