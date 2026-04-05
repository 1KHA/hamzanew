import type { ReactNode } from "react";

export default function HamzaAcademicTestLayout({
  children,
}: {
  children: ReactNode;
}) {
  // PageHero is handled by parent layout (app/(main)/types-of-tests/layout.tsx)
  // This layout only wraps children without duplicating the hero
  return <>{children}</>;
}