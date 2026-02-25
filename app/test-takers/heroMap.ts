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
};
