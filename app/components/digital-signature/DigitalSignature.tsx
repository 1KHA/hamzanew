"use client";

/**
 * DigitalSignature — government site verification banner.
 * Shows site credentials and toggles a collapsible trust-details panel.
 *
 * Accessibility: WCAG 2.1 AA — toggle uses <button> with aria-expanded/aria-controls,
 *   panel has role="region" + aria-hidden when collapsed, decorative images are aria-hidden.
 * Performance: handlers in useCallback, stable panel ID via useId, Next.js <Image>.
 */

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useId } from "react";
import "./DigitalSignature.css";

export default function DigitalSignature() {
  const [isOpen, setIsOpen] = useState(false);

  // Stable ID for aria-controls / aria-labelledby relationship
  const panelId = useId();

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Directly mutates <html> lang/dir — intentional, no React state needed
  const switchLanguage = useCallback(() => {
    const html = document.documentElement;
    const isArabic = html.lang === "ar";
    html.lang = isArabic ? "en" : "ar";
    html.dir = isArabic ? "ltr" : "rtl";
  }, []);

  return (
    <div className="bg-[#f5f5f5]">
      <div className="digital_wrapper custom-container">
        <div className="flex justify-between">

          {/* Site badge + toggle button */}
          <div className="digital_container digital_heads">
            <div className="flex flex-row gap-[8px] justify-center items-center">
              <div className="digital_icon_container">
                <Image
                  src="/assets/image/Country Flags.svg"
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="inline-block"
                />
              </div>
              <p>موقع حكومي مسجل لدى هيئة الحكومة الرقمية</p>
            </div>

            {/*
             * <button> instead of <a href="#"> — no navigation occurs,
             * so a button is the semantically correct element here.
             * aria-expanded + aria-controls link it to the panel below.
             */}
            <button
              type="button"
              className="digital_link link_label !flex !items-center !gap-2 !bg-transparent !border-0 !p-0 !cursor-pointer"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              كيف تتحقق
              <span className="digital_link_icon" aria-hidden="true">
                <Image
                  src={
                    isOpen
                      ? "/assets/icons/stroke-standard/arrow-up-01-stroke-rounded.svg"
                      : "/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                  }
                  alt=""
                  width={20}
                  height={20}
                  className="inline-block"
                />
              </span>
            </button>
          </div>

          {/* Language switcher */}
          <button
            type="button"
            className="dga-btn dga-btn--sm dga-btn--subtle !hidden lg:!flex"
            onClick={switchLanguage}
            aria-label="تبديل اللغة إلى الإنجليزية"
          >
            <Image
              src="/assets/icons/stroke-standard/translation-stroke-rounded.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
            />
            <span>English</span>
          </button>
        </div>

        {/*
         * Collapsible panel.
         * CSS grid-template-rows animates height without JS pixel measurements.
         * aria-hidden removes it from the AT tree when closed so keyboard
         * users cannot Tab into invisible content.
         */}
        <div
          id={panelId}
          role="region"
          aria-label="تفاصيل التحقق من الموقع"
          aria-hidden={!isOpen ? true : undefined}
          className={`digital_collapsible ${isOpen ? "open" : ""}`}
        >
          <div className="min-h-0">
            <div className="digital_content">
              <div className="digital_content_container">

                {/* Trust item 1: .gov.sa domain */}
                <div className="digital_content_item">
                  <div className="digital_content_item_icon">
                    <Image
                      src="/assets/icons/link-04.png"
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      className="inline-block text-[#067647]"
                    />
                  </div>
                  <div className="digital_content_item_content">
                    <h2>
                      روابط المواقع الالكترونية الرسمية السعودية تنتهي بـ
                      <span>&nbsp;.gov.sa</span>
                    </h2>
                    <p>
                      جميع روابط المواقع الرسمية التابعة للجهات الحكومية في
                      المملكة العربية السعودية تنتهي بـ .gov.sa
                    </p>
                  </div>
                </div>

                {/* Trust item 2: HTTPS */}
                <div className="digital_content_item">
                  <div className="digital_content_item_icon">
                    <Image
                      src="/assets/icons/square-lock-password.png"
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      className="inline-block"
                    />
                  </div>
                  <div className="digital_content_item_content">
                    <h2>
                      المواقع الالكترونية الحكومية تستخدم بروتوكول
                      <span>&nbsp;HTTPS</span>&nbsp;للتشفير و الأمان.
                    </h2>
                    <p>
                      المواقع الالكترونية الآمنة في المملكة العربية السعودية
                      تستخدم بروتوكول HTTPS للتشفير.
                    </p>
                  </div>
                </div>
              </div>

              {/* DGA registration number */}
              <div className="digital_more_content !px-6">
                <div className="flex xs:flex-col md:flex-row gap-[24px] content-center">
                  <div className="digital_more_content_icon">
                    <Image
                      src="/assets/icons/DGA logo.png"
                      alt="شعار هيئة الحكومة الرقمية"
                      width={21}
                      height={31}
                      className="inline-block"
                    />
                  </div>
                  <div className="digital_more_content_content self-center text-start">
                    <p>مسجل لدى هيئة الحكومة الرقمية برقم:</p>
                    <Link
                      href="/"
                      className="!self-start link link--md link--primary link--inline link_label"
                    >
                      <span className="flex flex-row gap-[4px]">
                        <span>1234567890</span>
                        <Image
                          src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
                          alt=""
                          aria-hidden="true"
                          width={16}
                          height={16}
                          className="icon-green"
                        />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
