/**
 * Landing Page (Server Component)
 *
 * Main landing page for the Hamza website.
 * Follows the Leaf Design Pattern by keeping the page as a Server Component
 * and pushing interactivity to client-side "leaf" components.
 */

import type { ReactElement } from "react";
import type { Metadata } from "next";

// Data
import { SERVICES, PARTNERS, NEWS_ARTICLES } from "./(landing)/_data/homeData";

// Components
import Banner from "./(landing)/_components/Banner";
import ServicesSection from "./(landing)/_components/ServicesSection";
import NewsSection from "./(landing)/_components/NewsSection";
import GlobalStatisticsSection from "./components/global-statistics-section/GlobalStatisticsSection";
import PartnersSection from "./(landing)/_components/PartnersSection";
import SubscriptionSection from "./(landing)/_components/SubscriptionSection";
import ClientOnly from "./components/ClientOnly";

/**
 * Metadata for the Landing Page
 */
export const metadata: Metadata = {
  title: "همزة",
  description:
    "منصة همزة التابعة لمجمع الملك سلمان العالمي للغة العربية لتمكين متعلمي اللغة العربية والمهنيين.",
};

/**
 * Landing Page Component
 *
 * Renders the home page structure using a collection of server and client components.
 */
export default function LandingPage(): ReactElement {
  return (
    <>
      {/* Hero Banner (Client Leaf due to Carousel/Timer) */}
      <Banner />

      {/* Services Section (Client Leaf due to Carousel) */}
      <ServicesSection services={SERVICES} />

      {/* News Section (Client Leaf due to Carousel) */}
      <NewsSection articles={NEWS_ARTICLES} />

      {/* Statistics Section (Static/Server Wrapper with Client Data visualization) */}
      <div className="bg-neutral-50">
        <section
          className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
          aria-label="إحصائيات همزة"
        >
          <div className="grid gap-[24px]">
            <div className="flex-between-center">
              <h2 className="display-sm-bold">همزة في أرقام</h2>
            </div>
            <p className="text-md-regular">
              يعرض قسم إحصائيات همزة بيانات عن عدد المختبرين عالميًا، وتنوّع
              الجنسيات والدول، إضافة إلى أعداد المختبرين في مراكز الاختبار.
            </p>
          </div>
          <div aria-label="الإحصائيات العامة">
            {/* <ClientOnly> */}
            <GlobalStatisticsSection />
            {/* </ClientOnly> */}
          </div>
        </section>
      </div>

      {/* Partners Section (Client Leaf due to Carousel/Filtering) */}
      <PartnersSection partners={PARTNERS} />

      {/* Email Subscription Section (Client Leaf due to Form Handling) */}
      {/* <ClientOnly> */}
      <SubscriptionSection />
      {/* </ClientOnly> */}
    </>
  );
}
