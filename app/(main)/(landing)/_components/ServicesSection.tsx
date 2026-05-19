import Card from "@/app/components/card/Card";
import Carousel from "@/app/components/carousel/Carousel";
import { st } from "@/app/_lib/static-text-server";
import { Service } from "../_data/homeData";

interface BannerBox {
  title?: string;
  link?: string;
}

interface ServicesSectionProps {
  services: Service[];
  bannerBoxes?: BannerBox[];
  locale?: "ar" | "en";
}

export default function ServicesSection({ services, bannerBoxes, locale }: ServicesSectionProps) {
  // CMS-first: use banner box titles/links, falling back to static data by index.
  // If CMS returns no boxes, use the full static services array.
  const displayedServices =
    bannerBoxes && bannerBoxes.length > 0
      ? bannerBoxes.map((box, index) => {
          const fallback = services[index];
          return {
            title: box.title || fallback?.title || "",
            description: fallback?.description || "",
            icon: fallback?.icon || "",
            link: box.link || fallback?.link || "",
          };
        })
      : services;
  return (
    <div className="bg-neutral-50">
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label={st("services", "sectionAria", locale)}
      >
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h2 className="display-sm-bold">{st("services", "heading", locale)}</h2>
          </div>
          <p className="text-md-regular">{st("services", "description", locale)}</p>
        </div>
        <div aria-label={st("services", "carouselAria", locale)}>
          <Carousel itemsPerSlide={4} gap={20} autoPlay interval={4000}>
            {displayedServices.map((service, index) => (
              <Card
                key={`service-${index}`}
                style={{ height: 288 }}
                title={service.title}
                description={service.description}
                icon={service.icon}
                showPrimaryAction={false}
                showSecondaryAction
                secondaryActionLabel={st("services", "more", locale)}
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
