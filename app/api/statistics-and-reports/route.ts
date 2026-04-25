import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

/**
 * Maps a raw article object from the search API to the Report shape
 * expected by the ReportsListing component.
 */
function mapReport(raw: any) {
  if (!raw || typeof raw !== "object") return null;

  const id = String(raw.entryClassPK ?? raw.id ?? raw.articleId ?? "");
  const title = raw.title ?? raw.headline ?? raw.titleText ?? "";
  const downloadUrl =
    raw.fileUrl ?? raw.downloadUrl ?? raw.url ?? raw.articleUrl ?? "#";

  return { id, title, downloadUrl };
}

/* ==========================================================================
   Static Fallback Data
   ========================================================================== */

const fallbackReports = [
  { id: "1", title: "عنوان التقرير ١", downloadUrl: "/reports/report-1.pdf" },
  { id: "2", title: "عنوان التقرير ٢", downloadUrl: "/reports/report-2.pdf" },
  { id: "3", title: "عنوان التقرير ٣", downloadUrl: "/reports/report-3.pdf" },
  { id: "4", title: "عنوان التقرير ٤", downloadUrl: "/reports/report-4.pdf" },
  { id: "5", title: "عنوان التقرير ٥", downloadUrl: "/reports/report-5.pdf" },
  { id: "6", title: "عنوان التقرير ٦", downloadUrl: "/reports/report-6.pdf" },
  { id: "7", title: "عنوان التقرير ٧", downloadUrl: "/reports/report-7.pdf" },
  { id: "8", title: "عنوان التقرير ٨", downloadUrl: "/reports/report-8.pdf" },
  { id: "9", title: "عنوان التقرير ٩", downloadUrl: "/reports/report-9.pdf" },
  { id: "10", title: "عنوان التقرير ١٠", downloadUrl: "/reports/report-10.pdf" },
  { id: "11", title: "عنوان التقرير ١١", downloadUrl: "/reports/report-11.pdf" },
  { id: "12", title: "عنوان التقرير ١٢", downloadUrl: "/reports/report-12.pdf" },
  { id: "13", title: "عنوان التقرير ١٣", downloadUrl: "/reports/report-13.pdf" },
  { id: "14", title: "عنوان التقرير ١٤", downloadUrl: "/reports/report-14.pdf" },
  { id: "15", title: "عنوان التقرير ١٥", downloadUrl: "/reports/report-15.pdf" },
];

const fallbackStatistics = [
  { numberTitle: "1.5k", descriptionText: "مراكز الاختبار" },
  { numberTitle: "12", descriptionText: "عدد الجنسيات" },
  { numberTitle: "22", descriptionText: "عدد الدول" },
  { numberTitle: "1.5M", descriptionText: "مختبر عالميًا" },
];

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";

    console.log("Statistics and Reports API - Language:", locale);

    // Fetch reports articles directly (server action import causes runtime issues in route handlers)
    const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_ARTICLES_URL}/REPORTS_AND_STATISTICS_ARTICLE/Reports & Statistics article type`;
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

    // Fetch all three content sources in parallel
    const [headerContent, testingCenterStatsContent, reportsRes] =
      await Promise.all([
        fetchContentWithKey(
          "RESEARCH_STATISTICS_STATISTICS_HEADER_CONTENT_KEY"
        ),
        fetchContentWithKey(
          "RESEARCH_STATISTICS_TESTING_CENTERS_STATISTICS_CONTENT_KEY"
        ),
        fetch(urlWithParam, {
          method: "POST",
          headers: { Authorization: authorization },
        }),
      ]);

    console.log("Statistics - Header:", headerContent?.title);
    console.log("Statistics - Stats:", testingCenterStatsContent?.title);

    // Process header
    const headerFields = extractFields(headerContent?.contentFields, [
      "titleText",
      "descriptionText",
    ]) as { titleText?: string; descriptionText?: string };

    // Process testing center statistics
    const statisticsList = extractList(
      testingCenterStatsContent?.contentFields,
      "testingCenterStatisticsFieldSet",
      {
        numberTitle: "numberTitle",
        descriptionText: "descriptionText",
      }
    );

    // Process reports articles
    let reportsResponse = { articleList: [] };
    if (reportsRes.ok) {
      reportsResponse = await reportsRes.json();
    } else {
      console.error("Failed to fetch reports articles:", reportsRes.status);
    }

    const rawReports = reportsResponse?.articleList || [];
    const mappedReports: Array<{ id: string; title: string; downloadUrl: string } | null> =
      rawReports.map(mapReport);
    const reports = mappedReports.filter(
      (r): r is NonNullable<typeof r> => r !== null
    );

    return NextResponse.json({
      header: {
        title:
          headerFields?.titleText ||
          headerContent?.title ||
          "تقارير واحصائيات",
        description:
          headerFields?.descriptionText ||
          'نقدم تقارير وإحصاءات موثوقة، قائمة على منهجيات علمية، تعكس بدقة نتائج اختبارات "همزة" ومؤشراتها.',
      },
      statistics:
        statisticsList && statisticsList.length > 0
          ? statisticsList
          : fallbackStatistics,
      reports: reports.length > 0 ? reports : fallbackReports,
      locale,
    });
  } catch (error) {
    console.error("Error fetching statistics and reports content:", error);
    return NextResponse.json(
      {
        header: {
          title: "تقارير واحصائيات",
          description:
            'نقدم تقارير وإحصاءات موثوقة، قائمة على منهجيات علمية، تعكس بدقة نتائج اختبارات "همزة" ومؤشراتها. تدعم هذه البيانات الباحثين وصنّاع القرار في القطاعين الأكاديمي والمهني، وتُسهم في تطوير السياسات التعليمية، وإثراء الدراسات المقارنة، وبناء رؤى استراتيجية عالمية لقياس كفاءة اللغة العربية.',
        },
        statistics: fallbackStatistics,
        reports: fallbackReports,
      },
      { status: 500 }
    );
  }
}
