"use client";

import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import { st } from "@/app/_lib/static-text";

const STAGGER = 0.08;
const DURATION = 0.8;

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

interface CommitteeContentProps {
  committeeTitle?: string;
  description?: string;
  viewAllButtonText?: string;
  tasksTitle?: string;
  mainTasksList?: TaskItem[];
  membersTitle?: string;
  membersList?: MemberItem[];
}

function getFallbackTasks(): TaskItem[] {
  return [
    { number: "1", content: st("about", "task1") },
    { number: "2", content: st("about", "task2") },
    { number: "3", content: st("about", "task3") },
    { number: "4", content: st("about", "task4") },
    { number: "5", content: st("about", "task5") },
    { number: "6", content: st("about", "task6") },
  ];
}

const FALLBACK_MEMBERS: MemberItem[] = [
  { id: "1", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
  { id: "2", image: "/assets/image/member1.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
  { id: "3", image: "/assets/image/member.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
  { id: "4", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
  { id: "5", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
  { id: "6", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
  { id: "7", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
  { id: "8", image: "/assets/image/member2.png", name: "د. زايد العمري", content: "المعهد الوطني للتعلم الرقمي" },
];

export default function CommitteeContent({
  description,
  viewAllButtonText = st("about", "viewAll"),
  tasksTitle = st("about", "tasksTitle"),
  mainTasksList = FALLBACK_TASKS,
  membersTitle = st("about", "membersTitle"),
  membersList = FALLBACK_MEMBERS,
}: CommitteeContentProps) {
  // Use provided tasks list or fallback to static data
  const tasks = mainTasksList && mainTasksList.length > 0 ? mainTasksList : getFallbackTasks();
  const members = membersList && membersList.length > 0 ? membersList : FALLBACK_MEMBERS;

  return (
    <div className="stack upper-section custom-container">

      {/* Main Tasks */}
      <section className="content-stack" aria-labelledby="main-tasks-heading">
        <ScrollReveal direction="up" duration={DURATION} delay={0} amount={0} margin="0px 0px -60px 0px">
          <h2 id="main-tasks-heading" className="display-sm-bold">{tasksTitle}</h2>
        </ScrollReveal>

        <ul className="tasks-cards-container" role="list">
          {tasks.map((task, i) => (
            <ScrollReveal key={task.number} role="listitem" direction="up" delay={i * STAGGER} duration={DURATION} amount={0} margin="0px 0px -50px 0px">
              <Card
                style={{ borderRadius: "var(--radius-lg, 16px)", background: "#F9FAFB", border: "none" }}
                title={task.content}
                number={task.number}
                isImgCenter={true}
              />
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* Committee Members */}
      {/* <section className="content-stack" aria-labelledby="members-heading">
        <ScrollReveal direction="up" duration={DURATION} delay={0} amount={0} margin="0px 0px -60px 0px">
          <h2 id="members-heading" className="display-sm-bold">{membersTitle}</h2>
        </ScrollReveal>

        <ul className="members-cards-container" role="list">
          {members.map((member, i) => (
            <ScrollReveal key={member.id} role="listitem" direction="up" delay={i * STAGGER} duration={DURATION} amount={0} margin="0px 0px -50px 0px">
              <Card
                style={{ padding: "var(--Global-spacing-xl, 16px)", borderRadius: "var(--radius-lg, 16px)", border: "1px solid var(--Border-border-neutral-primary, #D2D6DB)" }}
                title={member.name}
                description={member.content}
                image={member.image}
              />
            </ScrollReveal>
          ))}
        </ul>
      </section> */}

    </div>
  );
}
