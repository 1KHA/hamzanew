export interface QuestionBreakdown {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  total: number;
}

export interface TestDuration {
  minutes: number;
  hours: string;
}

export interface TestCard {
  id: number;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  targetAudience: string;
  questions?: QuestionBreakdown;
  questionsText?: string;
  duration: TestDuration;
  registerLink: string;
  infoLink: string;
}

export const TESTS_DATA: TestCard[] = [
  {
    id: 1,
    icon: "glasses",
    iconAlt: "أيقونة نظارات - اختبار همزة العام",
    title: "اختبار همزة العام",
    description:
      "اختبار لقياس كفايات اللغة العربية للناطقين بغيرها للأغراض العامة.",
    targetAudience: "الناطقين بغير اللغة العربية",
    questions: {
      listening: 25,
      reading: 25,
      writing: 2,
      speaking: 5,
      total: 57,
    },
    duration: { minutes: 155, hours: "02:35" },
    registerLink: "/register/general",
    infoLink: "/types-of-tests/hamza-general-test",
  },
  {
    id: 2,
    icon: "star",
    iconAlt: "أيقونة نجمة - اختبار تحديد مستوى",
    title: "تحديد مستوى",
    description:
      "اختبار لتحديد مستوى الكفاية اللغوية العامة للناطقين بغير العربية، يُستخدم للالتحاق بالبرامج الأكاديمية",
    targetAudience:
      "الطلاب الناطقين بغير اللغة العربية الراغبون في تحديد مستواهم اللغوي لأغراض عامة",
    questions: {
      listening: 20,
      reading: 20,
      writing: 20,
      speaking: 20,
      total: 80,
    },
    duration: { minutes: 90, hours: "01:30" },
    registerLink: "/register/placement",
    infoLink: "/types-of-tests/hamza-placement-test",
  },
  {
    id: 3,
    icon: "book-02",
    iconAlt: "أيقونة كتاب - اختبار همزة المفردات",
    title: "همزة المفردات",
    description:
      "اختبار معياري لقياس مستويات المفردات العربية لدى الناطقين بغيرها",
    targetAudience: "الناطقين بغير اللغة العربية",
    questionsText:
      "يحتوي نموذج الاختبار على (150) فقرة، موزعة على خمسة مستويات من الصعوبة والشيوع.",
    duration: { minutes: 150, hours: "02:30" },
    registerLink: "/register/vocabulary",
    infoLink: "/types-of-tests/hamza-vocabulary-test",
  },
  {
    id: 4,
    icon: "mortarboard-01",
    iconAlt: "أيقونة قبعة تخرج - اختبار همزة الأكاديمي",
    title: "همزة الأكاديمي",
    description:
      "اختبار محوسب مُقنّن يقيس كفايات اللغة العربية للناطقين بغيرها للأغراض الأكاديمية.",
    targetAudience: "الناطقين بغير اللغة العربية",
    questions: {
      listening: 30,
      reading: 40,
      writing: 1,
      speaking: 4,
      total: 75,
    },
    duration: { minutes: 155, hours: "02:35" },
    registerLink: "/register/academic",
    infoLink: "/types-of-tests/hamza-academic-test",
  },
];
