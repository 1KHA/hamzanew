"use client";

import Image from "next/image";
import { useRef } from "react";
import { t } from "@/app/_lib/translationContext";
import type { TestBooking, TranslationDict } from "@/app/_lib/booking-types";

interface TestDetailsProps {
  onHandleCloseModal: () => void;
  translations: TranslationDict;
  selectedBooking: TestBooking | null;
}

// Format date for display (DD Month YYYY)
function formatDateForDetails(dateString: string | undefined | null) {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return "";
  }
}

// Format time for display (HH:MM - HH:MM)
function formatTimeForDetails(
  startTime: { key?: string } | string | undefined | null,
  endTime: { key?: string } | string | undefined | null
) {
  if (!startTime || !endTime) return "00:00 - 00:00";
  try {
    // Parse 24-hour format: "0430" = 04:30
    const formatTime = (timeKey: string | undefined) => {
      const timeString = String(timeKey || "0000").padStart(4, "0");
      const hour = timeString.substring(0, 2);
      const minute = timeString.substring(2, 4);
      return `${hour}:${minute}`;
    };

    const startFormatted = formatTime(
      typeof startTime === "object" ? startTime.key : startTime
    );
    const endFormatted = formatTime(
      typeof endTime === "object" ? endTime.key : endTime
    );
    return `${startFormatted} - ${endFormatted}`;
  } catch {
    return "00:00 - 00:00";
  }
}

// Copy to clipboard function
function copyToClipboard(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Copied to clipboard:", text);
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
    });
}

