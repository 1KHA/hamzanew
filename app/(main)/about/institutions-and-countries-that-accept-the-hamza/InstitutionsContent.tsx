"use client";

import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import Tag from "@/app/components/tag/Tag";
import Typewriter from "@/app/components/typewriter/Typewriter";
import { st } from "@/app/_lib/static-text";
import { INSTITUTIONS } from "./data";

const DURATION = 0.8;

export default function InstitutionsContent() {
  return (
    <>
      <div className="custom-container">

        {/* Institutions Grid */}
        <section className="stack-xl block-padding-3xl" aria-labelledby="institutions-heading">
          <ScrollReveal direction="up" duration={DURATION} delay={0} amount={0} margin="0px 0px -60px 0px">
            <div className="section-head">
              <p className="section-title">{st("about", "institutionsSectionSubtitle")}</p>
              <h2 id="institutions-heading" className="display-sm-bold">{st("about", "institutionsHeading")}</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" duration={DURATION} delay={0.1} amount={0} margin="0px 0px -60px 0px">
            <div className="flex-start-center gap-4">
              <Tag label={st("about", "insideKsa")} variant="success" size="lg" trailIcon={{ src: "/assets/image/Country Flags.svg" }} />
              <Tag label={st("about", "otherCountries")} variant="neutral" size="lg" trailIcon={{ src: "/assets/icons/stroke-standard/flag-02-stroke-rounded.svg" }} />
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            {[INSTITUTIONS.slice(0, 5), INSTITUTIONS.slice(5)].map((row, r) => (
              <ScrollReveal key={r} direction={r === 0 ? "right" : "left"} duration={DURATION} delay={0.2} amount={0} margin="0px 0px -60px 0px">
                <ul className="grid grid-cols-1 md:grid-cols-5 gap-4! items-stretch!" role="list">
                  {row.map((src, i) => (
                    <li key={i} className="card h-40 flex items-center! justify-center p-[32px]!" style={{ listStyle: "none" }}>
                      <div className="h-80 align-center flex justify-center items-center">
                        <img src={src} alt={`${st("about", "institutionLogoAlt")} ${r * 5 + i + 1}`} className="fit-contain logo-image" />
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Resource Cards */}
        <section className="row-center-gap-3xl block-padding-8xl" aria-label={st("about", "resourcesAria")}>
          <ScrollReveal className="flex-1" direction="up" duration={DURATION} delay={0} amount={0} margin="0px 0px -80px 0px">
            <Card
              title={st("about", "resource1Title")}
              description={st("about", "resource1Desc")}
              icon="chart-bar-line"
              showPrimaryAction={true}
              showPrimaryIcon={true}
              primaryActionLabel={st("about", "resource1Action")}
              primaryTrailIconType="arrow-up-right-01"
              buttonColor="primary-brand"
              external={true}
              linkPrimaryAction="#"
            />
          </ScrollReveal>
          <ScrollReveal className="flex-1" direction="up" duration={DURATION} delay={0.15} amount={0} margin="0px 0px -80px 0px">
            <Card
              title={st("about", "resource2Title")}
              description={st("about", "resource2Desc")}
              icon="book-04"
              showPrimaryAction={true}
              showPrimaryIcon={true}
              primaryActionLabel={st("about", "resource2Action")}
              primaryTrailIconType="arrow-up-right-01"
              buttonColor="primary-brand"
              external={true}
              linkPrimaryAction="#"
            />
          </ScrollReveal>
        </section>
      </div>

      {/* CTA */}
      <section className="section-bg-bottom-image block-padding-8xl section-cta" aria-labelledby="cta-heading">
        <div className="stack-lg custom-container section-cta__box">
          <Typewriter as="h2" id="cta-heading" className="section-cta__title" text={st("about", "ctaHeading")} />

          <ScrollReveal direction="up" distance={0} duration={1} delay={2} amount={0} margin="0px 0px -60px 0px">
            <p className="section-cta__desc">
              {st("about", "ctaDesc")}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={0} duration={DURATION} delay={3} amount={0} margin="0px 0px -60px 0px">
            <button className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color" aria-label={st("about", "ctaButton")}>
              <span className="dga-btn-label">{st("about", "ctaButton")}</span>
              <img src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg" width={24} height={24} alt="" aria-hidden="true" />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
