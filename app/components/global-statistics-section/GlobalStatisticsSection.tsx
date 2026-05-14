"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Dropdown from "@/app/components/dropdown/Dropdown";
import Card from "../card/Card";
import { st } from "@/app/_lib/static-text";
import "./GlobalStatisticsSection.css";
import {
  getCountryStats,
  getCountryDropdownOptions,
} from "./countryStatsData";
import type {
  ParsedStatisticsData,
  FilterType,
  CSVStatEntry,
} from "@/app/_lib/statistics-csv-service";
import {
  resolveCSVStats,
  buildDropdownOptions,
} from "@/app/_lib/statistics-csv-service";

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
  /** CSV-based statistics data; when provided, enables full filter support */
  csvData?: ParsedStatisticsData | null;
}

const DEFAULT_ICONS = [
  "building-06",
  "user-group",
  "globe-02",
  "certificate-01",
];

/* ========================================================================
   Helpers
   ======================================================================== */

function useCSVStats(csvData: ParsedStatisticsData | null | undefined) {
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [selectedExamType, setSelectedExamType] = useState("global");
  const [selectedYear, setSelectedYear] = useState("global");
  const [selectedNationality, setSelectedNationality] = useState("global");
  const [lastActiveFilter, setLastActiveFilter] = useState<FilterType>("country");

  const countryOptions = useMemo(() => {
    if (!csvData) return [];
    return buildDropdownOptions(
      csvData.countryStats,
      st("statistics", "globalOption")
    );
  }, [csvData]);

  const examTypeOptions = useMemo(() => {
    if (!csvData) return [];
    return buildDropdownOptions(
      csvData.examTypeStats,
      st("statistics", "globalOption")
    );
  }, [csvData]);

  const yearOptions = useMemo(() => {
    if (!csvData) return [];
    return buildDropdownOptions(
      csvData.yearStats,
      st("statistics", "globalOption")
    );
  }, [csvData]);

  const nationalityOptions = useMemo(() => {
    if (!csvData) return [];
    return buildDropdownOptions(
      csvData.nationalityStats,
      st("statistics", "globalOption")
    );
  }, [csvData]);

  const handleCountryChange = useCallback((opt: any) => {
    setSelectedCountry(opt?.value || "global");
    setLastActiveFilter("country");
  }, []);

  const handleExamTypeChange = useCallback((opt: any) => {
    setSelectedExamType(opt?.value || "global");
    setLastActiveFilter("examType");
  }, []);

  const handleYearChange = useCallback((opt: any) => {
    setSelectedYear(opt?.value || "global");
    setLastActiveFilter("year");
  }, []);

  const handleNationalityChange = useCallback((opt: any) => {
    setSelectedNationality(opt?.value || "global");
    setLastActiveFilter("nationality");
  }, []);

  const resolvedStats = useMemo(() => {
    if (!csvData) return null;
    const valueMap: Record<FilterType, string> = {
      country: selectedCountry,
      examType: selectedExamType,
      year: selectedYear,
      nationality: selectedNationality,
    };
    return resolveCSVStats(csvData, lastActiveFilter, valueMap[lastActiveFilter]);
  }, [csvData, lastActiveFilter, selectedCountry, selectedExamType, selectedYear, selectedNationality]);

  return {
    selectedCountry,
    selectedExamType,
    selectedYear,
    selectedNationality,
    countryOptions,
    examTypeOptions,
    yearOptions,
    nationalityOptions,
    handleCountryChange,
    handleExamTypeChange,
    handleYearChange,
    handleNationalityChange,
    resolvedStats,
  };
}

/* ========================================================================
   Component
   ======================================================================== */

