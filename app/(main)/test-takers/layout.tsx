import type { ReactNode } from "react";
import {
  heroMap,
  getPreparationResourceHero,
  getTestMechanismHero,
} from "./heroMap";
import PageHero from "@/app/components/page-hero/PageHero";

export default async function TestTakersLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch dynamic hero data for multiple routes
  const [testMechanismHero, prepResourceHero] = await Promise.all([
    getTestMechanismHero(),
    getPreparationResourceHero(),
  ]);

  // Merge dynamic heroes with static heroMap
  const dynamicHeroMap = {
    ...heroMap,
    "/test-takers/test-mechanism": testMechanismHero,
    "/test-takers/preparation-resource": prepResourceHero,
  };

  return (
    <>
      <PageHero
        heroMap={dynamicHeroMap}
        defaultRoute="/"
        breadcrumbsMax={4}
      />
      <section>{children}</section>
    </>
  );
}
