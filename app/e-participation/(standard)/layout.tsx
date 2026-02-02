import type { ReactNode } from "react";
// import AboutHero from "./_hero/AboutHero";
import { Metadata } from "next";
import EParticipationHero from "./_hero/EParticipationHero";
import { heroMap } from "./_hero/heroMap";
import PageHero from "@/app/components/page-hero/PageHero";
export const metadata: Metadata = {
  title: "المشاركة الإلكترونية",
};

export default function EParticipationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <EParticipationHero/> */}
        <PageHero
      heroMap={heroMap}
      defaultRoute="/e-participation"
      // breadcrumbsMax={(p) => (p === "/e-participation" ? 3 : 4)}
      breadcrumbsMax={4}
    />
      <main>{children}</main>
    </>
  );
}


