import Card from "@/app/components/card/Card";

export default function page() {
  return (
    <div className="content">
      <div className="section-spacing-5xl !mb-60">
        <div className=" !grid !grid-cols-1 !gap-8">
          <p className="text-md-regular !leading-[24px]">
            منصة تفاعل هي منصة حكومية رقمية تهدف إلى تعزيز التواصل والتفاعل بين
            الجهات الحكومية والمستفيدين، من خلال إتاحة قنوات إلكترونية تمكّن
            المستخدمين من إبداء آرائهم، تقديم المقترحات، والمشاركة في المبادرات
            والموضوعات المطروحة من الجهات الحكومية.
          </p>
          <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3">
            <Card
              title="منصة تفاعل"
              style={{
                border: "none",
                boxShadow:
                  "0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06)",
              }}
              linkSecondaryAction="https://eparticipation.my.gov.sa/"
              external={true}
              primaryTrailIconType="link-square-01"
              buttonIconOnly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
