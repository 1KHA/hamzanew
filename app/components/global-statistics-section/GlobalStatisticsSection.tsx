"use client";
import { DgaDropdown } from "platformscode-new-react";
import Card from "../card/Card";
import SearchBox from "@/app/components/search-box/SearchBox";
import "./GlobalStatisticsSection.css";

export interface StatisticItem {
  numberTitle: string;
  descriptionText: string;
}

interface GlobalStatisticsSectionProps {
  statistics?: StatisticItem[];
}

const DEFAULT_ICONS = [
  "building-06",
  "user-group",
  "globe-02",
  "certificate-01",
];

const DEFAULT_STATS: StatisticItem[] = [
  { numberTitle: "1.5k", descriptionText: "مراكز الاختبار" },
  { numberTitle: "12", descriptionText: "عدد الجنسيات" },
  { numberTitle: "22", descriptionText: "عدد الدول" },
  { numberTitle: "1.5M", descriptionText: "مختبر عالميًا" },
];

function GlobalStatisticsSection({
  statistics = DEFAULT_STATS,
}: GlobalStatisticsSectionProps) {
  const statsCards = statistics.map((stat, index) => {
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
          <SearchBox
            label="ابحث عن الدولة"
            placeholder="ابحث عن الدولة..."
            size="lg"
            variant="default"
          />
          <div className="input-group">
            <label className="input-label">نوع الاختبار</label>
            <DgaDropdown
              placeholder="اختبار عام"
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={[
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
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
                {
                  label: "2026",
                  value: "2026",
                },
                {
                  label: "2025",
                  value: "2025",
                },
                {
                  label: "2024",
                  value: "2024",
                },
                {
                  label: "2023",
                  value: "2023",
                },
              ]}
            />
          </div>
          <div className="input-group">
            <label className="input-label">الجنسية</label>
            <DgaDropdown
              placeholder="امريكية"
              variant="default"
              optionLabel="label"
              trackBy="value"
              className="w-full"
              options={[
                {
                  label: "امريكية",
                  value: "امريكية",
                },
                {
                  label: "بريطانية",
                  value: "بريطانية",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
                {
                  label: "اختبار عام",
                  value: "اختبار عام",
                },
              ]}
            />
          </div>
        </div>

        <img
          src="/assets/image/global.png"
          alt="Global Statistics Background"
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
