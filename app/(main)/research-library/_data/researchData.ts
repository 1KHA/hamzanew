import { st } from "@/app/_lib/static-text-server";

export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  downloadUrl: string;
  description: string;
}

export function getResearchData(locale: "ar" | "en"): ResearchPaper[] {
  return [
    {
      id: "1",
      title: st("researchLibrary", "paper1Title", locale),
      author: st("researchLibrary", "paper1Author", locale),
      category: st("researchLibrary", "catTests", locale),
      publishDate: "2026-01-15",
      downloadUrl: "/papers/paper-1.pdf",
      description: st("researchLibrary", "paper1Desc", locale),
    },
    {
      id: "2",
      title: st("researchLibrary", "paper2Title", locale),
      author: st("researchLibrary", "paper2Author", locale),
      category: st("researchLibrary", "catTeaching", locale),
      publishDate: "2026-01-10",
      downloadUrl: "/papers/paper-2.pdf",
      description: st("researchLibrary", "paper2Desc", locale),
    },
    {
      id: "3",
      title: st("researchLibrary", "paper3Title", locale),
      author: st("researchLibrary", "paper3Author", locale),
      category: st("researchLibrary", "catTech", locale),
      publishDate: "2026-01-05",
      downloadUrl: "/papers/paper-3.pdf",
      description: st("researchLibrary", "paper3Desc", locale),
    },
    {
      id: "4",
      title: st("researchLibrary", "paper4Title", locale),
      author: st("researchLibrary", "paper4Author", locale),
      category: st("researchLibrary", "catTests", locale),
      publishDate: "2025-12-20",
      downloadUrl: "/papers/paper-4.pdf",
      description: st("researchLibrary", "paper4Desc", locale),
    },
    {
      id: "5",
      title: st("researchLibrary", "paper5Title", locale),
      author: st("researchLibrary", "paper5Author", locale),
      category: st("researchLibrary", "catTeaching", locale),
      publishDate: "2025-12-15",
      downloadUrl: "/papers/paper-5.pdf",
      description: st("researchLibrary", "paper5Desc", locale),
    },
    {
      id: "6",
      title: st("researchLibrary", "paper6Title", locale),
      author: st("researchLibrary", "paper6Author", locale),
      category: st("researchLibrary", "catTech", locale),
      publishDate: "2025-12-10",
      downloadUrl: "/papers/paper-6.pdf",
      description: st("researchLibrary", "paper6Desc", locale),
    },
    {
      id: "7",
      title: st("researchLibrary", "paper7Title", locale),
      author: st("researchLibrary", "paper7Author", locale),
      category: st("researchLibrary", "catTests", locale),
      publishDate: "2025-12-05",
      downloadUrl: "/papers/paper-7.pdf",
      description: st("researchLibrary", "paper7Desc", locale),
    },
    {
      id: "8",
      title: st("researchLibrary", "paper8Title", locale),
      author: st("researchLibrary", "paper8Author", locale),
      category: st("researchLibrary", "catTeaching", locale),
      publishDate: "2025-11-25",
      downloadUrl: "/papers/paper-8.pdf",
      description: st("researchLibrary", "paper8Desc", locale),
    },
    {
      id: "9",
      title: st("researchLibrary", "paper9Title", locale),
      author: st("researchLibrary", "paper9Author", locale),
      category: st("researchLibrary", "catTech", locale),
      publishDate: "2025-11-20",
      downloadUrl: "/papers/paper-9.pdf",
      description: st("researchLibrary", "paper9Desc", locale),
    },
    {
      id: "10",
      title: st("researchLibrary", "paper10Title", locale),
      author: st("researchLibrary", "paper10Author", locale),
      category: st("researchLibrary", "catTests", locale),
      publishDate: "2025-11-15",
      downloadUrl: "/papers/paper-10.pdf",
      description: st("researchLibrary", "paper10Desc", locale),
    },
    {
      id: "11",
      title: st("researchLibrary", "paper11Title", locale),
      author: st("researchLibrary", "paper11Author", locale),
      category: st("researchLibrary", "catTeaching", locale),
      publishDate: "2025-11-10",
      downloadUrl: "/papers/paper-11.pdf",
      description: st("researchLibrary", "paper11Desc", locale),
    },
    {
      id: "12",
      title: st("researchLibrary", "paper12Title", locale),
      author: st("researchLibrary", "paper12Author", locale),
      category: st("researchLibrary", "catTech", locale),
      publishDate: "2025-11-05",
      downloadUrl: "/papers/paper-12.pdf",
      description: st("researchLibrary", "paper12Desc", locale),
    },
  ];
}
