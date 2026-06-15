"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import OtpInput from "@/app/components/otp-input/OtpInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import TextInput from "@/app/components/text-input/TextInput";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import "../sign-in/sign-in.css";
import "./forgot-password.css";

/* ==========================================================================
   Schemas
   ========================================================================== */

const emailSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
});

const codeSchema = z.object({
  code: z.string().length(6, "رمز التحقق يجب أن يكون 6 أرقام"),
});

const resetSchema = z
  .object({
    password: z
      .string()
      .min(8, "يجب أن لا تقل عن 8 خانات")
      .regex(/[A-Z]/, "حرف كبير واحد على الأقل")
      .regex(/[a-z]/, "حرف صغير واحد على الأقل")
      .regex(/\d/, "رقم واحد على الأقل")
      .regex(/[@$!#%*?&]/, "رمز خاص واحد على الأقل (@$!#%*?&)")
      .regex(/^\S+$/, "لا يجب أن تحتوي على مسافات"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

type EmailForm = z.infer<typeof emailSchema>;
type CodeForm = z.infer<typeof codeSchema>;
type ResetForm = z.infer<typeof resetSchema>;
type Step = "email" | "code" | "reset" | "done";

/* ==========================================================================
   Password Rules Component
   ========================================================================== */

const PASSWORD_RULES = [
  { id: "length",  label: "الحد الأدنى 8 أحرف",              test: (v: string) => v.length >= 8 },
  { id: "upper",   label: "حرف كبير واحد على الأقل",          test: (v: string) => /[A-Z]/.test(v) },
  { id: "lower",   label: "حرف صغير واحد على الأقل",          test: (v: string) => /[a-z]/.test(v) },
  { id: "digit",   label: "رقم واحد على الأقل",               test: (v: string) => /\d/.test(v) },
  { id: "special", label: "رمز خاص واحد على الأقل (@$!#%*?&)", test: (v: string) => /[@$!#%*?&]/.test(v) },
  { id: "spaces",  label: "لا يحتوي على مسافات",              test: (v: string) => v.length > 0 && !/\s/.test(v) },
];

function PasswordRules({ value }: { value: string }) {
  return (
    <div className="password-rules dga-helper-text" aria-label="متطلبات كلمة المرور">
      <p className="dga-helper-text__desc password-rules__intro">
        يجب أن تحتوي كلمة المرور على رمز خاص (@$!#%*?&)، أرقام، حروف صغيرة، وحرف كبير واحد على الأقل، وأن لا تقل عن 8 خانات
      </p>
      <ul className="password-rules__list" role="list">
        {PASSWORD_RULES.map((rule) => {
          const met = rule.test(value);
          return (
            <li
              key={rule.id}
              className={`password-rules__item${met ? " password-rules__item--met" : ""}`}
              aria-label={`${rule.label}: ${met ? "مستوفى" : "غير مستوفى"}`}
            >
              <span className="password-rules__icon" aria-hidden="true">
                {met ? "✓" : "·"}
              </span>
              <span className="password-rules__label">{rule.label}</span>
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

const HEADINGS: Record<Exclude<Step, "done">, string> = {
  email: "نسيت كلمة المرور الخاصة بي",
  code: "التحقق من هويتك",
  reset: "إعادة تعيين كلمة المرور",
};

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

  /* ── Forms ── */

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
    mode: "all",
  });

  const codeForm = useForm<CodeForm>({
    resolver: zodResolver(codeSchema),
    defaultValues: { code: "" },
    mode: "all",
  });

  const resetForm = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "all",
  });

  /* ── Submit handlers (simulate API calls) ── */

  const onEmailSubmit = async (data: EmailForm) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setEmail(data.email);
    setCountdown(60);
    setIsSubmitting(false);
    setStep("code");
  };

  const onCodeSubmit = async (_data: CodeForm) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setStep("reset");
  };

  const onResetSubmit = async (_data: ResetForm) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setStep("done");
  };

  const handleResend = useCallback(async () => {
    if (countdown > 0) return;
    codeForm.reset();
    setCountdown(60);
  }, [countdown, codeForm]);

  const codeValue = codeForm.watch("code");

  return (
    <div className="sign-in-page-wrapper forgot-password-wrapper">
      <div className="sign-in-page">

        {/* ── Form Panel ── */}
        <main
          className="sign-in-page__content"
          aria-labelledby="forgot-heading"
        >

          {/* Header */}
          {step !== "done" && (
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
                {step === "email" &&
                  "أدخل بريدك الإلكتروني وسنرسل إليك رمز التحقق"}
                {step === "code" && (
                  <>
                    أُرسل رمز مكوّن من 6 أرقام إلى{" "}
                    <strong>{email}</strong>
                  </>
                )}
                {step === "reset" &&
                  "أدخل كلمة المرور الجديدة وتأكيدها لإتمام عملية الاسترداد"}
              </p>
            </header>
          )}

          {/* ── Step 1: Email ── */}
          {step === "email" && (
            <FormProvider {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="sign-in-page__form"
                aria-label="نموذج استعادة كلمة المرور"
                noValidate
              >
                <FormField
                  label="البريد الإلكتروني"
                  required
                  error={emailForm.formState.errors.email?.message}
                  htmlFor="fp-email"
                >
                  <ControlledTextInput
                    name="email"
                    id="fp-email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    variant="darker"
                    aria-required={true}
                    aria-describedby={
                      emailForm.formState.errors.email
                        ? "fp-email-error"
                        : "fp-email-help"
                    }
                  />
                  <span id="fp-email-help" className="sr-only">
                    أدخل البريد الإلكتروني المرتبط بحسابك
                  </span>
                </FormField>

                <Button
                  label={isSubmitting ? "جاري الإرسال..." : "إرسال رمز التحقق"}
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

          {/* ── Step 2: OTP ── */}
          {step === "code" && (
            <FormProvider {...codeForm}>
              <form
                onSubmit={codeForm.handleSubmit(onCodeSubmit)}
                className="sign-in-page__form"
                aria-label="نموذج رمز التحقق"
                noValidate
              >
                <FormField
                  label="رمز التحقق"
                  required
                  error={codeForm.formState.errors.code?.message}
                  htmlFor="fp-otp-0"
                >
                  <Controller
                    name="code"
                    control={codeForm.control}
                    render={({ field, fieldState }) => (
                      <OtpInput
                        value={field.value}
                        onChange={field.onChange}
                        hasError={!!fieldState.error}
                        idPrefix="fp-otp"
                      />
                    )}
                  />
                </FormField>

                <Button
                  label={isSubmitting ? "جاري التحقق..." : "التحقق من الرمز"}
                  variant="primary-brand"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting || codeValue.replace(/\D/g, "").length < 6}
                  className="sign-in-page__submit"
                  aria-busy={isSubmitting}
                />

                <p className="forgot-password__resend text-sm-regular">
                  لم تستلم الرمز؟{" "}
                  {countdown > 0 ? (
                    <span aria-live="polite" aria-atomic="true">
                      إعادة الإرسال بعد {countdown} ث
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="link--primary forgot-password__resend-btn"
                    >
                      إعادة إرسال الرمز
                    </button>
                  )}
                </p>
              </form>
            </FormProvider>
          )}

          {/* ── Step 3: New Password ── */}
          {step === "reset" && (
            <FormProvider {...resetForm}>
              <form
                onSubmit={resetForm.handleSubmit(onResetSubmit)}
                className="sign-in-page__form"
                aria-label="نموذج إعادة تعيين كلمة المرور"
                noValidate
              >
                <FormField
                  label="كلمة المرور الجديدة"
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
                        placeholder="أدخل كلمة المرور الجديدة"
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
                            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
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
                  label="تأكيد كلمة المرور"
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
                        placeholder="أعد إدخال كلمة المرور الجديدة"
                        variant="darker"
                        size="lg"
                        error={!!fieldState.error}
                        aria-required
                        suffix={
                          <button
                            type="button"
                            className="password-eye-btn"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            aria-label={showConfirmPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
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
                  label={
                    isSubmitting ? "جاري الحفظ..." : "إعادة تعيين كلمة المرور"
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
                  تم بنجاح
                </h1>
              </header>

              <NotificationToast
                type="success"
                leadText="تم إعادة تعيين كلمة المرور بنجاح"
                helperText="يمكنك الآن تسجيل الدخول باستخدام كلمة مرورك الجديدة"
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

          {/* Back to sign-in */}
          {step !== "done" && (
            <p className="sign-in-page__register text-sm-regular">
              تذكرت كلمة المرور؟{" "}
              <a href="/sign-in" className="link--primary">
                تسجيل الدخول
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