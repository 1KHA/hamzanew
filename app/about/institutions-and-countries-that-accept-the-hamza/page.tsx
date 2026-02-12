import Card from "@/app/components/card/Card";
import "../about.css";
import "../../styles/Button.css";
import Tag from "../../components/tag/Tag";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المؤسسات والدول التي تقبل همزة",
  description:
    "تعتمد بعض المؤسسات حول العالم على اختبار همزة لتقييم الكفاءة في اللغة العربية تشمل هذه المؤسسات: الجامعات، الجهات الحكومية، الهيئات المهنية، شركات التوظيف، وجهات الهجرة في الدول الناطقة بالعربية أو المهتمة بها.",
}
/**
 * Interface representing a resource card for statistics or guidance.
 */
interface ResourceItem {
  /** Unique identifier for the item */
  id: number;
  /** Title of the card */
  title: string;
  /** Description text */
  description: string;
  /** Icon name to display */
  icon: string;
  /** External link URL */
  externalLink: string;
  /** Label for the primary action button */
  primaryActionLabel: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * List of paths to institution logo images.
 */
const institutions: string[] = [
  "/assets/image/institutions1.png",
  "/assets/image/institutions2.png",
  "/assets/image/institutions3.png",
  "/assets/image/institutions1.png",
  "/assets/image/institutions2.png",
  "/assets/image/institutions3.png",
  "/assets/image/institutions2.png",
  "/assets/image/institutions3.png",
  "/assets/image/institutions2.png",
  "/assets/image/institutions1.png",
];

/**
 * Data for the statistics and resources cards.
 */
const resources: ResourceItem[] = [
  {
    id: 1,
    title: "إحصائيات الاختبارات",
    description:
      "يُساعد اختبار همزة الناس حول العالم. يمكنك معرفة أداء المتقدمين السابقين للاختبار من خلال صفحة الإحصائيات لدينا.",
    icon: "chart-bar-line",
    externalLink: "#",
    primaryActionLabel: "تصفح الاحصائيات",
  },
  {
    id: 2,
    title: "احصل على النتائج التي تستحقها",
    description:
      "نوفر لك مجموعة واسعة من الموارد لمساعدتـــك فــي الحصـــول على نتائج الاختبار التي تحتاجــها. تابـــع تقــدمـــك، واحصـــل على المساعدة، واكتشف المزيد عبر صفحة الموارد لدينا.",
    icon: "book-04",
    externalLink: "#",
    primaryActionLabel: "التحضير للإختبار",
  },
];

/**
 * InstitutionsPage Component
 *
 * Displays a list of institutions that accept the Hamza test,
 * along with statistics and call-to-action sections.
 * Optimized for accessibility and performance.
 *
 * @accessibility
 * - Uses semantic HTML (<section>, <ul>, <li>)
 * - Implements proper heading hierarchy (h2)
 * - Uses aria-labelledby and aria-label for section identification
 * - Ensures images have descriptive alt text
 *
 * @returns {JSX.Element} The rendered Institutions page.
 */
export default function InstitutionsPage() {
  return (
    <>
      <div className="custom-container">
        {/* Upper Section: Institutions Grid */}
        <section
          className="stack-xl block-padding-3xl"
          aria-labelledby="institutions-heading"
        >
          <div className="section-head">
            <p className="section-title">كن جزءًا من مجتمع همزة</p>
            <h2 id="institutions-heading" className="section-header">
              الجهات التي طبقت اختبار همزة
            </h2>
          </div>

          <div className="flex-start-center gap-4">
            <div className="flex-start-center gap-4">
              <Tag
                label="داخل المملكة العربية السعودية"
                variant="success"
                size="lg"
                trailIcon={{ src: "/assets/image/Country Flags.svg" }}
              />

              <Tag
                label="دول أخرى"
                variant="neutral"
                size="lg"
                trailIcon={{
                  src: "/assets/icons/stroke-standard/flag-02-stroke-rounded.svg",
                }}
              />
            </div>
          </div>

          <ul
            className="grid grid-cols-1 md:grid-cols-5 gap-4! items-stretch!"
            role="list"
          >
            {institutions.map((imagePath, index) => (
              <li
                key={index}
                className="card h-40 flex items-center! justify-center p-[32px]!"
              >
                <div className="h-80 align-center flex justify-center items-center">
                  <img
                    src={imagePath}
                    alt={`Institution logo ${index + 1}`}
                    className="fit-contain logo-image"
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Middle Section: Info Cards */}
        <section
          className="row-center-gap-3xl block-padding-8xl"
          aria-label="Resources and Statistics"
        >
          {resources.map((item) => (
            <Card
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              showPrimaryAction={true}
              primaryActionLabel={item.primaryActionLabel}
              primaryTrailIconType="arrow-up-right-01"
              buttonColor="primary-brand"
              external={true}
              linkPrimaryAction={item.externalLink}
            />
          ))}
        </section>
      </div>

      {/* Bottom Section: CTA */}
      <section
        className="section-bg-bottom-image block-padding-8xl section-cta"
        aria-labelledby="cta-heading"
      >
        <div className="stack-lg custom-container section-cta__box">
          <h2 id="cta-heading" className="section-cta__title">
            هل أنت مستعد للانضمام إلينا؟
          </h2>

          <p className="section-cta__desc">
            انضم إلى آلاف المؤسسات والشركات في العالم العربي التي تعتمد همزة
            لاختيار الموظفين القادرين على التواصل باحترافية وإتقان.
          </p>

          <button
            className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color"
            aria-label="Join us now"
          >
            <span className="dga-btn-label">إنضم إلينا</span>
            <img
              src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg"
              width={24}
              height={24}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>
      </section>
    </>
  );
}
