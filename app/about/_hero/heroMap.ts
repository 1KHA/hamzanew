export type HeroData = {
  title: string;
  description?: string;
  bgColor?: string; // e.g. "#F7FDF9"
  externalLink?: {
    href: string;
    label: string;
  };
};

export type Crumb = { label: string; path?: string; disabled?: boolean };

export const heroMap: Record<string, HeroData & { breadcrumbs?: Crumb[] }> = {
  "/about": {
    title: "عن همزة",
    description: `منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها.
وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة.`,
    bgColor: "#F7FDF9",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", disabled: true },
    ],
  },

  "/about/who-we-are": {
    title: "من نحن",
    description: `منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها.
وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة.`,
    bgColor: "#FFF",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", path: "/about" },
      { label: "من نحن ", path: "/about/who-we-are", disabled: true },
    ],
  },

  "/about/periodic-advisory-committee": {
    title: "اللجنة الاستشارية الدورية",
    description: `تهدف اللجنة استشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية.`,
    bgColor: "#F9FAFB",
    // externalLink: {
    //   href: "",
    //   label: "",
    // },
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", path: "/about" },
      {
        label: "اللجنة الاستشارية الدورية",
        path: "/about/periodic-advisory-committee",
        disabled: true,
      },
    ],
  },

  "/about/hamza-test-traits": {
    title: "سمات إختبار همزة",
    description:
      "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.",
    bgColor: "#F9FAFB",
    externalLink: {
      href: "#",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", path: "/about" },
      {
        label: "سمات إختبار همزة",
        path: "/about/hamza-test-traits",
        disabled: true,
      },
    ],
  },
  "/about/benefits-of-hamza-test": {
    title: "أهمية اختبارات همزة",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", path: "/about" },
      {
        label: "أهمية اختبارات همزة",
        path: "/about/benefits-of-hamza-test",
        disabled: true,
      },
    ],
  },
  "/about/institutions-and-countries-that-accept-the-hamza": {
    title: "المؤسسات و الدول التي تقبل همزة",
    description:
      "تعتمد بعض المؤسسات حول العالم على اختبار همزة لتقييم الكفاءة في اللغة العربية تشمل هذه المؤسسات: الجامعات، الجهات الحكومية، الهيئات المهنية، شركات التوظيف، وجهات الهجرة في الدول الناطقة بالعربية أو المهتمة بها.",
    bgColor: "#FFF",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", path: "/about" },
      {
        label: "المؤسسات و الدول التي تقبل همزة",
        path: "/about/institutions-and-countries-that-accept-the-hamza",
        disabled: true,
      },
    ],
  },
  "/about/hamza-ambassadors": {
    title: "سفراء همزة",
    description:
      "تهدف اللجنة استشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية لمختلف الفئات.",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "عن همزة", path: "/about" },
      {
        label: "سفراء همزة",
        path: "/about/hamza-ambassadors",
        disabled: true,
      },
    ],
  },
};
