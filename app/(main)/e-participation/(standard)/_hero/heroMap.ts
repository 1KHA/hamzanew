export type HeroData = {
  title: string;
  description?: string;
  bgColor?: string; // e.g. "#F7FDF9"

};

export type Crumb = { label: string; path?: string; disabled?: boolean };

export const heroMap: Record<string, HeroData & { breadcrumbs?: Crumb[] }> = {
  "/e-participation": {
    title: "المشاركة الإلكترونية",
    description: "about.heroAboutDescription",
    bgColor: "#F7FDF9",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
       { label: "hamza-page-level-nav-who-are-we", path: "/about" },
      { label: "المشاركة الإلكترونية", disabled: true },
    ],
  },
  "/e-participation/policy": {
    title: "سياسة المشاركة الإلكترونية",
    bgColor: "#F7FDF9",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-page-level-nav-who-are-we", disabled: true  },
        { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label: "سياسة المشاركة الإلكترونية", disabled: true },
    ],
  },
  "/e-participation/consultations": {
    title: "الإستشارات الإلكترونية",
    bgColor: "#F7FDF9",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-page-level-nav-who-are-we",disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label: "الإستشارات الإلكتروني", disabled: true },
    ],
  },
  "/e-participation/co-creation": {
    title: "التطوير المشترك والافكار",
    bgColor: "#F7FDF9",

    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-page-level-nav-who-are-we", disabled: true  },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "التطوير المشترك والافكار", disabled: true },
    ],
  },
  "/e-participation/open-data": {
    title: "البيانات المفتوحة",
    bgColor: "#F7FDF9",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "البيانات المفتوحة", disabled: true },
    ],
  },
  "/e-participation/socail-media": {
    title: "وسائل التواصل الاجتماعي",
    bgColor: "#F7FDF9",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "وسائل التواصل الاجتماعي", disabled: true },
    ],
  },
  "/e-participation/voice-reports": {
    title: "تقارير صوت المستفيد",
    bgColor: "#F7FDF9",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "تقارير صوت المستفيد", disabled: true }, 
    ],
  },
  "/e-participation/services-statistics": {
    title: "إحصائيات أداء البوابة والخدمات",
    bgColor: "#F7FDF9",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "إحصائيات أداء البوابة والخدمات", disabled: true }
    ],
  },

};
