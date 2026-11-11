const email = "priscilaperezherrera@gmail.com";

export type ContactIcon = "linkedin" | "mail" | "instagram";

export interface ContactLink {
  /** Also the key of its name in the dictionaries (`contact.names`). */
  icon: ContactIcon;
  handle: string;
  /** Receives the email subject in the visitor's language. */
  href: (emailSubject: string) => string;
  /** Opens in a new tab; the email link opens the visitor's mail app instead. */
  external: boolean;
}

export const contactLinks: readonly ContactLink[] = [
  {
    icon: "linkedin",
    handle: "in/priscila-perez-h",
    href: () => "https://www.linkedin.com/in/priscila-perez-h/",
    external: true,
  },
  {
    icon: "mail",
    handle: email,
    /* A new message already addressed to me, with a subject, so people only have to write. */
    href: (subject) => `mailto:${email}?subject=${encodeURIComponent(subject)}`,
    external: false,
  },
  {
    icon: "instagram",
    handle: "@imnotpriscilaa__",
    href: () => "https://www.instagram.com/imnotpriscilaa__/",
    external: true,
  },
];
