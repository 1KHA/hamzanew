import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نسيت كلمة المرور | اختبار همزة",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}