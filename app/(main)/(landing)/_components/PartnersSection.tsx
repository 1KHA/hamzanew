"use client";

import { useState, useMemo } from "react";
import Carousel from "@/app/components/carousel/Carousel";
import { DgaTabs } from "@/app/components/tabs/DgaTabs";
import { t } from "@/app/_lib/translationContext";
import { Partner } from "../_data/homeData";

interface Entity {
  id: number;
  name: string;
  image: string;
}

interface PartnersSectionProps {
  insideEntities?: Entity[];
  outsideEntities?: Entity[];
  insideTitle?: string;
  outsideTitle?: string;
  translations?: Record<string, string> | null;
  fallbackPartners?: Partner[];
}

export default function PartnersSection({
  insideEntities = [],
  outsideEntities = [],
  insideTitle,
  outsideTitle,
  translations,
  fallbackPartners = [],
}: PartnersSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Determine which list to show based on active tab and data availability
  const currentEntities = useMemo(() => {
    const list = activeTab === 0 ? insideEntities : outsideEntities;
    // Fall back to static partners if the selected tab has no data
    return list.length > 0 ? list : fallbackPartners;
  }, [activeTab, insideEntities, outsideEntities, fallbackPartners]);

  // Use the title from Liferay content, falling back to a default
  const sectionTitle = activeTab === 0
    ? (insideTitle || "الشركاء")
    : (outsideTitle || insideTitle || "الشركاء");

  return (
    <div className="bg-white">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label={sectionTitle}
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">{sectionTitle}</h2>
          </div>
          <DgaTabs
            tabsList={[
              {
                label: t("hamza-inside-saudi-arabia", translations) || "داخل المملكة العربية السعودية",
                tabIcon: "flag-02",
              },
              {
                label: t("hamza-outside-saudi-arabia", translations) || "دول أخرى",
                tabIcon: "globe-02",
              },
            ]}
            onTabChange={(index) => setActiveTab(index)}
            activeTab={activeTab}
          />
        </div>
        <div aria-label="قائمة الشركاء">
          <Carousel
            itemsPerSlide={6}
            gap={20}
            showArrows
            arrowRadius="20%"
            arrowBgColor="#F3F4F6"
          >
            {currentEntities.map((entity) => (
              <div
                key={`partner-${entity.id}`}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white p-4"
                style={{ height: "120px", textAlign: "center" }}
              >
                {entity.image ? (
                  <img
                    src={entity.image}
                    alt={entity.name}
                    className="max-h-[80px] max-w-[140px] object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                    loading="lazy"
                  />
                ) : (
                  <span className="text-sm-regular text-gray-500">
                    {entity.name}
                  </span>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}
