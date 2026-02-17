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
import DgaBreadcrumbs from "@/app/components/breadcrumbs/BreadCrumbs";
import ContactSidebar from "./ContactSidebar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="custom-container section-spacing-5xl">
        {/* full-width area */}
        <section className="w-full">
          <div className="px-4 xl:px-8 py-10">
            {/* ── Breadcrumbs ── */}
            <nav aria-label="مسار التنقل">
              <DgaBreadcrumbs
                items={[
                  { label: "الرئيسية", path: "/" },
                  { label: "عن الجهة", disabled: true },
                  { label: "عن همزة", disabled: true },
                  { label: "عن الجهة", disabled: true },
                  { label: "المشاركة الإلكترونية", path: "/e-participation" },
                  { label: " الشكاوى والمقترحات", disabled: true },
                ]}
                max={4}
              />
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* ── Main Content Area ── */}
              <div id="main-content">
                <div className="!pt-6 !flex !flex-col !gap-4">
                  {/* Hero section */}
                  <h1 className="section-title">الشكاوى والمقترحات</h1>
                  <p className="text-md-regular !leading-[32px] max-w-3xl">
                    نحرص في منصة همزة على تحسين تجربتك بشكل مستمر. من خلال هذا
                    النموذج يمكنك إرسال شكوى، ملاحظة، أو اقتراح بكل سهولة، وسيتم
                    مراجعتها من قبل الفريق المختص في أقرب وقت ممكن.
                    <br />
                    رأيك يهمنا، ويساعدنا في تطوير اختبارات همزة والارتقاء بجودة
                    المحتوى والخدمة المقدّمة لك.
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
