import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../UserProfile";
import {
  PHONE_PREFIXES,
  getPrefixFromPhone,
  getDigitsFromPhone,
  type PrefixOption,
} from "../_data/phonePrefixes";

export default function AccountInfoTab() {
  const {
    setValue,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useFormContext<UserProfileFormValues>();

  const [prefixOpen, setPrefixOpen] = useState(false);
  const prefixRef = useRef<HTMLDivElement>(null);

  //  phone input state
  const fullPhoneWithPrefix = watch("phone") || "";
  const selectedCountryPrefix = getPrefixFromPhone(fullPhoneWithPrefix);
  const phoneDigitsOnly = getDigitsFromPhone(fullPhoneWithPrefix);

  /* ── Close prefix dropdown on outside click / Escape ── */
  useEffect(() => {
    if (!prefixOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (prefixRef.current && !prefixRef.current.contains(e.target as Node)) {
        setPrefixOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setPrefixOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [prefixOpen]);

  /* ── When user selects a different country code ── */
  const handlePrefixSelect = (opt: PrefixOption) => {
    // Replace old prefix with new one, keeping the digits intact
    setValue("phone", opt.value + phoneDigitsOnly, { shouldValidate: true });
    setPrefixOpen(false);
  };

  const handlePrefixKeyDown = (e: React.KeyboardEvent, opt: PrefixOption) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePrefixSelect(opt);
    }
  };

  /* ── Prefix button class ── */
  const prefixBtnClass = useMemo(
    () =>
      [
        "input__prefix input__prefix--solid input__dropdown-btn",
        "prefix-btn",
        prefixOpen ? "prefix-btn--open" : "",
      ]
        .filter(Boolean)
        .join(" "),
    [prefixOpen],
  );

  /* ── Prefix list class ── */
  const prefixListClass = useMemo(
    () =>
      [
        "input__dropdown-list prefix-list",
        prefixOpen ? "prefix-list--open" : "prefix-list--closed",
      ].join(" "),
    [prefixOpen],
  );

  return (
    <div
      className="!grid !grid-cols-1 !gap-[16px]"
      role="tabpanel"
      aria-labelledby="tab-account-info"
      id="panel-account-info"
    >
      <h2 id="tab-account-info" className="text-md-medium">
        معلومات الدخول
      </h2>
      <p className="text-sm text-gray-600 sr-only">
        قم بإدخال معلومات تسجيل الدخول الخاصة بك بما في ذلك البريد الشبكي
        وكلمة المرور ورقم الهاتف
      </p>

      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        {/* Email */}
        <FormField
          label="البريد الشبكي"
          required
          error={errors.email?.message}
          htmlFor="input-email"
        >
          <ControlledTextInput name="email" />
          <span id="email-help" className="sr-only">
            أدخل عنوان بريدك الشبكي المستخدم لتسجيل الدخول
          </span>
        </FormField>

        {/* Password */}
        <FormField
          label="كلمة المرور"
          required
          error={errors.password?.message}
          htmlFor="input-password"
        >
          <ControlledTextInput name="password" type="password" />
          <span id="password-help" className="sr-only">
            يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
          </span>
        </FormField>

        {/* Phone — Controller wraps the full phone UI (input + prefix dropdown) */}
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
                  placeholder="00 000 0000"
                  type="tel"
                  inputMode="numeric"
                  value={phoneDigitsOnly}
                  name="phone"
                  className="input__field"
                  onChange={(e) => {
                    // Store full value (active prefix + digits) in RHF
                    field.onChange(
                      selectedCountryPrefix.value + e.target.value,
                    );
                  }}
                  onBlur={() => {
                    field.onBlur(); // marks field as touched
                    trigger("phone"); // re-runs Zod refine() explicitly
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
                            className={`prefix-option ${isActive ? "prefix-option--active" : ""}`}
                          >
                            {/* {opt.flag && (
                              <span aria-hidden="true">{opt.flag} </span>
                            )} */}
                            <span>{opt.label}</span>
                            {/* <span className="prefix-option__country">
                              {opt.country}
                            </span> */}
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
      </div>
    </div>
  );
}
