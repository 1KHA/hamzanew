import type { ReactElement } from "react";
import type { Metadata } from "next";
import { SERVICES, PARTNERS, NEWS_ARTICLES } from "./(landing)/_data/homeData";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";
import { getTranslations } from "@/app/_lib/getTranslations";
import { getFormattedCountriesList } from "@/app/_lib/countries-service";
import { cookies } from "next/headers";

import Banner from "./(landing)/_components/Banner";
import ServicesSection from "./(landing)/_components/ServicesSection";
import NewsSection from "./(landing)/_components/NewsSection";
import StatisticsSection from "./(landing)/_components/StatisticsSection";
import PartnersSection from "./(landing)/_components/PartnersSection";
import SubscriptionSection from "./(landing)/_components/SubscriptionSection";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";

export const metadata: Metadata = {
  title: "اختبار همزة - الرئيسة",
  description:
    "منصة همزة التابعة لمجمع الملك سلمان العالمي للغة العربية لتمكين متعلمي اللغة العربية والمهنيين.",
};

export const dynamic = "force-dynamic";

/* ==========================================================================
   Helpers
   ========================================================================== */

function resolveImageUrl(imagePath: string | undefined): string {
  const baseURL = process.env.BASE_URL || "";
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${baseURL}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
}

async function fetchLatestNews() {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";

    const baseURL = process.env.BASE_URL || "";
    const getArticlesURL = process.env.HAMZA_GET_ARTICLES_URL || "";
    const username = process.env.BASIC_AUTH_USERNAME || "";
    const password = process.env.BASIC_AUTH_PASSWORD || "";

    const serviceUrl = `${baseURL}${getArticlesURL}/NEWS_ARTICLES/News article types`;
    const authorization = "Basic " + btoa(`${username}:${password}`);

    const urlWithParam = new URL(serviceUrl);
    urlWithParam.searchParams.append("searchText", "");
    urlWithParam.searchParams.append("selectedYear", "");
    urlWithParam.searchParams.append("locale", locale);
    urlWithParam.searchParams.append("selectedArticleType", "0");
    urlWithParam.searchParams.append("page", "1");
    urlWithParam.searchParams.append("pageSize", "100");

    console.log("[Home] Fetching latest news from Liferay...");

    const response = await fetch(urlWithParam, {
      method: "POST",
      headers: { Authorization: authorization },
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
    return articles.length ? articles : NEWS_ARTICLES;
  } catch (error) {
    console.error("[Home] News FAILED —", error);
    console.log("[Home] Using FALLBACK static news data.");
    return NEWS_ARTICLES;
  }
}

/* ==========================================================================
   Main Component
   ========================================================================== */

export default async function LandingPage(): Promise<ReactElement> {
  let bannerData = null;
  let bannerBoxesData = null;
  try {
    [bannerData, bannerBoxesData] = await Promise.all([
      fetchContentWithKey("HAMZA_HOMEPAGE_BANNER_CONTENT_KEY"),
      fetchContentWithKey("HAMZA_HOMEPAGE_BANNER_BOXES_CONTENT_KEY"),
    ]);
  } catch (error) {
    console.error("[Home] Error fetching banner:", error);
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

  // Fetch latest news, translations, and countries in parallel
  const [latestNews, translations, countriesRaw] = await Promise.all([
    fetchLatestNews(),
    getTranslations().catch((err) => {
      console.error("[Home] Failed to fetch translations:", err);
      return null;
    }),
    getFormattedCountriesList().catch((err) => {
      console.error("[Home] Failed to fetch countries:", err);
      return [];
    }),
  ]);

  const countries = countriesRaw.map((c: { label: string; key: string }) => ({ name: c.label, code: c.key }));

  return (
    <>
      <Banner bannerFields={bannerFields} />

      <ScrollReveal>
        <ServicesSection services={SERVICES} bannerBoxes={bannerBoxes} />
      </ScrollReveal>
      <ScrollReveal>
        <NewsSection articles={latestNews} />
      </ScrollReveal>

      <ScrollReveal>
        <StatisticsSection translations={translations} countries={countries} />
      </ScrollReveal>

      <ScrollReveal>
        <PartnersSection partners={PARTNERS} />
      </ScrollReveal>
      <ScrollReveal>
        <SubscriptionSection />
      </ScrollReveal>
    </>
  );
}
