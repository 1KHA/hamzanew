import type { Slide } from "../_data/homeData";

interface BannerHeroProps {
  slide: Pick<Slide, "image">;
}

// Server Component — LCP image served as a static file (bypasses /_next/image
// optimizer cold-cache, which added ~3-4 s on first load).
// hero.webp (35 KB) is pre-optimised and lives in /public/assets/image/.
export default function BannerHero({ slide: _ }: BannerHeroProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/image/hero.webp"
      alt="اختبارات همزة"
      className="custom-banner"
      width={1440}
      height={560}
      loading="eager"
      decoding="async"
      // @ts-expect-error fetchpriority is valid HTML but not yet in React types
      fetchpriority="high"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    />
  );
}
