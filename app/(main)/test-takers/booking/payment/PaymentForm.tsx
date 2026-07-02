"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { t } from "@/app/_lib/translationContext";
import type {
  BookingData,
  TestItem,
  TranslationDict,
  UserProfile,
} from "@/app/_lib/booking-types";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

interface PaymentFormProps {
  translations: TranslationDict;
  onLoadingChange?: (isLoading: boolean) => void;
}

interface FormData {
  fullNameAr: string;
  fullNameEn: string;
  email: string;
  phoneNumber: string;
  phoneCode: string;
  orderNumber: string;
  testType: string;
  testPrice: string;
  testAppointment: string;
  registrationDate: string;
  totalPrice: string;
}

export default function PaymentForm({
  translations,
  onLoadingChange,
}: PaymentFormProps) {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [language] = useState(() => getCookie("lang") || "ar-SA");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalTitle, setErrorModalTitle] = useState("");
  const [errorModalDescription, setErrorModalDescription] = useState("");

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = (await response.json()) as UserProfile & {
            status?: string;
          };
          if (data && data.status !== "FAIL") {
            setUserProfile(data);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setProfileLoaded(true);
      }
    };

    void fetchUserProfile();
  }, []);

  // Read booking data from sessionStorage via lazy initializer
  const bookingData = useState<BookingData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const storedData = sessionStorage.getItem("testBookingData");
      return storedData ? (JSON.parse(storedData) as BookingData) : null;
    } catch {
      return null;
    }
  })[0];

  // Compute form data directly from profile and booking data
  const formData: FormData = useMemo(() => {
    if (!userProfile || !bookingData) {
      return {
        fullNameAr: "",
        fullNameEn: "",
        email: "",
        phoneNumber: "",
        phoneCode: "",
        orderNumber: "",
        testType: "",
        testPrice: "",
        testAppointment: "",
        registrationDate: "",
        totalPrice: "",
      };
    }

    const fullNameAr = `${userProfile.firstName || ""} ${
      userProfile.secondName || ""
    } ${userProfile.lastName || ""}`.trim();
    const fullNameEn = `${userProfile.firstNameInEnglish || ""} ${
      userProfile.secondNameInEnglish || ""
    } ${userProfile.lastNameInEnglish || ""}`.trim();

    const phoneExtension = userProfile.phoneExtension || "";
    const phoneNumber = userProfile.phoneNumber || "";

    const getTestTypeName = () => {
      const i18n = bookingData.testTypeName_i18n;
      if (i18n) {
        const langKey = language === "ar-SA" ? "ar_SA" : "en_US";
        return (
          i18n[langKey as keyof typeof i18n] ||
          i18n.en_US ||
          i18n.ar_SA ||
          bookingData.testTypeName ||
          ""
        );
      }
      return bookingData.testTypeName || "";
    };

    const formatTestAppointment = () => {
      if (!bookingData.selectedDate || !bookingData.selectedTimeSlot) {
        return "";
      }

      try {
        const date = new Date(bookingData.selectedDate);
        const [startTime, endTime] = bookingData.selectedTimeSlot.split("-");

        const formatTime = (timeKey: string) => {
          const timeString = String(timeKey || "0000").padStart(4, "0");
          const hour = timeString.substring(0, 2);
          const minute = timeString.substring(2, 4);
          return `${hour}:${minute}`;
        };
        const timeDisplay = `${formatTime(startTime)} - ${formatTime(endTime)}`;

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (language === "ar-SA") {
          return `${timeDisplay} - ${day}.${month}.${year}`;
        } else {
          return `${timeDisplay} - ${month}.${day}.${year}`;
        }
      } catch {
        return "";
      }
    };

    const formatRegistrationDate = () => {
      try {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (language === "ar-SA") {
          return `${day}.${month}.${year}`;
        } else {
          return `${month}.${day}.${year}`;
        }
      } catch {
        return "";
      }
    };

    const orderNumber = bookingData.testId
      ? String(bookingData.testId).padStart(6, "0")
      : "000000";

    return {
      fullNameAr,
      fullNameEn,
      email: userProfile.emailId || "",
      phoneNumber,
      phoneCode: phoneExtension,
      orderNumber,
      testType: getTestTypeName(),
      testPrice: "0",
      testAppointment: formatTestAppointment(),
      registrationDate: formatRegistrationDate(),
      totalPrice: "0",
    };
  }, [userProfile, bookingData, language]);

  const isLoading = !profileLoaded || !userProfile || !bookingData;

  // Notify parent about loading state so the step header can be shown/hidden
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookingData || !bookingData.testId) {
      console.error("No testId found in booking data");
      return;
    }

    setIsSubmitting(true);

    try {
      const testId = String(bookingData.testId);

      const testDetailsResponse = await fetch(`/api/tests?testId=${testId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!testDetailsResponse.ok) {
        console.error("Error fetching test details");
        setIsSubmitting(false);
        return;
      }

      const testDetailsData = (await testDetailsResponse.json()) as {
        items?: TestItem[];
      } & Record<string, unknown>;
      console.log("Test details fetched:", testDetailsData);

      if (!testDetailsData.items || testDetailsData.items.length === 0) {
        console.error("No test details found");
        setIsSubmitting(false);
        return;
      }

      const testItem = testDetailsData.items[0];

      const testStatus = testItem.testStatus?.key;
      if (testStatus !== "Available") {
        console.error("Test is not available. Status:", testStatus);
        setIsSubmitting(false);
        setErrorModalTitle(
          t("hamza-test-not-available-title", translations) ||
            "Test is not available"
        );
        setErrorModalDescription(
          t("hamza-test-not-available-description", translations) ||
            "Test is not available"
        );
        setShowErrorModal(true);
        return;
      }

      const capacity = testItem.capacity;
      console.log("capacity:", capacity);

      const formattedTestId = String(bookingData.testId).padStart(6, "0");

      const bookingsResponse = await fetch(
        `/api/test-bookings?testId=${formattedTestId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!bookingsResponse.ok) {
        const errorData = (await bookingsResponse
          .json()
          .catch(() => ({}))) as Record<string, unknown>;
        console.error("Error fetching test bookings:", errorData);
        setIsSubmitting(false);
        return;
      }

      const bookingsData = (await bookingsResponse.json()) as {
        totalCount?: number;
      } & Record<string, unknown>;
      console.log("Test bookings fetched:", bookingsData);

      const totalExistingBookings = bookingsData.totalCount || 0;
      console.log("totalExistingBookings:", totalExistingBookings);

      if (totalExistingBookings >= Number(capacity)) {
        console.error("Capacity is full");
        setIsSubmitting(false);
        setErrorModalTitle(
          t("hamza-capacity-is-full-title", translations) || "Capacity is full"
        );
        setErrorModalDescription(
          t("hamza-capacity-is-full-description", translations) ||
            "Capacity is full"
        );
        setShowErrorModal(true);
        return;
      }

      console.log("Capacity is available, proceeding with booking");

      const today = new Date();
      const registrationDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      const bookingRequestBody = {
        emailId: userProfile?.emailId || "",
        r_testRelationship_c_testId: Number(bookingData.testId),
        r_testCenterRelationship_c_testCenterId: bookingData.testCenterId
          ? Number(bookingData.testCenterId)
          : undefined,
        testDate: bookingData.testDate || undefined,
        startTime: bookingData.startTime || undefined,
        endTime: bookingData.endTime || undefined,
        registrationDate,
        testBookingStatus: {
          key: "Scheduled",
        },
      };

      console.log("Creating booking with body:", bookingRequestBody);

      const createBookingResponse = await fetch("/api/test-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingRequestBody),
      });

      if (!createBookingResponse.ok) {
        const errorText = await createBookingResponse
          .text()
          .catch(() => "Unable to read error response");
        console.error(
          "Error creating test booking:",
          createBookingResponse.status,
          errorText
        );
        setErrorModalTitle(
          t("hamza-booking-error-title", translations) ||
            "Failed to create booking"
        );
        setErrorModalDescription(
          t("hamza-booking-error-description", translations) ||
            "An error occurred while creating your booking. Please try again."
        );
        setShowErrorModal(true);
        setIsSubmitting(false);
        return;
      }

      const createdBookingData = await createBookingResponse.json();
      console.log("Test booking created:", createdBookingData);

      setIsSubmitting(false);
      router.push("/profile/tests");
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    router.push("/test-takers/booking/payment-data");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    router.push("/test-takers/test-centers");
  };

  // Show loader while data is loading
  if (isLoading) {
    return (
      <div
        className="loader-container"
        style={{
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {showErrorModal && (
        <div id="error-modal" className="modal-overlay">
          <div className="modal-main">
            <div className="modal-header">
              <div className="modal-hd">
                <span>{errorModalTitle}</span>
              </div>
              <div className="modal-cls">
                <span className="close-modal" onClick={handleCloseErrorModal}>
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
                <p>{errorModalDescription}</p>
              </div>
            </div>
            <div className="modal-btn text-left">
              <button
                type="button"
                onClick={handleCloseErrorModal}
                className="cmn-btn-green"
              >
                {t("hamza-book-another-test-form", translations) || "Okay"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isSubmitting && (
        <div
          className="loader-container"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            borderRadius: "15px",
          }}
        >
          <div className="loader"></div>
        </div>
      )}
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="payment-form-grid">
          {/* Row 1 */}
          <div className="payment-form-field">
            <label className="payment-form-label">
              {t("hamza-profile-full-name-in-arabic-and-english", translations)}
            </label>
            <div className="payment-form-spacer"></div>
            <input
              type="text"
              name="fullNameAr"
              value={formData.fullNameAr}
              onChange={() => {}}
              className="payment-form-input"
              readOnly
            />
            <input
              type="text"
              name="fullNameEn"
              value={formData.fullNameEn}
              onChange={() => {}}
              className="payment-form-input"
              readOnly
            />
          </div>

          <div className="payment-form-field">
            <label className="payment-form-label">
              {t("hamza-email-id-form", translations)}
            </label>
            <div className="payment-form-spacer" />
            <input
              type="email"
              name="email"
              value=""
              className="payment-form-input"
              readOnly
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={() => {}}
              className="payment-form-input"
              readOnly
            />
          </div>

          <div className="payment-form-field">
            <label className="payment-form-label">
              {t("hamza-phone-number-form", translations)}
            </label>
            <div className="payment-form-spacer" />
            <div className="payment-form-phone-wrapper">
              <input
                type="email"
                name="email"
                value=""
                className="payment-form-input"
                readOnly
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={() => {}}
                  className="payment-form-phone-code"
                  disabled
                >
                  <option value="+966">+966</option>
                  <option value="+971">+971</option>
                  <option value="+965">+965</option>
                  <option value="+974">+974</option>
                </select>

                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={() => {}}
                  className="payment-form-phone-input"
                  placeholder="0000000000"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="payment-form-field">
            <label className="payment-form-label">
              {t("hamza-booking-number-form", translations)}
            </label>
            <input
              type="text"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={() => {}}
              className="payment-form-input"
              readOnly
            />
          </div>

          <div className="payment-form-field">
            <label className="payment-form-label">
              {t("hamza-home-page-map-test-type-title-form", translations)}
            </label>
            <input
              type="text"
              name="testType"
              value={formData.testType}
              onChange={() => {}}
              className="payment-form-input"
              readOnly
            />
          </div>

          <div className="payment-form-field">
            <label className="payment-form-label">
              {t("hamza-price-test-form", translations)}
            </label>
            <div className="payment-form-currency-wrapper">
              <span className="payment-form-currency">SAR</span>
              <input
                type="text"
                value="0"
                className="payment-form-input payment-form-currency-input"
                readOnly
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="payment-form-field">
            <label className="payment-form-label">
              {t("hamza-test-date-form", translations)}
            </label>
            <input
              type="text"
              name="testAppointment"
              value={formData.testAppointment}
              onChange={() => {}}
              className="payment-form-input"
              placeholder="00:00 - 00.00.00000."
              readOnly
            />
          </div>

          <div className="payment-form-field">
            <label className="payment-form-label">
              {t("hamza-registration-date-form", translations)}
            </label>
            <input
              type="text"
              name="registrationDate"
              value={formData.registrationDate}
              onChange={() => {}}
              className="payment-form-input"
              placeholder="00.00.0000"
              readOnly
            />
          </div>

          <div className="payment-form-field">
            <label className="payment-form-label">
              <span style={{ fontSize: "0.85em", fontWeight: "normal" }}>
                {t("hamza-including-vat-total-form", translations) ||
                  t("hamza-total-price-form", translations)}
              </span>{" "}
              {t("hamza-total-price-form", translations)}
            </label>
            <div className="payment-form-currency-wrapper">
              <span className="payment-form-currency">
                {t("hamza-sar", translations)}
              </span>
              <input
                type="text"
                value="0"
                className="payment-form-input payment-form-currency-input"
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="payment-form-buttons">
          <button
            type="submit"
            className="payment-form-btn payment-form-btn-confirm"
            disabled={isSubmitting}
          >
            {t("hamza-confirm", translations)}
          </button>
          <button
            type="button"
            onClick={handlePrevious}
            className="payment-form-btn payment-form-btn-previous"
          >
            {t("hamza-previous", translations)}
          </button>
        </div>
      </form>
    </div>
  );
}
