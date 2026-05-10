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

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { st } from "@/app/_lib/static-text";
import "@/app/styles/Button.css";

/* ── Static fallback slides ──────────────────────────────────────────────── */

function getFallbackSlides() {
  return [
    {
      image: "/assets/image/hero.jpg",
      alt: st("banner", "slideAlt"),
      title: st("banner", "slideTitle"),
      description: st("banner", "slideDescription"),
      buttonText: st("banner", "buttonMore"),
    },
    {
      image: "/assets/image/hero.jpg",
      alt: st("banner", "slideAlt"),
      title: st("banner", "slideTitle"),
      description: st("banner", "slideDescription"),
      buttonText: st("banner", "buttonMore"),
    },
    {
      image: "/assets/image/hero.jpg",
      alt: st("banner", "slideAlt"),
      title: st("banner", "slideTitle"),
      description: st("banner", "slideDescription"),
      buttonText: st("banner", "buttonMore"),
    },
    {
      image: "/assets/image/hero.jpg",
      alt: st("banner", "slideAlt"),
      title: st("banner", "slideTitle"),
      description: st("banner", "slideDescription"),
      buttonText: st("banner", "buttonMore"),
    },
  ];
}

/* ── Types ───────────────────────────────────────────────────────────────── */

interface BannerFields {
  smallHeaderTitleText?: string;
  headerTitleText?: string;
  descriptionText?: string;
  image?: string;
}

interface BannerProps {
  bannerFields?: BannerFields;
}

/* ── Component ────────────────────────────────────────────────────────────── */

function Banner({ bannerFields }: BannerProps) {
  const router = useRouter();
  const slides = bannerFields?.headerTitleText
    ? [
        {
          image: bannerFields.image || "/assets/image/hero.jpg",
          alt: bannerFields.smallHeaderTitleText || st("banner", "slideAlt"),
          title: bannerFields.headerTitleText,
          description: bannerFields.descriptionText || st("banner", "slideDescription"),
          buttonText: st("banner", "buttonMore"),
        },
      ]
    : getFallbackSlides();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isRTL, setIsRTL] = useState<boolean>(() => {
    if (typeof document === "undefined") return true; // SSR safe default
    return document.documentElement.dir !== "ltr";
  });

  useEffect(() => {
    const html = document.documentElement;
    // MutationObserver callback is asynchronous — setState here is fine
    const observer = new MutationObserver(() => {
      setIsRTL(html.dir !== "ltr");
    });
    observer.observe(html, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);

  // Auto-advance — suspended while isPaused is true
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  // RTL: positive offset | LTR: negative offset
  const translateX = `translateX(${isRTL ? currentSlide * 100 : -(currentSlide * 100)}%)`;

  const goToSlide = useCallback((index: number) => setCurrentSlide(index), []);
  const togglePause = useCallback(() => setIsPaused((p) => !p), []);

  const isFirstSlide = currentSlide === 0;

  return (
    <section
      className="relative c-mask h-[560px] w-full"
      aria-label={st("banner", "ariaBanner")}
      aria-roledescription="carousel"
    >
      <div className="embla-custom">

        {/* Slide images strip */}
        <div
          className="embla-container"
          style={{ transform: translateX }}
          // "off" during auto-play avoids constant AT announcements; "polite" when paused
          aria-live={isPaused ? "polite" : "off"}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="embla-custom__slide"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} ${st("banner", "ariaGoToSlide")} ${slides.length}: ${slide.title}`}
              aria-hidden={index !== currentSlide}
            >
              {/* fill + sizes lets next/image pick the right resolution per viewport */}
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="custom-banner"
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Fixed overlay: text content + decorative logo */}
        <div className="overlay">
          <div className="hero w-[-webkit-fill-available] content !text-start">
            <h1
              className="display-xl-semibold"
              dangerouslySetInnerHTML={{ __html: slides[currentSlide].title }}
            />

            {/* Description paragraph hidden per request */}
            {/* {slides[currentSlide].description && (
              <p className="!mb-[32px] text-xl-regular max-w-[720px]">
                {slides[currentSlide].description}
              </p>
            )} */}
          </div>
        </div>

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
      >
        <div className="hero w-[-webkit-fill-available] content !text-start">
          <h2 className="display-xl-semibold">{slides[currentSlide].title}</h2>
          <p className="!mb-[32px] text-xl-regular max-w-[720px]">
            {slides[currentSlide].description}
          </p>
          <button
            type="button"
            className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color"
            onClick={() => router.push("/about/who-we-are")}
          >
            <span className="dga-btn-label">{slides[currentSlide].buttonText}</span>
          </button>
        </div>

        {/* Controls: pause/play + dot navigation */}
        <div className="embla__dots">

          {/* Pause/play satisfies WCAG 2.1 AA SC 2.2.2 for auto-moving content */}
          <button
            type="button"
            className="dga-btn dga-btn--sm dga-btn--primary-neutral--on-color"
            onClick={togglePause}
            aria-label={isPaused ? st("banner", "ariaPlay") : st("banner", "ariaPause")}
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

          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`embla__dot ${currentSlide === index ? "embla__dot--selected" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`${st("banner", "ariaGoToSlide")} ${index + 1}`}
              aria-current={currentSlide === index ? true : undefined}
            />
          ))}
        </div>

      </div>

      {/* ── Spinning logo watermark ─────────────────────────────────────── */}
      <div className="banner-logo" aria-hidden="true" style={{ zIndex: 5 }}>
        <Image
          src="/assets/image/logo-stroke.png"
          alt=""
          width={500}
          height={500}
          style={{ animation: "spin-slow 40s linear infinite" }}
        />
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
    </div>
    </section>
  );
}

export default Banner;
