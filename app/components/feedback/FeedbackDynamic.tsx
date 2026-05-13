"use client";
import { usePathname } from "next/navigation";
import Feedback from "./Feedback";

export default function FeedbackDynamic() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Feedback />;
}
