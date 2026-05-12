"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/app/components/card/card.css";
import Button from "@/app/components/button/Button";
import Carousel from "@/app/components/carousel/Carousel";

/* ==========================================================================
   Types
   ========================================================================== */

interface CarouselNewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

interface EventItem {
  text: string;
  image: string;
}

interface LatestNewsProps {
  carouselNews: CarouselNewsItem[];
  carouselHeader: string;
  latestNewsTitle: string;
  latestNewsImages: string[];
  viewAllBtnText: string;
  coverageTitle: string;
  coverageEvents: EventItem[];
  fallbackNews: CarouselNewsItem[];
  fallbackCoverage: string[];
  locale: string;
}

/* ==========================================================================
   Helpers
   ========================================================================== */

function isExternalImage(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

function SafeImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  if (!src) return null;

  if (isExternalImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 600}
      height={height || 250}
      className={className}
    />
  );
}

/* ==========================================================================
   Sub-components
   ========================================================================== */

function LatestNewsCard({ news }: { news: CarouselNewsItem }) {
  const router = useRouter();
  return (
    <article className="card">
      <div className="!flex !flex-col lg:!flex-row !justify-center !items-center !gap-[24px]">
        <div className="image-container !w-full lg:!w-1/2">
          <SafeImage
            src={news.image}
            alt={news.title}
            width={600}
            height={250}
            className="card-img !rounded-[8px] !h-[300px]"
          />
        </div>
        <div className="!w-full lg:!w-1/2 !flex-none">
          <div className="!flex !flex-col !gap-[20px]">
            <h3 className="display-sm-bold">{news.title}</h3>
            {news.date && (
              <time className="text-sm-regular text-gray-500" dateTime={news.date}>
                {news.date}
              </time>
            )}
            <p className="text-md-regular">
              {(news.content?.substring(0, 120) ?? "") + "..."}
            </p>

            <Button
              variant="primary-neutral"
              size="md"
              label="قراءة المزيد"
              onClick={() => {
                router.push(`/news/details/${news.id}`);
              }}
              className="!w-full lg:!w-fit !mt-[4px]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================================
   Main Component
   ========================================================================== */

export default function LatestNews({
  carouselNews,
  carouselHeader,
  latestNewsTitle,
  latestNewsImages,
  viewAllBtnText,
  coverageTitle,
  coverageEvents,
  fallbackNews,
  fallbackCoverage,
  locale,
}: LatestNewsProps) {
  const activeNews = carouselNews.length ? carouselNews : fallbackNews.slice(0, 4);
  const activeCoverage = coverageEvents.length ? coverageEvents : fallbackCoverage.map((img) => ({ text: "", image: img }));
  const mainImage = latestNewsImages[0] || "/assets/image/photo4.jpg";

  return (
    <section className="content !flex !flex-col !gap-[40px] !py-[32px] lg:!py-[64px]">
      {/* Carousel Header */}
      {carouselHeader && (
        <h2 className="display-sm-bold">{carouselHeader}</h2>
      )}

      {/* News Carousel */}
      <Carousel showDots={true} itemsPerSlide={1}>
        {activeNews.map((newsItem) => (
          <ul key={newsItem.id}>
            <li>
              <LatestNewsCard news={newsItem} />
            </li>
          </ul>
        ))}
      </Carousel>

      <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-[32px]">
        {/* Latest News */}
        <div className="!flex !flex-col !gap-[20px]">
          <div className="!flex !justify-between !items-center">
            <h2 className="display-sm-bold">{latestNewsTitle}</h2>
            <Button
              variant="secondary"
              size="sm"
              label={viewAllBtnText}
              onClick={() => {}}
              className="hidden lg:block"
            />
          </div>
          <div className="card">
            <SafeImage
              src={mainImage}
              alt={latestNewsTitle}
              width={590}
              height={395}
              className="card-img !rounded-[8px] !h-full"
            />
          </div>
        </div>

        {/* Latest Coverage */}
        <div className="!flex !flex-col !gap-[20px]">
          <h2 className="display-sm-bold">{coverageTitle}</h2>
          <ul className="!grid !grid-cols-1 md:!grid-cols-2 !gap-[32px]">
            {activeCoverage.map((event, index) => (
              <li key={index} className="card">
                <SafeImage
                  src={event.image}
                  alt={event.text || coverageTitle}
                  width={260}
                  height={160}
                  className="card-img !rounded-[8px] !h-[160px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
