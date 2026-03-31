import PageHero from "../../components/page-hero/PageHero";
import { Metadata } from "next";
import ProfileView from "./ProfileView";

/**
 * Metadata configuration for the User Profile page
 * Provides SEO optimization with title, description, and Open Graph tags
 */
export const metadata: Metadata = {
  title: "الملف الشخصي",
};

/**
 * ProfilePage Component (Server Component)
 *
 * Main page component for user profile management interface.
 * Renders the page hero with breadcrumb navigation and the profileView component
 * containing all profile management functionality.
 *
 * @component
 * @returns {JSX.Element} The complete profile page layout
 *
 * @accessibility
 * - Uses semantic HTML with proper section and article elements
 * - Implements ARIA labels for better screen reader support
 * - Provides clear breadcrumb navigation
 * - Maintains proper heading hierarchy
 *
 * @example
 * // This is a Next.js page component, accessed via /profile route
 * // No direct usage required - Next.js handles routing automatically
 */
export default function ProfilePage() {
  /** Configuration object for the page hero section */
  const HERO_CONFIG = {
    title: "الملف الشخصي",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "الملف الشخصي", disabled: true },
    ],
  };

  return (
    <>
      {/* Page Header with breadcrumb navigation */}
      <PageHero
        heroMap={{ "/profile": HERO_CONFIG }}
        defaultRoute="/profile"
        breadcrumbsMax={2}
      />

      {/* Main content section */}
      <section
        aria-labelledby="profile-heading"
        className="profile-main-section"
      >
        <h1 id="profile-heading" className="sr-only">
          إدارة الملف الشخصي
        </h1>
        <div className="content " role="main">
          <ProfileView />
        </div>
      </section>
    </>
  );
}
