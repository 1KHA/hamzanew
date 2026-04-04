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
    title: "أنواع اختبارات همزة",
    bgColor: "#FFF",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label:"أنواع اختبارات همزة", disabled: true },
    ],
  },

  "/types-of-tests/hamza-general-test": {
    title: "اختبار همزة العام",
    description:
      "يُعد اختبار همزة العام أداة موثوقة لقياس كفاءة اللغة العربية للناطقين بغيرها للأغراض العامة.",
    bgColor: "#FFF",
    externalLink: {
      href: "/sign-up",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
      {
        label: "اختبار همزة العام",
        path: "/types-of-tests/hamza-general-test",
        disabled: true,
      },
    ],
  },

  "/types-of-tests/hamza-placement-test": {
    title: "اختبار همزة  لتحديد المستوى",
    description:
      "صُمم الاختبار ليقيس معرفة المتعلم باللغة العربية من خلال أربعة أقسام رئيسية: الاستماع، القراءة، المفردات، والقواعد، وذلك بهدف اختيار المستوى المناسب للمختبر عند التحاقه بالبرنامج المستهدف.",
    bgColor: "#FFF",
    externalLink: {
      href: "/sign-up",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
      {
        label: "اختبار همزة  لتحديد المستوى",
        path: "/types-of-tests/hamza-placement-test",
        disabled: true,
      },
    ],
  },

  "/types-of-tests/hamza-vocabulary-test": {
    title: "اختبار همزة المفردات",
    description:
      "اختباراً معيارياً لقياس مستويات المفردات العربية لدى الناطقين بغيرها يهدف إلى تصنيف المفردات ضمن خمسة مستويات من الشيوع (الصعوبة)، بدءاً من الكلمات الأكثر شيوعاً (المستوى الأول) وصولاً إلى الكلمات الأقل شيوعاً (المستوى الخامس). تم تطوير هذا الاختبار من خلال سلسلة من الإجراءات التي تحقق الصدق والدقة، بما في ذلك مراجعة وتدقيق خبراء متخصصين في اللغويات التطبيقية، ممن يتحدثون اللغة العربية كلغة أصلية. كما خضع الاختبار لاختبارات تأكيد صحة القياس لضمان التدرج في الصعوبة بين المستويات من الأول إلى الخامس. تكمن أهمية اختبار همزة للمفردات في أنه يساعد على تشخيص المستوى اللغوي للمتعلمين في المرحلة الأولى من اكتساب اللغة، وهي المفردات، التي تُعد عنصراً أساسياً في تحديد مستوى النجاح اللغوي للمتعلمين بشكل عام في جميع مكونات اللغة.",
    bgColor: "#FFF",
    externalLink: {
      href: "/sign-up",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
      {
        label: "اختبار همزة المفردات",
        path: "/types-of-tests/hamza-vocabulary-test",
        disabled: true,
      },
    ],
  },
  "/types-of-tests/hamza-academic-test": {
    title: "اختبار همزة الأكاديمي",
    description:
      "اختبار همزة الأكاديمي يمنحك فرصة لبدء مستقبلك الدراسي والمهني بخطوة واثقة ومستوى معتمد من الكفاءة اللغوية نبذه عن اختبار همزة الأكاديمي",
    bgColor: "#FFF",
    externalLink: {
      href: "/sign-up",
      label: "التسجيل في الاختبار",
    },
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "عن الجهة", disabled: true },
      { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
      {
        label: "اختبار همزة الأكاديمي",
        path: "/types-of-tests/hamza-academic-test",
        disabled: true,
      },
    ],
  },
};

// Function to fetch dynamic hamza academic test hero data
export async function getHamzaAcademicTestHero(): Promise<HeroData & { breadcrumbs?: Crumb[] }> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseURL}/api/hamza-academic-test`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch hamza academic test data');
    }
    
    const data = await response.json();
    
    return {
      title: data.header?.title || "اختبار همزة الأكاديمي",
      description: data.header?.descriptionText || "",
      bgColor: "#FFF",
      externalLink: {
        href: "/sign-up",
        label: data.header?.buttonText || "التسجيل في الاختبار",
      },
      breadcrumbs: [
        { label: "الرئيسة", path: "/" },
        { label: "عن الجهة", disabled: true },
        { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
        { label: data.header?.title || "اختبار همزة الأكاديمي", disabled: true },
      ],
    };
  } catch (error) {
    console.error('Error fetching hamza academic test hero:', error);
    // Return static fallback data
    return {
      title: "اختبار همزة الأكاديمي",
      description:
        "اختبار همزة الأكاديمي يمنحك فرصة لبدء مستقبلك الدراسي والمهني بخطوة واثقة ومستوى معتمد من الكفاءة اللغوية نبذه عن اختبار همزة الأكاديمي",
      bgColor: "#FFF",
      externalLink: {
        href: "/sign-up",
        label: "التسجيل في الاختبار",
      },
      breadcrumbs: [
        { label: "الرئيسة", path: "/" },
        { label: "عن الجهة", disabled: true },
        { label: "أنواع اختبارات همزة", path: "/types-of-tests" },
        { label: "اختبار همزة الأكاديمي", disabled: true },
      ],
    };
  }
}

// Function to fetch dynamic types of tests hero data
export async function getTypesOfTestsHero(): Promise<HeroData & { breadcrumbs?: Crumb[] }> {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseURL}/api/types-of-tests`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch types of tests data');
    }
    
    const data = await response.json();
    
    return {
      title: data.title || "أنواع اختبارات همزة",
      description: data.descriptionText || "",
      bgColor: "#FFF",
      breadcrumbs: [
        { label: "الرئيسة", path: "/" },
        { label: "عن الجهة", disabled: true },
        { label: data.title || "أنواع اختبارات همزة", disabled: true },
      ],
    };
  } catch (error) {
    console.error('Error fetching types of tests hero:', error);
    // Return static fallback data
    return {
      title: "أنواع اختبارات همزة",
      description: "",
      bgColor: "#FFF",
      breadcrumbs: [
        { label: "الرئيسة", path: "/" },
        { label: "عن الجهة", disabled: true },
        { label: "أنواع اختبارات همزة", disabled: true },
      ],
    };
  }
}
