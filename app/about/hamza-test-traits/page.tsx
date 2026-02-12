import Card from "@/app/components/card/Card";
import "../about.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سمات إختبار همزة",
  description:
      "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.",
}
/**
 * Interface representing a trait or characteristic of the Hamza test.
 */
interface Trait {
  /** The sequence number of the trait */
  number: string;
  /** The title of the trait */
  title: string;
  /** The description of the trait */
  description: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * List of traits describing the Hamza test's features.
 */
const traitsData: Trait[] = [
  {
    number: "1",
    title: "مصممة بأفضل معايير الأمان",
    description:
      "تضمن حماية البيانات، والتحقق من هوية المختبرين باستخدام تقنيات حديثة.",
  },
  {
    number: "2",
    title: "مُحوسبة وسهلة التطبيق",
    description:
      "يمكن تطبيقها في المراكز التعليمية أو عن بُعد، مع تجربة استخدام سلسة للمتقدمين والمشرفين.",
  },
  {
    number: "3",
    title: "شاملة وتقيس مختلف المهارات اللغوية",
    description:
      "تغطي مهارات القراءة، الكتابة، الاستماع، والتراكيب اللغوية، لتقديم صورة متكاملة عن مستوى المتقدم.",
  },
  {
    number: "4",
    title: "معيارية وموثوقة",
    description:
      "تعتمد همزة على أسس علمية ومعايير قياس معتمدة لضمان دقة النتائج وعدالتها بين جميع المتقدمين.",
  },
];

/**
 * HamzaTestTraitsPage Component
 *
 * Displays the key traits and characteristics of the Hamza test.
 * Optimized for accessibility and performance.
 *
 * @accessibility
 * - Uses semantic HTML (<section>, <ul>, <li>)
 * - Implements proper heading hierarchy (h2)
 * - Uses aria-labelledby for section identification
 * - Ensures list items are properly exposed to assistive technologies
 *
 * @returns {JSX.Element} The rendered Hamza Test Traits page.
 */
export default function HamzaTestTraitsPage() {
  return (
    <div
      className="block-padding-10xl bg-color-grey-50"
      style={{
        backgroundColor: "#f9fafb",
        backgroundImage: `url(/assets/image/bg-image.png)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "1233.365px 0px", // Maintains original styling
      }}
    >
      <section
        className="stack-xl custom-container"
        aria-labelledby="traits-heading"
      >
        <h2 id="traits-heading" className="section-header">
          السمات
        </h2>
        <ul className="grid-cols-4-gap-24" role="list">
          {traitsData.map((trait) => (
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
