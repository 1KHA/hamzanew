import type { ReactNode } from "react";
import { heroMap, getHamzaAcademicTestHero } from "../heroMap";
import PageHero from "@/app/components/page-hero/PageHero";

export default async function HamzaAcademicTestLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch dynamic hero data for hamza academic test
  const academicTestHero = await getHamzaAcademicTestHero();
  
  // Merge dynamic hero with static heroMap
  const dynamicHeroMap = {
    ...heroMap,
    "/types-of-tests/hamza-academic-test": academicTestHero,
  };

  return (
    <>
      <PageHero
        heroMap={dynamicHeroMap}
        defaultRoute="/types-of-tests/hamza-academic-test"
        breadcrumbsMax={5}
      />
      {children}
    </>
  );
}