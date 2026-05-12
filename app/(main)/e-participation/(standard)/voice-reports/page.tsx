import Card from "@/app/components/card/Card";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  return {
    title: st("eParticipation", "voiceReportsTitle", locale),
    description: st("eParticipation", "voiceReportsMetaDesc", locale),
  };
}

/**
 * Voice Reports Page Component
 *
 * Displays a collection of annual "Voice of the Beneficiary" reports available for download.
 *
 * @accessibility
 * - Uses semantic `<ul>` and `<li>` structure to group the report cards.
 * - Provides descriptive names for each report.
 * - Each card includes a primary action button labeled with a download icon.
 */
export default async function page() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  /**
   * List of annual reports.
   * Each entry contains the report year/name and the download path.
   */
  const data = [
    { id: 1, year: "2024", path: "#" },
    { id: 2, year: "2023", path: "#" },
    { id: 3, year: "2022", path: "#" },
    { id: 4, year: "2021", path: "#" },
    { id: 5, year: "2020", path: "#" },
    { id: 6, year: "2019", path: "#" },
  ];

  return (
    <>
      <div className="custom-container">
        <section
          className="section-spacing-5xl"
          aria-label={st("eParticipation", "voiceReportsListAria", locale)}
        >
          {/*
           * Reports Grid
           * Rendered as an unordered list for better semantic structure and screen reader navigation.
           */}
          <ul className="data-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] !mt-[40px] list-none p-0 m-0">
            {data.map((report) => (
              <li key={report.id}>
                <Card
                  title={st("eParticipation", "voiceReportYear", locale).replace("{year}", report.year)}
                  linkPrimaryAction={report.path}
                  primaryActionLabel={st("eParticipation", "downloadFile", locale)}
                  buttonColor="secondary"
                  showPrimaryAction={true}
                  primaryTrailIconType="download-04"
                  showPrimaryIcon
                  // Ensure button is accessible; Card component handles the button logic and focus states.
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
