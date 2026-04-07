/**
 * News Details Page Component
 *
 * Displays the full content of a specific news article.
 * Fetches data via ID from the news data source.
 *
 * @accessibility
 * - Uses semantic HTML (<article>, <section>)
 * - Ensures images have descriptive alt text
 * - Content structure is logical for screen readers
 */

import PageHero from "@/app/components/page-hero/PageHero";
import { news } from "../../_data/newsData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

interface PageProps {
  params: Promise<{ id: string }>;
}

/* ==========================================================================
   Metadata Generator
   ========================================================================== */

/**
 * Generate metadata for the news details page
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = news.find((n) => n.id === parseInt(resolvedParams.id));

  if (!article) {
    return {
      title: "المقال غير موجود",
    };
  }

  return {
    title: article.title,
    description: (article.content?.substring(0, 120) ?? "") + "...",
  };
}

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * NewsDetailsPage Component
 *
 * Renders the detailed view of a selected news article.
 */
export default async function NewsDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = news.find((n) => n.id === parseInt(resolvedParams.id));

  if (!article) {
    notFound();
  }

  const hero = {
    title: article.title,
    bgColor: "#F9FAFB",
    date: article.date,
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "الاخبار", path: "/news" },
      { label: "تفاصيل الخبر", disabled: true },
    ],
  };

  return (
    <>
      <PageHero
        heroMap={{ [`/news/${resolvedParams.id}`]: hero }}
        defaultRoute={`/news/${resolvedParams.id}`}
        breadcrumbsMax={3}
      />

      <section
        className="content section-spacing-5xl lg:!py-[40px] lg:!px-[80px]"
        aria-label="محتوى المقال"
      >
        <article className="!flex !flex-col !gap-8 !mx-auto lg:!py-[32px] lg:!px-[80px]">
          {/* Article Image */}
          {article.image && (
            <div className="!w-full !h-[400px] !overflow-hidden !rounded-[8px] lg:!px-[80px]">
              <img
                src={article.image}
                alt={article.title}
                className="!w-full !h-full !object-cover !rounded-[8px]"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="!flex !flex-col !gap-4 lg:!px-[80px]">
            <div
              className="text-md-regular !leading-[34px] !whitespace-pre-wrap !text-center"
              role="article" // Reinforce semantics for older readers
            >
              {article.content}
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
