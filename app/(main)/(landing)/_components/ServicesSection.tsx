"use client";

import Card from "@/app/components/card/Card";
import Carousel from "@/app/components/carousel/Carousel";
import { st } from "@/app/_lib/static-text";
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
        aria-label={st("services", "sectionAria")}
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">{st("services", "heading")}</h2>
          </div>
          <p className="text-md-regular">{st("services", "description")}</p>
        </div>
        <div aria-label={st("services", "carouselAria")}>
          <Carousel itemsPerSlide={4} gap={20} autoPlay interval={4000}>
            {mergedServices.map((service, index) => (
              <Card
                key={`service-${index}`}
                style={{ height: 288 }}
                title={service.title}
                description={service.description}
                icon={service.icon}
                showPrimaryAction
                primaryActionLabel={st("services", "register")}
                showPrimaryIcon
                primaryTrailIconType="arrow-up-right-01"
                showSecondaryAction
                secondaryActionLabel={st("services", "more")}
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
