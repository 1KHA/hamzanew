import type { Metadata } from "next";
import { cookies } from "next/headers";
import Card from "@/app/components/card/Card";
import "../about.css";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("lang")?.value?.startsWith("en");
  return {
    title: isEn ? "Hamza Test Traits" : "سمات اختبار همزة",
    description: isEn
      ? "Hamza tests provide a standardized and reliable approach to measuring Arabic language proficiency."
      : "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية.",
  };
}

/**
 * Interface representing a trait or characteristic of the Hamza test.
 */
interface Trait {
  /** The sequence number of the trait */
  number: string;
  /** The title of the trait */
  title?: string;
  /** The description of the trait */
  description: string;
}

/* ==========================================================================
   Static Data (used as fallback values)
   ========================================================================== */

const fallbackTraits: Trait[] = [
  { number: "1", title: "مصممة بأفضل معايير الأمان", description: "تضمن حماية البيانات، والتحقق من هوية المختبرين باستخدام تقنيات حديثة." },
  { number: "2", title: "مُحوسبة وسهلة التطبيق", description: "يمكن تطبيقها في المراكز التعليمية أو عن بُعد، مع تجربة استخدام سلسة للمتقدمين والمشرفين." },
  { number: "3", title: "شاملة وتقيس مختلف المهارات اللغوية", description: "تغطي مهارات القراءة، الكتابة، الاستماع، والتراكيب اللغوية، لتقديم صورة متكاملة عن مستوى المتقدم." },
  { number: "4", title: "معيارية وموثوقة", description: "تعتمد همزة على أسس علمية ومعايير قياس معتمدة لضمان دقة النتائج وعدالتها بين جميع المتقدمين." },
];

const fallbackTraitsEn: Trait[] = [
  { number: "1", title: "Designed with Best Security Standards", description: "Ensures data protection and verifies test taker identity using modern technologies." },
  { number: "2", title: "Computerized & Easy to Apply", description: "Can be applied in educational centers or remotely, with a smooth user experience." },
  { number: "3", title: "Comprehensive & Measures Various Language Skills", description: "Covers reading, writing, listening, and linguistic structures for a comprehensive assessment." },
  { number: "4", title: "Standardized & Reliable", description: "Built on scientific foundations and accredited measurement standards to ensure accuracy and fairness." },
];

/**
 * HamzaTestTraitsPage Component
 *
 * Server-rendered page that displays the key traits and characteristics of the Hamza test.
 * Fetches localized data from /api/traits based on the lang cookie.
 * Falls back to static data if API is unavailable.
 *
 * @accessibility
 * - Uses semantic HTML (<section>, <ul>, <li>)
 * - Implements proper heading hierarchy (h2)
 * - Uses aria-labelledby for section identification
 * - Ensures list items are properly exposed to assistive technologies
 *
 * @returns {JSX.Element} The rendered Hamza Test Traits page.
 */
export default async function HamzaTestTraitsPage() {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("lang")?.value?.startsWith("en");
  const locale = isEn ? "en" : "ar";

  let title = isEn ? "Traits" : "السمات";
  let traits: Trait[] = isEn ? fallbackTraitsEn : fallbackTraits;

  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseURL}/api/traits`, {
      cache: "no-store",
      headers: {
        Cookie: `lang=${isEn ? "en-US" : "ar-SA"}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      if (data.title) {
        title = data.title;
      }

      if (data.traits && data.traits.length > 0) {
        traits = data.traits;
      }
    }
  } catch (error) {
    console.error("Failed to fetch traits:", error);
    // Will use fallback data
  }

  return (
    <div
      className="block-padding-10xl bg-color-grey-50"
      style={{
        backgroundColor: "#f9fafb",
        backgroundImage: `url(/assets/image/bg-image.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "1233.365px 0px",
      }}
    >
      <section
        className="stack-xl custom-container"
        aria-labelledby="traits-heading"
      >
        <h2 id="traits-heading" className="section-header">
          {title}
        </h2>
        <ul className="grid-cols-4-gap-24" role="list">
          {traits.map((trait) => (
            <li key={trait.number} style={{ listStyle: "none" }}>
              <Card
                style={{
                  alignSelf: "stretch",
                  flex: "1 0 0",
                  border: "none",
                }}
                number={trait.number}
                title={trait.title}
                description={trait.description}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}