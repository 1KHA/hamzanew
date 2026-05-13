import Card from "@/app/components/card/Card";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import Button from "@/app/components/button/Button";
import PageHero from "@/app/components/page-hero/PageHero";
import { Metadata } from "next";
import { ReactElement } from "react";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "طلب خدمة بحثية | اختبار همزة",
  description:
    "يسهم كبار الأكاديميين والباحثين حول العالم في التطوير المستمر وتحسين اختبار همزة من خلال تنفيذ أبحاث ممولة. اكتشف أحدث الأبحاث الأكاديمية والرؤى والخبرات من شركاء اختبار همزة وخبراء عالميين في تقييم اللغة العربية.",
};

/* ==========================================================================
   Static Data
   ========================================================================== */

const HERO_CONFIG = {
  title: "طلب خدمة بحثية",
  description:
    "يسهم كبار الأكاديميين والباحثين حول العالم في التطوير المستمر وتحسين اختبار همزة من خلال تنفيذ أبحاث ممولة. اكتشف أحدث الأبحاث الأكاديمية، والرؤى، والخبرات من شركاء اختبار همزة وخبراء عالميين في تقييم اللغة العربية.",

  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الأبحاث", disabled: true },
    { label: "طلب خدمة بحثية", disabled: true },
  ],
};

const SERVICES = [
  {
    id: "collaboration",
    icon: "user-group",
    title: "طلب تعاون بحثي",
    actionLabel: "تقديم الطلب",
    actionHref: "mailto:altrl@ksaa.gov.sa?subject=طلب تعاون بحثي",
  },
  {
    id: "data",
    icon: "database-01",
    title: "طلب بيانات بغرض البحث",
    actionLabel: "تقديم الطلب",
    actionHref: "mailto:altrl@ksaa.gov.sa?subject=طلب بيانات بغرض البحث",
  },
  {
    id: "idea",
    icon: "bulb",
    title: "مشاركة فكرة أو مقترح بحثي",
    actionLabel: "مشاركة الفكرة",
    actionHref: "mailto:altrl@ksaa.gov.sa?subject=مقترح بحثي",
  },
];



const WEEKS = [
  { id: 1, number: "1", title: "المرحلة الأولى — استلام الطلب" },
  { id: 2, number: "2", title: "المرحلة الثانية — مراجعة الطلب" },
  { id: 3, number: "3", title: "المرحلة الثالثة — الرد والتنفيذ" },
];

/* ==========================================================================
   Main Component
   ========================================================================== */

export default function ResearchServiceRequest(): ReactElement {
  return (
    <>
      <PageHero
        heroMap={{ "/research-service-request": HERO_CONFIG }}
        defaultRoute="/research-service-request"
        breadcrumbsMax={3}
      />

      <main id="main-content" className="content" aria-label="طلب خدمة بحثية">
        <div className="py-10 md:py-10 flex flex-col gap-16">


          <section

            aria-labelledby="duration-title"
          >

            <div className="!pb-[32px]">

              <h2 id="services-heading" className="text-xl-semibold ">
                نموذج طلب خدمة بحثية
              </h2>
              <div className="flex flex-col gap-[16px]">
                <p className="text-md-regular text-[#475467]">
                  نرجو استخدام النموذج التالي لتقديم طلبات الخدمات البحثية المتعلقة باختبار همزة.
                </p>
                <Button
                  aria-label="تحميل نموذج طلب خدمة بحثية"
                  label="تحميل النموذج"
                  variant="primary-brand"
                  size="md"
                  icon="download-02"
                  iconClass="white-icon"
                  className="!w-fit"
                />

              </div>

            </div>


            <div className="flex flex-col gap-[20px]">
              <h2 id="duration-title" className="text-xl-bold !pb-[16px]">
                الخدمات البحثية

              </h2>

            </div>

            {/* Left Column (RTL): Feature Cards + Weeks */}
            <div className="flex flex-col gap-[32px]">
              {/* Service Cards */}
              <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SERVICES.map((service) => (
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
      <section aria-labelledby="data-policy-heading">
        <h2 id="data-policy-heading" className="sr-only">
          ضوابط استخدام البيانات البحثية
        </h2>
        <NotificationToast
          type="info"
          leadText="ضوابط استخدام البيانات البحثية"
          helperText="لضمان استخدام علمي وأخلاقي للبيانات،نحيلكم إلى شروط إعداد الدراسات والأبحاث بناءً على اختبارات همزة"
          open
          variant="stroke"
          inline
            // actionLabel="التواصل مع البريد البحثي"
            // actionHref="mailto:altrl@ksaa.gov.sa"
        />
      </section>

    </div >
      </main >
    </>
  );
}