/** Texts for the company and each role live in the dictionaries (`src/i18n`), in the same order. */
export const company = {
  name: "UTreee IT Advanced Solutions",
  logo: { src: "/images/logos/utreee.jpg", width: 100, height: 100 },
};

/** Which role is the current one, newest first, matching `experience.roles` in the dictionaries. */
export const roleIsCurrent = [true, false] as const;
