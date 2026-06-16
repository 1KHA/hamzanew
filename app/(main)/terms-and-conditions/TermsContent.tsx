import type { ReactElement } from "react";
import TableOfContent, {
  type TocSection,
} from "@/app/components/table-of-content/TableOfContent";
import { st } from "@/app/_lib/static-text-server";
import "./terms.css";

/* ── Types ── */

interface TermsContentProps {
  locale?: "ar" | "en";
}

function getTocSections(locale: "ar" | "en"): TocSection[] {
  return [
    {
      Name: st("termsAndConditions", "tocSection1", locale),
      Target: "usage-restrictions",
    },
    {
      Name: st("termsAndConditions", "tocSection2", locale),
      Target: "account-registration",
    },
    {
      Name: st("termsAndConditions", "tocSection3", locale),
      Target: "intellectual-property",
    },
    {
      Name: st("termsAndConditions", "tocSection4", locale),
      Target: "user-responsibility",
    },
    {
      Name: st("termsAndConditions", "tocSection5", locale),
      Target: "privacy-policy",
    },
    {
      Name: st("termsAndConditions", "tocSection6", locale),
      Target: "terms-modifications",
    },
  ];
}

/* ── Component ── */

export default function TermsContent({
  locale = "ar",
}: TermsContentProps): ReactElement {
  const tocSections = getTocSections(locale);

  return (
    <section className="terms" aria-labelledby="terms-heading">
      <div className="terms__container">
        {/* Sidebar – Table of Content */}
        <aside className="terms__sidebar">
          <TableOfContent
            sections={tocSections}
            title={st("termsAndConditions", "tocTitle", locale)}
            subTitle={st("termsAndConditions", "tocSubtitle", locale)}
            defaultActiveId="usage-restrictions"
          />
        </aside>

        {/* Main Content */}
        <article className="terms__content">
          {/* 1. Usage Restrictions */}
          <div className="terms__section" id="usage-restrictions">
            <h2 className="display-xs-bold terms__section-title">
              {st("termsAndConditions", "sectionTitle1", locale)}
            </h2>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section1Paragraph1", locale)}
            </p>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section1Paragraph2", locale)}
            </p>
          </div>

          {/* 2. Account Registration */}
          <div className="terms__section" id="account-registration">
            <h2 className="display-xs-bold terms__section-title">
              {st("termsAndConditions", "sectionTitle2", locale)}
            </h2>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section2Paragraph1", locale)}
            </p>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section2Paragraph2", locale)}
            </p>
          </div>

          {/* 3. Intellectual Property */}
          <div className="terms__section" id="intellectual-property">
            <h2 className="display-xs-bold terms__section-title">
              {st("termsAndConditions", "sectionTitle3", locale)}
            </h2>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section3Paragraph1", locale)}
            </p>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section3Paragraph2", locale)}
            </p>
          </div>

          {/* 4. User Responsibility */}
          <div className="terms__section" id="user-responsibility">
            <h2 className="display-xs-bold terms__section-title">
              {st("termsAndConditions", "sectionTitle4", locale)}
            </h2>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section4Paragraph1", locale)}
            </p>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section4Paragraph2", locale)}
            </p>
          </div>

          {/* 5. Privacy Policy */}
          <div className="terms__section" id="privacy-policy">
            <h2 className="display-xs-bold terms__section-title">
              {st("termsAndConditions", "sectionTitle5", locale)}
            </h2>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section5Paragraph1", locale)}
            </p>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section5Paragraph2", locale)}
            </p>
          </div>

          {/* 6. Terms Modifications */}
          <div className="terms__section" id="terms-modifications">
            <h2 className="display-xs-bold terms__section-title">
              {st("termsAndConditions", "sectionTitle6", locale)}
            </h2>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section6Paragraph1", locale)}
            </p>
            <p className="text-md-regular terms__paragraph">
              {st("termsAndConditions", "section6Paragraph2", locale)}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
