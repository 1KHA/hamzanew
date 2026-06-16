"use client";

import { useRouter } from "next/navigation";
import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import Typewriter from "@/app/components/typewriter/Typewriter";
import { st } from "@/app/_lib/static-text";
import { INSTITUTIONS, RESOURCES, RESOURCES_EN } from "./data";

const DURATION = 0.8;

interface InstitutionsContentProps {
  locale?: "ar" | "en";
}

export default function InstitutionsContent({ locale = "ar" }: InstitutionsContentProps) {
  const router = useRouter();
  const resources = locale === "en" ? RESOURCES_EN : RESOURCES;

  return (
    <>
      <div className="custom-container">

        {/* Institutions Grid */}
        <section className="stack-xl block-padding-3xl" aria-labelledby="institutions-heading">
          <ScrollReveal direction="up" duration={DURATION} delay={0} amount={0} margin="0px 0px -60px 0px">
            <div className="section-head">
              <p className="section-title">{st("about", "institutionsSectionTitle", locale)}</p>
              <h2 id="institutions-heading" className="display-sm-bold">{st("about", "institutionsHeading", locale)}</h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            {[INSTITUTIONS.slice(0, 5), INSTITUTIONS.slice(5)].map((row, r) => (
              <ScrollReveal key={r} direction={r === 0 ? "right" : "left"} duration={DURATION} delay={0.2} amount={0} margin="0px 0px -60px 0px">
                <ul className="grid grid-cols-1 md:grid-cols-5 gap-4! items-stretch!" role="list">
                  {row.map((src, i) => (
                    <li key={i} className="card h-40 flex items-center! justify-center p-[32px]!" style={{ listStyle: "none" }}>
                      <div className="h-80 align-center flex justify-center items-center">
                        <img src={src} alt={`${st("about", "institutionsLogoAlt", locale)} ${r * 5 + i + 1}`} className="fit-contain logo-image" />
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Resource Cards */}
        <section className="row-center-gap-3xl block-padding-8xl" aria-label={st("about", "resourcesSectionAria", locale)}>
          {resources.map((item, i) => (
            <ScrollReveal key={item.id} className="flex-1" direction="up" duration={DURATION} delay={i * 0.15} amount={0} margin="0px 0px -80px 0px">
              <Card
                title={item.title}
                description={item.description}
                icon={item.icon}
                showPrimaryAction={true}
                showPrimaryIcon={true}
                primaryActionLabel={item.primaryActionLabel}
                primaryTrailIconType="arrow-up-right-01"
                buttonColor="primary-brand"
                external={false}
                linkPrimaryAction={item.externalLink}
              />
            </ScrollReveal>
          ))}
        </section>
      </div>

      {/* CTA */}
      <section className="section-bg-bottom-image block-padding-8xl section-cta" aria-labelledby="cta-heading">
        <div className="stack-lg custom-container section-cta__box">
          <Typewriter as="h2" id="cta-heading" className="section-cta__title" text={st("about", "institutionsCtaTitle", locale)} />

          <ScrollReveal direction="up" distance={0} duration={1} delay={2} amount={0} margin="0px 0px -60px 0px">
            <p className="section-cta__desc">
              {st("about", "institutionsCtaDesc", locale)}
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={0} duration={DURATION} delay={3} amount={0} margin="0px 0px -60px 0px">
            <button
              className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color"
              aria-label={st("about", "institutionsCtaButtonAria", locale)}
              onClick={() => router.push("/sign-in")}
            >
              <span className="dga-btn-label">{st("about", "institutionsCtaButton", locale)}</span>
              <img src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg" width={24} height={24} alt="" aria-hidden="true" />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