export default function TestDetails({
  onHandleCloseModal,
  translations,
  selectedBooking,
}: TestDetailsProps) {
  const testName = selectedBooking?.typeOfTheTest?.name || "";
  const testDate = formatDateForDetails(selectedBooking?.testDate);
  const testTime = formatTimeForDetails(
    selectedBooking?.startTime,
    selectedBooking?.endTime
  );

  // Get credentials from booking data
  const testAccessLink = selectedBooking?.testLink || "";
  const username = selectedBooking?.testUsername || "";
  const password = selectedBooking?.testPassword || "";

  const modalRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (!modalRef.current) {
      window.print();
      return;
    }

    const printContents = modalRef.current.innerHTML;
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      // Get base URL for absolute paths
      const baseUrl = window.location.origin;

      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>${
              t("hamza-test-details", translations) || "Test Details"
            }</title>
            <link rel="stylesheet" href="${baseUrl}/css/base.css" />
            <link rel="stylesheet" href="${baseUrl}/css/style-arabic.css" />
            <link rel="stylesheet" href="${baseUrl}/css/style-new.css" />
            <style>
              * {
                box-sizing: border-box;
              }
              body {
                margin: 0;
                padding: 20px;
                font-family: "Sakkal Majalla", Arial, sans-serif;
                background: white;
              }
              .modal-overlay {
                background: transparent !important;
                position: static !important;
                width: 100%;
                height: auto;
              }
              .modal-main {
                position: static !important;
                transform: none !important;
                max-width: 100% !important;
                box-shadow: none !important;
                margin: 0 !important;
                padding: 20px !important;
                border-radius: 0 !important;
              }
              .modal-header {
                border-bottom: 2px solid #c9c9c9;
                padding-bottom: 10px;
                margin-bottom: 20px;
              }
              .modal-cls {
                display: none !important;
              }
              .copy-icon {
                display: none !important;
              }
              .modal-btn,
              .cmn-btn-green,
              button {
                display: none !important;
              }
              .test-details-info-section {
                display: flex;
                justify-content: space-between;
                gap: 20px;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e0e0e0;
              }
              .test-details-info-item {
                flex: 1;
              }
              .test-details-label {
                color: #257350;
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
              }
              .test-details-value {
                font-size: 16px;
                color: #707070;
              }
              .test-details-credentials-section {
                background: #f5f5f5;
                border-radius: 8px;
                padding: 25px;
                margin-bottom: 30px;
              }
              .test-details-credential-item {
                margin-bottom: 20px;
              }
              .test-details-credentials-row {
                display: flex;
                gap: 20px;
                margin-top: 20px;
              }
              .test-details-credentials-row .test-details-credential-item {
                flex: 1;
                margin-bottom: 0;
              }
              .test-details-credential-value-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
              }
              .test-details-credential-value {
                width: -webkit-fill-available;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: white;
                padding: 12px 15px;
                border-radius: 6px;
                margin-top: 8px;
              }
              .test-details-credential-value span {
                font-size: 16px;
                color: #484848;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              @media print {
                .test-details-credential-value span {
                  overflow: visible !important;
                  text-overflow: clip !important;
                  white-space: normal !important;
                  word-break: break-all !important;
                }
              }
              .test-details-instructions-section {
                margin-bottom: 20px;
              }
              .test-details-instructions-title {
                font-size: 24px;
                font-weight: 600;
                color: #484848;
                margin-bottom: 20px;
              }
              .test-details-instructions-list {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-wrap: wrap;
                gap: 15px 20px;
              }
              .test-details-instructions-list li {
                display: flex;
                align-items: center;
                gap: 5px;
                flex: 0 0 calc(50% - 10px);
                font-size: 16px;
                color: #707070;
                line-height: 1.6;
              }
              .test-details-instructions-list li img {
                width: 20px;
                height: 20px;
                flex-shrink: 0;
              }
              @media print {
                body {
                  margin: 0;
                  padding: 20px;
                }
                .modal-overlay {
                  background: transparent !important;
                }
              }
            </style>
          </head>
          <body>
            ${printContents}
          </body>
        </html>
      `);
      printWindow.document.close();

      // Wait for stylesheets to load before printing
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          // Close after print dialog is dismissed
          setTimeout(() => {
            printWindow.close();
          }, 100);
        }, 100);
      };

      // Fallback if onload doesn't fire
      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.focus();
          printWindow.print();
          setTimeout(() => {
            if (printWindow && !printWindow.closed) {
              printWindow.close();
            }
          }, 100);
        }
      }, 500);
    } else {
      // Fallback: use browser print
      window.print();
    }
  };

  const handleCopy = (text: string) => {
    copyToClipboard(text);
  };

  return (
    <div id="profile-modal-popup-test-details" className="modal-overlay">
      <div className="modal-main test-details-modal" ref={modalRef}>
        <div className="modal-header">
          <div className="modal-hd">
            <span>{t("hamza-test-details", translations)}</span>
            <p>{testName}</p>
          </div>
          <div className="modal-cls">
            <span onClick={onHandleCloseModal} className="close-modal">
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
          {/* Test Information Section */}
          <div className="test-details-info-section">
            <div className="test-details-info-item">
              <div className="test-details-label">
                {t("hamza-test-name", translations)}
              </div>
              <div className="test-details-value">{testName}</div>
            </div>
            <div className="test-details-info-item">
              <div className="test-details-label">
                {t("hamza-test-date-form", translations)}
              </div>
              <div className="test-details-value">{testDate}</div>
            </div>
            <div className="test-details-info-item">
              <div className="test-details-label">
                {t("hamza-test-time", translations)}
              </div>
              <div className="test-details-value">{testTime}</div>
            </div>
          </div>

          {/* Login Credentials Section */}
          <div className="test-details-credentials-section">
            <div className="test-details-credential-item">
              <div className="test-details-label">
                {t("hamza-test-access-link", translations)}
              </div>
              <div className="test-details-credential-value-container">
                <div className="test-details-credential-value">
                  <span>{testAccessLink}</span>
                </div>
                <div className="copy-icon-container">
                  <Image
                    src="/profile/tests/copy-icon.png"
                    alt="Copy"
                    width={20}
                    height={20}
                    onClick={() => handleCopy(testAccessLink)}
                    className="copy-icon"
                  />
                </div>
              </div>
            </div>

            <div className="test-details-credentials-row">
              <div className="test-details-credential-item">
                <div className="test-details-label">
                  {t("hamza-test-username", translations)}
                </div>
                <div className="test-details-credential-value-container">
                  <div className="test-details-credential-value">
                    <span>{username}</span>
                  </div>
                  <div className="copy-icon-container">
                    <Image
                      src="/profile/tests/copy-icon.png"
                      alt="Copy"
                      width={20}
                      height={20}
                      onClick={() => handleCopy(username)}
                      className="copy-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="test-details-credential-item">
                <div className="test-details-label">
                  {t("hamza-test-password", translations)}
                </div>
                <div className="test-details-credential-value-container">
                  <div className="test-details-credential-value">
                    <span>{password}</span>
                  </div>
                  <div className="copy-icon-container">
                    <Image
                      src="/profile/tests/copy-icon.png"
                      alt="Copy"
                      width={20}
                      height={20}
                      onClick={() => handleCopy(password)}
                      className="copy-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Day Instructions Section */}
          <div className="test-details-instructions-section">
            <div className="test-details-instructions-title">
              {t("hamza-test-day-instructions", translations) ||
                "Test Day Instructions"}
            </div>
            <ul className="test-details-instructions-list">
              <li>
                <Image
                  src="/profile/tests/check-icon.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                {t("hamza-instruction-turn-off-devices", translations)}
              </li>
              <li>
                <Image
                  src="/profile/tests/check-icon.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                {t("hamza-instruction-arrive-early", translations)}
              </li>
              <li>
                <Image
                  src="/profile/tests/check-icon.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                {t("hamza-instruction-leave-belongings", translations)}
              </li>
              <li>
                <Image
                  src="/profile/tests/check-icon.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                {t("hamza-instruction-stay-calm", translations)}
              </li>
              <li>
                <Image
                  src="/profile/tests/check-icon.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                {t("hamza-instruction-light-meal", translations)}
              </li>
              <li>
                <Image
                  src="/profile/tests/check-icon.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                {t("hamza-instruction-follow-rules", translations)}
              </li>
              <li>
                <Image
                  src="/profile/tests/check-icon.png"
                  alt="Check"
                  width={20}
                  height={20}
                />
                {t("hamza-instruction-session-info", translations)}
              </li>
            </ul>
          </div>
        </div>

        <div className="modal-btn text-left">
          <span className="cmn-btn-green" onClick={handlePrint}>
            {t("hamza-print", translations) || "Print"}
          </span>
        </div>
      </div>
    </div>
  );
}
