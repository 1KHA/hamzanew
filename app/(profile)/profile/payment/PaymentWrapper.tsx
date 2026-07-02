"use client";

import { useState } from "react";
import PaymentForm from "./PaymentForm";
import CardPaymentForm from "./CardPaymentForm";
import PaymentPageClient from "./PaymentPageClient";
import type { TranslationDict } from "@/app/_lib/booking-types";

interface PaymentWrapperProps {
  translations: TranslationDict;
}

export default function PaymentWrapper({ translations }: PaymentWrapperProps) {
  const [isFormLoading] = useState(true);

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <PaymentPageClient
            translations={translations}
            isFormLoading={isFormLoading}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="payment-form-wrapper">
            <CardPaymentForm translations={translations} />
            <PaymentForm translations={translations} />
          </div>
        </div>
      </div>
    </>
  );
}
