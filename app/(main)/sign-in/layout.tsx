import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
