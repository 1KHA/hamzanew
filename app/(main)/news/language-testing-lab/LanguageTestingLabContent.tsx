
import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import "@/app/(main)/about/about.css";

const STAGGER  = 0.1;
const DURATION = 0.8;
const r = (i: number) => i * STAGGER;

/* ── Data ──────────────────────────────────────────────────────────────────── */

const VISION_MISSION = [
  {
    title: "الرؤية",
    icon: "view",
    description:
      "أن يكون معمل أبحاث الاختبارات اللغوية العربية المرجع البحثي الأول عربياً وعالمياً في دراسة وتطوير المعرفة العلمية المرتبطة بالاختبارات اللغوية.",
  },
  {
    title: "الرسالة",
    icon: "mail-01",
    description:
      "إجراء بحوث علمية على الاختبارات اللغوية العربية، تتناول تحليلها وتقويمها وملاءمتها للأطر والمعايير الدولية، بما يسهم في إنتاج معرفة رصينة تخدم تطوير السياسات التعليمية والممارسات في مجال الاختبارات اللغوية العربية.",
  },
] as const;

const GOALS = [
  { number: "1", description: "إجراء بحوث كمية وكيفية على اختبارات اللغة العربية." },
  { number: "2", description: "تحليل مدى توافق اختبارات العربية مع الأطر والمعايير العالمية." },
  { number: "3", description: "تطوير نماذج بحثية وأدوات منهجية لدراسة أداء الاختبارات ومخرجاتها." },
  { number: "4", description: "نشر المعرفة البحثية في مجلات علمية محكمة ومؤتمرات دولية." },
  { number: "5", description: "بناء شراكات بحثية مع معامل ومراكز دولية في مجال اختبارات اللغة." },
  { number: "6", description: "تأهيل باحثين متخصصين في مجال أبحاث اختبارات اللغوية." },
] as const;

/* ── Sub-components ────────────────────────────────────────────────────────── */

function GoalCard({ number, description }: { number: string; description: string }) {
  return (
    <div className="about-value-card">
      <div className="about-value-card__header">
        <span className="about-value-card__badge text-xl-bold">{number}</span>
        <div className="about-value-card__content">
          <p className="about-value-card__desc">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main export ───────────────────────────────────────────────────────────── */

export default function LanguageTestingLabContent() {
  return (
    <div className="stack">

      {/* Vision & Mission */}
      <section className="about-us-cards-container custom-container" aria-labelledby="vision-mission">
        <h2 id="vision-mission" className="sr-only">الرؤية والرسالة</h2>
        {VISION_MISSION.map((card, i) => (
          <ScrollReveal key={card.title} className="flex-1" direction="up" delay={r(i)} duration={DURATION} immediate>
            <Card
              style={{ borderRadius: "16px" }}
              title={card.title}
              description={card.description}
              icon={card.icon}
              descriptionClass="text-md-regular"
            />
          </ScrollReveal>
        ))}
      </section>

      {/* Goals */}
      <section className="bg-color-grey-50 section-spacing-5xl" aria-labelledby="goals-heading">
        <div className="stack-8xl custom-container">
          <header className="section-head">
            <ScrollReveal direction="up" duration={DURATION} amount={0} margin="0px 0px -80px 0px" delay={0}>
              <p className="section-title">مهام المعمل ومحاوره البحثية</p>
            </ScrollReveal>
            <ScrollReveal direction="up" duration={DURATION} amount={0} margin="0px 0px -80px 0px" delay={0.15}>
              <h2 id="goals-heading" className="display-sm-bold">الأهداف</h2>
            </ScrollReveal>
          </header>

          <div className="about-cards">
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]" role="list">
              {GOALS.slice(0, 3).map((g, i) => (
                <ScrollReveal key={g.number} role="listitem" className="h-full" direction="up" delay={r(i)} duration={DURATION} amount={0} margin="0px 0px -80px 0px">
                  <GoalCard {...g} />
                </ScrollReveal>
              ))}
            </ul>
            <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]" role="list">
              {GOALS.slice(3).map((g, i) => (
                <ScrollReveal key={g.number} role="listitem" className="h-full" direction="up" delay={r(i)} duration={DURATION} amount={0} margin="0px 0px -80px 0px">
                  <GoalCard {...g} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
