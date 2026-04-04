import type { ReactNode } from "react";
import { Metadata } from "next";
import { heroMap, getTypesOfTestsHero } from "./heroMap";
import PageHero from "@/app/components/page-hero/PageHero";

export const metadata: Metadata = {
  title: "أنواع اختبارات همزة",
  description:
    "قارن بين اختبارات همزة المختلفة: الاختبار العام، تحديد المستوى، المفردات، والاختبار الأكاديمي. تعرف على الفئة المستهدفة، عدد الأسئلة، والمدة الزمنية لكل اختبار.",
};

export default async function TypesOfTestsLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch dynamic hero data for types of tests
  const typesOfTestsHero = await getTypesOfTestsHero();
  
  // Merge dynamic hero with static heroMap
  const dynamicHeroMap = {
    ...heroMap,
    "/types-of-tests": typesOfTestsHero,
  };

  return (
    <>
      <PageHero
        heroMap={dynamicHeroMap}
        defaultRoute="/types-of-tests"
        breadcrumbsMax={4}
      />
      <section>{children}</section>
    </>
  );
}