"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import CheckBox from "@/app/components/checkbox/CheckBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "@/app/components/button/Button";
import TextInput from "@/app/components/text-input/TextInput";
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

export default function SignInPage() {
  useEffect(() => {
    document.body.classList.add("page-sign-in");
    return () => document.body.classList.remove("page-sign-in");
  }, []);

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = useMemo(() => buildFormSchema(), []);

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: INITIAL_VALUES,
    mode: "all",
  });
  const {
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);
    try {
      setRememberMe(false);
      const result = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });
      console.log("result", result);

      if (result?.error) {
        methods.setError("root", { message: result.error });
        setIsSubmitting(false);
      } else if (result?.ok) {
        window.location.href = "/profile";
      }
    } catch {
      methods.setError("root", { message: st("signIn", "genericError") });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 id="sign-in-heading" className="display-sm-bold">
              {st("signIn", "welcome")}
            </h1>
            <p className="text-md-regular sign-in-page__subtitle">
              {st("signIn", "subtitle")}
            </p>
          </header>

          {/* Form */}
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
                label={isSubmitting ? st("signIn", "submitting") : st("signIn", "signInBtn")}
                variant="primary-brand"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="sign-in-page__submit"
                aria-busy={isSubmitting}
              />
            </form>
          </FormProvider>

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
          <div
            className="sign-in-page__divider"
            role="separator"
            aria-hidden="true"
          >
            <span className="sign-in-page__divider-text text-sm-regular">
              {st("signIn", "dividerOr")}
            </span>
          </div>

          {/* Create Account */}
          <p className="sign-in-page__register text-sm-regular">
            {st("signIn", "noAccount")}{" "}
            <a href="/sign-up" className="link--primary">
              {st("signIn", "createAccount")}
            </a>
          </p>
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
