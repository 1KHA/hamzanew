/**
 * Research Library Page
 *
 * Displays a searchable, filterable grid of research papers and studies
 * with pagination support.
 *
 * @accessibility
 * - Search input has proper label and aria attributes
 * - Results are announced to screen readers via aria-live
 * - Filter controls are keyboard accessible
 * - Card grid uses proper semantic structure
 * - Pagination has proper navigation labels
 */

import type { ReactElement } from "react";
import PageHero from "../components/page-hero/PageHero";
import ResearchLibraryListing from "./ResearchLibraryListing";
import { researchData } from "./_data/researchData";
import { Metadata } from "next";

import NotificationToast from "@/app/components/notification-toast/NotificationToast";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "مكتبة الابحاث",
  description:
    "يمكنك هنا العثور على مجموعة من أحدث الأبحاث التي أجراها شركاء اختبار همزة وأكاديميون مدعومون من اختبار همزة من مختلف أنحاء العالم. ، يُمَوِّل اختبار همزة الأبحاث في ثلاثة مجالات رئيسية تتعلق بتعلم وتقييم اللغة العربية",
};
/* ==========================================================================
   Hero Configuration
   ========================================================================== */

const HERO_CONFIG = {
  title: "مكتبة الابحاث",
  description:
    "يمكنك هنا العثور على مجموعة من أحدث الأبحاث التي أجراها شركاء اختبار همزة وأكاديميون مدعومون من اختبار همزة من مختلف أنحاء العالم. ، يُمَوِّل اختبار همزة الأبحاث في ثلاثة مجالات رئيسية تتعلق بتعلم وتقييم اللغة العربية",
  bgColor: "#FFF",
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الابحاث", disabled: true },
    { label: "مكتبة الابحاث", disabled: true },
  ],
};

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * ResearchLibraryPage Component
 *
 * Server Component that renders the page hero and the client-side research library listing.
 */
export default function ResearchLibraryPage(): ReactElement {
  return (
    <>
      <PageHero
        heroMap={{ "/research-library": HERO_CONFIG }}
        defaultRoute="/research-library"
        breadcrumbsMax={3}
      />

      <ResearchLibraryListing initialPapers={researchData} />


      <div className="content !pb-[40px]">
        <NotificationToast
          type="info"
          leadText="الشروط والأحكام لإعداد دراسة"
          helperText="حرصًا منا على تقديم خدمات بحثية موثوقة واحترافية، أنشأنا هذا القسم لتوضيح الشروط والأحكام التي تنظم عملية إعداد الدراسات. الهدف هو ضمان وضوح الحقوق والالتزامات بين الطرفين،"
          open
          variant="stroke"
          inline
          actionLabel="عرض الشروط والأحكام"
          actionHref="/terms-and-conditions"
        />
      </div>


    </>
  );
}
