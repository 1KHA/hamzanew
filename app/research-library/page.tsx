/**
 * Research Library Page
 *
 * Displays a searchable, filterable grid of research papers and studies
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

/* ==========================================================================
   Constants
   ========================================================================== */

/** Number of items to display per page */
const ITEMS_PER_PAGE = 6;

/* ==========================================================================
   Static Data (Mock Data for Demo)
   ========================================================================== */

/**
 * Mock research papers data
 * In production, this would come from an API
 */
const MOCK_PAPERS: ResearchPaper[] = [
  {
    id: "1",
    title: "تطوير اختبارات الكفاءة اللغوية للغة العربية",
    author: "د. أحمد محمد",
    category: "اختبارات",
    publishDate: "2026-01-15",
    downloadUrl: "/papers/paper-1.pdf",
    description: "دراسة شاملة حول تطوير اختبارات الكفاءة اللغوية وفق المعايير الدولية.",
  },
  {
    id: "2",
    title: "تحليل أخطاء متعلمي اللغة العربية الناطقين بغيرها",
    author: "د. فاطمة علي",
    category: "تعليم",
    publishDate: "2026-01-10",
    downloadUrl: "/papers/paper-2.pdf",
    description: "بحث تحليلي يرصد الأخطاء الشائعة لدى متعلمي العربية من غير الناطقين بها.",
  },
  {
    id: "3",
    title: "استخدام الذكاء الاصطناعي في تقييم المهارات اللغوية",
    author: "د. خالد سعيد",
    category: "تقنية",
    publishDate: "2026-01-05",
    downloadUrl: "/papers/paper-3.pdf",
    description: "استكشاف تطبيقات الذكاء الاصطناعي في تقييم وتحليل المهارات اللغوية.",
  },
  {
    id: "4",
    title: "معايير جودة الاختبارات المعيارية للغة العربية",
    author: "د. سارة أحمد",
    category: "اختبارات",
    publishDate: "2025-12-20",
    downloadUrl: "/papers/paper-4.pdf",
    description: "دراسة معايير الصدق والثبات في الاختبارات المعيارية للغة العربية.",
  },
  {
    id: "5",
    title: "تعليم المفردات العربية للناطقين بغيرها",
    author: "د. محمد عبدالله",
    category: "تعليم",
    publishDate: "2025-12-15",
    downloadUrl: "/papers/paper-5.pdf",
    description: "استراتيجيات فعالة لتعليم المفردات العربية للمتعلمين من غير الناطقين بها.",
  },
  {
    id: "6",
    title: "تطوير منصات التعلم الإلكتروني للغة العربية",
    author: "د. نورة سالم",
    category: "تقنية",
    publishDate: "2025-12-10",
    downloadUrl: "/papers/paper-6.pdf",
    description: "بحث حول تصميم وتطوير منصات التعلم الإلكتروني المتخصصة في اللغة العربية.",
  },
  {
    id: "7",
    title: "تقييم مهارات الاستماع في اختبارات اللغة العربية",
    author: "د. عمر حسن",
    category: "اختبارات",
    publishDate: "2025-12-05",
    downloadUrl: "/papers/paper-7.pdf",
    description: "دراسة تحليلية لأساليب تقييم مهارات الاستماع في الاختبارات المعيارية.",
  },
  {
    id: "8",
    title: "أثر التعلم المدمج في تنمية المهارات الكتابية",
    author: "د. ليلى إبراهيم",
    category: "تعليم",
    publishDate: "2025-11-25",
    downloadUrl: "/papers/paper-8.pdf",
    description: "بحث تجريبي حول فاعلية التعلم المدمج في تطوير مهارات الكتابة العربية.",
  },
  {
    id: "9",
    title: "تحليل البيانات الضخمة في تقييم الأداء اللغوي",
    author: "د. يوسف كمال",
    category: "تقنية",
    publishDate: "2025-11-20",
    downloadUrl: "/papers/paper-9.pdf",
    description: "استخدام تقنيات البيانات الضخمة لتحليل وتقييم الأداء اللغوي للمتعلمين.",
  },
  {
    id: "10",
    title: "تطوير بنوك الأسئلة للاختبارات المعيارية",
    author: "د. هدى محمود",
    category: "اختبارات",
    publishDate: "2025-11-15",
    downloadUrl: "/papers/paper-10.pdf",
    description: "منهجية بناء وتطوير بنوك الأسئلة للاختبارات اللغوية المعيارية.",
  },
  {
    id: "11",
    title: "تعليم النحو العربي للمبتدئين من غير الناطقين بها",
    author: "د. أمينة خالد",
    category: "تعليم",
    publishDate: "2025-11-10",
    downloadUrl: "/papers/paper-11.pdf",
    description: "مقاربات تعليمية مبتكرة لتدريس النحو العربي للمتعلمين المبتدئين.",
  },
  {
    id: "12",
    title: "تطبيقات الواقع المعزز في تعليم اللغة العربية",
    author: "د. طارق عبدالرحمن",
    category: "تقنية",
    publishDate: "2025-11-05",
    downloadUrl: "/papers/paper-12.pdf",
    description: "استكشاف إمكانيات الواقع المعزز في تعزيز تجربة تعلم اللغة العربية.",
  },
];

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
   Main Page Component
   ========================================================================== */

/**
 * ResearchLibraryPage Component
 *
 * Main page with search, filter, papers grid, and pagination.
 *
 * @returns {ReactElement} The research library page
 */
export default function ResearchLibraryPage(): ReactElement {
  /* State Management */
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>("");
  const [allPapers] = useState<ResearchPaper[]>(MOCK_PAPERS);
  const [filterValue, setFilterValue] = useState<string>("all");
  const [sortValue, setSortValue] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState<number>(1);

  /* Filtered and Sorted Papers */
  const filteredAndSortedPapers = useMemo(() => {
    let filtered = [...allPapers];

    // Apply search filter with Arabic normalization (only when search is applied)
    if (appliedSearchQuery.trim()) {
      const query = normalizeArabic(appliedSearchQuery.trim());
      filtered = filtered.filter(
        (paper) =>
          normalizeArabic(paper.title).includes(query) ||
          normalizeArabic(paper.description).includes(query) ||
          normalizeArabic(paper.author).includes(query)
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
  }, [allPapers, appliedSearchQuery, filterValue, sortValue]);

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
