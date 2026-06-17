"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DigitalSignature from "../digital-signature/DigitalSignature";
import MenuItem from "./MenuItem";
import MobileNav from "./MobileNav";
import NavigationSubmenu from "./NavigationSubmenu";
import { MENU_DATA, ACTION_ITEMS } from "./menuData";
import "./NavHeader.css";
import { useSession, signOut } from "next-auth/react";
import { t } from "@/app/_lib/translationContext";
import { st } from "@/app/_lib/static-text";

// =============================================
// ICON COMPONENT
// =============================================
// Thin wrapper around next/image for uniform inline icon sizing.
// next/image automatically handles lazy-loading, WebP conversion,
// and correct srcset generation for retina screens.
const IconImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={24}
    height={24}
    style={{ width: 24, height: 24, flexShrink: 0 }}
    className={`block${className ? ` ${className}` : ""}`}
  />
);

// =============================================
// ACTIVE PATH RESOLVER  (pure — module-level)
// =============================================
// Defined outside the component so it is never re-created on renders.
// Returns the MENU_DATA item id that best matches the current pathname.
const resolveActiveId = (currentPath: string): string => {
  if (currentPath === "/") return "home";

  for (const item of MENU_DATA) {
    // Check each submenu column for a matching href
    if (item.submenuColumns) {
      const matched = item.submenuColumns.some((col) =>
        col.items.some(
          (sub) => sub.href !== "#" && currentPath.startsWith(sub.href),
        ),
      );
      if (matched) return item.id;
    }

    // Fall back to matching the top-level item href
    if (
      item.href &&
      item.href !== "#" &&
      item.href !== "/" &&
      currentPath.startsWith(item.href)
    ) {
      return item.id;
    }
  }

  return "";
};

