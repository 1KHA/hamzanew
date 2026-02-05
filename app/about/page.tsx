"use client";

import LastModified from "../components/last-modified/LastModified";
import Card from "../components/card/Card";

function AboutPage() {
  const aboutPages = [
    {
      icon: "user-group",
      title: "من نحن",
      link: "/about/who-we-are",
    },
    {
      icon: "geometric-shapes-01",
      title: "سمات اختبار همزة",
      link: "/about/hamza-test-traits",
    },
    {
      icon: "file-star",
      title: "أهمية اختبارات همزة",
      link: "/about/benefits-of-hamza-test",
    },
    {
      icon: "checkmark-badge-02",
      title: "المؤسسات والدول التي تقبل همزة",
      link: "/about/institutions-and-countries-that-accept-the-hamza",
    },

    {
      icon: "school-01",
      title: "اللجنة الاستشارية الدورية",
      link: "/about/periodic-advisory-committee",
    },
    {
      icon: "share-08",
      title: "المشاركة الالكترونية",
      link: "/e-participation",
    },
  ];

  const aboutPagesCard = aboutPages.map((page, index) => {
    return (
      <Card
        key={index}
        icon={page.icon}
        title={page.title}
        primaryTrailIconType="arrow"
        buttonIconOnly={true}
        // linkPrimaryAction={page.link}
        linkSecondaryAction={page.link}
      />
    );
  });

  return (
    <div className="content">
      <div className="section-spacing-5xl responsive-cards-grid ">
        {aboutPagesCard}
      </div>
      {/* Last update Date and time */}
      <LastModified
        date="31/12/2025"
        time="2:00 م"
      />
    </div>
  );
}

export default AboutPage;
