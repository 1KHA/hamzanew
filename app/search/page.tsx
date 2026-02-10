/**
 * Search Page Component
 *
 * This page provides search functionality for the Hamza website,
 * displaying search results with filtering, sorting, and pagination.
 *
 * @accessibility
 * - Search input has proper label and aria attributes
 * - Results are announced to screen readers via aria-live
 * - Filter and sort controls are keyboard accessible
 * - Pagination has proper navigation labels
 */

import type { ReactElement } from "react";
import SearchResults from "./SearchResults";
import { searchResultsData } from "./_data/searchResultsData";
import { Metadata } from "next";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "البحث",
  description: "البحث في موقع همزة"
};

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * SearchPage Component
 *
 * Server Component that renders the search results with initial data and query.
 */
export default function SearchPage(): ReactElement {
  return (
    <main className="content" aria-label="صفحة البحث">
      <SearchResults
        initialResults={searchResultsData}
        initialQuery="الاختبار الأكاديمي"
      />
    </main>
  );
}