function GlobalStatisticsSection({
  translations,
  countries = [],
  statistics,
  csvData,
}: GlobalStatisticsSectionProps) {
  const isCSVMode = Boolean(csvData);

  /* ------------------------------------------------------------------
     Liferay / Registry path (existing behaviour)
     ------------------------------------------------------------------ */
  const [selectedCountry, setSelectedCountry] = useState("global");

  const countryOptions = useMemo(
    () => getCountryDropdownOptions(countries, st("statistics", "globalOption")),
    [countries]
  );

  const registryStats = useMemo(() => {
    if (statistics && statistics.length > 0) return statistics;
    const resolved = getCountryStats(selectedCountry, translations);
    const t = translations || {};
    return [
      {
        numberTitle: resolved.totalCandidates,
        descriptionText:
          t["hamza-home-page-map-total-labs-title"] || st("statistics", "statCenters"),
      },
      {
        numberTitle: resolved.nationalities,
        descriptionText:
          t["hamza-home-page-map-nationalities-title"] || st("statistics", "statNationalities"),
      },
      {
        numberTitle: resolved.onsiteExams,
        descriptionText:
          t["hamza-home-page-map-onsite-exams-title"] || st("statistics", "statCountries"),
      },
      {
        numberTitle: resolved.institutions,
        descriptionText:
          t["hamza-home-page-map-institutions-title"] || st("statistics", "statTesters"),
      },
    ];
  }, [selectedCountry, translations, statistics]);

  /* ------------------------------------------------------------------
     CSV path
     ------------------------------------------------------------------ */
  const csv = useCSVStats(csvData);

  const csvStats = useMemo((): StatisticItem[] => {
    if (!csv.resolvedStats) return [];
    const r = csv.resolvedStats;
    return [
      {
        numberTitle: r.totalTestTakers,
        descriptionText: st("statistics", "statTotalTestTakers"),
      },
      {
        numberTitle: r.nationalities,
        descriptionText: st("statistics", "statNationalities"),
      },
      {
        numberTitle: r.numberOfTests,
        descriptionText: st("statistics", "statNumberOfTests"),
      },
      {
        numberTitle: r.participatingInstitutions,
        descriptionText: st("statistics", "statParticipatingInstitutions"),
      },
    ];
  }, [csv.resolvedStats]);

  /* ------------------------------------------------------------------
     Render
     ------------------------------------------------------------------ */
  const stats = isCSVMode ? csvStats : registryStats;

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
              {translations?.["hamza-home-page-map-search-text"] || st("statistics", "countryLabel")}
            </label>
            <Dropdown
              placeholder={
                translations?.["hamza-home-page-map-search-place-holder-text"] ||
                st("statistics", "countryPlaceholder")
              }
              variant="default"
              optionLabel="label"
              trackBy="value"
              extraClass="w-full"
              value={isCSVMode ? csv.selectedCountry : selectedCountry}
              options={isCSVMode ? csv.countryOptions : countryOptions}
              getSelectedOptions={
                isCSVMode
                  ? csv.handleCountryChange
                  : (opt: any) => setSelectedCountry(opt?.value || "global")
              }
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              {translations?.["hamza-home-page-map-test-type-title"] || st("statistics", "testTypeLabel")}
            </label>
            <Dropdown
              placeholder={
                translations?.["hamza-home-page-map-academic-test-title"] ||
                st("statistics", "testTypePlaceholder")
              }
              variant="default"
              optionLabel="label"
              trackBy="value"
              extraClass="w-full"
              value={isCSVMode ? csv.selectedExamType : undefined}
              options={
                isCSVMode
                  ? csv.examTypeOptions
                  : [
                      {
                        label:
                          translations?.["hamza-home-page-map-academic-hamza-title"] ||
                          st("statistics", "testAcademic"),
                        value: "academic",
                      },
                      {
                        label:
                          translations?.["hamza-home-page-map-academic-test-title"] ||
                          st("statistics", "testGeneral"),
                        value: "general",
                      },
                      {
                        label:
                          translations?.["hamza-home-page-map-level-test-title"] ||
                          st("statistics", "testPlacement"),
                        value: "placement",
                      },
                      {
                        label:
                          translations?.["hamza-home-page-map-vocabulary-test-title"] ||
                          st("statistics", "testVocabulary"),
                        value: "vocabulary",
                      },
                    ]
              }
              getSelectedOptions={isCSVMode ? csv.handleExamTypeChange : undefined}
            />
          </div>

          <div className="input-group">
            <Dropdown
              label={st("statistics", "yearLabel")}
              placeholder="2026"
              variant="default"
              optionLabel="label"
              trackBy="value"
              extraClass="w-full"
              value={isCSVMode ? csv.selectedYear : undefined}
              options={
                isCSVMode
                  ? csv.yearOptions
                  : [
                      { label: "2026", value: "2026" },
                      { label: "2025", value: "2025" },
                      { label: "2024", value: "2024" },
                      { label: "2023", value: "2023" },
                    ]
              }
              getSelectedOptions={isCSVMode ? csv.handleYearChange : undefined}
            />
          </div>

          <div className="input-group">
            <label className="input-label">
              {translations?.["hamza-home-page-map-nationality-text"] || st("statistics", "nationalityLabel")}
            </label>
            <Dropdown
              placeholder={
                translations?.["hamza-home-page-map-nationality-text"] ||
                st("statistics", "nationalityPlaceholder")
              }
              variant="default"
              optionLabel="label"
              trackBy="value"
              extraClass="w-full"
              value={isCSVMode ? csv.selectedNationality : undefined}
              options={
                isCSVMode
                  ? csv.nationalityOptions
                  : countries.slice(0, 10).map((c) => ({
                      label: c.name,
                      value: c.code,
                    }))
              }
              getSelectedOptions={isCSVMode ? csv.handleNationalityChange : undefined}
            />
          </div>
        </div>

        <Image
          src="/assets/image/global.png"
          alt={
            translations?.["hamza-home-page-map-globe-title"] ||
            st("statistics", "globeAlt")
          }
          width={1200}
          height={600}
          className="w-full md:w-[70%]"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 70vw"
          quality={50}
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
