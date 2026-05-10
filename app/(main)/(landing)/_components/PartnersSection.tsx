"use client";

import { useState, useMemo, useId } from "react";
import ContentSwitcher from "@/app/components/content-switcher/ContentSwitcher";
import Carousel from "@/app/components/carousel/Carousel";
import { t } from "@/app/_lib/translationContext";
import { st } from "@/app/_lib/static-text";
import { Partner } from "../_data/homeData";
import "./partners-section.css";

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
  const switcherId = useId();

  // Determine which list to show based on active tab and data availability
  const currentEntities = useMemo(() => {
    const list = activeTab === 0 ? insideEntities : outsideEntities;
    // Fall back to static partners if the selected tab has no data
    return list.length > 0 ? list : fallbackPartners;
  }, [activeTab, insideEntities, outsideEntities, fallbackPartners]);

  // Use the title from Liferay content, falling back to a default
  const sectionTitle = activeTab === 0
    ? (insideTitle || st("partners", "sectionFallback"))
    : (outsideTitle || insideTitle || st("partners", "sectionFallback"));

  const switcherItems = [
    {
      label: t("hamza-inside-saudi-arabia", translations) || st("partners", "tabInside"),
    },
    {
      label: t("hamza-outside-saudi-arabia", translations) || st("partners", "tabOutside"),
    },
  ];

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
          <ContentSwitcher
            id={switcherId}
            items={switcherItems}
            value={activeTab}
            onChange={setActiveTab}
            size="md"
          />
        </div>

        <div
          key={activeTab}
          id={`${switcherId}-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`${switcherId}-tab-${activeTab}`}
          aria-label={st("partners", "listAria")}
        >
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
