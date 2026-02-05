import Card from "@/app/components/card/Card";
import LastModified from "@/app/components/last-modified/LastModified";

export default function page() {
  const pageContent = [
    {
      id: "1",
      name: "  المنصة الإلكترونية الموحدة - استطلاع      ",
      path: "https://istitlaa.ncc.gov.sa/ar/Pages/default.aspx",
      description:
        "تتيح منصة (استطلاع) للعموم وللقطاع الخاص والجهات الحكومية إبداء مرئياتهم حيال مشروعات الأنظمة واللوائح وما في حكمها ذات الصلة بالشؤون الاقتصادية والتنموية.",
    },

    {
      id: "2",
      name: "  منصة تفاعل",
      path: "https://eparticipation.my.gov.sa/",
      description:
        "منصة تفاعل هي منصة حكومية رقمية تهدف إلى تعزيز التواصل والتفاعل بين الجهات الحكومية والمستفيدين، من خلال إتاحة قنوات إلكترونية تمكّن المستخدمين من إبداء آرائهم، تقديم المقترحات، والمشاركة في المبادرات والموضوعات المطروحة من الجهات الحكومية.",
    },
  ];
  return (
    <>
    <div className="content">
      <div className=" section-spacing-5xl">
        {pageContent.map((content) => {
          return (
            <>
              <div className=" !grid !gap-8 !mt-[40px]">
                <p className="text-md-regular !leading-[24px]">
                  {content.description}
                </p>
                <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3">
                  <Card
                    key={content.id}
                    title={content.name}
                    style={{
                      border: "none",
                      boxShadow:
                        "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
                    }}
                    primaryTrailIconType="link-square-01"
                    buttonIconOnly={true}
                    linkSecondaryAction={content.path}
                    external={true} 
                  />
                </div>
              </div>
            </>
          );
        })}
      </div>
    
    </div>
    
    {/* Last update Date and time */}

      <LastModified
        date="31/12/2025"
        time="2:00 م"
        className="custom-container"
      />
      </>
  );
}
