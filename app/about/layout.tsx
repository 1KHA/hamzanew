import type { ReactNode } from "react";
import AboutHero from "./_hero/AboutHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "عن الجهة",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AboutHero />
      <main>{children}</main>
    </>
  );
}
