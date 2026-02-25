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
  "/test-takers/hamza-training-course": {
    title: "دورة مران همزة",
    description:"",
    bgColor: "#fff",


    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "المتقدمون للإختبار", disabled: true },
      { label: "الإستعداد للإختبار", disabled: true },
      {
        label: "دورة مران همزة",
        path: "/test-takers/hamza-training-course",
        disabled: true,
      },
    ],
  },
  "/test-takers/test-mechanism": {
    title: "آلية الاختبار",
    description:
      "خيارات مرنة لأداء اختبار همزة فهو اختبار محوسب يوفر لك خيارات متعددة لأداء اختبار سواءً من خلال مراكزنا المعتمدة حضوريًا أو عن بُعد. نلتزم بتطبيق أعلى معايير الأمان والمصداقية، لضمان الحفاظ على ثقة المؤسسات الأكاديمية والمهنية التي تعتمد نتائج اختبار \"همزة\" في العالم العربي وخارجه",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "المتقدمون للإختبار", disabled: true },
      { label: "الاستعداد للاختبار", disabled: true },
      {
        label: "آلية الاختبار",
        path: "/test-takers/test-mechanism",
        disabled: true,
      },
    ],
  },
};
