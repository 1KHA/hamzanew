"use client";

import Button from "@/app/components/button/Button";
import styles from "../tests.module.css";

interface ModalShellProps {
  id?: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
  bodyClassName?: string;
  closeAriaLabel?: string;
}

export default function ModalShell({
  id,
  title,
  subtitle,
  onClose,
  children,
  footer,
  className = "",
  size = "default",
  bodyClassName = "",
  closeAriaLabel = "Close",
}: ModalShellProps) {
  return (
    <div
      id={id}
      className={`${styles.modalOverlay} ${className}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`${styles.modalMain} ${
          size === "narrow"
            ? styles.modalMainNarrow
            : size === "wide"
            ? styles.modalMainWide
            : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.modalHeader}>
          <div className={styles.modalTitleWrap}>
            <h2 id="modal-title" className={styles.modalTitle}>
              {title}
            </h2>
            {subtitle && (
              <p className={styles.modalSubtitle}>{subtitle}</p>
            )}
          </div>
          <div className={styles.modalClose}>
            <Button
              iconOnly
              icon="cancel-01"
              ariaLabel={closeAriaLabel}
              variant="close"
              size="md"
              onClick={onClose}
            />
          </div>
        </header>

        <div
          className={`${styles.modalBody} ${bodyClassName}`}
        >
          {children}
        </div>

        {footer && <div className={styles.modalFooter}>{footer}</div>}
      </div>
    </div>
  );
}
