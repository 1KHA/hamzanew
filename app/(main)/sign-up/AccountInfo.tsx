"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFormContext, Controller } from "react-hook-form";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import {
  DEFAULT_PREFIX,
  getDigitsFromPhone,
  getPrefixFromPhone,
  PHONE_PREFIXES,
  PrefixOption,
} from "@/lib/utils/phonePrefixes";
import { NewUserFormValues } from "./SignUpForm";

export default function AccountInfo() {
  const {
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<NewUserFormValues>();

  const phoneValue = watch("phone") || DEFAULT_PREFIX.value;
  const selectedCountryPrefix =
    getPrefixFromPhone(phoneValue) || DEFAULT_PREFIX;
  const phoneDigitsOnly = getDigitsFromPhone(phoneValue);

  const [prefixOpen, setPrefixOpen] = useState(false);
  const prefixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prefixOpen) return;
    const onClickOut = (e: MouseEvent) => {
      if (prefixRef.current && !prefixRef.current.contains(e.target as Node))
        setPrefixOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPrefixOpen(false);
    };
    document.addEventListener("mousedown", onClickOut);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOut);
      document.removeEventListener("keydown", onEsc);
    };
  }, [prefixOpen]);

  const handlePrefixSelect = (opt: PrefixOption) => {
    setValue("phone", opt.value + phoneDigitsOnly, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setPrefixOpen(false);
  };

  const handlePrefixKeyDown = (e: React.KeyboardEvent, opt: PrefixOption) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePrefixSelect(opt);
    }
  };

  const prefixBtnClass = [
    "input__prefix input__prefix--solid input__dropdown-btn",
    "prefix-btn",
    prefixOpen ? "prefix-btn--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const prefixListClass = [
    "input__dropdown-list prefix-list",
    prefixOpen ? "prefix-list--open" : "prefix-list--closed",
  ].join(" ");

  return (
    <div className="sign-up-page__grid">
      {/* Email */}
      <FormField
        label="البريد الشبكي"
        required
        error={errors.email?.message}
        htmlFor="input-email"
      >
        <ControlledTextInput
          placeholder="البريد الشبكي"
          name="email"
          id="input-email"
          size="lg"
          variant="darker"
        />
        <span id="email-help" className="sr-only">
          أدخل عنوان بريدك الشبكي المستخدم لتسجيل الدخول
        </span>
      </FormField>

      {/* Phone */}
      <FormField
        label="رقم الجوال"
        required
        error={errors.phone?.message}
        htmlFor="phone-input"
      >
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div
              className={`input input--lg input--darker phone-input-wrapper ${
                errors.phone?.message ? "input--error" : ""
              }`}
            >
              {/* Digits-only input — prefix is stored separately in RHF */}
              <input
                id="phone-input"
                placeholder="رقم الجوال"
                type="tel"
                inputMode="numeric"
                value={phoneDigitsOnly}
                name="phone"
                className="input__field"
                onChange={(e) => {
                  field.onChange(selectedCountryPrefix.value + e.target.value);
                }}
                onBlur={() => {
                  field.onBlur();
                  trigger("phone");
                }}
                aria-required="true"
                aria-invalid={!!errors.phone?.message}
              />

              {/* Country code prefix dropdown */}
              <div ref={prefixRef} className="prefix-container">
                <input
                  type="hidden"
                  name="countryCode"
                  value={selectedCountryPrefix.value}
                />

                <button
                  type="button"
                  onClick={() => setPrefixOpen((v) => !v)}
                  className={prefixBtnClass}
                  aria-haspopup="listbox"
                  aria-expanded={prefixOpen}
                  aria-label={`رمز الدولة: ${selectedCountryPrefix.label}`}
                >
                  <span className="input__prefix-icon" />
                  <span className="dropdown__label" />
                  <span className="input__prefix-label">
                    {selectedCountryPrefix.label}
                  </span>
                  <span className="input__prefix-chevron">
                    <Image
                      src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                      alt="arrow down icon"
                      width={20}
                      height={20}
                      aria-hidden="true"
                      className="prefix-chevron-icon"
                    />
                  </span>
                </button>

                <ul
                  role="listbox"
                  className={prefixListClass}
                  aria-label="رمز الدولة"
                >
                  <div className="prefix-list__scroll">
                    {PHONE_PREFIXES.map((opt) => {
                      const isActive =
                        opt.value === selectedCountryPrefix.value;
                      return (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={isActive}
                          tabIndex={prefixOpen ? 0 : -1}
                          onClick={() => handlePrefixSelect(opt)}
                          onKeyDown={(e) => handlePrefixKeyDown(e, opt)}
                          className={`prefix-option ${
                            isActive ? "prefix-option--active" : ""
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isActive && (
                            <span
                              className="prefix-option__check"
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </div>
                </ul>
              </div>
            </div>
          )}
        />
      </FormField>

      {/* Password */}
      <FormField
        label="كلمة السر"
        required
        error={errors.password?.message}
        htmlFor="input-password"
      >
        <ControlledTextInput
          name="password"
          placeholder="كلمة السر"
          id="input-password"
          type="password"
          size="lg"
          variant="darker"
        />
      </FormField>

      {/* Confirm Password */}
      <FormField
        label="تأكيد كلمة السر"
        required
        error={errors.confirmPassword?.message}
        htmlFor="input-confirm-password"
      >
        <ControlledTextInput
          placeholder="تأكيد كلمة السر"
          name="confirmPassword"
          id="input-confirm-password"
          type="password"
          size="lg"
          variant="darker"
        />
      </FormField>
    </div>
  );
}
