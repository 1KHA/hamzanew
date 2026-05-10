/**
 * Static Bilingual Text Dictionary
 *
 * Holds AR / EN pairs for hardcoded UI text that does not come from the
 * Liferay translation API. Client components can import `st()` and use it
 * directly — no props drilling required.
 *
 * Usage:
 *   import { st } from "@/app/_lib/static-text";
 *   <button>{st("banner", "buttonMore")}</button>
 */

/* ------------------------------------------------------------------
   Dictionary
   ------------------------------------------------------------------ */

export const STATIC_TEXT: Record<string, Record<string, { ar: string; en: string }>> = {
  banner: {
    buttonMore: { ar: "المزيد", en: "More" },
    slideTitle: { ar: "اختبارات همزة", en: "Hamza Tests" },
    slideAlt: { ar: "اختبارات همزة", en: "Hamza Tests" },
    ariaBanner: { ar: "عرض شرائح البانر", en: "Banner slideshow" },
    ariaPlay: { ar: "تشغيل العرض التلقائي", en: "Play auto slideshow" },
    ariaPause: { ar: "إيقاف العرض التلقائي", en: "Pause auto slideshow" },
    ariaGoToSlide: { ar: "الانتقال إلى الشريحة", en: "Go to slide" },
    slideDescription: {
      ar: "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
      en: "Hamza Test Platform is one of the technical tools supporting the King Salman Global Academy for Arabic Language initiative in building and activating standard Arabic language tests. The platform aims to introduce and implement Hamza tests, and provides qualitative data and indicators to support specialists, researchers, and related entities.",
    },
  },
  services: {
    sectionAria: { ar: "اختبارات همزة", en: "Hamza Tests" },
    heading: { ar: "تعرف على اختبارات همزة", en: "Discover Hamza Tests" },
    description: {
      ar: "نوفر خدمات إلكترونية للتسجيل في الاختبارات، مع تقديم معلومات واضحة ومبسطة عن كل اختبار",
      en: "We provide electronic services for test registration, with clear and simplified information about each test.",
    },
    carouselAria: { ar: "عرض الاختبارات المتاحة", en: "Available tests display" },
    register: { ar: "التسجيل للاختبار", en: "Register for the test" },
    more: { ar: "المزيد", en: "More" },
    generalTestTitle: { ar: "اختبار همزة العام", en: "Hamza General Test" },
    generalTestDesc: {
      ar: "اختبار محوسب، دقيق، يقيس كفايات اللغة العربية للناطقين بغيرها لأغراض أكاديمية.",
      en: "A computer-based, accurate test that measures Arabic language proficiency for non-native speakers for academic purposes.",
    },
    academicTestTitle: { ar: "اختبار همزة الأكاديمي", en: "Hamza Academic Test" },
    academicTestDesc: {
      ar: "اختبار لقياس كفايات اللغة العربية للناطقين بغيرها لأغراض عامة.",
      en: "A test to measure Arabic language proficiency for non-native speakers for general purposes.",
    },
    placementTestTitle: { ar: "اختبار تحديد المستوى", en: "Placement Test" },
    placementTestDesc: {
      ar: "اختبار لتحديد مستوى الكفاءة اللغوية العامة باللغة العربية لغير الناطقين بها لاستخدامه في البرامج الأكاديمية.",
      en: "A test to determine the general language proficiency level in Arabic for non-native speakers for use in academic programs.",
    },
    vocabularyTestTitle: { ar: "اختبار همزة المفردات", en: "Hamza Vocabulary Test" },
    vocabularyTestDesc: {
      ar: "اختبار معياري لقياس مستويات المفردات لدى الناطقين بغير العربية لأغراض مختلفة.",
      en: "A standardized test to measure vocabulary levels among non-Arabic speakers for various purposes.",
    },
  },
};

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

function getLocale(): "ar" | "en" {
  if (typeof document === "undefined") return "ar"; // SSR safe default
  const lang = document.documentElement.lang;
  if (lang?.startsWith("en")) return "en";
  return "ar";
}

/**
 * Static text lookup.
 *
 * @param scope  - Top-level category in STATIC_TEXT (e.g. "banner")
 * @param key    - Key inside that scope (e.g. "buttonMore")
 * @param locale - Optional locale override ("ar" | "en"). If omitted, reads from the DOM.
 * @returns The Arabic or English string, or the key itself if not found.
 */
export function st(scope: string, key: string, locale?: "ar" | "en"): string {
  const activeLocale = locale || getLocale();
  const scopeDict = STATIC_TEXT[scope];
  if (!scopeDict) return key;
  const entry = scopeDict[key];
  if (!entry) return key;
  return entry[activeLocale] || entry.ar || key;
}
