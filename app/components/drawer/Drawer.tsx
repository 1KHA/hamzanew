"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import "./Drawer.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface IRoute {
  name: string;
  path: string;
  /** Icon name — loads /assets/icons/stroke-standard/{icon}-stroke-rounded.svg */
  icon?: string;
  badge?: number;
  disabled?: boolean;
  level?: number;
  divider?: boolean; // render a divider AFTER this item
  externalLink?: boolean;
  children?: IRoute[];
}

// ─── Icon renderer ────────────────────────────────────────────────────────────

function RouteIcon({ name }: { name: string }) {
  return (
    <img
      src={`/assets/icons/stroke-standard/${name}-stroke-rounded.svg`}
      alt=""
      width={18}
      height={18}
      aria-hidden="true"
      className="inline-block white-icon"
    />
  );
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Side the panel slides in from */
  anchor?: "left" | "right";
  /** Panel background colour variant */
  background?: "brand" | "gray";
  /** Apply a translucent overlay style to the panel */
  overlay?: boolean;
  /** Show a border on the panel */
  border?: boolean;
  /** Logo displayed in the panel header */
  headerLogo?: string;
  /** Navigation routes */
  routes?: IRoute[];
  /** Optional label for the panel (for a11y) */
  "aria-label"?: string;
  /** Anything slotted into the bottom of the panel */
  children?: React.ReactNode;
}

// ─── Badge helper ─────────────────────────────────────────────────────────────

function Badge({
  count,
  onColor = false,
}: {
  count: number;
  onColor?: boolean;
}) {
  const label = count >= 100 ? "+99" : String(count);
  return (
    <span
      className={`drawer-badge ${onColor ? "drawer-badge--on-color" : "drawer-badge--gray"}`}
      aria-label={`${count} إشعار`}
    >
      {label}
    </span>
  );
}

// ─── Tab arrow icon ────────────────────────────────────────────────────────────

function ArrowIcon({ expanded }: { expanded: boolean }) {
  return (
    <span
      className="sidepanel__menu-tab-arrow"
      aria-hidden="true"
      style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <i className="hgi-stroke hgi-arrow-down-01" style={{ fontSize: 16 }} />
    </span>
  );
}

// ─── Submenu item (recursive) ─────────────────────────────────────────────────

interface SubmenuItemProps {
  parentPath: string;
  childRoute: IRoute;
  isBrand: boolean;
  onAnyExpand?: (expanded: boolean, height: number) => void;
}

