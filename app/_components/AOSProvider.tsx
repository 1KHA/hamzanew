"use client";

import { ReactNode } from "react";

/**
 * Pass-through wrapper that replaces the old `aos` initializer.
 *
 * The target project uses Framer Motion (`ScrollReveal`) for animations, so
 * this component simply renders its children. It exists only to satisfy imports
 * in components copied from the legacy codebase.
 */
export default function AOSProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
