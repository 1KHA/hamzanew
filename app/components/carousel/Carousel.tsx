/**
 * Carousel Component
 *
 * A responsive, accessible carousel/slider component that supports:
 * - Configurable items per slide with responsive breakpoints
 * - RTL (Right-to-Left) language support
 * - Auto-play functionality
 * - Navigation arrows and dot indicators
 * - Keyboard navigation
 * - Touch/swipe gestures for mobile navigation
 *
 * @accessibility
 * - Navigation buttons have descriptive aria-labels
 * - Dot indicators announce current position
 * - Keyboard navigation with arrow keys
 * - Touch/swipe gestures for mobile users
 * - Live region announces slide changes
 * - Pause auto-play on focus/hover/touch
 */

"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
  Children,
} from "react";
import "./Carousel.css";
import Button from "../button/Button";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Props for the Carousel component
 */
interface CarouselProps {
  /** Child elements to display in the carousel */
  children: ReactNode;
  /** Number of items visible per slide on large screens */
  itemsPerSlide?: number;
  /** Gap between items in pixels */
  gap?: number;
  /** Enable automatic slide advancement */
  autoPlay?: boolean;
  /** Interval between auto-play transitions in milliseconds */
  interval?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Border radius for arrow buttons */
  arrowRadius?: string;
  /** Show dot indicators */
  showDots?: boolean;
  /** Background color for arrow buttons */
  arrowBgColor?: string;
}

/* ==========================================================================
   Constants
   ========================================================================== */

/** Breakpoints for responsive items per slide */
const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 1280,
} as const;

/** Default transition duration in milliseconds */
const TRANSITION_DURATION = 500;

/** Minimum swipe distance in pixels to trigger navigation */
const SWIPE_THRESHOLD = 50;

/* ==========================================================================
   Helper Functions
   ========================================================================== */

/**
 * Calculates the number of items to show based on viewport width
 *
 * @param width - Current viewport width
 * @param maxItems - Maximum items per slide on large screens
 * @returns Number of items to display
 */
function getItemsForWidth(width: number, maxItems: number): number {
  if (width < BREAKPOINTS.MOBILE) return 1;
  if (width < BREAKPOINTS.TABLET) return Math.min(2, maxItems);
  return maxItems;
}

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * Carousel Component
 *
 * Renders a responsive carousel with configurable navigation options.
 *
 * @example
 * // Basic usage
 * <Carousel itemsPerSlide={3}>
 *   <Card title="Item 1" />
 *   <Card title="Item 2" />
 *   <Card title="Item 3" />
 * </Carousel>
 *
 * @example
 * // With auto-play and arrows
 * <Carousel
 *   itemsPerSlide={4}
 *   autoPlay
 *   interval={3000}
 *   showArrows
 *   showDots={false}
 * >
 *   {items.map(item => <Card key={item.id} {...item} />)}
 * </Carousel>
 */
