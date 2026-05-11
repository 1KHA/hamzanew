"use client";

import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import { st } from "@/app/_lib/static-text";

const STAGGER  = 0.08;
const DURATION = 0.7;

const ABOUT_PAGES = [
  { id: "who-we-are",              icon: "user-group",           key: "whoWeAre",              link: "/about/who-we-are" },
  { id: "hamza-test-traits",       icon: "geometric-shapes-01",  key: "testTraits",            link: "/about/hamza-test-traits" },
  { id: "benefits-of-hamza-test",  icon: "file-star",            key: "benefits",              link: "/about/benefits-of-hamza-test" },
  { id: "institutions-acceptance", icon: "checkmark-badge-02",   key: "institutions",          link: "/about/institutions-and-countries-that-accept-the-hamza" },
  { id: "advisory-committee",      icon: "school-01",            key: "committee",             link: "/about/periodic-advisory-committee" },
  { id: "hamza-ambassadors",       icon: "share-08",             key: "ambassadors",           link: "/about/hamza-ambassadors" },
  { id: "e-participation",         icon: "share-08",             key: "eParticipation",        link: "/e-participation" },
] as const;

export default function AboutContent() {
  return (
    <nav
      className="section-spacing-5xl responsive-cards-grid"
      aria-label={st("about", "navAria")}
    >
      {ABOUT_PAGES.map((page, i) => (
        <ScrollReveal key={page.id} direction="up" delay={i * STAGGER} duration={DURATION} amount={0}>
          <Card
            icon={page.icon}
            title={st("about", page.key)}
            primaryTrailIconType="arrow"
            buttonIconOnly={true}
            linkSecondaryAction={page.link}
          />
        </ScrollReveal>
      ))}
    </nav>
  );
}
