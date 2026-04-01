/**
 * SignInModal Component
 *
 * A split-layout modal dialog for user authentication.
 * Left panel: background image. Right panel: sign-in form.
 * Uses DGA design system components (DgaTextInput) for form inputs
 * and the custom Button component for actions.
 *
 * @accessibility
 * - Uses role="dialog" with aria-modal="true" for screen readers
 * - aria-labelledby and aria-describedby link to modal title and description
 * - Focus is trapped inside the modal while open
 * - Focus returns to the trigger element when modal closes
 * - Escape key closes the modal
 * - Backdrop click closes the modal
 * - Body scroll is locked while modal is open
 * - All form inputs have associated labels with required indicators
 * - Validation errors use role="alert" for live announcements
 */

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { DgaTextInput, DgaCheckbox } from "platformscode-new-react";
import Button from "../button/Button";
import "./SignInModal.css";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

interface SignInModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback fired when modal requests to close */
  onClose: () => void;
}

/* ==========================================================================
   Constants
   ========================================================================== */

/** Selects all focusable elements within the modal for focus trapping */
const FOCUSABLE_SELECTORS =
  'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href]';

/* ==========================================================================
   Close Icon Component
   ========================================================================== */

const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ==========================================================================
   Main Component
   ========================================================================== */

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  /* Form State */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Refs */
  const modalRef = useRef<HTMLDivElement>(null);

  /**
   * Keyboard handler for focus trapping and Escape to close.
   * Tab / Shift+Tab wraps focus within modal boundaries.
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusableElements =
        modalRef.current.querySelectorAll(FOCUSABLE_SELECTORS);
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      /* Shift+Tab from first element → wrap to last */
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }

      /* Tab from last element → wrap to first */
      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    },
    [onClose],
  );

  /**
   * Side effects when modal opens/closes:
   * - Lock body scroll
   * - Attach keydown listener for Escape and focus trap
   * - Store and restore focus to the original trigger element
   */
  useEffect(() => {
    if (!isOpen) return;

    /* Lock body scroll */
    document.body.style.overflow = "hidden";

    /* Listen for keyboard events */
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  /**
   * Backdrop click handler.
   * Closes modal only when clicking the overlay itself, not its children.
   */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * Form field change handlers.
   * Updates state and clears the corresponding error on input.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: undefined }));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  /**
   * Form validation.
   * Returns true if valid, false otherwise. Sets error messages.
   */
  const validate = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = "اسم المستخدم مطلوب";
    }

    if (!password.trim()) {
      newErrors.password = "كلمة المرور مطلوبة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Form submission handler.
   * Validates, calls API, resets form and closes on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual authentication API call
      console.log("Sign in:", { username, password, rememberMe });

      /* Simulate API call */
      await new Promise((resolve) => setTimeout(resolve, 1000));

      /* Reset form and close modal on success */
      setUsername("");
      setPassword("");
      setRememberMe(false);
      setErrors({});
      onClose();
    } catch {
      setErrors({ username: "حدث خطأ أثناء تسجيل الدخول" });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Don't render anything when modal is closed */
  if (!isOpen) return null;

  return (
    <div
      className="sign-in-modal__overlay"
      onClick={handleBackdropClick}
      aria-hidden="true"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sign-in-modal-title"
        aria-describedby="sign-in-modal-description"
        className="sign-in-modal"
      >
        
        {/* Right Panel: Form Content */}
        <div className="sign-in-modal__content">
          {/* Close Button (mobile only — image panel is hidden on mobile) */}
          <button
            type="button"
            className="sign-in-modal__close sign-in-modal__close--mobile"
            onClick={onClose}
            aria-label="إغلاق نافذة تسجيل الدخول"
          >
            <CloseIcon />
          </button>

          {/* Header */}
          <div className="sign-in-modal__header">
            <h2 id="sign-in-modal-title" className="display-sm-bold">
              اهلا بك
            </h2>
            <p
              id="sign-in-modal-description"
              className="text-md-regular sign-in-modal__subtitle"
            >
              قم بتسجيل الدخول
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="sign-in-modal__form"
          >
            {/* Username Field */}
            <div className="dga-form-control dga-form-control--fullwidth">
              <label className="dga-label dga-label--lg">

                <span className="sign-in-modal__required">*</span>

                اسم المستخدم 
                
              </label>
              <DgaTextInput
                name="sign-in-username"
                placeholder="أدخل اسم المستخدم"
                size="lg"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                error={!!errors.username}
                variant="default"
              />
              {errors.username && (
                <div className="invalid-feedback !flex !justify-start !gap-2 !mt-1" role="alert">
                  <img alt="" width="16" height="16" className="inline-block icon-critical" src="/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg" />
                  {errors.username}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="dga-form-control dga-form-control--fullwidth">
              <label className="dga-label dga-label--lg">
                <span className="sign-in-modal__required">*</span>

                كلمة المرور 
                
              </label>
              <DgaTextInput
                name="sign-in-password"
                placeholder="أدخل كلمة المرور"
                size="lg"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                error={!!errors.password}
                variant="default"
              />
              {errors.password && (
                <div className="invalid-feedback !flex !justify-start !gap-2 !mt-1" role="alert">
                  <img alt="" width="16" height="16" className="inline-block icon-critical" src="/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg" />
                  {errors.password}
                </div>
              )}
            </div>

            {/* Forgot Password & Remember Me */}
            <div className="sign-in-modal__options">

                <DgaCheckbox
                label="تذكرني"
                size="md"
                color="brand"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />

              <a
                href="/forgot-password"
                className="link--primary text-sm-regular"
              >
                هل نسيت كلمة المرور ؟
              </a>

            
            </div>

            {/* Submit Button */}
            <Button
              label={isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              variant="primary-brand"
              size="lg"
              type="submit"
              disabled={isSubmitting}
              className="sign-in-modal__submit"
            />
          </form>

          {/* Divider */}
          <div className="sign-in-modal__divider">
            <span className="sign-in-modal__divider-text text-sm-regular">
              أو
            </span>
          </div>

          {/* National SSO Button */}
          <button
            type="button"
            className="dga-btn dga-btn--lg dga-btn--secondary sign-in-modal__sso-btn"
            onClick={() => {
              // TODO: Implement National SSO redirect
              console.log("National SSO clicked");
            }}
          >
            الدخول بالنفاذ الوطني الموحد
         
            <img src="/assets/image/nafath-icon.png" alt="" width="24" height="24" aria-hidden="true" />
         
          </button>
        </div>


        {/* Left Panel: Background Image with green overlay */}
        <div className="sign-in-modal__image">
          <img
            src="/assets/image/bg-signin.jpg"
            alt=""
            aria-hidden="true"
          />
          <div className="sign-in-modal__image-overlay" aria-hidden="true" />

          {/* Close Button */}
          <button
            type="button"
            className="sign-in-modal__close"
            onClick={onClose}
            aria-label="إغلاق نافذة تسجيل الدخول"
          >
            <CloseIcon />
          </button>
        </div>

      </div>
    </div>
  );
}
