"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MENU_DATA, ACTION_ITEMS } from "./menuData";
import type { MenuItemType } from "./menuData";
import "./MobileNav.css";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeLink: string;
  onLinkClick: (linkId: string) => void;
}

export default function MobileNav({ isOpen, onClose, activeLink, onLinkClick }: MobileNavProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleLinkClick = (linkId: string) => {
    onLinkClick(linkId);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`mobile-nav-backdrop ${isOpen ? "mobile-nav-backdrop--active" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isOpen ? "mobile-nav--active" : ""}`}>
        {/* Header */}
        <div className="mobile-nav__header">
          <Link href="/" className="mobile-nav__logo" onClick={() => handleLinkClick("home")}>
            <img width={100} src="/assets/image/Hamza_Logo.png" alt="Logo" />
          </Link>
          <button
            onClick={onClose}
            className="mobile-nav__close"
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="mobile-nav__content">
          {/* Main Navigation */}
          <nav className="mobile-nav__main">
            {MENU_DATA.map((item, index) => (
              <MobileNavItem
                key={item.id}
                item={item}
                isActive={activeLink === item.id}
                onLinkClick={handleLinkClick}
                index={index}
              />
            ))}
          </nav>

          {/* Actions */}
          <div className="mobile-nav__actions">
            {ACTION_ITEMS.map((action, index) => (
              action.label && (
                <Link
                  key={index}
                  href={action.href}
                  className="mobile-nav__action-btn"
                  onClick={onClose}
                >
                  <img src={action.icon} alt="" width={20} height={20} />
                  <span>{action.label}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Mobile Nav Item Component
interface MobileNavItemProps {
  item: MenuItemType;
  isActive: boolean;
  onLinkClick: (linkId: string) => void;
  index: number;
}

function MobileNavItem({ item, isActive, onLinkClick, index }: MobileNavItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (item.hasSubmenu) {
    return (
      <div className="mobile-nav__item-wrapper" style={{ animationDelay: `${index * 50}ms` }}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`mobile-nav__item ${isActive ? "mobile-nav__item--active" : ""}`}
        >
          <span>{item.label}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`mobile-nav__arrow ${isExpanded ? "mobile-nav__arrow--rotated" : ""}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {/* Submenu */}
        <div className={`mobile-nav__submenu ${isExpanded ? "mobile-nav__submenu--active" : ""}`}>
          {item.submenuColumns?.map((column, colIndex) => (
            <div key={colIndex} className="mobile-nav__submenu-column">
              <div className="mobile-nav__submenu-title">{column.title}</div>
              {column.items.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.href}
                  onClick={() => onLinkClick(item.id)}
                  className="mobile-nav__subitem"
                >
                  <img src={subItem.icon} alt="" width={20} height={20} />
                  <span>{subItem.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-nav__item-wrapper" style={{ animationDelay: `${index * 50}ms` }}>
      <Link
        href={item.href || "#"}
        onClick={() => onLinkClick(item.id)}
        className={`mobile-nav__item ${isActive ? "mobile-nav__item--active" : ""}`}
      >
        <span>{item.label}</span>
      </Link>
    </div>
  );
}
