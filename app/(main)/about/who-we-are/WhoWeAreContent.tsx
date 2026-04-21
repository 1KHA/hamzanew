"use client";

import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import { VISION_MISSION, VALUES, MORTAKAZAT } from "./data";

const STAGGER  = 0.1;
const DURATION = 0.8;
const r = (i: number) => i * STAGGER;

/* ── Sub-components ──────────────────────────────────────────────── */

function ValueCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="about-value-card">
      <div className="about-value-card__header">
        <span className="about-value-card__badge text-xl-bold">{number}</span>
        <div className="about-value-card__content">
          <h3 className="about-value-card__title">{title}</h3>
          <p className="about-value-card__desc">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */

export default function WhoWeAreContent() {
  return (
    <div className="stack">

      {/* Vision & Mission */}
      <section className="about-us-cards-container custom-container" aria-labelledby="vision-mission">
        <h2 id="vision-mission" className="sr-only">الرؤية والرسالة</h2>
        {VISION_MISSION.map((card, i) => (
          <ScrollReveal key={card.title} className="flex-1" direction="up" delay={r(i)} duration={DURATION} immediate>
            <Card style={{ borderRadius: "16px" }} title={card.title} description={card.description} icon={card.icon} descriptionClass="text-md-regular" />
          </ScrollReveal>
        ))}
      </section>

      {/* Values */}
      <section className="bg-color-grey-50 section-spacing-5xl" aria-labelledby="values">
        <div className="stack-8xl custom-container">
          <header className="section-head">
            <ScrollReveal direction="up" duration={DURATION} amount={0} margin="0px 0px -80px 0px" delay={0}>
              <p className="section-title">استكشاف القيم الأساسية للمنظمة</p>
            </ScrollReveal>
            <ScrollReveal direction="up" duration={DURATION} amount={0} margin="0px 0px -80px 0px" delay={0.15}>
              <h2 id="values" className="display-sm-bold">الــقـــيـــم</h2>
            </ScrollReveal>
          </header>

          <div className="about-cards">
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]" role="list">
              {VALUES.slice(0, 3).map((v, i) => (
                <ScrollReveal key={v.number} role="listitem" className="h-full" direction="up" delay={r(i)} duration={DURATION} amount={0} margin="0px 0px -80px 0px">
                  <ValueCard {...v} />
                </ScrollReveal>
              ))}
            </ul>
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]" role="list">
              {VALUES.slice(3).map((v, i) => (
                <ScrollReveal key={v.number} role="listitem" className="h-full" direction="up" delay={r(i)} duration={DURATION} amount={0} margin="0px 0px -80px 0px">
                  <ValueCard {...v} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="stack bg-color-grey-50 section-spacing-10xl" aria-labelledby="core-principles">
        <div className="stack-4xl custom-container">
          <ScrollReveal direction="up" duration={DURATION} amount={0.3}>
            <header className="section-head">
              <h2 id="core-principles" className="display-sm-bold">مرتكزات اختبارات همزة؟</h2>
            </header>
          </ScrollReveal>

          <div className="about-cards">
            <div className="about-cards__row !items-stretch">
              {MORTAKAZAT.map((card, i) => (
                <ScrollReveal key={card.number} direction="up" delay={r(i)} duration={DURATION} amount={0.2}>
                  <Card style={{ borderRadius: "16px", border: "none" }} title={card.title} description={card.description} number={card.number} descriptionClass="text-md-regular" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
