"use client";
import dynamic from "next/dynamic";

const Feedback = dynamic(() => import("./Feedback"), { ssr: false });

export default function FeedbackDynamic() {
  return <Feedback />;
}