function SubmenuItem({
  parentPath,
  childRoute,
  isBrand,
  onAnyExpand,
}: SubmenuItemProps) {
  const [expanded, setExpanded] = useState(false);
  const submenuRef = useRef<HTMLUListElement>(null);
  const buttonId = useId();
  const listId = useId();

  const fullPath = `${parentPath}${childRoute.path}`;

  const handleExpand = useCallback(
    (next: boolean) => {
      setExpanded(next);
      const el = submenuRef.current;
      if (!el) return;
      if (next) {
        el.style.maxHeight = "fit-content";
      } else {
        el.style.maxHeight = "";
      }
      onAnyExpand?.(next, el.scrollHeight);
    },
    [onAnyExpand],
  );

  const hasChildren =
    childRoute.children && childRoute.children.length > 0;

  if (!hasChildren) {
    return (
      <li>
        {childRoute.externalLink ? (
          <a
            href={fullPath}
            className={`sidepanel__submenu-tab ${childRoute.level && childRoute.level > 1 ? "sidepanel__submenu--sublevel" : ""} ${childRoute.disabled ? "disabled" : ""}`}
            aria-disabled={childRoute.disabled}
            tabIndex={childRoute.disabled ? -1 : 0}
            target="_blank"
            rel="noopener noreferrer"
          >
            {childRoute.icon && (
              <span className="sidepanel__menu-tab-icon">
                <RouteIcon name={childRoute.icon} />
              </span>
            )}
            <span className="sidepanel__menu-tab-label">{childRoute.name}</span>
            {childRoute.badge !== undefined && (
              <Badge count={childRoute.badge} onColor={isBrand} />
            )}
          </a>
        ) : (
          <Link
            href={childRoute.disabled ? "#" : fullPath}
            className={`sidepanel__submenu-tab ${childRoute.level && childRoute.level > 1 ? "sidepanel__submenu--sublevel" : ""} ${childRoute.disabled ? "disabled" : ""}`}
            aria-disabled={childRoute.disabled}
            tabIndex={childRoute.disabled ? -1 : 0}
          >
            {childRoute.icon && (
              <span className="sidepanel__menu-tab-icon">
                <RouteIcon name={childRoute.icon} />
              </span>
            )}
            <span className="sidepanel__menu-tab-label">{childRoute.name}</span>
            {childRoute.badge !== undefined && (
              <Badge count={childRoute.badge} onColor={isBrand} />
            )}
          </Link>
        )}
      </li>
    );
  }

  return (
    <li>
      <button
        id={buttonId}
        type="button"
        className={`sidepanel__submenu-tab ${childRoute.disabled ? "disabled" : ""} ${expanded ? "active" : ""}`}
        aria-expanded={expanded}
        aria-controls={listId}
        aria-disabled={childRoute.disabled}
        disabled={childRoute.disabled}
        onClick={() => handleExpand(!expanded)}
      >
        {childRoute.icon && (
          <span className="sidepanel__menu-tab-icon" aria-hidden="true">
            <i className={childRoute.icon} />
          </span>
        )}
        <span className="sidepanel__menu-tab-label">{childRoute.name}</span>
        <ArrowIcon expanded={expanded} />
      </button>
      <ul
        id={listId}
        ref={submenuRef}
        className="sidepanel__submenu-list"
        role="list"
      >
        {childRoute.children!.map((sub) => (
          <SubmenuItem
            key={sub.path}
            parentPath={fullPath}
            childRoute={sub}
            isBrand={isBrand}
            onAnyExpand={(exp, h) => {
              if (exp && submenuRef.current) {
                submenuRef.current.style.maxHeight = "fit-content";
              }
              onAnyExpand?.(exp, h);
            }}
          />
        ))}
      </ul>
    </li>
  );
}

// ─── Tab item (top-level route) ────────────────────────────────────────────────

interface TabItemProps {
  route: IRoute;
  isBrand: boolean;
}

function TabItem({ route, isBrand }: TabItemProps) {
  const [expanded, setExpanded] = useState(false);
  const submenuRef = useRef<HTMLUListElement>(null);
  const buttonId = useId();
  const listId = useId();

  const hasChildren = route.children && route.children.length > 0;

  const handleExpand = useCallback((next: boolean) => {
    setExpanded(next);
    const el = submenuRef.current;
    if (!el) return;
    el.style.maxHeight = next ? "fit-content" : "";
  }, []);

  const commonClasses = `sidepanel__menu-tab ${route.disabled ? "disabled" : ""} ${expanded ? "active" : ""}`;

  // Parent with children — rendered as a button
  if (hasChildren) {
    return (
      <>
        <button
          id={buttonId}
          type="button"
          className={commonClasses}
          aria-expanded={expanded}
          aria-controls={listId}
          aria-disabled={route.disabled}
          disabled={route.disabled}
          onClick={() => handleExpand(!expanded)}
        >
          {route.icon && (
            <span className="sidepanel__menu-tab-icon">
              <RouteIcon name={route.icon} />
            </span>
          )}
          <span className="sidepanel__menu-tab-label">{route.name}</span>
          <ArrowIcon expanded={expanded} />
          {route.badge !== undefined && (
            <Badge count={route.badge} onColor={isBrand} />
          )}
        </button>
        <ul
          id={listId}
          ref={submenuRef}
          className="sidepanel__submenu-list"
          role="list"
        >
          {route.children!.map((child) => (
            <SubmenuItem
              key={child.path}
              parentPath={route.path}
              childRoute={child}
              isBrand={isBrand}
              onAnyExpand={(exp) => {
                if (exp && submenuRef.current) {
                  submenuRef.current.style.maxHeight = "fit-content";
                }
              }}
            />
          ))}
        </ul>
      </>
    );
  }

  // External link
  if (route.externalLink) {
    return (
      <a
        href={route.path}
        className={commonClasses}
        aria-disabled={route.disabled}
        tabIndex={route.disabled ? -1 : 0}
        target="_blank"
        rel="noopener noreferrer"
      >
        {route.icon && (
          <span className="sidepanel__menu-tab-icon" aria-hidden="true">
            <i className={route.icon} />
          </span>
        )}
        <span className="sidepanel__menu-tab-label">{route.name}</span>
        {route.badge !== undefined && (
          <Badge count={route.badge} onColor={isBrand} />
        )}
      </a>
    );
  }

  // Internal link (child)
  return (
    <Link
      href={route.disabled ? "#" : route.path}
      className={commonClasses}
      aria-disabled={route.disabled}
      tabIndex={route.disabled ? -1 : 0}
    >
      {route.icon && (
        <span className="sidepanel__menu-tab-icon" aria-hidden="true">
          <i className={route.icon} />
        </span>
      )}
      <span className="sidepanel__menu-tab-label">{route.name}</span>
      {route.badge !== undefined && (
        <Badge count={route.badge} onColor={isBrand} />
      )}
    </Link>
  );
}

