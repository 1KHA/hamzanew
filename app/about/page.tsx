/*
 * About Page Component (Server Component)
 *
 * This page serves as the main navigation hub for all "About" sections,
 * displaying a grid of cards linking to various informational pages.
 *
 * @accessibility
 * - Uses semantic HTML with proper heading hierarchy
 * - Navigation cards have descriptive labels for screen readers
 * - Grid layout is responsive and maintains proper focus order
 * - All interactive elements are keyboard accessible
 *
 * @performance
 * - Optimized for server-side rendering
 * - Static data is fetched and rendered server-side
 */

import type { Metadata } from "next";
import Card from "../components/card/Card";

export const metadata: Metadata = {
  title: "عن همزة",
  description:
    "تعرف على مشروع همزة، أهدافه، والخدمات التي يقدمها في مجال قياس الكفاية اللغوية.",
  openGraph: {
    title: "عن همزة",
    description:  
      "تعرف على مشروع همزة، أهدافه، والخدمات التي يقدمها في مجال قياس الكفاية اللغوية.",
  },
};

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface for about page navigation items
 */
interface AboutPageItem {
  /** Unique identifier for the page item */
  id: string;
  /** Icon name from the icon set */
  icon: string;
  /** Display title in Arabic */
  title: string;
  /** Navigation path to the page */
  link: string;
  /** Accessible description for screen readers */
  ariaLabel: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * Navigation items for the about section
 * Each item represents a card linking to a specific about page
 */
const ABOUT_PAGES: AboutPageItem[] = [
  {
    id: "who-we-are",
    icon: "user-group",
    title: "من نحن",
    link: "/about/who-we-are",
    ariaLabel: "تعرف على فريق همزة ورسالتنا",
  },
  {
    id: "hamza-test-traits",
    icon: "geometric-shapes-01",
    title: "سمات اختبار همزة",
    link: "/about/hamza-test-traits",
    ariaLabel: "اكتشف مميزات وسمات اختبار همزة",
  },
  {
    id: "benefits-of-hamza-test",
    icon: "file-star",
    title: "أهمية اختبارات همزة",
    link: "/about/benefits-of-hamza-test",
    ariaLabel: "تعرف على أهمية وفوائد اختبارات همزة",
  },
  {
    id: "institutions-acceptance",
    icon: "checkmark-badge-02",
    title: "المؤسسات والدول التي تقبل همزة",
    link: "/about/institutions-and-countries-that-accept-the-hamza",
    ariaLabel: "قائمة المؤسسات والدول التي تعترف باختبار همزة",
  },
  {
    id: "advisory-committee",
    icon: "school-01",
    title: "اللجنة الاستشارية الدورية",
    link: "/about/periodic-advisory-committee",
    ariaLabel: "معلومات عن اللجنة الاستشارية الدورية",
  },
  {
    id: "hamza-ambassadors",
    icon: "share-08",
    title: "سفراء همزة",
    link: "/about/hamza-ambassadors",
    ariaLabel: "تعرف على سفراء همزة",
  },
  {
    id: "e-participation",
    icon: "share-08",
    title: "المشاركة الالكترونية",
    link: "/e-participation",
    ariaLabel: "المشاركة الالكترونية والتواصل معنا",
  },
];

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * AboutPage Component
 *
 * Renders a responsive grid of navigation cards for the about section.
 * Each card links to a specific informational page about Hamza tests.
 *
 * @returns {JSX.Element} The about page with navigation cards
 */
export default function AboutPage() {
  return (
    <section className="content">
      {/*
        Navigation Grid Section
        - Uses responsive grid layout for different screen sizes
        - Cards are displayed in a semantic list structure
      */}
      <nav
        className="section-spacing-5xl responsive-cards-grid"
        aria-label="أقسام عن همزة"
        role="navigation"
      >
        {ABOUT_PAGES.map((page) => (
          <Card
            key={page.id}
            icon={page.icon}
            title={page.title}
            primaryTrailIconType="arrow"
            buttonIconOnly={true}
            linkSecondaryAction={page.link}
            aria-label={page.ariaLabel}
          />
        ))}
      </nav>
    </section>
  );
}
