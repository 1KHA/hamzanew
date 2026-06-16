import Card from "@/app/components/card/Card";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export const dynamic = "force-dynamic";

/* ==========================================================================
   Metadata
   ========================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return {
    title: st("testTakers", "prepResourceMetaTitle", locale),
    description: st("testTakers", "prepResourceMetaDesc", locale),
  };
}

/* ==========================================================================
   Fallback Data
   ========================================================================== */

const STATIC_RESOURCES_AR = [
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

const STATIC_RESOURCES_EN = [
  {
    title: "Meran",
    description:
      "It gives you the opportunity for self-learning at any time and from anywhere, helping you stay in constant contact with training materials.",
    icon: "file-star",
  },
  {
    title: "Test Mechanism",
    description: "Flexible options for taking the Hamza test",
    icon: "edit-01",
  },
  {
    title: "Test Day Guidelines",
    description:
      "Contains practical instructions and specialized tips to help you on test day effectively and confidently.",
    icon: "book-open-02",
  },
];

/* ==========================================================================
   Page Component
   ========================================================================== */

export default async function PreparationResourcePage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const isEnglish = locale === "en-US";
  const activeLocale = isEnglish ? "en" : "ar";

  // Fetch dynamic content from API with locale cookie forwarded
  let apiData = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseUrl}/api/test-takers/preparation-resource`,
      {
        cache: "no-store",
        headers: {
          Cookie: `lang=${locale}`,
        },
      }
    );
    if (response.ok) {
      apiData = await response.json();
    }
  } catch (error) {
    console.error("Error fetching preparation resource content:", error);
  }

  // Use dynamic details data or fallback to static
  const staticResources = isEnglish ? STATIC_RESOURCES_EN : STATIC_RESOURCES_AR;
  const details = apiData?.details || {
    title: isEnglish ? "We offer you" : "نقدم لك",
    topDescription: isEnglish
      ? "Our educational resources give you the opportunity to access realistic questions and answers that help you understand the nature of the test and anticipate its style."
      : "تمنحك مـــواردنـا التعليميـــة فرصـــة للاطـــلاع على أسئلة وأجوبة واقعية تساعدك على فهم طبيعة الاختبار وتوقّع أسلوبه.",
    description: "",
    resources: staticResources,
  };

  const resources = details.resources || staticResources;

  return (
    <section aria-labelledby="main-prep-heading">
      {/* Visually hidden main heading for screen readers */}
      <h1 id="main-prep-heading" className="sr-only">
        {st("testTakers", "prepResourceSrHeading", activeLocale)}
      </h1>

      {/* --- Feature Spotlight Section --- */}
      <section
        className="cta-bg-image bg-primary-074d31 !py-[32px]"
        aria-labelledby="resources-introduction"
      >
        <div className="custom-container !py-[48px] lg:!py-[96px]">
          <div className="!grid !grid-cols-1 lg:!grid-cols-12 !gap-20">
            {/* Introductory Text */}
            <header className="!flex !flex-col !gap-[14px] lg:!col-span-3 self-center !items-center !text-center">
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
              aria-label={st("testTakers", "prepResourceListAria", activeLocale)}
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
