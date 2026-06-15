"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import CheckBox from "@/app/components/checkbox/CheckBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/app/components/button/Button";
import TextInput from "@/app/components/text-input/TextInput";
import OtpInput from "@/app/components/otp-input/OtpInput";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import "./sign-in.css";
import Image from "next/image";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import { st } from "@/app/_lib/static-text";

export type FormSchema = z.infer<ReturnType<typeof buildFormSchema>>;

const INITIAL_VALUES = {
  username: "",
  password: "",
};

function buildFormSchema() {
  return z.object({
    username: z.string().min(1, st("signIn", "usernameRequired")),
    password: z.string().min(1, st("signIn", "passwordRequired")),
  });
}

type Step = "login" | "otp";

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, 1);
  const masked = visible + "***";
  return `${masked}@${domain}`;
}

export default function SignInPage() {
  useEffect(() => {
    document.body.classList.add("page-sign-in");
    return () => document.body.classList.remove("page-sign-in");
  }, []);

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<Step>("login");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [validatedUser, setValidatedUser] = useState<{
    username: string;
    password: string;
    email: string;
  } | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);

  const formSchema = useMemo(() => buildFormSchema(), []);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: INITIAL_VALUES,
    mode: "all",
  });
  const {
    formState: { errors },
  } = methods;

  // Focus heading on step change
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  const generateOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpValue("");
    setOtpError(null);
    setCountdown(60);
    console.log("[OTP] Generated verification code:", code);
  };

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/validate-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        methods.setError("root", {
          message:
            result.error === "اسم المستخدم أو كلمة المرور غير صحيحة"
              ? st("signIn", "invalidCredentials")
              : result.error || st("signIn", "genericError"),
        });
        setIsSubmitting(false);
        return;
      }

      setRememberMe(false);
      setValidatedUser({
        username: data.username,
        password: data.password,
        email: result.email,
      });
      generateOtp();
      setStep("otp");
    } catch {
      methods.setError("root", { message: st("signIn", "genericError") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    if (otpValue.replace(/\D/g, "").length < 6) {
      setOtpError(st("signIn", "otpRequired"));
      return;
    }

    if (otpValue !== generatedOtp) {
      setOtpError(st("signIn", "otpInvalid"));
      return;
    }

    if (!validatedUser) return;

    setIsSubmitting(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        username: validatedUser.username,
        password: validatedUser.password,
      });

      if (result?.error) {
        setOtpError(st("signIn", "genericError"));
        setIsSubmitting(false);
      } else if (result?.ok) {
        window.location.href = "/profile";
      }
    } catch {
      setOtpError(st("signIn", "genericError"));
      setIsSubmitting(false);
    }
  };

  const handleResend = useCallback(() => {
    if (countdown > 0) return;
    setOtpValue("");
    setOtpError(null);
    generateOtp();
  }, [countdown]);

  const handleSSOClick = useCallback(() => {
    console.log("National SSO clicked");
  }, []);

  return (
    <div className="sign-in-page-wrapper">
      <div className="sign-in-page">
        {/* Right Panel: Form Content */}
        <main
          className="sign-in-page__content"
          aria-labelledby="sign-in-heading"
        >
          {/* Header */}
          <header className="sign-in-page__header">
            <h1
              id="sign-in-heading"
              className="display-sm-bold"
              ref={headingRef}
              tabIndex={-1}
              style={{ outline: "none" }}
            >
              {step === "otp"
                ? "التحقق من هويتك"
                : st("signIn", "welcome")}
            </h1>
            <p className="text-md-regular sign-in-page__subtitle">
              {step === "otp" && validatedUser ? (
                <>
                  {st("signIn", "otpSentTo")}{" "}
                  <strong>{maskEmail(validatedUser.email)}</strong>
                </>
              ) : (
                st("signIn", "subtitle")
              )}
            </p>
          </header>

          {/* Step 1: Login Form */}
          {step === "login" && (
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="sign-in-page__form"
                aria-label={st("signIn", "formAria")}
              >
                {/* Username Field */}
                <FormField
                  label={st("signIn", "usernameLabel")}
                  required
                  error={errors.username?.message}
                  htmlFor="username"
                >
                  <ControlledTextInput
                    name="username"
                    id="username"
                    placeholder={st("signIn", "usernamePlaceholder")}
                    variant="darker"
                    aria-required={true}
                    aria-describedby={
                      errors.username ? "username-error" : "username-help"
                    }
                  />
                  <span id="username-help" className="sr-only">
                    {st("signIn", "usernameHelp")}
                  </span>
                </FormField>

                {/* Password Field */}
                <FormField
                  label={st("signIn", "passwordLabel")}
                  required
                  error={errors.password?.message}
                  htmlFor="password"
                >
                  <Controller
                    name="password"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                      <TextInput
                        id="password"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        type={showPassword ? "text" : "password"}
                        placeholder={st("signIn", "passwordPlaceholder")}
                        variant="darker"
                        size="lg"
                        error={!!fieldState.error}
                        required={true}
                        aria-describedby={
                          errors.password ? "password-error" : "password-help"
                        }
                        suffix={
                          <button
                            type="button"
                            className="password-eye-btn"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={
                              showPassword
                                ? "إخفاء كلمة المرور"
                                : "إظهار كلمة المرور"
                            }
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
                  <span id="password-help" className="sr-only">
                    {st("signIn", "passwordHelp")}
                  </span>
                </FormField>

                {/* Remember Me & Forgot Password */}
                <div className="sign-in-page__options">
                  <CheckBox
                    label={st("signIn", "rememberMe")}
                    size="md"
                    color="brand"
                    checked={rememberMe}
                    onChange={() => setRememberMe((v) => !v)}
                  />
                  <a
                    href="/forgot-password"
                    className="link--primary text-md-regular"
                  >
                    {st("signIn", "forgotPassword")}
                  </a>
                </div>

                {/* Root / API error */}
                {errors.root?.message && (
                  <p
                    className="sign-in-page__error text-sm-regular"
                    role="alert"
                    aria-live="assertive"
                  >
                    {errors.root.message === "CredentialsSignin"
                      ? st("signIn", "invalidCredentials")
                      : errors.root.message}
                  </p>
                )}

                {/* Submit */}
                <Button
                  label={
                    isSubmitting
                      ? st("signIn", "submitting")
                      : st("signIn", "signInBtn")
                  }
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

          {/* Step 2: OTP */}
          {step === "otp" && (
            <form
              onSubmit={handleOtpSubmit}
              className="sign-in-page__form"
              aria-label="نموذج رمز التحقق"
            >
              <FormField
                label={st("signIn", "otpLabel")}
                required
                error={otpError || undefined}
                htmlFor="signin-otp-0"
              >
                <OtpInput
                  value={otpValue}
                  onChange={setOtpValue}
                  hasError={!!otpError}
                  idPrefix="signin-otp"
                />
              </FormField>

              <Button
                label={
                  isSubmitting
                    ? st("signIn", "otpSubmitting")
                    : st("signIn", "otpVerifyBtn")
                }
                variant="primary-brand"
                size="lg"
                type="submit"
                disabled={isSubmitting || otpValue.replace(/\D/g, "").length < 6}
                className="sign-in-page__submit"
                aria-busy={isSubmitting}
              />

              <p className="sign-in-otp__resend text-sm-regular">
                لم تستلم الرمز؈{" "}
                {countdown > 0 ? (
                  <span aria-live="polite" aria-atomic="true">
                    {st("signIn", "otpResendAfter").replace(
                      "{countdown}",
                      String(countdown)
                    )}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="link--primary sign-in-otp__resend-btn"
                  >
                    {st("signIn", "otpResend")}
                  </button>
                )}
              </p>
            </form>
          )}

          {/* National SSO Button hidden temporarily
          <button
            type="button"
            className="dga-btn dga-btn--lg dga-btn--secondary sign-in-page__sso-btn"
            onClick={handleSSOClick}
            aria-label="الدخول بالنفاذ الوطني الموحد"
          >
            الدخول بالنفاذ الوطني الموحد
            <img
              src="/assets/image/nafath-icon.png"
              alt=""
              width="24"
              height="24"
              aria-hidden="true"
            />
          </button>
          */}

          {/* Divider */}
          {step === "login" && (
            <div
              className="sign-in-page__divider"
              role="separator"
              aria-hidden="true"
            >
              <span className="sign-in-page__divider-text text-sm-regular">
                {st("signIn", "dividerOr")}
              </span>
            </div>
          )}

          {/* Create Account */}
          {step === "login" && (
            <p className="sign-in-page__register text-sm-regular">
              {st("signIn", "noAccount")}{" "}
              <a href="/sign-up" className="link--primary">
                {st("signIn", "createAccount")}
              </a>
            </p>
          )}

          {/* Back to login from OTP */}
          {step === "otp" && (
            <p className="sign-in-page__register text-sm-regular">
              <button
                type="button"
                className="link--primary"
                onClick={() => {
                  setStep("login");
                  setOtpValue("");
                  setOtpError(null);
                  setValidatedUser(null);
                  methods.clearErrors("root");
                }}
              >
                العودة إلى تسجيل الدخول
              </button>
            </p>
          )}
        </main>

        {/* Left Panel: Background Image */}
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
