import Card from "@/app/components/card/Card";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import PageHero from "@/app/components/page-hero/PageHero";
import { Metadata } from "next";
import { ReactElement } from "react";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "طلب خدمة بحثية",
  description:
    "يسهم كبار الأكاديميين والباحثين حول العالم في التطوير المستمر وتحسين اختبار همزة من خلال تنفيذ أبحاث ممولة. اكتشف أحدث الأبحاث الأكاديمية، والرؤی، والخرات من شركاء اختبار همزة وخبراء عالميين في تقييم اللغة العربية",
};
/* ==========================================================================
   Static Configuration
   ========================================================================== */

const HERO_CONFIG = {
  title: "طلب خدمة بحثية",
  description:
    "يسهم كبار الأكاديميين والباحثين حول العالم في التطوير المستمر وتحسين اختبار همزة من خلال تنفيذ أبحاث ممولة. اكتشف أحدث الأبحاث الأكاديمية، والرؤی، والخرات من شركاء اختبار همزة وخبراء عالميين في تقييم اللغة العربية",
  externalLink: {
    href: "https://drive.google.com/file/d/13nF8U6MsTQbnFk1YjGpGvHb_RByNg-Rs/view?usp=sharing",
    label: "نموذج طلب خدمة بحثية",
    download: true,
  },
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الابحاث", disabled: true },
    { label: "طلب خدمة بحثية", disabled: true },
  ],
};

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * ResearchServiceRequest Component
 */

const services = [
  {
    title: "طلب تعاون بحثي",
    icon: "microscope",
  },
  {
    title: "طلب بيانات بغرض البحث",
    icon: "microscope",
  },
  {
    title: "مشاركة فكرة أو  مقترح بحثي",
    icon: "microscope",
  },
];
export default function ResearchServiceRequest(): ReactElement {
  return (
    <>
      <PageHero
        heroMap={{ "/research-service-request": HERO_CONFIG }}
        defaultRoute="/research-service-request"
        breadcrumbsMax={3}
      />

      {/* Main page content landmark */}
      <section className="content" aria-label="خدمات البحث العلمي">
        <div className="py-10 md:py-20 flex flex-col gap-12">

          {/* Services list section */}
          <section aria-labelledby="services-heading">
            <h2 id="services-heading" className="sr-only">
              أنواع طلبات الخدمة البحثية
            </h2>
            <ul
              role="list"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {services.map((service) => (
                <li key={service.title}>
                  <Card title={service.title} icon={service.icon} />
                </li>
              ))}
            </ul>
          </section>

          {/* Data policy notice section */}
          <section aria-labelledby="data-policy-heading" className="pt-20">
            <h2 id="data-policy-heading" className="sr-only">
              ضوابط استخدام البيانات البحثية
            </h2>
            <NotificationToast
              type="info"
              leadText="ضوابط استخدام البيانات البحثية"
              helperText="لضمان استخدام علمي وأخلاقي للبيانات، نحيلكم إلى شروط إعداد الدراسات والأبحاث بناءً على اختبارات همزة"
              open
              variant="stroke"
              inline
              actionLabel="التواصل مع البريد البحثي"
              actionHref="mailto:altrl@ksaa.gov.sa"
            />
          </section>

        </div>
      </section>
    </>
  );
}
