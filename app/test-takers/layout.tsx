import type { ReactNode } from "react";
import { heroMap } from "./heroMap";
import PageHero from "@/app/components/page-hero/PageHero";

export default function TestTakersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        heroMap={heroMap}
        defaultRoute="/test-takers/hamza-training-course"
        breadcrumbsMax={4}
      />
      <section>{children}</section>
    </>
  );
}
