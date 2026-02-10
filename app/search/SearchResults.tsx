"use client";

import { useState, useMemo, useEffect, type ReactElement } from "react";
import Link from "next/link";
import DgaPagination from "@/app/components/pagination/DgaPagination";
import Button from "@/app/components/button/Button";
import Tag from "@/app/components/tag/Tag";
import Filter from "@/app/components/filter/Filter";
import SearchBox from "@/app/components/search-box/SearchBox";
import { normalizeArabic } from "@/lib/utils/arabic";

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

interface SearchResultsProps {
  initialResults?: SearchResult[];
  initialQuery?: string;
}

/* ==========================================================================
   Constants
   ========================================================================== */

/** Number of items to display per page */
const ITEMS_PER_PAGE = 4;

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

/* ==========================================================================
   Sub Components
   ========================================================================== */

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
        buttonIconClass=""
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
          <Tag label={result.category} variant="neutral" size="sm" />
        </div>

        {/* Title */}
        <h3 id={`result-title-${result.id}`}>
          <Link href={result.link} className="link--primary">
            <span className="link__label text-md-regular">{result.title}</span>
          </Link>
        </h3>

        {/* Description */}
        <p className="text-md-regular  line-clamp-2">{result.description}</p>

        {/* Date */}
        <time dateTime={result.date} className="text-sm-regular text-[#6C737F]">
          {result.date}
        </time>
      </div>
    </article>
  );
}

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * SearchResults Component
 *
 * Renders the interactive search results with filtering, sorting, and pagination.
 */
export default function SearchResults({
  initialResults = [],
  initialQuery = "",
}: SearchResultsProps): ReactElement {
  /* State Management */
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [appliedSearchQuery, setAppliedSearchQuery] =
    useState<string>(initialQuery);
  const [filterValue, setFilterValue] = useState<string>("all");
  const [sortValue, setSortValue] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  /* Filtered and Sorted Results */
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...initialResults];

    // Apply search filter with Arabic normalization
    if (appliedSearchQuery.trim()) {
      const query = normalizeArabic(appliedSearchQuery.trim());
      filtered = filtered.filter(
        (result) =>
          normalizeArabic(result.title).includes(query) ||
          normalizeArabic(result.description).includes(query) ||
          normalizeArabic(result.category).includes(query),
      );
    }

    // Apply category filter
    if (filterValue !== "all") {
      const categoryMap: Record<string, string> = {
        news: "الأخبار",
        events: "الفعاليات",
        articles: "المقالات",
      };
      filtered = filtered.filter(
        (result) => result.category === categoryMap[filterValue],
      );
    }

    // Apply sorting
    if (sortValue === "newest") {
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortValue === "oldest") {
      filtered.sort((a, b) => Number(a.id) - Number(b.id));
    }

    return filtered;
  }, [initialResults, appliedSearchQuery, filterValue, sortValue]);

  /* Calculated Values */
  const totalPages = Math.ceil(
    filteredAndSortedResults.length / ITEMS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedResults = filteredAndSortedResults.slice(startIndex, endIndex);

  /* Reset page if current page exceeds total pages after filtering */
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  /* Event Handlers */
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    setAppliedSearchQuery(searchQuery);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="custom-container">
      {/* Search Input Section */}
      <section className="!py-[40px]" aria-label="البحث">
        <div className="flex gap-[16px] w-full">
          {/* SearchBox Component */}
          <SearchBox
            size="lg"
            placeholder="ابحث..."
            value={searchQuery}
            onChange={handleSearchChange}
          />

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
      <section
        aria-label="نتائج البحث"
        aria-live="polite"
        className="!flex !flex-col !gap-[32px]"
      >
        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px] mb-[24px]">
          {/* Title and Count */}
          <div className="flex flex-col gap-[8px] text-start">
            <h2 className="display-sm-bold">
              نتيجة البحث عن "{appliedSearchQuery}"
            </h2>
            <p className="text-md-regular text-[#6C737F]">
              {filteredAndSortedResults.length} نتيجة وجدت
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
        <div
          className="flex flex-col gap-[32px]"
          role="feed"
          aria-label="قائمة نتائج البحث"
        >
          {paginatedResults.length > 0 ? (
            paginatedResults.map((result, index) => (
              <div key={result.id}>
                <SearchResultCard result={result} />
                {index < paginatedResults.length - 1 && (
                  <hr className="!my-[24px]" />
                )}
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
        {filteredAndSortedResults.length > 0 && totalPages > 1 && (
          <div className="flex justify-center py-[32px]">
            <DgaPagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              siblingCount={1}
              size="large"
              totalPageCount={totalPages}
            />
          </div>
        )}
      </section>
    </div>
  );
}