// =============================================
// HORIZONTAL SCROLL HOOK
// =============================================
// Uses IntersectionObserver on invisible sentinel elements placed at
// the start and end of the scrollable list to detect overflow on
// either side without polling or resize events.
// RTL-aware: scrollBy direction is flipped for right-to-left layouts.
const useHorizontalScroll = (
  menuRef: React.RefObject<HTMLUListElement | null>,
) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const startSentinel = menu.querySelector(".scroll-sentinel-start");
    const endSentinel = menu.querySelector(".scroll-sentinel-end");
    if (!startSentinel || !endSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains("scroll-sentinel-start")) {
            setCanScrollLeft(!entry.isIntersecting);
          }
          if (entry.target.classList.contains("scroll-sentinel-end")) {
            setCanScrollRight(!entry.isIntersecting);
          }
        });
      },
      { root: menu, threshold: 0.1 },
    );

    observer.observe(startSentinel);
    observer.observe(endSentinel);

    return () => observer.disconnect();
  }, [menuRef]);

  // Scroll one viewport-width to the left (RTL-aware)
  const scrollLeft = useCallback(() => {
    if (!menuRef.current) return;
    const isRTL = document.documentElement.dir !== "ltr";
    menuRef.current.scrollBy({
      left: isRTL ? menuRef.current.clientWidth : -menuRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [menuRef]);

  // Scroll one viewport-width to the right (RTL-aware)
  const scrollRight = useCallback(() => {
    if (!menuRef.current) return;
    const isRTL = document.documentElement.dir !== "ltr";
    menuRef.current.scrollBy({
      left: isRTL ? -menuRef.current.clientWidth : menuRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [menuRef]);

  return { canScrollLeft, canScrollRight, scrollLeft, scrollRight };
};

// =============================================
// USER MENU DROPDOWN
// =============================================
function UserMenuDropdown({ name, locale }: { name: string; locale?: "ar" | "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  };

  return (
    <div className="user-menu" ref={ref} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className="header-menu__item user-menu__trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={st("navActions", "userMenu", locale)}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className="header-menu__item-label">{name}</span>
        <IconImage
          src="/assets/icons/stroke-standard/user-03-stroke-standard.svg"
          alt={st("navActions", "userIcon", locale)}
        />
      </button>

      {isOpen && (
        <div className="user-menu__dropdown" role="menu">
          <Link
            href="/profile"
            className="user-menu__item"
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            <IconImage
              src="/assets/icons/stroke-standard/user-03-stroke-standard.svg"
              alt=""
            />
            {st("navActions", "profile", locale)}
          </Link>
          <hr className="user-menu__divider" />
          <button
            type="button"
            className="user-menu__item user-menu__item--danger"
            role="menuitem"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <IconImage
              className="icon-critical"
              src="/assets/icons/stroke-standard/logout-01-stroke-rounded.svg"
              alt=""
            />
            {st("navActions", "signOut", locale)}
          </button>
        </div>
      )}
    </div>
  );
}

// =============================================
// MAIN COMPONENT
// =============================================
interface NavHeaderProps {
  translations?: Record<string, string> | null;
  locale?: "ar" | "en";
}

function NavHeader({ translations, locale }: NavHeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  // Tracks which top-level nav item is visually highlighted
  const [activeLink, setActiveLink] = useState<string>(() =>
    resolveActiveId(pathname),
  );

  // Mobile off-canvas drawer visibility.
  // Also used as the mount gate for MobileNav — the component only enters
  // the DOM on first open, keeping it out of the initial JS parse cost.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileNavMounted, setMobileNavMounted] = useState(false);

  // Only one submenu can be open at a time — stored as an array
  // to make the API compatible with multi-submenu if needed later
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  // Wraps both the header bar and the submenu so that outside-clicks
  // can close the submenu without needing a separate overlay
  const navRef = useRef<HTMLDivElement>(null);

  // Ref passed to the scrollable <ul> inside the horizontal menu
  const menuScrollRef = useRef<HTMLUListElement>(null);

  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useHorizontalScroll(menuScrollRef);

  // Memoised class string for the sticky wrapper — avoids string
  // concatenation on every render
  const stickyClass = useMemo(
    () =>
      `nav-sticky-wrapper${isMenuOpen ? " nav-sticky-wrapper--hidden" : ""}`,
    [isMenuOpen],
  );

  // Memoised class string for the scroll-fade wrapper
  const menuWrapperClass = useMemo(
    () =>
      [
        "header-nav__menu-wrapper",
        canScrollLeft && "has-scroll-left",
        canScrollRight && "has-scroll-right",
      ]
        .filter(Boolean)
        .join(" "),
    [canScrollLeft, canScrollRight],
  );

  // Memoised active submenu data — avoids re-searching MENU_DATA
  // on every render; only recalculates when openSubmenus changes
  const activeSubmenu = useMemo(
    () => MENU_DATA.find((i) => openSubmenus.includes(i.id)),
    [openSubmenus],
  );

  // ── Sync active link with URL on every client-side navigation ────────
  useEffect(() => {
    setActiveLink(resolveActiveId(pathname));
  }, [pathname]);

  // ── Close open submenus when user clicks outside the nav region ───────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenSubmenus([]);
        setActiveLink(resolveActiveId(pathname));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pathname]);

  // Open/close a submenu — only one can be open at a time
  const toggleSubmenu = useCallback(
    (id: string) => {
      const isOpening = !openSubmenus.includes(id);
      setOpenSubmenus(isOpening ? [id] : []);
      setActiveLink(isOpening ? id : resolveActiveId(pathname));
    },
    [openSubmenus, pathname],
  );

  // Mark a top-level item as active and close any open submenu
  const handleLinkClick = useCallback((id: string) => {
    setActiveLink(id);
    setOpenSubmenus([]);
  }, []);

  // Toggle the document language + text direction (Arabic ↔ English)
  const handleTranslate = useCallback(() => {
    const html = document.documentElement;
    const isArabic = html.lang === "ar";
    // Set the lang cookie and reload to apply changes consistently
    document.cookie = `lang=${isArabic ? "en-US" : "ar-SA"}; path=/;`;
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  return (
    <>
      {/* ── Digital signature banner displayed above the main header ─── */}
      <DigitalSignature locale={locale} />

      {/* ── Off-canvas mobile navigation drawer ─────────────────────── */}
      {/* Only mounted after the first open — keeps MobileNav out of the
          initial parse/hydration cost entirely. */}
      {mobileNavMounted && (
        <MobileNav
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          activeLink={activeLink}
          onLinkClick={handleLinkClick}
          onTranslateClick={handleTranslate}
        />
      )}

      {/* ── Sticky container — header + submenu scroll together ────────
           position:sticky keeps both elements pinned while avoiding
           a double z-index stacking context issue               ──── */}
      <div ref={navRef} className={stickyClass}>
        {/* ─── Main header bar ──────────────────────────────────────── */}
        <header className="header header--divider">
          <nav
            className="header-nav--full custom-container"
            aria-label={st("navActions", "mainNav", locale)}
          >
            <div className="header-nav__main">
              {/* Mobile hamburger button — visible only on small screens */}
              <div className="header-menu__btn">
                <button
                  type="button"
                  className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                  aria-label={st("navActions", "openMenu", locale)}
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-nav"
                  onClick={() => { setMobileNavMounted(true); setIsMenuOpen(true); }}
                >
                  <IconImage
                    src="/assets/icons/stroke-standard/menu-01-stroke-rounded.svg"
                    alt={st("navActions", "menuIcon", locale)}
                  />
                </button>
              </div>

              {/* Site logo — always links to the home page.
                  priority tells next/image to preload this image as it is
                  above the fold and critical for LCP.              */}
              <div className="header-nav__branding">
                <Link
                  href="/"
                  className="header__logo"
                  aria-label={st("navActions", "homeLink", locale)}
                >
                  <Image
                    src="/assets/image/Hamza_Logo.png"
                    alt={st("navActions", "hamzaLogo", locale)}
                    width={120}
                    height={40}
                    priority
                    fetchPriority="high"
                  />
                </Link>
              </div>

              {/* Search icon — hidden per request. */}
              <ul className="header-nav__mobile-actions" role="list">
              </ul>

              {/* Desktop navigation list with horizontal-scroll support.
                  Fade indicators (has-scroll-left / has-scroll-right) are
                  handled via CSS on the wrapper class.               */}
              <div className={menuWrapperClass}>
                {/* Left scroll button — shown when overflowing or screen ≤ 1265px */}
                {canScrollLeft && (
                  <button
                    type="button"
                    className="dga-btn dga-btn--md dga-btn--secondary-outline scroll-button scroll-button--left"
                    style={{ height: "80%" }}
                    onClick={scrollLeft}
                    aria-label={st("navActions", "scrollLeft", locale)}
                  >
                    ‹
                  </button>
                )}

                {/* Navigation items list */}
                <ul
                  className="header-nav__menu"
                  ref={menuScrollRef}
                  role="list"
                >
                  {/* Sentinel at the start — observed by IntersectionObserver */}
                  <li className="scroll-sentinel-start" aria-hidden="true" />

                  {MENU_DATA.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isActive={activeLink === item.id}
                      isSubmenuOpen={openSubmenus.includes(item.id)}
                      onToggleSubmenu={() => toggleSubmenu(item.id)}
                      onLinkClick={() => handleLinkClick(item.id)}
                      translations={translations}
                    />
                  ))}

                  {/* Sentinel at the end — observed by IntersectionObserver */}
                  <li className="scroll-sentinel-end" aria-hidden="true" />
                </ul>

                {/* Right scroll button — shown when overflowing or screen ≤ 1265px */}
                {canScrollRight && (
                  <button
                    type="button"
                    className="dga-btn dga-btn--md dga-btn--secondary-outline scroll-button scroll-button--right"
                    style={{ height: "80%" }}
                    onClick={scrollRight}
                    aria-label={st("navActions", "scrollRight", locale)}
                  >
                    ›
                  </button>
                )}
              </div>
            </div>

            {/* ─── Action buttons (sign-in, search, …) ─────────────── */}
            <ul className="header-nav__actions" role="list">
              {ACTION_ITEMS.map((action) => {
                if (action.id === "sign-in") {
                  return (
                    <li key={action.id} className={action.className}>
                      {session ? (
                        <UserMenuDropdown
                          name={session.user?.name || st("navActions", "myAccount", locale)}
                          locale={locale}
                        />
                      ) : (
                        <Link
                          href="/sign-in"
                          className="header-menu__item"
                          aria-label={st("navActions", "signIn", locale)}
                        >
                          {action.label && (
                            <span className="header-menu__item-label">
                              {st("navActions", action.label, locale)}
                            </span>
                          )}
                          <IconImage src={action.icon} alt={st("navActions", "userIcon", locale)} />
                        </Link>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={action.id} className={action.className}>
                    <Link
                      href={action.href}
                      className="header-menu__item"
                      aria-label={st("navActions", action.label || "searchAria", locale)}
                    >
                      {action.label && (
                        <span className="header-menu__item-label">
                          {st("navActions", action.label, locale)}
                        </span>
                      )}
                      <IconImage src={action.icon} alt={st("navActions", "actionIcon", locale)} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>

        {/* ─── Animated dropdown submenu ────────────────────────────── */}
        <NavigationSubmenu
          isOpen={!!activeSubmenu?.submenuColumns}
          columns={activeSubmenu?.submenuColumns}
          onLinkClick={() => activeSubmenu && handleLinkClick(activeSubmenu.id)}
          translations={translations}
        />
      </div>
    </>
  );
}

export default NavHeader;
