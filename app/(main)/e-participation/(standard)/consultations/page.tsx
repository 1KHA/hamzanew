import Card from "@/app/components/card/Card";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  return {
    title: st("eParticipation", "consultationTitle", locale),
    description: st("eParticipation", "consultationsMetaDesc", locale),
  };
}

/**
 * Electronic Consultations Page Component
 *
 * Renders a list of external consultation platforms as interactive cards,
 * allowing users to participate in public opinion and policy discussions.
 * This is a Server Component for optimal performance and SEO.
 *
 * @accessibility
 * - Uses a semantic `<section>` element with an `aria-label` to group the
 *   platform listing for screen reader navigation.
 * - Uses `<ul>` / `<li>` list semantics so assistive technologies announce
 *   the number of available platforms to the user.
 * - Each platform description is wrapped in a `<p>` tag with an `id` that
 *   is referenced by the card via `aria-describedby`, linking the
 *   descriptive text to the interactive control.
 * - Each `<li>` receives the `key` prop (not the inner Card), preventing
 *   React reconciliation warnings without sacrificing semantics.
 * - External links are flagged with `external={true}` so the Card
 *   component opens them in a new tab with `noopener,noreferrer`.
 * - The overall page heading is provided by the parent layout's
 *   `<PageHero>` component, keeping a single `<h1>` per page.
 */
export default async function ConsultationsPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  /**
   * Static data for available electronic consultation platforms.
   * Each entry contains an accessible name, a public URL, and a
   * brief description of what the platform offers.
   */
  const platforms = [
    {
      id: "istitlaa",
      name: st("eParticipation", "platformIstitlaaName", locale),
      path: "https://istitlaa.ncc.gov.sa/ar/Pages/default.aspx",
      description: st("eParticipation", "platformIstitlaaDesc", locale),
    },
    {
      id: "tafaol",
      name: st("eParticipation", "platformTafaolName", locale),
      path: "https://eparticipation.my.gov.sa/",
      description: st("eParticipation", "platformTafaolDesc", locale),
    },
  ];

  return (
    <>
      <div className="content">
        {/*
         * Primary landmark section for the consultation platforms listing.
         * The `aria-label` provides an accessible name so screen readers can
         * describe this region when the user navigates between landmarks.
         */}
        <section
          className="section-spacing-5xl"
          aria-label={st("eParticipation", "consultationsListAria", locale)}
        >
          {/*
           * Unordered list of platforms.
           * Using list semantics ensures screen readers announce the count
           * (e.g. "list, 2 items") and allow item-by-item navigation.
           */}
          <ul className="!grid !gap-8 !mt-[40px] list-none p-0 m-0">
            {platforms.map((platform) => (
              /*
               * Each list item groups the platform description and its
               * interactive card together as a single navigable unit.
               * The `key` prop is placed here — on the outermost rendered
               * element — as required by React's reconciliation algorithm.
               */
              <li key={platform.id} className="!grid !gap-4">
                <p
                  id={`desc-${platform.id}`}
                  className="text-md-regular !leading-[24px]"
                >
                  {platform.description}
                </p>

                <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3">
                  <Card
                    title={platform.name}
                    style={{
                      border: "none",
                      boxShadow:
                        "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
                    }}
                    primaryTrailIconType="link-square-01"
                    buttonIconOnly={true}
                    linkSecondaryAction={platform.path}
                    external={true}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
