import { st } from "@/app/_lib/static-text-server";

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

export function getQuestionTypes(locale?: "ar" | "en"): TestSection[] {
  return [
    {
      id: 1,
      icon: "headphones",
      iconAlt: st("generalTest", "sectionListeningTitle", locale),
      title: st("generalTest", "sectionListeningTitle", locale),
      description: st("generalTest", "sectionListeningDesc", locale),
      questionCount: "25",
    },
    {
      id: 2,
      icon: "book-open-01",
      iconAlt: st("generalTest", "sectionReadingTitle", locale),
      title: st("generalTest", "sectionReadingTitle", locale),
      description: st("generalTest", "sectionReadingDesc", locale),
      questionCount: "25",
    },
    {
      id: 3,
      icon: "pencil-edit-02",
      iconAlt: st("generalTest", "sectionWritingTitle", locale),
      title: st("generalTest", "sectionWritingTitle", locale),
      description: st("generalTest", "sectionWritingDesc", locale),
      questionCount: "2",
    },
    {
      id: 4,
      icon: "message-01",
      iconAlt: st("generalTest", "sectionSpeakingTitle", locale),
      title: st("generalTest", "sectionSpeakingTitle", locale),
      description: st("generalTest", "sectionSpeakingDesc", locale),
      questionCount: "5",
    },
  ];
}

/** @deprecated Use getQuestionTypes(locale) for bilingual support */
export const QUESTION_TYPES: TestSection[] = getQuestionTypes();

export function getTestInfo(locale?: "ar" | "en"): InfoCard[] {
  return [
    {
      icon: "time-02",
      iconAlt: st("generalTest", "infoDurationTitle", locale),
      title: st("generalTest", "infoDurationTitle", locale),
      description: st("generalTest", "infoDurationDesc", locale),
    },
    {
      icon: "right-to-left-list-bullet",
      iconAlt: st("generalTest", "infoQuestionsTitle", locale),
      title: st("generalTest", "infoQuestionsTitle", locale),
      description: st("generalTest", "infoQuestionsDesc", locale),
    },
    {
      icon: "cursor-in-window",
      iconAlt: st("generalTest", "infoRemoteTitle", locale),
      title: st("generalTest", "infoRemoteTitle", locale),
      description: st("generalTest", "infoRemoteDesc", locale),
    },
    {
      icon: "building-06",
      iconAlt: st("generalTest", "infoCentersTitle", locale),
      title: st("generalTest", "infoCentersTitle", locale),
      description: st("generalTest", "infoCentersDesc", locale),
    },
  ];
}

/** @deprecated Use getTestInfo(locale) for bilingual support */
export const TEST_INFO: InfoCard[] = getTestInfo();
