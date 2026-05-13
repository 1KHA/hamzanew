import "./footer.css";
import LastModified from "../last-modified/LastModified";
import Link from "next/link";
import FeedbackDynamic from "../feedback/FeedbackDynamic";

function ExternalIcon() {
  return (
    <img
      src="/assets/icons/stroke-standard/link-square-02-stroke-rounded.svg"
      alt=""
      aria-hidden="true"
      width={14}
      height={14}
      style={{ width: 14, height: 14, display: "block", flexShrink: 0, filter: "brightness(0) invert(1)" }}
    />
  );
}

const SOCIAL_LINKS = [
  { title: "تويتر X",  icon: "/assets/icons/stroke-standard/new-twitter-stroke-rounded.svg" },
  { title: "واتساب",   icon: "/assets/icons/stroke-standard/whatsapp-stroke-rounded.svg" },
  { title: "يوتيوب",   icon: "/assets/icons/stroke-standard/youtube-stroke-rounded.svg" },
  { title: "لينكد إن", icon: "/assets/icons/stroke-standard/linkedin-01-stroke-rounded.svg" },
  { title: "سناب شات", icon: "/assets/icons/stroke-standard/snapchat-stroke-rounded.svg" },
  { title: "انستغرام", icon: "/assets/icons/stroke-standard/instagram-stroke-rounded.svg" },
  { title: "فيسبوك",   icon: "/assets/icons/stroke-standard/facebook-01-stroke-rounded.svg" },
  { title: "تيك توك",  icon: "/assets/icons/stroke-standard/tiktok-stroke-rounded.svg" },
];

function Footer() {
  return (
    <>
      <div className="content !flex !items-start !gap-2 !py-4 !mt-4 !h-[52px]">
        <LastModified date="31/12/2026" time="2:00 م" variant="light" />
      </div>

      <FeedbackDynamic />

      <footer aria-label="تذييل الصفحة" style={{ backgroundColor: "#074D31" }}>
        <div className="custom-container">

          {/* ── 4-column nav grid ───────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8 pt-10 pb-10 footer-nav-grid">

            {/* Column 1: ملخص */}
            <div>
              <div className="line-title">
                <h2 className="footer-title">ملخص</h2>
              </div>
              <nav aria-label="ملخص">
                <ul role="list" className="footer-contnet">
                  <li><Link href="/about" className="footer-link">عن همزة</Link></li>
                  <li><Link href="/news" className="footer-link">الأخبار والأحداث</Link></li>
                  <li><Link href="/types-of-tests" className="footer-link"> أنواع اختبارات همزة </Link></li>
                </ul>
              </nav>
            </div>

            {/* Column 2: روابط مهمة */}
            <div>
              <div className="line-title">
                <h2 className="footer-title">روابط مهمة</h2>
              </div>
              <nav aria-label="روابط مهمة">
                <ul role="list" className="footer-contnet">
                  <li className="flex items-center gap-[4px]">
                    <a
                      href="https://my.gov.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="بوابة الخدمة الوطنية - يفتح في نافذة جديدة"
                      className="footer-link"
                    >
                      بوابة الخدمة الوطنية
                    </a>
                    <ExternalIcon />
                  </li>
                  <li className="flex items-center gap-[4px]">
                    <a
                      href="https://open.data.gov.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="البيانات الحكومية المفتوحة - يفتح في نافذة جديدة"
                      className="footer-link"
                    >
                      البيانات الحكومية المفتوحة
                    </a>
                    <ExternalIcon />
                  </li>
                  <li className="flex items-center gap-[4px]">
                    <a
                      href="https://sdaia.gov.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي - يفتح في نافذة جديدة"
                      className="footer-link"
                    >
                      الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي
                    </a>
                    <ExternalIcon />
                  </li>
                </ul>
              </nav>
            </div>

            {/* Column 3: الاتصال والدعم */}
            <div>
              <div className="line-title">
                <h2 className="footer-title">الاتصال والدعم</h2>
              </div>
              <nav aria-label="الاتصال والدعم">
                <ul role="list" className="footer-contnet">
                  <li>
                    <Link
                      href="/e-participation/feedback-and-suggestion"
                      className="footer-link"
                    >
                      تواصل معنا
                    </Link>
                  </li>
                  <li className="flex items-center gap-[4px]">
                    <a
                      href="https://my.gov.sa/ar/content/report-corruption"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="الإبلاغ عن الفساد - يفتح في نافذة جديدة"
                      className="footer-link"
                    >
                      الإبلاغ عن الفساد
                    </a>
                    <ExternalIcon />
                  </li>
                </ul>
              </nav>
            </div>

            {/* Column 4: تابعنا على */}
            <div className="grid gap-8 content-start">
              <div>
                <div className="line-title">
                  <h2 className="footer-title">تابعنا على</h2>
                </div>
                <div className="footer-contnet">
                  <ul
                    className="footer-social-list"
                    aria-label="تابعنا على وسائل التواصل الاجتماعي"
                  >
                    {SOCIAL_LINKS.map((social) => (
                      <li key={social.title}>
                        <a
                          href="#"
                          className="border-green"
                          aria-label={`${social.title} - يفتح في نافذة جديدة`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={social.icon}
                            alt=""
                            aria-hidden="true"
                            width={24}
                            height={24}
                            style={{ width: 24, height: 24, display: "block", filter: "brightness(0) invert(1)" }}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ──────────────────────────────────────────────── */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="footer-legal-links">
                <Link href="/terms-and-conditions" className="footer-link">
                  الشروط و الأحكام
                </Link>
                <Link href="/faq" className="footer-link">
                  الاسئلة الشائعة
                </Link>
                <a href="/sitemap-page" className="footer-link">
                  خريطة الموقع
                </a>
              </div>

              <div className="footer-copyright text-start">
                <div className="footer-link footer-copyright-text">
                  جميع الحقوق محفوظة لمجمع الملك سلمان العالمي للغة العربية © 2026
                </div>
                <LastModified
                  label="آخر تعديل للموقع"
                  date="31/12/2026"
                  time="2:00 م"
                  variant="dark"
                />
              </div>
            </div>

            <div className="footer_logos justify-start md:justify-end">
              <a
                href="https://ksaa.gov.sa/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="مجمع الملك سلمان العالمي للغة العربية - يفتح في نافذة جديدة"
              >
                <img
                  src="/assets/image/king-salman-global.svg"
                  alt="مجمع الملك سلمان العالمي للغة العربية"
                  className="footer-logo-img"
                  width={96}
                  height={96}
                />
              </a>
              <img
                src="/assets/image/footer-logo.svg"
                alt=""
                aria-hidden="true"
                className="footer-logo-img"
                width={96}
                height={96}
              />
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}

export default Footer;
