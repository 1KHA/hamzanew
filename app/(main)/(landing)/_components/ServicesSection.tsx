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
  // Merge dynamic titles/links from API with static descriptions/icons
  // Match by link slug instead of array index to avoid CMS ordering mismatches
  const mergedServices =
    bannerBoxes && bannerBoxes.length > 0
      ? services.map((service) => {
          // Extract slug from static fallback link, e.g. "/types-of-tests/hamza-general-test" → "hamza-general-test"
          const slug = service.link?.split("/").filter(Boolean).pop() || "";
          // Find API banner box whose link contains the same slug
          const matchedBox = bannerBoxes.find(
            (box) => box.link && box.link.includes(slug)
          );
          return {
            ...service,
            title: matchedBox?.title || service.title,
            link: matchedBox?.link || service.link,
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
            {mergedServices.map((service, index) => (
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
