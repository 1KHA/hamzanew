import Card from "@/app/components/card/Card";
import "../about.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "اللجنة الاستشارية الدورية",
  description:"تهدف اللجنة استشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية."
}
/**
 * Interface representing a task in the advisory committee.
 */
interface Task {
  /** The sequence number of the task */
  Number: string;
  /** The description of the task */
  content: string;
}

/**
 * Interface representing a member of the advisory committee.
 */
interface CommitteeMember {
  /** Unique identifier for the member */
  id: string;
  /** URL path to the member's image */
  image: string;
  /** Name of the committee member */
  name: string;
  /** Affiliation or title of the member */
  content: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * List of main tasks and responsibilities of the advisory committee.
 */
const mainTasks: Task[] = [
  {
    Number: "1",
    content:
      "مراجعة الأطر المنهجية والمعايير المرجعية لاخـــــــــــــــتبــــــــــــــارات هــــــــــــمــــــــزة.",
  },
  {
    Number: "2",
    content:
      "تقديـــــــم التوصيــــــــــــــات العلميـــــــــــــــــــة لدعـــــم السياسات التطويرية وضمان الجودة.",
  },
  {
    Number: "3",
    content:
      "تغطي مهارات القراءة، الكتابة، الاستماع، والتراكيب اللغوية، لتقديم صورة متكاملة عن مستوى المتقدم.",
  },
  {
    Number: "4",
    content: "تقييم تقارير الصلاحية والموثوقية وتقديم الملاحظات العلمية حولها.",
  },
  {
    Number: "5",
    content:
      "الإسهام في ربط المشروع بخبرات وممارسات عالمية في مجال تعليم اللغات وقياسها.",
  },
  {
    Number: "6",
    content:
      "دعم استدامة الاختبارات من خلال المشورة في القضايا العلمية والأكاديمية المستجدة.",
  },
];

/**
 * List of the periodic advisory committee members.
 */
const committeeMembers: CommitteeMember[] = [
  {
    id: "1",
    image: "/assets/image/member2.png",
    name: "د. زايد العمري",
    content: "المعهد الوطني للتعلم الرقمي",
  },
  {
    id: "2",
    image: "/assets/image/member1.png",
    name: "د. زايد العمري",
    content: "المعهد الوطني للتعلم الرقمي",
  },
  {
    id: "3",
    image: "/assets/image/member.png",
    name: "د. زايد العمري",
    content: "المعهد الوطني للتعلم الرقمي",
  },
  {
    id: "4",
    image: "/assets/image/member2.png",
    name: "د. زايد العمري",
    content: "المعهد الوطني للتعلم الرقمي",
  },
  {
    id: "5",
    image: "/assets/image/member2.png",
    name: "د. زايد العمري",
    content: "المعهد الوطني للتعلم الرقمي",
  },
  {
    id: "6",
    image: "/assets/image/member2.png",
    name: "د. زايد العمري",
    content: "المعهد الوطني للتعلم الرقمي",
  },
  {
    id: "7",
    image: "/assets/image/member2.png",
    name: "د. زايد العمري",
    content: "المعهد الوطني للتعلم الرقمي",
  },
  {
    id: "8",
    image: "/assets/image/member2.png",
    name: "د. زايد العمري",
    content: "المعهد الوطني للتعلم الرقمي",
  },
];

/**
 * PeriodicAdvisoryCommitteePage Component
 *
 * Displays the main tasks and members of the Periodic Advisory Committee.
 * Optimized for accessibility and valid semantic HTML structure.
 *
 * @accessibility
 * - Uses semantic HTML (<section>, <ul>, <li>) for structure
 * - Implements proper heading hierarchy (h2)
 * - Uses aria-labelledby to associate sections with their headings
 * - Ensures list roles are preserved for screen readers
 *
 * @returns {JSX.Element} The rendered component.
 */
export default function PeriodicAdvisoryCommitteePage() {
  return (
    <div className="stack upper-section custom-container">
      {/* Main Tasks Section */}
      <section className="content-stack" aria-labelledby="main-tasks-heading">
        <h2 id="main-tasks-heading" className="section-header">
          المهام الرئيسة
        </h2>
        <ul className="tasks-cards-container" role="list">
          {mainTasks.map((task, index) => (
            <li key={index} style={{ listStyle: "none" }}>
              <Card
                style={{
                  borderRadius: "var(--radius-lg, 16px)",
                  background: "#F9FAFB",
                  border: "none",
                  lineHeight:
                    "var(--Line-Height-Text-line-heights-text-lg, 28px)",
                }}
                title={task.content}
                number={task.Number}
                isImgCenter={true}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Committee Members Section */}
      <section className="content-stack" aria-labelledby="members-heading">
        <h2 id="members-heading" className="section-header">
          أعضاء اللجنة الاستشارية الدورية
        </h2>
        <ul className="members-cards-container" role="list">
          {committeeMembers.map((member) => (
            <li key={member.id} style={{ listStyle: "none" }}>
              <Card
                style={{
                  padding: "var(--Global-spacing-xl, 16px)",
                  borderRadius: "var(--radius-lg, 16px)",
                  border:
                    "1px solid var(--Border-border-neutral-primary, #D2D6DB)",
                }}
                title={member.name}
                description={member.content}
                image={member.image}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
