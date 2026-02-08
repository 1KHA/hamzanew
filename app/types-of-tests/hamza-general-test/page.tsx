"use client";
import Image from "next/image";
import WideCard from "@/app/components/card/WideCard";
import MiniCard from "@/app/components/card/MiniCard";
// import LastModified from "@/app/components/last-modified/LastModified";
import bg from "@/public/assets/image/bg-image.png";
import CtaSection from "@/app/components/CtaSection";

export default function page() {
  const testinformation = [
    {
      icon: "time-02",
      title: "مدة الاختبار",
      description: "(115) دقيقة",
    },
    {
      icon: "right-to-left-list-bullet",
      title: "عدد فقرات الاختبار",
      description: "(57) فقرة",
    },
    {
      icon: "cursor-in-window",
      title: "يطبيق الاختبار",
      description: "عند بعد",
    },
    {
      icon: "building-06",
      title: "يطبيق الاختبار",
      description: "في مراكز الاختبار",
    },
  ];
  const testSections = [
    {
      icon: "ear",
      title: "الفهم المسموع",
      description: "قياس قدرتك على متابعة المحادثات والحوارات اليومية.",
      tagLable: "عدد الاسئلة  25 فقرة",
      trailIcon: "message-question",
    },
    {
      icon: "book-open-02",
      title: "استيعاب المقروء",
      description: "اختبار فهمك للنصوص العامة والمتنوعة.",
      tagLable: "عدد الاسئلة  25 فقرة",
      trailIcon: "message-question",
    },
    {
      icon: "edit-01",
      title: "الكتابة",
      description: "تقييم قدرتك على التعبير بلغة دقيقة ومنظمة في موضوعات عامة.",
      tagLable: "عدد الاسئلة  2 فقرة",
      trailIcon: "message-question",
    },
    {
      icon: "comment-01",
      title: "التحدث",
      description:
        "قياس دقة لغتك وطلاقتك في استخدام اللغة في المحادثات العامة.",
      tagLable: "عدد الاسئلة  5 فقرة",
      trailIcon: "message-question",
    },
  ];
  return (
    <>
      <div
        className="bg-color-grey-50"
        style={{
          backgroundColor: "#f9fafb",
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "1260px 0px",
        }}
      >
        <div className="custom-container !py-[128px] !grid !grid-cols-1 lg:!grid-cols-2 !gap-[70px]">
          <div className="!flex !flex-col !gap-[14px]">
            {/* 1 */}
            <div className="flex! justify-start! gap-[5px]!">
              <div className="circular-border-green">
                <Image
                  src={
                    "/assets/icons/stroke-standard/glasses-stroke-rounded.svg"
                  }
                  alt="glasses"
                  width={16}
                  height={16}
                  className="green-icon"
                />
              </div>

              <p className="text-lg-medium text-[#1b8354]">اختبار همزة العام</p>
            </div>
            {/* 2 */}
            <div className="!flex !items-center !justify-start !gap-[14px]">
              <h1 className="display-md-bold">أقسام الاختبار</h1>
              <span>
                <Image
                  src={
                    "/assets/icons/stroke-standard/arrow-left-02-stroke-rounded.svg"
                  }
                  alt="arrow-left-02-stroke-rounded"
                  width={38}
                  height={38}
                />
              </span>
            </div>
            {/* 3 */}

            <p className="text-md-regular">
              صُمّم اختبار همزة ليقدّم تقييمًا شاملًا لمستوى الكفاءة اللغوية في
              اللغة العربية من خلال أربعة أقسام رئيسية:
            </p>

            <div className="grid! grid-cols-1! md:grid-cols-2! gap-[24px]!">
              {testinformation.map((info, index) => (
                <MiniCard
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  description={info.description}
                />
              ))}
            </div>
          </div>

          <div className="!grid !grid-cols-1 !gap-5">
            {testSections.map((section, index) => (
              <WideCard
                key={index}
                icon={section.icon}
                title={section.title}
                description={section.description}
                tagLable={section.tagLable}
                trailIcon={section.trailIcon}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-color-grey-50">
        <div className="content !relative !h-[148px] !mb-[165px]">
          {/* <div className="!py-[40px] !px-[80px] !h-full"> */}
              <CtaSection
            title="هل أنت مستعد لاختبار همزة العام؟"
            link="#"
          />
          {/* </div> */}
        
        </div>
      </div>
    </>
  );
}
