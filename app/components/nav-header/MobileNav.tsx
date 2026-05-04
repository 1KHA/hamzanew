"use client";

import { useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MENU_DATA, ACTION_ITEMS } from "./menuData";
import type { MenuItemType } from "./menuData";
import "./MobileNav.css";
import { t } from "@/app/_lib/translationContext";

// =============================================
// TYPES
// =============================================

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeLink: string;
  onLinkClick: (linkId: string) => void;
  onTranslateClick: () => void;
  translations?: Record<string, string> | null;
}

interface MobileNavItemProps {
  item: MenuItemType;
  isActive: boolean;
  isExpanded: boolean;
  onLinkClick: (linkId: string) => void;
  onToggleSubmenu: () => void;
  /** Index in the list — used to stagger the entrance animation */
  index: number;
  translations?: Record<string, string> | null;
}

// =============================================
// MOBILE NAV ITEM
// =============================================
/**
 * A single item inside the mobile navigation drawer.
 *
 * — Items with a submenu render as an accordion toggle.
 *   aria-expanded + aria-haspopup announce the state to screen readers.
 * — Regular items render as a Next.js Link.
 *
 * Wrapped in React.memo to prevent the entire list from re-rendering
 * when only one item's expanded state changes.
 */
const MobileNavItem = memo<MobileNavItemProps>(
  ({ item, isActive, isExpanded, onLinkClick, onToggleSubmenu, index, translations }) => {
    const itemClass = `mobile-nav__item${isActive ? " mobile-nav__item--active" : ""}`;
    const resolvedLabel = t(item.label, translations);

    // ── Accordion item (has nested submenu) ───────────────────────────────
    if (item.hasSubmenu) {
      return (
        <div
          className="mobile-nav__item-wrapper"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Toggle button — aria-expanded communicates open/closed state */}
          <button
            type="button"
            onClick={onToggleSubmenu}
            className={itemClass}
            aria-haspopup="true"
            aria-expanded={isExpanded}
            aria-label={`${resolvedLabel}، قائمة فرعية`}
          >
            <span>{resolvedLabel}</span>

            {/* Animated chevron — rotates when the submenu opens.
              aria-hidden keeps it invisible to screen readers since
              aria-expanded already communicates the state.         */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`mobile-nav__arrow${isExpanded ? " mobile-nav__arrow--rotated" : ""}`}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Collapsible submenu region — role="region" + aria-label make it
            discoverable as a landmark by screen reader users            */}
          <div
            className={`mobile-nav__submenu${isExpanded ? " mobile-nav__submenu--active" : ""}`}
            role="region"
            aria-label={`قائمة ${resolvedLabel} الفرعية`}
          >
            {item.submenuColumns?.map((column, colIndex) => (
              <div
                key={column.title || colIndex}
                className="mobile-nav__submenu-column"
              >
                {/* Column heading */}
                <div className="mobile-nav__submenu-title">{t(column.title, translations)}</div>

                {/* Submenu links — use href as key for stability */}
                {column.items.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    onClick={() => onLinkClick(item.id)}
                    className="mobile-nav__subitem"
                  >
                    <Image
                      src={subItem.icon}
                      alt={`أيقونة ${t(subItem.label, translations)}`}
                      width={20}
                      height={20}
                    />
                    <span>{t(subItem.label, translations)}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ── Regular navigation link ────────────────────────────────────────────
    return (
      <div
        className="mobile-nav__item-wrapper"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <Link
          href={item.href || "#"}
          onClick={() => onLinkClick(item.id)}
          className={itemClass}
        >
          <span>{resolvedLabel}</span>
        </Link>
      </div>
    );
  },
);

MobileNavItem.displayName = "MobileNavItem";

// =============================================
// MOBILE NAV (DRAWER)
// =============================================
/**
 * Off-canvas navigation drawer for mobile viewports.
 *
 * Accessibility features:
 * — role="dialog" + aria-modal — screen readers treat it as a modal overlay
 *   and restrict virtual cursor to its contents while open
 * — aria-hidden={!isOpen} — hides the panel from the accessibility tree
 *   when it is not visible
 * — Escape key closes the drawer
 * — Body scroll is locked while the drawer is open to prevent background
 *   content from being scrollable behind the overlay
 */
export default function MobileNav({
  isOpen,
  onClose,
  activeLink,
  onLinkClick,
  onTranslateClick,
  translations,
}: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // ── Lock body scroll while the drawer is open ─────────────────────────
  useEffect(() => {
    const overflow = isOpen ? "hidden" : "";
    document.body.style.overflow = overflow;
    document.documentElement.style.overflow = overflow;
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // ── Close drawer when user presses the Escape key ────────────────────
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Close the drawer and propagate the selected link id to the parent
  const handleLinkClick = useCallback(
    (linkId: string) => {
      onLinkClick(linkId);
      onClose();
    },
    [onLinkClick, onClose],
  );

  // Toggle an accordion item — collapse if already open
  const toggleSubmenu = useCallback((itemId: string) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId));
  }, []);

  return (
    <>
      {/* ── Semi-transparent backdrop — tapping it closes the drawer ─── */}
      <div
        className={`mobile-nav-backdrop${isOpen ? " mobile-nav-backdrop--active" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Off-canvas drawer ─────────────────────────────────────────── */}
      <div
        id="mobile-nav"
        className={`mobile-nav${isOpen ? " mobile-nav--active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
        aria-hidden={!isOpen}
      >
        {/* Header row: logo on one side, close button on the other */}
        <div className="mobile-nav__header">
          <Link
            href="/"
            className="mobile-nav__logo"
            onClick={() => handleLinkClick("home")}
            aria-label="الصفحة الرئيسة - همزة"
          >
            {/* priority preloads the logo since it appears immediately
                when the drawer opens                                   */}
            <Image
              src="/assets/image/Hamza_Logo.png"
              alt="شعار همزة"
              width={100}
              height={34}
              priority
            />
          </Link>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="mobile-nav__close"
            aria-label="إغلاق القائمة"
          >
            {/* SVG X icon — aria-hidden since the button label describes it */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable content area ──────────────────────────────────── */}
        <div className="mobile-nav__content">
          {/* Main navigation items */}
          <nav className="mobile-nav__main" aria-label="قائمة الصفحات">
            {MENU_DATA.map((item, index) => (
              <MobileNavItem
                key={item.id}
                item={item}
                isActive={activeLink === item.id}
                isExpanded={expandedItem === item.id}
                onLinkClick={handleLinkClick}
                onToggleSubmenu={() => toggleSubmenu(item.id)}
                index={index}
                translations={translations}
              />
            ))}
          </nav>

          {/* Bottom action buttons: sign-in, language toggle, etc. */}
          <div className="mobile-nav__actions">
            <div className="flex justify-between">
              {ACTION_ITEMS.map((action) =>
                action.label ? (
                  action.id === "sign-in" ? (
                    <Link
                      key={action.id}
                      href="/sign-in"
                      className="dga-btn dga-btn--lg dga-btn--subtle"
                      onClick={onClose}
                      aria-label="تسجيل الدخول"
                    >
                      <Image
                        src={action.icon}
                        alt="أيقونة المستخدم"
                        width={20}
                        height={20}
                      />
                      <span>{action.label}</span>
                    </Link>
                  ) : (
                    <Link
                      key={action.id}
                      href={action.href}
                      className="dga-btn dga-btn--lg dga-btn--subtle"
                      onClick={onClose}
                    >
                      <Image
                        src={action.icon}
                        alt="أيقونة الإجراء"
                        width={20}
                        height={20}
                      />
                      <span>{action.label}</span>
                    </Link>
                  )
                ) : null,
              )}

              {/* Language / direction toggle (Arabic ↔ English) */}
              <button
                type="button"
                className="dga-btn dga-btn--lg dga-btn--subtle"
                onClick={() => {
                  onClose();
                  const html = document.documentElement;
                  const isArabic = html.lang === "ar";
                  // Set the lang cookie and reload to apply changes consistently
                  document.cookie = `lang=${isArabic ? "en-US" : "ar-SA"}; path=/;`;
                  if (typeof window !== "undefined") {
                    window.location.reload();
                  }
                }}
                aria-label="تبديل اللغة"
              >
                <Image
                  src="/assets/icons/stroke-standard/translation-stroke-rounded.svg"
                  alt="أيقونة تغيير اللغة"
                  width={20}
                  height={20}
                />
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
