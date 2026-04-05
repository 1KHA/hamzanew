import { Metadata } from "next";
import Button from "../../../components/button/Button";
import GeneralTestContent from "./GeneralTestContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";

export const metadata: Metadata = {
  title: "اختبار همزة العام",
  description:
    "تعرّف على أقسام اختبار همزة العام وسجّل الآن للتحضير للاختبار.",
};

async function getHamzaGeneralTestData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/types-of-tests/general-test`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error("Failed to fetch hamza general test data:", response.status);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching hamza general test data:", error);
    return null;
  }
}

export default async function HamzaGeneralTestPage() {
  const data = await getHamzaGeneralTestData();
  
  return (
    <>
      {/* Section 1: Test Information and Sections */}
      <section
        className="bg-color-grey-50 cta-bg-logo"
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] flex flex-col gap-[24px] md:gap-[32px]">
          <GeneralTestContent 
            header={data?.header}
            testSections={data?.testSections}
          />
        </div>
      </section>

      {/* Section 2: Call to Action */}
      <section
        className="content gap-[32px] !py-[40px]"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col gap-[24px] bg-[#074D31] rounded-[16px] md:rounded-[24px] px-[24px] md:px-[80px] custom-container section-spacing-5xl cta-bg-pattern">
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <div className="flex flex-col gap-4">
              <h2 id="cta-title" className="display-sm-bold !text-white">
                {data?.areYouReady?.titleText || "هل أنت مستعد لاختبار همزة العام؟"}
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                {data?.areYouReady?.descriptionText || "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان."}
              </p>
            </div>
          </div>

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