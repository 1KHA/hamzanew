/**
 * Arabic Text Utilities
 *
 * Provides helper functions for Arabic text processing,
 * including normalization for search and comparison.
 */

/**
 * Normalizes Arabic text for search comparison
 *
 * Handles common Arabic character variations:
 * - Alef variants (أ إ آ ٱ ا) → ا
 * - Ta Marbuta (ة) → ه
 * - Alef Maksura (ى) → ي
 * - Lam-Alef combinations → لا
 * - Removes diacritics (tashkeel)
 *
 * @param text - The Arabic text to normalize
 * @returns Normalized text for comparison
 *
 * @example
 * normalizeArabic("أحمد") // returns "احمد"
 * normalizeArabic("اللغة") // returns "اللغه"
 */
export function normalizeArabic(text: string): string {
  return text
    // Remove Arabic diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // Normalize Alef variants to plain Alef
    .replace(/[أإآٱ]/g, "ا")
    // Normalize Ta Marbuta to Ha
    .replace(/ة/g, "ه")
    // Normalize Alef Maksura to Ya
    .replace(/ى/g, "ي")
    // Normalize Lam-Alef combinations
    .replace(/[ﻹﻺﻻﻼ]/g, "لا")
    .toLowerCase();
}

/**
 * Checks if a normalized Arabic text contains a search query
 *
 * @param text - The text to search in
 * @param query - The search query
 * @returns True if the text contains the query (normalized comparison)
 *
 * @example
 * arabicIncludes("أحمد محمد", "احمد") // returns true
 */
export function arabicIncludes(text: string, query: string): boolean {
  return normalizeArabic(text).includes(normalizeArabic(query));
}

/**
 * Filters an array of items based on Arabic text search
 *
 * @param items - Array of items to filter
 * @param query - Search query
 * @param getSearchableText - Function to extract searchable text from each item
 * @returns Filtered array of items matching the query
 *
 * @example
 * const papers = [{ title: "أبحاث" }, { title: "دراسات" }];
 * arabicFilter(papers, "ابحاث", (p) => [p.title]);
 * // returns [{ title: "أبحاث" }]
 */
export function arabicFilter<T>(
  items: T[],
  query: string,
  getSearchableText: (item: T) => string[]
): T[] {
  if (!query.trim()) return items;

  const normalizedQuery = normalizeArabic(query.trim());

  return items.filter((item) =>
    getSearchableText(item).some((text) =>
      normalizeArabic(text).includes(normalizedQuery)
    )
  );
}
