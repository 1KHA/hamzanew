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
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        {children}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}
