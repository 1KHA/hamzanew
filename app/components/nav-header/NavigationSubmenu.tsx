import { useRef, useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  SubmenuColumn as SubmenuColumnType,
  SubmenuItem,
} from "./menuData";
import { t } from "@/app/_lib/translationContext";
import { st } from "@/app/_lib/static-text";

// =============================================
// TYPES
// =============================================

interface NavigationSubmenuProps {
  /** Whether the submenu panel is currently open */
  isOpen: boolean;
  /** Columns of links to render — may be undefined while closing */
  columns?: SubmenuColumnType[];
  /** Called when any link inside the submenu is clicked */
  onLinkClick: () => void;
  translations?: Record<string, string> | null;
}

// =============================================
// HELPERS
// =============================================

/**
 * Resolve a menu label: try Liferay translations first, then fall back to
 * static-text for "scope.key" format (matching PageHero.tsx pattern).
 */
function resolveLabel(key: string, translations?: Record<string, string> | null): string {
  const translated = t(key, translations);
  if (translated !== key) return translated;
  if (key.includes(".")) {
    const [scope, k] = key.split(".", 2);
    if (scope && k) {
      const staticText = st(scope, k);
      if (staticText !== k) return staticText;
    }
  }
  return key;
}

// =============================================
// SUB-COMPONENTS
// =============================================

/**
 * Renders a single submenu link with an icon and a text label.
 * Uses item.href as key at the call site for stable reconciliation.
 *
 * The icon alt text mirrors the item label so screen readers announce
 * a meaningful description instead of the raw file path.
 */
const SubmenuLink = memo<{ item: SubmenuItem; onClick: () => void; translations?: Record<string, string> | null }>(
  ({ item, onClick, translations }) => {
    const resolvedLabel = resolveLabel(item.label, translations);
    return (
      <li>
        <Link href={item.href} onClick={onClick} className="sub-link sub-menu__link">
          <div className="flex gap-[16px] items-center">
            <Image
              src={item.icon}
              alt={`أيقونة ${resolvedLabel}`}
              width={24}
              height={24}
              className="inline-block"
            />
            <span>{resolvedLabel}</span>
          </div>
        </Link>
      </li>
    );
  },
);

SubmenuLink.displayName = "SubmenuLink";

/**
 * Renders a labeled column of SubmenuLinks.
 * Uses column.title as key at the call site for stable reconciliation.
 */
const SubmenuColumn = memo<{
  column: SubmenuColumnType;
  onLinkClick: () => void;
  translations?: Record<string, string> | null;
}>(({ column, onLinkClick, translations }) => (
  <div className="sub-nav-title">
    {/* Column heading */}
    <div className="p-[12px]">{resolveLabel(column.title, translations)}</div>

    {/* List of links — href used as key for stable reconciliation */}
    <ul className="grid gap-[4px]">
      {column.items.map((item) => (
        <SubmenuLink key={item.label} item={item} onClick={onLinkClick} translations={translations} />
      ))}
    </ul>
  </div>
));

SubmenuColumn.displayName = "SubmenuColumn";

// =============================================
// MAIN COMPONENT
// =============================================
/**
 * Animated dropdown submenu that slides in below the main header bar.
 *
 * Animation strategy:
 * — shouldRender gates DOM presence (mount / unmount)
 * — animating drives the CSS opacity + translateY transition
 * — Double requestAnimationFrame on open ensures the element is painted
 *   before the transition starts, preventing a flash of the end state
 * — onTransitionEnd unmounts the panel after the closing animation
 *   finishes so it does not block pointer events while invisible
 *
 * Snapshot pattern:
 * — lastColumnsRef stores the most recent valid columns so that content
 *   stays visible during the closing animation (avoids a content flash)
 *
 * Accessibility:
 * — role="navigation" + aria-label make this region a named landmark
 *   that screen reader users can jump to directly
 */
export default function NavigationSubmenu({
  isOpen,
  columns,
  onLinkClick,
  translations,
}: NavigationSubmenuProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Controls whether the panel exists in the DOM at all
  const [shouldRender, setShouldRender] = useState(false);

  // Controls the animated CSS state (true = fully visible)
  const [animating, setAnimating] = useState(false);

  // Holds the last valid columns snapshot for use during close animation
  const lastColumnsRef = useRef<SubmenuColumnType[] | undefined>(undefined);
  if (columns) lastColumnsRef.current = columns;

  // Use live columns when open; fall back to snapshot while closing
  const renderColumns = columns ?? lastColumnsRef.current;

  // ── Mount / unmount with entrance + exit animation ───────────────────
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Two rAF frames: first paints the element at opacity 0,
      // second triggers the CSS transition to opacity 1
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false); // Begin exit transition
    }
  }, [isOpen]);

  // Unmount from the DOM after the exit transition completes
  const handleTransitionEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender || !renderColumns) return null;

  return (
    <nav
      ref={contentRef}
      className="sub-navs sub-navs-fixed"
      aria-label="القائمة الفرعية"
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: "absolute",
        top: "72px",
        left: 0,
        right: 0,
        zIndex: 1,
        overflow: "hidden",
        opacity: animating ? 1 : 0,
        transform: animating ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[24px] content">
        {/* Use column.title as key — more stable than array index */}
        {renderColumns.map((column, index) => (
          <SubmenuColumn
            key={column.title || index}
            column={column}
            onLinkClick={onLinkClick}
            translations={translations}
          />
        ))}
      </div>
    </nav>
  );
}
