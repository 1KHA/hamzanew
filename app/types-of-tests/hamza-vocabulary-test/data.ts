export interface InfoCard {
  icon: string;
  title: string;
  description: string;
}

export const TEST_INFO: InfoCard[] = [
  {
    icon: "chart-column",
    title: "المستويات",
    description: "(5) مستويات",
  },
  {
    icon: "right-to-left-list-bullet",
    title: "عدد فقرات الاختبار",
    description: "(150) فقرة",
  },
  {
    icon: "time-02",
    title: "مدة الاختبار",
    description: "(150) دقيقة",
  },
];
