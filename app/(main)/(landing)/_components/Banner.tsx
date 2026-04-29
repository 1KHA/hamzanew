"use client";

/**
 * Banner — hero carousel with auto-advance.
 *
 * Bug fix: the original translateX was always positive, which works for RTL
 *   (slides flow right→left) but breaks in LTR (slides flow left→right, so the
 *   container must shift left = negative value). Now a MutationObserver watches
 *   <html dir> and flips the sign whenever the language is switched.
 *
 * Accessibility: WCAG 2.1 AA — pause/play for auto-rotation, carousel region
 *   label, per-slide labels, dot navigation with aria-label + aria-current.
 * Performance: Next.js <Image> with fill + priority on slide 0, useCallback
 *   for stable handler refs, MutationObserver (no polling).
 */

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import "@/app/styles/Button.css";

/* ── Static fallback slides ──────────────────────────────────────────────── */

const fallbackSlides = [
  {
    image: "/assets/image/hero.jpg",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
    buttonText: "المزيد",
  },
  {
    image: "/assets/image/hero.jpg",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
    buttonText: "المزيد",
  },
  {
    image: "/assets/image/hero.jpg",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
    buttonText: "المزيد",
  },
  {
    image: "/assets/image/hero.jpg",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
    buttonText: "المزيد",
  },
];

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
  const slides = bannerFields?.headerTitleText
    ? [
        {
          image: bannerFields.image || "/assets/image/hero.jpg",
          alt: bannerFields.smallHeaderTitleText || "",
          title: bannerFields.headerTitleText,
          description: bannerFields.descriptionText || "",
          buttonText: "المزيد",
        },
      ]
    : fallbackSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
   * Track <html dir> so we flip the translateX sign on language switch.
   * RTL → positive (container shifts right to reveal the next slide on the left).
   * LTR → negative (container shifts left to reveal the next slide on the right).
   *
   * Lazy initializer reads the DOM once at mount — avoids a synchronous
   * setState call inside an effect (which triggers a cascading render).
   */
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
  const togglePause = useCallback(() => setIsPaused((prev) => !prev), []);

  return (
    <section
      className="relative c-mask h-[560px] w-full"
      aria-label="عرض شرائح البانر"
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
              aria-label={`${index + 1} من ${slides.length}: ${slide.title}`}
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

            <button
              type="button"
              className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color"
            >
              <span className="dga-btn-label">{slides[currentSlide].buttonText}</span>
            </button>
          </div>

          {/* Spinning logo — purely decorative, hidden from AT */}
          <div className="banner-logo" aria-hidden="true">
            <Image
              src="/assets/image/logo-stroke.png"
              alt=""
              width={120}
              height={120}
              className="animate-spin-slow"
            />
          </div>
        </div>

        {/* Controls: pause/play + dot navigation */}
        <div className="embla__dots">

          {/* Pause/play satisfies WCAG 2.1 AA SC 2.2.2 for auto-moving content */}
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

          {slides.map((_, index) => (
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

      </div>
    </section>
  );
}

export default Banner;
