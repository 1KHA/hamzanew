/**
 * Hamza Vocabulary Test Page
 *
 * Server component — owns metadata & page skeleton.
 * Animated section is delegated to VocabularyTestContent
 * (a "use client" component) so animations can run in the browser.
 *
 * @accessibility
 * - Landmark regions: <main> handled by the layout, <section> + aria-labelledby here
 * - Heading hierarchy: h1 inside VocabularyTestContent, h2 for CTA
 * - All images: descriptive alt on meaningful ones, alt="" + aria-hidden on decorative
 * - Interactive elements have visible focus indicators (via global CSS)
 * - Colour contrast meets WCAG AA (dark green #074D31 on white)
 */

import { Metadata } from "next";
import Button from "../../../components/button/Button";
import VocabularyTestContent from "./VocabularyTestContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";

export const metadata: Metadata = {
  title: "اختبار همزة المفردات",
  description:
    "تعرّف على مستويات اختبار همزة للمفردات وسجّل الآن للتحضير للاختبار.",
};

async function getHamzaVocabularyTestData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/types-of-tests/vocabulary-test`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error("Failed to fetch hamza vocabulary test data:", response.status);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching hamza vocabulary test data:", error);
    return null;
  }
}

export default async function HamzaVocabularyTestPage() {
  const data = await getHamzaVocabularyTestData();
  
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
          <VocabularyTestContent 
            header={data?.header}
            testSections={data?.testSections}
          />
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
                {data?.areYouReady?.titleText || "هل أنت مستعد لاختبار همزة المفردات؟"}
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                {data?.areYouReady?.descriptionText || "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان."}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            <Button
              label={data?.areYouReady?.buttonText || "التحضير للاختبار"}
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