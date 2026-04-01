import type { ReactElement } from "react";
import type { Metadata } from "next";
import PageHero from "@/app/components/page-hero/PageHero";
import TermsContent from "./TermsContent";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description:
    "اطّلع على الشروط والأحكام الخاصة باستخدام منصة همزة، بما في ذلك سياسات الاستخدام، التسجيل، حقوق الملكية الفكرية، ومسؤوليات المستخدم.",
};

const HERO_CONFIG = {
  title: "الشروط والأحكام",
  description:
    "يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام منصة همزة. باستخدامك للمنصة، فإنك توافق على الالتزام بجميع البنود والشروط المذكورة أدناه.",
  bgColor: "#F9FAFB",
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الشروط والأحكام", disabled: true },
  ],
};

export default function TermsAndConditionsPage(): ReactElement {
  return (
    <main>
      <PageHero
        heroMap={{ "/terms-and-conditions": HERO_CONFIG }}
        defaultRoute="/terms-and-conditions"
        breadcrumbsMax={2}
      />

      <TermsContent />
    </main>
  );
}
