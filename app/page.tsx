/**
 * Home Page
 *
 * Main landing page for the Hamza website featuring:
 * - Hero banner carousel
 * - Services section with test offerings
 * - News and articles section
 * - Statistics section
 * - Partners section
 * - Email subscription section
 *
 * @accessibility
 * - Semantic HTML structure with proper heading hierarchy
 * - All images have descriptive alt text
 * - Sections have aria-labels for screen readers
 * - Interactive elements are keyboard accessible
 * - Color contrast meets WCAG guidelines
 */

"use client";

import { useMemo, type ReactElement } from "react";
import { DgaTextInput } from "platformscode-new-react";
import Banner from "./components/Banner";
import Tag from "./components/tag/Tag";
import Carousel from "./components/carousel/Carousel";
import GlobalStatisticsSection from "./components/global-statistics-section/GlobalStatisticsSection";
import Card from "./components/card/Card";
import Button from "./components/button/Button";
import "./styles/Button.css";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Service item interface
 */
interface Service {
  title: string;
  description: string;
  icon: string;
}

/**
 * Partner item interface
 */
interface Partner {
  id: number;
  image: string;
  name: string;
}

/**
 * News article interface
 */
interface NewsArticle {
  id: number;
  title: string;
  description: string;
  image: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * Available test services
 */
const SERVICES: Service[] = [
  {
    title: "اختبار همزة العام",
    description: "اختبار لقياس كفايات اللغة العربية للناطقين بغيرها لأغراض عامة.",
    icon: "glasses",
  },
  {
    title: "اختبار همزة الأكاديمي",
    description: "اختبار محوسب، دقيق، يقيس كفايات اللغة العربية للناطقين بغيرها لأغراض أكاديمية.",
    icon: "mortarboard-01",
  },
  {
    title: "اختبار تحديد المستوى",
    description: "اختبار لتحديد مستوى الكفاءة اللغوية العامة باللغة العربية لغير الناطقين بها لاستخدامه في البرامج الأكاديمية.",
    icon: "star",
  },
  {
    title: "اختبار همزة المفردات",
    description: "اختبار معياري لقياس مستويات المفردات لدى الناطقين بغير العربية لأغراض مختلفة.",
    icon: "book-01",
  },
];

/**
 * Partner institutions
 */
const PARTNERS: Partner[] = [
  { id: 1, image: "/assets/image/institutions1.png", name: "مؤسسة شريكة ١" },
  { id: 2, image: "/assets/image/institutions2.png", name: "مؤسسة شريكة ٢" },
  { id: 3, image: "/assets/image/institutions3.png", name: "مؤسسة شريكة ٣" },
  { id: 4, image: "/assets/image/institutions1.png", name: "مؤسسة شريكة ٤" },
  { id: 5, image: "/assets/image/institutions2.png", name: "مؤسسة شريكة ٥" },
  { id: 6, image: "/assets/image/institutions3.png", name: "مؤسسة شريكة ٦" },
  { id: 7, image: "/assets/image/institutions1.png", name: "مؤسسة شريكة ٧" },
];

/**
 * News and articles data
 */
const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title: "إقبال واسع على منصة اختبارات همزة في مرحلتها الأولى",
    description: "شهدت المنصة تفاعلاً كبيراً من المتقدمين لقياس كفايات اللغة العربية، مع تحديثات مستمرة على تجربة المستخدم.",
    image: "/assets/image/photo2.jpg",
  },
  {
    id: 2,
    title: "اختبارات همزة توفر مؤشرات نوعية لدعم الباحثين وصنّاع القرار",
    description: "تم إطلاق لوحة مؤشرات تعرض نتائج تحليلية تساعد الجهات التعليمية على تحسين برامجها وتطوير مخرجاتها.",
    image: "/assets/image/photo1.jpg",
  },
  {
    id: 3,
    title: "منصة اختبارات همزة تطلق النسخة التجريبية الأولى لقياس كفايات العربية",
    description: "تتضمن النسخة التجريبية مسارات متعددة وأسئلة معيارية مصممة وفق أفضل الممارسات لضمان جودة القياس.",
    image: "/assets/image/photo4.jpg",
  },
  {
    id: 4,
    title: "تطوير بنوك أسئلة جديدة لرفع دقة القياس في مهارات اللغة",
    description: "يتم العمل على إثراء بنك الأسئلة وإضافة نماذج تقييم متنوعة لقياس الفهم والكتابة والاستيعاب.",
    image: "/assets/image/photo1.jpg",
  },
  {
    id: 5,
    title: "شراكات جديدة لتعزيز جودة المحتوى وتوسيع نطاق الاختبارات",
    description: "تسعى المنصة إلى التعاون مع جهات أكاديمية وخبراء لتطوير المحتوى وبناء معايير أكثر تخصصاً.",
    image: "/assets/image/photo1.jpg",
  },
  {
    id: 6,
    title: "تحسين تجربة التسجيل وإتاحة الوصول عبر الأجهزة المختلفة",
    description: "تم تحديث واجهة التسجيل وتحسين الأداء لضمان تجربة سلسة على الهاتف والكمبيوتر مع دعم كامل للاتجاه RTL.",
    image: "/assets/image/photo1.jpg",
  },
];

