"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DigitalSignature from "../digital-signature/DigitalSignature";
import MenuItem from "./MenuItem";
import MobileNav from "./MobileNav";
import { MENU_DATA, ACTION_ITEMS } from "./menuData";
import "./NavHeader.css";

// Icon Component
const IconImage = ({ src, alt = "" }: { src: string; alt?: string }) => (
  <img src={src} alt={alt} width={24} height={24} className="inline-block" />
);

// Custom Hook for Sticky Header
const useStickyHeader = (headerRef: React.RefObject<HTMLDivElement>) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const offsetTop = headerRef.current.offsetTop;
        setIsSticky(window.scrollY > offsetTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerRef]);

  return isSticky;
};

// Custom Hook for Horizontal Scroll
const useHorizontalScroll = (menuRef: React.RefObject<HTMLUListElement>) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (menuRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = menuRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const menu = menuRef.current;
    if (menu) {
      checkScroll();
      menu.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      
      return () => {
        menu.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [menuRef]);

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return { canScrollLeft, canScrollRight, scrollLeft, scrollRight };
};

// Main Component
function NavHeader() {
  const [activeLink, setActiveLink] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const menuScrollRef = useRef<HTMLUListElement>(null);

  const isSticky = useStickyHeader(headerRef);
  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useHorizontalScroll(menuScrollRef);

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenSubmenus([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus((prev) => (prev.includes(id) ? [] : [id]));
    setActiveLink(id);
  };

  const handleLinkClick = (linkId: string) => {
    setActiveLink(linkId);
    setOpenSubmenus([]);
  };

  return (
    <>
      <DigitalSignature />

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeLink={activeLink}
        onLinkClick={handleLinkClick}
      />

      <div
        ref={headerRef}
        className={`header header--divider ${isSticky ? "header--sticky-active" : ""}`}
      >
        <nav className="header-nav--full custom-container" ref={navRef}>
          <div className="header-nav__main">
            {/* Menu Button */}
            <div className="header-menu__btn">
              <button
                type="button"
                className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                aria-label="Menu"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="dga-btn-icon" aria-hidden="true">
                  <IconImage
                    src="/assets/icons/stroke-standard/menu-01-stroke-rounded.svg"
                    alt="Menu"
                  />
                </span>
              </button>
            </div>

            {/* Logo */}
            <div className="header-nav__branding">
              <Link href="/" className="header__logo">
                <img width={120} src="/assets/image/Hamza_Logo.png" alt="Logo" />
              </Link>
            </div>

            {/* Main Menu with Horizontal Scroll */}
            <div className="header-nav__menu-wrapper">
              {/* Left Scroll Button */}
              {canScrollLeft && (
                <button
                  onClick={scrollLeft}
                  className="scroll-button scroll-button--left"
                  aria-label="Scroll left"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
              )}

              <ul className="header-nav__menu" ref={menuScrollRef}>
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
              </ul>

              {/* Right Scroll Button */}
              {canScrollRight && (
                <button
                  onClick={scrollRight}
                  className="scroll-button scroll-button--right"
                  aria-label="Scroll right"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="header-nav__actions">
            <div className="header-menu__btn">
              <button
                type="button"
                className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                aria-label="More actions"
              >
                <span className="dga-btn-icon">
                  <i
                    className="hgi-solid hgi-rounded hgi-more-horizontal-circle-01"
                    style={{ fontSize: "24px" }}
                  />
                </span>
              </button>
            </div>

            <ul className="header-nav__actions">
              {ACTION_ITEMS.map((action, index) => (
                <li key={index} className={action.className}>
                  <Link href={action.href} className="header-menu__item">
                    {action.label && (
                      <span className="header-menu__item-label">{action.label}</span>
                    )}
                    <span className="header-menu__item-arrow">
                      <IconImage src={action.icon} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavHeader;