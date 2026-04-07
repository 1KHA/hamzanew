export type HeroData = {
  title: string;
  description?: string;
  bgColor?: string;
  externalLink?: {
    href: string;
    label: string;
  };
};

export type Crumb = { label: string; path?: string; disabled?: boolean };

export const heroMap: Record<string, HeroData & { breadcrumbs?: Crumb[] }> = {
  "/test-takers/hamza-meran-course": {
    title: "دورة مران همزة",
    description: "",
    bgColor: "#fff",

    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "المتقدمون للإختبار", disabled: true },
      { label: "الإستعداد للإختبار", disabled: true },
      {
        label: "دورة مران همزة",
        path: "/test-takers/hamza-meran-course",
        disabled: true,
      },
    ],
  },
  "/test-takers/hamza-meran-course/player": {
    title: "",
    bgColor: "#fff",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "المتقدمون للإختبار", disabled: true },
      { label: "الإستعداد للإختبار", disabled: true },
      { label: "دورة مران همزة", path: "/test-takers/hamza-meran-course" },
      {
        label: "مشاهدة الدروس",
        path: "/test-takers/hamza-meran-course/player",
        disabled: true,
      },
    ],
  },
  "/test-takers/test-mechanism": {
    title: "آلية الاختبار",
    description:
      'خيارات مرنة لأداء اختبار همزة فهو اختبار محوسب يوفر لك خيارات متعددة لأداء اختبار سواءً من خلال مراكزنا المعتمدة حضوريًا أو عن بُعد. نلتزم بتطبيق أعلى معايير الأمان والمصداقية، لضمان الحفاظ على ثقة المؤسسات الأكاديمية والمهنية التي تعتمد نتائج اختبار "همزة" في العالم العربي وخارجه',
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "المتقدمون للإختبار", disabled: true },
      { label: "الاستعداد للاختبار", disabled: true },
      {
        label: "آلية الاختبار",
        path: "/test-takers/test-mechanism",
        disabled: true,
      },
    ],
  },
  "/test-takers/preparation-resource": {
    title: "مصادر التحضير",
    description:
      "عزّز تجربتك وجهودك الدراسية، وادخل يوم الاختبار بثقة. نوفّر لك أسئلة عملية، ونماذج رسمية، ومواد تدريبية شاملة تساعدك على الاستعداد لاختبار همزة بكل كفاءة. يجتاز ملايين الأشخاص حول العالم هذا الاختبار كل عام — ويمكنك أن تكون أحدهم.",
    bgColor: "#FFF",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "المتقدمون للإختبار", disabled: true },
      { label: "الاستعداد للاختبار", disabled: true },
      {
        label: "مصادر التحضير",
        path: "/test-takers/preparation-resource",
        disabled: true,
      },
    ],
  },
  "/test-takers/discover-hamza-tests": {
    title: "اكتشف اختبارات همزة",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "المتقدمون للإختبار", disabled: true },
      { label: "الاستعداد للاختبار", disabled: true },
      {
        label: "اكتشف اختبارات همزة",
        path: "/test-takers/discover-hamza-tests",
        disabled: true,
      },
    ],
  },
};

// Function to fetch dynamic preparation resource hero data from Lifford
export async function getPreparationResourceHero(): Promise<
  HeroData & { breadcrumbs?: Crumb[] }
> {
  try {
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseURL}/api/test-takers/preparation-resource`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch preparation resource data");
    }

    const data = await response.json();

    return {
      title: data.header?.title || "مصادر التحضير",
      description: data.header?.description || "",
      bgColor: "#FFF",
      breadcrumbs: [
        { label: "الرئيسة", path: "/" },
        { label: "المتقدمون للإختبار", disabled: true },
        { label: "الاستعداد للاختبار", disabled: true },
        {
          label: data.header?.title || "مصادر التحضير",
          path: "/test-takers/preparation-resource",
          disabled: true,
        },
      ],
    };
  } catch (error) {
    console.error(
      "Error fetching preparation resource hero:",
      error
    );
    // Return static fallback data
    return {
      title: "مصادر التحضير",
      description:
        "عزّز تجربتك وجهودك الدراسية، وادخل يوم الاختبار بثقة. نوفّر لك أسئلة عملية، ونماذج رسمية، ومواد تدريبية شاملة تساعدك على الاستعداد لاختبار همزة بكل كفاءة. يجتاز ملايين الأشخاص حول العالم هذا الاختبار كل عام — ويمكنك أن تكون أحدهم.",
      bgColor: "#FFF",
      breadcrumbs: [
        { label: "الرئيسة", path: "/" },
        { label: "المتقدمون للإختبار", disabled: true },
        { label: "الاستعداد للاختبار", disabled: true },
        {
          label: "مصادر التحضير",
          path: "/test-takers/preparation-resource",
          disabled: true,
        },
      ],
    };
  }
}
