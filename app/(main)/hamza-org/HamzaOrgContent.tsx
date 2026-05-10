"use client";

/**
 * HamzaOrgContent Component
 *
 * Client Component that renders the main content for the Hamza Organizations page,
 * detailing the benefits, certification verification, and standard organizations.
 *
 * @features
 * - Displays different types of organizations in a responsive grid.
 * - Showcases reasons to take the Hamza test using descriptive cards.
 * - Interactive certificate verification form.
 * - Lists standard organizations with associated descriptions and icons.
 *
 * @accessibility
 * - Proper heading hierarchy (h1 -> h2 -> h3) for clear document structure.
 * - Semantic <form> element for certificate verification with an `aria-label`.
 * - Inputs are linked to labels via `id` and `htmlFor` attributes.
 * - Form instructions are programmatically associated to inputs via `aria-describedby` for screen reader users.
 * - Decorative icons use `alt=""` and `aria-hidden="true"` to prevent screen reader noise.
 * - Buttons have explicit `type="submit"` and aria-labels for clarity.
 */
import Card from "@/app/components/card/Card";
import Button from "@/app/components/button/Button";
import TextInput from "@/app/components/text-input/TextInput";
import "@/app/components/card/card.css";
import { t } from "@/app/_lib/translationContext";

interface TypeOfOrg {
  id: number;
  title: string;
  icon?: string;
  image?: string;
}

interface WhyHamzaItem {
  id: number;
  no: string;
  description: string;
}

interface SanderdOrgItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface VerificationData {
  title: string;
  description: string;
  buttonText: string;
  labelText: string;
  placeholder: string;
}

interface HamzaOrgContentProps {
  typesOfOrg: TypeOfOrg[];
  whyHamzaTest: WhyHamzaItem[];
  sanderdOrg: SanderdOrgItem[];
  verificationData: VerificationData;
  whyHamzaTitle: string;
  standardOrgTitle: string;
  standardOrgDescription: string;
  translations?: Record<string, string> | null;
  locale?: string;
}

