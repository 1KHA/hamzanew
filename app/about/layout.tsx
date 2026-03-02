import type { ReactNode } from "react";
import { heroMap } from "./_hero/heroMap";
import PageHero from "../components/page-hero/PageHero";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHero heroMap={heroMap} defaultRoute="/about" breadcrumbsMax={4} />
      <section>{children}</section>
    </>
  );
}
