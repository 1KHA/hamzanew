"use client";
import Card from "@/app/components/card/Card";

export default function page() {
  const pageContent = [
    {
      title: "سياسة المشاركة الإلكترونية",
      link: "/e-participation/policy",
    },
    {
      title: "الإستشارات الإلكترونية",
      link: "/e-participation/consultations",
    },
    {
      title: "التطوير المشترك والافكار",
      link: "/e-participation/co-creation",
    },
    {
      title: "البيانات المفتوحة",
      link: "/e-participation/open-data",
    },
    {
      title: "الشكاوى والمقترحات",
      link: "/e-participation/feedback-and-suggestion",
    },
    {
      title: "تقارير صوت المستفيد",
      link: "/e-participation/voice-reports",
    },
    {
      title: "إحصائيات الموقع والخدمات",
      link: "/e-participation/services-statistics",
    },
    {
      title: "وسائل التواصل الاجتماعي",
      link: "/e-participation/socail-media",
    },
  ];

  const participationCards = pageContent.map((item, index) => {
    return (
      <Card
        key={index}
        style={{
          border:"none",
          boxShadow:
            "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
        }}
        title={item.title}
        primaryTrailIconType="arrow"
        buttonIconOnly={true}
        linkSecondaryAction={item.link}
       
        
      />
    );
  });
  return (
    <>
      <div className="content">
        <div className="!flex !flex-col !gap-8 section-spacing-5xl">
          <div className="!flex !flex-col !gap-[16px]">
            <h1 className="display-sm-semibold">مواضيع المشاركة</h1>
            <p className="text-md-regular">
              هذا مثال على وصف القسم في نظام التصميم، حيث يتم الحفاظ على نفس
              النمط المتسق عبر جميع الأقسام الأخرى. هذا مثال على وصف القسم في
              نظام التصميم، حيث يتم الحفاظ على نفس النمط المتسق عبر جميع الأقسام
              الأخرى.
            </p>
          </div>
          <div className="!grid !grid-cols-1 md:!grid-cols-4 !gap-8">
            {participationCards}
          </div>
        </div>
      </div>
    </>
  );
}
