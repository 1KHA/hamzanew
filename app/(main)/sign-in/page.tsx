"use client";

import { useCallback, useEffect, useState } from "react";
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

const formSchema = z.object({
  username: z.string().min(1, "اسم المستخدم مطلوب"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

export type FormSchema = z.infer<typeof formSchema>;

const INITIAL_VALUES: FormSchema = {
  username: "",
  password: "",
};

export default function SignInPage() {
  useEffect(() => {
    document.body.classList.add("page-sign-in");
    return () => document.body.classList.remove("page-sign-in");
  }, []);

  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        redirect: false, // FALSE to stay on the page and get the error
        username: data.username,
        password: data.password,
      });
      console.log("result", result);

      if (result?.error) {
        methods.setError("root", { message: result.error });
        setIsSubmitting(false);
      } else if (result?.ok) {
        // Because redirect is false, NextAuth won't redirect us!
        // manually redirect if login was successful.
        window.location.href = "/profile";
      }
    } catch {
      methods.setError("root", { message: "Something went wrong" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSSOClick = useCallback(() => {
    // TODO: Implement National SSO redirect
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
              اهلا بك
            </h1>
            <p className="text-md-regular sign-in-page__subtitle">
              قم بتسجيل الدخول
            </p>
          </header>

          {/* Form */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="sign-in-page__form"
              aria-label="نموذج تسجيل الدخول"
              // noValidate
            >
              {/* Username Field */}

              <FormField
                label="اسم المستخدم"
                required
                error={errors.username?.message}
                htmlFor="username"
              >
                <ControlledTextInput
                  name="username"
                  id="username"
                  placeholder="أدخل اسم المستخدم"
                  variant="darker"
                  aria-required={true}
                  aria-describedby={
                    errors.username ? "username-error" : "username-help"
                  }
                />
                <span id="username-help" className="sr-only">
                  أدخل اسم المستخدم الخاص بك
                </span>
              </FormField>

              {/* Password Field */}
              <FormField
                label="كلمة المرور"
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
                      placeholder="أدخل كلمة المرور"
                      variant="darker"
                      size="lg"
                      error={!!fieldState.error}
                      aria-required
                      aria-describedby={errors.password ? "password-error" : "password-help"}
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
                <span id="password-help" className="sr-only">
                  أدخل كلمة المرور الخاصة بك
                </span>
              </FormField>

              {/* Remember Me & Forgot Password */}
              <div className="sign-in-page__options">
                <CheckBox
                  label="تذكرني"
                  size="md"
                  color="brand"
                  checked={rememberMe}
                  onChange={() => setRememberMe((v) => !v)}
                />
                <a
                  href="/forgot-password"
                  className="link--primary text-md-regular"
                >
                  هل نسيت كلمة المرور؟
                </a>
              </div>

              {/* Submit */}
              <Button
                label={isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                variant="primary-brand"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="sign-in-page__submit"
                aria-busy={isSubmitting}
              />
            </form>
          </FormProvider>

          {/* National SSO Button */}
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

          {/* Divider */}
          <div
            className="sign-in-page__divider"
            role="separator"
            aria-hidden="true"
          >
            <span className="sign-in-page__divider-text text-sm-regular">
              أو
            </span>
          </div>

          {/* Create Account */}
          <p className="sign-in-page__register text-sm-regular">
            ليس لديك حساب؟{" "}
            <a href="/sign-up" className="link--primary">
              إنشاء حساب جديد
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
