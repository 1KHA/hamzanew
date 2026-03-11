"use client";

import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import { MAIN_TASKS, COMMITTEE_MEMBERS } from "./data";

const STAGGER  = 0.08;
const DURATION = 0.8;

export default function CommitteeContent() {
  return (
    <div className="stack upper-section custom-container">

      {/* Main Tasks */}
      <section className="content-stack" aria-labelledby="main-tasks-heading">
        <ScrollReveal direction="up" duration={DURATION} delay={0} amount={0} margin="0px 0px -60px 0px">
          <h2 id="main-tasks-heading" className="display-sm-bold">المهام الرئيسة</h2>
        </ScrollReveal>

        <ul className="tasks-cards-container" role="list">
          {MAIN_TASKS.map((task, i) => (
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
      <section className="content-stack" aria-labelledby="members-heading">
        <ScrollReveal direction="up" duration={DURATION} delay={0} amount={0} margin="0px 0px -60px 0px">
          <h2 id="members-heading" className="display-sm-bold">أعضاء اللجنة الاستشارية الدورية</h2>
        </ScrollReveal>

        <ul className="members-cards-container" role="list">
          {COMMITTEE_MEMBERS.map((member, i) => (
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
      </section>

    </div>
  );
}
