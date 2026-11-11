"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { type Dictionary, en } from "./en";
import { es } from "./es";

export const languages = ["es", "en"] as const;
export type Language = (typeof languages)[number];

const dictionaries: Record<Language, Dictionary> = { en, es };
const storageKey = "portfolio-language";

const isLanguage = (value: unknown): value is Language => languages.includes(value as Language);

/* The chosen language is kept in localStorage; this tiny store lets React read it and hear about changes. */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The visitor's saved choice, or Spanish when their browser is in Spanish, otherwise English. */
function readLanguage(): Language {
  const saved = window.localStorage.getItem(storageKey);
  if (isLanguage(saved)) return saved;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function setLanguage(language: Language) {
  window.localStorage.setItem(storageKey, language);
  for (const listener of listeners) listener();
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, readLanguage, () => "en" as const);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: dictionaries[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
