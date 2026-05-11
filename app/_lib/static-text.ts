/**
 * Static Bilingual Text Dictionary — Client Version
 *
 * Re-exports the dictionary from static-text-server.ts and provides a
 * client-side `st()` that reads `document.documentElement.lang` when
 * no explicit locale is passed.
 *
 * Usage (client components):
 *   import { st } from "@/app/_lib/static-text";
 *   <button>{st("banner", "buttonMore")}</button>
 */

"use client";

import { STATIC_TEXT as STATIC_TEXT_SERVER } from "./static-text-server";

export const STATIC_TEXT = STATIC_TEXT_SERVER;

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

function getLocale(): "ar" | "en" {
  if (typeof document === "undefined") return "ar"; // SSR safe default
  const lang = document.documentElement.lang;
  if (lang?.startsWith("en")) return "en";
  return "ar";
}

/**
 * Static text lookup.
 *
 * @param scope  - Top-level category in STATIC_TEXT (e.g. "banner")
 * @param key    - Key inside that scope (e.g. "buttonMore")
 * @param locale - Optional locale override ("ar" | "en"). If omitted, reads from the DOM.
 * @returns The Arabic or English string, or the key itself if not found.
 */
export function st(scope: string, key: string, locale?: "ar" | "en"): string {
  const activeLocale = locale || getLocale();
  const scopeDict = STATIC_TEXT[scope];
  if (!scopeDict) return key;
  const entry = scopeDict[key];
  if (!entry) return key;
  return entry[activeLocale] || entry.ar || key;
}
