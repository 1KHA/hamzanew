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

/**
 * Metadata for the Hamza Organization page.
 */
export const metadata: Metadata = {
  title: "الشكاوى والمقترحات",
  description:""
};
export default function FeedbackAndSuggestionPage() {
  return <FeedbackFormClient />;
}