const Carousel: React.FC<CarouselProps> = ({
  children,
  itemsPerSlide = 1,
  gap = 16,
  autoPlay = false,
  interval = 5000,
  showArrows = false,
  showDots = true,
}) => {
  /* State Management */
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isRTL, setIsRTL] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [effectiveItems, setEffectiveItems] = useState<number>(itemsPerSlide);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);

  /* Touch/Swipe Refs */
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  /* Memoized Values */
  const items = useMemo(() => Children.toArray(children), [children]);
  const totalItems = items.length;
  const maxSlide = useMemo(
    () => Math.max(0, totalItems - effectiveItems),
    [totalItems, effectiveItems]
  );

  /* Navigation Handlers */
  const goToSlide = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, maxSlide));
      setCurrentSlide(clampedIndex);
    },
    [maxSlide]
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  }, [maxSlide]);

  /* Keyboard Navigation Handler */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          isRTL ? nextSlide() : prevSlide();
          break;
        case "ArrowRight":
          event.preventDefault();
          isRTL ? prevSlide() : nextSlide();
          break;
        case "Home":
          event.preventDefault();
          goToSlide(0);
          break;
        case "End":
          event.preventDefault();
          goToSlide(maxSlide);
          break;
      }
    },
    [isRTL, nextSlide, prevSlide, goToSlide, maxSlide]
  );

  /* Touch/Swipe Handlers */
  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = event.touches[0].clientX;
    setIsSwiping(true);
    setIsPaused(true);
  }, []);

  const handleTouchMove = useCallback((event: React.TouchEvent) => {
    touchEndX.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsSwiping(false);
    const swipeDistance = touchStartX.current - touchEndX.current;
    const absDistance = Math.abs(swipeDistance);

    if (absDistance >= SWIPE_THRESHOLD) {
      // Determine swipe direction based on RTL
      if (isRTL) {
        // RTL: swipe left = prev, swipe right = next
        swipeDistance > 0 ? prevSlide() : nextSlide();
      } else {
        // LTR: swipe left = next, swipe right = prev
        swipeDistance > 0 ? nextSlide() : prevSlide();
      }
    }

    // Reset touch values
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [isRTL, nextSlide, prevSlide]);

  /* Initialize RTL detection and responsive items */
  useEffect(() => {
    const updateState = () => {
      setEffectiveItems(getItemsForWidth(window.innerWidth, itemsPerSlide));
      setIsRTL(
        document.dir === "rtl" ||
          getComputedStyle(document.body).direction === "rtl"
      );
    };

    updateState();

    // Enable transitions after hydration to prevent flash
    requestAnimationFrame(() => setIsReady(true));

    window.addEventListener("resize", updateState);
    return () => window.removeEventListener("resize", updateState);
  }, [itemsPerSlide]);

  /* Reset current slide when effectiveItems changes */
  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    }
  }, [currentSlide, maxSlide]);

  /* Auto-play functionality */
  useEffect(() => {
    if (!autoPlay || totalItems <= effectiveItems || isPaused) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, totalItems, effectiveItems, isPaused, nextSlide]);

  /* Early return for empty carousel */
  if (totalItems === 0) return null;

  /* Calculate translation for RTL/LTR support */
  const translationMultiplier = isRTL ? 1 : -1;
  const itemWidthCalc = `calc((100% - (var(--items-per-slide) - 1) * var(--gap)) / var(--items-per-slide))`;
  const showNavigation = totalItems > effectiveItems;

  return (
    <div
      className="custom-carousel flex flex-col gap-[24px]"
      style={
        {
          "--items-per-slide": itemsPerSlide,
          "--gap": `${gap}px`,
        } as React.CSSProperties
      }
      role="region"
      aria-roledescription="carousel"
      aria-label="عرض المحتوى"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Carousel Track with Navigation */}
      <div className="flex flex-row items-center gap-[16px]">
        {/* Previous Button */}
        {showArrows && showNavigation && (
          <Button
            onClick={prevSlide}
            variant="secondary"
            size="lg"
            icon="arrow-right-01"
            iconSize={16}
            iconClass="flip-rtl"
            ariaLabel="الانتقال إلى العنصر السابق"
            disabled={currentSlide === 0 && !autoPlay}
          />
        )}

        {/* Carousel Viewport */}
        <div
          className="carousel-viewport flex-1"
          role="group"
          aria-live="polite"
          aria-atomic="false"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carousel-container"
            style={{
              transform: `translateX(calc(${translationMultiplier} * ${currentSlide} * (${itemWidthCalc} + var(--gap))))`,
              transition: isReady
                ? `transform ${TRANSITION_DURATION}ms ease-in-out`
                : "none",
            }}
          >
            {items.map((item, index) => {
              const isVisible = index >= currentSlide && index < currentSlide + effectiveItems;
              return (
                <div
                  key={index}
                  className="carousel-item"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`العنصر ${index + 1} من ${totalItems}`}
                  aria-hidden={!isVisible}
                  inert={!isVisible || undefined}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        {showArrows && showNavigation && (
          <Button
            onClick={nextSlide}
            variant="secondary"
            size="lg"
            icon="arrow-left-01"
            iconSize={16}
            iconClass="flip-rtl"
            ariaLabel="الانتقال إلى العنصر التالي"
            disabled={currentSlide === maxSlide && !autoPlay}
          />
        )}
      </div>

      {/* Dot Indicators */}
      {showDots && showNavigation && (
        <nav
          className="carousel-dots"
          role="tablist"
          aria-label="اختيار الشريحة"
        >
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              role="tab"
              className={`carousel-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`الانتقال إلى الشريحة ${index + 1} من ${maxSlide + 1}`}
              aria-selected={currentSlide === index}
              tabIndex={currentSlide === index ? 0 : -1}
            />
          ))}
        </nav>
      )}
    </div>
  );
};

export default Carousel;
