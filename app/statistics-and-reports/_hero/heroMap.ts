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
  "/statistics-and-reports": {
    title: "تقارير واحصائيات",
    description:
      "نقدم تقارير واحصائيات موثوقة، قائمة على منهجيات علمية، تعكس بدقة نتائج اختبارات \"همزة\" ومؤشراتها. تدعم هذه البيانات الباحثين وصنّاع القرار في القطاعين الأكاديمي والرّسمي، وتُسهم في تطوير السياسات التعليمية، وإثراء الدراسات المقارنة، وبناء رؤى استراتيجية عالية لقياس كفاءة اللغة العربية.",
          bgColor: "#ffffff",

    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "الأبحاث", disabled: true },
      { label: "تقارير واحصائيات", disabled: true },
    ],
  },
};
