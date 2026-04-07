import type { ReactNode } from "react";
import { heroMap, getPreparationResourceHero } from "./heroMap";
import PageHero from "@/app/components/page-hero/PageHero";

export default async function TestTakersLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetch dynamic hero data for preparation resource
  const prepResourceHero = await getPreparationResourceHero();

  // Merge dynamic heroes with static heroMap
  const dynamicHeroMap = {
    ...heroMap,
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
