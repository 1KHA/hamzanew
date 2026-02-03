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
  const [isRTL, setIsRTL] = useState(true); // Default to true as per project context

  /* Responsive itemsPerSlide logic */
  const [effectiveItems, setEffectiveItems] = useState(1); // Default to 1 for mobile-first

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      let newItems;

      // Responsive breakpoints:
      // Mobile (< 600px): 1 card
      // Medium (600px - 1280px): 2 cards
      // Extra Large (>= 1280px): original itemsPerSlide value
      if (width < 600) {
        newItems = 1;
      } else if (width < 1280) {
        newItems = 2;
      } else {
        newItems = itemsPerSlide;
      }

      setEffectiveItems(newItems);
    };

    // Run on mount
    updateItemsPerSlide();

    // Run on resize
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
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
    <div className="custom-carousel flex flex-col gap-[24px]">
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
              transform: `translateX(calc(${translationMultiplier} * ${currentSlide} * (${itemWidth} + ${gap}px)))`,
              gap: `${gap}px`,
              flexDirection: isRTL ? "row" : "row",
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
