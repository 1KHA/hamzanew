/**
 * Search Page Component
 *
 * This page provides search functionality for the Hamza website,
 * displaying search results with filtering, sorting, and pagination.
 *
 * @accessibility
 * - Search input has proper label and aria attributes
 * - Results are announced to screen readers via aria-live
 * - Filter and sort controls are keyboard accessible
 * - Pagination has proper navigation labels
 */

"use client";

import { useState, type ReactElement } from "react";
import Link from "next/link";
import { DgaSearchBox, DgaPagination } from "platformscode-new-react";
import Button from "@/app/components/button/Button";
import Tag from "@/app/components/tag/Tag";
import Filter from "@/app/components/filter/Filter";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface for search result item
 */
interface SearchResult {
  id: string;
  category: string;
  title: string;
  description: string;
  date: string;
  link: string;
}

/**
 * Interface for pagination state
 */
interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

/* ==========================================================================
   Static Data (Mock Data for Demo)
   ========================================================================== */

/**
 * Mock search results data
 * In production, this would come from an API
 */
const MOCK_RESULTS: SearchResult[] = [
  {
    id: "1",
    category: "الأخبار",
    title: "منصة اختبارات همزة تطلق النسخة التجريبية الأولى للقياس المعياري للغة العربية",
    description: "أعلنت منصة همزة المتخصصة في تطوير أدوات تقييم اللغة العربية، اليوم عن إطلاق النسخة التجريبية الأولى لنظامها الجديد للقياس المعياري للغة العربية، والذي يهدف إلى توفير تقييم شامل ودقيق",
    date: "20-Nov-2026",
    link: "/news/1",
  },
  {
    id: "2",
    category: "الأخبار",
    title: "منصة اختبارات همزة تطلق النسخة التجريبية الأولى للقياس المعياري للغة العربية",
    description: "أعلنت منصة همزة المتخصصة في تطوير أدوات تقييم اللغة العربية، اليوم عن إطلاق النسخة التجريبية الأولى لنظامها الجديد للقياس المعياري للغة العربية، والذي يهدف إلى توفير تقييم شامل ودقيق",
    date: "20-Nov-2026",
    link: "/news/2",
  },
  {
    id: "3",
    category: "الأخبار",
    title: "منصة اختبارات همزة تطلق النسخة التجريبية الأولى للقياس المعياري للغة العربية",
    description: "أعلنت منصة همزة المتخصصة في تطوير أدوات تقييم اللغة العربية، اليوم عن إطلاق النسخة التجريبية الأولى لنظامها الجديد للقياس المعياري للغة العربية، والذي يهدف إلى توفير تقييم شامل ودقيق",
    date: "20-Nov-2026",
    link: "/news/3",
  },
  {
    id: "4",
    category: "الأخبار",
    title: "منصة اختبارات همزة تطلق النسخة التجريبية الأولى للقياس المعياري للغة العربية",
    description: "أعلنت منصة همزة المتخصصة في تطوير أدوات تقييم اللغة العربية، اليوم عن إطلاق النسخة التجريبية الأولى لنظامها الجديد للقياس المعياري للغة العربية، والذي يهدف إلى توفير تقييم شامل ودقيق",
    date: "20-Nov-2026",
    link: "/news/4",
  },
];

/* ==========================================================================
   Sub Components
   ========================================================================== */

/**
 * Filter option type for category filtering
 */
const FILTER_OPTIONS = [
  { id: "all", label: "الكل", value: "all" },
  { id: "news", label: "الأخبار", value: "news" },
  { id: "events", label: "الفعاليات", value: "events" },
  { id: "articles", label: "المقالات", value: "articles" },
];

/**
 * Sort option type for results sorting
 */
const SORT_OPTIONS = [
  { id: "newest", label: "الأحدث", value: "newest" },
  { id: "oldest", label: "الأقدم", value: "oldest" },
  { id: "relevance", label: "الأكثر صلة", value: "relevance" },
];

/**
 * Filter Controls Component
 * Renders filter and sort dropdowns
 */
