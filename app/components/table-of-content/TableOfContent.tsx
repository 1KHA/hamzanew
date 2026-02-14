"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import "./TableOfContent.css";

/* ── Types ── */

export interface TocSection {
  /** Display label */
  Name: string;
  /** ID of the target DOM element to scroll to */
  Target: string;
  /** Optional nested sub-sections */
  Children?: TocSection[];
}

export interface TableOfContentProps {
  /** Array of sections (supports nesting up to 3 levels) */
  sections: TocSection[];
  /** Main heading displayed at the top */
  title?: string;
  /** Sub-heading displayed above the title */
  subTitle?: string;
  /** ID of the section to highlight on first render */
  defaultActiveId?: string;
  /** Accessible label for the nav landmark (screen readers) */
  ariaLabel?: string;
  /** Extra class name for the root element */
  className?: string;
}

/* ── Constants ── */

/** Pixel threshold for scroll-spy to consider a section "in view" */
const SCROLL_THRESHOLD = 10;
/** Duration (ms) to ignore scroll events after a manual click */
const MANUAL_SCROLL_GUARD_MS = 1000;
/** Offset (px) above the target element when scrolling */
const HEADER_OFFSET = 100;

/* ── Helpers ── */

interface ScrollRange {
  id: string;
  range: [number, number];
}

/**
 * Given a map of { sectionId → topPosition }, return sorted ranges
 * where each section "owns" the scroll region from its top to the next section's top.
 */
function convertToScrollRanges(
  positions: Record<string, number>
): ScrollRange[] {
  const ids = Object.keys(positions).sort(
    (a, b) => positions[a] - positions[b]
  );
  if (ids.length === 0) return [];

  const ranges: ScrollRange[] = [];

  for (let i = 0; i < ids.length - 1; i++) {
    ranges.push({
      id: ids[i],
      range: [positions[ids[i]], positions[ids[i + 1]]],
    });
  }

  /* Last section extends to infinity */
  const lastId = ids[ids.length - 1];
  ranges.push({ id: lastId, range: [positions[lastId], Infinity] });

  return ranges;
}

/**
 * Recursively collect every section target position from the DOM.
 */
function collectPositions(
  sections: TocSection[],
  scrollY: number,
  out: Record<string, number>
) {
  for (const section of sections) {
    const el = document.getElementById(section.Target);
    if (el) {
      out[section.Target] = el.getBoundingClientRect().top + scrollY;
    }
    if (section.Children?.length) {
      collectPositions(section.Children, scrollY, out);
    }
  }
}

/**
 * Flatten all section targets into a single ordered list (for keyboard nav).
 */
function flattenTargets(sections: TocSection[]): string[] {
  const result: string[] = [];
  for (const s of sections) {
    result.push(s.Target);
    if (s.Children) {
      for (const sub of s.Children) {
        result.push(sub.Target);
        if (sub.Children) {
          for (const subSub of sub.Children) {
            result.push(subSub.Target);
          }
        }
      }
    }
  }
  return result;
}

/* ── Component ── */

export default function TableOfContent({
  sections,
  title = "main",
  subTitle = "sub",
  defaultActiveId,
  ariaLabel = "جدول المحتويات",
  className,
}: TableOfContentProps) {
  const [activeId, setActiveId] = useState(defaultActiveId ?? "");
  const isManuallyScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const navRef = useRef<HTMLElement>(null);

  /* ── Scroll spy ── */

  const handleScroll = useCallback(() => {
    if (isManuallyScrolling.current) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const positions: Record<string, number> = {};
    collectPositions(sections, scrollY, positions);

    const ranges = convertToScrollRanges(positions);
    if (ranges.length === 0) return;

    let newId = ranges[0].id;
    for (const { id, range } of ranges) {
      const [start, end] = range;
      if (scrollY + SCROLL_THRESHOLD >= start && scrollY < end) {
        newId = id;
        break;
      }
    }

    setActiveId((prev) => (prev !== newId ? newId : prev));
  }, [sections]);

  useEffect(() => {
    /* Initialise after DOM is painted */
    const timer = setTimeout(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 300);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [handleScroll]);

  /* ── Click → smooth scroll ── */

  const scrollToSection = useCallback((id: string) => {
    setActiveId(id);
    isManuallyScrolling.current = true;

    const target = document.getElementById(id);
    if (target) {
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isManuallyScrolling.current = false;
    }, MANUAL_SCROLL_GUARD_MS);
  }, []);

  /* ── Keyboard navigation (Arrow keys between items) ── */

  const allTargets = useRef<string[]>([]);
  allTargets.current = flattenTargets(sections);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, currentTarget: string) => {
      const targets = allTargets.current;
      const idx = targets.indexOf(currentTarget);
      if (idx === -1) return;

      let nextIdx = -1;

      if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        e.preventDefault();
        nextIdx = idx < targets.length - 1 ? idx + 1 : 0;
      } else if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        e.preventDefault();
        nextIdx = idx > 0 ? idx - 1 : targets.length - 1;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIdx = targets.length - 1;
      }

      if (nextIdx >= 0) {
        const nextRef = tabRefs.current.get(targets[nextIdx]);
        nextRef?.focus();
      }
    },
    []
  );

  /* ── Pressed state helpers ── */

  const addPressed = useCallback((id: string) => {
    tabRefs.current.get(id)?.classList.add("pressed");
  }, []);

  const removePressed = useCallback((id: string) => {
    tabRefs.current.get(id)?.classList.remove("pressed");
  }, []);

  /* ── Render helpers ── */

  const renderTab = (section: TocSection) => {
    const isActive = activeId === section.Target;

    return (
      <li key={section.Target} role="none">
        <a
          href={`#${section.Target}`}
          role="treeitem"
          ref={(el) => {
            if (el) tabRefs.current.set(section.Target, el);
          }}
          className={`table-of-content__tab${isActive ? " active" : ""}`}
          aria-current={isActive ? "location" : undefined}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(section.Target);
          }}
          onKeyDown={(e) => handleKeyDown(e, section.Target)}
          onMouseDown={() => addPressed(section.Target)}
          onMouseUp={() => removePressed(section.Target)}
          onMouseOut={() => removePressed(section.Target)}
        >
          <span className="table-of-content__tab-label">{section.Name}</span>
        </a>
      </li>
    );
  };

  const renderSubTabs = (subTab: TocSection) => (
    <ul
      key={subTab.Target}
      className="table-of-content__tab-sublist"
      role="group"
    >
      {renderTab(subTab)}
      {subTab.Children?.map((subSubTab) => (
        <ul
          key={subSubTab.Target}
          className="table-of-content__tab-sub-sublist"
          role="group"
        >
          {renderTab(subSubTab)}
        </ul>
      ))}
    </ul>
  );

  /* ── Main render ── */

  return (
    <nav
      ref={navRef}
      className={`table-of-content${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
    >
      {/* Header */}
      <div className="table-of-content__header">
        <p className="text-sm-regular">{subTitle}</p>
        <h4 className="text-xl-semibold">{title}</h4>
      </div>

      {/* Body */}
      <div className="table-of-content__body">
        <ul className="table-of-content__tab-list" role="tree">
          {sections.map((tab) =>
            tab.Children ? (
              <li key={tab.Target} role="none">
                {renderTab(tab).props.children}
                {tab.Children.map((sub) => renderSubTabs(sub))}
              </li>
            ) : (
              renderTab(tab)
            )
          )}
        </ul>
      </div>
    </nav>
  );
}
