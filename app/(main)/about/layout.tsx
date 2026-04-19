import type { ReactNode } from "react";
import {
  heroMap,
  getPeriodicAdvisoryCommitteeHero,
  getHamzaAmbassadorsHero,
  getWhoWeAreHero,
  getHamzaTestTraitsHero,
} from "./_hero/heroMap";
import PageHero from "@/app/components/page-hero/PageHero";

export default async function AboutLayout({ children }: { children: ReactNode }) {
  // Fetch dynamic hero data for who-we-are
  const whoWeAreHero = await getWhoWeAreHero();

  // Fetch dynamic hero data for periodic advisory committee
  const periodicHero = await getPeriodicAdvisoryCommitteeHero();

  // Fetch dynamic hero data for hamza ambassadors
  const ambassadorsHero = await getHamzaAmbassadorsHero();

  // Fetch dynamic hero data for hamza test traits
  const traitsHero = await getHamzaTestTraitsHero();

  // Merge dynamic heroes with static heroMap
  const dynamicHeroMap = {
    ...heroMap,
    "/about/who-we-are": whoWeAreHero,
    "/about/periodic-advisory-committee": periodicHero,
    "/about/hamza-ambassadors": ambassadorsHero,
    "/about/hamza-test-traits": traitsHero,
  };

  return (
    <>
      <PageHero
        heroMap={dynamicHeroMap}
        defaultRoute="/about"
        breadcrumbsMax={4}
      />
      <section className="flex-1 flex flex-col">{children}</section>
    </>
  );
}
