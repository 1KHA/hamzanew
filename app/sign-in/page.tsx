/**
 * Sign In Page (تسجيل الدخول)
 *
 * A full-page split-layout for user authentication.
 * Left panel: background image. Right panel: sign-in form.
 */

"use client";

import { useState, useEffect } from "react";
import { DgaTextInput, DgaCheckbox } from "platformscode-new-react";
import Button from "../components/button/Button";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import "./sign-in.css";

export default function SignInPage() {
  useEffect(() => {
    document.body.classList.add("page-sign-in");
    return () => document.body.classList.remove("page-sign-in");
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: undefined }));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username.trim()) newErrors.username = "اسم المستخدم مطلوب";
    if (!password.trim()) newErrors.password = "كلمة المرور مطلوبة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // TODO: Replace with actual authentication API call
      console.log("Sign in:", { username, password, rememberMe });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUsername("");
      setPassword("");
      setRememberMe(false);
      setErrors({});
    } catch {
      setErrors({ username: "حدث خطأ أثناء تسجيل الدخول" });
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
        <form
          onSubmit={handleSubmit}
          noValidate
          className="sign-in-page__form"
        >
          {/* Username Field */}
          <div className="dga-form-control dga-form-control--fullwidth">
            <label className="dga-label dga-label--lg">
              <span className="sign-in-page__required">*</span>
              اسم المستخدم
            </label>
            <DgaTextInput
              name="sign-in-username"
              placeholder="أدخل اسم المستخدم"
              size="lg"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              onBlur={() => {}}
              error={!!errors.username}
              variant="default"
            />
            {errors.username && (
              <div
                className="invalid-feedback !flex !justify-start !gap-2 !mt-1"
                role="alert"
              >
                <img
                  alt=""
                  width="16"
                  height="16"
                  className="inline-block icon-critical"
                  src="/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg"
                />
                {errors.username}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="dga-form-control dga-form-control--fullwidth">
            <label className="dga-label dga-label--lg">
              <span className="sign-in-page__required">*</span>
              كلمة المرور
            </label>
            <DgaTextInput
              name="sign-in-password"
              placeholder="أدخل كلمة المرور"
              size="lg"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => {}}
              error={!!errors.password}
              variant="default"
            />
            {errors.password && (
              <div
                className="invalid-feedback !flex !justify-start !gap-2 !mt-1"
                role="alert"
              >
                <img
                  alt=""
                  width="16"
                  height="16"
                  className="inline-block icon-critical"
                  src="/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg"
                />
                {errors.password}
              </div>
            )}
          </div>

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
        <img
          src="/assets/image/bg-signin.jpg"
          alt=""
          aria-hidden="true"
        />
        <div className="sign-in-page__image-overlay" aria-hidden="true" />
      </div>
    </div>
    </div>
  );
}
