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
 * Interface for report item
 */
interface Report {
  id: string;
  title: string;
  downloadUrl: string;
}

interface ReportsListingProps {
  initialReports?: Report[];
}

/* ==========================================================================
   Constants
   ========================================================================== */

/** Number of items to display per page */
const ITEMS_PER_PAGE = 6;

/**
 * Sort options for reports
 */
const SORT_OPTIONS = [
  { id: "newest", label: "الأحدث", value: "newest" },
  { id: "oldest", label: "الأقدم", value: "oldest" },
];

/* ==========================================================================
   Sub Components
   ========================================================================== */

/**
 * Report Card Component
 * Displays a single report with download action
 */
function ReportCard({ report }: { report: Report }) {
  const handleDownload = () => {
    window.open(report.downloadUrl, "_blank");
  };

  return (
    <Card
      title={report.title}
      showPrimaryAction
      primaryActionLabel="تحميل الملف"
      buttonColor="secondary"
      overridePrimaryAction={handleDownload}
      style={{
        minHeight: "140px",
      }}
    />
  );
}

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * ReportsListing Component
 *
 * Renders the interactive reports list with search, sort, and pagination.
 */
export default function ReportsListing({
  initialReports = [],
}: ReportsListingProps): ReactElement {
  /* State Management */
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  /* Filtered and Sorted Reports */
  const filteredAndSortedReports = useMemo(() => {
    let filtered = [...initialReports];

    // Apply search filter with Arabic normalization
    if (appliedSearchQuery.trim()) {
      const query = normalizeArabic(appliedSearchQuery.trim());
      filtered = filtered.filter((report) =>
        normalizeArabic(report.title).includes(query),
      );
    }

    // Apply sorting
    if (sortValue === "newest") {
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortValue === "oldest") {
      filtered.sort((a, b) => Number(a.id) - Number(b.id));
    }

    return filtered;
  }, [initialReports, appliedSearchQuery, sortValue]);

  /* Calculated Values */
  const totalPages = Math.ceil(
    filteredAndSortedReports.length / ITEMS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedReports = filteredAndSortedReports.slice(startIndex, endIndex);

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
    <div className="custom-container content">
      {/* Search and Filter Section */}
      <section className="!py-[32px]" aria-label="البحث والتصفية">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px]">
          {/* Search Box */}
          <div className="flex gap-[16px] flex-1 max-w-[600px]">
            <SearchBox
              size="lg"
              placeholder="ابحث عن تقرير..."
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

          {/* Results Count and Filter */}
          <div className="flex items-center gap-[16px]">
            <span className="text-md-regular text-[#6C737F]">
              {filteredAndSortedReports.length} نتيجة وجدت
            </span>

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

      {/* Reports Grid Section */}
      <section
        aria-label="قائمة التقارير"
        aria-live="polite"
        className="!py-[32px]"
      >
        {paginatedReports.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
            role="list"
            aria-label="شبكة التقارير"
          >
            {paginatedReports.map((report) => (
              <div key={report.id} role="listitem">
                <ReportCard report={report} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-[48px] text-center">
            <p className="text-lg-medium text-[#6C737F]">
              لم يتم العثور على تقارير
            </p>
          </div>
        )}
      </section>

      {/* Pagination Section */}
      {filteredAndSortedReports.length > 0 && totalPages > 1 && (
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
  );
}
