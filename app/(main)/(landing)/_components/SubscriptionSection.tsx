"use client";

import Button from "@/app/components/button/Button";
import TextInput from "@/app/components/text-input/TextInput";

/**
 * SubscriptionSection Component (Client Leaf)
 *
 * Handles the email subscription form with client-side interactivity.
 */
export default function SubscriptionSection() {
  return (
    <section
      className="content gap-[32px]"
      aria-label="التسجيل في النشرة البريدية"
    >
      <div className="grid gap-[24px] !flex flex-col bg-[#074D31] rounded-[16px] md:rounded-[24px] !px-[24px] md:!px-[80px] custom-container section-spacing-5xl">
        <div className="flex flex-col lg:flex-row md:justify-between lg:items-center gap-6">
          {/* Logo and Text */}
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <img
              src="/assets/image/small-logo.png"
              alt="شعار همزة"
              width={56}
              height={56}
              className="inline-block"
            />
            <div className="flex flex-col gap-4">
              <h2 className="display-sm-bold !text-white">سجل اهتمامك</h2>
              <p className="text-md-regular !text-white md:text-start !text-center">
                سجل اهتمامك بالاختبارات المعيارية للغة العربية واحصل على أحدث
                التحديثات والأخبار.
              </p>
            </div>
          </div>

          {/* Email Form */}
          <form
            className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
            aria-label="نموذج الاشتراك في النشرة البريدية"
          >
            <TextInput
              type="email"
              name="email"
              placeholder="ادخل البريد الشبكي"
              aria-label="البريد الشبكي للاشتراك في النشرة البريدية"
              size="lg"
              variant="default"
              autoComplete="email"
              extraClass="md:!w-[280px]"
            />
            <Button
              label="مشاركة"
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
