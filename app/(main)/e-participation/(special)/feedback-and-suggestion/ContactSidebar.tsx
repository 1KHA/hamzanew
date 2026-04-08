"use client";

/**
 * ContactSidebar Component
 *
 * Displays contact information and emergency numbers in a sidebar.
 * Features:
 * - Optimized with reusable wrapper components.
 * - Removed copy functionality as requested.
 * - Improved accessibility with proper ARIA labels and structure.
 */

import Image from "next/image";
import { DgaLink } from "@/lib/utils/platformscode";

/*
 * ── Icon Paths ──
 */
const ICONS = {
  call: "/assets/icons/stroke-standard/call-stroke-rounded.svg",
  message: "/assets/icons/stroke-standard/message-02-stroke-rounded.svg",
  mail: "/assets/icons/stroke-standard/mail-01-stroke-rounded.svg",
  location: "/assets/icons/stroke-standard/location-01-stroke-rounded.svg",
  link: "/assets/icons/stroke-standard/link-04-stroke-rounded.svg",
  external: "/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg",
  instagram: "/assets/icons/stroke-standard/instagram-stroke-rounded.svg",
  linkedin: "/assets/icons/stroke-standard/linkedin-02-stroke-rounded.svg",
  twitter: "/assets/icons/stroke-standard/new-twitter-stroke-rounded.svg",
};

/*
 * ── Reusable Component: ContactItem ──
 * Renders an icon, a title, and a link/text value.
 */
interface ContactItemProps {
  icon: string;
  title: string;
  label: string;
  url?: string;
  alt: string;
}

function ContactItem({ icon, title, label, url, alt }: ContactItemProps) {
  return (
    <div className="!flex flex-row! justify-start! items-start! gap-2!">
      <Image
        src={icon}
        alt={alt}
        aria-hidden="true"
        width={24}
        height={24}
        className="icon-green"
      />
      <div className="!flex flex-col! justify-start! gap-2!">
        <h3 className="text-md-bold">{title}</h3>
        <div className="!flex flex-row! justify-start! gap-2! items-center">
          <DgaLink
            external
            label={label}
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            url={url}
            variant="primary"
            onClick={() => window.open(url, "_blank")}
            aria-label={`Open ${title} in new tab`}
          />

          <Image
            src={ICONS.external}
            alt="external link"
            aria-hidden="true"
            width={20}
            height={20}
            className="icon-green"
          />
        </div>
      </div>
    </div>
  );
}

/*
 * ── Reusable Component: EmergencyItem ──
 * Simplified item for emergency contacts (no main icon).
 */
interface EmergencyItemProps {
  title: string;
  number: string;
}

function EmergencyItem({ title, number }: EmergencyItemProps) {
  return (
    <div
      className="!flex flex-row! justify-start! items-center! gap-2!"
      role="group"
      aria-label={`${title}: ${number}`}
    >
      <div className="!flex flex-row! justify-start! gap-2! items-center">
        <h3 className="text-md-bold m-0">{title}</h3>
        <div className="!flex flex-row! justify-start! gap-2! items-center">
          <DgaLink
            external
            label={number} // Visible text
            role="link"
            aria-label={`اتصل بـ ${title} على الرقم ${number}`} // Screen reader text "Call [Title] at [Number]"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            url={`tel:${number}`}
            variant="primary"
            onClick={() => window.open(`tel:${number}`, "_blank")}
          />
          <Image
            src={ICONS.external}
            alt="external link" // Descriptive alt text
            aria-hidden="true"
            width={20}
            height={20}
            className="icon-green"
          />
        </div>
      </div>
    </div>
  );
}

export default function ContactSidebar() {
  return (
    <aside
      className="h-fit! p-6! shadow-sm! rounded-[16px]! border! border-[#D2D6DB]! bg-white!"
      aria-label="معلومات التواصل"
    >
      <div>
        <div className="!flex flex-col! gap-4!">
          <h1 className="text-xl-bold">تواصل معنا</h1>

          <ContactItem
            icon={ICONS.call}
            title="رقم الجوال"
            label="9200343222"
            url="tel:9200343222"
            alt="call"
          />

          <ContactItem
            icon={ICONS.message}
            title="رسالة قصيرة"
            label="199099"
            url="sms:199099"
            alt="message"
          />

          <ContactItem
            icon={ICONS.mail}
            title="البريد الالكتروني"
            label="help@hamza.sa"
            url="mailto:help@hamza.sa"
            alt="mail"
          />

          <ContactItem
            icon={ICONS.mail}
            title="فاكس"
            label="00966-11-434-6654"
            url="tel:00966114346654"
            alt="fax"
          />

          {/* Location */}
          <div className="!flex flex-row! justify-start! items-start! gap-2!">
            <Image
              src={ICONS.location}
              alt=""
              aria-hidden="true"
              width={24}
              height={24}
              className="icon-green"
            />
            <div className="!flex flex-col! justify-start! gap-2!">
              <h3 className="text-md-bold">الموقع</h3>
              <div className="!flex !flex-row !justify-start !gap-2 items-center">
                <DgaLink label="الرياض" size="md" variant="primary" />
                <Image
                  src={ICONS.link}
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="icon-green"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="!flex flex-row! justify-start! items-start! gap-2!">
            <div className="!flex flex-col! justify-start! gap-2!">
              <h3 className="text-md-bold">تابعنا على</h3>
              <div className="!flex !flex-row !justify-start !gap-2 ">
                <a
                  href="https://www.instagram.com/hamzatest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex flex-row! justify-start! gap-2! p-1! cursor-pointer! rounded items-center focus:ring-2 focus:ring-primary-500"
                  aria-label="تابعنا على انستقرام"
                >
                  <Image
                    src={ICONS.instagram}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/hamzatest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex flex-row! justify-start! gap-2! p-1! cursor-pointer! rounded items-center focus:ring-2 focus:ring-primary-500"
                  aria-label="تابعنا على لينكد إن"
                >
                  <Image
                    src={ICONS.linkedin}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                  />
                </a>
                <a
                  href="https://x.com/hamzatest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex flex-row! justify-start! gap-2! p-1! cursor-pointer! rounded items-center focus:ring-2 focus:ring-primary-500"
                  aria-label="تابعنا على تويتر/إكس"
                >
                  <Image
                    src={ICONS.twitter}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </div>
          </div>

          <hr className="text-[#D2D6DB]! my-6! border-t" />

          {/* Emergency Contacts */}
          <div className="!flex flex-col! gap-4!">
            <h1 className="text-xl-bold">اتصالات الطوارئ</h1>
            <EmergencyItem title="الدفاع المدني" number="998" />
            <EmergencyItem title="الشرطة" number="999" />
            <EmergencyItem title="الإسعاف" number="997" />
          </div>
        </div>
      </div>
    </aside>
  );
}
