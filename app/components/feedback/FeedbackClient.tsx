"use client";

import dynamic from "next/dynamic";

/**
 * Dynamically import Feedback to avoid SSR issues.
 * Feedback uses platformscode-new-react components that access `window` during initialization.
 */
const Feedback = dynamic(() => import("./Feedback"), { ssr: false });

export default function FeedbackClient() {
  return <Feedback />;
}
