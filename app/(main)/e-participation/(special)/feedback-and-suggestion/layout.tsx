/**
 * Feedback & Suggestion Layout (Server Component)
 *
 * Wraps the feedback page with common layout elements including:
 * - Breadcrumbs for navigation context.
 * - A descriptive hero section with title and introduction.
 * - A sidebar containing contact information (phone, email, emergency numbers).
 *
 * @layout
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The main content of the page (the feedback form).
 */

import { type ReactNode } from "react";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";
import DgaBreadcrumbs from "@/app/components/breadcrumbs/BreadCrumbs";
import ContactSidebar from "./ContactSidebar";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return (
    <>
      <div className="custom-container section-spacing-5xl">
        {/* full-width area */}
        <section className="w-full">
          <div className="px-4 xl:px-8 py-10">
            {/* ── Breadcrumbs ── */}
            <nav aria-label={st("eParticipation", "breadcrumbNavAria", locale)}>
              <DgaBreadcrumbs
                items={[
                  { label: st("eParticipation", "breadcrumbHome", locale), path: "/" },
                  { label: st("eParticipation", "breadcrumbAboutEntity", locale), disabled: true },
                  { label: st("eParticipation", "breadcrumbAboutHamza", locale), disabled: true },
                  { label: st("eParticipation", "breadcrumbEParticipation", locale), path: "/e-participation" },
                  { label: st("eParticipation", "breadcrumbFeedback", locale), disabled: true },
                ]}
                max={4}
              />
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* ── Main Content Area ── */}
              <div id="main-content">
                <div className="!pt-4 !flex !flex-col !gap-2">
                  {/* Hero section */}
                  <h1 className="display-sm-bold">
                    {st("eParticipation", "feedbackPageHeading", locale)}
                  </h1>
                  <p className="text-md-regular !leading-[32px] max-w-3xl">
                    {st("eParticipation", "feedbackPageIntro", locale)}
                  </p>
                </div>
                {children}
              </div>

              {/* ── Sidebar Contact Info ── */}
              <ContactSidebar />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
