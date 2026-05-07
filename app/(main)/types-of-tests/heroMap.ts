import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";

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
  "/types-of-tests": {
    title: "hamza-navigation-menu-types-of-tests",
    bgColor: "#FFF",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-navigation-menu-types-of-tests", disabled: true },
    ],
  },

  "/types-of-tests/hamza-general-test": {
    title: "hamza-navigation-menu-the-hamza-of-the-year",
    description:
      "يُعد اختبار همزة العام أداة موثوقة لقياس كفاءة اللغة العربية للناطقين بغيرها للأغراض العامة.",
    bgColor: "#FFF",
    externalLink: {
      href: "/sign-up",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-navigation-menu-types-of-tests", path: "/types-of-tests" },
      {
        label: "hamza-navigation-menu-the-hamza-of-the-year",
        path: "/types-of-tests/hamza-general-test",
        disabled: true,
      },
    ],
  },

  "/types-of-tests/hamza-placement-test": {
    title: "hamza-navigation-menu-hamza-to-determine-the-level",
    description:
      "صُمم الاختبار ليقيس معرفة المتعلم باللغة العربية من خلال أربعة أقسام رئيسية: الاستماع، القراءة، المفردات، والقواعد، وذلك بهدف اختيار المستوى المناسب للمختبر عند التحاقه بالبرنامج المستهدف.",
    bgColor: "#FFF",
    externalLink: {
      href: "/sign-up",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-navigation-menu-types-of-tests", path: "/types-of-tests" },
      {
        label: "hamza-navigation-menu-hamza-to-determine-the-level",
        path: "/types-of-tests/hamza-placement-test",
        disabled: true,
      },
    ],
  },

  "/types-of-tests/hamza-vocabulary-test": {
    title: "hamza-navigation-menu-hamza-for-vocabulary",
    description:
      "اختباراً معيارياً لقياس مستويات المفردات العربية لدى الناطقين بغيرها يهدف إلى تصنيف المفردات ضمن خمسة مستويات من الشيوع (الصعوبة)، بدءاً من الكلمات الأكثر شيوعاً (المستوى الأول) وصولاً إلى الكلمات الأقل شيوعاً (المستوى الخامس). تم تطوير هذا الاختبار من خلال سلسلة من الإجراءات التي تحقق الصدق والدقة، بما في ذلك مراجعة وتدقيق خبراء متخصصين في اللغويات التطبيقية، ممن يتحدثون اللغة العربية كلغة أصلية. كما خضع الاختبار لاختبارات تأكيد صحة القياس لضمان التدرج في الصعوبة بين المستويات من الأول إلى الخامس. تكمن أهمية اختبار همزة للمفردات في أنه يساعد على تشخيص المستوى اللغوي للمتعلمين في المرحلة الأولى من اكتساب اللغة، وهي المفردات، التي تُعد عنصراً أساسياً في تحديد مستوى النجاح اللغوي للمتعلمين بشكل عام في جميع مكونات اللغة.",
    bgColor: "#FFF",
    externalLink: {
      href: "/sign-up",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-navigation-menu-types-of-tests", path: "/types-of-tests" },
      {
        label: "hamza-navigation-menu-hamza-for-vocabulary",
        path: "/types-of-tests/hamza-vocabulary-test",
        disabled: true,
      },
    ],
  },
  "/types-of-tests/hamza-academic-test": {
    title: "hamza-page-organizations-academic-hamza",
    description:
      "اختبار همزة الأكاديمي يمنحك فرصة لبدء مستقبلك الدراسي والمهني بخطوة واثقة ومستوى معتمد من الكفاءة اللغوية نبذه عن اختبار همزة الأكاديمي",
    bgColor: "#FFF",
    externalLink: {
      href: "/sign-up",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-page-level-nav-who-are-we", disabled: true },
      { label: "hamza-navigation-menu-types-of-tests", path: "/types-of-tests" },
      {
        label: "hamza-page-organizations-academic-hamza",
        path: "/types-of-tests/hamza-academic-test",
        disabled: true,
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// Helper: extract header-shaped hero data from a content key
// ---------------------------------------------------------------------------
async function fetchHeroFromKey(
  key: string,
  label: string,
  fallbackTitle: string,
  fallbackDescription: string,
  fallbackBreadcrumbs: Crumb[]
): Promise<HeroData & { breadcrumbs?: Crumb[] }> {
  try {
    console.log(`[${label}] Fetching hero from Liferay...`);
    const content = await fetchContentWithKey(key);

    const fields = extractFields(content?.contentFields, [
      "titleText",
      "descriptionText",
      "buttonText",
    ]) as {
      titleText?: string;
      descriptionText?: string;
      buttonText?: string;
    };

    const title = fields?.titleText || content?.title || fallbackTitle;
    console.log(`[${label}] SUCCESS — title: "${title}"`);

    return {
      title,
      description: fields?.descriptionText || fallbackDescription,
      bgColor: "#FFF",
      externalLink: {
        href: "/sign-up",
        label: fields?.buttonText || "hamza-header-icons-bar-book-test",
      },
      breadcrumbs: fallbackBreadcrumbs.map((crumb) =>
        crumb.disabled ? crumb : { ...crumb, label: title }
      ),
    };
  } catch (error) {
    console.error(`[${label}] FAILED —`, error, "Using FALLBACK.");
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      bgColor: "#FFF",
      externalLink: {
        href: "/sign-up",
        label: "hamza-header-icons-bar-book-test",
      },
      breadcrumbs: fallbackBreadcrumbs,
    };
  }
}

// ---------------------------------------------------------------------------
// Dynamic hero fetchers
// ---------------------------------------------------------------------------

export async function getTypesOfTestsHero(): Promise<
  HeroData & { breadcrumbs?: Crumb[] }
> {
  return fetchHeroFromKey(
    "HAMZA_HOMEPAGE_TYPES_OF_TESTS_COMPARE_HAMZA_TESTS_CONTENT_KEY",
    "TypesOfTestsHero",
    "أنواع اختبارات همزة",
    "",
    [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", disabled: true },
    ]
  );
}

export async function getHamzaAcademicTestHero(): Promise<
  HeroData & { breadcrumbs?: Crumb[] }
> {
  return fetchHeroFromKey(
    "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_ACADEMIC_TEST_HEADER_CONTENT_KEY",
    "AcademicTestHero",
    "اختبار همزة الأكاديمي",
    "اختبار همزة الأكاديمي يمنحك فرصة لبدء مستقبلك الدراسي والمهني بخطوة واثقة ومستوى معتمد من الكفاءة اللغوية نبذه عن اختبار همزة الأكاديمي",
    [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
      { label: "اختبار همزة الأكاديمي", disabled: true },
    ]
  );
}

export async function getHamzaGeneralTestHero(): Promise<
  HeroData & { breadcrumbs?: Crumb[] }
> {
  return fetchHeroFromKey(
    "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_GENERAL_TEST_HEADER_CONTENT_KEY",
    "GeneralTestHero",
    "اختبار همزة العام",
    "يُعد اختبار همزة العام أداة موثوقة لقياس كفاءة اللغة العربية للناطقين بغيرها للأغراض العامة.",
    [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
      { label: "اختبار همزة العام", disabled: true },
    ]
  );
}

export async function getHamzaPlacementTestHero(): Promise<
  HeroData & { breadcrumbs?: Crumb[] }
> {
  return fetchHeroFromKey(
    "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_PLACEMENT_TEST_HEADER_CONTENT_KEY",
    "PlacementTestHero",
    "اختبار همزة لتحديد المستوى",
    "صُمم الاختبار ليقيس معرفة المتعلم باللغة العربية من خلال أربعة أقسام رئيسية: الاستماع، القراءة، المفردات، والقواعد، وذلك بهدف اختيار المستوى المناسب للمختبر عند التحاقه بالبرنامج المستهدف.",
    [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
      { label: "اختبار همزة لتحديد المستوى", disabled: true },
    ]
  );
}

export async function getHamzaVocabularyTestHero(): Promise<
  HeroData & { breadcrumbs?: Crumb[] }
> {
  return fetchHeroFromKey(
    "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_VOCABULARY_TEST_HEADER_CONTENT_KEY",
    "VocabularyTestHero",
    "اختبار همزة المفردات",
    "اختباراً معيارياً لقياس مستويات المفردات العربية لدى الناطقين بغيرها يهدف إلى تصنيف المفردات ضمن خمسة مستويات من الشيوع (الصعوبة)، بدءاً من الكلمات الأكثر شيوعاً (المستوى الأول) وصولاً إلى الكلمات الأقل شيوعاً (المستوى الخامس).",
    [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
      { label: "اختبار همزة المفردات", disabled: true },
    ]
  );
}
