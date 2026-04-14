"use client";

import dynamic from "next/dynamic";

/**
 * Dynamically import FeedbackForm to avoid SSR issues.
 * FeedbackForm uses platformscode-new-react components that access `window` during initialization.
 */
const FeedbackForm = dynamic(() => import("./FeedbackForm"), { ssr: false });

export default function FeedbackFormClient() {
  return <FeedbackForm />;
}
