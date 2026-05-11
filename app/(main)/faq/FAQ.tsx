"use client";

import { useEffect, useState, useMemo } from "react";
import { DgaTabs } from "../../components/tabs/DgaTabs";
import { Accordion } from "@/app/components/accordion/Accordion";
import SearchBox from "../../components/search-box/SearchBox";
import Button from "../../components/button/Button";
import { normalizeArabic, arabicIncludes } from "@/lib/utils/arabic";

/**
 * FAQ Component (Client Component)
 *
 * Provides an interactive interface for browsing frequently asked questions.
 * Features include tabbed categorization and a real-time search filter.
 *
 * @component
 *
 * @accessibility
 * - Uses aria-live for search result updates.
 * - Managed tab focus and active state.
 * - Keyboard friendly interactions for accordions and tabs.
 */

interface FAQItem {
  id: number;
  title: string;
  content: string;
  category: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  // --- State Management ---
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("");

  /**
   * Derive tab categories dynamically from the items prop.
   * "الكل" is always the first tab.
   */
  const categories = useMemo(() => {
    const cats = new Set(items.map((item) => item.category));
    return ["الكل", ...Array.from(cats)];
  }, [items]);

  const TAB_MAP = useMemo(() => {
    return Object.fromEntries(
      categories.map((cat, i) => [i + 1, cat])
    ) as Record<number, string>;
  }, [categories]);

  /**
   * Effect: Initialize first tab as active on component mount
   * Ensures the visual 'active' state matches the DGA design system.
   */
  useEffect(() => {
    const activateFirstTab = () => {
      const firstTab = document.querySelector(
        ".dga-tabs-list__item:first-child",
      );
      if (firstTab) firstTab.classList.add("dga-tabs-list__item--active");
    };
    const timer = setTimeout(activateFirstTab, 300);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Filtering Logic
   * Combines category selection (from tabs) and search query.
   */
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Category Filter
      const activeCategory = TAB_MAP[activeTabId];
      const matchesCategory =
        activeCategory === "الكل" || item.category === activeCategory;

      // 2. Search Filter (using Arabic normalization)
      const matchesSearch =
        !appliedSearchQuery.trim() ||
        arabicIncludes(item.title, appliedSearchQuery) ||
        arabicIncludes(item.content, appliedSearchQuery);

      return matchesCategory && matchesSearch;
    });
  }, [items, appliedSearchQuery, activeTabId, TAB_MAP]);

  /**
   * Handle tab switching and update active state
   * Manages both React state and DGA-specific visual classes.
   *
   * @param {number} tabId - Unique ID for the selected tab (1-indexed)
   */
  const handleTabChange = (tabId: number) => {
    setActiveTabId(tabId);

    // Update DOM classes for DGA Tabs visual state
    const allTabs = document.querySelectorAll(".dga-tabs-list__item");
    allTabs.forEach((tab) =>
      tab.classList.remove("dga-tabs-list__item--active"),
    );

    // tabId is 1-indexed, match with 0-indexed DOM list
    const activeIndex = tabId - 1;
    const activeTabElement = allTabs[activeIndex];
    if (activeTabElement) {
      activeTabElement.classList.add("dga-tabs-list__item--active");
    }
  };

  const tabsList = useMemo(
    () =>
      categories.map((cat, i) => ({
        label: cat,
        onClick: () => handleTabChange(i + 1),
      })),
    [categories],
  );

  return (
    <section
      className="content section-spacing-5xl"
      aria-label="قسم الأسئلة الشائعة"
    >
      <div className="!flex !flex-col !gap-16">
        {/* Search Bar */}
        <div className="!w-full md:!w-1/2 !flex !gap-4" role="search">
          <SearchBox
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            placeholder="ابحث عن سؤالك هنا..."
            size="lg"
          />
          <Button
            label="بحث"
            onClick={() => setAppliedSearchQuery(searchQuery)}
            variant="secondary-outline"
            size="lg"
          />
        </div>

        {/* Categories Tab Navigation */}
        <div className="faq-navigation">
          <DgaTabs
            className="!mb-[32px] max-md:!overflow-auto"
            orientation="horizontal"
            divider
            size="md"
            tabsList={tabsList}
          />

          {/* FAQ Accordion Content */}
          <div
            className="faq-content-area"
            role="region"
            aria-live="polite"
            aria-label="محتوى الأسئلة الشائعة"
          >
            <div className="!space-y-[16px]">
              {filteredItems.length > 0 ? (
                <Accordion
                  items={filteredItems.map((item) => ({
                    title: item.title,
                    content: item.content,
                  }))}
                  size="lg"
                  iconAlignment="trailing"
                />
              ) : (
                <div className="!py-20 text-center">
                  <p className="text-md-regular text-gray-500">
                    لا توجد برامج أو أسئلة متاحة في هذا القسم حالياً.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
