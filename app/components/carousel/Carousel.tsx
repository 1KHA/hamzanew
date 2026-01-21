"use client";

import React, { useState, useEffect, ReactNode, Children, useRef } from "react";
import "./Carousel.css";

interface CustomCarouselProps {
  children: ReactNode;
  itemsPerSlide?: number;
  gap?: number;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  arrowRadius?: string;
  showDots?: boolean;
  arrowBgColor?: string;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  children,
  itemsPerSlide = 1,
  gap = 16,
  autoPlay = false,
  interval = 5000,
  showArrows = false,
  arrowRadius = "50%",
  showDots = true,
  arrowBgColor = "white",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isRTL, setIsRTL] = useState(true); // Default to true as per project context
  /* Responsive itemsPerSlide logic */
  const [effectiveItems, setEffectiveItems] = useState(itemsPerSlide);

  useEffect(() => {
    const handleResize = () => {
      // User requested 1 card for sm (600) and md (960)
      // We interpret this as: below 960px, show 1 card.
      if (window.innerWidth < 960) {
        setEffectiveItems(1);
      } else {
        setEffectiveItems(itemsPerSlide);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemsPerSlide]);

  const items = Children.toArray(children);
  const totalItems = items.length;
  // Ensure we don't slide past the end
  const maxSlide = Math.max(0, totalItems - effectiveItems);

  useEffect(() => {
    // Detect RTL
    if (typeof document !== "undefined") {
      setIsRTL(
        document.dir === "rtl" ||
          getComputedStyle(document.body).direction === "rtl",
      );
    }
  }, []);

  useEffect(() => {
    if (!autoPlay || totalItems <= effectiveItems) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, totalItems, effectiveItems, maxSlide]);

  if (totalItems === 0) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  // Calculate the width of each item based on effectiveItems and gap
  const itemWidth = `calc((100% - ${(effectiveItems - 1) * gap}px) / ${effectiveItems})`;

  // In RTL, translateX positive moves content to the right (showing items on the left)
  // In LTR, translateX negative moves content to the left (showing items on the right)
  const translationMultiplier = isRTL ? 1 : -1;

  return (
    <div className="custom-carousel" dir={isRTL ? "rtl" : "ltr"}>
      <div className="carousel-viewport">
        <div
          className="carousel-container"
          style={{
            transform: `translateX(calc(${translationMultiplier} * ${currentSlide} * (${itemWidth} + ${gap}px)))`,
            gap: `${gap}px`,
            flexDirection: isRTL ? "row" : "row", // row-reverse could be used but standard row with RTL dir is better
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="carousel-item"
              style={{
                flex: `0 0 ${itemWidth}`,
                minWidth: itemWidth,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {showArrows && totalItems > effectiveItems && (
        <>
          <button
            className="carousel-arrow prev"
            onClick={prevSlide}
            style={{ borderRadius: arrowRadius, backgroundColor: arrowBgColor }}
            aria-label="Previous slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className="carousel-arrow next"
            onClick={nextSlide}
            style={{ borderRadius: arrowRadius, backgroundColor: arrowBgColor }}
            aria-label="Next slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalItems > effectiveItems && (
        <div className="carousel-dots">
          {items.slice(0, maxSlide + 1).map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomCarousel;
