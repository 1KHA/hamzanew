"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import TextInput from "@/app/components/text-input/TextInput";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  activateAccountService,
  resendActivationService,
} from "@/app/_lib/user-service";
import "../sign-in/sign-in.css";

type Step = "activating" | "success" | "error";

const REDIRECT_DELAY_MS = 3000;

function ActivateAccountContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [step, setStep] = useState<Step>("activating");
  const [message, setMessage] = useState("");

  const [resendEmail, setResendEmail] = useState("");
  const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  // Hide footer feedback/last-updated sections (same pattern as sign-in)
  useEffect(() => {
    document.body.classList.add("page-sign-in");
    return () => document.body.classList.remove("page-sign-in");
  }, []);

  // Activate exactly once using the token from the emailed link. The ref guard
  // is essential: the activation endpoint consumes a SINGLE-USE ticket, and
  // React Strict Mode double-invokes effects in development — without the guard
  // the second call finds the ticket already consumed and shows a false
  // "invalid token" error even though activation actually succeeded.
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    (async () => {
      if (!token) {
        setMessage("رابط التفعيل غير صالح أو مفقود.");
        setStep("error");
        return;
      }
      const res = await activateAccountService(token);
      if (res.status === "SUCCESS") {
        setStep("success");
      } else {
        setMessage(
          res.message ||
            "تعذّر تفعيل الحساب. قد يكون الرابط غير صالح أو منتهي الصلاحية."
        );
        setStep("error");
      }
    })();
  }, [token]);

  // After successful activation, redirect to the sign-in page.
  useEffect(() => {
    if (step !== "success") return;
    const id = setTimeout(() => {
      window.location.href = "/sign-in";
    }, REDIRECT_DELAY_MS);
    return () => clearTimeout(id);
  }, [step]);

  const handleResend = async () => {
    if (!resendEmail) return;
    setResendStatus("sending");
    // Backend returns a generic response regardless of whether the account
    // exists, so we always show the same confirmation.
    await resendActivationService(resendEmail);
    setResendStatus("sent");
  };

  return (
    <div className="sign-in-page-wrapper">
      <div className="sign-in-page">
        <main
          className="sign-in-page__content"
          aria-labelledby="activate-heading"
        >
          <header className="sign-in-page__header">
            <h1
              id="activate-heading"
              className="display-sm-bold"
              tabIndex={-1}
              style={{ outline: "none" }}
            >
              تفعيل الحساب
            </h1>
          </header>

          {step === "activating" && (
            <div
              className="sign-in-page__form"
              role="status"
              aria-live="polite"
              aria-busy="true"
            >
              <p className="text-md-regular">جارٍ تفعيل حسابك…</p>
            </div>
          )}

          {step === "success" && (
            <div
              className="sign-in-page__form"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <NotificationToast
                type="success"
                leadText="تم تفعيل حسابك بنجاح"
                helperText="سيتم تحويلك إلى صفحة تسجيل الدخول…"
                open
                variant="stroke"
                inline
              />
              <Button
                label="الذهاب إلى تسجيل الدخول"
                variant="primary-brand"
                size="lg"
                onClick={() => (window.location.href = "/sign-in")}
                className="sign-in-page__submit"
              />
            </div>
          )}

          {step === "error" && (
            <div
              className="sign-in-page__form"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <NotificationToast
                type="error"
                leadText={message || "تعذّر تفعيل الحساب"}
                helperText="يمكنك طلب رابط تفعيل جديد بإدخال بريدك الإلكتروني أدناه."
                open
                variant="stroke"
                inline
              />

              {resendStatus === "sent" ? (
                <NotificationToast
                  type="success"
                  leadText="إذا كان هناك حساب غير مُفعّل لهذا البريد، فقد تم إرسال رابط تفعيل جديد."
                  open
                  variant="stroke"
                  inline
                />
              ) : (
                <>
                  <FormField label="البريد الإلكتروني" htmlFor="activate-email">
                    <TextInput
                      id="activate-email"
                      type="email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      placeholder="أدخل بريدك الإلكتروني"
                      variant="darker"
                      size="lg"
                    />
                  </FormField>
                  <Button
                    label={
                      resendStatus === "sending"
                        ? "جاري الإرسال..."
                        : "إعادة إرسال رابط التفعيل"
                    }
                    variant="primary-brand"
                    size="lg"
                    onClick={handleResend}
                    disabled={resendStatus === "sending" || !resendEmail}
                    className="sign-in-page__submit"
                  />
                </>
              )}
            </div>
          )}

          <p className="sign-in-page__register text-sm-regular">
            <a href="/sign-in" className="link--primary">
              العودة إلى تسجيل الدخول
            </a>
          </p>
        </main>

        <div className="sign-in-page__image" aria-hidden="true">
          <Image
            src="/assets/image/bg-signin.jpg"
            width={1920}
            height={1080}
            alt=""
          />
          <div className="sign-in-page__image-overlay" />
        </div>
      </div>
    </div>
  );
}

// useSearchParams (reads the ?token= from the emailed link) requires Suspense.
export default function ActivateAccountPage() {
  return (
    <Suspense fallback={null}>
      <ActivateAccountContent />
    </Suspense>
  );
}
