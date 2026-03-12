"use client";

/**
 * PolicyContent Component
 *
 * Displays the E-Participaton Policy content.
 * This component is client-side rendered to handle interactive elements like the external link.
 *
 * @accessibility
 * - Uses semantic HTML tags (`<h4>`, `<ul>`, `<li>`) for structured content.
 * - Ensures list items are properly nested and readable by screen readers.
 * - External link includes proper `target="_blank"` and `rel="noopener noreferrer"` attributes for security and accessibility.
 * - Decorative icons are marked with `aria-hidden="true"` where appropriate (if purely visual).
 */

import Image from "next/image";
import { DgaLink } from "platformscode-new-react";

export default function PolicyContent() {
  return (
    <div className="content">
      <div className="!flex !flex-col !gap-[16px] !mb-30 section-spacing-5xl">
        {/*
         * Intro Paragraph
         * Provides context about the platform's goals.
         */}
        <p className="text-md-regular">
          تحرص منصة اختبار همزة على تعزيز مشاركة المستفيدين في تطوير تجربة
          الاختبارات اللغوية، من خلال تمكينهم من تقديم آرائهم ومقترحاتهم عبر
          المنصة الإلكترونية، بما يسهم في تحسين جودة الاختبارات، ورفع كفاءة
          المحتوى، وتطوير الخدمات المقدّمة.
        </p>

        {/*
         * Conditions Section
         * Uses semantic heading and list for accessibility.
         */}
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
            المشاركة الفعّالة: تشجيع جميع المستفيدين على تقديم آرائهم ومقترحاتهم
            للمساهمة في تطوير منصة اختبار همزة.
          </li>
          <li>
            الخصوصية وحماية البيانات: الالتزام بالتعامل مع جميع البيانات
            والمعلومات المقدّمة بسرية تامة، ووفقًا للأنظمة واللوائح المعمول بها
            في المملكة العربية السعودية.
          </li>
        </ul>

        {/*
         * External Link Section
         * Provides a direct link to the Digital Government Authority's regulations.
         */}
        <div className="!flex !flex-row !m-0 !justify-start !gap-[4px] !flex-wrap text-md-regular items-center">
          <span>للاطلاع على لوائح المشاركة الإلكترونية لدى</span>
          <div className="inline-flex items-center gap-1">
            <DgaLink
              external
              label="هيئة الحكومة الرقمية"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              url="https://dga.gov.sa/ar/E-Participation-Controls"
              variant="primary"
              // Accessibility: Ensure screen readers know this opens a new tab
              aria-label="هيئة الحكومة الرقمية (يفتح في علامة تبويب جديدة)"
              onClick={() =>
                window.open(
                  "https://dga.gov.sa/ar/E-Participation-Controls",
                  "_blank",
                )
              }
            />
            {/* Visual indicator for external link */}
            <Image
              src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
              width={20}
              height={20}
              className="icon-green"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
