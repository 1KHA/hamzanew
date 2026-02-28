import Button from "@/app/components/button/Button";
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
 * Resources Data
 * Static collection of preparation modules.
 */
const RESOURCES = [
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
 *
 * Accessibility Strategy:
 * - Semantic Landmarks: Uses <section> for logical divisions and root containment.
 * - Navigation: Resources are grouped in an ARIA-labeled list.
 * - Hierarchy: Provides a visually hidden <h1> for screen readers to establish page context.
 * - RTL Support: Uses direction-aware CSS classes for background gradients.
 */
export default function PreparationResourcePage() {
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
                نقدم لك
              </h2>
              <p className="text-md-medium !font-normal !text-[#fff]">
                تمنحك مـــواردنـا التعليميـــة فرصـــة للاطـــلاع على أسئلة
                وأجوبة واقعية تساعدك على فهم طبيعة الاختبار وتوقّع أسلوبه.
              </p>
            </header>

            {/* Resource Cards Grid */}
            <ul
              className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-[24px] lg:!col-span-9"
              aria-label="قائمة مصادر التحضير المتاحة"
            >
              {RESOURCES.map((resource, index) => (
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

      {/* --- Registration Conversion Section --- */}
      <section
        className="relative !py-[32px] linear-gradient-074d31"
        aria-labelledby="registration-cta-heading"
        style={{
          backgroundImage: `url('/assets/image/bg-image-3.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* We use a container to constrain the content while the parent section holds the full-width background */}
        <div className="custom-container !py-[48px] lg:!py-[96px]">
          <div className="!flex !justify-start !max-w-[100%] lg:!max-w-[40%]">
            <article className="!flex !flex-col !gap-[14px]">
              <h2
                id="registration-cta-heading"
                className="display-sm-bold !text-[#fff]"
              >
                تقدم لاختبار همزة بسهولة
              </h2>

              <p className="text-md-medium !font-normal !text-[#fff]">
                يمكنك التحضير للاختبار بسهولة باستخدام المواد التدريبية ومقاطع
                الفيديو التي تساعدك على فهم محتوى الاختبار ومتطلباته.
              </p>

              <Button
                label="التسجيل في الإختبار"
                variant="secondary"
                size="md"
                icon="arrow-up-right-01"
                iconPosition="right"
                className="md:!max-w-[30%]"
                ariaLabel="بدء عملية تسجيل الاختبار"
              />
            </article>
          </div>
        </div>
      </section>
    </section>
  );
}
