"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import "./breadcrumbs.css";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  disabled?: boolean;
}

type EllipsisItem = { ellipsis: true; items: BreadcrumbItem[] };

export type DgaBreadcrumbsProps = {
  items: BreadcrumbItem[];
  max?: number;
  onBreadcrumbClick?: (item: BreadcrumbItem, e?: React.MouseEvent) => void;
};

export function DgaBreadcrumbs({
  items = [],
  max = 5,
  onBreadcrumbClick,
}: DgaBreadcrumbsProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);

    const [isRTL, setIsRTL] = useState(true); 

  const [breadcrumbItems, setBreadcrumbItems] = useState<
    Array<BreadcrumbItem | EllipsisItem>
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function renderItems(
    itemsList: BreadcrumbItem[],
    maxNum: number,
  ): Array<BreadcrumbItem | EllipsisItem> {
    if (!Array.isArray(itemsList)) return [];
    if (itemsList.length <= maxNum) return itemsList.slice();

    const effectiveMax = Math.max(3, maxNum);
    const visibleCount = effectiveMax - 1;
    const firstHalf = Math.max(1, Math.floor(visibleCount / 2));
    const secondHalf = Math.max(1, visibleCount - firstHalf);

    const firstItems = itemsList.slice(0, firstHalf);
    const lastItems = itemsList.slice(-secondHalf);
    const middleItems = itemsList.slice(firstHalf, -secondHalf);

    if (middleItems.length === 0) return [...firstItems, ...lastItems];

    return [
      ...firstItems,
      { ellipsis: true, items: middleItems },
      ...lastItems,
    ];
  }
  useEffect(() => {
    setIsRTL(document.dir === "rtl" || document.documentElement.dir === "rtl");
  }, [])

  useEffect(() => {
    setBreadcrumbItems(renderItems(items, max));
  }, [items, max]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!rootRef.current) return;
      const target = e.target as Node;
      if (target && !rootRef.current.contains(target)) setIsMenuOpen(false);
    }

    if (isMenuOpen) document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [isMenuOpen]);

  function handleClick(e: React.MouseEvent, item: BreadcrumbItem) {
    if (item.disabled) {
      e.preventDefault();
      return;
    }

    onBreadcrumbClick?.(item, e);

    if (e.defaultPrevented) return;

    if (item.path) {
      e.preventDefault();
      router.push(item.path);
    }
  }

  const arrow = isRTL ? (
    <img
      src="/assets/icons/stroke-standard/arrow-left-01-stroke-rounded.svg"
      alt="arrow-left"
      width={24}
      height={24}
      className="inline-block"
    />
  ) : (
    <img
      src="/assets/icons/stroke-standard/arrow-right-01-stroke-rounded.svg"
      alt="arrow-right"
      width={24}
      height={24}
      className="inline-block"
    />
  );

  return (
    <div ref={rootRef} className="dga-breadcrumb-root">
      <nav aria-label="breadcrumb">
        <ul
          className={`dga-breadcrumb dga-breadcrumb--${isRTL ? "rtl" : "ltr"}`}
        >
          {breadcrumbItems.map((item, idx) => {
            // Ellipsis item
            if ("ellipsis" in (item as any)) {
              const ell = item as EllipsisItem;

              return (
                <li key={`ell-${idx}`} className="dga-breadcrumb-item ellipsis">
                  <span className="dga-breadcrumb-icon">
                    <img
                      src="/assets/icons/stroke-standard/arrow-left-01-stroke-rounded.svg"
                      alt={isRTL ? "arrow-left" : "arrow-right"}
                      width={24}
                      height={24}
                      className="inline-block flip-rtl"
                    />
                  </span>

                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                    className="ellipsis-button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen((s) => !s);
                    }}
                  >
                    <img
                      src="/assets/icons/stroke-standard/more-horizontal-stroke-rounded.svg"
                      alt="more"
                      width={16}
                      height={16}
                    />
                  </button>

                  {isMenuOpen && (
                    <ul className="dga-breadcrumb-dropdown">
                      {ell.items.map((it) => (
                        <li
                          key={it.label}
                          className="dga-breadcrumb-dropdown-item"
                        >
                          <a
                            href={it.disabled ? undefined : it.path}
                            onClick={(e) => {
                              setIsMenuOpen(false);
                              handleClick(e, it);
                            }}
                            className={`link-neutral ${it.disabled ? "link-neutral--disabled" : ""}`}
                            aria-disabled={it.disabled}
                          >
                            {it.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            // Normal breadcrumb item
            const b = item as BreadcrumbItem;
            const isLast = idx === breadcrumbItems.length - 1;
            const isFirst = idx === 0;

            return (
              <li
                key={`item-${idx}`}
                className={`dga-breadcrumb-item ${isLast ? "active" : ""}`}
                aria-current={isLast ? "page" : undefined}
              >
                {!isFirst && (
                  <span className="dga-breadcrumb-icon">
                    <img
                      src="/assets/icons/stroke-standard/arrow-left-01-stroke-rounded.svg"
                      alt={isRTL ? "arrow-left" : "arrow-right"}
                      width={24}
                      height={24}
                      className="inline-block flip-rtl"
                    />
                  </span>
                )}

                {b.path ? (
                  <a
                    href={b.disabled ? undefined : b.path}
                    onClick={(e) => handleClick(e, b)}
                    className={`link-neutral ${b.disabled ? "link-neutral--disabled" : ""} ${
                      isLast ? "link-neutral_current" : ""
                    }`}
                    aria-disabled={b.disabled}
                  >
                    {b.label}
                  </a>
                ) : (
                  <span
                    className={`link-neutral link-neutral_empty ${b.disabled ? "link-neutral--disabled" : ""} ${
                      isLast ? "link-neutral_current" : ""
                    }`}
                    aria-disabled={b.disabled}
                  >
                    {b.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default DgaBreadcrumbs;
