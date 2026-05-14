"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Button from "@/app/components/button/Button";
import { IRoute } from "@/app/components/drawer";
import { st } from "@/app/_lib/static-text";
import "@/app/components/drawer/Drawer.css";
import "./SideNav.css";

// ─── Routes ───────────────────────────────────────────────────────────────────

function getProfileRoutes(): IRoute[] {
  return [
    { name: st("profile", "navHome"), path: "/", icon: "home-01", divider: true },
    { name: st("profile", "navProfile"), path: "/profile", icon: "user-02", divider: true },
    /* Temporarily hidden
    {
      name: st("profile", "navChangePassword"),
      path: "/profile?view=security",
      icon: "square-lock-02",
      divider: true,
    },
    {
      name: st("profile", "navTests"),
      path: "/profile/tests",
      icon: "book-open-01",
      divider: true,
    },
    {
      name: st("profile", "navCertificates"),
      path: "/profile/certificates",
      icon: "certificate-01",
      divider: true,
    },
    {
      name: st("profile", "navInvoices"),
      path: "/profile/invoices",
      icon: "invoice-03",
      divider: true,
    },
    {
      name: st("profile", "navNotifications"),
      path: "/profile/notifications",
      icon: "notification-01",
    },
    */
  ];
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface SideNavProps {
  activePath?: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SideNav({
  activePath = "/profile",
  userName,
  userEmail,
  userAvatar,
}: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isArabicLang, setIsArabicLang] = useState(true);
  const searchParams = useSearchParams();

  // Detect current language after hydration
  useEffect(() => {
    setIsArabicLang(document.documentElement.lang === "ar");
  }, []);

  const checkIsActive = (routePath: string) => {
    if (routePath === "/") return activePath === "/";

    if (routePath === "/profile?view=security") {
      return activePath === "/profile" && searchParams.get("view") === "security";
    }

    if (routePath === "/profile") {
      const isMainProfile = activePath === "/profile" && searchParams.get("view") !== "security";
      const isProfileUpdate = activePath.startsWith("/profile/update");
      return isMainProfile || isProfileUpdate;
    }

    return (
      activePath === routePath ||
      activePath.startsWith(routePath + "/") ||
      activePath.startsWith(routePath + "?")
    );
  };

  return (
    <>
      {/* Mobile header bar — visible only on mobile */}
      <div className="sidenav__mobile-header">
        <header className="header header--divider">
          <nav
            className="header-nav--full custom-container"
            aria-label={st("profile", "navProfileMenu")}
          >
            <div className="header-nav__main">
              <div className="header-menu__btn">
                <button
                  type="button"
                  className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                  aria-label={st("profile", "navOpenMenu")}
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(true)}
                >
                  <Image
                    src="/assets/icons/stroke-standard/menu-01-stroke-rounded.svg"
                    alt={st("profile", "navMenuIconAlt")}
                    width={24}
                    height={24}
                    className="inline-block"
                  />
                </button>
              </div>
              <div className="header-nav__branding">
                <Link
                  href="/"
                  className="header__logo"
                  aria-label={st("navActions", "homeLink")}
                >
                  <Image
                    src="/assets/image/Hamza_Logo.png"
                    alt={st("navActions", "hamzaLogo")}
                    width={120}
                    height={40}
                    priority
                  />
                </Link>
              </div>
              <button
                type="button"
                className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                aria-label={st("profile", "navToggleLang")}
                onClick={() => {
                  const html = document.documentElement;
                  const isArabic = html.lang === "ar";
                  // Set the lang cookie and reload to apply changes consistently
                  document.cookie = `lang=${isArabic ? "en-US" : "ar-SA"}; path=/;`;
                  if (typeof window !== "undefined") {
                    window.location.reload();
                  }
                }}
              >
                <img
                  src="/assets/icons/stroke-standard/translation-stroke-rounded.svg"
                  alt={st("profile", "navLangIconAlt")}
                  width={24}
                  height={24}
                  className="inline-block"
                />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Backdrop — mobile only */}
      <div
        className={`sidenav__backdrop${isOpen ? " visible" : ""}`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        aria-label={st("profile", "navProfileMenu")}
        className={`sidenav sidepanel--bg-brand${isOpen ? " open" : ""}`}
      >
        {/* Close button — mobile only */}
        <button
          className="sidenav__close"
          onClick={() => setIsOpen(false)}
          aria-label={st("profile", "navCloseMenu")}
        >
          <img
            src="/assets/icons/stroke-standard/cancel-01-stroke-rounded.svg"
            alt=""
            width={20}
            height={20}
            className="white-icon"
          />
        </button>

        {/* Logo */}
        <div className="sidenav__logo">
          <img
            src="/assets/image/footer-logo.svg"
            alt={st("profile", "navLogoAlt")}
            width={132}
          />
        </div>

        {/* Profile card */}
        <div className="sidenav__card">
          {/* TEMPORARILY HIDDEN — profile avatar
          <img
            src={userAvatar}
            alt={userName}
            className="sidenav__avatar"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=ffffff&color=14573a&size=80`;
            }}
          />
          */}
          <p className="sidenav__name">{userName}</p>
          <p className="sidenav__email">{userEmail}</p>
        </div>

        {/* Navigation */}
        <nav className="sidenav__nav">
          <ul className="sidepanel__menu-list" role="list">
            {getProfileRoutes().map((route) => {
              const isActive = checkIsActive(route.path);
              return (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className={`sidepanel__menu-tab${isActive ? " active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.icon && (
                      <span
                        className="sidepanel__menu-tab-icon"
                        aria-hidden="true"
                      >
                        <img
                          src={`/assets/icons/stroke-standard/${route.icon}-stroke-rounded.svg`}
                          alt=""
                          width={18}
                          height={18}
                          className="inline-block white-icon"
                        />
                      </span>
                    )}
                    <span className="sidepanel__menu-tab-label">
                      {route.name}
                    </span>
                  </Link>
                  {route.divider && (
                    <span
                      className="sidepanel__menu-tab-divider"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Translate + Logout */}
        <div className="sidenav__logout sidenav__actions-row">
          <Button
            label={st("profile", "navLogout")}
            icon="logout-04"
            iconPosition="right"
            variant="primary-neutral--on-color"
            size="md"
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
          />
          <Button
            label={isArabicLang ? "English" : "العربية"}
            icon="translation"
            iconPosition="right"
            variant="primary-neutral--on-color"
            size="md"
            className="sidenav__translate"
            onClick={() => {
              const html = document.documentElement;
              const isArabic = html.lang === "ar";
              // Set the lang cookie and reload to apply changes consistently
              document.cookie = `lang=${isArabic ? "en-US" : "ar-SA"}; path=/;`;
              if (typeof window !== "undefined") {
                window.location.reload();
              }
            }}
          />
        </div>
      </aside>
    </>
  );
}
