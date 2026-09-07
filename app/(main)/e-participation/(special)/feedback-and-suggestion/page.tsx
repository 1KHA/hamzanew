/**
 * Feedback & Suggestion Page (Server Component)
 *
 * This page serves as a container for the feedback form.
 * It is responsible for rendering the `FeedbackForm` Client Component.
 *
 * @component
 * @example
 * return (
 *   <FeedbackAndSuggestionPage />
 * )
 */

import FeedbackFormClient from "./FeedbackFormClient";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

/**
 * Metadata for the Feedback & Suggestions page.
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return {
    title: st("eParticipation", "feedbackTitle", locale),
    description: "",
  };
}

export default function FeedbackAndSuggestionPage() {
  // Feedback & suggestions form hidden temporarily — restore by swapping the
  // return values below. The page keeps its hero + contact sidebar (layout.tsx).
  return null;
  // return <FeedbackFormClient />;
}
