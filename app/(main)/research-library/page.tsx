/**
 * Research Library Page
 *
 * Displays a searchable, filterable grid of research papers and studies
 * with pagination support.
 * Fetches localized data directly from Liferay based on the lang cookie.
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
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";
import { getTranslations } from "@/app/_lib/getTranslations";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "مكتبة الابحاث",
  description:
    "يمكنك هنا العثور على مجموعة من أحدث الأبحاث التي أجراها شركاء اختبار همزة وأكاديميون مدعومون من اختبار همزة من مختلف أنحاء العالم.",
};

export const dynamic = "force-dynamic";

/* ==========================================================================
   Static Fallback Configuration
   ========================================================================== */

const STATIC_HERO_CONFIG = {
  title: "مكتبة الابحاث",
  description:
    "يمكنك هنا العثور على مجموعة من أحدث الأبحاث التي أجراها شركاء اختبار همزة وأكاديميون مدعومون من اختبار همزة من مختلف أنحاء العالم.",
  bgColor: "#FFF" as const,
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الابحاث", disabled: true },
    { label: "مكتبة الابحاث", disabled: true },
  ],
};

/* ==========================================================================
   Helpers
   ========================================================================== */

function mapArticle(raw: any) {
  if (!raw || typeof raw !== "object") return null;

  const id = String(raw.entryClassPK ?? raw.id ?? raw.articleId ?? "");
  const title = raw.title ?? raw.headline ?? raw.titleText ?? "";
  const author = raw.userName ?? raw.author ?? raw.creator ?? raw.userId ?? "";
  const category = raw.articleType ?? raw.category ?? raw.type ?? "";
  const publishDate = raw.displayDate ?? raw.publishDate ?? raw.date ?? "";
  const downloadUrl = raw.fileUrl ?? raw.downloadUrl ?? raw.url ?? raw.articleUrl ?? "#";
  const description = raw.description ?? raw.content ?? raw.summary ?? raw.excerpt ?? "";

  const cleanDescription =
    typeof description === "string"
      ? description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
      : "";

  return { id, title, author, category, publishDate, downloadUrl, description: cleanDescription };
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * ResearchLibraryPage Component
 *
 * Server Component that fetches header content, translations, and research articles
 * directly from Liferay and passes them to the client-side listing.
 */
export default async function ResearchLibraryPage(): Promise<ReactElement> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  // Fetch translations, header content, and research articles in parallel
  const [translations, headerContent, researchRes] = await Promise.all([
    getTranslations().catch((err) => {
      console.error("[ResearchLibrary] Failed to fetch translations:", err);
      return null;
    }),
    fetchContentWithKey("RESEARCH_RESEARCH_HEADER_CONTENT_KEY").catch((err) => {
      console.error("[ResearchLibrary] Failed to fetch header:", err);
      return null;
    }),
    (async () => {
      try {
        const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_ARTICLES_URL}/RESEARCH_ARTICLE/Research article type`;
        const authorization =
          "Basic " +
          btoa(
            `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
          );

        const urlWithParam = new URL(serviceUrl);
        urlWithParam.searchParams.append("searchText", "");
        urlWithParam.searchParams.append("selectedYear", "");
        urlWithParam.searchParams.append("locale", locale);
        urlWithParam.searchParams.append("selectedArticleType", "0");
        urlWithParam.searchParams.append("page", "1");
        urlWithParam.searchParams.append("pageSize", "1000");

        const res = await fetch(urlWithParam, {
          method: "POST",
          headers: { Authorization: authorization },
        });

        if (!res.ok) {
          console.error("[ResearchLibrary] Articles fetch failed:", res.status);
          return null;
        }
        return await res.json();
      } catch (err) {
        console.error("[ResearchLibrary] Articles error:", err);
        return null;
      }
    })(),
  ]);

  // Process header
  const headerFields = extractFields(headerContent?.contentFields, [
    "titleText",
    "descriptionText",
  ]) as { titleText?: string; descriptionText?: string };

  const heroConfig = {
    title: headerFields?.titleText || headerContent?.title || STATIC_HERO_CONFIG.title,
    description:
      headerFields?.descriptionText || STATIC_HERO_CONFIG.description,
    bgColor: STATIC_HERO_CONFIG.bgColor,
    breadcrumbs: STATIC_HERO_CONFIG.breadcrumbs,
  };

  // Process articles
  const rawArticles = researchRes?.articleList || [];
  const mappedArticles = rawArticles.map(mapArticle).filter(Boolean);
  const articles = mappedArticles.length > 0 ? mappedArticles : researchData;

  // Extract filter lists from API response
  const articleTypesList = researchRes?.articleTypesList || [];
  const articleYearList = researchRes?.articleYearList || [];

  return (
    <>
      <PageHero
        heroMap={{ "/research-library": heroConfig }}
        defaultRoute="/research-library"
        breadcrumbsMax={3}
        translations={translations || undefined}
      />

      <ResearchLibraryListing
        initialPapers={articles}
        translations={translations}
        articleTypesList={articleTypesList}
        articleYearList={articleYearList}
      />

      <div className="content !pb-[40px]">
        <NotificationToast
          type="info"
          leadText={
            translations?.["hamza-research-terms-lead"] ||
            "الشروط والأحكام لإعداد دراسة"
          }
          helperText={
            translations?.["hamza-research-terms-helper"] ||
            "حرصًا منا على تقديم خدمات بحثية موثوقة واحترافية، أنشأنا هذا القسم لتوضيح الشروط والأحكام التي تنظم عملية إعداد الدراسات."
          }
          open
          variant="stroke"
          inline
          actionLabel={
            translations?.["hamza-research-terms-action"] ||
            "عرض الشروط والأحكام"
          }
          actionHref="/terms-and-conditions"
        />
      </div>
    </>
  );
}
