"use client";
import LastModified from "@/app/components/last-modified/LastModified";
import { DgaLink } from "platformscode-new-react";
export default function page() {
  return (
    <>
      <div className="content">
        <div className="!flex !flex-col !gap-[16px] !mb-30 section-spacing-5xl">
          <p className="text-md-regular">
            تحرص منصة اختبار همزة على تعزيز مشاركة المستفيدين في تطوير تجربة
            الاختبارات اللغوية، من خلال تمكينهم من تقديم آرائهم ومقترحاتهم عبر
            المنصة الإلكترونية، بما يسهم في تحسين جودة الاختبارات، ورفع كفاءة
            المحتوى، وتطوير الخدمات المقدّمة.
          </p>
          <h4 className="text-md-semibold">شروط وضوابط المشاركة المجتمعية:</h4>
          <ul className="[&>li]:!relative [&>li]:![padding-inline-start:1.5rem] [&>li]:before:!absolute [&>li]:before:![inset-inline-start:0] [&>li]:before:!content-['-'] text-md-regular">
            <li>
              الشفافية: تمكين الجمهور من الاطلاع على المبادرات وإبداء آرائهم
              حولها.
            </li>
            <li>
              التفاعل البنّاء: استقبال الملاحظات والمقترحات لضمان رفع جودتها
              والاستفادة منها.
            </li>
            <li>
              المشاركة الفعّالة: تشجيع جميع المستفيدين على تقديم آرائهم
              ومقترحاتهم للمساهمة في تطوير منصة اختبار همزة.
            </li>
            <li>
              الخصوصية وحماية البيانات: الالتزام بالتعامل مع جميع البيانات
              والمعلومات المقدّمة بسرية تامة، ووفقًا للأنظمة واللوائح المعمول
              بها في المملكة العربية السعودية.
            </li>
          </ul>
          <div className="!flex !flex-row  !m-0  !justify-start  !gap-[4px] !flex-wrap text-md-regular">
            للاطلاع على لوائح المشاركة الإلكترونية لدى
            <DgaLink
              external
              label="هيئة الحكومة الرقمية"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              url="https://dga.gov.sa/ar/E-Participation-Controls"
              variant="primary"
              onClick={() =>
                window.open(
                  "https://dga.gov.sa/ar/E-Participation-Controls",
                  "_blank",
                )
              }
            />
            <img
              src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
              width={20}
              height={20}
              className="icon-green hover:!text-[#54C08A] hover:!underline"
              alt="external link"
            />
          </div>
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
