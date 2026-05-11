import "./footer.css";
import LastModified from "../last-modified/LastModified";
import Image from "next/image";
import Link from "next/link";
import FeedbackDynamic from "../feedback/FeedbackDynamic";
import FooterAccessibilityTools from "./FooterAccessibilityTools";
import { st } from "@/app/_lib/static-text";

function ExternalIcon() {
  return (
    <Image
      src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
      alt=""
      aria-hidden="true"
      width={14}
      height={14}
      style={{ filter: "brightness(0) invert(1)", flexShrink: 0 }}
    />
  );
}

function getSocialLinks(locale?: "ar" | "en") {
  return [
    { title: st("footer", "twitter", locale),  icon: "/assets/icons/stroke-standard/new-twitter-stroke-rounded.svg" },
    { title: st("footer", "whatsapp", locale),   icon: "/assets/icons/stroke-standard/whatsapp-stroke-rounded.svg" },
    { title: st("footer", "youtube", locale),   icon: "/assets/icons/stroke-standard/youtube-stroke-rounded.svg" },
    { title: st("footer", "linkedin", locale), icon: "/assets/icons/stroke-standard/linkedin-01-stroke-rounded.svg" },
    { title: st("footer", "snapchat", locale), icon: "/assets/icons/stroke-standard/snapchat-stroke-rounded.svg" },
    { title: st("footer", "instagram", locale), icon: "/assets/icons/stroke-standard/instagram-stroke-rounded.svg" },
    { title: st("footer", "facebook", locale),   icon: "/assets/icons/stroke-standard/facebook-01-stroke-rounded.svg" },
    { title: st("footer", "tiktok", locale),  icon: "/assets/icons/stroke-standard/tiktok-stroke-rounded.svg" },
  ];
}

interface FooterProps {
  locale?: "ar" | "en";
}

