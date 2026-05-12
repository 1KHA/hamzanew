import type { Metadata } from "next";
import type { ReactElement } from "react";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";
import PageHero from "@/app/components/page-hero/PageHero";
import LanguageTestingLabContent from "./LanguageTestingLabContent";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("languageTestingLab", "metaTitle", locale),
    description: st("languageTestingLab", "metaDescription", locale),
  };
}

export default async function LanguageTestingLabPage(): Promise<ReactElement> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  const HERO_CONFIG = {
    title: st("languageTestingLab", "metaTitle", locale),
    description: st("languageTestingLab", "metaDescription", locale),
    bgColor: "#FFF",
    breadcrumbs: [
      { label: st("languageTestingLab", "breadcrumbHome", locale), path: "/" },
      { label: st("languageTestingLab", "breadcrumbResearch", locale), disabled: true },
      { label: st("languageTestingLab", "breadcrumbLab", locale), disabled: true },
    ],
  };

  return (
    <main>
      <PageHero
        heroMap={{ "/news/language-testing-lab": HERO_CONFIG }}
        defaultRoute="/news/language-testing-lab"
        breadcrumbsMax={3}
      />
      <LanguageTestingLabContent locale={locale} />
    </main>
  );
}
