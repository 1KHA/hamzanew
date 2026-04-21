"use client";

import React, { useState, useMemo } from "react";
import Button from "../button/Button";
import "./NotificationToast.css";

/* ==========================================================================
   Types
   ========================================================================== */

type ToastType = "error" | "warning" | "success" | "info" | "neutral";

export interface ToastButton {
  id?: string;
  label: string;
  href?: string;
  onClick?: () => void;
  extraClasses?: string;
}

export interface NotificationToastProps {
  /** Visual type — controls stripe color and icon */
  type?: ToastType;
  /** Bold title text */
  leadText?: string;
  /** Description text below the title */
  helperText?: string;
  /** Controls visibility (slide-in for fixed, render for inline) */
  open?: boolean;
  /** Show close (dismiss) button */
  closeButton?: boolean;
  /** List of action buttons */
  buttonsList?: ToastButton[];
  /** Shorthand: single action link label */
  actionLabel?: string;
  /** Shorthand: single action link href */
  actionHref?: string;
  /** Vertical position for fixed toasts */
  vPosition?: "top" | "bottom";
  /** Horizontal position for fixed toasts */
  hPosition?: "left" | "right";
  /** Render in page flow instead of fixed overlay */
  inline?: boolean;
  /** Visual style — shadow (elevated) or stroke (bordered) */
  variant?: "shadow" | "stroke";
  /** Callback when toast is dismissed */
  onClose?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/* ==========================================================================
   Constants
   ========================================================================== */

const ICON_MAP: Record<ToastType, string> = {
  success:
    "/assets/icons/stroke-standard/checkmark-circle-02-stroke-rounded.svg",
  info: "/assets/icons/stroke-standard/information-circle-stroke-rounded.svg",
  neutral:
    "/assets/icons/stroke-standard/information-circle-stroke-rounded.svg",
  warning: "/assets/icons/stroke-standard/alert-02-stroke-rounded.svg",
  error: "/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg",
};

const ICON_FILTER_MAP: Record<ToastType, string> = {
  success: "notification-icon-img--success",
  info: "notification-icon-img--info",
  neutral: "notification-icon-img--neutral",
  warning: "notification-icon-img--warning",
  error: "notification-icon-img--critical",
};

const ARIA_TYPE_LABEL: Record<ToastType, string> = {
  success: "إشعار نجاح",
  info: "إشعار معلومات",
  neutral: "إشعار",
  warning: "إشعار تحذير",
  error: "إشعار خطأ",
};

/* ==========================================================================
   Component
   ========================================================================== */

const NotificationToast: React.FC<NotificationToastProps> = ({
  type = "neutral",
  leadText,
  helperText,
  open = true,
  closeButton = false,
  buttonsList = [],
  actionLabel,
  actionHref,
  vPosition = "top",
  hPosition = "right",
  inline = false,
  variant = "shadow",
  onClose,
  className = "",
}) => {
  const [dismissed, setDismissed] = useState(false);

  const isVisible = open && !dismissed;

  const handleClose = () => {
    setDismissed(true);
    onClose?.();
  };

  const rootClass = useMemo(
    () =>
      [
        "notification-toast",
        `notification-toast--${type}`,
        variant === "stroke" ? "notification-toast--stroke" : "",
        inline
          ? "notification-toast--inline"
          : `notification-toast--v-${vPosition} notification-toast--h-${hPosition}`,
        !inline && isVisible ? "notification-toast--active" : "",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [type, variant, inline, vPosition, hPosition, isVisible, className]
  );

  /* Inline toasts unmount when dismissed */
  if (dismissed && inline) return null;

  /* Determine if we have any action content */
  const hasActions = buttonsList.length > 0;
  const hasActionLink = Boolean(actionLabel && actionHref);

  /* Use role="alert" only for fixed (overlay) toasts — inline toasts are static content */
  const roleProps = inline
    ? { role: "region" as const, "aria-label": ARIA_TYPE_LABEL[type] }
    : { role: "alert" as const };

  /* Hide fixed toasts from screen readers when not visible */
  const hiddenProps = !inline && !isVisible ? { "aria-hidden": true as const } : {};

  return (
    <div className={rootClass} {...roleProps} {...hiddenProps}>
      {/* Header: icon + text + close */}
      <div
        className={`notification-toast__header${!helperText ? " dga-flex-center-y" : ""}`}
      >
        {/* Type icon */}
        <div className="notification-toast__icon" aria-hidden="true">
          <img
            src={ICON_MAP[type]}
            alt=""
            width={20}
            height={20}
            className={ICON_FILTER_MAP[type]}
          />
        </div>

        {/* Body */}
        <div className="notification-toast__body">
          {leadText && (
            <p className="notification-toast__title text-md-semibold">
              {leadText}
            </p>
          )}
          {helperText && (
            <p className="notification-toast__content text-sm-regular">
              {helperText}
            </p>
          )}
        </div>

        {/* Close button */}
        {closeButton && (
          <div className="notification-toast__close-btn">
            <button
              type="button"
              className="dga-btn dga-btn--close dga-btn--icon dga-btn--md"
              onClick={handleClose}
              aria-label="إغلاق الإشعار"
            >
              <span className="dga-btn-icon">
                <img
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  src="/assets/icons/stroke-standard/cancel-01-stroke-rounded.svg"
                />
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Action link shorthand — desktop */}
      {hasActionLink && (
        <div className="notification-toast__action" role="group" aria-label="إجراءات">
          <a
            href={actionHref}
            className="dga-btn dga-btn--secondary dga-btn--md notification-toast__action-link"
          >
            <span>{actionLabel}</span>
            <img
              src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg"
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
            />
          </a>
        </div>
      )}

      {/* Action link shorthand — mobile */}
      {hasActionLink && (
        <div className="notification-toast__action-mobile" role="group" aria-label="إجراءات">
          <a
            href={actionHref}
            className="dga-btn dga-btn--secondary dga-btn--lg notification-toast__action-link"
          >
            <span>{actionLabel}</span>
            <img
              src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg"
              alt=""
              aria-hidden="true"
              width={16}
              height={16}
            />
          </a>
        </div>
      )}

      {/* Action buttons list */}
      {hasActions && (
        <>
          {/* Desktop */}
          <div className="notification-toast__action" role="group" aria-label="إجراءات">
            {buttonsList.map((btn, i) =>
              btn.href ? (
                <a
                  key={btn.id ?? `action-${i}`}
                  href={btn.href}
                  className={`dga-btn dga-btn--secondary dga-btn--md notification-toast__action-link ${btn.extraClasses || ""}`}
                >
                  <span>{btn.label}</span>
                  <img
                    src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg"
                    alt=""
                    aria-hidden="true"
                    width={16}
                    height={16}
                  />
                </a>
              ) : (
                <Button
                  key={btn.id ?? `action-${i}`}
                  label={btn.label}
                  variant="secondary"
                  size="md"
                  onClick={btn.onClick}
                  className={btn.extraClasses}
                  icon="arrow-up-right-01"
                />
              )
            )}
          </div>

          {/* Mobile */}
          <div className="notification-toast__action-mobile" role="group" aria-label="إجراءات">
            {buttonsList.map((btn, i) =>
              btn.href ? (
                <a
                  key={btn.id ?? `action-m-${i}`}
                  href={btn.href}
                  className={`dga-btn dga-btn--secondary dga-btn--lg notification-toast__action-link ${btn.extraClasses || ""}`}
                >
                  <span>{btn.label}</span>
                  <img
                    src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg"
                    alt=""
                    aria-hidden="true"
                    width={16}
                    height={16}
                  />
                </a>
              ) : (
                <Button
                  key={btn.id ?? `action-m-${i}`}
                  label={btn.label}
                  variant="secondary"
                  size="lg"
                  onClick={btn.onClick}
                  className={btn.extraClasses}
                  icon="arrow-up-right-01"
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationToast;
