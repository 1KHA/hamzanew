import { Metadata } from "next";
import Button from "../../../components/button/Button";
import AcademicTestContent, { AcademicLevelsContent } from "./AcademicTestContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";

export const metadata: Metadata = {
  title: "اختبار همزة الأكاديمي",
  description:
    "تعرّف على أقسام اختبار همزة الأكاديمي وسجّل الآن للتحضير للاختبار.",
};

export default function HamzaAcademicTestPage() {
  return (
    <>
      {/* Section 1: Language Proficiency Levels */}
      <section className="bg-[#F3FCF6]" aria-labelledby="levels-title">
        <div className="content !py-[40px] xl:!py-0">
          <AcademicLevelsContent />
        </div>
      </section>

      {/* Section 2: Test Information and Sections */}
      <section
        className="bg-color-grey-50 cta-bg-logo"
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] flex flex-col gap-[24px] md:gap-[32px]">
          <AcademicTestContent />
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section
        className="content gap-[32px] !py-[40px]"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col gap-[24px] bg-[#074D31] rounded-[16px] md:rounded-[24px] px-[24px] md:px-[80px] custom-container section-spacing-5xl cta-bg-pattern">
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <div className="flex flex-col gap-4">
              <h2 id="cta-title" className="display-sm-bold !text-white">
                هل أنت مستعد لاختبار همزة الأكاديمي؟
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك،
                وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية،
                واستعد ليوم الاختبار بثقة واطمئنان.
              </p>
            </div>
          </div>

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
