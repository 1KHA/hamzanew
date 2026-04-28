import type { ReactElement } from "react";
import type { Metadata } from "next";
import { SERVICES, PARTNERS } from "./(landing)/_data/homeData";
import { news } from "@/app/(main)/news/_data/newsData";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";

import Banner from "./(landing)/_components/Banner";
import ServicesSection from "./(landing)/_components/ServicesSection";
import NewsSection from "./(landing)/_components/NewsSection";
import StatisticsSection from "./(landing)/_components/StatisticsSection";
import PartnersSection from "./(landing)/_components/PartnersSection";
import SubscriptionSection from "./(landing)/_components/SubscriptionSection";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";

export const metadata: Metadata = {
  title: "اختبار همزة - الرئيسة",
  description:
    "منصة همزة التابعة لمجمع الملك سلمان العالمي للغة العربية لتمكين متعلمي اللغة العربية والمهنيين.",
};

export const dynamic = "force-dynamic";

export default async function LandingPage(): Promise<ReactElement> {
  let bannerData = null;
  let bannerBoxesData = null;
  try {
    [bannerData, bannerBoxesData] = await Promise.all([
      fetchContentWithKey("HAMZA_HOMEPAGE_BANNER_CONTENT_KEY"),
      fetchContentWithKey("HAMZA_HOMEPAGE_BANNER_BOXES_CONTENT_KEY"),
    ]);
  } catch (error) {
    console.error("[Home] Error fetching banner:", error);
  }

  const bannerFields = extractFields(bannerData?.contentFields, [
    "smallHeaderTitleText",
    "headerTitleText",
    "descriptionText",
    "image",
  ]) as {
    smallHeaderTitleText?: string;
    headerTitleText?: string;
    descriptionText?: string;
    image?: string;
  };

  // Map banner boxes to exam card shape
  const bannerBoxes =
    bannerBoxesData?.contentFields?.map((fieldSet: any) => {
      const obj: any = {};
      fieldSet.nestedContentFields?.forEach((nestedField: any) => {
        if (nestedField.name === "titleText") {
          obj.title = nestedField.contentFieldValue?.data;
        } else if (nestedField.name === "link") {
          obj.link = nestedField.contentFieldValue?.data;
        }
      });
      return obj;
    }) || [];

  console.log("[Home] Banner fields:", bannerFields);
  console.log("[Home] Banner boxes:", bannerBoxes);

  return (
    <>
      <Banner bannerFields={bannerFields} />

      <ScrollReveal>
        <ServicesSection services={SERVICES} bannerBoxes={bannerBoxes} />
      </ScrollReveal>
      <ScrollReveal>
        <NewsSection articles={news} />
      </ScrollReveal>

      <ScrollReveal>
        <StatisticsSection />
      </ScrollReveal>

      <ScrollReveal>
        <PartnersSection partners={PARTNERS} />
      </ScrollReveal>
      <ScrollReveal>
        <SubscriptionSection />
      </ScrollReveal>
    </>
  );
}
