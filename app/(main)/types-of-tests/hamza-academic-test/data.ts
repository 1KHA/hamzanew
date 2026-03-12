export interface TestSection {
  id: number;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  questionCount: number;
  questionUnit: string;
}

export interface InfoCard {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
}

export const QUESTION_TYPES: TestSection[] = [
  {
    id: 1,
    icon: "headphones",
    iconAlt: "أيقونة سماعات - قسم الفهم المسموع",
    title: "الفهم المسموع",
    description:
      "الاستماع إلى مقاطع صوتية عامة ومتنوعة، والإجابة عن أسئلة (الاختيار من متعدد) - (30) فقرة.",
    questionCount: 30,
    questionUnit: "فقرة",
  },
  {
    id: 2,
    icon: "book-open-01",
    iconAlt: "أيقونة كتاب مفتوح - قسم استيعاب المقروء",
    title: "استيعاب المقروء",
    description:
      "قراءة نصوص عامة ومتنوعة، والإجابة عن أسئلة (الاختيار من متعدد) - (40) فقرة.",
    questionCount: 40,
    questionUnit: "فقرة",
  },
  {
    id: 3,
    icon: "pencil-edit-02",
    iconAlt: "أيقونة قلم - قسم الكتابة",
    title: "الكتابة",
    description:
      "كتابة مقال واحد في موضوع عام تتراوح عدد كلماته من (200) إلى (250) كلمة - فقرة واحدة.",
    questionCount: 1,
    questionUnit: "فقرة",
  },
  {
    id: 4,
    icon: "message-01",
    iconAlt: "أيقونة محادثة - قسم التحدث",
    title: "التحدث",
    description: "الإجابة عن أسئلة عامة، والتحدُّث عن موضوع عام - (4) فقرات.",
    questionCount: 4,
    questionUnit: "فقرات",
  },
];

export const TEST_INFO: InfoCard[] = [
  {
    icon: "time-02",
    iconAlt: "أيقونة ساعة - مدة الاختبار",
    title: "مدة الاختبار",
    description: "(155) دقيقة",
  },
  {
    icon: "right-to-left-list-bullet",
    iconAlt: "أيقونة قائمة - عدد فقرات الاختبار",
    title: "عدد فقرات الاختبار",
    description: "(75) فقرة",
  },
  {
    icon: "cursor-in-window",
    iconAlt: "أيقونة شاشة - تطبيق الاختبار عن بُعد",
    title: "يطبق الاختبار",
    description: "عن بُعد",
  },
  {
    icon: "building-06",
    iconAlt: "أيقونة مبنى - تطبيق الاختبار في مراكز الاختبار",
    title: "يطبق الاختبار",
    description: "في مراكز الاختبار",
  },
];
