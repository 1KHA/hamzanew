"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Feedback = dynamic(() => import("./Feedback"), { ssr: false });

export default function FeedbackDynamic() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Feedback />;
}
