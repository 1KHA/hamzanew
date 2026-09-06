"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import TextInput from "@/app/components/text-input/TextInput";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  requestPasswordResetService,
  validateResetTokenService,
  resetPasswordService,
} from "@/app/_lib/user-service";
import { st } from "@/app/_lib/static-text";
import "../sign-in/sign-in.css";
import "./forgot-password.css";

/* ==========================================================================
   Schemas (locale-aware factories — same pattern as SignUpForm)
   ========================================================================== */

function createEmailSchema(getText: (key: string) => string) {
  return z.object({
    email: z
      .string()
      .min(1, getText("emailRequired"))
      .email(getText("emailInvalid")),
  });
}

function createResetSchema(getText: (key: string) => string) {
  return z
    .object({
      password: z
        .string()
        .min(8, getText("ruleLength"))
        .regex(/[A-Z]/, getText("ruleUpper"))
        .regex(/[a-z]/, getText("ruleLower"))
        .regex(/\d/, getText("ruleDigit"))
        .regex(/[@$!#%*?&]/, getText("ruleSpecial"))
        .regex(/^\S+$/, getText("ruleSpaces")),
      confirmPassword: z.string().min(1, getText("confirmPasswordRequired")),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: getText("passwordsMismatch"),
      path: ["confirmPassword"],
    });
}

type EmailForm = z.infer<ReturnType<typeof createEmailSchema>>;
type ResetForm = z.infer<ReturnType<typeof createResetSchema>>;

/**
 * Flow:
 *  - No token in URL  → "email" → "sent"
 *  - Token in URL     → "validating" → ("reset" → "done") | "invalid"
 */
type Step = "email" | "sent" | "validating" | "reset" | "invalid" | "done";

/* ==========================================================================
   Password Rules Component
   ========================================================================== */

const PASSWORD_RULES = [
  { id: "length",  labelKey: "ruleLength",  test: (v: string) => v.length >= 8 },
  { id: "upper",   labelKey: "ruleUpper",   test: (v: string) => /[A-Z]/.test(v) },
  { id: "lower",   labelKey: "ruleLower",   test: (v: string) => /[a-z]/.test(v) },
  { id: "digit",   labelKey: "ruleDigit",   test: (v: string) => /\d/.test(v) },
  { id: "special", labelKey: "ruleSpecial", test: (v: string) => /[@$!#%*?&]/.test(v) },
  { id: "spaces",  labelKey: "ruleSpaces",  test: (v: string) => v.length > 0 && !/\s/.test(v) },
];

function PasswordRules({ value }: { value: string }) {
  return (
    <div className="password-rules dga-helper-text" aria-label={st("forgotPassword", "rulesAria")}>
      <p className="dga-helper-text__desc password-rules__intro">
        {st("forgotPassword", "rulesIntro")}
      </p>
      <ul className="password-rules__list" role="list">
        {PASSWORD_RULES.map((rule) => {
          const met = rule.test(value);
          const label = st("forgotPassword", rule.labelKey);
          return (
            <li
              key={rule.id}
              className={`password-rules__item${met ? " password-rules__item--met" : ""}`}
              aria-label={`${label}: ${st("forgotPassword", met ? "ruleMet" : "ruleUnmet")}`}
            >
              <span className="password-rules__icon" aria-hidden="true">
                {met ? "✓" : "·"}
              </span>
              <span className="password-rules__label">{label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ==========================================================================
   Page
   ========================================================================== */

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [step, setStep] = useState<Step>(token ? "validating" : "email");
  const [email, setEmail] = useState("");
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const t = (key: string) => st("forgotPassword", key);

  const HEADINGS: Partial<Record<Step, string>> = {
    email: t("headingEmail"),
    validating: t("headingValidating"),
    reset: t("headingReset"),
  };

  // Move focus to heading on step change (screen reader UX)
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  // Hide footer feedback/last-updated sections (same pattern as sign-in)
  useEffect(() => {
    document.body.classList.add("page-sign-in");
    return () => document.body.classList.remove("page-sign-in");
  }, []);

  // Resend countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  // Validate the token from the emailed link on mount
  useEffect(() => {
    if (!token) return;
    let active = true;
    (async () => {
      const res = await validateResetTokenService(token);
      if (!active) return;
      if (res.valid) {
        setStep("reset");
      } else {
        setApiError(res.message || st("forgotPassword", "invalidLead"));
        setStep("invalid");
      }
    })();
    return () => {
      active = false;
    };
  }, [token]);

  /* ── Forms ── */

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(createEmailSchema(t)),
    defaultValues: { email: "" },
    mode: "all",
  });

  const resetForm = useForm<ResetForm>({
    resolver: zodResolver(createResetSchema(t)),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "all",
  });

  /* ── Submit handlers ── */

  // Step 1: request the reset link
  const onEmailSubmit = async (data: EmailForm) => {
    setApiError("");
    setIsSubmitting(true);
    const res = await requestPasswordResetService(data.email);
    setIsSubmitting(false);
    if (res.status === "SUCCESS") {
      setEmail(data.email);
      setCountdown(60);
      setStep("sent");
    } else {
      setApiError(res.message || t("sendFailed"));
    }
  };

  // Step 3: set the new password using the validated token
  const onResetSubmit = async (data: ResetForm) => {
    setApiError("");
    setIsSubmitting(true);
    const res = await resetPasswordService(token, data.password);
    setIsSubmitting(false);
    if (res.status === "SUCCESS") {
      setStep("done");
    } else {
      setApiError(res.message || t("resetFailed"));
    }
  };

  const handleResend = useCallback(async () => {
    if (countdown > 0 || !email) return;
    setApiError("");
    const res = await requestPasswordResetService(email);
    if (res.status === "SUCCESS") {
      setCountdown(60);
    } else {
      setApiError(res.message || st("forgotPassword", "resendFailed"));
    }
  }, [countdown, email]);

  const hasHeading = step in HEADINGS;

  return (
    <div className="sign-in-page-wrapper forgot-password-wrapper">
      <div className="sign-in-page">

        {/* ── Form Panel ── */}
        <main
          className="sign-in-page__content"
          aria-labelledby="forgot-heading"
        >

          {/* Header */}
          {hasHeading && (
            <header className="sign-in-page__header">
              <h1
                id="forgot-heading"
                className="display-sm-bold"
                ref={headingRef}
                tabIndex={-1}
                style={{ outline: "none" }}
              >
                {HEADINGS[step]}
              </h1>
              <p className="text-md-regular sign-in-page__subtitle">
                {step === "email" && t("subtitleEmail")}
                {step === "validating" && t("subtitleValidating")}
                {step === "reset" && t("subtitleReset")}
              </p>
            </header>
          )}

          {/* ── Step 1: Email ── */}
          {step === "email" && (
            <FormProvider {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="sign-in-page__form"
                aria-label={t("formAriaEmail")}
                noValidate
              >
                {apiError && (
                  <NotificationToast
                    type="error"
                    leadText={apiError}
                    open
                    variant="stroke"
                    inline
                  />
                )}

                <FormField
                  label={t("emailLabel")}
                  required
                  error={emailForm.formState.errors.email?.message}
                  htmlFor="fp-email"
                >
                  <ControlledTextInput
                    name="email"
                    id="fp-email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    variant="darker"
                    aria-required={true}
                    aria-describedby={
                      emailForm.formState.errors.email
                        ? "fp-email-error"
                        : "fp-email-help"
                    }
                  />
                  <span id="fp-email-help" className="sr-only">
                    {t("emailHelp")}
                  </span>
                </FormField>

                <Button
                  label={isSubmitting ? t("sending") : t("sendLinkBtn")}
                  variant="primary-brand"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                  className="sign-in-page__submit"
                  aria-busy={isSubmitting}
                />
              </form>
            </FormProvider>
          )}

          {/* ── Step 2: Link sent ── */}
          {step === "sent" && (
            <div
              className="sign-in-page__form"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <header className="sign-in-page__header">
                <h1
                  id="forgot-heading"
                  className="display-sm-bold"
                  ref={headingRef}
                  tabIndex={-1}
                  style={{ outline: "none" }}
                >
                  {t("sentHeading")}
                </h1>
                <p className="text-md-regular sign-in-page__subtitle">
                  {t("sentBody1")} <strong>{email}</strong>
                  {t("sentBody2")}
                </p>
              </header>

              {apiError && (
                <NotificationToast
                  type="error"
                  leadText={apiError}
                  open
                  variant="stroke"
                  inline
                />
              )}

              <p className="forgot-password__resend text-sm-regular">
                {t("noLinkReceived")}{" "}
                {countdown > 0 ? (
                  <span aria-live="polite" aria-atomic="true">
                    {t("resendAfter").replace("{countdown}", String(countdown))}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="link--primary forgot-password__resend-btn"
                  >
                    {t("resendBtn")}
                  </button>
                )}
              </p>
            </div>
          )}

          {/* ── Validating token ── */}
          {step === "validating" && (
            <div
              className="sign-in-page__form"
              role="status"
              aria-live="polite"
              aria-busy="true"
            >
              <p className="text-md-regular">{t("validatingBody")}</p>
            </div>
          )}

          {/* ── Step 3: New Password ── */}
          {step === "reset" && (
            <FormProvider {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(onResetSubmit)}
                className="sign-in-page__form"
                aria-label={t("formAriaReset")}
                noValidate
              >
                {apiError && (
                  <NotificationToast
                    type="error"
                    leadText={apiError}
                    open
                    variant="stroke"
                    inline
                  />
                )}

                <FormField
                  label={t("newPasswordLabel")}
                  required
                  error={resetForm.formState.errors.password?.message}
                  htmlFor="fp-password"
                >
                  <Controller
                    name="password"
                    control={resetForm.control}
                    render={({ field, fieldState }) => (
                      <TextInput
                        id="fp-password"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        type={showPassword ? "text" : "password"}
                        placeholder={t("newPasswordPlaceholder")}
                        variant="darker"
                        size="lg"
                        error={!!fieldState.error}
                        aria-required
                        aria-describedby="fp-password-rules"
                        suffix={
                          <button
                            type="button"
                            className="password-eye-btn"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                          >
                            <img
                              src={
                                showPassword
                                  ? "/assets/icons/stroke-standard/view-off-slash-stroke-rounded.svg"
                                  : "/assets/icons/stroke-standard/eye-stroke-rounded.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                              aria-hidden="true"
                            />
                          </button>
                        }
                      />
                    )}
                  />
                  <div id="fp-password-rules">
                    <PasswordRules value={resetForm.watch("password") ?? ""} />
                  </div>
                </FormField>

                <FormField
                  label={t("confirmPasswordLabel")}
                  required
                  error={resetForm.formState.errors.confirmPassword?.message}
                  htmlFor="fp-confirm-password"
                >
                  <Controller
                    name="confirmPassword"
                    control={resetForm.control}
                    render={({ field, fieldState }) => (
                      <TextInput
                        id="fp-confirm-password"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("confirmPasswordPlaceholder")}
                        variant="darker"
                        size="lg"
                        error={!!fieldState.error}
                        aria-required
                        suffix={
                          <button
                            type="button"
                            className="password-eye-btn"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            aria-label={showConfirmPassword ? t("hidePassword") : t("showPassword")}
                          >
                            <img
                              src={
                                showConfirmPassword
                                  ? "/assets/icons/stroke-standard/view-off-slash-stroke-rounded.svg"
                                  : "/assets/icons/stroke-standard/eye-stroke-rounded.svg"
                              }
                              alt=""
                              width={20}
                              height={20}
                              aria-hidden="true"
                            />
                          </button>
                        }
                      />
                    )}
                  />
                </FormField>

                <Button
                  label={isSubmitting ? t("savingBtn") : t("resetBtn")}
                  variant="primary-brand"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                  className="sign-in-page__submit"
                  aria-busy={isSubmitting}
                />
              </form>
            </FormProvider>
          )}

          {/* ── Invalid / expired token ── */}
          {step === "invalid" && (
            <div
              className="sign-in-page__form"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <header className="sign-in-page__header">
                <h1
                  id="forgot-heading"
                  className="display-sm-bold"
                  ref={headingRef}
                  tabIndex={-1}
                  style={{ outline: "none" }}
                >
                  {t("invalidHeading")}
                </h1>
              </header>

              <NotificationToast
                type="error"
                leadText={apiError || t("invalidLead")}
                helperText={t("invalidHelper")}
                open
                variant="stroke"
                inline
              />

              <Button
                label={t("requestNewLink")}
                variant="primary-brand"
                size="lg"
                onClick={() => (window.location.href = "/forgot-password")}
                className="sign-in-page__submit"
              />
            </div>
          )}

          {/* ── Step 4: Success ── */}
          {step === "done" && (
            <div
              className="sign-in-page__form"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              <header className="sign-in-page__header">
                <h1
                  id="forgot-heading"
                  className="display-sm-bold"
                  ref={headingRef}
                  tabIndex={-1}
                  style={{ outline: "none" }}
                >
                  {t("doneHeading")}
                </h1>
              </header>

              <NotificationToast
                type="success"
                leadText={t("doneLead")}
                helperText={t("doneHelper")}
                open
                variant="stroke"
                inline
              />

              <Button
                label={t("goToSignIn")}
                variant="primary-brand"
                size="lg"
                onClick={() => (window.location.href = "/sign-in")}
                className="sign-in-page__submit"
              />
            </div>
          )}

          {/* Back to sign-in */}
          {step !== "done" && (
            <p className="sign-in-page__register text-sm-regular">
              {t("rememberedPassword")}{" "}
              <a href="/sign-in" className="link--primary">
                {t("signInLink")}
              </a>
            </p>
          )}
        </main>

        {/* ── Image Panel ── */}
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

// useSearchParams (reads the ?token= from the emailed link) requires a Suspense boundary.
export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
