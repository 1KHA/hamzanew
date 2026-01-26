"use client";
import Card from "@/app/components/card/Card";
import "../about.css";
import { DgaButton, DgaTag } from "platformscode-new-react";

export default function page() {
  const institutions = [
    "/assets/image/institutions1.png",
    "/assets/image/institutions2.png",
    "/assets/image/institutions3.png",
    "/assets/image/institutions1.png",
    "/assets/image/institutions2.png",
    "/assets/image/institutions3.png",
    "/assets/image/institutions2.png",
    "/assets/image/institutions3.png",
    "/assets/image/institutions2.png",
    "/assets/image/institutions3.png",
  ];

  const data = [
    {
      id: 1,
      title: "إحصائيات الاختبارات",
      description:
        "يُساعد اختبار همزة الناس حول العالم. يمكنك معرفة أداء المتقدمين السابقين للاختبار من خلال صفحة الإحصائيات لدينا.",
      icon: "chart-bar-line",
      externalLink: "#",
      primaryActionLabel: "تصفح الاحصائيات",
    },
    {
      id: 2,
      title: "احصل على النتائج التي تستحقها",
      description:
        "نوفر لك مجموعة واسعة من الموارد لمساعدتـــك فــي الحصـــول على نتائج الاختبار التي تحتاجــها. تابـــع تقــدمـــك، واحصـــل على المساعدة، واكتشف المزيد عبر صفحة الموارد لدينا.",
      icon: "book-04",
      externalLink: "#",
      primaryActionLabel: "التحضير للإختبار",
    },
  ];

  const institutionsCards = institutions.map((item, index) => {
    return (
      <Card
        key={index}
        image={item}
        isImgCenter={true}
        logoImage={true}
        style={{
          //   display: "flex",
          //   flexDirection: "column",
          // //   flex:"1 0 0",
          //   width:"100%",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   gap: 10,
          //   textAlign: "center",
          //   padding: 16,
          borderRadius: 16,
          border: "1px solid #D2D6DB",
        }}
        imageWidth={250}
        imageHeight={80}
      />
    );
  });

  const dataCards = data.map((item) => {
    return (
      <Card
        key={item.id}
        style={{
          height:"268px"
        }}
        title={item.title}
        description={item.description}
        icon={item.icon}
        showPrimaryAction={true}
        primaryActionLabel={item.primaryActionLabel}
        primaryTrailIconType="link-square-01"
        buttonColor="primary-brand"
        external={true}
        linkPrimaryAction={item.externalLink}
      />
    );
  });
  return (
    <>
      <div
        className="custom-container"
        style={{
          border: "1px solid red",
        }}
      >
        {/* upper section */}
        <div
          className="stack-4xl block-padding-8x"
          style={{
            border: "1px solid #0a7a3a",
          }}
        >
          <div className="section-head">
            <p className="section-title">كن جزءًا من مجتمع همزة</p>
            <h1 className="section-header">الجهات التي طبقت اختبار همزة</h1>
          </div>
          <div className="flex-start-center gap-4">
            <DgaTag
              label="داخل المملكة العربية السعودية"
              leadIcon={{
                name: "CircleIcon",
                type: "rounded",
                variant: "stroke",
              }}
              size="md"
              variant="success"
            />
            <DgaTag
              label="دول أخرى"
              leadIcon={{
                name: "FlagIcon",
                type: "rounded",
                variant: "stroke",
              }}
              size="md"
              variant="neutral"
            />
          </div>
          <div className="grid-cols-5-gap-24">{institutionsCards}</div>
        </div>

        {/* middle section */}
        <div
          className="row-center-gap-3xl block-padding-8xl"
          style={{
            border: "1px solid pink",
          }}
        >
          {dataCards}
        </div>
      </div>
      {/* bottom section */}
      {/* <div
        className="bg-primary-074d31 section-bg-bottom-image block-padding-8xl"
        style={{
          border: "1px solid purple",
        }}
      >
        <div
          className="stack-lg custom-container"
          style={{
            border: "1px solid red",

            width: "clamp(280px, 90vw, 704px)",
            aspectRatio: "704 / 196",
            height: "auto",
            maxWidth: "100%",
            minWidth: 0,
          }}
        >
          <h1>هل أنت مستعد للانضمام إلينا؟</h1>
          <p>
            انضم إلى آلاف المؤسسات والشركات في العالم العربي التي تعتمد همزة
            لاختيار الموظفين القادرين على التواصل باحترافية وإتقان.
          </p>
          <button className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color">
            <span className="dga-btn-label"> إنضم إلينا</span>
            <img src="/assets/image/link-square-01.svg" alt="" />
          </button>
        </div>
      </div> */}
      <div className="section-bg-bottom-image block-padding-8xl section-cta">
  <div className="stack-lg custom-container section-cta__box">
    <h1 className="section-cta__title">هل أنت مستعد للانضمام إلينا؟</h1>

    <p className="section-cta__desc">
      انضم إلى آلاف المؤسسات والشركات في العالم العربي التي تعتمد همزة لاختيار
      الموظفين القادرين على التواصل باحترافية وإتقان.
    </p>

    <button className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color">
      <span className="dga-btn-label">إنضم إلينا</span>
      <img src="/assets/image/link-square-01.svg" alt="" />
    </button>
  </div>
</div>

    </>
  );
}
