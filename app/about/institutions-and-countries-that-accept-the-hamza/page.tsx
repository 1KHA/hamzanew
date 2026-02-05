"use client";
import Card from "@/app/components/card/Card";
import LastModified from "@/app/components/last-modified/LastModified";
import "../about.css";
// import { DgaButton, DgaTag } from "platformscode-new-react"; // TEMPORARILY DISABLED
import Tag from "../../components/tag/Tag";

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
    "/assets/image/institutions1.png",
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

  const institutionsCards = institutions.map((imagePath, index) => {
    return (
      <div
        className="card h-40 flex !items-center justify-center !p-[32px]"
        key={index}
      >
        <div className=" h-80     align-center flex justify-center items-center ">
          <img
            src={imagePath}
            alt="institution logo"
            className=" fit-contain  logo-image"
          />
        </div>
      </div>
    );
  });

  const dataCards = data.map((item) => {
    return (
      <Card
        key={item.id}
        style={
          {
            // height: "268px",
          }
        }
        title={item.title}
        description={item.description}
        icon={item.icon}
        showPrimaryAction={true}
        primaryActionLabel={item.primaryActionLabel}
        primaryTrailIconType="arrow-up-right-01"
        buttonColor="primary-brand"
        external={true}
        linkPrimaryAction={item.externalLink}
      />
    );
  });
  return (
    <>
      <div className="custom-container">
        {/* upper section */}
        <div className="stack-xl block-padding-3xl">
          <div className="section-head">
            <p className="section-title">كن جزءًا من مجتمع همزة</p>
            <h1 className="section-header">الجهات التي طبقت اختبار همزة</h1>
          </div>
          <div className="flex-start-center gap-4">
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
          <div className="!grid !grid-cols-1 md:!grid-cols-5 !gap-4  items-stretch">
            {institutionsCards}
          </div>
        </div>

        {/* middle section */}
        <div className="row-center-gap-3xl block-padding-8xl">{dataCards}</div>
      </div>
      {/* bottom section */}
      <div className="section-bg-bottom-image block-padding-8xl section-cta">
        <div className="stack-lg custom-container section-cta__box">
          <h1 className="section-cta__title">هل أنت مستعد للانضمام إلينا؟</h1>

          <p className="section-cta__desc">
            انضم إلى آلاف المؤسسات والشركات في العالم العربي التي تعتمد همزة
            لاختيار الموظفين القادرين على التواصل باحترافية وإتقان.
          </p>

          <button className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color">
            <span className="dga-btn-label">إنضم إلينا</span>
            <img
              src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg"
              width={24}
              height={24}
              alt=""
            />
          </button>
        </div>
      </div>
      <LastModified
        date="31/12/2025"
        time="2:00 م"
        className="custom-container"
      />
    </>
  );
}
