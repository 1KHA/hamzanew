import type { ReactNode } from "react";
import { Metadata } from "next";
import { heroMap, getTypesOfTestsHero, getHamzaAcademicTestHero, getHamzaGeneralTestHero, getHamzaPlacementTestHero, getHamzaVocabularyTestHero } from "./heroMap";
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
  // Fetch dynamic hero data for types of tests (main page)
  const typesOfTestsHero = await getTypesOfTestsHero();
  
  // Fetch dynamic hero data for hamza academic test (child page)
  const academicTestHero = await getHamzaAcademicTestHero();
  
  // Fetch dynamic hero data for hamza general test (child page)
  const generalTestHero = await getHamzaGeneralTestHero();
  
  // Fetch dynamic hero data for hamza placement test (child page)
  const placementTestHero = await getHamzaPlacementTestHero();
  
  // Fetch dynamic hero data for hamza vocabulary test (child page)
  const vocabularyTestHero = await getHamzaVocabularyTestHero();
  
  // Merge dynamic heroes with static heroMap
  const dynamicHeroMap = {
    ...heroMap,
    "/types-of-tests": typesOfTestsHero,
    "/types-of-tests/hamza-academic-test": academicTestHero,
    "/types-of-tests/hamza-general-test": generalTestHero,
    "/types-of-tests/hamza-placement-test": placementTestHero,
    "/types-of-tests/hamza-vocabulary-test": vocabularyTestHero,
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