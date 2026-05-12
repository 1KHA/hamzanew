import Card from "@/app/components/card/Card";
import { st } from "@/app/_lib/static-text-server";
import { cookies } from "next/headers";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("eParticipation", "eParticipationTitle", locale),
  };
}

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
export default async function page() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  /**
   * Navigation items configuration.
   * Defines the title and destination route for each participation module.
   */
  const pageContent = [
    {
      title: st("eParticipation", "policyCardTitle", locale),
      link: "/e-participation/policy",
    },
    {
      title: st("eParticipation", "consultationCardTitle", locale),
      link: "/e-participation/consultations",
    },
    {
      title: st("eParticipation", "coCreationTitle", locale),
      link: "/e-participation/co-creation",
    },
    {
      title: st("eParticipation", "openDataCardTitle", locale),
      link: "/e-participation/open-data",
    },
    {
      title: st("eParticipation", "feedbackCardTitle", locale),
      link: "/e-participation/feedback-and-suggestion",
    },
    {
      title: st("eParticipation", "voiceReportsTitle", locale),
      link: "/e-participation/voice-reports",
    },
    {
      title: st("eParticipation", "statsCardTitle", locale),
      link: "/e-participation/services-statistics",
    },
    {
      title: st("eParticipation", "socialMediaCardTitle", locale),
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
              {st("eParticipation", "topicsHeading", locale)}
            </h1>
            <p className="text-md-regular">
              {st("eParticipation", "topicsDescription", locale)}
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
