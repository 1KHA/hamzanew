/**
 * Statistics and Reports Page
 *
 * Displays a searchable, filterable grid of reports and statistics
 * with pagination support.
 *
 * @accessibility
 * - Search input has proper label and aria attributes
 * - Results are announced to screen readers via aria-live
 * - Filter controls are keyboard accessible
 * - Card grid uses proper semantic structure
 * - Pagination has proper navigation labels
 */

"use client";

import { useState, useMemo, useEffect, type ReactElement } from "react";
import Button from "@/app/components/button/Button";
import Card from "@/app/components/card/Card";
import Filter from "@/app/components/filter/Filter";
import DgaPagination from "@/app/components/pagination/DgaPagination";
import GlobalStatisticsSection from "@/app/components/global-statistics-section/GlobalStatisticsSection";
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

/* ==========================================================================
   Constants
   ========================================================================== */

/** Number of items to display per page */
const ITEMS_PER_PAGE = 6;

/* ==========================================================================
   Static Data (Mock Data for Demo)
   ========================================================================== */

/**
 * Mock reports data
 * In production, this would come from an API
 */
const MOCK_REPORTS: Report[] = [
  { id: "1", title: "عنوان التقرير ١", downloadUrl: "/reports/report-1.pdf" },
  { id: "2", title: "عنوان التقرير ٢", downloadUrl: "/reports/report-2.pdf" },
  { id: "3", title: "عنوان التقرير ٣", downloadUrl: "/reports/report-3.pdf" },
  { id: "4", title: "عنوان التقرير ٤", downloadUrl: "/reports/report-4.pdf" },
  { id: "5", title: "عنوان التقرير ٥", downloadUrl: "/reports/report-5.pdf" },
  { id: "6", title: "عنوان التقرير ٦", downloadUrl: "/reports/report-6.pdf" },
  { id: "7", title: "عنوان التقرير ٧", downloadUrl: "/reports/report-7.pdf" },
  { id: "8", title: "عنوان التقرير ٨", downloadUrl: "/reports/report-8.pdf" },
  { id: "9", title: "عنوان التقرير ٩", downloadUrl: "/reports/report-9.pdf" },
  { id: "10", title: "عنوان التقرير ١٠", downloadUrl: "/reports/report-10.pdf" },
  { id: "11", title: "عنوان التقرير ١١", downloadUrl: "/reports/report-11.pdf" },
  { id: "12", title: "عنوان التقرير ١٢", downloadUrl: "/reports/report-12.pdf" },
  { id: "13", title: "عنوان التقرير ١٣", downloadUrl: "/reports/report-13.pdf" },
  { id: "14", title: "عنوان التقرير ١٤", downloadUrl: "/reports/report-14.pdf" },
  { id: "15", title: "عنوان التقرير ١٥", downloadUrl: "/reports/report-15.pdf" },
];

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
    // In production, this would trigger a file download
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
   Main Page Component
   ========================================================================== */

/**
 * StatisticsAndReportsPage Component
 *
 * Main page with search, filter, reports grid, and pagination.
 *
 * @returns {ReactElement} The statistics and reports page
 */
export default function StatisticsAndReportsPage(): ReactElement {
  /* State Management */
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("");
  const [allReports] = useState<Report[]>(MOCK_REPORTS);
  const [sortValue, setSortValue] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  /* Filtered and Sorted Reports */
  const filteredAndSortedReports = useMemo(() => {
    let filtered = [...allReports];

    // Apply search filter with Arabic normalization
    if (appliedSearchQuery.trim()) {
      const query = normalizeArabic(appliedSearchQuery.trim());
      filtered = filtered.filter((report) =>
        normalizeArabic(report.title).includes(query)
      );
    }

    // Apply sorting
    if (sortValue === "newest") {
      filtered.sort((a, b) => Number(b.id) - Number(a.id));
    } else if (sortValue === "oldest") {
      filtered.sort((a, b) => Number(a.id) - Number(b.id));
    }

    return filtered;
  }, [allReports, appliedSearchQuery, sortValue]);

  /* Calculated Values */
  const totalPages = Math.ceil(filteredAndSortedReports.length / ITEMS_PER_PAGE);
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
    <main className="" aria-label="صفحة التقارير والاحصائيات">
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

      {/* Statistics Section */}
      <div className="bg-neutral-50">
        <section
          className="section-spacing-5xl custom-container gap-[32px] !flex flex-col "
          aria-label="إحصائيات همزة"
        >
         
          <div aria-label="الإحصائيات العامة">
            <GlobalStatisticsSection />
          </div>
        </section>
      </div>
    </main>
  );
}
