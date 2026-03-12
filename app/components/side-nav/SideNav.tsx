"use client";

import Button from "@/app/components/button/Button";
import { IRoute } from "@/app/components/drawer";
import "@/app/components/drawer/Drawer.css";
import "./SideNav.css";

// ─── Routes ───────────────────────────────────────────────────────────────────

const PROFILE_ROUTES: IRoute[] = [
  { name: "الرئيسة", path: "/", icon: "home-01", divider: true },
  { name: "الملف الشخصي", path: "/profile", icon: "user-02", divider: true },
  {
    name: "تغيير كلمة المرور",
    path: "/profile/change-password",
    icon: "square-lock-02",
    divider: true,
  },
  {
    name: "الاختبارات",
    path: "/profile/tests",
    icon: "book-open-01",
    divider: true,
  },
  {
    name: "الشهادات",
    path: "/profile/certificates",
    icon: "certificate-01",
    divider: true,
  },
  {
    name: "الفواتير",
    path: "/profile/invoices",
    icon: "invoice-03",
    divider: true,
  },
  {
    name: "التنبيهات",
    path: "/profile/notifications",
    icon: "notification-01",
  },
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
  return (
    <aside
      aria-label="قائمة أقسام الملف الشخصي"
      className="sidenav sidepanel--bg-brand"
    >
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
                </a>
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

      {/* Logout */}
      <div className="sidenav__logout">
        <Button
          label="تسجيل الخروج"
          icon="logout-04"
          iconPosition="right"
          variant="primary-neutral--on-color"
          size="md"
          className="!w-full"
        />
      </div>
    </aside>
  );
}
