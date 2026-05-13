"use client";

// Renders all interactive banner elements after hydration:
//   • Cross-fade background images for slides 1-N (slide 0 is BannerHero, server-rendered LCP)
//   • Text overlay for slides 1-N (covers BannerHeroText which handles slide 0)
//   • Spinning logo watermark
//   • Dot navigation + pause control
//
// Z-index layering (within the parent `position:relative` section):
//   0 – BannerHero image (server, LCP)
//   1 – Cross-fade images for slides 1-N (client, lazy, fade over BannerHero)
//   2 – BannerHeroText overlay (server, slide 0 text — visible while opacity below is 0)
//   3 – Client text overlay (opacity 0 on slide 0, 1 on slides 1-N — covers BannerHeroText)
//   4 – Dot navigation (always on top)

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Slide } from "../_data/homeData";

const AUTOPLAY_INTERVAL = 7000;

interface BannerProps {
  slides: Slide[];
}

export default function Banner({ slides }: BannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      AUTOPLAY_INTERVAL,
    );
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const goToSlide = useCallback((index: number) => setCurrentSlide(index), []);
  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  const isFirstSlide = currentSlide === 0;

  return (
    <>
      {/* ── Cross-fade background images (slides 1-N only) ─────────────── */}
      {slides.map((slide, index) => {
        if (index === 0) return null; // BannerHero owns slide 0's image
        return (
          <div
            key={slide.id}
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 2,
              transition: "opacity 0.9s ease-in-out",
              opacity: currentSlide === index ? 1 : 0,
            }}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              loading="lazy"
              quality={75}
            />
          </div>
        );
      })}

      {/* ── Text overlay (slides 1-N — covers BannerHeroText) ──────────── */}
      <div
        className="overlay"
        style={{
          zIndex: 3,
          transition: "opacity 0.6s ease-in-out",
          opacity: isFirstSlide ? 0 : 1,
          pointerEvents: isFirstSlide ? "none" : "auto",
        }}
        aria-hidden={isFirstSlide}
        inert={isFirstSlide || undefined}
      >
        <div className="hero w-[-webkit-fill-available] content !text-start">
          <h2 className="display-xl-semibold">{slides[currentSlide].title}</h2>
          <p className="!mb-[32px] text-xl-regular max-w-[720px]">
            {slides[currentSlide].description}
          </p>
          <a href={slides[currentSlide].cta.href}>
            <button
              type="button"
              className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color"
            >
              <span className="dga-btn-label">{slides[currentSlide].cta.label}</span>
            </button>
          </a>
        </div>
      </div>

      {/* ── Screen-reader live region for slide changes ─────────────────── */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {`الشريحة ${currentSlide + 1} من ${slides.length}: ${slides[currentSlide].title}`}
      </div>

      {/* ── Dot navigation ─────────────────────────────────────────────── */}
      <div
        className="embla__dots"
        style={{ zIndex: 4 }}
        role="group"
        aria-label="التنقل بين الشرائح"
      >
        <button
          type="button"
          className="dga-btn dga-btn--sm dga-btn--primary-neutral--on-color"
          onClick={togglePause}
          aria-pressed={isPaused}
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

        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={`embla__dot ${currentSlide === index ? "embla__dot--selected" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`الانتقال إلى الشريحة ${index + 1}: ${slide.title}`}
            aria-current={currentSlide === index ? true : undefined}
          />
        ))}
      </div>
    </>
  );
}
