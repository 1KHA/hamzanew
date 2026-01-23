"use client";

import { DgaIcon } from "platformscode-new-react";
import Card from "../components/card/Card";

function AboutPage() {
  const aboutPages = [
    {
      icon: "user-group",
      title: "من نحن",
      link: "/about",
    },
    {
      icon: "user-group",
      title: "سمات اختبار همزة",
      link: "/exam-features",
    },
    {
      icon: "certificate",
      title: "أهمية اختبارات همزة",
      link: "/exam-importance",
    },
    {
      icon: "share-nodes",
      title: "المشاركة الالكترونية",
      link: "/e-participation",
    },
    {
      icon: "building-columns",
      title: "اللجنة الاستشارية الدولية",
      link: "/international-advisory-committee",
    },
    {
      icon: "badge-check",
      title: "المؤسسات والدول التي تقبل همزة",
      link: "/accepted-institutions-countries",
    },
    {
      icon: "message-circle",
      title: "تواصل معنا",
      link: "/contact",
    },
  ];

  const aboutPagesCard = aboutPages.map((page, index) => {
    return (
      <Card
        key={index}
        icon={page.icon}
        title={page.title}
        buttonIconOnly={true}
        linkPrimaryAction={page.link}
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
