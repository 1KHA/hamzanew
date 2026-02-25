/**
 * Test Mechanism Page (آلية الاختبار)
 *
 * This page displays information about the Hamza test mechanism,
 * including in-person and remote testing options.
 */

import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import Button from "../../components/button/Button";
import TestTypeSwitcher from "./TestTypeSwitcher";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "آلية الاختبار",
  description:
    "خيارات مرنة لأداء اختبار همزة فهو اختبار محوسب يوفر لك خيارات متعددة لأداء اختبار سواءً من خلال مراكزنا المعتمدة حضوريًا أو عن بُعد",
};

/* ==========================================================================
   Main Page Component
   ========================================================================== */

export default function TestMechanismPage() {
  return (
    <>
      {/* ====================================================================
          Section 1: Test Information (In-Person / Remote)
          ==================================================================== */}
      <section aria-labelledby="test-type-title">
        <div className="content !py-[40px] xl:!py-[80px]">
          <TestTypeSwitcher />
        </div>
      </section>

      {/* ====================================================================
          Section 2: Call to Action - Test Preparation
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
                هل أنت مستعد لاختبار همزة
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك،
                وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية،
                واستعد ليوم الاختبار بثقة واطمئنان.
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
