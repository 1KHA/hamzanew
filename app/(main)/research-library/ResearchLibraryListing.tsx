"use client";

import { useState, useMemo, useEffect, type ReactElement } from "react";
import { st } from "@/app/_lib/static-text";
import Button from "@/app/components/button/Button";
import Card from "@/app/components/card/Card";
import Filter from "@/app/components/filter/Filter";
import DgaPagination from "@/app/components/pagination/DgaPagination";
import SearchBox from "@/app/components/search-box/SearchBox";
import { normalizeArabic } from "@/lib/utils/arabic";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  downloadUrl: string;
  description: string;
}

interface ArticleType {
  id?: string | number;
  name?: string;
  value?: string;
  label?: string;
}

interface ArticleYear {
  year?: string | number;
  value?: string;
  label?: string;
}

interface ResearchLibraryListingProps {
  initialPapers?: ResearchPaper[];
  translations?: Record<string, string> | null;
  articleTypesList?: ArticleType[];
  articleYearList?: ArticleYear[];
}

/* ==========================================================================
   Constants
   ========================================================================== */

const ITEMS_PER_PAGE = 6;

/* ==========================================================================
   Sub Components
   ========================================================================== */

function PaperCard({ paper, readMoreLabel }: { paper: ResearchPaper; readMoreLabel: string }) {
  const handleDownload = () => {
    window.open(paper.downloadUrl, "_blank");
  };

  return (
    <Card
      title={paper.title}
      description={paper.description}
      image="/assets/image/photo2.jpg"
      showPrimaryAction
      primaryActionLabel={readMoreLabel}
      buttonColor="secondary"
      overridePrimaryAction={handleDownload}
    />
  );
}

/* ==========================================================================
   Main Component
   ========================================================================== */

export default function ResearchLibraryListing({
  initialPapers = [],
  translations,
  articleTypesList,
  articleYearList,
}: ResearchLibraryListingProps): ReactElement {
  /* Translation helper */
  const tx = (key: string, fallback: string): string => {
    const val = translations?.[key];
    return val && val.trim() !== "" ? val : fallback;
  };

  /* Build dynamic filter options from API data */
  const categoryFilterOptions = useMemo(() => {
    const allLabel = tx("hamza-all", st("researchLibrary", "allCategories"));
    const base = [{ id: "all", label: allLabel, value: "all" }];

    if (articleTypesList && articleTypesList.length > 0) {
      articleTypesList.forEach((type, index) => {
        const label = type.label || type.name || "";
        const value = type.value || String(type.id) || label;
        if (label) {
          base.push({ id: String(type.id ?? index), label, value });
        }
      });
    } else {
      // Fallback static categories
      base.push(
        { id: "tests", label: st("researchLibrary", "catTests"), value: st("researchLibrary", "catTests") },
        { id: "teaching", label: st("researchLibrary", "catTeaching"), value: st("researchLibrary", "catTeaching") },
        { id: "tech", label: st("researchLibrary", "catTech"), value: st("researchLibrary", "catTech") }
      );
    }
    return base;
  }, [articleTypesList, translations]);

  const sortOptions = useMemo(
    () => [
      { id: "newest", label: tx("hamza-newest", st("researchLibrary", "sortNewest")), value: "newest" },
      { id: "oldest", label: tx("hamza-oldest", st("researchLibrary", "sortOldest")), value: "oldest" },
    ],
    [translations]
  );

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

  /* Translated labels */
  const searchPlaceholder = tx("hamza-search", st("researchLibrary", "searchPlaceholder"));
  const searchBtnLabel = tx("hamza-search", st("researchLibrary", "searchBtn"));
  const categoryFilterTitle = tx("hamza-article-type", st("researchLibrary", "categoryFilterTitle"));
  const categoryFilterBtn = tx("hamza-filter", st("researchLibrary", "categoryFilterBtn"));
  const sortFilterTitle = tx("hamza-sort-by", st("researchLibrary", "sortFilterTitle"));
  const sortFilterBtn = tx("hamza-sort-by", st("researchLibrary", "sortFilterTitle"));
  const resultsFoundLabel = tx("hamza-results-found", st("researchLibrary", "resultsFound"));
  const noResultsLabel = tx("hamza-home-page-map-no-results-text", st("researchLibrary", "noResults"));
  const readMoreLabel = tx("hamza-read-more", st("researchLibrary", "readMore"));
  const ariaPageLabel = tx("hamza-research-page-aria", st("researchLibrary", "ariaPage"));
  const ariaSearchFilterLabel = tx("hamza-search-filter-aria", st("researchLibrary", "ariaSearchFilter"));
  const ariaResultsListLabel = tx("hamza-results-list-aria", st("researchLibrary", "ariaResultsList"));
  const ariaGridLabel = tx("hamza-research-grid-aria", st("researchLibrary", "ariaGrid"));
  const ariaPaginationLabel = tx("hamza-pagination-aria", st("researchLibrary", "ariaPagination"));

  return (
    <main className="" aria-label={ariaPageLabel}>
      <div className="custom-container content">
        {/* Search and Filter Section */}
        <section className="!py-[32px]" aria-label={ariaSearchFilterLabel}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[24px]">
            {/* Search Box */}
            <div className="flex gap-[16px] flex-1 max-w-[600px]">
              <SearchBox
                size="lg"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                onClear={handleSearchClear}
                onSearch={handleSearch}
              />

              <Button
                label={searchBtnLabel}
                variant="secondary-outline"
                size="lg"
                onClick={handleSearch}
              />
            </div>

            {/* Results Count and Filters */}
            <div className="flex items-center gap-[16px]">
              <span className="text-md-regular text-[#6C737F]">
                {filteredAndSortedPapers.length} {resultsFoundLabel}
              </span>

              {/* Category Filter */}
              <Filter
                title={categoryFilterTitle}
                options={categoryFilterOptions}
                selectedValue={filterValue}
                onSelect={handleFilterChange}
                buttonLabel={categoryFilterBtn}
                buttonIcon="filter"
                buttonVariant="primary-neutral"
              />

              {/* Sort Filter */}
              <Filter
                title={sortFilterTitle}
                options={sortOptions}
                selectedValue={sortValue}
                onSelect={handleSortChange}
                buttonLabel={sortFilterBtn}
                buttonIcon="sorting-01"
                buttonVariant="secondary-outline"
                buttonIconClass=""
              />
            </div>
          </div>
        </section>

        {/* Papers Grid Section */}
        <section
          aria-label={ariaResultsListLabel}
          aria-live="polite"
          className="!py-[32px]"
        >
          {paginatedPapers.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]"
              role="list"
              aria-label={ariaGridLabel}
            >
              {paginatedPapers.map((paper) => (
                <div key={paper.id} role="listitem">
                  <PaperCard paper={paper} readMoreLabel={readMoreLabel} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-[48px] text-center">
              <p className="text-lg-medium text-[#6C737F]">{noResultsLabel}</p>
            </div>
          )}
        </section>

        {/* Pagination Section */}
        {filteredAndSortedPapers.length > 0 && totalPages > 1 && (
          <section aria-label={ariaPaginationLabel} className="!py-[32px]">
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
