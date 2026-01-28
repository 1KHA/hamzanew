import type { ReactNode } from "react";
// import AboutHero from "./_hero/AboutHero";
import { Metadata } from "next";
import EParticipationHero from "./_hero/EParticipationHero";

export const metadata: Metadata = {
  title: "المشاركة الإلكترونية",
};

export default function EParticipationLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <EParticipationHero/>
      <main>{children}</main>
    </>
  );
}


