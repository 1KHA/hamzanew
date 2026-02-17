import Card from "@/app/components/card/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المشاركة الإلكترونية",
  description:
    "شارك في صنع القرار وتحسين الخدمات من خلال أدوات المشاركة الإلكترونية المختلفة مثل الاستشارات، التطوير المشترك، والمقترحات.",
};

/**
 * E-Participation Hub Page
 *
 * This component renders the main dashboard for E-Participation, linking to various
 * sub-sections like consultations, reports, and open data.
 *
 * @accessibility
 * - Uses semantic `<h1>` for the main page title.
 * - Organizes navigation links into a structured grid layout.
 * - Each card serves as a clear entry point to a specific e-participation tool.
 */
export default function page() {
  /**
   * Navigation items configuration.
   * Defines the title and destination route for each participation module.
   */
  const pageContent = [
    {
      title: "سياسة المشاركة الإلكترونية",
      link: "/e-participation/policy",
    },
    {
      title: "الإستشارات الإلكترونية",
      link: "/e-participation/consultations",
    },
    {
      title: "التطوير المشترك والافكار",
      link: "/e-participation/co-creation",
    },
    {
      title: "البيانات المفتوحة",
      link: "/e-participation/open-data",
    },
    {
      title: "الشكاوى والمقترحات",
      link: "/e-participation/feedback-and-suggestion",
    },
    {
      title: "تقارير صوت المستفيد",
      link: "/e-participation/voice-reports",
    },
    {
      title: "إحصائيات الموقع والخدمات",
      link: "/e-participation/services-statistics",
    },
    {
      title: "وسائل التواصل الاجتماعي",
      link: "/e-participation/socail-media",
    },
  ];

  return (
    <>
      <div className="content">
        <section
          className="!flex !flex-col !gap-8 section-spacing-5xl"
          aria-labelledby="participation-topics-title"
        >
          <div className="!flex !flex-col !gap-[16px]">
            <h1 id="participation-topics-title" className="display-sm-semibold">
              مواضيع المشاركة
            </h1>
            <p className="text-md-regular">
              هذا مثال على وصف القسم في نظام التصميم، حيث يتم الحفاظ على نفس
              النمط المتسق عبر جميع الأقسام الأخرى. هذا مثال على وصف القسم في
              نظام التصميم، حيث يتم الحفاظ على نفس النمط المتسق عبر جميع الأقسام
              الأخرى.
            </p>
          </div>

          {/*
           * Navigation Grid
           * Renders a responsive grid of cards linking to different sections.
           * Using a semantic list structure if possible, but maintaining grid classes.
           */}
          <div
            className="!grid !grid-cols-1 md:!grid-cols-4 !gap-8"
            role="list"
          >
            {pageContent.map((item, index) => (
              <div role="listitem" key={item.link}>
                <Card
                  style={{
                    border: "none",
                    boxShadow:
                      "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
                  }}
                  title={item.title}
                  primaryTrailIconType="arrow"
                  buttonIconOnly={true}
                  linkSecondaryAction={item.link}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
