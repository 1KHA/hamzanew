import type { ReactNode } from "react";
import AboutHero from "./_hero/AboutHero";
import { Metadata } from "next";
import { heroMap } from "./_hero/heroMap";
import PageHero from "../components/page-hero/PageHero";

export const metadata: Metadata = {
  title: "عن الجهة",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <AboutHero /> */}
            <PageHero heroMap={heroMap} defaultRoute="/about" breadcrumbsMax={5} />
      <main>{children}</main>
    </>
  );
}
