"use client";

import Card from "@/app/components/card/Card";
import Carousel from "@/app/components/carousel/Carousel";
import Tag from "@/app/components/tag/Tag";
import { Partner } from "../_data/homeData";

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <div className="bg-white">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label="الشركاء"
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">الشركاء</h2>
          </div>
          <div
            className="flex-start-center gap-4"
            role="tablist"
            aria-label="تصفية الشركاء حسب الموقع"
          >
            <Tag
              label="داخل المملكة العربية السعودية"
              variant="success"
              size="lg"
              trailIcon={{ src: "/assets/image/Country Flags.svg" }}
            />
            <Tag
              label="دول أخرى"
              variant="neutral"
              size="lg"
              trailIcon={{
                src: "/assets/icons/stroke-standard/flag-02-stroke-rounded.svg",
              }}
            />
          </div>
        </div>
        <div aria-label="قائمة الشركاء">
          <Carousel
            itemsPerSlide={6}
            gap={20}
            showArrows
            arrowRadius="20%"
            arrowBgColor="#F3F4F6"
          >
            {partners.map((partner) => (
              <Card
                key={`partner-${partner.id}`}
                image={partner.image}
                logoImage
                isImgCenter
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  textAlign: "center",
                  padding: 16,
                }}
                imageWidth={162}
                imageHeight={162}
              />
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}
