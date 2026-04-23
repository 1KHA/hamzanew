import Image from "next/image";

// Server Component — renders the LCP image with no client-side JS.
// Sized via CSS (position:absolute/inset:0) rather than intrinsic dimensions
// so it fills the 560px section regardless of natural image size.
export default function BannerHero() {
  return (
    <Image
      src="/assets/image/hero.jpg"
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
