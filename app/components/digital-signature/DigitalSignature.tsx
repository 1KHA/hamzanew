"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useCallback, useId } from "react";
import "./DigitalSignature.css";
import { st } from "@/app/_lib/static-text";

export default function DigitalSignature() {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

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
              <p>{st("digitalSignature", "badge")}</p>
            </div>

            <button
              type="button"
              className="digital_link link_label !flex !items-center !gap-2 !bg-transparent !border-0 !p-0 !cursor-pointer"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              {st("digitalSignature", "verify")}
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
            onClick={() => {
              const html = document.documentElement;
              const isArabic = html.lang === "ar";
              document.cookie = `lang=${isArabic ? "en-US" : "ar-SA"}; path=/;`;
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
            aria-label={st("digitalSignature", "langAriaLabel")}
          >
            <Image
              src="/assets/icons/stroke-standard/translation-stroke-rounded.svg"
              alt=""
              aria-hidden="true"
              width={20}
              height={20}
            />
            <span>{st("digitalSignature", "langBtn")}</span>
          </button>
        </div>

        <div
          id={panelId}
          role="region"
          aria-label={st("digitalSignature", "panelLabel")}
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
                      {st("digitalSignature", "domainTitle")}
                      <span>&nbsp;.gov.sa</span>
                    </h2>
                    <p>{st("digitalSignature", "domainBody")}</p>
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
                      {st("digitalSignature", "httpsTitle")}
                      <span>&nbsp;HTTPS&nbsp;</span>
                      {st("digitalSignature", "httpsSuffix")}
                    </h2>
                    <p>{st("digitalSignature", "httpsBody")}</p>
                  </div>
                </div>
              </div>

              {/* DGA registration number */}
              <div className="digital_more_content !px-6">
                <div className="flex xs:flex-col md:flex-row gap-[24px] content-center">
                  <div className="digital_more_content_icon">
                    <Image
                      src="/assets/icons/DGA logo.png"
                      alt={st("digitalSignature", "dgaAlt")}
                      width={21}
                      height={31}
                      className="inline-block"
                    />
                  </div>
                  <div className="digital_more_content_content self-center text-start">
                    <p>{st("digitalSignature", "dgaLabel")}</p>
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
