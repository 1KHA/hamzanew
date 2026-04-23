"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SideNav from "../components/side-nav/SideNav";
import mockUserInfo from "./profile/_data/mockUserInfo.json";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-neutral-50 flex flex-row-reverse flex-1">
      {/* Left column — page content (PageHero + section + form/view) */}
      <div className="flex-1 min-w-0 !pt-[68px] lg:!pt-0">
        {children}
      </div>

      {/* Right column — SideNav starts at the very top of the page */}
      <div className="sidenav-layout">
        <SideNav
          activePath={pathname}
          userName={mockUserInfo.firstName_ar + " " + mockUserInfo.lastName_ar}
          userEmail={mockUserInfo.email}
          userAvatar={mockUserInfo.avatar}
        />
      </div>
    </div>
  );
}
