"use client";

import { useSyncExternalStore } from "react";

/*
 * The page opens on the closed folder only: no scrolling and no navbar. Picking a section from the
 * open folder "unlocks" the rest of the site. The lock lives on <html data-locked> (set by the layout
 * so it applies from the first paint) and in this tiny store, which components read.
 */
let unlocked = false;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function unlockSite() {
  if (unlocked) return;
  unlocked = true;
  delete document.documentElement.dataset.locked;
  for (const listener of listeners) listener();
}

export function useSiteUnlocked() {
  return useSyncExternalStore(
    subscribe,
    () => unlocked,
    () => false,
  );
}

/** Scrolls to a section once the site is unlocked, and keeps its address in the URL. */
export function goToSection(hash: string) {
  unlockSite();
  const target = document.querySelector(hash);
  if (!target) return;
  history.replaceState(null, "", hash);
  target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
}
