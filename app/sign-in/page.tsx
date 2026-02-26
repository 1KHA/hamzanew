/**
 * Sign In Page (تسجيل الدخول)
 *
 * A full-page split-layout for user authentication.
 * Left panel: background image. Right panel: sign-in form.
 */

"use client";

import { useState, useEffect } from "react";
import { DgaCheckbox } from "platformscode-new-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../components/button/Button";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import "./sign-in.css";
import FormField from "../components/form-field/FormField";
import ControlledTextInput from "../components/form-field/ControlledTextInput";

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
      // TODO: Replace with actual authentication API call
      console.log("Sign in:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRememberMe(false);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sign-in-page-wrapper">
      <div className="sign-in-page">
        {/* Right Panel: Form Content */}
        <div className="sign-in-page__content">
          {/* Header */}
          <div className="sign-in-page__header">
            <h1 className="display-sm-bold">اهلا بك</h1>
            <p className="text-md-regular sign-in-page__subtitle">
              قم بتسجيل الدخول
            </p>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              noValidate
              className="sign-in-page__form"
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
                  variant="default"
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
                <ControlledTextInput
                  name="password"
                  id="password"
                  placeholder="أدخل كلمة المرور"
                  variant="default"
                  aria-required={true}
                  aria-describedby={
                    errors.password ? "password-error" : "password-help"
                  }
                />
                <span id="password-help" className="sr-only">
                  أدخل كلمة المرور الخاصة بك
                </span>
              </FormField>
              {/* Forgot Password & Remember Me */}
              <div className="sign-in-page__options">
                <DgaCheckbox
                  label="تذكرني"
                  size="md"
                  color="brand"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <a
                  href="#"
                  className="link--primary text-sm-regular"
                  onClick={(e) => e.preventDefault()}
                >
                  هل نسيت كلمة المرور ؟
                </a>
              </div>

              {/* Submit Button */}
              <Button
                label={isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                variant="primary-brand"
                size="lg"
                type="submit"
                disabled={isSubmitting}
                className="sign-in-page__submit"
              />
            </form>
          </FormProvider>
          {/* Divider */}
          <div className="sign-in-page__divider">
            <span className="sign-in-page__divider-text text-sm-regular">
              أو
            </span>
          </div>

          {/* National SSO Button */}
          <button
            type="button"
            className="dga-btn dga-btn--lg dga-btn--secondary sign-in-page__sso-btn"
            onClick={() => {
              // TODO: Implement National SSO redirect
              console.log("National SSO clicked");
            }}
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
        </div>

        {/* Left Panel: Background Image with green overlay */}
        <div className="sign-in-page__image">
          <img src="/assets/image/bg-signin.jpg" alt="" aria-hidden="true" />
          <div className="sign-in-page__image-overlay" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
