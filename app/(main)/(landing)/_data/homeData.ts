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

import { st } from "@/app/_lib/static-text";

export function getServices(locale?: "ar" | "en"): Service[] {
  return [
    {
      title: st("services", "generalTestTitle", locale),
      description: st("services", "generalTestDesc", locale),
      icon: "mortarboard-01",
      link: "/types-of-tests/hamza-general-test",
    },
    {
      title: st("services", "academicTestTitle", locale),
      description: st("services", "academicTestDesc", locale),
      icon: "glasses",
      link: "/types-of-tests/hamza-academic-test",
    },
    {
      title: st("services", "placementTestTitle", locale),
      description: st("services", "placementTestDesc", locale),
      icon: "star",
      link: "/types-of-tests/hamza-placement-test",
    },
    {
      title: st("services", "vocabularyTestTitle", locale),
      description: st("services", "vocabularyTestDesc", locale),
      icon: "book-01",
      link: "/types-of-tests/hamza-vocabulary-test",
    },
  ];
}

/** @deprecated Use getServices(locale) for bilingual support */
export const SERVICES: Service[] = getServices();

export function getPartners(locale?: "ar" | "en"): Partner[] {
  return [
    { id: 1, image: "/assets/image/institutions1.png", name: locale === "en" ? "Partner Institution 1" : "مؤسسة شريكة ١", location: "inside" },
    { id: 2, image: "/assets/image/institutions2.png", name: locale === "en" ? "Partner Institution 2" : "مؤسسة شريكة ٢", location: "inside" },
    { id: 3, image: "/assets/image/institutions3.png", name: locale === "en" ? "Partner Institution 3" : "مؤسسة شريكة ٣", location: "inside" },
    { id: 4, image: "/assets/image/institutions1.png", name: locale === "en" ? "Partner Institution 4" : "مؤسسة شريكة ٤", location: "inside" },
    { id: 5, image: "/assets/image/institutions2.png", name: locale === "en" ? "Partner Institution 5" : "مؤسسة شريكة ٥", location: "outside" },
    { id: 6, image: "/assets/image/institutions3.png", name: locale === "en" ? "Partner Institution 6" : "مؤسسة شريكة ٦", location: "outside" },
    { id: 7, image: "/assets/image/institutions1.png", name: locale === "en" ? "Partner Institution 7" : "مؤسسة شريكة ٧", location: "outside" },
  ];
}

/** @deprecated Use getPartners(locale) for bilingual support */
export const PARTNERS: Partner[] = getPartners();

export function getNewsArticles(locale?: "ar" | "en"): NewsArticle[] {
  if (locale === "en") {
    return [
      {
        id: 1,
        title: "Wide Interest in the Hamza Tests Platform in its First Phase",
        description:
          "The platform witnessed significant interaction from applicants seeking to measure Arabic language proficiency, with continuous updates to the user experience.",
        image: "/assets/image/photo2.jpg",
      },
      {
        id: 2,
        title: "Hamza Tests Provide Quality Indicators to Support Researchers and Decision Makers",
        description:
          "An indicators dashboard was launched displaying analytical results to help educational institutions improve their programs and develop their outcomes.",
        image: "/assets/image/photo1.jpg",
      },
      {
        id: 3,
        title: "Hamza Tests Platform Launches First Pilot Version for Measuring Arabic Proficiency",
        description:
          "The pilot version includes multiple tracks and standard questions designed according to best practices to ensure measurement quality.",
        image: "/assets/image/photo4.jpg",
      },
      {
        id: 4,
        title: "Developing New Question Banks to Enhance Measurement Accuracy in Language Skills",
        description:
          "Work is underway to enrich the question bank and add diverse assessment models to measure comprehension, writing, and understanding.",
        image: "/assets/image/photo1.jpg",
      },
      {
        id: 5,
        title: "New Partnerships to Enhance Content Quality and Expand Test Coverage",
        description:
          "The platform seeks to collaborate with academic institutions and experts to develop content and build more specialized standards.",
        image: "/assets/image/photo1.jpg",
      },
      {
        id: 6,
        title: "Improving the Registration Experience and Enabling Access Across Different Devices",
        description:
          "The registration interface has been updated and performance improved to ensure a smooth experience on mobile and desktop with full RTL support.",
        image: "/assets/image/photo1.jpg",
      },
    ];
  }
  return [
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
}

/** @deprecated Use getNewsArticles(locale) for bilingual support */
export const NEWS_ARTICLES: NewsArticle[] = getNewsArticles();
