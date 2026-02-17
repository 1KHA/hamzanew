"use client";

/**
 * ContactSidebar Component
 *
 * Displays contact information and emergency numbers in a sidebar.
 * Features:
 * - "Copy to clipboard" functionality for phone numbers and emails.
 * - Accessible button controls for copy actions.
 * - Visual feedback via a tooltip mechanism.
 *
 * @accessibility
 * - Uses <button> for interactive copy icons to ensure keyboard focusability (Tab/Enter/Space).
 * - Proper aria-labels on copy buttons to describe their purpose to screen readers.
 * - Aria-live region for the "Copied" tooltip to announce status changes.
 */

import { useState } from "react";
import Image from "next/image";
import { DgaLink } from "platformscode-new-react";

import copyIcon from "@/public/assets/icons/stroke-standard/copy-01-stroke-rounded.svg";

export default function ContactSidebar() {
  const [showTooltip, setShowTooltip] = useState(false);

  /**
   * Copies the provided text to the system clipboard and shows a temporary success tooltip.
   * Handles errors gracefully.
   *
   * @param text - The string to copy to the clipboard.
   */
  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
      return true;
    } catch (error) {
      console.error("Failed to copy text: ", error);
      return false;
    }
  }

  return (
    <>
      <aside
        className="!h-fit !p-6 !shadow-sm !rounded-[16px] !border !border-[#D2D6DB] !bg-white"
        aria-label="معلومات التواصل"
      >
        <div>
          <div className="!flex !flex-col !gap-4">
            <h1 className="text-xl-bold">تواصل معنا</h1>

            {/* ── Section: Phone ── */}
            <div className="!flex !flex-row !justify-start !items-start !gap-2">
              <Image
                src="/assets/icons/stroke-standard/call-stroke-rounded.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="icon-green"
              />
              <div className="!flex !flex-col !justify-start !gap-2">
                <h3 className="text-md-bold">رقم الجوال </h3>
                <div className="!flex !flex-row !justify-start !gap-2 items-center">
                  <DgaLink label="9200343222" size="md" variant="primary" />
                  <button
                    type="button"
                    onClick={() => copyToClipboard("9200343222")}
                    className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="نسخ رقم الجوال 9200343222"
                  >
                    <Image
                      src={copyIcon}
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                      className="icon-green"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Section: SMS ── */}
            <div className="!flex !flex-row !justify-start !items-start !gap-2">
              <Image
                src="/assets/icons/stroke-standard/message-02-stroke-rounded.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="icon-green"
              />
              <div className="!flex !flex-col !justify-start !gap-2">
                <h3 className="text-md-bold">رسالة قصيرة</h3>
                <div className="!flex !flex-row !justify-start !gap-2 items-center">
                  <DgaLink label="199099" size="md" variant="primary" />
                  <button
                    type="button"
                    onClick={() => copyToClipboard("199099")}
                    className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="نسخ رقم الرسائل القصيرة 199099"
                  >
                    <Image
                      src={copyIcon}
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                      className="icon-green"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Section: Email ── */}
            <div className="!flex !flex-row !justify-start !items-start !gap-2">
              <Image
                src="/assets/icons/stroke-standard/mail-01-stroke-rounded.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="icon-green"
              />
              <div className="!flex !flex-col !justify-start !gap-2">
                <h3 className="text-md-bold">البريد الالكتروني</h3>
                <div className="!flex !flex-row !justify-start !gap-2 items-center">
                  <DgaLink label="help@hamza.sa" size="md" variant="primary" />
                  <button
                    type="button"
                    onClick={() => copyToClipboard("help@hamza.sa")}
                    className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="نسخ البريد الإلكتروني help@hamza.sa"
                  >
                    <Image
                      src={copyIcon}
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                      className="icon-green"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Section: Fax ── */}
            <div className="!flex !flex-row !justify-start !items-start !gap-2">
              <Image
                src="/assets/icons/stroke-standard/mail-01-stroke-rounded.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="icon-green"
              />
              <div className="!flex !flex-col !justify-start !gap-2">
                <h3 className="text-md-bold">فاكس</h3>
                <div className="!flex !flex-row !justify-start !gap-2 items-center">
                  <DgaLink
                    label="00966-11-434-6654"
                    size="md"
                    variant="primary"
                  />
                  <button
                    type="button"
                    onClick={() => copyToClipboard("00966-11-434-6654")}
                    className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label="نسخ رقم الفاكس 00966-11-434-6654"
                  >
                    <Image
                      src={copyIcon}
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                      className="icon-green"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Section: Location ── */}
            <div className="!flex !flex-row !justify-start !items-start !gap-2">
              <Image
                src="/assets/icons/stroke-standard/location-01-stroke-rounded.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
                className="icon-green"
              />
              <div className="!flex !flex-col !justify-start !gap-2">
                <h3 className="text-md-bold">الموقع</h3>
                <div className="!flex !flex-row !justify-start !gap-2 items-center">
                  <DgaLink label="الرياض" size="md" variant="primary" />
                  <Image
                    src="/assets/icons/stroke-standard/link-04-stroke-rounded.svg"
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                    className="icon-green"
                  />
                </div>
              </div>
            </div>

            {/* ── Section: Social Media ── */}
            <div className="!flex !flex-row !justify-start !items-start !gap-2">
              <div className="!flex !flex-col !justify-start !gap-2">
                <h3 className="text-md-bold">تابعنا على</h3>
                <div className="!flex !flex-row !justify-start !gap-2 ">
                  <a
                    href="#"
                    className="!flex !flex-row !justify-start !gap-2 !p-1 !cursor-pointer rounded items-center focus:ring-2 focus:ring-primary-500"
                    aria-label="تابعنا على انستقرام"
                  >
                    <Image
                      src="/assets/icons/stroke-standard/instagram-stroke-rounded.svg"
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                    />
                  </a>
                  <a
                    href="#"
                    className="!flex !flex-row !justify-start !gap-2 !p-1 !cursor-pointer rounded items-center focus:ring-2 focus:ring-primary-500"
                    aria-label="تابعنا على لينكد إن"
                  >
                    <Image
                      src="/assets/icons/stroke-standard/linkedin-02-stroke-rounded.svg"
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                    />
                  </a>
                  <a
                    href="#"
                    className="!flex !flex-row !justify-start !gap-2 !p-1 cursor-pointer! rounded items-center focus:ring-2 focus:ring-primary-500"
                    aria-label="تابعنا على تويتر/إكس"
                  >
                    <Image
                      src="/assets/icons/stroke-standard/new-twitter-stroke-rounded.svg"
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
              </div>
            </div>

            <hr className="!text-[#D2D6DB] !my-6 border-t" />

            {/* ── Emergency Contacts ── */}
            <div className="!flex !flex-col !gap-4">
              <h1 className="text-xl-bold">اتصالات الطوارئ</h1>

              {/* Civil Defense */}
              <div className="!flex !flex-row !justify-start !items-start !gap-2">
                <div className="!flex !flex-row !justify-start !gap-2">
                  <h3 className="text-md-bold">الدفاع المدني</h3>
                  <div className="!flex !flex-row !justify-start !gap-2 items-center">
                    <DgaLink label="998" size="md" variant="primary" />
                    <button
                      type="button"
                      onClick={() => copyToClipboard("998")}
                      className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="نسخ رقم الدفاع المدني 998"
                    >
                      <Image
                        src={copyIcon}
                        alt=""
                        aria-hidden="true"
                        width={20}
                        height={20}
                        className="icon-green"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Police */}
              <div className="!flex !flex-row !justify-start !items-start !gap-2">
                <div className="!flex !flex-row !justify-start !gap-2">
                  <h3 className="text-md-bold">الشرطة</h3>
                  <div className="!flex !flex-row !justify-start !gap-2 items-center">
                    <DgaLink label="999" size="md" variant="primary" />
                    <button
                      type="button"
                      onClick={() => copyToClipboard("999")}
                      className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="نسخ رقم الشرطة 999"
                    >
                      <Image
                        src={copyIcon}
                        alt=""
                        aria-hidden="true"
                        width={20}
                        height={20}
                        className="icon-green"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Ambulance */}
              <div className="!flex !flex-row !justify-start !items-start !gap-2">
                <div className="!flex !flex-row !justify-start !gap-2">
                  <h3 className="text-md-bold">الإسعاف</h3>
                  <div className="!flex !flex-row !justify-start !gap-2 items-center">
                    <DgaLink label="997" size="md" variant="primary" />
                    <button
                      type="button"
                      onClick={() => copyToClipboard("997")}
                      className="cursor-pointer p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label="نسخ رقم الإسعاف 997"
                    >
                      <Image
                        src={copyIcon}
                        alt=""
                        aria-hidden="true"
                        width={20}
                        height={20}
                        className="icon-green"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Tooltip Notification ── */}
      {showTooltip && (
        <div
          className="!fixed !bottom-10 !left-1/2 !-translate-x-1/2 !bg-[#101828] !text-white !px-4 !py-2 !rounded-lg !shadow-lg !z-[9999] !flex !items-center !gap-2 !animate-in !fade-in !slide-in-from-bottom-4 !duration-300"
          role="status"
          aria-live="polite"
        >
          <span className="!text-sm !font-medium">تم نسخ النص بنجاح</span>
          <Image
            src="/assets/icons/stroke-standard/checkmark-circle-02-stroke-rounded.svg"
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
            className="icon-green"
          />
        </div>
      )}
    </>
  );
}
