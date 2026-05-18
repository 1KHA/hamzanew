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
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";
import Link from "@/app/components/link/Link";

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
          <Link
            external
            label={label}
            size="lg"
            target="_blank"
            url={url}
            variant="primary"
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
  locale: "ar" | "en";
}

function EmergencyItem({ title, number, locale }: EmergencyItemProps) {
  return (
    <div
      className="!flex flex-row! justify-start! items-center! gap-2!"
      role="group"
      aria-label={`${title}: ${number}`}
    >
      <div className="!flex flex-row! justify-start! gap-2! items-center">
        <h3 className="text-md-bold m-0">{title}</h3>
        <div className="!flex flex-row! justify-start! gap-2! items-center">
          <Link
            external
            label={number}
            aria-label={st("eParticipation", "callAriaLabel", locale)
              .replace("{title}", title)
              .replace("{number}", number)}
            size="lg"
            target="_blank"
            url={`tel:${number}`}
            variant="primary"
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

export default async function ContactSidebar() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return (
    <aside
      className="h-fit! p-6! shadow-sm! rounded-[16px]! border! border-[#D2D6DB]! bg-white!"
      aria-label={st("eParticipation", "contactInfoAria", locale)}
    >
      <div>
        <div className="!flex flex-col! gap-4!">
          <h1 className="text-xl-bold">
            {st("eParticipation", "contactUsHeading", locale)}
          </h1>

          <ContactItem
            icon={ICONS.call}
            title={st("eParticipation", "contactMobile", locale)}
            label="٩٦٦١١٥٢٠٧٧٧٧+"
            url="tel:٩٦٦١١٥٢٠٧٧٧٧+"
            alt="call"
          />

          {/* <ContactItem
            icon={ICONS.message}
            title={st("eParticipation", "contactSms", locale)}
            label="199099"
            url="sms:199099"
            alt="message"
          /> */}

          <ContactItem
            icon={ICONS.mail}
            title={st("eParticipation", "contactEmail", locale)}
            label="infohamza@ksaa.gov.sa"
            url="mailto:infohamza@ksaa.gov.sa"
            alt="mail"
          />

          {/* <ContactItem
            icon={ICONS.mail}
            title={st("eParticipation", "contactFax", locale)}
            label="00966-11-434-6654"
            url="tel:00966114346654"
            alt="fax"
          /> */}

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
              <h3 className="text-md-bold">
                {st("eParticipation", "contactLocation", locale)}
              </h3>
              <div className="!flex !flex-row !justify-start !gap-2 items-center">
                <Link
                  external
                  label={st("eParticipation", "locationRiyadh", locale)}
                  size="md"
                  target="_blank"
                  url="https://maps.app.goo.gl/UQPyymnDiM3X8nCM9"
                  variant="primary"
                />
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
              <h3 className="text-md-bold">
                {st("eParticipation", "followUs", locale)}
              </h3>
              <div className="!flex !flex-row !justify-start !gap-2 ">
                <a
                  href="https://www.facebook.com/KSGAFAL/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex flex-row! justify-start! gap-2! p-1! cursor-pointer! rounded items-center focus:ring-2 focus:ring-primary-500"
                  aria-label={st("eParticipation", "followFacebook", locale)}
                >
                  <Image
                    src="/assets/icons/stroke-standard/facebook-01-stroke-rounded.svg"
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                  />
                </a>
                <a
                  href="https://sa.linkedin.com/company/ksgafal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex flex-row! justify-start! gap-2! p-1! cursor-pointer! rounded items-center focus:ring-2 focus:ring-primary-500"
                  aria-label={st("eParticipation", "followLinkedin", locale)}
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
                  href="https://x.com/KSGAFAL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex flex-row! justify-start! gap-2! p-1! cursor-pointer! rounded items-center focus:ring-2 focus:ring-primary-500"
                  aria-label={st("eParticipation", "followTwitter", locale)}
                >
                  <Image
                    src={ICONS.twitter}
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                  />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCGXRWZ9gkmmGQn5DSz8DbNA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!flex flex-row! justify-start! gap-2! p-1! cursor-pointer! rounded items-center focus:ring-2 focus:ring-primary-500"
                  aria-label={st("eParticipation", "followYouTube", locale)}
                >
                  <Image
                    src="/assets/icons/stroke-standard/youtube-stroke-rounded.svg"
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
                  />
                </a>
              </div>
            </div>
          </div>

          {/* <hr className="text-[#D2D6DB]! my-6! border-t" /> */}

          {/* Emergency Contacts */}
          {/* <div className="!flex flex-col! gap-4!">
            <h1 className="text-xl-bold">
              {st("eParticipation", "emergencyContacts", locale)}
            </h1>
            <EmergencyItem
              title={st("eParticipation", "emergencyCivilDefense", locale)}
              number="998"
              locale={locale}
            />
            <EmergencyItem
              title={st("eParticipation", "emergencyPolice", locale)}
              number="999"
              locale={locale}
            />
            <EmergencyItem
              title={st("eParticipation", "emergencyAmbulance", locale)}
              number="997"
              locale={locale}
            />
          </div> */}
        </div>
      </div>
    </aside>
  );
}
