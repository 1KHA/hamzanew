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

import FeedbackForm from "./FeedbackForm";

export default function FeedbackAndSuggestionPage() {
  return <FeedbackForm />;
}
