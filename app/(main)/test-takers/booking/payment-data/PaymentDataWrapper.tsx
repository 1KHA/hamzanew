"use client";

import { useState } from "react";
import BookingInfoCards from "../BookingInfoCards";
import PaymentDataPageClient from "./PaymentDataPageClient";
import type { TranslationDict } from "@/app/_lib/booking-types";

interface PaymentDataWrapperProps {
  translations: TranslationDict;
}

export default function PaymentDataWrapper({ translations }: PaymentDataWrapperProps) {
  const [isCardsLoading, setIsCardsLoading] = useState(true);

  return (
    <>
      <PaymentDataPageClient
        translations={translations}
        isCardsLoading={isCardsLoading}
      />
      <BookingInfoCards
        onLoadingChange={setIsCardsLoading}
        translations={translations}
      />
    </>
  );
}
