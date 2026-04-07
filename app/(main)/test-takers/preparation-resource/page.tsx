import Card from "@/app/components/card/Card";
import { Metadata } from "next";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "مصادر التحضير",
  description: "مصادر التحضير لاختبار همزة",
};

/**
 * Resources Data - Static fallback
 */
const STATIC_RESOURCES = [
  {
    title: "مران",
    description:
      "تتيح لك فرصة التعلّم الذاتي في أي وقت ومن أي مكان، مما يساعدك على البقاء على تواصل مستمر مع مواد التدريب.",
    icon: "file-star",
  },
  {
    title: "الية الاختبار",
    description: "خيارات مرنة لأداء اختبار همزة",
    icon: "edit-01",
  },
  {
    title: "الارشادات ليوم الاختبار",
    description:
      "تحتوي على ارشادات عملية ونصائح متخصـــصة تساعـــدك في يوم الاختبار بفاعليــة وثقـــة",
    icon: "book-open-02",
  },
];

/**
 * PreparationResourcePage
 *
 * Main landing page for test preparation resources.
 * Fetches dynamic content from Liferay API, with static fallback.
 */
export default async function PreparationResourcePage() {
  // Fetch dynamic content from API
  let apiData = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/test-takers/preparation-resource`, {
      cache: "no-store",
    });
    if (response.ok) {
      apiData = await response.json();
    }
  } catch (error) {
    console.error("Error fetching preparation resource content:", error);
  }

  // Use dynamic details data or fallback to static
  const details = apiData?.details || {
    title: "نقدم لك",
    topDescription:
      "تمنحك مـــواردنـا التعليميـــة فرصـــة للاطـــلاع على أسئلة وأجوبة واقعية تساعدك على فهم طبيعة الاختبار وتوقّع أسلوبه.",
    description: "",
    resources: STATIC_RESOURCES,
  };

  const resources = details.resources || STATIC_RESOURCES;

  return (
    <section className="min-h-screen" aria-labelledby="main-prep-heading">
      {/* Visually hidden main heading for screen readers */}
      <h1 id="main-prep-heading" className="sr-only">
        مصادر التحضير لاختبار همزة
      </h1>

      {/* --- Feature Spotlight Section --- */}
      <section
        className="cta-bg-image bg-primary-074d31 !py-[32px]"
        aria-labelledby="resources-introduction"
      >
        <div className="custom-container !py-[48px] lg:!py-[96px]">
          <div className="!grid !grid-cols-1 lg:!grid-cols-12 !gap-20">
            {/* Introductory Text */}
            <header className="!flex !flex-col !gap-[14px] lg:!col-span-3">
              <h2
                id="resources-introduction"
                className="display-sm-bold !text-[#fff]"
              >
                {details.title}
              </h2>
              <p className="text-md-medium !font-normal !text-[#fff]">
                {details.topDescription}
              </p>
            </header>

            {/* Resource Cards Grid */}
            <ul
              className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-[24px] lg:!col-span-9"
              aria-label="قائمة مصادر التحضير المتاحة"
            >
              {resources.map((resource: any, index: number) => (
                <li key={index}>
                  <Card
                    title={resource.title}
                    description={resource.description}
                    icon={resource.icon}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
}