function StandardCard({ section }: { section: SanderdOrgItem }) {
  return (
    <article className="card !border-none">
      <div className="flex flex-row gap-[24px] items-center w-full">
        {/* Section Icon */}
        <div
          className="circular-green w-[56px] h-[56px] !mb-0 flex-shrink-0"
          aria-hidden="true"
        >
          <img
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="inline-block green-icon"
            src={`/assets/icons/stroke-standard/${section.icon}-stroke-rounded.svg`}
          />
        </div>

        {/* Section Content */}
        <div className="flex flex-col gap-[12px] flex-1 text-start">
          <h3 className="text-lg-bold">{section.title}</h3>
          <p className="text-md-regular text-[#475467]">
            {section.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function HamzaOrgContent({
  typesOfOrg,
  whyHamzaTest,
  sanderdOrg,
  verificationData,
  whyHamzaTitle,
  standardOrgTitle,
  standardOrgDescription,
  translations,
  locale,
}: HamzaOrgContentProps) {
  const isRTL = locale !== "en-US";

  // Helper: safely get translation with fallback
  // (t() returns the key itself when missing, so "||" doesn't work)
  const tx = (key: string, fallback: string): string => {
    const val = translations?.[key];
    return val && val.trim() !== "" ? val : fallback;
  };

  return (
    <section
      aria-label={tx("hamza-org-section-aria", "تفاصيل خدمات المنظمات")}
    >
      {/* Types of Organizations */}
      <div className="custom-container !py-8 !grid !grid-cols-1 md:!grid-cols-4 !gap-6 !mb-10">
        {typesOfOrg.map((type) => (
          <div
            key={type.id}
            className="card flex flex-col items-center text-center gap-[24px] p-6"
          >
            {/* Icon/Image: use Liferay image if available, else static SVG icon */}
            <div
              className="circular-green w-[56px] h-[56px] flex-shrink-0"
              aria-hidden="true"
            >
              {type.image ? (
                <img
                  src={type.image}
                  alt=""
                  width={28}
                  height={28}
                  className="inline-block object-contain"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <img
                  src={`/assets/icons/stroke-standard/${type.icon}-stroke-rounded.svg`}
                  alt=""
                  width={24}
                  height={24}
                  className="inline-block green-icon"
                />
              )}
            </div>
            <span className="text-lg-semibold line-clamp-2">{type.title}</span>
          </div>
        ))}
      </div>

      {/* Why Hamza Test */}
      <div className="bg-neutral-50">
        <div className="custom-container !py-[128px]">
          <h2 className="display-sm-bold !mb-[32px]">
            {whyHamzaTitle}
          </h2>
          <ul className="!grid !grid-cols-1 md:!grid-cols-3 !gap-6">
            {whyHamzaTest.map((item) => (
              <li key={item.id}>
                <Card number={item.no} title={item.description} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verify Certificates */}
      <div className="bg-brand-light !py-[64px]">
        <div className="custom-container">
          <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-18">
            <div className="!flex !flex-col !items-start !gap-4">
              <span
                className="!w-[64px] !h-[64px] circular-green-outline"
                aria-hidden="true"
              >
                <img
                  width={32}
                  height={32}
                  loading="eager"
                  className="inline-block green-icon"
                  src="/assets/icons/stroke-standard/checkmark-badge-01-stroke-rounded.svg"
                  alt=""
                />
              </span>

              <div className="!flex !flex-row !items-center !gap-4">
                <h2 className="display-sm-bold">
                  {verificationData.title}
                </h2>
                <img
                  alt=""
                  width={38}
                  height={38}
                  loading="eager"
                  className="inline-block flip-rtl hidden xl:inline-block"
                  aria-hidden="true"
                  src={
                    isRTL
                      ? "/assets/icons/stroke-standard/arrow-left-02-stroke-rounded.svg"
                      : "/assets/icons/stroke-standard/arrow-right-02-stroke-rounded.svg"
                  }
                />
              </div>
              <p className="!text-[16px] !leading-[24px] !font-normal !text-black">
                {verificationData.description}
              </p>
            </div>
            <div className="!flex !items-end">
              <form
                className="!w-full !flex !flex-col !gap-4"
                aria-label={tx("hamza-org-verify-form-aria", "نموذج التحقق من موثوقية الشهادات")}
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: submit handler
                }}
              >
                <div className="!w-full !flex !flex-col md:!flex-row md:!items-end !gap-4 md:!gap-8">
                  <div className="dga-form-control dga-form-control--fullwidth flex-1">
                    <span className="dga-label dga-label--lg font-normal!">
                      {verificationData.labelText}
                    </span>

                    <TextInput
                      placeholder="أدخل رقم الشهادة"
                      size="lg"
                      variant="default"
                      aria-label={verificationData.labelText}
                      aria-describedby="certificate-number-help"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    aria-label={tx("hamza-org-verify-btn-aria", "تحقق من الشهادة")}
                    label={verificationData.buttonText}
                    variant="primary-brand"
                    size="lg"
                    icon="search-02"
                    iconClass="white-icon"
                    className="!px-24 !w-full md:!w-auto"
                  />
                </div>

                <div className="!flex !flex-row !items-center !gap-2">
                  <img
                    width={14}
                    height={14}
                    src="/assets/icons/stroke-standard/help-circle-stroke-rounded.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  <p
                    id="certificate-number-help"
                    className="text-sm-medium !font-normal !text-[#384250]"
                  >
                    {tx("hamza-org-verify-help", "ادخل رقم الشهادة للتحقق من موثوقية الشهادة واعتمادها")}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Organizations */}
      <div className="bg-neutral-50">
        <div className="custom-container !py-[128px] !grid !grid-cols-1 md:!grid-cols-2 !gap-18">
          <div>
            <h2 className="display-sm-bold !mb-[32px]">
              {standardOrgTitle}
            </h2>
            <p className="!text-[16px] !leading-[24px] !font-normal !text-black">
              {standardOrgDescription}
            </p>
          </div>

          <ul className="!grid !grid-cols-1  !gap-6">
            {sanderdOrg.map((item) => (
              <li key={item.id}>
                <StandardCard section={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
