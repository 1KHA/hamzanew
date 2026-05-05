"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SideNav from "../components/side-nav/SideNav";

interface ProfileLayoutClientProps {
  children: ReactNode;
  userName: string;
  userEmail: string;
  userAvatar: string;
}

export default function ProfileLayoutClient({
  children,
  userName,
  userEmail,
  userAvatar,
}: ProfileLayoutClientProps) {
  const pathname = usePathname();

  return (
    <div className="bg-neutral-50 flex flex-row-reverse flex-1">
      {/* Left column — page content */}
      <div className="flex-1 min-w-0 !pt-[68px] lg:!pt-0">
        {children}
      </div>

      {/* Right column — SideNav */}
      <div className="sidenav-layout">
        <SideNav
          activePath={pathname}
          userName={userName}
          userEmail={userEmail}
          userAvatar={userAvatar}
        />
      </div>
    </div>
  );
}
