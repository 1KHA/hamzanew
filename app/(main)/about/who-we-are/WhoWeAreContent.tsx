
import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import { st } from "@/app/_lib/static-text-server";

const STAGGER = 0.1;
const DURATION = 0.8;
const r = (i: number) => i * STAGGER;

interface ValueItem {
  number: string;
  title: string;
  description: string;
}

interface ApiData {
  values?: { title?: string; list?: ValueItem[] };
  pillars?: { title?: string; description?: string; list?: ValueItem[] };
}

interface WhoWeAreContentProps {
  apiData?: ApiData | null;
  translations?: Record<string, string> | null;
  locale?: string;
}

function ValueCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
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

export default function WhoWeAreContent({
  apiData,
  translations,
  locale = "ar-SA",
}: WhoWeAreContentProps) {
  const activeLocale = locale === "en-US" ? "en" : "ar";

  // Static fallback data built from static-text
  const staticVisionMission = [
    {
      title: st("about", "visionTitle", activeLocale),
      description: st("about", "visionDesc", activeLocale),
      icon: "view",
    },
    {
      title: st("about", "missionTitle", activeLocale),
      description: st("about", "missionDesc", activeLocale),
      icon: "mail-01",
    },
  ];
  const staticValues: ValueItem[] = [
    { number: "1", title: st("about", "value1Title", activeLocale), description: st("about", "value1Desc", activeLocale) },
    { number: "2", title: st("about", "value2Title", activeLocale), description: st("about", "value2Desc", activeLocale) },
    { number: "3", title: st("about", "value3Title", activeLocale), description: st("about", "value3Desc", activeLocale) },
    { number: "4", title: st("about", "value4Title", activeLocale), description: st("about", "value4Desc", activeLocale) },
    { number: "5", title: st("about", "value5Title", activeLocale), description: st("about", "value5Desc", activeLocale) },
  ];
  const staticMortakazat: ValueItem[] = [
    { number: "1", title: st("about", "pillar1Title", activeLocale), description: st("about", "pillar1Desc", activeLocale) },
    { number: "2", title: st("about", "pillar2Title", activeLocale), description: st("about", "pillar2Desc", activeLocale) },
    { number: "3", title: st("about", "pillar3Title", activeLocale), description: st("about", "pillar3Desc", activeLocale) },
  ];

  // Dynamic values from API, fallback to static data
  const valuesTitle =
    apiData?.values?.title ||
    st("about", "valuesTitle", activeLocale);
  const valuesList: ValueItem[] =
    apiData?.values?.list && apiData.values.list.length > 0
      ? apiData.values.list.map((v) => ({
          number: v.number || "",
          title: v.title || "",
          description: v.description || "",
        }))
      : [...staticValues];

  // Dynamic pillars from API, fallback to static data
  const pillarsTitle =
    apiData?.pillars?.title ||
    st("about", "pillarsTitle", activeLocale);
  const pillarsList: ValueItem[] =
    apiData?.pillars?.list && apiData.pillars.list.length > 0
      ? apiData.pillars.list.map((p) => ({
          number: p.number || "",
          title: p.title || "",
          description: p.description || "",
        }))
      : [...staticMortakazat];

  return (
    <div className="stack">
      {/* Vision & Mission */}
      <section
        className="about-us-cards-container custom-container"
        aria-labelledby="vision-mission"
      >
        <h2 id="vision-mission" className="sr-only">
          {st("about", "visionTitle", activeLocale) + " & " + st("about", "missionTitle", activeLocale)}
        </h2>
        {staticVisionMission.map((card, i) => (
          <ScrollReveal
            key={card.title}
            className="flex-1"
            direction="up"
            delay={r(i)}
            duration={DURATION}
            immediate
          >
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

      {/* Values */}
      <section
        className="bg-color-grey-50 section-spacing-5xl"
        aria-labelledby="values"
      >
        <div className="stack-8xl custom-container">
          <header className="section-head">
            <ScrollReveal
              direction="up"
              duration={DURATION}
              amount={0}
              margin="0px 0px -80px 0px"
              delay={0}
            >
              <h2 id="values" className="display-sm-bold">
                {valuesTitle}
              </h2>
            </ScrollReveal>
          </header>

          <div className="about-cards">
            <ul
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]"
              role="list"
            >
              {valuesList.slice(0, 3).map((v, i) => (
                <ScrollReveal
                  key={v.number}
                  role="listitem"
                  className="h-full"
                  direction="up"
                  delay={r(i)}
                  duration={DURATION}
                  amount={0}
                  margin="0px 0px -80px 0px"
                >
                  <ValueCard {...v} />
                </ScrollReveal>
              ))}
            </ul>
            <ul
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]"
              role="list"
            >
              {valuesList.slice(3).map((v, i) => (
                <ScrollReveal
                  key={v.number}
                  role="listitem"
                  className="h-full"
                  direction="up"
                  delay={r(i)}
                  duration={DURATION}
                  amount={0}
                  margin="0px 0px -80px 0px"
                >
                  <ValueCard {...v} />
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles (Pillars) */}
      <section
        className="stack bg-color-grey-50 section-spacing-10xl"
        aria-labelledby="core-principles"
      >
        <div className="stack-4xl custom-container">
          <ScrollReveal
            direction="up"
            duration={DURATION}
            amount={0.3}
          >
            <header className="section-head">
              <h2 id="core-principles" className="display-sm-bold">
                {pillarsTitle}
              </h2>
            </header>
          </ScrollReveal>

          <div className="about-cards">
            <div className="about-cards__row !items-stretch">
              {pillarsList.map((card, i) => (
                <ScrollReveal
                  key={card.number}
                  direction="up"
                  delay={r(i)}
                  duration={DURATION}
                  amount={0.2}
                >
                  <Card
                    style={{ borderRadius: "16px", border: "none" }}
                    title={card.title}
                    description={card.description}
                    number={card.number}
                    descriptionClass="text-md-regular"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
