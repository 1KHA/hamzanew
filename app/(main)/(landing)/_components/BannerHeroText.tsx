import "@/app/components/button/Button.css";
import type { Slide } from "../_data/homeData";

interface BannerHeroTextProps {
  slide: Pick<Slide, "title" | "description" | "cta">;
}

// Server Component — SSR'd into initial HTML so the h1 is the LCP text
// candidate without waiting for client hydration.
// Visually covered by Banner's client overlay once JS loads; kept in DOM
// so the h1 remains crawlable and visible on no-JS environments.
export default function BannerHeroText({ slide }: BannerHeroTextProps) {
  return (
    <div className="overlay" style={{ zIndex: 1 }}>
      <div className="hero w-[-webkit-fill-available] content !text-start">
        <h1 className="display-xl-semibold">{slide.title}</h1>
        <p className="!mb-[32px] text-xl-regular max-w-[720px]">
          {slide.description}
        </p>
        <a href={slide.cta.href}>
          <button
            type="button"
            className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color"
          >
            <span className="dga-btn-label">{slide.cta.label}</span>
          </button>
        </a>
      </div>
    </div>
  );
}
