export interface TestSection {
  id: number;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  questionCount: number | string;
  questionUnit?: string;
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
    description: "قياس قدرتك على متابعة المحادثات والحوارات اليومية.",
    questionCount: "25",
  },
  {
    id: 2,
    icon: "book-open-01",
    iconAlt: "أيقونة كتاب مفتوح - قسم استيعاب المقروء",
    title: "استيعاب المقروء",
    description: "اختبار فهمك للنصوص العامة والمتنوعة.",
    questionCount: "25",
  },
  {
    id: 3,
    icon: "pencil-edit-02",
    iconAlt: "أيقونة قلم - قسم الكتابة",
    title: "الكتابة",
    description: "تقييم قدرتك على التعبير بلغة دقيقة ومنظمة في موضوعات عامة.",
    questionCount: "2",
  },
  {
    id: 4,
    icon: "message-01",
    iconAlt: "أيقونة محادثة - قسم التحدث",
    title: "التحدث",
    description: "قياس دقة لغتك وطلاقتك في استخدام اللغة في المحادثات العامة.",
    questionCount: "5",
  },
];

export const TEST_INFO: InfoCard[] = [
  {
    icon: "time-02",
    iconAlt: "أيقونة ساعة - مدة الاختبار",
    title: "مدة الاختبار",
    description: "(170) دقيقة",
  },
  {
    icon: "right-to-left-list-bullet",
    iconAlt: "أيقونة قائمة - عدد فقرات الاختبار",
    title: "عدد فقرات الاختبار",
    description: "(95) سؤال",
  },
  {
    icon: "cursor-in-window",
    iconAlt: "أيقونة شاشة - تطبيق الاختبار عن بُعد",
    title: "تطبيق الاختبار",
    description: "حضوري و عن بُعد",
  },
  {
    icon: "building-06",
    iconAlt: "أيقونة مبنى - تطبيق الاختبار في مراكز الاختبار",
    title: "تطبيق الاختبار",
    description: " في مراكز الاختبار المعتمدة  ",
  },
];
