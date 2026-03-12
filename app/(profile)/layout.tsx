import type { ReactNode } from "react";
import { Metadata } from "next";

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
  return <>{children}</>;
}
