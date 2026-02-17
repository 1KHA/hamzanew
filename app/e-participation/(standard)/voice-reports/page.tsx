import Card from "@/app/components/card/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تقارير صوت المستفيد",
  description:
    "مجموعة من التقارير السنوية لصوت المستفيد التي توضح آراء ومقترحات المستفيدين لتحسين الخدمات.",
};

/**
 * Voice Reports Page Component
 *
 * Displays a collection of annual "Voice of the Beneficiary" reports available for download.
 *
 * @accessibility
 * - Uses semantic `<ul>` and `<li>` structure to group the report cards.
 * - Provides descriptive names for each report.
 * - Each card includes a primary action button labeled "تحميل الملف" (Download File) with an appropriate icon.
 */
export default function page() {
  /**
   * List of annual reports.
   * Each entry contains the report year/name and the download path.
   */
  const data = [
    {
      id: 1,
      name: " تقارير صوت المستفيد لعام (2024)",
      path: "#",
    },
    {
      id: 2,
      name: " تقارير صوت المستفيد لعام (2023)",
      path: "#",
    },
    {
      id: 3,
      name: " تقارير صوت المستفيد لعام (2022)",
      path: "#",
    },
    {
      id: 4,
      name: " تقارير صوت المستفيد لعام (2021)",
      path: "#",
    },
    {
      id: 5,
      name: " تقارير صوت المستفيد لعام (2020)",
      path: "#",
    },
    {
      id: 6,
      name: " تقارير صوت المستفيد لعام (2019)",
      path: "#",
    },
  ];

  return (
    <>
      <div className="custom-container">
        <section
          className="section-spacing-5xl"
          aria-label="قائمة تقارير صوت المستفيد"
        >
          {/*
           * Reports Grid
           * Rendered as an unordered list for better semantic structure and screen reader navigation.
           */}
          <ul className="data-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] !mt-[40px] list-none p-0 m-0">
            {data.map((report) => (
              <li key={report.id}>
                <Card
                  title={report.name}
                  linkPrimaryAction={report.path}
                  primaryActionLabel="تحميل الملف"
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
