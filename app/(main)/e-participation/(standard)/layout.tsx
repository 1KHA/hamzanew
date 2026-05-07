import type { ReactNode } from "react";
import { Metadata } from "next";
import { heroMap } from "./_hero/heroMap";
import PageHero from "@/app/components/page-hero/PageHero";
import { getTranslations } from "@/app/_lib/getTranslations";
export const metadata: Metadata = {
  title: "المشاركة الإلكترونية",
};

export default async function EParticipationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const translations = await getTranslations();

  return (
    <>
      <PageHero
        heroMap={heroMap}
        defaultRoute="/e-participation"
        breadcrumbsMax={{ default: 4, overrides: { "/e-participation": 4 } }}
        translations={translations ?? undefined}
      />
      <section>{children}</section>
    </>
  );
}
