
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import { BENEFITS, ORG_BENEFITS } from "./data";

const STAGGER  = 0.1;
const DURATION = 0.8;
const r = (i: number) => i * STAGGER;

/* ── Sub-components ──────────────────────────────────────────────── */

function BenefitCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <li
      className="about-value-card"
      aria-label={`الفائدة ${number}: ${title} - ${description}`}
      style={{ borderRadius: "var(--radius-lg, 16px)", background: "#F9FAFB", listStyle: "none" }}
    >
      <div className="about-value-card__header">
        <span className="about-value-card__badge text-xl-bold" aria-hidden="true">{number}</span>
        <div className="about-value-card__content">
          <h3 className="about-value-card__title">{title}</h3>
          <p className="about-value-card__desc">{description}</p>
        </div>
      </div>
    </li>
  );
}

function OrgCard({ number, content, icon }: { number: string; content: string; icon: string }) {
  return (
    <article aria-label={`الفائدة ${number}: ${content}`}>
      <div className="sticky-card" style={{ position: "static", width: "100%", height: "auto" }} role="presentation">
        <p className="card-bg-id text-xl-bold lg:!hidden !me-auto" aria-hidden="true">{number}</p>
        <div className="card-inner">
          <div className="icon-wrapper" role="presentation">
            <img src={icon} alt="" aria-hidden="true" className="icon-img" />
          </div>
          <div className="card-content">
            <p className="card-bg-id text-xl-bold !hidden lg:!inline-flex" aria-hidden="true">{number}</p>
            <p className="text-lg-bold" lang="ar">{content}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */

export default function BenefitsContent() {
  return (
    <div
      className="custom-container stack"
      style={{ display: "flex", padding: "clamp(20px, 5vw, 70px)", gap: "clamp(16px, 5vw, 70px)", borderRadius: 16, background: "#FFF" }}
    >
      {/* Section 1: Benefits for test takers */}
      <section className="flex-start-gap-80" aria-labelledby="takers-heading">
        <div className="stack-xl">
          <ScrollReveal direction="up" duration={DURATION} delay={r(0)} immediate>
            <header className="section-head">
              <p className="section-title">كيفية الإستفادة من همزة</p>
              <h2 id="takers-heading" className="display-sm-bold">فوائد اختبارات همزة للمختبرين</h2>
            </header>
          </ScrollReveal>
          <ScrollReveal direction="up" duration={DURATION} delay={r(1)} immediate>
            <p className="description">
              توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.
            </p>
          </ScrollReveal>
        </div>

        <ul className="stack-lg" role="list" aria-label="قائمة فوائد الاختبار للمختبرين">
          {BENEFITS.map((b, i) => (
            <ScrollReveal key={b.number} role="listitem" direction="left" delay={r(i)} duration={DURATION} amount={0} margin="0px 0px -60px 0px">
              <BenefitCard {...b} />
            </ScrollReveal>
          ))}
        </ul>
      </section>

      {/* Section 2: Benefits for organizations */}
      <section aria-labelledby="org-heading" className="org-benefits-section">
        <ScrollReveal direction="up" duration={DURATION} amount={0} margin="0px 0px -80px 0px">
          <header className="section-head">
            <p className="section-title">كيفية الاستفادة من همزة</p>
            <h2 id="org-heading" className="display-sm-bold">فوائد اختبارات همزة للجهات</h2>
          </header>
        </ScrollReveal>

        <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-[24px]">
          {ORG_BENEFITS.map((slide, i) => (
            <ScrollReveal key={slide.number} direction="up" delay={r(i)} duration={DURATION} amount={0} margin="0px 0px -60px 0px">
              <OrgCard {...slide} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
