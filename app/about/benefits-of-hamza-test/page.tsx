"use client";
import ScrollFrame from "@/app/components/scroll-frame/ScrollFrame";
import "../about.css";
export default function page() {
  const benefits = [
    {
      number: 1,
      title: "تمكين",
      description:
        "مجمع الملك سلمان العالمي للغة العربية من الريادة والمرجعية العالمية في خدمة اللغة العربية.",
    },
    {
      number: 2,
      title: "فتح أبواب الفرص",
      description: "يعزز فرصك الأكاديمية والمهنية في الجامعات وسوق العمل.",
    },
    {
      number: 3,
      title: "تطوير لغتك",
      description:
        "يساعدك الاختبار على معرفة مستواك بدقة، مما يمكّنك من وضع خطة واضحة لتحسين مهاراتك اللغوية",
    },
  ];

  const benefitsCards = benefits.map((benefit, index) => (
    <div
      key={index}
      className="about-value-card"
      style={{
        borderRadius: "var(--radius-lg, 16px)",
        background: "#F9FAFB",
      }}
    >
      <div className="about-value-card__header">
        <div className="about-value-card__badge">{benefit.number}</div>
        <div className="about-value-card__content">
          <h3 className="about-value-card__title">{benefit.title}</h3>
          <p className="about-value-card__desc">{benefit.description}</p>
        </div>
      </div>
    </div>
  ));
  const myData = [
    {
      number: "01",
      content:
        "قياس الكفاءة اللغوية لدى متعلمي اللغة العربية من غير الناطقين بها",
      icon: "../assets/image/image 11.png",
    },
    {
      number: "02",
      content: "المفاضلة بين المتقدمين للبرامج الأكاديمية.",
      icon: "../assets/image/image 7.png",
    },
    {
      number: "03",
      content: "التنافس على المنح الدراسية.",
      icon: "../assets/image/image 8.png",
    },
    {
      number: "04",
      content: "قياس نواتج التعلم في المقررات الدراسية وتطوير مخرجات التعليم",
      icon: "../assets/image/image 10.png",
    },
    {
      number: "05",
      content: "الإعفاء من بعض المقررات الجامعية.",
      icon: "../assets/image/image 9.png",
    },
  ];

  return (
    <>
      <div
        className="bg-color-grey-50"
        style={{
          padding: "clamp(16px, 3vw, 32px) clamp(16px, 6vw, 80px)",
        }}
      >
        <div
          className="custom-container stack"
          style={{
            display: "flex",
            padding: "clamp(20px, 5vw, 70px)",
            gap: "clamp(16px, 5vw, 70px)",
            borderRadius: 16,
            background: "#FFF",
          }}
        >
          {/* upper section */}
          <div className="flex-start-gap-80">
            <div className="stack-xl">
              <div className="section-head">
                <p className="section-title">كيفية الإستفادة من همزة</p>
                <h1 className="section-header">
                  فوائد اختبارات همزة للمختبرين
                </h1>
              </div>
              <p className="description">
                توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في
                اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو
                الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في
                اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في
                بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.
              </p>
            </div>
            <div className="stack-lg">{benefitsCards}</div>
          </div>
          {/* bottom section */}
          <ScrollFrame slides={myData} />
        </div>
      </div>

    </>
  );
}
