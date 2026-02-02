"use client";
import Card from "@/app/components/card/Card";

export default function page() {
  const socialMedia = [
    {
      logo: "new-twitter",
      name: "منصة اكس",
      link: "#",
    },
    {
      logo: "youtube",
      name: "يوتيوب",
      link: "#",
    },
    {
      logo: "facebook-02",
      name: "فيسبوك",
      link: "#",
    },
    {
      logo: "snapchat",
      name: "سناب شات",
      link: "#",
    },
    {
      logo: "linkedin-02",
      name: "لينكدان",
      link: "#",
    },
    {
      logo: "instagram",
      name: "انستقرام",
      link: "#",
    },
  ];

  const socailMediaCards = socialMedia.map((item, index) => {
    return (
      <Card
        key={index}
        style={{
          border: "none",
          boxShadow:
            "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
        }}
        title={item.name}
        icon={item.logo}
        primaryTrailIconType="arrow"
        buttonIconOnly={true}
        linkSecondaryAction={item.link}
        external={true}
      />
    );
  });
  return (
    <div className="custom-container">
      <div className="section-spacing-5xl">
        <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
          {socailMediaCards}
        </div>
      </div>
    </div>
  );
}
