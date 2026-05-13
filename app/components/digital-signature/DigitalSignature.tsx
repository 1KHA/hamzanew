"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useId, useEffect } from "react";
import "./DigitalSignature.css";
import { useRouter } from "next/navigation";

type Lang = "ar" | "en";

const t = {
  ar: {
    badge: "موقع حكومي مسجل لدى هيئة الحكومة الرقمية",
    verify: "كيف تتحقق",
    panelLabel: "تفاصيل التحقق من الموقع",
    domainTitle: "روابط المواقع الالكترونية الرسمية السعودية تنتهي بـ",
    domainBody:
      "جميع روابط المواقع الرسمية التابعة للجهات الحكومية في المملكة العربية السعودية تنتهي بـ .gov.sa",
    httpsTitle: "المواقع الالكترونية الحكومية تستخدم بروتوكول",
    httpsSuffix: "للتشفير و الأمان.",
    httpsBody:
      "المواقع الالكترونية الآمنة في المملكة العربية السعودية تستخدم بروتوكول HTTPS للتشفير.",
    dgaAlt: "شعار هيئة الحكومة الرقمية",
    dgaLabel: "مسجل لدى هيئة الحكومة الرقمية برقم:",
    langBtn: "English",
    langAriaLabel: "Switch language to English",
  },
  en: {
    badge: "Official government website of the Government of the Kingdom of Saudi Arabia",
    verify: "How to verify",
    panelLabel: "Site verification details",
    domainTitle: "Links to official Saudi websites end with",
    domainBody:
      "All links to official websites of government agencies in the Kingdom of Saudi Arabia end with .gov.sa",
    httpsTitle: "Government websites use the",
    httpsSuffix: "protocol for encryption and security.",
    httpsBody:
      "Secure websites in the Kingdom of Saudi Arabia use the HTTPS protocol for encryption.",
    dgaAlt: "Digital Government Authority logo",
    dgaLabel: "Registered with the Digital Government Authority under number:",
    langBtn: "عربي",
    langAriaLabel: "تبديل اللغة إلى العربية",
  },
} as const;

function getCookieLang(): Lang {
  if (typeof document === "undefined") return "ar";
  const match = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/);
  const val = match?.[1];
  return val === "en" ? "en" : "ar";
}

export default function DigitalSignature() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("ar");
  const router = useRouter();
  const panelId = useId();

  useEffect(() => {
    setLang(getCookieLang());
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const switchLanguage = useCallback(() => {
    const newLang: Lang = lang === "ar" ? "en" : "ar";
    document.cookie = `lang=${newLang}; path=/; max-age=31536000`;
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    setLang(newLang);
    router.refresh();
  }, [lang, router]);

  const tx = t[lang];

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
                  style={{ width: 20, height: 20, flexShrink: 0 }}
                  className="block"
                />
              </div>
              <p>{tx.badge}</p>
            </div>

            <button
              type="button"
              className="digital_link link_label !flex !items-center !gap-2 !bg-transparent !border-0 !p-0 !cursor-pointer"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              {tx.verify}
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
            className="dga-btn dga-btn--sm dga-btn--subtle digital-lang-btn"
            onClick={switchLanguage}
            aria-label={tx.langAriaLabel}
          >
            <Image
              src="/assets/icons/stroke-standard/translation-stroke-rounded.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
            />
            <span>{tx.langBtn}</span>
          </button>
        </div>

        <div
          id={panelId}
          role="region"
          aria-label={tx.panelLabel}
          aria-hidden={!isOpen ? true : undefined}
          inert={!isOpen || undefined}
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
                      {tx.domainTitle}
                      <span>&nbsp;.gov.sa</span>
                    </h2>
                    <p>{tx.domainBody}</p>
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
                      {tx.httpsTitle}
                      <span>&nbsp;HTTPS&nbsp;</span>
                      {tx.httpsSuffix}
                    </h2>
                    <p>{tx.httpsBody}</p>
                  </div>
                </div>
              </div>

              {/* DGA registration number */}
              <div className="digital_more_content !px-6">
                <div className="flex xs:flex-col md:flex-row gap-[24px] content-center">
                  <div className="digital_more_content_icon">
                    <Image
                      src="/assets/icons/DGA logo.png"
                      alt={tx.dgaAlt}
                      width={21}
                      height={31}
                      className="inline-block"
                    />
                  </div>
                  <div className="digital_more_content_content self-center text-start">
                    <p>{tx.dgaLabel}</p>
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
