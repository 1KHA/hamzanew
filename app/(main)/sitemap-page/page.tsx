import type { ReactElement } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import PageHero from "@/app/components/page-hero/PageHero";
import { st } from "@/app/_lib/static-text-server";
import "./sitemap.css";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("sitemap", "metaTitle", locale),
    description: st("sitemap", "metaDescription", locale),
  };
}

/* ── Types ── */

interface SitemapLink {
  label: string;
  href: string;
}

interface SitemapCategory {
  title: string;
  children: SitemapLink[];
}

type SitemapEntry = SitemapLink | SitemapCategory;

function isCategory(entry: SitemapEntry): entry is SitemapCategory {
  return "title" in entry && "children" in entry;
}

function getSitemapData(locale: "ar" | "en"): SitemapEntry[] {
  return [
    { label: st("sitemap", "linkHome", locale), href: "/" },
    {
      title: st("sitemap", "categoryAbout", locale),
      children: [
        { label: st("sitemap", "aboutAboutHamza", locale), href: "/about" },
        { label: st("sitemap", "aboutWhoWeAre", locale), href: "/about/who-we-are" },
        { label: st("sitemap", "aboutTestTraits", locale), href: "/about/hamza-test-traits" },
        { label: st("sitemap", "aboutBenefits", locale), href: "/about/benefits-of-hamza-test" },
        {
          label: st("sitemap", "aboutInstitutions", locale),
          href: "/about/institutions-and-countries-that-accept-the-hamza",
        },
        {
          label: st("sitemap", "aboutCommittee", locale),
          href: "/about/periodic-advisory-committee",
        },
        { label: st("sitemap", "aboutAmbassadors", locale), href: "/about/hamza-ambassadors" },
      ],
    },
    {
      title: st("sitemap", "categoryEParticipation", locale),
      children: [
        { label: st("sitemap", "eParticipationConsultations", locale), href: "/e-participation/consultations" },
        { label: st("sitemap", "eParticipationCoCreation", locale), href: "/e-participation/co-creation" },
        { label: st("sitemap", "eParticipationOpenData", locale), href: "/e-participation/open-data" },
        { label: st("sitemap", "eParticipationPolicy", locale), href: "/e-participation/policy" },
        { label: st("sitemap", "eParticipationStats", locale), href: "/e-participation/services-statistics" },
        { label: st("sitemap", "eParticipationSocialMedia", locale), href: "/e-participation/socail-media" },
        { label: st("sitemap", "eParticipationVoiceReports", locale), href: "/e-participation/voice-reports" },
        { label: st("sitemap", "eParticipationFeedback", locale), href: "/e-participation/feedback-and-suggestion" },
      ],
    },
    {
      title: st("sitemap", "categoryTestTypes", locale),
      children: [
        { label: st("sitemap", "testTypesOverview", locale), href: "/types-of-tests" },
        { label: st("sitemap", "testTypesAcademic", locale), href: "/types-of-tests/hamza-academic-test" },
        { label: st("sitemap", "testTypesGeneral", locale), href: "/types-of-tests/hamza-general-test" },
        {
          label: st("sitemap", "testTypesPlacement", locale),
          href: "/types-of-tests/hamza-placement-test",
        },
        { label: st("sitemap", "testTypesVocabulary", locale), href: "/types-of-tests/hamza-vocabulary-test" },
      ],
    },
    {
      title: st("sitemap", "categoryTestPreparation", locale),
      children: [
        { label: st("sitemap", "prepDiscover", locale), href: "/test-takers/discover-hamza-tests" },
        { label: st("sitemap", "prepResources", locale), href: "/test-takers/preparation-resource" },
        { label: st("sitemap", "prepMeranCourse", locale), href: "/test-takers/hamza-meran-course" },
        { label: st("sitemap", "prepMechanism", locale), href: "/test-takers/test-mechanism" },
      ],
    },
    { label: st("sitemap", "linkOrganizations", locale), href: "/hamza-org" },
    {
      title: st("sitemap", "categoryResearch", locale),
      children: [
        { label: st("sitemap", "researchLibrary", locale), href: "/research-library" },
        { label: st("sitemap", "researchStats", locale), href: "/statistics-and-reports" },
        { label: st("sitemap", "researchLab", locale), href: "/news/language-testing-lab" },
        { label: st("sitemap", "researchServiceRequest", locale), href: "/research-service-request" },
      ],
    },
    {
      title: st("sitemap", "categoryNews", locale),
      children: [
        { label: st("sitemap", "newsLatest", locale), href: "/news/latest" },
        { label: st("sitemap", "newsAll", locale), href: "/news" },
      ],
    },
    {
      title: st("sitemap", "categoryOtherPages", locale),
      children: [
        { label: st("sitemap", "otherFaq", locale), href: "/faq" },
        { label: st("sitemap", "otherSearch", locale), href: "/search" },
        { label: st("sitemap", "otherProfile", locale), href: "/profile" },
        { label: st("sitemap", "otherTerms", locale), href: "/terms-and-conditions" },
        { label: st("sitemap", "otherSitemap", locale), href: "/sitemap-page" },
        { label: st("sitemap", "otherSignIn", locale), href: "/sign-in" },
        { label: st("sitemap", "otherSignUp", locale), href: "/sign-up" },
      ],
    },
  ];
}

/* ── Component ── */

export default async function SitemapPage(): Promise<ReactElement> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale.startsWith("en") ? "en" : "ar";

  const heroConfig = {
    title: st("sitemap", "heroTitle", staticLocale),
    description: st("sitemap", "heroDescription", staticLocale),
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: st("sitemap", "breadcrumbHome", staticLocale), path: "/" },
      { label: st("sitemap", "breadcrumbCurrent", staticLocale), disabled: true },
    ],
  };

  const sitemapData = getSitemapData(staticLocale);

  return (
    <main>
      <PageHero
        heroMap={{ "/sitemap-page": heroConfig }}
        defaultRoute="/sitemap-page"
        breadcrumbsMax={2}
      />

      <section className="sitemap" aria-labelledby="sitemap-heading">
        <h2 id="sitemap-heading" className="sr-only">
          {st("sitemap", "heading", staticLocale)}
        </h2>

        <div className="sitemap__container">
          <ul className="sitemap__list" role="tree" aria-label={st("sitemap", "treeLabel", staticLocale)}>
            {sitemapData.map((entry, index) =>
              isCategory(entry) ? (
                <li
                  key={entry.title}
                  className="sitemap__group"
                  role="treeitem"
                  aria-expanded={true}
                >
                  <span className="sitemap__title text-md-bold">
                    {entry.title}
                  </span>

                  <ul className="sitemap__sublist" role="group">
                    {entry.children.map((child) => (
                      <li
                        key={child.href + child.label}
                        className="sitemap__subitem"
                        role="treeitem"
                      >
                        <Link
                          href={child.href}
                          className="link--primary text-sm-regular"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li
                  key={entry.href + index}
                  className="sitemap__item"
                  role="treeitem"
                >
                  <Link
                    href={entry.href}
                    className="link--primary text-md-regular"
                  >
                    {entry.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
