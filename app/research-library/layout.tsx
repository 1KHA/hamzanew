/**
 * Research Library Layout
 *
 * Provides the layout structure with PageHero for breadcrumbs and title.
 */

import type { ReactNode } from "react";
import { Metadata } from "next";
import PageHero from "../components/page-hero/PageHero";
import { heroMap } from "./_hero/heroMap";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "مكتبة الأبحاث",
  description:
    "مكتبة شاملة للأبحاث والدراسات المتخصصة في اللغة العربية واختباراتها المعيارية",
};

/* ==========================================================================
   Layout Component
   ========================================================================== */

export default function ResearchLibraryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        heroMap={heroMap}
        defaultRoute="/research-library"
        breadcrumbsMax={5}
      />
      <section>{children}</section>
    </>
  );
}
