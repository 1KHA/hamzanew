import { st } from "@/app/_lib/static-text-server";

export interface InfoCard {
  icon: string;
  title: string;
  description: string;
}

export function getTestInfo(locale?: "ar" | "en"): InfoCard[] {
  return [
    {
      icon: "chart-column",
      title: st("vocabularyTest", "infoLevelsTitle", locale),
      description: st("vocabularyTest", "infoLevelsDesc", locale),
    },
    {
      icon: "right-to-left-list-bullet",
      title: st("vocabularyTest", "infoQuestionsTitle", locale),
      description: st("vocabularyTest", "infoQuestionsDesc", locale),
    },
    {
      icon: "time-02",
      title: st("vocabularyTest", "infoDurationTitle", locale),
      description: st("vocabularyTest", "infoDurationDesc", locale),
    },
  ];
}

/** @deprecated Use getTestInfo(locale) for bilingual support */
export const TEST_INFO: InfoCard[] = getTestInfo();
