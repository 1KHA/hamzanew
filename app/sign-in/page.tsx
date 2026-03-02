"use client";

import { useCallback, useEffect, useState } from "react";
import { DgaTextInput, DgaCheckbox } from "platformscode-new-react";
import Button from "../components/button/Button";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import "./sign-in.css";

const noop = () => {};

export default function SignInPage() {
  useEffect(() => {
    document.body.classList.add("page-sign-in");
    return () => document.body.classList.remove("page-sign-in");
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = useCallback((e: any) => setUsername(e.target.value), []);
  const handlePasswordChange = useCallback((e: any) => setPassword(e.target.value), []);
  const handleRememberMeChange = useCallback(() => setRememberMe(v => !v), []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Replace with actual authentication API call
      console.log("Sign in:", { username, password, rememberMe });
    } finally {
      setIsSubmitting(false);
    }
  }, [username, password, rememberMe]);

  const handleSSOClick = useCallback(() => {
    // TODO: Implement National SSO redirect
    console.log("National SSO clicked");
  }, []);

  return (
    <div className="sign-in-page-wrapper">
      <div className="sign-in-page" dir="rtl">

        {/* Right Panel: Form Content */}
        <main className="sign-in-page__content" aria-labelledby="sign-in-heading">

          {/* Header */}
          <header className="sign-in-page__header">
            <h1 id="sign-in-heading" className="display-sm-bold">اهلا بك</h1>
            <p className="text-md-regular sign-in-page__subtitle">قم بتسجيل الدخول</p>
          </header>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="sign-in-page__form"
            aria-label="نموذج تسجيل الدخول"
            noValidate
          >
            {/* Username Field */}
            <label className="sign-in-page__field-label">
              <span className="dga-label dga-label--lg">
                اسم المستخدم <span aria-hidden="true">*</span>
              </span>
              <DgaTextInput
                name="username"
                placeholder="أدخل اسم المستخدم"
                size="lg"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onBlur={noop}
                variant="default"
                fullwidth
              />
            </label>

            {/* Password Field */}
            <label className="sign-in-page__field-label">
              <span className="dga-label dga-label--lg">
                كلمة المرور <span aria-hidden="true">*</span>
              </span>
              <DgaTextInput
                name="password"
                placeholder="أدخل كلمة المرور"
                size="lg"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={noop}
                variant="default"
                fullwidth
              />
            </label>

            {/* Remember Me & Forgot Password */}
            <div className="sign-in-page__options">
              <DgaCheckbox
                label="تذكرني"
                size="md"
                color="brand"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <a href="/forgot-password" className="link--primary text-sm-regular">
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
          <div className="sign-in-page__divider" role="separator" aria-hidden="true">
            <span className="sign-in-page__divider-text text-sm-regular">أو</span>
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
          <img src="/assets/image/bg-signin.jpg" alt="" />
          <div className="sign-in-page__image-overlay" />
        </div>

      </div>
    </div>
  );
}
