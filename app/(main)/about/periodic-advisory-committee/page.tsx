import type { Metadata } from "next";
import CommitteeContent from "./CommitteeContent";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import "../about.css";

export const metadata: Metadata = {
  title: "اللجنة الاستشارية ",
  description:
    "تهدف اللجنة استشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية.",
};

interface TaskItem {
  number: string;
  content: string;
}

interface MemberItem {
  id: string;
  image: string;
  name: string;
  content: string;
}

export default async function PeriodicAdvisoryCommitteePage() {
  // Default values
  let committeeTitle = "اللجنة الاستشارية الدولية";
  let descriptionText = "تهدف اللجنة استشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية.";
  let viewAllButtonText = "عرض الكل";
  let tasksTitle = "المهام الرئيسة";
  let mainTasksList: TaskItem[] = [];
  let membersTitle = "أعضاء اللجنة الاستشارية الدورية";
  let membersList: MemberItem[] = [];

  // Static fallback data
  const fallbackTasks: TaskItem[] = [
    { number: "1", content: "مراجعة الأطر المنهجية والمعايير المرجعية لاختبارات همزة." },
    { number: "2", content: "تقديم التوصيات العلمية لدعم السياسات التطويرية وضمان الجودة." },
    { number: "3", content: "تغطي مهارات القراءة، الكتابة، الاستماع، والتراكيب اللغوية، لتقديم صورة متكاملة عن مستوى المتقدم." },
    { number: "4", content: "تقييم تقارير الصلاحية والموثوقية وتقديم الملاحظات العلمية حولها." },
    { number: "5", content: "الإسهام في ربط المشروع بخبرات وممارسات عالمية في مجال تعليم اللغات وقياسها." },
    { number: "6", content: "دعم استدامة الاختبارات من خلال المشورة في القضايا العلمية والأكاديمية المستجدة." },
  ];

  const fallbackMembers: MemberItem[] = [
    { id: "1", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
    { id: "2", image: "/assets/image/member1.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
    { id: "3", image: "/assets/image/member.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
    { id: "4", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
    { id: "5", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
    { id: "6", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
    { id: "7", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
    { id: "8", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
  ];

  try {
    // Fetch both content keys in parallel
    const [periodicAdvisoryCommitteeContent, mainTasksContent] = await Promise.all([
      fetchContentWithKey("HAMZA_HOMEPAGE_WHO_WE_ARE_PERIODIC_ADVISORY_COMMITTEE_CONTENT_KEY"),
      fetchContentWithKey("HAMZA_HOMEPAGE_WHO_WE_ARE_PERIODIC_ADVISORY_COMMITTEE_MAIN_TASK_CONTENT_KEY"),
    ]);

    // Process main committee description content
    const committeeContentFields = extractFields(
      periodicAdvisoryCommitteeContent?.contentFields,
      ["titleText", "descriptionText", "viewAllButtonText"]
    ) as { titleText?: string; descriptionText?: string; viewAllButtonText?: string };

    if (periodicAdvisoryCommitteeContent?.title) {
      committeeTitle = periodicAdvisoryCommitteeContent.title;
    }
    if (committeeContentFields?.descriptionText) {
      descriptionText = committeeContentFields.descriptionText;
    }
    if (committeeContentFields?.viewAllButtonText) {
      viewAllButtonText = committeeContentFields.viewAllButtonText;
    }

    // Process main tasks content
    if (mainTasksContent?.title) {
      tasksTitle = mainTasksContent.title;
    }

    const extractedTasks = extractList(
      mainTasksContent?.contentFields,
      "testingCenterStatisticsFieldSet",
      {
        numberTitle: "numberTitle",
        descriptionText: "descriptionText",
        iconImage: "iconImage",
      }
    );

    if (extractedTasks && extractedTasks.length > 0) {
      mainTasksList = extractedTasks.map((task: any, index: number) => ({
        number: task.numberTitle || String(index + 1),
        content: task.descriptionText || "",
      }));
    }

  } catch (error) {
    console.error("Failed to fetch periodic advisory committee content:", error);
  }

  // Use fallback data if no dynamic content was fetched
  if (mainTasksList.length === 0) {
    mainTasksList = fallbackTasks;
  }

  // Note: Hero is handled by the layout (AboutLayout) which fetches dynamic data
  // This page only renders the CommitteeContent
  
  return (
    <CommitteeContent
      committeeTitle={committeeTitle}
      description={descriptionText}
      viewAllButtonText={viewAllButtonText}
      tasksTitle={tasksTitle}
      mainTasksList={mainTasksList}
      membersTitle={membersTitle}
      membersList={membersList.length > 0 ? membersList : fallbackMembers}
    />
  );
}
