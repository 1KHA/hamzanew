"use client";

import Button from "@/app/components/button/Button";
import ModalShell from "./ModalShell";
import { t } from "@/app/_lib/translationContext";
import styles from "../tests.module.css";
import type { TranslationDict } from "@/app/_lib/booking-types";

interface ChangeTestConfirmationProps {
  onHandleCloseModal: () => void;
  translations: TranslationDict;
  testTypeName?: string | null;
}

export default function ChangeTestConfirmation({
  onHandleCloseModal,
  translations,
  testTypeName,
}: ChangeTestConfirmationProps) {
  const handleCloseAndRefresh = () => {
    onHandleCloseModal();
    window.location.reload();
  };

  return (
    <ModalShell
      id="profile-modal-popup2"
      title={t("hamza-change-the-test", translations) || "Change the test"}
      subtitle={testTypeName || undefined}
      onClose={handleCloseAndRefresh}
      closeAriaLabel={t("hamza-close", translations) || "Close"}
      size="narrow"
      footer={
        <Button
          label={t("hamza-okay", translations) || "OK"}
          variant="primary-brand"
          size="md"
          onClick={handleCloseAndRefresh}
        />
      }
    >
      <p className={styles.messageText}>
        {t("hamza-change-test-confirmation-message", translations)}
      </p>
    </ModalShell>
  );
}
