import type { ReactNode } from "react";
import {
  heroMap,
  getPreparationResourceHero,
  getTestMechanismHero,
} from "./heroMap";
import PageHero from "@/app/components/page-hero/PageHero";
import { getTranslations } from "@/app/_lib/getTranslations";

export default async function TestTakersLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch translations and dynamic hero data for multiple routes
  const [translations, testMechanismHero, prepResourceHero] = await Promise.all([
    getTranslations(),
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
        translations={translations ?? undefined}
      />
      <section>{children}</section>
    </>
  );
}