// ─── Menu list ────────────────────────────────────────────────────────────────

interface DrawerMenuProps {
  routes: IRoute[];
  isBrand: boolean;
}

function DrawerMenu({ routes, isBrand }: DrawerMenuProps) {
  return (
    <nav aria-label="قائمة التنقل">
      <ul className="sidepanel__menu-list" role="list">
        {routes.map((route, i) => (
          <React.Fragment key={route.path ?? i}>
            <li>
              <TabItem route={route} isBrand={isBrand} />
            </li>
            {route.divider && (
              <li aria-hidden="true">
                <span className="sidepanel__menu-tab-divider" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
}

// ─── Close button ─────────────────────────────────────────────────────────────

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      type="button"
      className="drawer-close-btn"
      onClick={onClose}
      aria-label="إغلاق القائمة"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M15 5L5 15M5 5l10 10"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

// ─── Focusable elements query ─────────────────────────────────────────────────

const FOCUSABLE =
  'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ─── Main Drawer component ────────────────────────────────────────────────────

export default function Drawer({
  open,
  onClose,
  anchor = "right",
  background = "brand",
  overlay = false,
  border = false,
  headerLogo,
  routes = [],
  "aria-label": ariaLabel = "القائمة الجانبية",
  children,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const dialogId = useId();
  const isBrand = background === "brand";
  const [mounted, setMounted] = useState(false);

  // Only render portal on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Remember element that triggered open so we can restore focus on close
  useEffect(() => {
    if (open) {
      lastFocusRef.current = document.activeElement as HTMLElement;
      // Move focus into panel after transition starts
      const timer = setTimeout(() => {
        const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
        first?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      lastFocusRef.current?.focus();
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keyboard handling: Escape + focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  const panelClasses = useMemo(
    () =>
      [
        "sidepanel",
        anchor === "right" ? "sidepanel--right" : "sidepanel--left",
        `sidepanel--bg-${background}`,
        overlay ? "sidepanel--overlay" : "",
        border ? "sidepanel--border" : "",
        open ? "active" : "",
      ]
        .filter(Boolean)
        .join(" "),
    [anchor, background, overlay, border, open],
  );

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className={`drawer-backdrop ${open ? "drawer-backdrop--visible" : ""}`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id={dialogId}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={panelClasses}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        {/* Header logo */}
        {headerLogo && (
          <div className="sidepanel__header">
            <Image
              src={headerLogo}
              alt=""
              width={120}
              height={32}
              style={{ height: 32, width: "auto" }}
              priority
            />
            <div className="drawer-close-btn-wrapper">
              <CloseButton onClose={onClose} />
            </div>
          </div>
        )}

        {/* Close button when no logo */}
        {!headerLogo && (
          <div className="drawer-header-bare">
            <CloseButton onClose={onClose} />
          </div>
        )}

        {/* Navigation */}
        {routes.length > 0 && (
          <DrawerMenu routes={routes} isBrand={isBrand} />
        )}

        {/* Slot / children */}
        {children}
      </div>
    </>,
    document.body,
  );
}
