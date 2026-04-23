import type { ReactElement } from "react";
import type { Metadata } from "next";
import { SERVICES, PARTNERS, NEWS_ARTICLES } from "./(landing)/_data/homeData";
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
      {/* Section is server-rendered — BannerHero image is static HTML with no
          client component in its ancestor chain, so React hydration of Banner
          (overlay/controls) cannot delay the hero image paint. */}
      <section
        className="relative c-mask h-[560px]"
        style={{ height: 560 }}
        aria-label="عرض شرائح البانر"
        aria-roledescription="carousel"
      >
        <BannerHero />
        <BannerHeroText />
        <BannerDynamic />
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
