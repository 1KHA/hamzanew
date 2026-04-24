/**
 * Research Library Page
 *
 * Displays a searchable, filterable grid of research papers and studies
 * with pagination support.
 * Fetches localized data from /api/research-library based on the lang cookie.
 *
 * @accessibility
 * - Search input has proper label and aria attributes
 * - Results are announced to screen readers via aria-live
 * - Filter controls are keyboard accessible
 * - Card grid uses proper semantic structure
 * - Pagination has proper navigation labels
 */

import type { ReactElement } from "react";
import PageHero from "@/app/components/page-hero/PageHero";
import ResearchLibraryListing from "./ResearchLibraryListing";
import { researchData } from "./_data/researchData";
import { Metadata } from "next";
import { cookies } from "next/headers";

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
   Static Fallback Configuration
   ========================================================================== */

const STATIC_HERO_CONFIG = {
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
   Data Fetching
   ========================================================================== */

async function getResearchLibraryData() {
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value || "ar-SA";

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseURL}/api/research-library`, {
      cache: "no-store",
      headers: {
        Cookie: `lang=${langCookie}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch research library data:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching research library data:", error);
    return null;
  }
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * ResearchLibraryPage Component
 *
 * Server Component that renders the page hero and the client-side research library listing.
 */
export default async function ResearchLibraryPage(): Promise<ReactElement> {
  const data = await getResearchLibraryData();

  const heroConfig = {
    title: data?.header?.title || STATIC_HERO_CONFIG.title,
    description:
      data?.header?.description || STATIC_HERO_CONFIG.description,
    bgColor: STATIC_HERO_CONFIG.bgColor,
    breadcrumbs: STATIC_HERO_CONFIG.breadcrumbs,
  };

  const articles = data?.articles || researchData;

  return (
    <>
      <PageHero
        heroMap={{ "/research-library": heroConfig }}
        defaultRoute="/research-library"
        breadcrumbsMax={3}
      />

      <ResearchLibraryListing initialPapers={articles} />

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
