"use client";

import { useState, useId } from "react";
import Image from "next/image";
import ContentSwitcher from "@/app/components/content-switcher/ContentSwitcher";
import Carousel from "@/app/components/carousel/Carousel";
import { Partner } from "../_data/homeData";
import "./partners-section.css";

const TABS = [
  { label: "داخل المملكة العربية السعودية", location: "inside" as const },
  { label: "دول أخرى", location: "outside" as const },
] as const;

const SWITCHER_ITEMS = TABS.map((t) => ({ label: t.label }));

interface PartnersSectionProps {
  partners: Partner[];
}

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        height: "120px",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <Image
        src={partner.image}
        alt={partner.name}
        width={130}
        height={88}
        style={{ objectFit: "contain", maxHeight: 88 }}
        loading="lazy"
        sizes="130px"
        quality={60}
      />
    </div>
  );
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const [activeTab, setActiveTab] = useState(0);
  const switcherId = useId();

  const filtered = partners.filter(
    (p) => p.location === TABS[activeTab].location
  );

  return (
    <div className="bg-white">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label="الشركاء"
      >
        <div className="grid gap-[24px]">
          <h2 className="display-sm-bold">الشركاء</h2>
          <ContentSwitcher
            id={switcherId}
            items={SWITCHER_ITEMS}
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
          className="partners-panel"
        >
          {filtered.length > 0 ? (
            <Carousel
              itemsPerSlide={6}
              gap={20}
              showArrows
              arrowRadius="20%"
              arrowBgColor="#F3F4F6"
            >
              {filtered.map((partner) => (
                <PartnerLogo key={`partner-${partner.id}`} partner={partner} />
              ))}
            </Carousel>
          ) : (
            <p role="status" className="partners-panel__empty">
              لا توجد شركاء في هذه المنطقة
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
