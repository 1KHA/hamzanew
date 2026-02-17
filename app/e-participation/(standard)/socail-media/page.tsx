import Card from "@/app/components/card/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "وسائل التواصل الاجتماعي",
};

/**
 * Social Media Page Component
 *
 * Renders a grid of social media links as interactive cards.
 * This is a Server Component that leverages the Client-Side `Card` component
 * for interactivity (routing/linking), ensuring optimal performance and SEO.
 *
 * @accessibility
 * - Uses semantic `<section>` and `<ul>` tags for the list of social media links.
 * - Each card serves as a navigational element with clear labeling via the `title` prop.
 * - Cards are marked as external links where appropriate.
 */
export default function page() {
  /**
   * Data source for social media platforms.
   * Defines the visual assets (logo), accessible name, and destination URL for each platform.
   */
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

  return (
    <>
      <div className="custom-container">
        <section
          className="section-spacing-5xl"
          aria-label="قائمة وسائل التواصل الاجتماعي"
        >
          {/*
           * Grid Layout
           * Uses a list structure (<ul>, <li>) for better screen reader navigation of the items.
           * The grid classes handle the visual layout responsive behavior.
           */}
          <ul className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8 list-none p-0 m-0">
            {socialMedia.map((item, index) => (
              <li key={index}>
                <Card
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
                  // Ensure specific accessibility attributes are passed if Card supports them,
                  // primarily relying on the semantic structure of the Card itself.
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
