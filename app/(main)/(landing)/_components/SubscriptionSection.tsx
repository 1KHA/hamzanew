"use client";

import dynamic from "next/dynamic";

const DgaTextInput = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaTextInput),
  { ssr: false, loading: () => <input type="text" className="input__field" aria-hidden="true" /> }
);
import Button from "@/app/components/button/Button";
import { t } from "@/app/_lib/translationContext";

interface SubscriptionSectionProps {
  translations?: Record<string, string> | null;
}

/**
 * SubscriptionSection Component (Client Leaf)
 *
 * Handles the email subscription form with client-side interactivity.
 */
export default function SubscriptionSection({
  translations,
}: SubscriptionSectionProps) {
  return (
    <section
      className="content gap-[32px]"
      aria-label={t("hamza-news-letter-aria-section", translations) || "التسجيل في النشرة البريدية"}
    >
      <div className="grid gap-[24px] !flex flex-col bg-[#074D31] rounded-[16px] md:rounded-[24px] !px-[24px] md:!px-[80px] custom-container section-spacing-5xl">
        <div className="flex flex-col lg:flex-row md:justify-between lg:items-center gap-6">
          {/* Logo and Text */}
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <img
              src="/assets/image/small-logo.png"
              alt={t("hamza-logo-alt", translations) || "شعار همزة"}
              width={56}
              height={56}
              className="inline-block"
            />
            <div className="flex flex-col gap-4">
              <h2 className="display-sm-bold !text-white">
                {t("hamza-news-letter-title", translations) || "سجل اهتمامك"}
              </h2>
              <p className="text-md-regular !text-white md:text-start !text-center">
                {t("hamza-news-letter-description", translations) ||
                  "سجل اهتمامك بالاختبارات المعيارية للغة العربية واحصل على أحدث التحديثات والأخبار."}
              </p>
            </div>
          </div>

          {/* Email Form */}
          <form
            className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
            aria-label={t("hamza-news-letter-aria-form", translations) || "نموذج الاشتراك في النشرة البريدية"}
          >
            <DgaTextInput
              feedbackIconType="error"
              name="email"
              onChange={() => {}}
              onInput={() => {}}
              placeholder={t("hamza-news-letter-placeholder", translations) || "ادخل البريد الشبكي"}
              size="lg"
              type="text"
              value=""
              variant="default"
              aria-label={t("hamza-news-letter-aria-input", translations) || "البريد الشبكي للاشتراك في النشرة البريدية"}
            />
            <Button
              label={t("hamza-news-letter-button", translations) || "مشاركة"}
              variant="primary-neutral--on-color"
              size="lg"
              icon="arrow-up-right-01"
              iconPosition="right"
              iconSize={16}
              type="submit"
              className="w-full md:w-auto"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
