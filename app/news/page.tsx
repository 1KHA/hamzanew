/**
 * News Page Component
 *
 * Displays a paginated list of news articles with search and filtering capabilities.
 * Allows users to browse platform updates, announcements, and articles.
 *
 * @accessibility
 * - Uses semantic HTML (<main>, <section>, <article>)
 * - Implements ARIA live regions for search results updates
 * - Ensures keyboard navigability for all interactive elements
 * - Maintains proper focus management and heading hierarchy
 */

"use client";

import { useState, useEffect, useMemo, type ReactElement } from "react";
import PageHero from "@/app/components/page-hero/PageHero";
import Card from "../components/card/Card";
import { DgaSearchBox } from "platformscode-new-react";
import { news } from "./_data/newsData";
import Button from "../components/button/Button";
import DgaPagination from "../components/pagination/DgaPagination";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface representing a news article structure
 */
interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
}

/**
 * Sort order directions
 */
type SortOrder = "asc" | "desc";

/* ==========================================================================
   Static Configuration
   ========================================================================== */

const ITEMS_PER_PAGE = 6;

const HERO_CONFIG = {
  title: "الاخبار",
  content:
    "نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير الاختبارات المعيارية للغة العربية",
  bgColor: "#FFF",
  breadcrumbs: [
    { label: "الرئيسية", path: "/" },
    { label: "الاخبار", disabled: true },
  ],
};

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * NewsPage Component
 *
 * Renders the news landing page with search, sort, and pagination.
 */
export default function NewsPage(): ReactElement {
  // State Management
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [direction, setDirection] = useState<string>("rtl");

  /**
   * Handle direction changes for RTL/LTR support
   */
  useEffect(() => {
    const updateDirection = () => {
      const dir = document.documentElement.dir || "rtl";
      setDirection(dir);
    };

    updateDirection();

    const observer = new MutationObserver(updateDirection);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });

    return () => observer.disconnect();
  }, []);

  /**
   * Memoized filtered and sorted news data
   * Optimized to prevent recalculation on every render
   */
  const processedNews = useMemo(() => {
    // 1. Filter by search query
    const query = searchQuery.toLowerCase().trim();
    const filtered = news.filter((article) => {
      return (
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
    });

    // 2. Sort by date
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }, [searchQuery, sortOrder]);

  // Pagination Logic
  const totalPages = Math.ceil(processedNews.length / ITEMS_PER_PAGE);
  const currentNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedNews, currentPage]);

  /**
   * Event Handlers
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top of results
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageHero
        heroMap={{ "/news": HERO_CONFIG }}
        defaultRoute="/news"
        breadcrumbsMax={2}
      />

      <section
        className="content section-spacing-5xl !flex !flex-col !gap-8"
        aria-label="قائمة الأخبار والمقالات"
      >
        {/* Controls Section: Search & Filter */}
        <div className="!flex !flex-col md:!flex-row !justify-between !items-start md:!items-center !gap-4 !mb-8">
          {/* Search Input */}
          <div className="!flex !flex-row !gap-4 !w-full md:!w-auto">
            <div className="!w-full !flex !flex-row !gap-4" role="search">
              <DgaSearchBox
                value={searchQuery}
                onInput={(e: any) => setSearchQuery(e.target.value)}
                placeholder="بحث في الأخبار..."
                size="lg"
                speechLang="ar"
              />
              <Button
                label="بحث"
                onClick={() => setSearchQuery(searchQuery)}
                variant="secondary-outline"
                size="lg"
              />
            </div>
          </div>

          {/* Filter & Results Count */}
          <div className="!flex !flex-row !items-center !gap-4 !w-full md:!w-auto !justify-between md:!justify-end">
            <span
              className="text-md-medium !text-[#6c737f] !font-normal"
              role="status"
              aria-live="polite"
            >
              {processedNews.length} نتيجة وجدت
            </span>

            <Button
              label={sortOrder === "asc" ? "ترتيب بالاحدث" : "ترتيب بالاقدم"}
              variant="secondary-outline"
              size="md"
              icon={sortOrder === "asc" ? "sort-by-up-02" : "sort-by-down-02"}
              onClick={toggleSortOrder}
              aria-label={
                sortOrder === "asc"
                  ? "ترتيب النتائج من الأحدث للأقدم"
                  : "ترتيب النتائج من الأقدم للأحدث"
              }
            />
          </div>
        </div>

        {/* News Grid */}
        <div
          className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-x-6 !gap-y-8"
          role="list"
        >
          {currentNews.map((article) => (
            <div role="listitem" key={article.id}>
              <Card
                title={article.title}
                date={article.date}
                description={article.excerpt}
                image={article.image}
                showPrimaryAction={true}
                primaryActionLabel="قراءة المزيد"
                showPrimaryIcon={false}
                linkPrimaryAction={`/news/details/${article.id}`}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {processedNews.length === 0 && (
          <div className="!flex !flex-col !items-center !justify-center !py-16 !text-center">
            <p className="!text-xl !text-gray-500 !mb-4">
              لا توجد نتائج بحث مطابقة
            </p>
            <Button
              label="مسح البحث"
              variant="secondary-outline"
              onClick={() => setSearchQuery("")}
            />
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="!flex !flex-row !justify-center !items-center !mt-8"
            aria-label="تصفح صفحات الأخبار"
          >
            <DgaPagination
              key={direction} // Force re-render on direction change
              currentPage={currentPage}
              onPageChange={(page) => handlePageChange(page as number)}
              siblingCount={1}
              size="large"
              totalPageCount={totalPages}
            />
          </div>
        )}
      </section>
    </>
  );
}
