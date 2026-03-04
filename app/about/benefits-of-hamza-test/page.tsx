import "@/app/components/scroll-frame/ScrollFrame.css";
import "../about.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أهمية اختبارات همزة",
  description: "",
};
/**
 * Interface representing a benefit item for test takers.
 */
interface BenefitItem {
  /** The sequence number of the benefit */
  number: number;
  /** The title of the benefit */
  title: string;
  /** The description of the benefit */
  description: string;
}

interface HamzaSlide {
  number: string;
  content: string;
  icon: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * List of benefits for test takers.
 */
const benefits: BenefitItem[] = [
  {
    number: 1,
    title: "تمكين",
    description:
      "مجمع الملك سلمان العالمي للغة العربية من الريادة والمرجعية العالمية في خدمة اللغة العربية.",
  },
  {
    number: 2,
    title: "فتح أبواب الفرص",
    description: "يعزز فرصك الأكاديمية والمهنية في الجامعات وسوق العمل.",
  },
  {
    number: 3,
    title: "تطوير لغتك",
    description:
      "يساعدك الاختبار على معرفة مستواك بدقة، مما يمكّنك من وضع خطة واضحة لتحسين مهاراتك اللغوية",
  },
];

/**
 * List of benefits for organizations (slides).
 */
const organizationBenefits: HamzaSlide[] = [
  {
    number: "01",
    content:
      "قياس الكفاءة اللغوية لدى متعلمي اللغة العربية من غير الناطقين بها",
    icon: "../assets/image/image 11.png",
  },
  {
    number: "02",
    content: "المفاضلة بين المتقدمين للبرامج الأكاديمية.",
    icon: "../assets/image/image 7.png",
  },
  {
    number: "03",
    content: "التنافس على المنح الدراسية.",
    icon: "../assets/image/image 8.png",
  },
  {
    number: "04",
    content: "قياس نواتج التعلم في المقررات الدراسية وتطوير مخرجات التعليم",
    icon: "../assets/image/image 10.png",
  },
  {
    number: "05",
    content: "الإعفاء من بعض المقررات الجامعية.",
    // content: "Hello there, this is testing text for english content",
    icon: "../assets/image/image 9.png",
  },
];

/**
 * BenefitsFrame
 *
 * Renders a single organization benefit card with full accessibility support.
 *
 * @accessibility
 * - `<article>` with descriptive `aria-label` conveying both the sequence number
 *   and the benefit text — screen readers announce the full context in one pass.
 * - Decorative number badges have `aria-hidden="true"` (already in aria-label).
 * - Illustrative icon images have `alt=""` + `aria-hidden="true"` (purely decorative).
 */
function BenefitsFrame({ slide }: { slide: HamzaSlide }) {
  const ariaLabel = `الفائدة ${slide.number}: ${slide.content}`;

  return (
    <article
      aria-label={ariaLabel}
    >
      <div
        className="sticky-card"
        style={{ position: "static", width: "100%", height: "auto" }}
        role="presentation"
      >
        <p
          className="card-bg-id text-xl-bold lg:!hidden !me-auto"
          aria-hidden="true"
        >
          {slide.number}
        </p>

        <div className="card-inner">
          <div className="icon-wrapper" role="presentation">
            <img
              src={slide.icon}
              alt=""
              aria-hidden="true"
              className="icon-img"
            />
          </div>

          <div className="card-content">
            <p
              className="card-bg-id text-xl-bold !hidden lg:!inline-flex"
              aria-hidden="true"
            >
              {slide.number}
            </p>

            <p className="text-lg-bold" lang="ar">
              {slide.content}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * BenefitsOfHamzaTestPage Component
 *
 * Displays the benefits of the Hamza test for both test takers and organizations.
 * Optimized for accessibility and performance.
 *
 * @accessibility
 * - Uses semantic HTML (<section>, <ul>, <li>)
 * - Implements proper heading hierarchy (h2 for main sections)
 * - Uses aria-labelledby for section identification
 * - Ensures list roles are preserved for screen readers
 *
 * @returns {JSX.Element} The rendered Benefits page.
 */
export default function BenefitsOfHamzaTestPage() {
  return (
    <div
      className="bg-color-grey-50"
      style={{
        padding: "clamp(16px, 3vw, 32px) clamp(16px, 6vw, 80px)",
      }}
    >
      <div
        className="custom-container stack"
        style={{
          display: "flex",
          padding: "clamp(20px, 5vw, 70px)",
          gap: "clamp(16px, 5vw, 70px)",
          borderRadius: 16,
          background: "#FFF",
        }}
      >
        {/* Upper Section: Benefits for Test Takers */}
        <section className="flex-start-gap-80" aria-labelledby="takers-heading">
          <div className="stack-xl">
            <header className="section-head">
              <p className="section-title">كيفية الإستفادة من همزة</p>
              <h2 id="takers-heading" className="display-sm-bold">
                فوائد اختبارات همزة للمختبرين
              </h2>
            </header>
            <p className="description">
              توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة
              العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى
              دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب
              الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل
              والتعليم، واستقطاب الكفاءات إلى جهتك.
            </p>
          </div>

          <ul
            className="stack-lg"
            role="list"
            aria-label="قائمة فوائد الاختبار للمختبرين"
          >
            {benefits.map((benefit) => (
              <li
                key={benefit.number}
                className="about-value-card"
                aria-label={`الفائدة ${benefit.number}: ${benefit.title} - ${benefit.description}`}
                style={{
                  borderRadius: "var(--radius-lg, 16px)",
                  background: "#F9FAFB",
                  listStyle: "none",
                }}
              >
                <div className="about-value-card__header">
                  <span
                    className="about-value-card__badge text-xl-bold"
                    aria-hidden="true"
                  >
                    {benefit.number}
                  </span>
                  <div className="about-value-card__content">
                    <h3 className="about-value-card__title">{benefit.title}</h3>
                    <p className="about-value-card__desc">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Bottom Section: Benefits for Organizations (Static) */}
        <section aria-labelledby="org-heading" className="org-benefits-section">
          <header className="section-head">
            <p className="section-title">كيفية الاستفادة من همزة</p>
            <h2 id="org-heading" className="display-sm-bold">
              فوائد اختبارات همزة للجهات
            </h2>
          </header>
          <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-[24px]">
            {organizationBenefits.map((slide, index) => (
              <BenefitsFrame key={index} slide={slide} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