function Footer({ locale }: FooterProps) {
  const socialLinks = getSocialLinks(locale);
  const opensInNew = st("footer", "opensInNewWindow", locale);

  return (
    <>
      <div className="content !flex !items-start !gap-2 !py-4 !mt-4 !h-[52px]">
        <LastModified
          date="31/12/2026"
          time={st("footer", "timePm", locale)}
          variant="light"
          locale={locale}
        />
      </div>

      <FeedbackDynamic />

      <footer aria-label={st("footer", "footerAria", locale)} style={{ backgroundColor: "#074D31" }}>
        <div className="custom-container">

          {/* ── 4-column nav grid ───────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 pt-10 pb-10 footer-nav-grid">

            {/* Column 1: Summary */}
            <div>
              <div className="line-title">
                <h2 className="footer-title">{st("footer", "colSummary", locale)}</h2>
              </div>
              <nav aria-label={st("footer", "navSummaryAria", locale)}>
                <ul role="list" className="footer-contnet">
                  <li><Link href="/about" className="footer-link">{st("footer", "aboutHamza", locale)}</Link></li>
                  <li><Link href="/news" className="footer-link">{st("footer", "newsAndEvents", locale)}</Link></li>
                  <li><Link href="/types-of-tests" className="footer-link">{st("footer", "testTypes", locale)}</Link></li>
                </ul>
              </nav>
            </div>

            {/* Column 2: Important Links */}
            <div>
              <div className="line-title">
                <h2 className="footer-title">{st("footer", "colImportantLinks", locale)}</h2>
              </div>
              <nav aria-label={st("footer", "navImportantLinksAria", locale)}>
                <ul role="list" className="footer-contnet">
                  <li className="flex items-center gap-[4px]">
                    <a
                      href="https://my.gov.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${st("footer", "nationalPortal", locale)} - ${opensInNew}`}
                      className="footer-link"
                    >
                      {st("footer", "nationalPortal", locale)}
                    </a>
                    <ExternalIcon />
                  </li>
                  <li className="flex items-center gap-[4px]">
                    <a
                      href="https://open.data.gov.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${st("footer", "openData", locale)} - ${opensInNew}`}
                      className="footer-link"
                    >
                      {st("footer", "openData", locale)}
                    </a>
                    <ExternalIcon />
                  </li>
                  <li className="flex items-center gap-[4px]">
                    <a
                      href="https://sdaia.gov.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${st("footer", "nationalStrategy", locale)} - ${opensInNew}`}
                      className="footer-link"
                    >
                      {st("footer", "nationalStrategy", locale)}
                    </a>
                    <ExternalIcon />
                  </li>
                </ul>
              </nav>
            </div>

            {/* Column 3: Contact & Support */}
            <div>
              <div className="line-title">
                <h2 className="footer-title">{st("footer", "colContactSupport", locale)}</h2>
              </div>
              <nav aria-label={st("footer", "navContactSupportAria", locale)}>
                <ul role="list" className="footer-contnet">
                  <li>
                    <Link
                      href="/e-participation/feedback-and-suggestion"
                      className="footer-link"
                    >
                      {st("footer", "contactUs", locale)}
                    </Link>
                  </li>
                  <li className="flex items-center gap-[4px]">
                    <a
                      href="https://my.gov.sa/ar/content/report-corruption"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${st("footer", "reportCorruption", locale)} - ${opensInNew}`}
                      className="footer-link"
                    >
                      {st("footer", "reportCorruption", locale)}
                    </a>
                    <ExternalIcon />
                  </li>
                </ul>
              </nav>
            </div>

            {/* Column 4: Follow Us + Accessibility Tools */}
            <div className="grid gap-8 content-start">

              <div>
                <div className="line-title">
                  <h2 className="footer-title">{st("footer", "colFollowUs", locale)}</h2>
                </div>
                <div className="footer-contnet">
                  <ul
                    className="footer-social-list grid grid-cols-4"
                    aria-label={st("footer", "socialListAria", locale)}
                  >
                    {socialLinks.map((social) => (
                      <li key={social.title}>
                        <a
                          href="#"
                          className="border-green"
                          aria-label={`${social.title} - ${opensInNew}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={social.icon}
                            alt=""
                            aria-hidden="true"
                            width={24}
                            height={24}
                            style={{ filter: "brightness(0) invert(1)" }}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* <div>
                <div className="line-title">
                  <h2 className="footer-title">{st("footer", "accessibilityTools", locale)}</h2>
                </div>
                <div className="footer-contnet">
                  <FooterAccessibilityTools />
                </div>
              </div> */}

            </div>
          </div>

          {/* ── Bottom bar ──────────────────────────────────────────────── */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-legal-links">
                <Link href="/terms-and-conditions" className="footer-link">
                  {st("footer", "termsConditions", locale)}
                </Link>
                <Link href="/faq" className="footer-link">
                  {st("footer", "faq", locale)}
                </Link>
                <a href="/sitemap-page" className="footer-link">
                  {st("footer", "sitemap", locale)}
                </a>
              </div>

              <div className="footer-copyright text-start">
                <div className="footer-link footer-copyright-text">
                  {st("footer", "copyright", locale)}
                </div>
                <LastModified
                  label={st("footer", "lastModifiedSiteLabel", locale)}
                  date="31/12/2026"
                  time={st("footer", "timePm", locale)}
                  variant="dark"
                  locale={locale}
                />
              </div>
            </div>

            <div className="footer_logos justify-start md:justify-end">
              <a
                href="https://ksaa.gov.sa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${st("footer", "ksaaLabel", locale)} - ${opensInNew}`}
              >
                <Image
                  src="/assets/image/king-salman-global.svg"
                  alt={st("footer", "ksaaLogoAlt", locale)}
                  width={200}
                  height={200}
                  loading="lazy"
                  className="w-24 h-auto md:w-[200px]"
                />
              </a>
              <Image
                src="/assets/image/footer-logo.svg"
                alt=""
                width={200}
                height={200}
                loading="lazy"
                className="w-24 h-auto md:w-[200px]"
              />
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

export default Footer;
