import PageHero from "@/app/components/page-hero/PageHero";
import { Metadata } from "next";
import LatestNews from "./LatestNews";
import { news, latestCoverage } from "../_data/newsData";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "آخر الأخبار",
  description:
    "نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير الاختبارات المعيارية للغة العربية",
};

/* ==========================================================================
   Static Configuration
   ========================================================================== */

const HERO_CONFIG = {
  title: "آخر الأخبار",
  description:
    "نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير الاختبارات المعيارية للغة العربية",
  bgColor: "#FFF",
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الاخبار", disabled: true },
    { label: "آخر الأخبار", disabled: true },
  ],
};
export default function LatestNewsPage() {
  return (
    <>
      <PageHero
        heroMap={{ "/news": HERO_CONFIG }}
        defaultRoute="/news"
        breadcrumbsMax={3}
      />

      <LatestNews news={news} coverage={latestCoverage} />
    </>
  );
}
