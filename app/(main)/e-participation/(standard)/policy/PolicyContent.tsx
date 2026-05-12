import Image from "next/image";
import Link from "@/app/components/link/Link";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export default async function PolicyContent() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return (
    <div className="content">
      <div className="!flex !flex-col !gap-[16px] !mb-30 section-spacing-5xl">
        {/*
         * Intro Paragraph
         * Provides context about the platform's goals.
         */}
        <p className="text-md-regular">
          {st("eParticipation", "policyIntro", locale)}
        </p>

        {/*
         * Conditions Section
         * Uses semantic heading and list for accessibility.
         */}
        <h4 className="text-md-semibold">
          {st("eParticipation", "policyConditionsHeading", locale)}
        </h4>
        <ul className="[&>li]:!relative [&>li]:![padding-inline-start:1.5rem] [&>li]:before:!absolute [&>li]:before:![inset-inline-start:0] [&>li]:before:!content-['-'] text-md-regular">
          <li>{st("eParticipation", "policyCondition1", locale)}</li>
          <li>{st("eParticipation", "policyCondition2", locale)}</li>
          <li>{st("eParticipation", "policyCondition3", locale)}</li>
          <li>{st("eParticipation", "policyCondition4", locale)}</li>
        </ul>

        {/*
         * External Link Section
         * Provides a direct link to the Digital Government Authority's regulations.
         */}
        <div className="!flex !flex-row !m-0 !justify-start !gap-[4px] !flex-wrap text-md-regular items-center">
          <span>{st("eParticipation", "policyRegulationsText", locale)}</span>
          <div className="inline-flex items-center gap-1">
            <Link
              external
              label={st("eParticipation", "dgaLabel", locale)}
              size="lg"
              target="_blank"
              url="https://dga.gov.sa/ar/E-Participation-Controls"
              variant="primary"
              aria-label={st("eParticipation", "dgaAriaLabel", locale)}
            />
            {/* Visual indicator for external link */}
            <Image
              src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
              width={20}
              height={20}
              className="icon-green"
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
