"use client";

// Renders ONLY the spinning logo and dot-navigation controls.
// The hero text is server-rendered in BannerHeroText (sibling in page.tsx)
// so the LCP candidate (h1) is in the initial HTML, not delayed by hydration.
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDE_COUNT = 4;

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_COUNT);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const goToSlide = useCallback((index: number) => setCurrentSlide(index), []);
  const togglePause = useCallback(() => setIsPaused((prev) => !prev), []);

  return (
    <>
      <div className="banner-logo" aria-hidden="true">
        <Image
          src="/assets/image/logo-stroke.png"
          alt=""
          width={120}
          height={120}
          className="animate-spin-slow"
        />
      </div>

      <div className="embla__dots">
        <button
          type="button"
          className="dga-btn dga-btn--sm dga-btn--primary-neutral--on-color"
          onClick={togglePause}
          aria-label={isPaused ? "تشغيل العرض التلقائي" : "إيقاف العرض التلقائي"}
        >
          <Image
            src={
              isPaused
                ? "/assets/icons/stroke-standard/play-stroke-rounded.svg"
                : "/assets/icons/stroke-standard/pause-stroke-rounded.svg"
            }
            alt=""
            aria-hidden="true"
            width={20}
            height={20}
          />
        </button>

        {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`embla__dot ${currentSlide === index ? "embla__dot--selected" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`الانتقال إلى الشريحة ${index + 1}`}
            aria-current={currentSlide === index ? true : undefined}
          />
        ))}
      </div>
    </>
  );
}

export default Banner;
