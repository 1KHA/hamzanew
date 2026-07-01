import Image from "next/image";
import { t } from "@/app/_lib/translationContext";
import type { TranslationDict } from "@/app/_lib/booking-types";

interface CancelTestConfirmationProps {
  onHandleCloseModal: () => void;
  translations: TranslationDict;
  testTypeName?: string | null;
}

export default function CancelTestConfirmation({
  onHandleCloseModal,
  translations,
  testTypeName,
}: CancelTestConfirmationProps) {
  const handleCloseAndRefresh = () => {
    onHandleCloseModal();
    window.location.reload();
  };

  return (
    <div id="profile-modal-popup2" className="modal-overlay">
      <div className="modal-main">
        <div className="modal-header">
          <div className="modal-hd">
            <span>{t("hamza-cancel-the-test", translations)}</span>
            <p>{testTypeName}</p>
          </div>
          <div className="modal-cls">
            <span onClick={handleCloseAndRefresh} className="close-modal">
              <Image
                src="/profile/close-icon.svg"
                alt={t("hamza-close", translations) || "Close"}
                width={20}
                height={20}
              />
            </span>
          </div>
        </div>
        <div className="modal-cnt-area">
          <div className="test-summary-detail">
            <p>{t("hamza-delete-test-confirmation-message", translations)}</p>
          </div>
        </div>
        <div className="modal-btn text-left">
          <span className="cmn-btn-green" onClick={handleCloseAndRefresh}>
            {t("hamza-okay", translations)}
          </span>
        </div>
      </div>
    </div>
  );
}
