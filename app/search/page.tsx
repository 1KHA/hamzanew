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

/* ==========================================================================
   Constants
   ========================================================================== */

/** Number of items to display per page */
const ITEMS_PER_PAGE = 4;

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
    category: "الفعاليات",
    title: "ورشة عمل حول تطوير اختبارات اللغة العربية",
    description: "تنظم منصة همزة ورشة عمل متخصصة للمعلمين والباحثين حول أحدث أساليب تطوير اختبارات اللغة العربية وفق المعايير الدولية",
    date: "15-Nov-2026",
    link: "/events/1",
  },
  {
    id: "3",
    category: "المقالات",
    title: "أهمية القياس المعياري في تعليم اللغة العربية",
    description: "مقال علمي يتناول أهمية استخدام أدوات القياس المعيارية في تقييم مستوى المتعلمين وتحسين مخرجات التعليم",
    date: "10-Nov-2026",
    link: "/articles/1",
  },
  {
    id: "4",
    category: "الأخبار",
    title: "شراكة جديدة بين همزة ووزارة التعليم",
    description: "وقعت منصة همزة اتفاقية شراكة استراتيجية مع وزارة التعليم لتطوير منظومة اختبارات اللغة العربية في المدارس",
    date: "05-Nov-2026",
    link: "/news/2",
  },
  {
    id: "5",
    category: "الفعاليات",
    title: "مؤتمر همزة السنوي للغة العربية",
    description: "يسر منصة همزة دعوتكم لحضور المؤتمر السنوي الذي يجمع خبراء اللغة العربية من مختلف أنحاء العالم",
    date: "01-Nov-2026",
    link: "/events/2",
  },
  {
    id: "6",
    category: "المقالات",
    title: "تقنيات الذكاء الاصطناعي في تقييم اللغة",
    description: "استعراض لأحدث تقنيات الذكاء الاصطناعي المستخدمة في تطوير اختبارات اللغة العربية وتحليل نتائجها",
    date: "28-Oct-2026",
    link: "/articles/2",
  },
  {
    id: "7",
    category: "الأخبار",
    title: "إطلاق تطبيق همزة للهواتف الذكية",
    description: "أعلنت منصة همزة عن إطلاق تطبيقها الجديد للهواتف الذكية والذي يتيح للمستخدمين الوصول إلى الاختبارات في أي وقت ومكان",
    date: "25-Oct-2026",
    link: "/news/3",
  },
  {
    id: "8",
    category: "الفعاليات",
    title: "ندوة افتراضية: مستقبل تعليم اللغة العربية",
    description: "ندوة افتراضية تناقش التحديات والفرص في تعليم اللغة العربية للناطقين بغيرها في العصر الرقمي",
    date: "20-Oct-2026",
    link: "/events/3",
  },
  {
    id: "9",
    category: "المقالات",
    title: "معايير جودة الاختبارات اللغوية",
    description: "دراسة شاملة حول معايير الجودة التي يجب أن تتوفر في الاختبارات اللغوية لضمان صدقها وثباتها",
    date: "15-Oct-2026",
    link: "/articles/3",
  },
  {
    id: "10",
    category: "الأخبار",
    title: "همزة تحصل على اعتماد دولي",
    description: "حصلت منصة همزة على اعتماد دولي من هيئة الاعتماد الأوروبية للاختبارات اللغوية تقديراً لجودة اختباراتها",
    date: "10-Oct-2026",
    link: "/news/4",
  },
  {
    id: "11",
    category: "الفعاليات",
    title: "دورة تدريبية للمقيّمين اللغويين",
    description: "دورة تدريبية مكثفة لإعداد مقيّمين معتمدين في اختبارات همزة للغة العربية",
    date: "05-Oct-2026",
    link: "/events/4",
  },
  {
    id: "12",
    category: "المقالات",
    title: "تحليل نتائج اختبارات همزة 2026",
    description: "تقرير تحليلي شامل لنتائج اختبارات همزة خلال العام الحالي مع رؤى حول مستوى المتقدمين",
    date: "01-Oct-2026",
    link: "/articles/4",
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
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("الاختبار الأكاديمي");
  const [allResults] = useState<SearchResult[]>(MOCK_RESULTS);
  const [filterValue, setFilterValue] = useState<string>("all");
  const [sortValue, setSortValue] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  /* Filtered and Sorted Results */
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...allResults];

    // Apply search filter with Arabic normalization
    if (appliedSearchQuery.trim()) {
      const query = normalizeArabic(appliedSearchQuery.trim());
      filtered = filtered.filter(
        (result) =>
          normalizeArabic(result.title).includes(query) ||
          normalizeArabic(result.description).includes(query) ||
          normalizeArabic(result.category).includes(query)
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
        (result) => result.category === categoryMap[filterValue]
      );
    }

    // Apply sorting
    if (sortValue === "newest") {
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortValue === "oldest") {
      filtered.sort((a, b) => Number(a.id) - Number(b.id));
    }

    return filtered;
  }, [allResults, appliedSearchQuery, filterValue, sortValue]);

  /* Calculated Values */
  const totalPages = Math.ceil(filteredAndSortedResults.length / ITEMS_PER_PAGE);
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
    <main className="content" aria-label="صفحة البحث">
      <div className="custom-container ">
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
        <section aria-label="نتائج البحث" aria-live="polite" className="!flex !flex-col !gap-[32px]">
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
          <div className="flex flex-col gap-[32px]"
            role="feed"
            aria-label="قائمة نتائج البحث"
          >
            {paginatedResults.length > 0 ? (
              paginatedResults.map((result, index) => (
                <div key={result.id}>
                  <SearchResultCard result={result} />
                  {index < paginatedResults.length - 1 && <hr className="!my-[24px]" />}
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
    </main>
  );
}
