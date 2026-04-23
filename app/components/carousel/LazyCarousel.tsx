"use client";
import dynamic from "next/dynamic";

// Lazy-loads the Carousel JS after the initial paint.
// ssr: false is valid here because this is a Client Component.
// Server components import this wrapper instead of Carousel directly.
const LazyCarousel = dynamic(() => import("./Carousel"), {
  ssr: false,
  loading: () => (
    <div className="flex gap-5 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="skeleton rounded-[12px] shrink-0"
          style={{ minWidth: "calc(33.33% - 14px)", height: 260 }}
        />
      ))}
    </div>
  ),
});

export default LazyCarousel;
