"use client";

import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import { st } from "@/app/_lib/static-text";

const STAGGER  = 0.08;
const DURATION = 0.7;

function getAboutPages() {
  return [
    { id: "who-we-are",              icon: "user-group",           titleKey: "whoWeAre",                              link: "/about/who-we-are" },
    { id: "hamza-test-traits",       icon: "geometric-shapes-01",  titleKey: "testTraits",                    link: "/about/hamza-test-traits" },
    { id: "benefits-of-hamza-test",  icon: "file-star",            titleKey: "benefits",                 link: "/about/benefits-of-hamza-test" },
    { id: "institutions-acceptance", icon: "checkmark-badge-02",   titleKey: "institutions",      link: "/about/institutions-and-countries-that-accept-the-hamza" },
    { id: "advisory-committee",      icon: "school-01",            titleKey: "advisoryCommittee",           link: "/about/periodic-advisory-committee" },
    { id: "hamza-ambassadors",       icon: "share-08",             titleKey: "ambassadors",                          link: "/about/hamza-ambassadors" },
    { id: "e-participation",         icon: "share-08",             titleKey: "eParticipation",                link: "/e-participation" },
  ] as const;
}

export default function AboutContent() {
  const pages = getAboutPages();
  return (
    <nav
      className="section-spacing-5xl responsive-cards-grid"
      aria-label={st("about", "navAria")}
    >
      {pages.map((page, i) => (
        <ScrollReveal key={page.id} direction="up" delay={i * STAGGER} duration={DURATION} amount={0}>
          <Card
            icon={page.icon}
            title={st("about", page.titleKey)}
            primaryTrailIconType="arrow"
            buttonIconOnly={true}
            linkSecondaryAction={page.link}
          />
        </ScrollReveal>
      ))}
    </nav>
  );
}
