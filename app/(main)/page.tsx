import type { ReactElement } from "react";
import type { Metadata } from "next";
import { SERVICES, PARTNERS, NEWS_ARTICLES, BANNER_SLIDES } from "./(landing)/_data/homeData";
import BannerHero from "./(landing)/_components/BannerHero";
import BannerHeroText from "./(landing)/_components/BannerHeroText";
import BannerDynamic from "./(landing)/_components/BannerDynamic";
import NewsSectionDynamic from "./(landing)/_components/NewsSectionDynamic";
import StatisticsSectionDynamic from "./(landing)/_components/StatisticsSectionDynamic";
import PartnersSectionDynamic from "./(landing)/_components/PartnersSectionDynamic";
import ServicesSectionDynamic from "./(landing)/_components/ServicesSectionDynamic";
import SubscriptionSectionDynamic from "./(landing)/_components/SubscriptionSectionDynamic";

export const metadata: Metadata = {
  title: "اختبار همزة - الرئيسة",
  description:
    "منصة همزة التابعة لمجمع الملك سلمان العالمي للغة العربية لتمكين متعلمي اللغة العربية والمهنيين.",
};

export default function LandingPage(): ReactElement {
  return (
    <>
      {/* Hoisted to <head> by React 18 — gives the browser the preload hint
          before it has parsed any CSS, so hero.webp starts fetching immediately */}
      <link
        rel="preload"
        as="image"
        href="/assets/image/hero.webp"
        type="image/webp"
        fetchPriority="high"
      />
      {/* Section is server-rendered — BannerHero image is static HTML with no
          client component in its ancestor chain, so React hydration of Banner
          (overlay/controls) cannot delay the hero image paint. */}
      <section
        className="relative c-mask h-[560px]"
        style={{ height: 560 }}
        aria-label="عرض شرائح البانر"
        aria-roledescription="carousel"
      >
        <BannerHero slide={BANNER_SLIDES[0]} />
        <BannerHeroText slide={BANNER_SLIDES[0]} />
        {/* Spinning logo — server-rendered so it is in the initial HTML.
            fetchpriority="low" avoids competing with the hero's high-priority fetch.
            loading="eager" prevents it from appearing late as a new LCP candidate. */}
        <div className="banner-logo" aria-hidden="true" style={{ zIndex: 5 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/image/logo-stroke.png"
            alt=""
            width={500}
            height={500}
            loading="eager"
            // @ts-expect-error fetchpriority is valid HTML but not in React types yet
            fetchpriority="low"
            className="animate-spin-slow"
          />
        </div>
        <BannerDynamic slides={BANNER_SLIDES} />
      </section>

      {/* Below-fold sections: dynamically imported to defer Carousel hydration
          until after LCP, preventing 3 × H:25 Embla carousels from blocking
          the initial React reconciliation pass. */}
      <ServicesSectionDynamic services={SERVICES} />
      <NewsSectionDynamic articles={NEWS_ARTICLES} />
      <StatisticsSectionDynamic />
      <PartnersSectionDynamic partners={PARTNERS} />
      <SubscriptionSectionDynamic />
    </>
  );
}
