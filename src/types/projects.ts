import type { Dictionary } from "@/i18n/en";

/** Ready-made link texts that change with the language. */
export type TranslatedLinkLabel = "repository" | "demo";

export interface ProjectLink {
  /** A name that reads the same in every language (Frontend, Docker…) or a translated text. */
  label: string | { translated: TranslatedLinkLabel };
  href: string;
  /** Filled dark pill; the rest are outlined. */
  primary?: boolean;
}

export interface Project {
  /** Also the key of its description in the dictionaries. */
  id: keyof Dictionary["projects"]["descriptions"];
  name: string;
  stack: readonly string[];
  links: readonly ProjectLink[];
}
