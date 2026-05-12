import type { ReactNode } from "react";
import { Metadata } from "next";
import { getHeroMap } from "./_hero/heroMap";
import PageHero from "@/app/components/page-hero/PageHero";
import { getTranslations } from "@/app/_lib/getTranslations";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("eParticipation", "eParticipationTitle", locale),
  };
}

export default async function EParticipationLayout({
  children,
}: {
  children: ReactNode;
}) {
  const translations = await getTranslations();
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  const heroMap = getHeroMap(locale);

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
