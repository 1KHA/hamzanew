import type { ReactElement } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/app/components/page-hero/PageHero";
import "./sitemap.css";

export const metadata: Metadata = {
  title: "خريطة الموقع",
  description:
    "تصفّح خريطة موقع منصة همزة للوصول السريع إلى جميع الصفحات والأقسام المتاحة.",
};

const HERO_CONFIG = {
  title: "خريطة الموقع",
  description:
    "تصفّح جميع صفحات وأقسام منصة همزة من مكان واحد للوصول السريع إلى المحتوى الذي تبحث عنه.",
  bgColor: "#F9FAFB",
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "خريطة الموقع", disabled: true },
  ],
};

/* ── Sitemap data ── */

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

const SITEMAP_DATA: SitemapEntry[] = [
  { label: "الرئيسة", href: "/" },
  {
    title: "عن الجهة",
    children: [
      { label: "عن همزة", href: "/about" },
      { label: "من نحن", href: "/about/who-we-are" },

      { label: "سمات اختبار همزة", href: "/about/hamza-test-traits" },
      { label: "أهمية اختبارات همزة", href: "/about/benefits-of-hamza-test" },
      {
        label: "المؤسسات والدول التي تقبل همزة",
        href: "/about/institutions-and-countries-that-accept-the-hamza",
      },
      {
        label: "اللجنة الاستشارية الدورية",
        href: "/about/periodic-advisory-committee",
      },
      { label: "سفراء همزة", href: "/about/hamza-ambassadors" },
    ],
  },
  {
    title: "المشاركة الإلكترونية",
    children: [
      { label: "الإستشارات الإلكترونية", href: "/e-participation/consultations" },
      { label: "التطوير المشترك والافكار", href: "/e-participation/co-creation" },
      { label: "البيانات المفتوحة", href: "/e-participation/open-data" },
      { label: "سياسة المشاركة الإلكترونية", href: "/e-participation/policy" },
      { label: "إحصائيات أداء البوابة والخدمات", href: "/e-participation/services-statistics" },
      { label: "وسائل التواصل", href: "/e-participation/socail-media" },
      { label: "تقارير صوت المستفيد", href: "/e-participation/voice-reports" },
      { label: "الشكاوى والمقترحات", href: "/e-participation/feedback-and-suggestion" },
    ],
  },
  {
    title: "أنواع اختبارات همزة",
    children: [
      { label: "أنواع اختبارات همزة", href: "/types-of-tests" },
      { label: "همزة الأكاديمي", href: "/types-of-tests/hamza-academic-test" },
      { label: "همزة العام", href: "/types-of-tests/hamza-general-test" },
      {
        label: "همزة لتحديد المستوى",
        href: "/types-of-tests/hamza-placement-test",
      },
      { label: "همزة للمفردات", href: "/types-of-tests/hamza-vocabulary-test" },
    ],
  },
  {
    title: "الإستعداد للإختبار",
    children: [
      { label: "اكتشف اختبارات همزة", href: "/test-takers/discover-hamza-tests" },

      { label: "مصادر التحضير", href: "/test-takers/preparation-resource" },
      { label: "دورة مران همزة", href: "/test-takers/hamza-meran-course" },
      { label: "آلية الإختبار", href: "/test-takers/test-mechanism" },
    ],
  },
  { label: "المنظمات", href: "/hamza-org" },
  {
    title: "الأبحاث",
    children: [
      { label: "مكتبة الأبحاث", href: "/research-library" },
      { label: "التقارير والإحصائيات", href: "/statistics-and-reports" },
      { label: "معمل ابحاث الاختبارات اللغوية", href: "/news/language-testing-lab" },
    ],
  },

    {
    title: "الأخبار",
    children: [
      { label: "  آخر الأخبار", href: "/news/latest" },
      { label: "   الأخبار", href: "/news" },
    ],
  },
  {
    title: "صفحات أخرى",
    children: [
      { label: "الأسئلة الشائعة", href: "/faq" },
      { label: "البحث", href: "/search" },
      { label: "الملف الشخصي", href: "/profile" },
      { label: "الشروط والأحكام", href: "/terms-and-conditions" },
      { label: "خريطة الموقع", href: "/sitemap-page" },
      { label: "تسجيل الدخول", href: "/sign-in" },
      { label: "إنشاء حساب", href: "/sign-up" },
    ],
  },
];

/* ── Component ── */

export default function SitemapPage(): ReactElement {
  return (
    <main>
      <PageHero
        heroMap={{ "/sitemap-page": HERO_CONFIG }}
        defaultRoute="/sitemap-page"
        breadcrumbsMax={2}
      />

      <section className="sitemap" aria-labelledby="sitemap-heading">
        <h2 id="sitemap-heading" className="sr-only">
          خريطة الموقع
        </h2>

        <div className="sitemap__container">
          <ul className="sitemap__list" role="tree" aria-label="خريطة الموقع">
            {SITEMAP_DATA.map((entry, index) =>
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
