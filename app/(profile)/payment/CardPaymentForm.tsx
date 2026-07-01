"use client";

import { t } from "@/app/_lib/translationContext";
import type { TranslationDict } from "@/app/_lib/booking-types";
import { useState } from "react";
import Image from "next/image";

interface CardPaymentFormProps {
  translations: TranslationDict;
}

interface CardData {
  nameOnCard: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
}

export default function CardPaymentForm({ translations }: CardPaymentFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardData, setCardData] = useState<CardData>({
    nameOnCard: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleCardDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardData((prev) => ({
      ...prev,
      expiryDate: formatted,
    }));
  };

  const paymentMethods = [
    { key: "mastercard", label: "Mastercard", src: "/profile/payment/Mastercard-logo.svg.png" },
    { key: "visa", label: "Visa", src: "/profile/payment/Visa_Inc._logo.svg.png" },
    { key: "google-pay", label: "Google Pay", src: "/profile/payment/gpay-logo.png" },
    { key: "mada", label: "Mada", src: "/profile/payment/mada-pay-logo.png" },
    { key: "apple-pay", label: "Apple Pay", src: "/profile/payment/apple-pay-logo.png" },
  ];

  return (
    <div className="card-payment-wrapper">
      <div className="card-payment-container">
        {/* Payment Method Selection */}
        <div className="payment-methods-section">
          <div className="payment-methods-grid">
            {paymentMethods.map((method) => (
              <div
                key={method.key}
                className={`payment-method-item ${
                  selectedPaymentMethod === method.key ? "selected" : ""
                }`}
              >
                <div className="payment-method-logo">
                  <Image
                    src={method.src}
                    alt={method.label}
                    width={60}
                    height={40}
                    className="payment-method-image"
                  />
                </div>
                <label className="payment-method-radio-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.key}
                    checked={selectedPaymentMethod === method.key}
                    onChange={() => handlePaymentMethodChange(method.key)}
                    className="payment-method-radio"
                    disabled
                  />
                  <span className="payment-method-radio-custom"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Card Details Input */}
        <div className="card-details-section">
          <div className="card-details-grid">
            <div className="card-detail-field">
              <label className="card-detail-label">
                {t("hamza-card-payment-name-form", translations)}
              </label>
              <input
                type="text"
                name="nameOnCard"
                value={cardData.nameOnCard}
                onChange={handleCardDataChange}
                className="card-detail-input"
                placeholder={t(
                  "hamza-card-payment-name-placeholder-form",
                  translations
                )}
                readOnly
              />
            </div>

            <div className="card-detail-field">
              <label className="card-detail-label">
                {t("hamza-card-payment-number-form", translations)}
              </label>
              <input
                type="text"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={handleCardNumberChange}
                className="card-detail-input"
                placeholder={t(
                  "hamza-card-payment-number-placeholder-form",
                  translations
                )}
                maxLength={19}
                readOnly
              />
            </div>

            <div className="card-detail-row">
              <div className="card-detail-field">
                <label className="card-detail-label">
                  {t("hamza-card-payment-cvv-form", translations)}
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleCardDataChange}
                  className="card-detail-input"
                  placeholder="..."
                  maxLength={4}
                  readOnly
                />
              </div>

              <div className="card-detail-field">
                <label className="card-detail-label">
                  {t("hamza-card-payment-expiry-date-form", translations)}
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardData.expiryDate}
                  onChange={handleExpiryDateChange}
                  className="card-detail-input"
                  placeholder="00/00"
                  maxLength={5}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="pricing-summary-section">
          <div className="pricing-item">
            <span className="pricing-label">
              {t("hamza-test-price-form", translations)}
            </span>
            <span className="pricing-value">
              {t("hamza-sar", translations)} 0
            </span>
          </div>
          <div className="pricing-item pricing-total">
            <span className="pricing-label">
              {t("hamza-total-form", translations)}
            </span>
            <div className="pricing-total-wrapper">
              <span className="pricing-vat-text">
                {t("hamza-total-including-vat-form", translations)}
              </span>
              <span className="pricing-value">
                {t("hamza-sar", translations)} 0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
