/**
 * Home Page Static Data
 */

export interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
}

export const BANNER_SLIDES: Slide[] = [
  {
    id: 1,
    image: "/assets/image/hero.jpg",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها.",
    cta: { label: "المزيد", href: "/about" },
  },
  {
    id: 2,
    image: "/assets/image/photo2.jpg",
    title: "اختبار همزة العام",
    description:
      "اختبار معياري لقياس كفايات اللغة العربية للناطقين بغيرها لأغراض عامة، يُمكِّن من تحديد مستوى الكفاءة اللغوية وفق معايير دولية معتمدة.",
    cta: { label: "اعرف أكثر", href: "/types-of-tests/hamza-general-test" },
  },
  {
    id: 3,
    image: "/assets/image/photo1.jpg",
    title: "اختبار همزة الأكاديمي",
    description:
      "اختبار محوسب دقيق يقيس كفايات اللغة العربية للناطقين بغيرها لأغراض أكاديمية، مصمم وفق أفضل الممارسات والمعايير الدولية.",
    cta: { label: "اعرف أكثر", href: "/types-of-tests/hamza-academic-test" },
  },
  {
    id: 4,
    image: "/assets/image/photo4.jpg",
    title: "مؤشرات نوعية للباحثين",
    description:
      "توفر منصة اختبارات همزة بيانات ومؤشرات نوعية تساعد الباحثين وصانعي القرار على تطوير برامجهم التعليمية وتحسين مخرجاتها.",
    cta: { label: "استعرض المؤشرات", href: "/statistics-and-reports" },
  },
];

export interface Service {
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export interface Partner {
  id: number;
  image: string;
  name: string;
  location: "inside" | "outside";
}

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    title: "اختبار همزة العام",
    description:
      "اختبار لقياس كفايات اللغة العربية للناطقين بغيرها لأغراض عامة.",
    icon: "glasses",
    link: "/types-of-tests/hamza-general-test",
  },
  {
    title: "اختبار همزة الأكاديمي",
    description:
      "اختبار محوسب، دقيق، يقيس كفايات اللغة العربية للناطقين بغيرها لأغراض أكاديمية.",
    icon: "mortarboard-01",
    link: "/types-of-tests/hamza-academic-test",
  },
  {
    title: "اختبار تحديد المستوى",
    description:
      "اختبار لتحديد مستوى الكفاءة اللغوية العامة باللغة العربية لغير الناطقين بها لاستخدامه في البرامج الأكاديمية.",
    icon: "star",
    link: "/types-of-tests/hamza-placement-test",
  },
  {
    title: "اختبار همزة المفردات",
    description:
      "اختبار معياري لقياس مستويات المفردات لدى الناطقين بغير العربية لأغراض مختلفة.",
    icon: "book-01",
    link: "/types-of-tests/hamza-vocabulary-test",
  },
];

export const PARTNERS: Partner[] = [
  { id: 1, image: "/assets/image/institutions1.png", name: "مؤسسة شريكة ١", location: "inside" },
  { id: 2, image: "/assets/image/institutions2.png", name: "مؤسسة شريكة ٢", location: "inside" },
  { id: 3, image: "/assets/image/institutions3.png", name: "مؤسسة شريكة ٣", location: "inside" },
  { id: 4, image: "/assets/image/institutions1.png", name: "مؤسسة شريكة ٤", location: "inside" },
  { id: 5, image: "/assets/image/institutions2.png", name: "مؤسسة شريكة ٥", location: "outside" },
  { id: 6, image: "/assets/image/institutions3.png", name: "مؤسسة شريكة ٦", location: "outside" },
  { id: 7, image: "/assets/image/institutions1.png", name: "مؤسسة شريكة ٧", location: "outside" },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "إقبال واسع على منصة اختبارات همزة في مرحلتها الأولى",
    description:
      "شهدت المنصة تفاعلاً كبيراً من المتقدمين لقياس كفايات اللغة العربية، مع تحديثات مستمرة على تجربة المستخدم.",
    image: "/assets/image/photo2.jpg",
  },
  {
    id: 2,
    title: "اختبارات همزة توفر مؤشرات نوعية لدعم الباحثين وصنّاع القرار",
    description:
      "تم إطلاق لوحة مؤشرات تعرض نتائج تحليلية تساعد الجهات التعليمية على تحسين برامجها وتطوير مخرجاتها.",
    image: "/assets/image/photo1.jpg",
  },
  {
    id: 3,
    title:
      "منصة اختبارات همزة تطلق النسخة التجريبية الأولى لقياس كفايات العربية",
    description:
      "تتضمن النسخة التجريبية مسارات متعددة وأسئلة معيارية مصممة وفق أفضل الممارسات لضمان جودة القياس.",
    image: "/assets/image/photo4.jpg",
  },
  {
    id: 4,
    title: "تطوير بنوك أسئلة جديدة لرفع دقة القياس في مهارات اللغة",
    description:
      "يتم العمل على إثراء بنك الأسئلة وإضافة نماذج تقييم متنوعة لقياس الفهم والكتابة والاستيعاب.",
    image: "/assets/image/photo1.jpg",
  },
  {
    id: 5,
    title: "شراكات جديدة لتعزيز جودة المحتوى وتوسيع نطاق الاختبارات",
    description:
      "تسعى المنصة إلى التعاون مع جهات أكاديمية وخبراء لتطوير المحتوى وبناء معايير أكثر تخصصاً.",
    image: "/assets/image/photo1.jpg",
  },
  {
    id: 6,
    title: "تحسين تجربة التسجيل وإتاحة الوصول عبر الأجهزة المختلفة",
    description:
      "تم تحديث واجهة التسجيل وتحسين الأداء لضمان تجربة سلسة على الهاتف والكمبيوتر مع دعم كامل للاتجاه RTL.",
    image: "/assets/image/photo1.jpg",
  },
];
