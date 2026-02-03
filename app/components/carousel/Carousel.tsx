"use client";

import React, { useState, useEffect, ReactNode, Children } from "react";
import "./Carousel.css";
import Button from "../button/Button";

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
  const [isRTL, setIsRTL] = useState(true);

  /* effectiveItems is only used for JS logic (dots count, maxSlide, arrows visibility).
     The actual item sizing is handled purely by CSS variables + media queries. */
  const getItemsForWidth = (width: number) => {
    if (width < 600) return 1;
    if (width < 1280) return 2;
    return itemsPerSlide;
  };

  const [effectiveItems, setEffectiveItems] = useState(itemsPerSlide);

  useEffect(() => {
    setEffectiveItems(getItemsForWidth(window.innerWidth));
    setIsRTL(
      document.dir === "rtl" ||
      getComputedStyle(document.body).direction === "rtl"
    );

    const onResize = () => setEffectiveItems(getItemsForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [itemsPerSlide]);

  const items = Children.toArray(children);
  const totalItems = items.length;
  const maxSlide = Math.max(0, totalItems - effectiveItems);

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

  const translationMultiplier = isRTL ? 1 : -1;

  // CSS variable: item width = calc((100% - (N-1)*gap) / N)
  // Transform uses the same formula so it stays in sync with CSS
  const itemWidthCalc = `calc((100% - (var(--items-per-slide) - 1) * var(--gap)) / var(--items-per-slide))`;

  return (
    <div
      className="custom-carousel flex flex-col gap-[24px]"
      style={{
        "--items-per-slide": itemsPerSlide,
        "--gap": `${gap}px`,
      } as React.CSSProperties}
    >
      <div className="flex flex-row items-center gap-[16px]">
        {showArrows && totalItems > effectiveItems && (
          <Button
            onClick={prevSlide}
            variant="secondary"
            size="lg"
            icon="arrow-right-01"
            iconSize={16}
          />
        )}

        <div className="carousel-viewport flex-1">
          <div
            className="carousel-container"
            style={{
              transform: `translateX(calc(${translationMultiplier} * ${currentSlide} * (${itemWidthCalc} + var(--gap))))`,
            }}
          >
            {items.map((item, index) => (
              <div key={index} className="carousel-item">
                {item}
              </div>
            ))}
          </div>
        </div>

        {showArrows && totalItems > effectiveItems && (
          <Button
            onClick={nextSlide}
            variant="secondary"
            size="lg"
            icon="arrow-left-01"
            iconSize={16}
          />
        )}
      </div>

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
