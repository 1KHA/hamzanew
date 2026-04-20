import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";

    console.log("Test Mechanism API - Language:", locale);

    // Fetch all three content sources simultaneously
    const [
      headerContent,
      testViaComputerContent,
      areYouReadyContent,
    ] = await Promise.all([
      fetchContentWithKey(
        "TEST_TAKERS_TEST_DELIVERY_OPTIONS_TEST_DELIVERY_OPTIONS_HEADER_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "TEST_TAKERS_TEST_DELIVERY_OPTIONS_TEST_VIA_COMPUTER_OR_ONSITE_HEADER_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "TEST_TAKERS_TEST_DELIVERY_OPTIONS_ARE_YOU_READY_FOR_THE_HAMZA_TEST_CONTENT_KEY"
      ),
    ]);

    console.log("Test Mechanism - Header:", headerContent?.title);
    console.log("Test Mechanism - Tabs:", testViaComputerContent?.title);
    console.log("Test Mechanism - CTA:", areYouReadyContent?.title);

    // Section 1: Header
    const headerFields = extractFields(headerContent?.contentFields, [
      "titleText",
      "descriptionText",
    ]) as { titleText?: string; descriptionText?: string };

    // Section 2: Tab content (Remote + In-Presence)
    let remoteTestObj: Record<string, string> = {};
    let myPresenceTestObj: Record<string, string> = {};

    testViaComputerContent?.contentFields?.forEach((field: any) => {
      if (field.name === "RemoteFieldGroup") {
        remoteTestObj = extractFields(field?.nestedContentFields, [
          "remoteButtonText",
          "remoteTitleText",
          "remoteDescriptiontext",
          "remoteRegisterButtontext",
          "removeExamImage",
        ]) as Record<string, string>;
      } else if (field.name === "MyPresenceFieldGroup") {
        myPresenceTestObj = extractFields(field?.nestedContentFields, [
          "myPresenceButtonText",
          "myPresenceTitleText",
          "myPresenceDescriptiontext",
          "myPresenceRegisterButtonText",
          "myPresenceExamImage",
        ]) as Record<string, string>;
      }
    });

    // Section 3: Are You Ready
    const areYouReadyFields = extractFields(areYouReadyContent?.contentFields, [
      "titleText",
      "descriptionText",
      "buttonText",
    ]) as { titleText?: string; descriptionText?: string; buttonText?: string };

    return NextResponse.json({
      header: {
        title:
          headerFields?.titleText ||
          headerContent?.title ||
          "آلية الاختبار",
        description: headerFields?.descriptionText || "",
      },
      tabs: {
        inPerson: {
          label: myPresenceTestObj?.myPresenceButtonText || "حضوري",
          title: myPresenceTestObj?.myPresenceTitleText || "اختبار همزة عبر الحاسوب",
          descriptions: myPresenceTestObj?.myPresenceDescriptiontext
            ? [myPresenceTestObj.myPresenceDescriptiontext]
            : [
                "يتم في مراكز الاختبار الرسمية",
                "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
              ],
          buttonText: myPresenceTestObj?.myPresenceRegisterButtonText || "التسجيل في الإختبار",
          image: myPresenceTestObj?.myPresenceExamImage || "/assets/image/In-person test.png",
        },
        remote: {
          label: remoteTestObj?.remoteButtonText || "عن بعد",
          title: remoteTestObj?.remoteTitleText || "اختبار همزة عبر الحاسوب",
          descriptions: remoteTestObj?.remoteDescriptiontext
            ? [remoteTestObj.remoteDescriptiontext]
            : [
                "يتم عبر المنصة المخصصة بالاختبار",
                "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
              ],
          buttonText: remoteTestObj?.remoteRegisterButtontext || "التسجيل في الإختبار",
          image: remoteTestObj?.removeExamImage || "/assets/image/remote test.png",
        },
      },
      areYouReady: {
        titleText:
          areYouReadyFields?.titleText ||
          areYouReadyContent?.title ||
          "هل أنت مستعد لاختبار همزة؟",
        descriptionText:
          areYouReadyFields?.descriptionText ||
          "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان.",
        buttonText: areYouReadyFields?.buttonText || "التحضير للاختبار",
      },
      locale,
    });
  } catch (error) {
    console.error("Error fetching test mechanism content:", error);
    return NextResponse.json(
      {
        header: {
          title: "آلية الاختبار",
          description:
            'خيارات مرنة لأداء اختبار همزة فهو اختبار محوسب يوفر لك خيارات متعددة لأداء اختبار سواءً من خلال مراكزنا المعتمدة حضوريًا أو عن بُعد. نلتزم بتطبيق أعلى معايير الأمان والمصداقية، لضمان الحفاظ على ثقة المؤسسات الأكاديمية والمهنية التي تعتمد نتائج اختبار "همزة" في العالم العربي وخارجه',
        },
        tabs: {
          inPerson: {
            label: "حضوري",
            title: "اختبار همزة عبر الحاسوب",
            descriptions: [
              "يتم في مراكز الاختبار الرسمية",
              "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
            ],
            buttonText: "التسجيل في الإختبار",
            image: "/assets/image/In-person test.png",
          },
          remote: {
            label: "عن بعد",
            title: "اختبار همزة عبر الحاسوب",
            descriptions: [
              "يتم عبر المنصة المخصصة بالاختبار",
              "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
            ],
            buttonText: "التسجيل في الإختبار",
            image: "/assets/image/remote test.png",
          },
        },
        areYouReady: {
          titleText: "هل أنت مستعد لاختبار همزة؟",
          descriptionText:
            "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان.",
          buttonText: "التحضير للاختبار",
        },
      },
      { status: 500 }
    );
  }
}
