import type { ReactNode } from "react";
import { Metadata } from "next";
import "platformscode-new-react/dist/style.css";
import "@/app/components/side-nav/SideNav.css";

/**
 * Metadata configuration for the Profile
 */
export const metadata: Metadata = {
  title: "الملف الشخصي",
};
export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="sidenav-layout">
      {children}
    </div>
  );
}
