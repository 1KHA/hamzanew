"use client";

import { useState, useMemo, useEffect, type ReactElement } from "react";
import Button from "@/app/components/button/Button";
import Card from "@/app/components/card/Card";
import Filter from "@/app/components/filter/Filter";
import DgaPagination from "@/app/components/pagination/DgaPagination";
import SearchBox from "@/app/components/search-box/SearchBox";
import { normalizeArabic } from "@/lib/utils/arabic";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface for research paper item
 */
interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  downloadUrl: string;
  description: string;
}

interface ResearchLibraryListingProps {
  initialPapers?: ResearchPaper[];
}

/* ==========================================================================
   Constants
   ========================================================================== */

/** Number of items to display per page */
const ITEMS_PER_PAGE = 6;

/**
 * Filter options for category
 */
const FILTER_OPTIONS = [
  { id: "all", label: "الكل", value: "all" },
  { id: "tests", label: "اختبارات", value: "اختبارات" },
  { id: "teaching", label: "تعليم", value: "تعليم" },
  { id: "tech", label: "تقنية", value: "تقنية" },
];

/**
 * Sort options for papers
 */
const SORT_OPTIONS = [
  { id: "newest", label: "الأحدث", value: "newest" },
  { id: "oldest", label: "الأقدم", value: "oldest" },
];

/* ==========================================================================
   Sub Components
   ========================================================================== */

/**
 * Research Paper Card Component
 * Displays a single research paper with download action
 */
function PaperCard({ paper }: { paper: ResearchPaper }) {
  const handleDownload = () => {
    window.open(paper.downloadUrl, "_blank");
  };

  return (
    <Card
      title={paper.title}
      description={paper.description}
      image="/assets/image/photo2.jpg"
      showPrimaryAction
      primaryActionLabel="قراءة المزيد"
      buttonColor="secondary"
      overridePrimaryAction={handleDownload}
    />
  );
}

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * ResearchLibraryListing Component
 *
 * Renders the interactive research library list with search, filter, and pagination.
 */
export default function ResearchLibraryListing({
  initialPapers = [],
}: ResearchLibraryListingProps): ReactElement {
  /* State Management */
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("all");
  const [sortValue, setSortValue] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  /* Filtered and Sorted Papers */
  const filteredAndSortedPapers = useMemo(() => {
    let filtered = [...initialPapers];

    // Apply search filter with Arabic normalization (only when search is applied)
    if (appliedSearchQuery.trim()) {
      const query = normalizeArabic(appliedSearchQuery.trim());
      filtered = filtered.filter(
        (paper) =>
          normalizeArabic(paper.title).includes(query) ||
          normalizeArabic(paper.description).includes(query) ||
          normalizeArabic(paper.author).includes(query),
      );
    }

    // Apply category filter
    if (filterValue !== "all") {
      filtered = filtered.filter((paper) => paper.category === filterValue);
    }

    // Apply sorting
    if (sortValue === "newest") {
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortValue === "oldest") {
      filtered.sort((a, b) => Number(a.id) - Number(b.id));
    }

    return filtered;
  }, [initialPapers, appliedSearchQuery, filterValue, sortValue]);

  /* Calculated Values */
  const totalPages = Math.ceil(filteredAndSortedPapers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPapers = filteredAndSortedPapers.slice(startIndex, endIndex);

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

  const handleSearchClear = () => {
    setAppliedSearchQuery("");
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
    <main className="" aria-label="صفحة مكتبة الأبحاث">
      <div className="custom-container content">
        {/* Search and Filter Section */}
        <section className="!py-[32px]" aria-label="البحث والتصفية">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px]">
            {/* Search Box */}
            <div className="flex gap-[16px] flex-1 max-w-[600px]">
              <SearchBox
                size="lg"
                placeholder="ابحث عن بحث..."
                value={searchQuery}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                onSearch={handleSearch}
              />

              <Button
                label="بحث"
                variant="secondary-outline"
                size="lg"
                onClick={handleSearch}
              />
            </div>

            {/* Results Count and Filters */}
            <div className="flex items-center gap-[16px]">
              <span className="text-md-regular text-[#6C737F]">
                {filteredAndSortedPapers.length} نتيجة وجدت
              </span>

              {/* Category Filter */}
              <Filter
                title="التصنيف"
                options={FILTER_OPTIONS}
                selectedValue={filterValue}
                onSelect={handleFilterChange}
                buttonLabel="تصفية"
                buttonIcon="filter"
                buttonVariant="primary-neutral"
              />

              {/* Sort Filter */}
              <Filter
                title="ترتيب حسب"
                options={SORT_OPTIONS}
                selectedValue={sortValue}
                onSelect={handleSortChange}
                buttonLabel="ترتيب حسب"
                buttonIcon="sorting-01"
                buttonVariant="secondary-outline"
                buttonIconClass=""
              />
            </div>
          </div>
        </section>

        {/* Papers Grid Section */}
        <section
          aria-label="قائمة الأبحاث"
          aria-live="polite"
          className="!py-[32px]"
        >
          {paginatedPapers.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
              role="list"
              aria-label="شبكة الأبحاث"
            >
              {paginatedPapers.map((paper) => (
                <div key={paper.id} role="listitem">
                  <PaperCard paper={paper} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-[48px] text-center">
              <p className="text-lg-medium text-[#6C737F]">
                لم يتم العثور على أبحاث
              </p>
            </div>
          )}
        </section>

        {/* Pagination Section */}
        {filteredAndSortedPapers.length > 0 && totalPages > 1 && (
          <section aria-label="التنقل بين الصفحات" className="!py-[32px]">
            <div className="flex justify-center">
              <DgaPagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                siblingCount={1}
                size="large"
                totalPageCount={totalPages}
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