/* ==========================================================================
   Sub Components
   ========================================================================== */

/**
 * Section Header Component
 * Renders a consistent header with title, optional button, and description
 */
function SectionHeader({
  title,
  description,
  showButton = true,
  buttonLabel = "عرض الكل",
}: {
  title: string;
  description: string;
  showButton?: boolean;
  buttonLabel?: string;
}) {
  return (
    <div className="grid gap-[24px]">
      <div className="flex-between-center">
        <h2 className="display-sm-bold">{title}</h2>
        {showButton && (
          <Button
            label={buttonLabel}
            variant="secondary-outline"
            size="md"
          />
        )}
      </div>
      <p className="text-md-regular">{description}</p>
    </div>
  );
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * Home Page Component
 *
 * Main landing page with multiple sections showcasing
 * Hamza's services, news, statistics, and partners.
 *
 * @returns {ReactElement} The home page
 */
export default function Home(): ReactElement {
  /* Memoized Card Components */

  /** Service cards for the services carousel */
  const serviceCards = useMemo(
    () =>
      SERVICES.map((service, index) => (
        <Card
          key={`service-${index}`}
          style={{ height: 288 }}
          title={service.title}
          description={service.description}
          icon={service.icon}
          showPrimaryAction
          primaryActionLabel="التسجيل للاختبار"
          showPrimaryIcon
          primaryTrailIconType="arrow-up-right-01"
          showSecondaryAction
          secondaryActionLabel="المزيد"
          showSecondaryIcon={false}
        />
      )),
    []
  );

  /** Partner cards for the partners carousel */
  const partnerCards = useMemo(
    () =>
      PARTNERS.map((partner) => (
        <Card
          key={`partner-${partner.id}`}
          image={partner.image}
          logoImage
          isImgCenter
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            textAlign: "center",
            padding: 16,
          }}
          imageWidth={162}
          imageHeight={162}
        />
      )),
    []
  );

  /** News cards for the news carousel */
  const newsCards = useMemo(
    () =>
      NEWS_ARTICLES.map((article) => (
        <Card
          key={`news-${article.id}`}
          title={article.title}
          description={article.description}
          image={article.image}
          showPrimaryAction
          primaryActionLabel="قراءة المزيد"
          buttonColor="secondary"
          showPrimaryIcon={false}
          linkPrimaryAction="#"
        />
      )),
    []
  );

  return (
    <>
      {/* Hero Banner */}
      <Banner />

      {/* Services Section */}
      <div className="bg-neutral-50">
        <section
          className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
          aria-label="اختبارات همزة"
        >
          <SectionHeader
            title="تعرف على اختبارات همزة"
            description="نوفر خدمات إلكترونية للتسجيل في الاختبارات، مع تقديم معلومات واضحة ومبسطة عن كل اختبار"
          />
          <div aria-label="عرض الاختبارات المتاحة">
            <Carousel itemsPerSlide={4} gap={20}>
              {serviceCards}
            </Carousel>
          </div>
        </section>
      </div>

      {/* News Section */}
      <section
        className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
        aria-label="الأخبار والمقالات"
      >
        <SectionHeader
          title="الاخبار والمقالات"
          description="نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير الاختبارات المعيارية للغة العربية"
        />
        <div className="section-spacing-4xl" aria-label="آخر الأخبار">
          <Carousel itemsPerSlide={3} gap={20}>
            {newsCards}
          </Carousel>
        </div>
      </section>

      {/* Statistics Section */}
      <div className="bg-neutral-50">
        <section
          className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
          aria-label="إحصائيات همزة"
        >
          <SectionHeader
            title="همزة في أرقام"
            description="يعرض قسم إحصائيات همزة بيانات عن عدد المختبرين عالميًا، وتنوّع الجنسيات والدول، إضافة إلى أعداد المختبرين في مراكز الاختبار."
          />
          <div aria-label="الإحصائيات العامة">
            <GlobalStatisticsSection />
          </div>
        </section>
      </div>

      {/* Partners Section */}
      <div className="bg-white">
        <section
          className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
          aria-label="الشركاء"
        >
          <div className="grid gap-[24px]">
            <div className="flex-between-center">
              <h2 className="display-sm-bold">الشركاء</h2>
            </div>
            <div className="flex-start-center gap-4" role="tablist" aria-label="تصفية الشركاء حسب الموقع">
              <Tag
                label="داخل المملكة العربية السعودية"
                variant="success"
                size="lg"
                trailIcon={{ src: "/assets/image/Country Flags.svg" }}
              />
              <Tag
                label="دول أخرى"
                variant="neutral"
                size="lg"
                trailIcon={{
                  src: "/assets/icons/stroke-standard/flag-02-stroke-rounded.svg",
                }}
              />
            </div>
          </div>
          <div aria-label="قائمة الشركاء">
            <Carousel
              itemsPerSlide={6}
              gap={20}
              showArrows
              arrowRadius="20%"
              arrowBgColor="#F3F4F6"
            >
              {partnerCards}
            </Carousel>
          </div>
        </section>
      </div>

      {/* Email Subscription Section */}
      <section
        className="content gap-[32px]"
        aria-label="التسجيل في النشرة البريدية"
      >
        <div className="grid gap-[24px] !flex flex-col bg-[#074D31] rounded-[16px] md:rounded-[24px] !px-[24px] md:!px-[80px] custom-container section-spacing-5xl">
          <div className="flex flex-col lg:flex-row md:justify-between lg:items-center gap-6">
            {/* Logo and Text */}
            <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
              <img
                src="/assets/image/small-logo.png"
                alt="شعار همزة"
                width={56}
                height={56}
                className="inline-block"
              />
              <div className="flex flex-col gap-4">
                <h2 className="display-sm-bold !text-white">سجل اهتمامك</h2>
                <p className="text-md-regular !text-white md:text-start !text-center">
                  سجل اهتمامك بالاختبارات المعيارية للغة العربية واحصل على أحدث التحديثات والأخبار.
                </p>
              </div>
            </div>

            {/* Email Form */}
            <form
              className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
              aria-label="نموذج الاشتراك في النشرة البريدية"
            >
              <DgaTextInput
                feedbackIconType="error"
                name="email"
                onBlur={() => {}}
                onChange={() => {}}
                onInput={() => {}}
                placeholder="ادخل بريدك الإلكتروني"
                size="lg"
                type="text"
                value=""
                variant="default"
                aria-label="البريد الإلكتروني"
              />
              <Button
                label="مشاركة"
                variant="primary-neutral--on-color"
                size="lg"
                icon="arrow-up-right-01"
                iconPosition="right"
                iconSize={16}
                type="submit"
                className="w-full md:w-auto"
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
