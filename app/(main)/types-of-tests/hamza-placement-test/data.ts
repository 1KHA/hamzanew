import { st } from "@/app/_lib/static-text-server";

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

export function getQuestionTypes(locale?: "ar" | "en"): TestSection[] {
  return [
    {
      id: 1,
      icon: "headphones",
      iconAlt: st("placementTest", "sectionListeningTitle", locale),
      title: st("placementTest", "sectionListeningTitle", locale),
      description: st("placementTest", "sectionListeningDesc", locale),
      questionCount: 20,
      questionUnit: "",
    },
    {
      id: 2,
      icon: "book-open-01",
      iconAlt: st("placementTest", "sectionReadingTitle", locale),
      title: st("placementTest", "sectionReadingTitle", locale),
      description: st("placementTest", "sectionReadingDesc", locale),
      questionCount: 20,
      questionUnit: "",
    },
    {
      id: 3,
      icon: "pencil-edit-02",
      iconAlt: st("placementTest", "sectionWritingTitle", locale),
      title: st("placementTest", "sectionWritingTitle", locale),
      description: st("placementTest", "sectionWritingDesc", locale),
      questionCount: 20,
      questionUnit: "",
    },
    {
      id: 4,
      icon: "message-01",
      iconAlt: st("placementTest", "sectionSpeakingTitle", locale),
      title: st("placementTest", "sectionSpeakingTitle", locale),
      description: st("placementTest", "sectionSpeakingDesc", locale),
      questionCount: 20,
      questionUnit: "",
    },
  ];
}

/** @deprecated Use getQuestionTypes(locale) for bilingual support */
export const QUESTION_TYPES: TestSection[] = getQuestionTypes();

export function getTestInfo(locale?: "ar" | "en"): InfoCard[] {
  return [
    {
      icon: "time-02",
      iconAlt: st("placementTest", "infoDurationTitle", locale),
      title: st("placementTest", "infoDurationTitle", locale),
      description: st("placementTest", "infoDurationDesc", locale),
    },
    {
      icon: "right-to-left-list-bullet",
      iconAlt: st("placementTest", "infoQuestionsTitle", locale),
      title: st("placementTest", "infoQuestionsTitle", locale),
      description: st("placementTest", "infoQuestionsDesc", locale),
    },
    {
      icon: "cursor-in-window",
      iconAlt: st("placementTest", "infoRemoteTitle", locale),
      title: st("placementTest", "infoRemoteTitle", locale),
      description: st("placementTest", "infoRemoteDesc", locale),
    },
    {
      icon: "building-06",
      iconAlt: st("placementTest", "infoCentersTitle", locale),
      title: st("placementTest", "infoCentersTitle", locale),
      description: st("placementTest", "infoCentersDesc", locale),
    },
  ];
}

/** @deprecated Use getTestInfo(locale) for bilingual support */
export const TEST_INFO: InfoCard[] = getTestInfo();
