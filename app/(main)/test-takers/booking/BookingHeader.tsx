"use client";

import { Fragment, useMemo, useState } from "react";
import { t } from "@/app/_lib/translationContext";
import type { TranslationDict } from "@/app/_lib/booking-types";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

interface BookingHeaderProps {
  currentStep?: number;
  translations: TranslationDict;
  testName?: string;
  testName_i18n?: Record<string, string> | null;
}

export default function BookingHeader({
  currentStep = 3,
  translations,
  testName,
  testName_i18n,
}: BookingHeaderProps) {
  const [language] = useState(() => getCookie("lang") || "ar-SA");

  // Compute display test name directly from language and i18n data
  const displayTestName = useMemo(() => {
    if (testName_i18n) {
      const langKey = language === "ar-SA" ? "ar_SA" : "en_US";
      return (
        testName_i18n[langKey] ||
        testName_i18n.en_US ||
        testName_i18n.ar_SA ||
        testName ||
        ""
      );
    }
    return testName || "";
  }, [language, testName_i18n, testName]);

  const steps = [
    { id: 1, label: t("hamza-payment-step", translations) },
    { id: 2, label: t("hamza-data-confirmation-step", translations) },
    { id: 3, label: t("hamza-booking-date-selection-step", translations) },
  ];

  return (
    <div className="hamza-booking-header-wrapper">
      <div className="hamza-booking-header-title">
        <h3 className="hamza-booking-header-title-text">{displayTestName}</h3>
        <p className="hamza-booking-header-title-description">
          {t("hamza-choose-the-appropriate-date-for-your-test", translations)}
        </p>
      </div>
      <div className="hamza-progress-bar">
        {steps.map((step, index) => (
          <Fragment key={step.id}>
            <div className="hamza-progress-step">
              <div
                className={`hamza-step-circle ${
                  step.id <= currentStep ? "hamza-active" : "hamza-inactive"
                }`}
              />
              <span
                className={`hamza-step-label ${
                  step.id === currentStep ? "hamza-active" : "hamza-inactive"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`hamza-step-connector ${
                  step.id < currentStep ? "hamza-active" : "hamza-inactive"
                }`}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
