import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

/**
 * Maps a raw article object from the search API to the ResearchPaper shape
 * expected by the ResearchLibraryListing component.
 */
function mapArticle(raw: any) {
  if (!raw || typeof raw !== "object") return null;

  const id =
    String(raw.entryClassPK ?? raw.id ?? raw.articleId ?? "");
  const title =
    raw.title ?? raw.headline ?? raw.titleText ?? "";
  const author =
    raw.userName ?? raw.author ?? raw.creator ?? raw.userId ?? "";
  const category =
    raw.articleType ?? raw.category ?? raw.type ?? "";
  const publishDate =
    raw.displayDate ?? raw.publishDate ?? raw.date ?? "";
  const downloadUrl =
    raw.fileUrl ?? raw.downloadUrl ?? raw.url ?? raw.articleUrl ?? "#";
  const description =
    raw.description ?? raw.content ?? raw.summary ?? raw.excerpt ?? "";

  // Strip HTML tags from description if present
  const cleanDescription =
    typeof description === "string"
      ? description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
      : "";

  return {
    id,
    title,
    author,
    category,
    publishDate,
    downloadUrl,
    description: cleanDescription,
  };
}

/* ==========================================================================
   Static Fallback Data (same as current researchData.ts)
   ========================================================================== */

const fallbackArticles = [
  {
    id: "1",
    title: "تطوير اختبارات الكفاءة اللغوية للغة العربية",
    author: "د. أحمد محمد",
    category: "اختبارات",
    publishDate: "2026-01-15",
    downloadUrl: "/papers/paper-1.pdf",
    description:
      "دراسة شاملة حول تطوير اختبارات الكفاءة اللغوية وفق المعايير الدولية.",
  },
  {
    id: "2",
    title: "تحليل أخطاء متعلمي اللغة العربية الناطقين بغيرها",
    author: "د. فاطمة علي",
    category: "تعليم",
    publishDate: "2026-01-10",
    downloadUrl: "/papers/paper-2.pdf",
    description:
      "بحث تحليلي يرصد الأخطاء الشائعة لدى متعلمي العربية من غير الناطقين بها.",
  },
  {
    id: "3",
    title: "استخدام الذكاء الاصطناعي في تقييم المهارات اللغوية",
    author: "د. خالد سعيد",
    category: "تقنية",
    publishDate: "2026-01-05",
    downloadUrl: "/papers/paper-3.pdf",
    description:
      "استكشاف تطبيقات الذكاء الاصطناعي في تقييم وتحليل المهارات اللغوية.",
  },
  {
    id: "4",
    title: "معايير جودة الاختبارات المعيارية للغة العربية",
    author: "د. سارة أحمد",
    category: "اختبارات",
    publishDate: "2025-12-20",
    downloadUrl: "/papers/paper-4.pdf",
    description:
      "دراسة معايير الصدق والثبات في الاختبارات المعيارية للغة العربية.",
  },
  {
    id: "5",
    title: "تعليم المفردات العربية للناطقين بغيرها",
    author: "د. محمد عبدالله",
    category: "تعليم",
    publishDate: "2025-12-15",
    downloadUrl: "/papers/paper-5.pdf",
    description:
      "استراتيجيات فعالة لتعليم المفردات العربية للمتعلمين من غير الناطقين بها.",
  },
  {
    id: "6",
    title: "تطوير منصات التعلم الإلكتروني للغة العربية",
    author: "د. نورة سالم",
    category: "تقنية",
    publishDate: "2025-12-10",
    downloadUrl: "/papers/paper-6.pdf",
    description:
      "بحث حول تصميم وتطوير منصات التعلم الإلكتروني المتخصصة في اللغة العربية.",
  },
  {
    id: "7",
    title: "تقييم مهارات الاستماع في اختبارات اللغة العربية",
    author: "د. عمر حسن",
    category: "اختبارات",
    publishDate: "2025-12-05",
    downloadUrl: "/papers/paper-7.pdf",
    description:
      "دراسة تحليلية لأساليب تقييم مهارات الاستماع في الاختبارات المعيارية.",
  },
  {
    id: "8",
    title: "أثر التعلم المدمج في تنمية المهارات الكتابية",
    author: "د. ليلى إبراهيم",
    category: "تعليم",
    publishDate: "2025-11-25",
    downloadUrl: "/papers/paper-8.pdf",
    description:
      "بحث تجريبي حول فاعلية التعلم المدمج في تطوير مهارات الكتابة العربية.",
  },
  {
    id: "9",
    title: "تحليل البيانات الضخمة في تقييم الأداء اللغوي",
    author: "د. يوسف كمال",
    category: "تقنية",
    publishDate: "2025-11-20",
    downloadUrl: "/papers/paper-9.pdf",
    description:
      "استخدام تقنيات البيانات الضخمة لتحليل وتقييم الأداء اللغوي للمتعلمين.",
  },
  {
    id: "10",
    title: "تطوير بنوك الأسئلة للاختبارات المعيارية",
    author: "د. هدى محمود",
    category: "اختبارات",
    publishDate: "2025-11-15",
    downloadUrl: "/papers/paper-10.pdf",
    description:
      "منهجية بناء وتطوير بنوك الأسئلة للاختبارات اللغوية المعيارية.",
  },
  {
    id: "11",
    title: "تعليم النحو العربي للمبتدئين من غير الناطقين بها",
    author: "د. أمينة خالد",
    category: "تعليم",
    publishDate: "2025-11-10",
    downloadUrl: "/papers/paper-11.pdf",
    description:
      "مقاربات تعليمية مبتكرة لتدريس النحو العربي للمتعلمين المبتدئين.",
  },
  {
    id: "12",
    title: "تطبيقات الواقع المعزز في تعليم اللغة العربية",
    author: "د. طارق عبدالرحمن",
    category: "تقنية",
    publishDate: "2025-11-05",
    downloadUrl: "/papers/paper-12.pdf",
    description:
      "استكشاف إمكانيات الواقع المعزز في تعزيز تجربة تعلم اللغة العربية.",
  },
];

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";

    console.log("Research Library API - Language:", locale);

    // Fetch research articles directly (server action import causes runtime issues in route handlers)
    const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_ARTICLES_URL}/RESEARCH_ARTICLE/Research article type`;
    const authorization =
      "Basic " +
      btoa(
        `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
      );

    const urlWithParam = new URL(serviceUrl);
    urlWithParam.searchParams.append("searchText", "");
    urlWithParam.searchParams.append("selectedYear", "");
    urlWithParam.searchParams.append("locale", locale);
    urlWithParam.searchParams.append("selectedArticleType", "0");
    urlWithParam.searchParams.append("page", "1");
    urlWithParam.searchParams.append("pageSize", "1000");

    // Fetch hero content and research articles in parallel
    const [headerContent, researchRes] = await Promise.all([
      fetchContentWithKey("RESEARCH_RESEARCH_HEADER_CONTENT_KEY"),
      fetch(urlWithParam, {
        method: "POST",
        headers: { Authorization: authorization },
      }),
    ]);

    let researchResponse = { articleList: [] };
    if (researchRes.ok) {
      researchResponse = await researchRes.json();
    } else {
      console.error("Failed to fetch research articles:", researchRes.status);
    }

    console.log("Research Library - Header:", headerContent?.title);
    console.log(
      "Research Library - Articles count:",
      researchResponse?.articleList?.length
    );

    // Process header
    const headerFields = extractFields(headerContent?.contentFields, [
      "titleText",
      "descriptionText",
    ]) as { titleText?: string; descriptionText?: string };

    // Map articles to ResearchPaper shape
    const rawArticles = researchResponse?.articleList || [];
    const mappedArticles: Array<{
      id: string;
      title: string;
      author: string;
      category: string;
      publishDate: string;
      downloadUrl: string;
      description: string;
    } | null> = rawArticles.map(mapArticle);
    const articles = mappedArticles.filter((a): a is NonNullable<typeof a> => a !== null);

    return NextResponse.json({
      header: {
        title:
          headerFields?.titleText ||
          headerContent?.title ||
          "مكتبة الابحاث",
        description:
          headerFields?.descriptionText ||
          "يمكنك هنا العثور على مجموعة من أحدث الأبحاث التي أجراها شركاء اختبار همزة وأكاديميون مدعومون من اختبار همزة من مختلف أنحاء العالم.",
      },
      articles: articles.length > 0 ? articles : fallbackArticles,
      locale,
    });
  } catch (error) {
    console.error("Error fetching research library content:", error);
    return NextResponse.json(
      {
        header: {
          title: "مكتبة الابحاث",
          description:
            "يمكنك هنا العثور على مجموعة من أحدث الأبحاث التي أجراها شركاء اختبار همزة وأكاديميون مدعومون من اختبار همزة من مختلف أنحاء العالم. ، يُمَوِّل اختبار همزة الأبحاث في ثلاثة مجالات رئيسية تتعلق بتعلم وتقييم اللغة العربية",
        },
        articles: fallbackArticles,
      },
      { status: 500 }
    );
  }
}
