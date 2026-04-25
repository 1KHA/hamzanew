import Image from "next/image";
import type { Slide } from "../_data/homeData";

interface BannerHeroProps {
  slide: Pick<Slide, "image">;
}

// Server Component — renders the LCP image with no client-side JS.
// Sized via CSS (position:absolute/inset:0) rather than intrinsic dimensions
// so it fills the 560px section regardless of natural image size.
export default function BannerHero({ slide }: BannerHeroProps) {
  return (
    <Image
      src={slide.image}
      alt="اختبارات همزة"
      fill
      sizes="100vw"
      className="custom-banner"
      style={{ objectFit: "cover" }}
      priority
      fetchPriority="high"
      quality={75}
    />
  );
}
