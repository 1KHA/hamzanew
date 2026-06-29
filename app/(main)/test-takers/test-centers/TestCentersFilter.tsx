"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type {
  ExamCard,
  DeliveryOption,
  CountryOption,
  TestCentersLabels,
} from "./types";
import styles from "./TestCenters.module.css";

interface TestCentersFilterProps {
  examCards: ExamCard[];
  deliveryOptions: DeliveryOption[];
  labels: TestCentersLabels;
}

export default function TestCentersFilter({
  examCards,
  deliveryOptions,
  labels,
}: TestCentersFilterProps) {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(
    deliveryOptions.find((opt) => opt.defaultChecked)?.id || "LocalCenter"
  );
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTestType, setSelectedTestType] = useState("");

  // Clear any previous booking data when landing on test centers page
  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("testBookingData");
    }
  }, []);

  const cardsByDeliveryOption = useMemo(() => {
    return examCards.filter((card) => {
      if (selectedFilter === "LocalCenter") {
        return (
          card.centerKey === "LocalCenter" ||
          !card.centerKey ||
          card.centerKey === ""
        );
      }
      return card.centerKey === selectedFilter;
    });
  }, [examCards, selectedFilter]);

  const availableCountries = useMemo(() => {
    const countryMap = new Map<string, CountryOption>();
    cardsByDeliveryOption.forEach((card) => {
      if (card.countryKey && card.country && !countryMap.has(card.countryKey)) {
        countryMap.set(card.countryKey, {
          key: card.countryKey,
          name: card.country,
        });
      }
    });
    return Array.from(countryMap.values());
  }, [cardsByDeliveryOption]);

  // Keep selected values only while they are still valid in the current filter
  // context; this avoids synchronous setState-in-effect cascades.
  const effectiveCountry =
    selectedCountry &&
    availableCountries.find((c) => c.key === selectedCountry)
      ? selectedCountry
      : "";

  const cardsByDeliveryAndCountry = useMemo(() => {
    return cardsByDeliveryOption.filter((card) => {
      if (effectiveCountry) {
        return card.countryKey === effectiveCountry;
      }
      return true;
    });
  }, [cardsByDeliveryOption, effectiveCountry]);

  const availableTestTypes = useMemo(() => {
    const testTypeSet = new Set<string>();
    cardsByDeliveryAndCountry.forEach((card) => {
      if (card.typeOfTheTest && card.typeOfTheTest !== "no test available") {
        testTypeSet.add(card.typeOfTheTest);
      }
    });
    return Array.from(testTypeSet).sort();
  }, [cardsByDeliveryAndCountry]);

  const effectiveTestType =
    selectedTestType && availableTestTypes.includes(selectedTestType)
      ? selectedTestType
      : "";

  const filteredCards = cardsByDeliveryAndCountry.filter((card) => {
    if (effectiveTestType) {
      return card.typeOfTheTest === effectiveTestType;
    }
    return true;
  });

  const handleCardClick = (card: ExamCard) => {
    const isClickable =
      card.registationStatus !== "unavailable" && Boolean(card.id);

    if (!isClickable) return;

    const bookingData = {
      testCenterId: card.id,
      testType: card.typeOfTheTest || selectedTestType,
      testTypeKey: card.typeOfTheTestKey || "",
    };

    sessionStorage.setItem("testBookingData", JSON.stringify(bookingData));
    router.push(`/profile/test-booking/${card.id}`);
  };

  return (
    <>
      <div className={styles.filterBar}>
        <div className={styles.filterBarContent}>
          <div className={styles.filterOptions}>
            <div className={styles.selectWrapper}>
              <select
                value={effectiveTestType}
                onChange={(e) => setSelectedTestType(e.target.value)}
                aria-label={labels.testTypePlaceholder}
              >
                <option value="">{labels.testTypePlaceholder}</option>
                {availableTestTypes.map((testType) => (
                  <option key={testType} value={testType}>
                    {testType}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectWrapper}>
              <select
                value={effectiveCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                aria-label={labels.countryPlaceholder}
              >
                <option value="">{labels.countryPlaceholder}</option>
                {availableCountries.map((country) => (
                  <option key={country.key} value={country.key}>
                    {country.name} ({country.key})
                  </option>
                ))}
              </select>
            </div>

            <div
              className={styles.radioGroup}
              role="radiogroup"
              aria-label="Delivery option"
            >
              {deliveryOptions.map((option) => (
                <label key={option.id} className={styles.radioOption}>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value={option.id}
                    checked={selectedFilter === option.id}
                    onChange={() => setSelectedFilter(option.id)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className={styles.noResults}>{labels.noCentersMessage}</div>
      ) : (
        <div className={styles.cardsGrid}>
          {filteredCards.map((card) => {
            const isClickable =
              card.registationStatus !== "unavailable" && Boolean(card.id);

            return (
              <div
                key={card.id}
                className={`${styles.examCard} ${
                  isClickable ? styles.clickable : styles.unavailable
                }`}
                onClick={() => handleCardClick(card)}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                aria-disabled={!isClickable}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleCardClick(card);
                  }
                }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardIconWrapper}>
                    <Image
                      src="/assets/icons/stroke-standard/building-03-stroke-rounded.svg"
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                    />
                    <span className={styles.centerName}>{card.centerName}</span>
                  </div>
                  {card.country ? (
                    <span className={styles.countryBadge}>{card.country}</span>
                  ) : null}
                </div>

                <div className={styles.cardLocation}>
                  <Image
                    src="/assets/icons/stroke-standard/location-01-stroke-rounded.svg"
                    alt=""
                    width={18}
                    height={18}
                    unoptimized
                  />
                  <span>{card.location}</span>
                </div>

                <div className={styles.testType}>
                  {card.typeOfTheTest || labels.noTestAvailable}
                </div>

                {card.level ? (
                  <div className={styles.testLevel}>{card.level}</div>
                ) : null}

                <div className={styles.cardFooter}>
                  {card.date ? (
                    <div className={styles.cardDate}>{card.date}</div>
                  ) : (
                    <div />
                  )}
                  <div className={styles.statusColumn}>
                    <div className={styles.statusLabel}>
                      {labels.registrationStatus}
                    </div>
                    <div
                      className={`${styles.statusValue} ${
                        card.registationStatus === "unavailable"
                          ? styles.unavailable
                          : ""
                      }`}
                    >
                      {card.testStatus
                        ? card.testStatus
                        : card.registationStatus === "available"
                        ? labels.available
                        : labels.unavailable}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
