"use client";

import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";

const STAGGER  = 0.08;
const DURATION = 0.7;

const ABOUT_PAGES = [
  { id: "who-we-are",              icon: "user-group",           title: "من نحن",                              link: "/about/who-we-are" },
  { id: "hamza-test-traits",       icon: "geometric-shapes-01",  title: "سمات اختبار همزة",                    link: "/about/hamza-test-traits" },
  { id: "benefits-of-hamza-test",  icon: "file-star",            title: "أهمية اختبارات همزة",                 link: "/about/benefits-of-hamza-test" },
  { id: "institutions-acceptance", icon: "checkmark-badge-02",   title: "المؤسسات والدول التي تقبل همزة",      link: "/about/institutions-and-countries-that-accept-the-hamza" },
  { id: "advisory-committee",      icon: "school-01",            title: "اللجنة الاستشارية الدورية",           link: "/about/periodic-advisory-committee" },
  { id: "hamza-ambassadors",       icon: "share-08",             title: "سفراء همزة",                          link: "/about/hamza-ambassadors" },
  { id: "e-participation",         icon: "share-08",             title: "المشاركة الالكترونية",                link: "/e-participation" },
] as const;

export default function AboutContent() {
  return (
    <nav
      className="section-spacing-5xl responsive-cards-grid"
      aria-label="أقسام عن همزة"
    >
      {ABOUT_PAGES.map((page, i) => (
        <ScrollReveal key={page.id} direction="up" delay={i * STAGGER} duration={DURATION} amount={0}>
          <Card
            icon={page.icon}
            title={page.title}
            primaryTrailIconType="arrow"
            buttonIconOnly={true}
            linkSecondaryAction={page.link}
          />
        </ScrollReveal>
      ))}
    </nav>
  );
}
