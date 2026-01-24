"use client";

// import { DgaIcon } from "platformscode-new-react";
import Card from "../components/card/Card";

function AboutPage() {
  const aboutPages = [
    {
      icon: "user-group",
      title: "من نحن",
      link: "/about/who-we-are",
    },
    {
      icon: "user-group",
      title: "سمات اختبار همزة",
      link: "/about/hamza-test-traits",
    },
    {
      icon: "certificate",
      title: "أهمية اختبارات همزة",
      link: "/about/benefits-of-hamza-test",
    },
    {
      icon: "share-nodes",
      title: "المشاركة الالكترونية",
      link: "#",
    },
    {
      icon: "building-columns",
      title: "اللجنة الاستشارية الدولية",
      link: "/about/international-advisory-committee",
    },
    {
      icon: "badge-check",
      title: "المؤسسات والدول التي تقبل همزة",
      link: "/about/institutions-and-countries-that-accept-the-hamza",
    },
    {
      icon: "message-circle",
      title: "تواصل معنا",
      link: "#",
    },
  ];

  const aboutPagesCard = aboutPages.map((page, index) => {
    return (
      <Card
        key={index}
        icon={page.icon}
        title={page.title}
        buttonIconOnly={true}
        // linkPrimaryAction={page.link}
        linkSecondaryAction={page.link}
      />
    );
  });

  return (
    <div>
      <div className="section-spacing-5xl responsive-cards-grid custom-container">
        {aboutPagesCard}
      </div>
    </div>
  );
}

export default AboutPage;
