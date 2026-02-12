import type { ReactNode } from "react";
import { Metadata } from "next";
import { heroMap } from "./_hero/heroMap";
import PageHero from "../components/page-hero/PageHero";

export const metadata: Metadata = {
  title: "عن الجهة",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHero heroMap={heroMap} defaultRoute="/about" breadcrumbsMax={5} />
      <section>{children}</section>
    </>
  );
}
