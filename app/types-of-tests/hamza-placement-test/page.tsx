/**
 * Hamza Placement Test Page
 *
 * Server component — owns metadata & page skeleton.
 * Animated two-column section is delegated to PlacementTestAnimated
 * (a "use client" component) so Framer Motion can run in the browser
 * without forcing the whole page into the client bundle.
 *
 * @accessibility
 * - Landmark regions: <main> handled by the layout, <section> + aria-labelledby here
 * - Heading hierarchy: h1 inside PlacementTestAnimated, h2 for CTA
 * - All images: descriptive alt on meaningful ones, alt="" + aria-hidden on decorative
 * - Interactive elements have visible focus indicators (via global CSS)
 * - Colour contrast meets WCAG AA (dark green #074D31 on white)
 */

import { Metadata } from "next";
import Button from "../../components/button/Button";
import PlacementTestContent from "./PlacementTestContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";

export const metadata: Metadata = {
  title: "اختبار همزة لتحديد المستوى",
  description:
    "تعرّف على أقسام اختبار همزة لتحديد المستوى اللغوي وسجّل الآن للتحضير للاختبار.",
};

export default function HamzaPlacementTestPage() {
  return (
    <>
      {/* ====================================================================
          Section 1: Test Information and Sections
          ==================================================================== */}
      <section
        className="bg-color-grey-50 cta-bg-logo"
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] flex flex-col gap-[24px] md:gap-[32px]">
          {/*
           * PlacementTestAnimated owns the grid, the h1, all cards,
           * and the Framer Motion entrance animations.
           */}
          <PlacementTestContent />
        </div>
      </section>

      {/* ====================================================================
          Section 2: Call to Action — Test Preparation
          ==================================================================== */}
      <section
        className="content gap-[32px] !py-[40px]"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col gap-[24px] bg-[#074D31] rounded-[16px] md:rounded-[24px] px-[24px] md:px-[80px] custom-container section-spacing-5xl cta-bg-pattern">
          {/* CTA Content */}
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <div className="flex flex-col gap-4">
              <h2 id="cta-title" className="display-sm-bold !text-white">
                هل أنت مستعد لاختبار همزة لتحديد المستوى؟
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب
                متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم
                الاختبار بثقة واطمئنان.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            <Button
              label="التحضير للاختبار"
              variant="primary-neutral--on-color"
              size="lg"
              icon="arrow-up-right-01"
              className="w-full md:w-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}
