import Image from "next/image";
import Tag from "@/app/components/tag/Tag";
import Carousel from "@/app/components/carousel/Carousel";
import { Partner } from "../_data/homeData";

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
            role="group"
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
              <PartnerLogo key={`partner-${partner.id}`} partner={partner} />
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}
