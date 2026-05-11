import type { Metadata } from "next";
import type { ReactElement } from "react";
import PageHero from "@/app/components/page-hero/PageHero";
import LanguageTestingLabContent from "./LanguageTestingLabContent";

export const metadata: Metadata = {
  title: "معمل ابحاث الاختبارات اللغوية",
  description:
    "منصة متخصصة في تطوير ودراسة أدوات القياس والتقويم في اللغة العربية. يهدف إلى دعم الابتكار العلمي وتعزيز موثوقية الاختبارات وفق المعايير الدولية.",
};

const HERO_CONFIG = {
  title: "معمل ابحاث الاختبارات اللغوية",
  description:
   "منصة متخصصة في تطوير ودراسة أدوات القياس والتقويم في اللغة العربية. يهدف إلى دعم الابتكار العلمي وتعزيز موثوقية الاختبارات وفق المعايير الدولية.",
  bgColor: "#FFF",
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الأبحاث", disabled: true },
    { label: "معمل ابحاث الاختبارات اللغوية", disabled: true },
  ],
};

export default function LanguageTestingLabPage(): ReactElement {
  return (
    <main>
      <PageHero
        heroMap={{ "/news/language-testing-lab": HERO_CONFIG }}
        defaultRoute="/news/language-testing-lab"
        breadcrumbsMax={3}
      />
      <LanguageTestingLabContent />
    </main>
  );
}
