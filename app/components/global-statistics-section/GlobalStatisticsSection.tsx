"use client";
import { useState, useMemo, useCallback } from "react";
import { DgaDropdown } from "platformscode-new-react";
import Card from "../card/Card";
import SearchBox from "@/app/components/search-box/SearchBox";
import "./GlobalStatisticsSection.css";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return countries.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, countries]);

  const handleSelectCountry = useCallback((name: string) => {
    setSearchQuery(name);
    setShowDropdown(false);
  }, []);

  // Build stats from translations with fallback
  const stats: StatisticItem[] = useMemo(() => {
    // Backward compatibility: if statistics prop is provided, use it directly
    if (statistics && statistics.length > 0) return statistics;

    const t = translations || {};
    return [
      {
        numberTitle:
          t["hamza-total-candidates-globally-stated"] || "1.5M",
        descriptionText:
          t["hamza-home-page-map-total-labs-title"] || "مراكز الاختبار",
      },
      {
        numberTitle:
          t["hamza-nationalities-globally-stated"] || "12",
        descriptionText:
          t["hamza-home-page-map-nationalities-title"] || "عدد الجنسيات",
      },
      {
        numberTitle:
          t["hamza-onsite-exams-globally-stated"] || "22",
        descriptionText:
          t["hamza-home-page-map-onsite-exams-title"] || "عدد الدول",
      },
      {
        numberTitle:
          t["hamza-institutions-globally-stated"] || "1.5k",
        descriptionText:
          t["hamza-home-page-map-institutions-title"] || "مختبر عالميًا",
      },
    ];
  }, [translations, statistics]);

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
        {/* Search section */}
        <div className="search-container">
          <div className="relative w-full">
            <SearchBox
              label={translations?.["hamza-home-page-map-search-text"] || "ابحث عن الدولة"}
              placeholder={
                translations?.["hamza-home-page-map-search-place-holder-text"] ||
                "ابحث عن الدولة..."
              }
              size="lg"
              variant="default"
              value={searchQuery}
              onChange={(value) => {
                setSearchQuery(value);
                setShowDropdown(true);
              }}
              onClear={() => {
                setSearchQuery("");
                setShowDropdown(false);
              }}
            />
            {/* Country autocomplete dropdown */}
            {showDropdown && filteredCountries.length > 0 && (
              <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                {filteredCountries.map((country) => (
                  <li
                    key={country.code}
                    className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleSelectCountry(country.name)}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            )}
            {showDropdown &&
              searchQuery.trim() &&
              filteredCountries.length === 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-500 shadow-lg">
                  {translations?.["hamza-home-page-map-no-results-text"] ||
                    "لا توجد نتائج"}
                </div>
              )}
          </div>

          <div className="input-group">
            <label className="input-label">
              {translations?.["hamza-home-page-map-test-type-title"] || "نوع الاختبار"}
            </label>
            <DgaDropdown
              placeholder={translations?.["hamza-home-page-map-academic-test-title"] || "اختبار عام"}
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={[
                {
                  label: translations?.["hamza-home-page-map-academic-hamza-title"] || "اختبار أكاديمي",
                  value: "academic",
                },
                {
                  label: translations?.["hamza-home-page-map-academic-test-title"] || "اختبار عام",
                  value: "general",
                },
                {
                  label: translations?.["hamza-home-page-map-level-test-title"] || "تحديد المستوى",
                  value: "placement",
                },
                {
                  label: translations?.["hamza-home-page-map-vocabulary-test-title"] || "مفردات",
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
              placeholder={translations?.["hamza-home-page-map-nationality-text"] || "اختر الجنسية"}
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
          alt={translations?.["hamza-home-page-map-globe-title"] || "خريطة إحصائيات همزة"}
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