function FilterControls({
  filterValue,
  sortValue,
  onFilterChange,
  onSortChange,
}: {
  filterValue: string;
  sortValue: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-[12px]">
      {/* Filter Dropdown */}
      <Filter
        title="النوع"
        options={FILTER_OPTIONS}
        selectedValue={filterValue}
        onSelect={onFilterChange}
        buttonLabel="تصفية"
        buttonIcon="filter"
        buttonVariant="primary-neutral"
      />

      {/* Sort Dropdown */}
      <Filter
        title="ترتيب حسب"
        options={SORT_OPTIONS}
        selectedValue={sortValue}
        onSelect={onSortChange}
        buttonLabel="ترتيب حسب"
        buttonIcon="sorting-01"
        buttonVariant="secondary-outline"
      />
    </div>
  );
}

/**
 * Search Result Card Component
 * Displays a single search result
 */
function SearchResultCard({ result }: { result: SearchResult }) {
  return (
    <article
      className="py-[24px] border-b border-[#EAECF0] last:border-b-0"
      aria-labelledby={`result-title-${result.id}`}
    >
      <div className="flex flex-col gap-[12px]">
        {/* Category Tag */}
        <div className="flex justify-start">
          <Tag
            label={result.category}
            variant="neutral"
            size="sm"
          />
        </div>

        {/* Title */}
        <h3 id={`result-title-${result.id}`}>
          <Link
            href={result.link}
            className="link--primary"
          >
            <span className="link__label text-md-regular">{result.title}</span>
          </Link>
        </h3>

        {/* Description */}
        <p className="text-md-regular  line-clamp-2">
          {result.description}
        </p>

        {/* Date */}
        <time
          dateTime={result.date}
          className="text-sm-regular text-[#6C737F]"
        >
          {result.date}
        </time>
      </div>
    </article>
  );
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * SearchPage Component
 *
 * Main search page with input, filters, results, and pagination.
 *
 * @returns {ReactElement} The search page
 */
export default function SearchPage(): ReactElement {
  /* State Management */
  const [searchQuery, setSearchQuery] = useState<string>("الاختبار الأكاديمي");
  const [results] = useState<SearchResult[]>(MOCK_RESULTS);
  const [filterValue, setFilterValue] = useState<string>("all");
  const [sortValue, setSortValue] = useState<string>("newest");
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 999,
    totalResults: 50,
  });

  /* Event Handlers */
  const handleSearch = () => {
    // In production, this would trigger an API call
    console.log("Searching for:", searchQuery);
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    // In production, this would filter results
    console.log("Filter changed to:", value);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    // In production, this would sort results
    console.log("Sort changed to:", value);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: page }));
      // In production, this would fetch new results
    }
  };

  return (
    <main className="content" aria-label="صفحة البحث">
      <div className="custom-container ">
        {/* Search Input Section */}
        <section className="!py-[40px]" aria-label="البحث">
          <div className="flex   gap-[16px] w-full">
            {/* DgaSearchBox Component */}
            <div className="flex-1">
              <DgaSearchBox
                showTrailingIcon={false}
                size="lg"
                variant="default"
                value={searchQuery}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onInput={(e: any) => setSearchQuery(e.target?.value || e.detail || "")}
              />
            </div>

            {/* Search Button */}
            <Button
              label="بحث"
              variant="primary-brand"
              size="lg"
              onClick={handleSearch}
            />
          </div>
        </section>

        {/* Results Section */}
        <section aria-label="نتائج البحث" aria-live="polite" className="!flex !flex-col !gap-[32px]">
          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px] mb-[24px]">
            {/* Title and Count */}
            <div className="flex flex-col gap-[8px] text-start">
              <h2 className="display-sm-bold">
                نتيجة البحث عن "{searchQuery}"
              </h2>
              <p className="text-md-regular text-[#6C737F]">
                {pagination.totalResults} نتيجة وجدت
              </p>
            </div>

            {/* Filter Controls */}
            <FilterControls
              filterValue={filterValue}
              sortValue={sortValue}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </div>

          {/* Results List */}
          <div className="flex flex-col gap-[32px]"
            role="feed"
            aria-label="قائمة نتائج البحث"
          >
            {results.length > 0 ? (
              results.map((result, index) => (
                <div key={result.id}>
                  <SearchResultCard result={result} />
                  {index < results.length - 1 && <hr className="!my-[24px]" />}
                </div>
              ))
            ) : (
              <div className="py-[48px] text-center">
                <p className="text-lg-medium text-[#6C737F]">
                  لم يتم العثور على نتائج
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {results.length > 0 && (
            <div className="flex justify-center py-[32px]">
              <DgaPagination
                onChange={(e: any) => handlePageChange(e.detail?.page || 1)}
                siblingCount={1}
                size="large"
                totalPageCount={pagination.totalPages}
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
