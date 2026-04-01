import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuItemType } from "./menuData";

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
}) => {
  const menuItemClass = `header-menu__item${isActive ? " header-menu__item--active" : ""}`;

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
          aria-label={`${item.label}، قائمة فرعية`}
        >
          <span className="header-menu__item-label">{item.label}</span>

          {/* Chevron icon — rotates 180° when the submenu is open.
              aria-hidden keeps it invisible to screen readers since
              aria-expanded already communicates the state.          */}
          <span className="header-menu__item-arrow" aria-hidden="true">
            <Image
              src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
              alt="سهم تفتح القائمة الفرعية"
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
        <span className="header-menu__item-label">{item.label}</span>
      </Link>
    </li>
  );
});

MenuItem.displayName = "MenuItem";

export default MenuItem;
