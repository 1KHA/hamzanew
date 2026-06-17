import type { ReactElement } from "react";
import type { Metadata } from "next";
import { getServices, getPartners, getNewsArticles } from "./(landing)/_data/homeData";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { getTranslations } from "@/app/_lib/getTranslations";
import { getFormattedCountriesList } from "@/app/_lib/countries-service";
import { parseStatisticsCSV } from "@/app/_lib/statistics-csv-parser";
import { fetchWithAccessToken } from "@/app/_lib/token-refresh-service";
import { cookies } from "next/headers";

import Banner from "./(landing)/_components/Banner";
import ServicesSection from "./(landing)/_components/ServicesSection";
import NewsSection from "./(landing)/_components/NewsSection";
import StatisticsSection from "./(landing)/_components/StatisticsSection";
import PartnersSection from "./(landing)/_components/PartnersSection";
import SubscriptionSection from "./(landing)/_components/SubscriptionSection";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const isEn = locale === "en-US";

  return {
    title: isEn ? "Hamza Test - Home" : "اختبار همزة - الرئيسة",
    description: isEn
      ? "The Hamza Test Platform, affiliated with the King Salman Global Academy for Arabic Language, empowers Arabic language learners and professionals."
      : "منصة همزة التابعة لمجمع الملك سلمان العالمي للغة العربية لتمكين متعلمي اللغة العربية والمهنيين.",
  };
}

/* ==========================================================================
   Helpers
   ========================================================================== */

function resolveImageUrl(imagePath: string | undefined): string {
  const baseURL = process.env.BASE_URL || "";
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${baseURL}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
}

async function fetchLatestNews(locale: string) {
  try {
    const baseURL = process.env.BASE_URL || "";
    const getArticlesURL = process.env.HAMZA_GET_ARTICLES_URL || "";

    const serviceUrl = `${baseURL}${getArticlesURL}/NEWS_ARTICLES/News article types`;

    const urlWithParam = new URL(serviceUrl);
    urlWithParam.searchParams.append("searchText", "");
    urlWithParam.searchParams.append("selectedYear", "");
    urlWithParam.searchParams.append("locale", locale);
    urlWithParam.searchParams.append("selectedArticleType", "0");
    urlWithParam.searchParams.append("page", "1");
    urlWithParam.searchParams.append("pageSize", "100");

    console.log("[Home] Fetching latest news from Liferay...");

    const response = await fetchWithAccessToken(urlWithParam, {
      method: "POST",
    });

    if (!response.ok) {
      console.error(`[Home] News fetch failed: ${response.status}`);
      throw new Error(`News API returned ${response.status}`);
    }

    const data = await response.json();
    const rawArticles = data?.articleList || [];

    const articles = rawArticles
      .map((raw: any) => ({
        id: Number(raw.entryClassPK ?? raw.id ?? raw.articleId ?? 0),
        title: raw.title ?? raw.titleText ?? raw.headline ?? "",
        description:
          raw.excerpt ??
          raw.summary ??
          raw.description ??
          raw.newsDescriptionText ??
          "",
        image: resolveImageUrl(
          raw.imageThumbnailUrl ??
            raw.image ??
            raw.thumbnailUrl ??
            raw.articleImageUrl ??
            raw.imageUrl ??
            ""
        ),
      }))
      .filter((a: any) => a.id && a.title)
      .slice(0, 6);

    if (articles.length < 6) {
      console.warn(`[Home] News WARNING — only ${articles.length} articles returned from Liferay (expected at least 6)`);
    } else {
      console.log(`[Home] News SUCCESS — ${articles.length} articles loaded`);
    }
    return articles.length ? articles : getNewsArticles(locale === "en-US" ? "en" : "ar");
  } catch (error) {
    console.error("[Home] News FAILED —", error);
    console.log("[Home] Using FALLBACK static news data.");
    return getNewsArticles(locale === "en-US" ? "en" : "ar");
  }
}

/* ==========================================================================
   Main Component
   ========================================================================== */

