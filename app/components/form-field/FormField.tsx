/**
 * FormField Component
 *
 * A reusable wrapper component for form inputs that standardizes the layout of labels,
 * input fields, and error messages.
 *
 * @features
 * - Renders a label with an optional "required" asterisk.
 * - Wraps the input child component.
 * - Displays an error message if the `error` prop is provided.
 *
 * @accessibility
 * - **Label Association**: Uses `htmlFor` to programmatically link the label to the input.
 * - **Required State**: The asterisk is purely visual, but the label text includes visually hidden "(required)" text for screen readers (added below).
 * - **Error Messaging**: The error message component should use `role="alert"` (ensure ErrorMessage component handles this).
 *
 * @param {string} label - The visible label text for the field.
 * @param {boolean} [required=false] - Whether the field is mandatory. Displays a red asterisk.
 * @param {string} [error] - Validation error message to display below the field.
 * @param {React.ReactNode} children - The input component (e.g., TextInput, Dropdown).
 * @param {string} [className] - Optional additional CSS classes for the wrapper.
 * @param {string} [htmlFor] - The ID of the input element this label corresponds to.
 */

import React from "react";
import ErrorMessage from "@/app/components/error-message/ErrorMessage";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export default function FormField({
  label,
  required = false,
  error,
  children,
  className = "",
  htmlFor,
}: FormFieldProps) {
  return (
    <div className={`!grid !grid-cols-1 !gap-[16px] ${className}`}>
      <div className="dga-form-control dga-form-control--fullwidth">
        <label htmlFor={htmlFor} className="dga-label dga-label--lg font-bold!">
          {label}
          {required && (
            <>
              <span className="text-red-600 mx-1" aria-hidden="true">
                *
              </span>
              <span className="sr-only">(مطلوب)</span>
            </>
          )}
        </label>

        {children}

        {error && (
          <div aria-live="polite">
            <ErrorMessage message={error} />
          </div>
        )}
      </div>
    </div>
  );
}
