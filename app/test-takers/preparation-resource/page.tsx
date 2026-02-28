import Button from "@/app/components/button/Button";
import Card from "@/app/components/card/Card";
import { Metadata } from "next";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "مصادر التحضير",
  description: "مصادر التحضير لاختبار همزة",
};
const RESOURCES = [
  {
    title: "مران",
    description:
      "تتيح لك فرصة التعلّم الذاتي في أي وقت ومن أي مكان، مما يساعدك على البقاء على تواصل مستمر مع مواد التدريب.",
    icon: "file-star",
  },
  {
    title: "الية الاختبار",
    description: "خيارات مرنة لأداء اختبار همزة",
    icon: "edit-01",
  },
  {
    title: "الارشادات ليوم الاختبار",
    description:
      "تحتوي على ارشادات عملية ونصائح متخصـــصة تساعـــدك في يوم الاختبار بفاعليــة وثقـــة",
    icon: "book-open-02",
  },
];
export default function PreparationResourcePage() {
  return (
    <section>
      <div className="cta-bg-image bg-primary-074d31 !py-[32px]">
        <div className="custom-container !py-[48px] lg:!py-[96px]">
          {/* Resources Section */}
          <div className="!grid !grid-cols-1 lg:!grid-cols-12 !gap-20">
            <div className="!flex !flex-col !gap-[14px] lg:!col-span-3">
              <h2 className="display-sm-bold !text-[#fff]">نقدم لك</h2>
              <p className="text-md-medium !font-normal !text-[#fff]">
                تمنحك مـــواردنـا التعليميـــة فرصـــة للاطـــلاع على أسئلة
                وأجوبة واقعية تساعدك على فهم طبيعة الاختبار وتوقّع أسلوبه.
              </p>
            </div>

            <ul className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-[24px] lg:!col-span-9">
              {RESOURCES.map((resource, index) => (
                <li key={index}>
                  <Card
                    title={resource.title}
                    description={resource.description}
                    icon={resource.icon}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className="relative !py-[32px]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0) 24.44%, #074d31 99.77%), url('/assets/image/bg-image-3.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="custom-container !py-[48px] lg:!py-[96px]">
          <div className="!flex !justify-start !max-w-[100%] lg:!max-w-[40%]">
            <div className="!flex !flex-col !gap-[14px]">
              <h2 className="display-sm-bold !text-[#fff]">
                تقدم لاختبار همزة بسهولة
              </h2>

              <p className="text-md-medium !font-normal !text-[#fff]">
                يمكنك التحضير للاختبار بسهولة باستخدام المواد التدريبية ومقاطع
                الفيديو التي تساعدك على فهم محتوى الاختبار ومتطلباته.
              </p>
              <Button
                label="التسجيل في الإختبار"
                variant="secondary"
                size="md"
                icon="arrow-up-right-01"
                iconPosition="right"
                className="md:!max-w-[30%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