export default async function LandingPage(): Promise<ReactElement> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale === "en-US" ? "en" : "ar";

  let bannerData = null;
  let bannerBoxesData = null;
  let insideEntitiesData = null;
  let outsideEntitiesData = null;
  try {
    [bannerData, bannerBoxesData, insideEntitiesData, outsideEntitiesData] =
      await Promise.all([
        fetchContentWithKey("HAMZA_HOMEPAGE_BANNER_CONTENT_KEY"),
        fetchContentWithKey("HAMZA_HOMEPAGE_BANNER_BOXES_CONTENT_KEY"),
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_ENTITIES_INSIDE_SAUDI_ARABIA_CONTENT_KEY"
        ),
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_ENTITIES_OUTSIDE_SAUDI_ARABIA_CONTENT_KEY"
        ),
      ]);
  } catch (error) {
    console.error("[Home] Error fetching banner/entities:", error);
  }

  const bannerFields = extractFields(bannerData?.contentFields, [
    "smallHeaderTitleText",
    "headerTitleText",
    "descriptionText",
    "image",
  ]) as {
    smallHeaderTitleText?: string;
    headerTitleText?: string;
    descriptionText?: string;
    image?: string;
  };

  // Map banner boxes to exam card shape
  const bannerBoxes =
    bannerBoxesData?.contentFields?.map((fieldSet: any) => {
      const obj: any = {};
      fieldSet.nestedContentFields?.forEach((nestedField: any) => {
        if (nestedField.name === "titleText") {
          obj.title = nestedField.contentFieldValue?.data;
        } else if (nestedField.name === "link") {
          obj.link = nestedField.contentFieldValue?.data;
        }
      });
      return obj;
    }) || [];

  // Extract section titles from entity content
  const insideTitleFields = extractFields(insideEntitiesData?.contentFields, [
    "titleText",
  ]) as { titleText?: string };
  const outsideTitleFields = extractFields(outsideEntitiesData?.contentFields, [
    "titleText",
  ]) as { titleText?: string };

  // Process entity lists
  const processEntities = (content: any) => {
    const list = extractList(content?.contentFields, "entitiesFieldset", {
      entityNameText: "entityNameText",
      entityImageText: "entityImageText",
    });
    return (
      list?.map((item: any, index: number) => ({
        id: index + 1,
        name: item.entityNameText || "",
        image: resolveImageUrl(item.entityImageText || ""),
      })) || []
    );
  };

  const insideEntities = processEntities(insideEntitiesData).filter(
    (e: { id: number; name: string; image: string }) => e.image && e.image.trim() !== ""
  );
  const outsideEntities = processEntities(outsideEntitiesData).filter(
    (e: { id: number; name: string; image: string }) => e.image && e.image.trim() !== ""
  );

  console.log(
    `[Home] Entities — inside: ${insideEntities.length}, outside: ${outsideEntities.length}`
  );

  // Fetch latest news, translations, and countries in parallel
  const [latestNews, translations, countriesRaw] = await Promise.all([
    fetchLatestNews(locale),
    getTranslations().catch((err) => {
      console.error("[Home] Failed to fetch translations:", err);
      return null;
    }),
    getFormattedCountriesList().catch((err) => {
      console.error("[Home] Failed to fetch countries:", err);
      return [];
    }),
  ]);

  const countries = countriesRaw.map((c: { label: string; key: string }) => ({ name: c.label, code: c.key.toUpperCase() }));
  console.log(`[Home] Countries fetched: ${countriesRaw.length}, mapped: ${countries.length}`);

  // Statistics data source switch
  const statsSource = process.env.STATISTICS_SOURCE || "liferay";
  let csvData = null;
  if (statsSource === "csv") {
    try {
      csvData = parseStatisticsCSV();
      console.log(`[Home] CSV statistics loaded: ${csvData.countryStats.length} countries, ${csvData.examTypeStats.length} exam types, ${csvData.yearStats.length} years, ${csvData.nationalityStats.length} nationalities`);
    } catch (err) {
      console.error("[Home] Failed to parse statistics CSV:", err);
    }
  }

  return (
    <>
      <Banner bannerFields={bannerFields} />

      <ScrollReveal>
        <ServicesSection services={getServices(staticLocale)} bannerBoxes={bannerBoxes} locale={staticLocale} />
      </ScrollReveal>
      <ScrollReveal>
        <NewsSection articles={latestNews} />
      </ScrollReveal>

      <ScrollReveal>
        <StatisticsSection translations={translations} countries={countries} csvData={csvData} />
      </ScrollReveal>

      <ScrollReveal>
        <PartnersSection
          insideEntities={insideEntities}
          outsideEntities={outsideEntities}
          insideTitle={insideTitleFields.titleText}
          outsideTitle={outsideTitleFields.titleText}
          translations={translations}
          fallbackPartners={getPartners(staticLocale)}
        />
      </ScrollReveal>
      {/* Subscription section hidden temporarily
      <ScrollReveal>
        <SubscriptionSection translations={translations} />
      </ScrollReveal>
      */}
    </>
  );
}
