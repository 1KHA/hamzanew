import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuItemType } from "./menuData";
import { t } from "@/app/_lib/translationContext";
import { st } from "@/app/_lib/static-text";

// =============================================
// TYPES
// =============================================

interface MenuItemProps {
  item: MenuItemType;
  /** Whether this item is the currently active route */
  isActive: boolean;
  /** Whether the submenu panel for this item is currently visible */
  isSubmenuOpen: boolean;
  /** Called when the user clicks the submenu toggle button */
  onToggleSubmenu: () => void;
  /** Called when the user navigates to this item's href */
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
// COMPONENT
// =============================================
/**
 * Renders a single top-level navigation item inside the desktop header.
 *
 * — If the item has a submenu it renders a <button> that toggles the
 *   dropdown panel, with aria-expanded reflecting the open state.
 * — Otherwise it renders a Next.js <Link> for direct navigation.
 *
 * Wrapped in React.memo so the component only re-renders when its own
 * props change, preventing the whole list from re-rendering on every
 * submenu open/close cycle.
 */
const MenuItem = memo<MenuItemProps>(({
  item,
  isActive,
  isSubmenuOpen,
  onToggleSubmenu,
  onLinkClick,
  translations,
}) => {
  const menuItemClass = `header-menu__item${isActive ? " header-menu__item--active" : ""}`;
  const resolvedLabel = resolveLabel(item.label, translations);

  // ── Submenu toggle button ──────────────────────────────────────────────
  if (item.hasSubmenu) {
    return (
      <li className="group">
        <button
          type="button"
          onClick={onToggleSubmenu}
          className={menuItemClass}
          // aria-haspopup tells assistive tech that activating this button
          // opens a submenu panel
          aria-haspopup="true"
          // aria-expanded reflects the current open/closed state
          aria-expanded={isSubmenuOpen}
          aria-label={`${resolvedLabel}${st("nav", "submenuSuffixAria")}`}
        >
          <span className="header-menu__item-label">{resolvedLabel}</span>

          {/* Chevron icon — rotates 180° when the submenu is open.
              aria-hidden keeps it invisible to screen readers since
              aria-expanded already communicates the state.          */}
          <span className="header-menu__item-arrow" aria-hidden="true">
            <Image
              src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
              alt={st("nav", "submenuArrowAlt")}
              width={24}
              height={24}
              className={`inline-block transition-transform duration-300${
                isSubmenuOpen ? " rotate-180" : ""
              }`}
            />
          </span>
        </button>
      </li>
    );
  }

  // ── Regular navigation link ────────────────────────────────────────────
  return (
    <li>
      <Link
        href={item.href || "#"}
        onClick={onLinkClick}
        className={menuItemClass}
      >
        <span className="header-menu__item-label">{resolvedLabel}</span>
      </Link>
    </li>
  );
});

MenuItem.displayName = "MenuItem";

export default MenuItem;
