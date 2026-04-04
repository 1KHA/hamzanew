import type { ReactNode } from "react";
import { heroMap, getPeriodicAdvisoryCommitteeHero } from "./_hero/heroMap";
import PageHero from "@/app/components/page-hero/PageHero";

export default async function AboutLayout({ children }: { children: ReactNode }) {
  // Fetch dynamic hero data for periodic advisory committee
  const periodicHero = await getPeriodicAdvisoryCommitteeHero();
  
  // Merge dynamic hero with static heroMap
  const dynamicHeroMap = {
    ...heroMap,
    "/about/periodic-advisory-committee": periodicHero,
  };

  return (
    <>
      <PageHero heroMap={dynamicHeroMap} defaultRoute="/about" breadcrumbsMax={4} />
      <section className="flex-1 flex flex-col">{children}</section>
    </>
  );
}
