"use client";
import { useState, useMemo } from "react";
import { DgaDropdown } from "platformscode-new-react";
import Card from "../card/Card";
import "./GlobalStatisticsSection.css";
import {
  getCountryStats,
  getCountryDropdownOptions,
} from "./countryStatsData";

export interface StatisticItem {
  numberTitle: string;
  descriptionText: string;
}

interface Country {
  code: string;
  name: string;
}

interface GlobalStatisticsSectionProps {
  translations?: Record<string, string> | null;
  countries?: Country[];
  /** @deprecated Use translations prop instead */
  statistics?: StatisticItem[];
}

const DEFAULT_ICONS = [
  "building-06",
  "user-group",
  "globe-02",
  "certificate-01",
];

function GlobalStatisticsSection({
  translations,
  countries = [],
  statistics,
}: GlobalStatisticsSectionProps) {
  const [selectedCountry, setSelectedCountry] = useState("global");

  // Build dropdown options from countries that have stats
  const countryOptions = useMemo(
    () => getCountryDropdownOptions(countries),
    [countries]
  );

  // Resolve stats based on selected country
  const stats = useMemo(() => {
    // Backward compatibility: if statistics prop is provided, use it directly
    if (statistics && statistics.length > 0) return statistics;

    const resolved = getCountryStats(selectedCountry, translations);
    const t = translations || {};

    return [
      {
        numberTitle: resolved.totalCandidates,
        descriptionText:
          t["hamza-home-page-map-total-labs-title"] || "مراكز الاختبار",
      },
      {
        numberTitle: resolved.nationalities,
        descriptionText:
          t["hamza-home-page-map-nationalities-title"] || "عدد الجنسيات",
      },
      {
        numberTitle: resolved.onsiteExams,
        descriptionText:
          t["hamza-home-page-map-onsite-exams-title"] || "عدد الدول",
      },
      {
        numberTitle: resolved.institutions,
        descriptionText:
          t["hamza-home-page-map-institutions-title"] || "مختبر عالميًا",
      },
    ];
  }, [selectedCountry, translations, statistics]);

  const statsCards = stats.map((stat, index) => {
    const icon = DEFAULT_ICONS[index % DEFAULT_ICONS.length];
    return (
      <Card
        style={{
          border: "none",
          boxShadow:
            "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
        }}
        key={index}
        title={stat.numberTitle}
        description={stat.descriptionText}
        icon={icon}
        iconPosition="left"
        contentAlignment="center"
        titleClass="display-md-bold"
        titleColor="#14573A"
        descriptionClass="text-sm-regular"
        descriptionColor="#1F2A37"
      />
    );
  });

  return (
    <>
      <div className="global-statistics-section">
        {/* Filters section */}
        <div className="search-container">
          <div className="input-group">
            <label className="input-label">
              {translations?.["hamza-home-page-map-search-text"] || "الدولة"}
            </label>
            <DgaDropdown
              placeholder={
                translations?.["hamza-home-page-map-search-place-holder-text"] ||
                "اختر الدولة..."
              }
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              value={selectedCountry}
              options={countryOptions}
              getSelectedOptions={(opt: any) => setSelectedCountry(opt?.value || "global")}
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              {translations?.["hamza-home-page-map-test-type-title"] || "نوع الاختبار"}
            </label>
            <DgaDropdown
              placeholder={
                translations?.["hamza-home-page-map-academic-test-title"] ||
                "اختبار عام"
              }
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={[
                {
                  label:
                    translations?.["hamza-home-page-map-academic-hamza-title"] ||
                    "اختبار أكاديمي",
                  value: "academic",
                },
                {
                  label:
                    translations?.["hamza-home-page-map-academic-test-title"] ||
                    "اختبار عام",
                  value: "general",
                },
                {
                  label:
                    translations?.["hamza-home-page-map-level-test-title"] ||
                    "تحديد المستوى",
                  value: "placement",
                },
                {
                  label:
                    translations?.["hamza-home-page-map-vocabulary-test-title"] ||
                    "مفردات",
                  value: "vocabulary",
                },
              ]}
            />
          </div>
          <div className="input-group">
            <label className="input-label">السنة</label>
            <DgaDropdown
              placeholder="2026"
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={[
                { label: "2026", value: "2026" },
                { label: "2025", value: "2025" },
                { label: "2024", value: "2024" },
                { label: "2023", value: "2023" },
              ]}
            />
          </div>
          <div className="input-group">
            <label className="input-label">
              {translations?.["hamza-home-page-map-nationality-text"] || "الجنسية"}
            </label>
            <DgaDropdown
              placeholder={
                translations?.["hamza-home-page-map-nationality-text"] ||
                "اختر الجنسية"
              }
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={countries.slice(0, 10).map((c) => ({
                label: c.name,
                value: c.code,
              }))}
            />
          </div>
        </div>

        <img
          src="/assets/image/global.png"
          alt={
            translations?.["hamza-home-page-map-globe-title"] ||
            "خريطة إحصائيات همزة"
          }
          className="w-full md:w-[70%]"
        />
        {/* statistics section */}
        <div className="cards-wrapper">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px] w-full">
            {statsCards}
          </div>
        </div>
      </div>
    </>
  );
}

export default GlobalStatisticsSection;
