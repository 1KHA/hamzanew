import React, { useMemo } from "react";
import "./DgaPagination.css";

// Constants
const DOTS = "...";

/**
 * Helper function to generate a range of numbers.
 */
const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export interface DgaPaginationProps {
  /**
   * The total number of pages.
   * @default 10
   */
  totalPageCount?: number;
  /**
   * The current active page.
   * @default 1
   */
  currentPage?: number;
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Callback function invoked when the page changes.
   */
  onPageChange?: (page: number) => void;
  /**
   * Size of the pagination buttons.
   * @default 'large'
   */
  size?: "small" | "medium" | "large";
  /**
   * Additional CSS classes.
   */
  className?: string;
}

/**
 * DgaPagination Component
 *
 * A reusable pagination component that supports custom ranges, sizes, and accessibility.
 *
 * @example
 * <DgaPagination
 *   totalPageCount={20}
 *   currentPage={1}
 *   onPageChange={(page) => console.log(page)}
 * />
 */
const DgaPagination: React.FC<DgaPaginationProps> = ({
  totalPageCount = 10,
  currentPage = 1,
  siblingCount = 1,
  onPageChange,
  size = "large",
  className = "",
}) => {
  // Logic to calculate the pagination range
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    // Case 1: If the number of pages is less than the page numbers we want to show
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalPageCount, siblingCount, currentPage]);

  // Handlers
  const onNext = () => {
    if (currentPage >= totalPageCount) return;
    onPageChange?.(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage <= 1) return;
    onPageChange?.(currentPage - 1);
  };

  const handlePageClick = (pageNumber: number | string) => {
    if (pageNumber === DOTS) return;
    if (typeof pageNumber === "number" && pageNumber !== currentPage) {
      onPageChange?.(pageNumber);
    }
  };

  // Prevent rendering if there are no pages or just one page (optional, depending on design requirements)
  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={className}
    >
      <ul className={`dga-pagination dga-pagination--${size}`}>
        {/* Previous Button */}
        <li className="dga-pagination__item dga-pagination__arrow">
          <button
            onClick={onPrevious}
            disabled={currentPage === 1}
            aria-label="الذهاب الى الصفحة السابقة"
            type="button"
          >
            <img
              src="/assets/icons/stroke-standard/arrow-right-01-stroke-rounded.svg"
              width={24}
              height={24}
              alt="سهم يشير الى الصفحة السابقة"
              className="flip-rtl"
            />
          </button>
        </li>

        {/* Page Numbers */}
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={`dots-${index}`} className="dga-pagination__item">
                <span className="dga-pagination__dots">&#8230;</span>
              </li>
            );
          }

          const isCurrent = pageNumber === currentPage;

          return (
            <li
              key={pageNumber}
              className={`dga-pagination__item ${isCurrent ? "dga-pagination__item--active" : ""}`}
            >
              <button
                onClick={() => handlePageClick(pageNumber)}
                aria-current={isCurrent ? "page" : undefined}
                aria-label={`الذهاب الى الصفحة ${pageNumber}`}
                type="button"
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Next Button */}
        <li className="dga-pagination__item dga-pagination__arrow">
          <button
            onClick={onNext}
            disabled={currentPage === totalPageCount}
            aria-label="الذهاب الى الصفحة التالية"
            type="button"
          >
            <img
              src="/assets/icons/stroke-standard/arrow-left-01-stroke-rounded.svg"
              width={24}
              // height={24}
              alt="سهم يشير الى الصفحة التالية"
              // className="flip-rtl"
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default DgaPagination;
