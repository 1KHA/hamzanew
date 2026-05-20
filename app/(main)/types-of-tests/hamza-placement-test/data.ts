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
    description: "يقيــس قدرتــك علــى متابعـــة المحادثات والحــوارات اليومية.",
    questionCount: 20,
    questionUnit: "فقرة",
  },
  {
    id: 2,
    icon: "book-open-01",
    iconAlt: "أيقونة كتاب مفتوح - قسم استيعاب المقروء",
    title: "استيعاب المقروء",
    description: "اختبار فهمك للنصوص العامة والمتنوعة.",
    questionCount: 20,
    questionUnit: "فقرة",
  },
  {
    id: 3,
    icon: "pencil-edit-02",
    iconAlt: "أيقونة قلم - قسم الكتابة",
    title: "الكتابة",
    description: "تقييم معرفتك واستخدامك للكلمات بصحة ودقة.",
    questionCount: 20,
    questionUnit: "فقرة",
  },
  {
    id: 4,
    icon: "message-01",
    iconAlt: "أيقونة محادثة - قسم التحدث",
    title: "التحدث",
    description: "قياس معرفتك واستخدامك للتراكيب اللغوية بصحة ودقة.",
    questionCount: 20,
    questionUnit: "فقرة",
  },
];

export const TEST_INFO: InfoCard[] = [
  {
    icon: "time-02",
    iconAlt: "أيقونة ساعة - مدة الاختبار",
    title: "مدة الاختبار",
    description: "(90) دقيقة",
  },
  {
    icon: "right-to-left-list-bullet",
    iconAlt: "أيقونة قائمة - عدد الأسئلة",
    title: "عدد الأسئلة",
    description: "(80)",
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
