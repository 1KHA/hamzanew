import Card from "@/app/components/card/Card";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import PageHero from "@/app/components/page-hero/PageHero";
import DownloadButton from "./DownloadButton";
import { Metadata } from "next";
import { ReactElement } from "react";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

/* ==========================================================================
   Metadata
   ========================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("researchServiceRequest", "metaTitle", locale),
    description: st("researchServiceRequest", "metaDescription", locale),
  };
}

/* ==========================================================================
   Main Component
   ========================================================================== */

export default async function ResearchServiceRequest(): Promise<ReactElement> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale.startsWith("en") ? "en" : "ar";

  const heroConfig = {
    title: st("researchServiceRequest", "heroTitle", staticLocale),
    description: st("researchServiceRequest", "heroDescription", staticLocale),
    breadcrumbs: [
      { label: st("researchServiceRequest", "breadcrumbHome", staticLocale), path: "/" },
      { label: st("researchServiceRequest", "breadcrumbResearch", staticLocale), disabled: true },
      { label: st("researchServiceRequest", "breadcrumbServiceRequest", staticLocale), disabled: true },
    ],
  };

  const services = [
    {
      id: "collaboration",
      icon: "user-group",
      title: st("researchServiceRequest", "serviceCollabTitle", staticLocale),
      actionLabel: st("researchServiceRequest", "serviceCollabAction", staticLocale),
      actionHref: "mailto:altrl@ksaa.gov.sa?subject=طلب تعاون بحثي",
    },
    {
      id: "data",
      icon: "database-01",
      title: st("researchServiceRequest", "serviceDataTitle", staticLocale),
      actionLabel: st("researchServiceRequest", "serviceDataAction", staticLocale),
      actionHref: "mailto:altrl@ksaa.gov.sa?subject=طلب بيانات بغرض البحث",
    },
    {
      id: "idea",
      icon: "bulb",
      title: st("researchServiceRequest", "serviceIdeaTitle", staticLocale),
      actionLabel: st("researchServiceRequest", "serviceIdeaAction", staticLocale),
      actionHref: "mailto:altrl@ksaa.gov.sa?subject=مقترح بحثي",
    },
  ];

  const weeks = [
    { id: 1, number: "1", title: st("researchServiceRequest", "week1Title", staticLocale) },
    { id: 2, number: "2", title: st("researchServiceRequest", "week2Title", staticLocale) },
    { id: 3, number: "3", title: st("researchServiceRequest", "week3Title", staticLocale) },
  ];

  return (
    <>
      <PageHero
        heroMap={{ "/research-service-request": heroConfig }}
        defaultRoute="/research-service-request"
        breadcrumbsMax={3}
      />

      <main id="main-content" className="content" aria-label={st("researchServiceRequest", "ariaPage", staticLocale)}>
        <div className="py-10 md:py-10 flex flex-col gap-16">

          <section aria-labelledby="duration-title">
            <div className="!pb-[32px]">
              <h2 id="services-heading" className="text-xl-semibold ">
                {st("researchServiceRequest", "formHeading", staticLocale)}
              </h2>
              <div className="flex flex-col gap-[16px]">
                <p className="text-md-regular text-[#475467]">
                  {st("researchServiceRequest", "formDescription", staticLocale)}
                </p>
                <DownloadButton
                  ariaLabel={st("researchServiceRequest", "downloadAria", staticLocale)}
                  label={st("researchServiceRequest", "downloadBtn", staticLocale)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <h2 id="duration-title" className="text-xl-bold !pb-[16px]">
                {st("researchServiceRequest", "servicesHeading", staticLocale)}
              </h2>
            </div>

            {/* Left Column (RTL): Feature Cards + Weeks */}
            <div className="flex flex-col gap-[32px]">
              {/* Service Cards */}
              <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service) => (
                  <li key={service.id}>
                    <Card
                      icon={service.icon}
                      title={service.title}
                      descriptionClass="text-md-regular"
                      showPrimaryAction
                      primaryActionLabel={service.actionLabel}
                      linkPrimaryAction={service.actionHref}
                      primaryTrailIconType="arrow-up-right-01"
                      buttonColor="secondary"
                      external
                      iconPosition="top"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── Data policy notice ─────────────────────────────────────── */}
          {/* <section aria-labelledby="data-policy-heading">
            <h2 id="data-policy-heading" className="sr-only">
              {st("researchServiceRequest", "toastAriaHeading", staticLocale)}
            </h2>
            <NotificationToast
              type="info"
              leadText={st("researchServiceRequest", "toastLead", staticLocale)}
              helperText={st("researchServiceRequest", "toastHelper", staticLocale)}
              open
              variant="stroke"
              inline
            />
          </section> */}

        </div>
      </main>
    </>
  );
}
