"use client";
import { DgaTag } from "platformscode-new-react";
import Banner from "./components/Banner";
import Tag from "./components/tag/Tag";

import Carousel from "./components/carousel/Carousel";
import "./styles/Button.css";
import GlobalStatisticsSection from "./components/global-statistics-section/GlobalStatisticsSection";
import Card from "./components/card/Card";
export default function Home() {
  // fake  data
  const services = [
    {
      title: "اختبار همزة العام",
      disc: "اختبار لقياس كفايات اللغة العربية للناطقين بغيرها لأغراض عامة.",
      icon: "glasses", // or: "exam-01"
    },
    {
      title: "اختبار همزة الأكاديمي",
      disc: "اختبار محوسب، دقيق، يقيس كفايات اللغة العربية للناطقين بغيرها لأغراض أكاديمية.",
      icon: "mortarboard-01",
    },
    {
      title: "اختبار تحديد المستوى",
      disc: "اختبار لتحديد مستوى الكفاءة اللغوية العامة باللغة العربية لغير الناطقين بها لاستخدامه في البرامج الأكاديمية.",
      icon: "star",
    },
    {
      title: "اختبار همزة المفردات",
      disc: "اختبار معياري لقياس مستويات المفردات لدى الناطقين بغير العربية لأغراض مختلفة.",
      icon: "book-01",
    },
  ] as const;
  const partners = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `شريك ${i + 1}`,
    image: "/assets/image/Palm_Swords.svg", // put your image path here
  }));

  const fakeNews = [
    {
      id: 1,
      title: "إقبال واسع على منصة اختبارات همزة في مرحلتها الأولى",
      des: "شهدت المنصة تفاعلاً كبيراً من المتقدمين لقياس كفايات اللغة العربية، مع تحديثات مستمرة على تجربة المستخدم.",
      image: "/assets/image/photo2.jpg",
    },
    {
      id: 2,
      title: "اختبارات همزة توفر مؤشرات نوعية لدعم الباحثين وصنّاع القرار",
      des: "تم إطلاق لوحة مؤشرات تعرض نتائج تحليلية تساعد الجهات التعليمية على تحسين برامجها وتطوير مخرجاتها.",
      image: "/assets/image/photo1.jpg",
    },
    {
      id: 3,
      title:
        "منصة اختبارات همزة تطلق النسخة التجريبية الأولى لقياس كفايات العربية",
      des: "تتضمن النسخة التجريبية مسارات متعددة وأسئلة معيارية مصممة وفق أفضل الممارسات لضمان جودة القياس.",
      image: "/assets/image/photo4.jpg",
    },
    {
      id: 4,
      title: "تطوير بنوك أسئلة جديدة لرفع دقة القياس في مهارات اللغة",
      des: "يتم العمل على إثراء بنك الأسئلة وإضافة نماذج تقييم متنوعة لقياس الفهم والكتابة والاستيعاب.",
      image: "/assets/image/photo1.jpg",
    },
    {
      id: 5,
      title: "شراكات جديدة لتعزيز جودة المحتوى وتوسيع نطاق الاختبارات",
      des: "تسعى المنصة إلى التعاون مع جهات أكاديمية وخبراء لتطوير المحتوى وبناء معايير أكثر تخصصاً.",
      image: "/assets/image/photo1.jpg",
    },
    {
      id: 6,
      title: "تحسين تجربة التسجيل وإتاحة الوصول عبر الأجهزة المختلفة",
      des: "تم تحديث واجهة التسجيل وتحسين الأداء لضمان تجربة سلسة على الهاتف والكمبيوتر مع دعم كامل للاتجاه RTL.",
      image: "/assets/image/photo1.jpg",
    },
  ];

  const servicesCard = services.map((item, index) => {
    return (
      <Card
        key={index}
        style={{ height: 288 }}
        title={item.title}
        description={item.disc}
        icon={item.icon}
        showPrimaryAction={true}
        primaryActionLabel="التسجيل للاختبار"
        showPrimaryIcon={true}
        primaryTrailIconType="arrow-up-right-01"
        showSecondaryAction
        secondaryActionLabel="المزيد"
      />
    );
  });
  const partnersCards = partners.map((p) => (
    <Card
      key={p.id}
      image={p.image}
      title={p.title}
      logoImage={true}
      isImgCenter={true}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        textAlign: "center",
        padding: 16,
      }}
      imageWidth={42}
      imageHeight={42}
    />
  ));

  const newsCards = fakeNews.map((item, index) => (
    <Card
      key={item.id}
      title={item.title}
      description={item.des}
      image={item.image}
      showPrimaryAction={true}
      primaryActionLabel="قراءة المزيد"
      // buttonColor="primary-brand"
      showPrimaryIcon={false}
      linkPrimaryAction="#"
    />
  ));

  return (
    <>
      {/* Carousel */}
      <Banner />
      {/* */}

      {/* services section */}
      <div className="bg-neutral-50">
        <section className="section-spacing-5xl custom-container gap-[32px] !flex flex-col">
          <div className="grid gap-[24px]">
            <div className="flex-between-center">
              <h1 className="display-sm-bold"> تعرف على اختبارات همزة </h1>
              <button className="dga-btn dga-btn--md  text-warp dga-btn--secondary-outline">
                <span className="dga-btn-label">عرض الكل</span>
              </button>
            </div>

            <p className="text-md-regular  ">
              نوفر خدمات إلكترونية للتسجيل في الاختبارات، مع تقديم معلومات واضحة
              ومبسطة عن كل اختبار
            </p>
          </div>
          <div className="">
            <Carousel itemsPerSlide={4} gap={20}>
              {servicesCard}
            </Carousel>
          </div>
        </section>
      </div>

      {/* <div className=""> */}
      {/* news section */}
      <section className="section-spacing-5xl custom-container gap-[32px] !flex flex-col">
        <div className="grid gap-[24px]">
          <div className="flex-between-center">
            <h1 className="display-sm-bold"> الاخبار والمقالات</h1>
            <button className="dga-btn dga-btn--md dga-btn--secondary-outline">
              <span className="dga-btn-label">عرض الكل</span>
            </button>
          </div>

          <p className="text-md-regular ">
            نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير
            الاختبارات المعيارية للغة العربية
          </p>
        </div>
        <div className="section-spacing-4xl">
          <Carousel itemsPerSlide={3} gap={20}>
            {newsCards}
          </Carousel>
        </div>
      </section>
      {/* </div> */}

      {/* hamza in numbers section */}

      <div className="bg-neutral-50">
        <section className="section-spacing-5xl custom-container gap-[32px] !flex flex-col">
          <div className="grid gap-[24px]">
            <div className="flex-between-center">
              <h1 className="display-sm-bold"> همزة في أرقام</h1>
              <button className="dga-btn dga-btn--md dga-btn--secondary-outline">
                <span className="dga-btn-label">عرض الكل</span>
              </button>
            </div>

            <p className="text-md-regular ">
              نوفر خدمات إلكترونية للتسجيل في الاختبارات، مع تقديم معلومات واضحة
              ومبسطة عن كل اختبار
            </p>
          </div>

          <div className="">
            <GlobalStatisticsSection />
          </div>
        </section>
      </div>
      <div className="bg-white">
        {/* partners section */}
        <section className="section-spacing-5xl custom-container gap-[32px] !flex flex-col">
          <div className="grid gap-[24px]">
            <div className="flex-between-center">
              <h1 className="display-sm-bold">الشركاء</h1>
            </div>
            <div className=" flex-start-center gap-4">
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
          <div className="">
            <Carousel
              itemsPerSlide={partners.length - 6}
              gap={20}
              showArrows={true}
              arrowRadius="20%"
              arrowBgColor="#F3F4F6"
            >
              {partnersCards}
            </Carousel>
          </div>
        </section>
      </div>
    </>
  );
}
