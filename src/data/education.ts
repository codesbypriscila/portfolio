/** Names and logos; the words for each study live in the dictionaries (`src/i18n`), in the same order. */
export interface School {
  school: string;
  logo: { src: string; width: number; height: number };
  current: boolean;
  /** Background of each badge, matching `education.studies[].badges` in the dictionaries. */
  badgeTones: readonly ("pink" | "sand")[];
}

export const schools: readonly School[] = [
  {
    school: "ITLA",
    logo: { src: "/images/logos/itla.png", width: 200, height: 200 },
    current: false,
    badgeTones: ["pink", "sand"],
  },
  {
    school: "Udemy",
    logo: { src: "/images/logos/udemy.jpg", width: 100, height: 100 },
    current: false,
    badgeTones: ["sand"],
  },
  {
    school: "PUCMM",
    logo: { src: "/images/logos/pucmm.jpg", width: 100, height: 100 },
    current: true,
    badgeTones: ["pink"],
  },
];
