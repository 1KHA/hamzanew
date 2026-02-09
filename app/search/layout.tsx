/**
 * Search Layout Component
 *
 * Provides the layout structure for the search page.
 */

import type { ReactNode } from "react";
import { Metadata } from "next";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "البحث",
};

/* ==========================================================================
   Layout Component
   ========================================================================== */

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
