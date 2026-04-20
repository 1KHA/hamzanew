/**
 * Test Mechanism Page (آلية الاختبار)
 *
 * This page displays information about the Hamza test mechanism,
 * including in-person and remote testing options.
 * Fetches localized data from /api/test-takers/test-mechanism based on the lang cookie.
 */

import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import Button from "../../../components/button/Button";
import TestTypeSwitcher, { TabData } from "./TestTypeSwitcher";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "آلية الاختبار",
  description:
    "خيارات مرنة لأداء اختبار همزة فهو اختبار محوسب يوفر لك خيارات متعددة لأداء اختبار سواءً من خلال مراكزنا المعتمدة حضوريًا أو عن بُعد",
};

/* ==========================================================================
   Static Fallback Data
   ========================================================================== */

const staticInPersonTab: TabData = {
  label: "حضوري",
  image: "/assets/image/In-person test.png",
  imageAlt: "اختبار همزة حضوري - متقدم يؤدي الاختبار في مركز رسمي",
  title: "اختبار همزة عبر الحاسوب",
  descriptions: [
    "يتم في مراكز الاختبار الرسمية",
    "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
  ],
  buttonText: "التسجيل في الإختبار",
};

const staticRemoteTab: TabData = {
  label: "عن بعد",
  image: "/assets/image/remote test.png",
  imageAlt: "اختبار همزة عن بعد - متقدم يؤدي الاختبار عبر الإنترنت",
  title: "اختبار همزة عبر الحاسوب",
  descriptions: [
    "يتم عبر المنصة المخصصة بالاختبار",
    "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
  ],
  buttonText: "التسجيل في الإختبار",
};

const staticAreYouReady = {
  titleText: "هل أنت مستعد لاختبار همزة؟",
  descriptionText:
    "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان.",
  buttonText: "التحضير للاختبار",
};

/* ==========================================================================
   Data Fetching
   ========================================================================== */

async function getTestMechanismData() {
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value || "ar-SA";

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseURL}/api/test-takers/test-mechanism`,
      {
        cache: "no-store",
        headers: {
          Cookie: `lang=${langCookie}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch test mechanism data:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching test mechanism data:", error);
    return null;
  }
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

export default async function TestMechanismPage() {
  const data = await getTestMechanismData();

  const inPersonTab: TabData = data?.tabs?.inPerson || staticInPersonTab;
  const remoteTab: TabData = data?.tabs?.remote || staticRemoteTab;
  const areYouReady = data?.areYouReady || staticAreYouReady;

  return (
    <>
      {/* ====================================================================
          Section 1: Test Information (In-Person / Remote)
          ==================================================================== */}
      <section aria-labelledby="test-type-title">
        <div className="content !py-[40px] xl:!py-[80px]">
          <TestTypeSwitcher inPersonTab={inPersonTab} remoteTab={remoteTab} />
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
                {areYouReady.titleText}
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                {areYouReady.descriptionText}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            <Button
              label={areYouReady.buttonText}
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
