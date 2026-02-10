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
  "/research-library": {
    title: "مكتبة الأبحاث",
    description:"يمكنك هنا العثور على مجموعة من أحدث الأبحاث التي أجراها شركاء اختبار همزة وأكاديميون مدعومون من اختبار همزة من مختلف أنحاء العالم. ، يُمَوِّل اختبار همزة الأبحاث في ثلاثة مجالات رئيسية تتعلق بتعلم وتقييم اللغة العربية",
    bgColor: "#ffffff",
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "الأبحاث", disabled: true },
      { label: "مكتبة الأبحاث", disabled: true },
    ],
  },
};
