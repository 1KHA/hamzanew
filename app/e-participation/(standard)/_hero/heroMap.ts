export type HeroData = {
  title: string;
  description?: string;
  bgColor?: string; // e.g. "#F7FDF9"

};

export type Crumb = { label: string; path?: string; disabled?: boolean };

export const heroMap: Record<string, HeroData & { breadcrumbs?: Crumb[] }> = {
  "/e-participation": {
    title: "المشاركة الإلكترونية",
    description: "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة.",
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
      { label: "عن الجهة", path: "/about" },
      { label: "المشاركة الإلكترونية", disabled: true },
    ],
  },
  "/e-participation/policy": {
    title: "سياسة المشاركة الإلكترونية",
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
      { label: "عن الجهة", disabled: true },
        { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label: "سياسة المشاركة الإلكترونية", disabled: true },
    ],
  },
  "/e-participation/consultations": {
    title: "الإستشارات الإلكترونية",
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
      { label: "عن الجهة", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label: "الإستشارات الإلكتروني", disabled: true },
    ],
  },
  "/e-participation/co-creation": {
    title: "التطوير المشترك والافكار",
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
      { label: "عن الجهة", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "التطوير المشترك والافكار", disabled: true },
    ],
  },
  "/e-participation/open-data": {
    title: "البيانات المفتوحة",
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
      { label: "عن الجهة", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "البيانات المفتوحة", disabled: true },
    ],
  },
  "/e-participation/socail-media": {
    title: "وسائل التواصل الاجتماعي",
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
      { label: "عن الجهة", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "وسائل التواصل الاجتماعي", disabled: true },
    ],
  },
  "/e-participation/voice-reports": {
    title: "تقارير صوت المستفيد",
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
      { label: "عن الجهة", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "تقارير صوت المستفيد", disabled: true }, 
    ],
  },
  "/e-participation/services-statistics": {
    title: "إحصائيات أداء البوابة والخدمات",
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسية", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
      { label: "عن الجهة", disabled: true },
      { label: "المشاركة الإلكترونية", path: "/e-participation" },
      { label:  "إحصائيات أداء البوابة والخدمات", disabled: true }
    ],
  },

};
