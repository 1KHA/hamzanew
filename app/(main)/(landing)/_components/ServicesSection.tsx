"use client";

import Card from "@/app/components/card/Card";
import Carousel from "@/app/components/carousel/Carousel";
import { Service } from "../_data/homeData";

interface BannerBox {
  title?: string;
  link?: string;
}

interface ServicesSectionProps {
  services: Service[];
  bannerBoxes?: BannerBox[];
}

export default function ServicesSection({ services, bannerBoxes }: ServicesSectionProps) {
  // Merge dynamic titles/links from API with static descriptions/icons
  const mergedServices =
    bannerBoxes && bannerBoxes.length > 0
      ? bannerBoxes.map((box, index) => ({
          ...services[index % services.length],
          title: box.title || services[index % services.length].title,
          link: box.link || services[index % services.length].link,
        }))
      : services;
  return (
    <div className="bg-neutral-50">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label="اختبارات همزة"
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">تعرف على اختبارات همزة</h2>
          </div>
          <p className="text-md-regular">
            نوفر خدمات إلكترونية للتسجيل في الاختبارات، مع تقديم معلومات واضحة
            ومبسطة عن كل اختبار
          </p>
        </div>
        <div aria-label="عرض الاختبارات المتاحة">
          <Carousel itemsPerSlide={4} gap={20}>
            {mergedServices.map((service, index) => (
              <Card
                key={`service-${index}`}
                style={{ height: 288 }}
                title={service.title}
                description={service.description}
                icon={service.icon}
                showPrimaryAction
                primaryActionLabel="التسجيل للاختبار"
                showPrimaryIcon
                primaryTrailIconType="arrow-up-right-01"
                showSecondaryAction
                secondaryActionLabel="المزيد"
                showSecondaryIcon={false}
                linkSecondaryAction={service.link}
              />
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}
