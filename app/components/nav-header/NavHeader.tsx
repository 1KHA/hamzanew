"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DigitalSignature from "../digital-signature/DigitalSignature";
import MenuItem from "./MenuItem";
import MobileNav from "./MobileNav";
import NavigationSubmenu from "./NavigationSubmenu";
import { MENU_DATA, ACTION_ITEMS } from "./menuData";
import "./NavHeader.css";

// Icon Component
const IconImage = ({ src, alt = "" }: { src: string; alt?: string }) => (
  <img src={src} alt={alt} width={24} height={24} className="inline-block" />
);

// Horizontal scroll hook
const useHorizontalScroll = (menuRef: React.RefObject<HTMLUListElement | null>) => {
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
      { root: menu, threshold: 0.1 }
    );

    observer.observe(startSentinel);
    observer.observe(endSentinel);

    return () => observer.disconnect();
  }, [menuRef]);

  const scrollLeft = () => {
    if (!menuRef.current) return;
    const isRTL = document.documentElement.dir !== "ltr";
    menuRef.current.scrollBy({
      left: isRTL ? menuRef.current.clientWidth : -menuRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!menuRef.current) return;
    const isRTL = document.documentElement.dir !== "ltr";
    menuRef.current.scrollBy({
      left: isRTL ? -menuRef.current.clientWidth : menuRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return { canScrollLeft, canScrollRight, scrollLeft, scrollRight };
};

// =========================
// MAIN COMPONENT
// =========================
function NavHeader() {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const navRef = useRef<HTMLDivElement>(null);
  const menuScrollRef = useRef<HTMLUListElement>(null);

  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } =
    useHorizontalScroll(menuScrollRef);

  // Close submenu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenSubmenus([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => (prev.includes(id) ? [] : [id]));
    setActiveLink(id);
  };

  const handleLinkClick = (id: string) => {
    setActiveLink(id);
    setOpenSubmenus([]);
  };

  return (
    <>
      <DigitalSignature />

      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
      />

   

      {/* STICKY WRAPPER for header and submenu */}
      <div
        ref={navRef}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 9999,
          display: isMenuOpen ? 'none' : 'block'
        }}
        className="nav-sticky-wrapper"
      >
        {/* HEADER */}
        <header className="header header--divider">
          <nav className="header-nav--full custom-container">
            <div className="header-nav__main">
              {/* Menu button */}
              <div className="header-menu__btn">
                <button
                  className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                  aria-label="Menu"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <IconImage src="/assets/icons/stroke-standard/menu-01-stroke-rounded.svg" />
                </button>
              </div>

              {/* Logo */}
              <div className="header-nav__branding">
                <Link href="/" className="header__logo">
                  <img width={120} src="/assets/image/Hamza_Logo.png" alt="Logo" />
                </Link>
              </div>

              {/* Menu */}
              <div
                className={`header-nav__menu-wrapper ${
                  canScrollLeft ? "has-scroll-left" : ""
                } ${canScrollRight ? "has-scroll-right" : ""}`}
              >
                {canScrollLeft && (
                  <button
                    className="dga-btn dga-btn--md dga-btn--secondary-outline scroll-button scroll-button--left"
                    style={{height:"80%"}}
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                  >
                    ‹
                  </button>
                )}

                <ul className="header-nav__menu" ref={menuScrollRef}>
                  <li className="scroll-sentinel-start" />
                  {MENU_DATA.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      isActive={activeLink === item.id}
                      isSubmenuOpen={openSubmenus.includes(item.id)}
                      onToggleSubmenu={() => toggleSubmenu(item.id)}
                      onLinkClick={() => handleLinkClick(item.id)}
                    />
                  ))}
                  <li className="scroll-sentinel-end" />
                </ul>

                {canScrollRight && (
                  <button
                    className="dga-btn dga-btn--md dga-btn--secondary-outline scroll-button scroll-button--right"
                    style={{height:"80%"}}
                    onClick={scrollRight}
                    aria-label="Scroll right"
                  >
                    ›
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <ul className="header-nav__actions">
              {ACTION_ITEMS.map((action, i) => (
                <li key={i} className={action.className}>
                  <Link href={action.href} className="header-menu__item">
                    {action.label && (
                      <span className="header-menu__item-label">
                        {action.label}
                      </span>
                    )}
                    <IconImage src={action.icon} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Submenu */}
        {openSubmenus.length > 0 && (() => {
          const active = MENU_DATA.find((i) =>
            openSubmenus.includes(i.id)
          );
          return active?.submenuColumns ? (
            <NavigationSubmenu
              isOpen
              columns={active.submenuColumns}
              onLinkClick={() => handleLinkClick(active.id)}
            />
          ) : null;
        })()}
      </div>
    </>
  );
}

export default NavHeader;
