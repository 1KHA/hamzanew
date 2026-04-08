"use client";

/**
 * OpenDataContent Component
 *
 * This client component manages the interactive tab interface for the Open Data section.
 * It separates the interactive logic (state, event handling) from the server-side page structure,
 * adhering to the Leaf Design Pattern.
 *
 * @features
 * - **Tabbed Interface**: Uses `DgaTabs` to switch between different data categories.
 * - **Dynamic Content**: Renders specific content based on the active tab index.
 * - **Accessibility**:
 *   - Manages focus and tab roles for screen reader support.
 *   - Uses `role="tabpanel"` for content areas.
 *   - Provides `aria-labelledby` to associate panels with their tabs.
 *   - Implements `tabIndex={0}` to make panels focusable for keyboard users.
 */

import { useState } from "react";
import { DgaListItem } from "@/lib/utils/platformscode";
import { DgaTabs } from "@/app/components/tabs/DgaTabs";

/**
 * Configuration for the tabs displayed in the component.
 * Each object contains the label and a unique ID for accessibility association.
 */
const TAB_ITEMS = [
  { label: "البيانات المفتوحة", id: "tab-open-data" },
  { label: "سياسة البيانات المفتوحة", id: "tab-policy" },
  { label: "مكتبة البيانات المفتوحة", id: "tab-library" },
  { label: "حالات الاستخدام للبيانات المفتوحة", id: "tab-use-cases" },
  { label: "البيانات الجيومكانية", id: "tab-geo" },
  { label: "البيانات اللحظية", id: "tab-realtime" },
  { label: "احداث البيانات المفتوحة", id: "tab-events" },
];

export default function OpenDataContent() {
  // State to track the currently active tab index (0-based)
  const [activeTab, setActiveTab] = useState(0);

  /**
   * Handles tab change events.
   * Updates the state to reflect the selected tab index.
   * @param {number} index - The index of the selected tab.
   */
  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    // <div className="content">
    <section className="section-spacing-5xl !mb-40">
      {/*
       * Tab Navigation
       * Uses DgaTabs component with controlled state.
       */}
      <DgaTabs
        className="!mb-[32px] max-md:!overflow-auto"
        orientation="horizontal"
        divider
        size="lg"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tabsList={TAB_ITEMS.map((tab) => ({
          label: tab.label,
          // Additional props for DgaTabs items can be passed here if supported
        }))}
      />

      <div className="mb-[40px] head">
        <div className="!space-y-[16px]">
          {/*
           * Tab Panel Rendering
           * We iterate through TAB_ITEMS to render the appropriate content panel.
           * Only the active panel is rendered to the DOM.
           */}
          {TAB_ITEMS.map((tab, index) => {
            // Only render the active tab's content
            if (activeTab !== index) return null;

            return (
              <div
                key={tab.id}
                role="tabpanel"
                id={`panel-${index}`}
                aria-labelledby={`tab-${index}`}
                tabIndex={0}
                className="!grid !gap-[16px] outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
              >
                {/* Content logic: Index 0 is static content, others are "Coming Soon" */}
                {index === 0 ? (
                  <>
                    <p className="text-md-regular mb-0">
                      البيانات المفتوحة في منصة اختبار همزة هي بيانات متاحة
                      للاستخدام العام بما يتيح الاطلاع عليها والاستفادة منها
                      لأغراض تعليمية وبحثية، وفق الأطر النظامية المعتمدة. وتهدف
                      المنصة من خلال إتاحة هذه البيانات إلى دعم الشفافية، وتحسين
                      جودة الخدمات، وتعزيز الاستفادة من البيانات في تطوير تجربة
                      الاختبارات اللغوية.
                    </p>
                    <DgaListItem
                      itemText="تعزيز الشفافية ومشاركة المستفيدين في تطوير منصة اختبار همزة."
                      level="one"
                      type="unordered"
                      className="text-md-regular"
                    />
                    <DgaListItem
                      itemText="تحسين كفاءة الخدمات التعليمية وجودة الاختبارات المقدّمة."
                      level="one"
                      type="unordered"
                      className="text-md-regular"
                    />
                    <DgaListItem
                      itemText="إتاحة الفرص لتطوير خدمات وأدوات تعليمية جديدة تعتمد على تحليل البيانات."
                      level="one"
                      type="unordered"
                      className="text-md-regular"
                    />
                  </>
                ) : (
                  <p className="text-md-regular !mb-0">
                    ستتوفر البيانات قريبــــــاً
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
