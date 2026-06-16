import type { ReactElement } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import PageHero from "@/app/components/page-hero/PageHero";
import TermsContent from "./TermsContent";
import { st } from "@/app/_lib/static-text-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("termsAndConditions", "metaTitle", locale),
    description: st("termsAndConditions", "metaDescription", locale),
  };
}

export default async function TermsAndConditionsPage(): Promise<ReactElement> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale.startsWith("en") ? "en" : "ar";

  const heroConfig = {
    title: st("termsAndConditions", "heroTitle", staticLocale),
    description: st("termsAndConditions", "heroDescription", staticLocale),
    bgColor: "#F9FAFB",
    breadcrumbs: [
      {
        label: st("termsAndConditions", "breadcrumbHome", staticLocale),
        path: "/",
      },
      {
        label: st("termsAndConditions", "breadcrumbCurrent", staticLocale),
        disabled: true,
      },
    ],
  };

  return (
    <main>
      <PageHero
        heroMap={{ "/terms-and-conditions": heroConfig }}
        defaultRoute="/terms-and-conditions"
        breadcrumbsMax={2}
      />

      <TermsContent locale={staticLocale} />
    </main>
  );
}
