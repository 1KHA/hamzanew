"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/app/components/button/Button";
import { IRoute } from "@/app/components/drawer";
import "@/app/components/drawer/Drawer.css";
import "./SideNav.css";

// ─── Routes ───────────────────────────────────────────────────────────────────

const PROFILE_ROUTES: IRoute[] = [
  { name: "الرئيسة",             path: "/",                        icon: "home-01",        divider: true },
  { name: "الملف الشخصي",        path: "/profile",                 icon: "user-02",        divider: true },
  { name: "تغيير كلمة المرور",   path: "/profile/change-password", icon: "square-lock-02", divider: true },
  { name: "الاختبارات",          path: "/profile/tests",           icon: "book-open-01",   divider: true },
  { name: "الشهادات",            path: "/profile/certificates",    icon: "certificate-01", divider: true },
  { name: "الفواتير",            path: "/profile/invoices",        icon: "invoice-03",     divider: true },
  { name: "التنبيهات",           path: "/profile/notifications",   icon: "notification-01"               },
];

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

  return (
    <>
      {/* Mobile header bar — visible only on mobile */}
      <div className="sidenav__mobile-header">
        <header className="header header--divider">
          <nav className="header-nav--full custom-container" aria-label="قائمة الملف الشخصي">
            <div className="header-nav__main">
              <div className="header-menu__btn">
                <button
                  type="button"
                  className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                  aria-label="فتح القائمة الجانبية"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(true)}
                >
                  <Image
                    src="/assets/icons/stroke-standard/menu-01-stroke-rounded.svg"
                    alt="أيقونة القائمة"
                    width={24}
                    height={24}
                    className="inline-block"
                  />
                </button>
              </div>
              <div className="header-nav__branding">
                <Link href="/" className="header__logo" aria-label="الصفحة الرئيسة - همزة">
                  <Image
                    src="/assets/image/Hamza_Logo.png"
                    alt="شعار همزة"
                    width={120}
                    height={40}
                    priority
                  />
                </Link>
              </div>
              <button
                type="button"
                className="dga-btn dga-btn--md dga-btn--transparent dga-btn--icon"
                aria-label="تبديل اللغة"
                onClick={() => {
                  const html = document.documentElement;
                  const isArabic = html.lang === "ar";
                  html.lang = isArabic ? "en" : "ar";
                  html.dir = isArabic ? "ltr" : "rtl";
                }}
              >
                <Image
                  src="/assets/icons/stroke-standard/translation-stroke-rounded.svg"
                  alt="أيقونة تغيير اللغة"
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
        aria-label="قائمة أقسام الملف الشخصي"
        className={`sidenav sidepanel--bg-brand${isOpen ? " open" : ""}`}
      >
        {/* Close button — mobile only */}
        <button
          className="sidenav__close"
          onClick={() => setIsOpen(false)}
          aria-label="إغلاق القائمة"
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
            alt="شعار المجمع"
            width={132}
          />
        </div>

        {/* Profile card */}
        <div className="sidenav__card">
          <img
            src={userAvatar}
            alt={userName}
            className="sidenav__avatar"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=ffffff&color=14573a&size=80`;
            }}
          />
          <p className="sidenav__name">{userName}</p>
          <p className="sidenav__email">{userEmail}</p>
        </div>

        {/* Navigation */}
        <nav className="sidenav__nav">
          <ul className="sidepanel__menu-list" role="list">
            {PROFILE_ROUTES.map((route) => {
              const isActive = route.path === activePath;
              return (
                <li key={route.path}>
                  <a
                    href={route.path}
                    className={`sidepanel__menu-tab${isActive ? " active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.icon && (
                      <span className="sidepanel__menu-tab-icon" aria-hidden="true">
                        <img
                          src={`/assets/icons/stroke-standard/${route.icon}-stroke-rounded.svg`}
                          alt=""
                          width={18}
                          height={18}
                          className="inline-block white-icon"
                        />
                      </span>
                    )}
                    <span className="sidepanel__menu-tab-label">{route.name}</span>
                  </a>
                  {route.divider && (
                    <span className="sidepanel__menu-tab-divider" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Translate + Logout */}
        <div className="sidenav__logout sidenav__actions-row">
          <Button
            label="تسجيل الخروج"
            icon="logout-04"
            iconPosition="right"
            variant="primary-neutral--on-color"
            size="md"
          />
          <Button
            label="English"
            icon="translation"
            iconPosition="right"
            variant="primary-neutral--on-color"
            size="md"
            className="sidenav__translate"
            onClick={() => {
              const html = document.documentElement;
              const isArabic = html.lang === "ar";
              html.lang = isArabic ? "en" : "ar";
              html.dir = isArabic ? "ltr" : "rtl";
            }}
          />
        </div>
      </aside>
    </>
  );
}
