import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";
import { news } from "@/app/(main)/news/_data/newsData";

// Constants for direct fetch
const BASE_URL = process.env.BASE_URL || "";
const HAMZA_GET_ARTICLES_URL = process.env.HAMZA_GET_ARTICLES_URL || "";
const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME || "";
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || "";

const fallbackArticles = news;

function resolveImageUrl(imagePath: string | undefined): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${BASE_URL}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";

    const [headerContent, articlesResponse] = await Promise.all([
      fetchContentWithKey("NEWS_AND_ARTICLES_BANNER_CONTENT_KEY"),
      fetchNewsArticlesDirectly(locale),
    ]);

    const headerFields = extractFields(headerContent?.contentFields, ["titleText"]) as { titleText?: string };

    const articlesData = await articlesResponse.json();
    const rawArticles = articlesData?.articleList || [];

    // Debug: log available image fields from first few articles
    if (rawArticles.length > 0) {
      console.log("News API - Raw image fields sample:", rawArticles.slice(0, 3).map((a: any) => ({
        imageThumbnailUrl: a.imageThumbnailUrl,
        image: a.image,
        thumbnailUrl: a.thumbnailUrl,
        articleImageUrl: a.articleImageUrl,
        imageUrl: a.imageUrl,
        thumbnail: a.thumbnail,
      })));
    }

    const articles = rawArticles.map((raw: any) => ({
      id: Number(raw.entryClassPK ?? raw.id ?? raw.articleId ?? 0),
      title: raw.title ?? raw.titleText ?? raw.headline ?? "",
      excerpt: raw.excerpt ?? raw.summary ?? raw.description ?? raw.newsDescriptionText ?? "",
      content: raw.content ?? raw.fullContent ?? "",
      image: resolveImageUrl(raw.imageThumbnailUrl ?? raw.image ?? raw.thumbnailUrl ?? raw.articleImageUrl ?? raw.imageUrl ?? ""),
      date: raw.articleDate ?? raw.displayDate ?? raw.publishDate ?? raw.date ?? "",
    })).filter((a: any) => a.id && a.title);

    return NextResponse.json({
      header: {
        title: headerFields?.titleText ?? "الاخبار",
      },
      articles: articles.length ? articles : fallbackArticles,
      locale,
    });
  } catch (error) {
    console.error("Error fetching news content:", error);
    return NextResponse.json(
      {
        header: { title: "الاخبار" },
        articles: fallbackArticles,
        locale: "ar-SA",
      },
      { status: 500 }
    );
  }
}

async function fetchNewsArticlesDirectly(locale: string) {
  const serviceUrl = `${BASE_URL}${HAMZA_GET_ARTICLES_URL}/NEWS_ARTICLES/News article types`;
  const authorization = "Basic " + btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`);
  const urlWithParam = new URL(serviceUrl);
  urlWithParam.searchParams.append("searchText", "");
  urlWithParam.searchParams.append("selectedYear", "");
  urlWithParam.searchParams.append("locale", locale);
  urlWithParam.searchParams.append("selectedArticleType", "0");
  urlWithParam.searchParams.append("page", "1");
  urlWithParam.searchParams.append("pageSize", "1000");
  return fetch(urlWithParam, {
    method: "POST",
    headers: { Authorization: authorization },
  });
}
