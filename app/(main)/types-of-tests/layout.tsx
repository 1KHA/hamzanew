import type { ReactNode } from "react";
import { Metadata } from "next";
import { heroMap } from "./heroMap";
import PageHero from "@/app/components/page-hero/PageHero";
export const metadata: Metadata = {
  title: "أنواع اختبارات همزة",
  description:
    "قارن بين اختبارات همزة المختلفة: الاختبار العام، تحديد المستوى، المفردات، والاختبار الأكاديمي. تعرف على الفئة المستهدفة، عدد الأسئلة، والمدة الزمنية لكل اختبار.",
};

export default function TypesOfTestsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        heroMap={heroMap}
        defaultRoute="/types-of-tests"
        breadcrumbsMax={4}
      />
      <section>{children}</section>
    </>
  );
}
