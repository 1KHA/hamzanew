"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/button/Button";
import GlobalStatisticsSection from "@/app/components/global-statistics-section/GlobalStatisticsSection";
import { st } from "@/app/_lib/static-text";
import type { ParsedStatisticsData } from "@/app/_lib/statistics-csv-service";

interface StatisticsSectionProps {
  translations?: Record<string, string> | null;
  countries?: { code: string; name: string }[];
  csvData?: ParsedStatisticsData | null;
}

export default function StatisticsSection({
  translations,
  countries,
  csvData,
}: StatisticsSectionProps) {
  const router = useRouter();

  return (
    <div className="bg-neutral-50">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label={st("statistics", "sectionAria")}
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">
              {translations?.["hamza-home-page-map-title"] || st("statistics", "headingFallback")}
            </h2>
            <Button
              label={st("statistics", "showAll")}
              variant="secondary-outline"
              size="md"
              onClick={() => router.push("/statistics-and-reports")}
            />
          </div>
          <p className="text-md-regular">
            {translations?.["hamza-home-page-map-institutions-description"] ||
              st("statistics", "descriptionFallback")}
          </p>
        </div>
        <div aria-label={st("statistics", "statsAria")}>
          <GlobalStatisticsSection
            translations={translations}
            countries={countries}
            csvData={csvData}
          />
        </div>
      </section>
    </div>
  );
}
