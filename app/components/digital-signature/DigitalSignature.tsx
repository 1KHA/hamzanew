"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "./DigitalSignature.css";

export default function DigitalSignature() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" bg-[#f5f5f5]">
      {/* <div className="m-5"> */}
      <div className="digital_wrapper border-2 custom-container">
        <div className="flex justify-between ">
          <div className="digital_container digital_heads">
            {/* Header */}

            <div className="flex flex-row gap-[8px] justify-center items-center">
              <div className="digital_icon_container">
                <img
                  src="/assets/image/Country Flags.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="inline-block"
                />
              </div>

              <p>موقع حكومي مسجل لدى هيئة الحكومة الرقمية</p>
            </div>

            <a
              href="#"
              className="digital_link   !items-start link_label"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen((prev) => !prev);
              }}
            >
              كيف تتحقق
              <div className="digital_link_icon">
                <img
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
              </div>
            </a>
          </div>

          {/* Translation Button */}
          <Link
            href="#"
            className="dga-btn dga-btn--sm dga-btn--subtle !hidden lg:!flex"
          >
            <img
              src="/assets/icons/stroke-standard/translation-stroke-rounded.svg"
              alt="translation-icon"
              width={20}
              height={20}
            />
            <span>English</span>
          </Link>
        </div>

        {/* Content */}
        <div className={`digital_collapsible ${isOpen ? "open" : ""}`}>
          <div className="min-h-0">
            <div className="digital_content">
              <div className="digital_content_container">
                {/* Item 1 */}
                <div className="digital_content_item">
                  <div className="digital_content_item_icon">
                    <Image
                      src="/assets/icons/link-04.png"
                      alt=""
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

                {/* Item 2 */}
                <div className="digital_content_item">
                  <div className="digital_content_item_icon">
                    <Image
                      src="/assets/icons/square-lock-password.png"
                      alt=""
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

              {/* More Content */}

              <div className="digital_more_content !px-6 ">
                <div className="flex xs:flex-col md:flex-row gap-[24px] content-center">
                  <div className="digital_more_content_icon">
                    <img
                      src="/assets/icons/DGA logo.png"
                      alt=""
                      width={20.99}
                      height={30.57}
                      className="inline-block"
                    />
                  </div>

                  <div className="digital_more_content_content self-center text-start">
                    <p>مسجل لدى هيئة الحكومة الرقمية برقم:</p>

                    <Link
                      href="/"
                      className="!self-start link link--md link--primary link--inline link_label "
                    >
                      <div className="flex flex-row gap-[4px]">
                        <div>1234567890</div>
                        <img
                          className="icon-green"
                          width={16}
                          src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
