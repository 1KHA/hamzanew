/**
 * Feedback & Suggestion Page
 *
 * Collects user feedback via a validated form with:
 * - Personal info (name, email, phone with country prefix)
 * - Subject, category, message, and file attachments
 * - On success: hides form and shows inline success notification
 *
 * @accessibility
 * - All inputs linked to labels via wrapping <label> elements
 * - Required fields marked with visible asterisk and aria-required
 * - Inline error messages use role="alert" for screen reader announcements
 * - Phone prefix dropdown is keyboard accessible (Enter/Space/Escape)
 * - Listbox follows WAI-ARIA combobox pattern (role, aria-selected, aria-expanded)
 * - Focus management: first error field focused on submit validation failure
 * - Click-outside and Escape close the prefix dropdown
 */

"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "@/app/components/button/Button";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  DgaDropdown,
  DgaTextarea,
  DgaTextInput,
} from "platformscode-new-react";
import FileUpload, { UploadedFile } from "@/app/components/FileUpload/FileUpload";
import ErrorMessage from "@/app/components/error-message/ErrorMessage";
import "./feedback-form.css";

/* ==========================================================================
   Types
   ========================================================================== */

interface PrefixOption {
  label: string;
  value: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
  file: UploadedFile[];
}

/* ==========================================================================
   Constants
   ========================================================================== */

const REQUIRED_FIELDS = ["firstName", "lastName", "email", "phone"] as const;

/** Field-specific validation error messages */
const FIELD_ERRORS: Record<string, { required: string; invalid?: string }> = {
  firstName: { required: "يرجى إدخال الاسم الأول" },
  lastName: { required: "يرجى إدخال الاسم الأخير" },
  email: {
    required: "يرجى إدخال البريد الإلكتروني",
    invalid: "صيغة البريد الإلكتروني غير صحيحة",
  },
  phone: {
    required: "يرجى إدخال رقم الجوال",
    invalid: "رقم الجوال يجب أن يتكون من أرقام فقط",
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]+$/;

const PREFIX_OPTIONS: PrefixOption[] = [
  { label: "+966", value: "966" },
  { label: "+971", value: "971" },
  { label: "+965", value: "965" },
];

const CATEGORY_OPTIONS = [
  { name: "اختيار 1", value: "اختيار 1" },
  { name: "اختيار 2", value: "اختيار 2" },
  { name: "اختيار 3", value: "اختيار 3" },
  { name: "اختيار 4", value: "اختيار 4" },
];

const INITIAL_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  category: "",
  message: "",
  file: [],
};

/* ==========================================================================
   Component
   ========================================================================== */

export default function FeedbackAndSuggestionPage() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  /* Phone prefix dropdown state */
  const [prefixOpen, setPrefixOpen] = useState(false);
  const [prefix, setPrefix] = useState<PrefixOption>(PREFIX_OPTIONS[0]);
  const prefixRef = useRef<HTMLDivElement>(null);

  /* Ref for focusing first invalid field */
  const formRef = useRef<HTMLFormElement>(null);

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

  /* ── Field change handler — clears error on edit ── */
  const handleChange = useCallback((e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  /* ── Single field validation ── */
  const validateField = useCallback((name: string, value: string) => {
    const fieldConfig = FIELD_ERRORS[name];
    const isRequired = (REQUIRED_FIELDS as readonly string[]).includes(name);
    const trimmed = value.trim();

    /* Required check */
    if (isRequired && !trimmed) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldConfig?.required ?? "هذا الحقل مطلوب",
      }));
      return;
    }

    /* Format validation */
    if (trimmed) {
      if (name === "email" && !EMAIL_REGEX.test(trimmed)) {
        setErrors((prev) => ({ ...prev, [name]: fieldConfig.invalid! }));
        return;
      }
      if (name === "phone" && !PHONE_REGEX.test(trimmed)) {
        setErrors((prev) => ({ ...prev, [name]: fieldConfig.invalid! }));
        return;
      }
    }

    /* Clear error */
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  /* ── Blur handler ── */
  const handleBlur = useCallback(
    (e: any) => validateField(e.target.name, e.target.value),
    [validateField]
  );

  /* ── Form submission ── */
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newErrors: Record<string, string> = {};
      for (const field of REQUIRED_FIELDS) {
        const value = formData[field].trim();
        const fieldConfig = FIELD_ERRORS[field];

        if (!value) {
          newErrors[field] = fieldConfig?.required ?? "هذا الحقل مطلوب";
        } else if (field === "email" && !EMAIL_REGEX.test(value)) {
          newErrors[field] = fieldConfig.invalid!;
        } else if (field === "phone" && !PHONE_REGEX.test(value)) {
          newErrors[field] = fieldConfig.invalid!;
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);

        /* Focus first invalid field */
        const firstErrorField = REQUIRED_FIELDS.find((f) => newErrors[f]);
        if (firstErrorField && formRef.current) {
          const input = formRef.current.querySelector<HTMLInputElement>(
            `[name="${firstErrorField}"]`
          );
          input?.focus();
        }
        return;
      }

      const finalData = {
        ...formData,
        phone: `${prefix.value}${formData.phone}`,
      };

      console.log("Form Submitted:", finalData);
      setSubmitted(true);
    },
    [formData, prefix.value]
  );

  /* ── Prefix handlers ── */
  const handlePrefixSelect = useCallback((opt: PrefixOption) => {
    setPrefix(opt);
    setPrefixOpen(false);
  }, []);

  const handlePrefixKeyDown = useCallback(
    (e: React.KeyboardEvent, opt: PrefixOption) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handlePrefixSelect(opt);
      }
    },
    [handlePrefixSelect]
  );

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
    [prefixOpen]
  );

  /* ── Prefix list class ── */
  const prefixListClass = useMemo(
    () =>
      [
        "input__dropdown-list prefix-list",
        prefixOpen ? "prefix-list--open" : "prefix-list--closed",
      ].join(" "),
    [prefixOpen]
  );

  /* ==========================================================================
     Success State
     ========================================================================== */

  if (submitted) {
    return (
      <div className="feedback-success section-spacing-4xl" role="status" aria-live="polite">
        <NotificationToast
          type="success"
          leadText="تم إرسال الطلب بنجاح"
          helperText="شكراً لتواصلك معنا، سيتم مراجعة طلبك والرد عليك في أقرب وقت ممكن."
          open
          variant="stroke"
          inline
        />
      </div>
    );
  }

  /* ==========================================================================
     Form
     ========================================================================== */

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="نموذج الشكاوى والمقترحات"
    >
      <div className="feedback-form section-spacing-4xl">
        {/* ── First Name ── */}
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg">
            الاسم الاول <span className="required-mark" aria-hidden="true">*</span>
            <span className="sr-only">(مطلوب)</span>
          </label>
          <DgaTextInput
            name="firstName"
            placeholder="ادخل الاسم الاول"
            size="lg"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.firstName}
            variant="darker"
            aria-required="true"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && <ErrorMessage message={errors.firstName} />}
        </div>

        {/* ── Last Name ── */}
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg">
            الاسم الاخير <span className="required-mark" aria-hidden="true">*</span>
            <span className="sr-only">(مطلوب)</span>
          </label>
          <DgaTextInput
            name="lastName"
            placeholder="ادخل الاسم الاخير"
            size="lg"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.lastName}
            variant="darker"
            aria-required="true"
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && <ErrorMessage message={errors.lastName} />}
        </div>

        {/* ── Email ── */}
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg">
            البريد الالكتروني <span className="required-mark" aria-hidden="true">*</span>
            <span className="sr-only">(مطلوب)</span>
          </label>
          <DgaTextInput
            name="email"
            placeholder="ادخل البريد الالكتروني"
            size="lg"
            type="text"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.email}
            variant="darker"
            aria-required="true"
            aria-invalid={!!errors.email}
          />
          {errors.email && <ErrorMessage message={errors.email} />}
        </div>

        {/* ── Phone with prefix dropdown ── */}
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg" htmlFor="phone-input">
            <span className="required-mark" aria-hidden="true">*</span> رقم الجوال
            <span className="sr-only">(مطلوب)</span>
          </label>

          <div
            className={`input input--lg input--darker phone-input-wrapper ${
              errors.phone ? "input--error" : ""
            }`}
          >
            <input
              id="phone-input"
              placeholder="00 000 0000"
              type="tel"
              inputMode="numeric"
              value={formData.phone}
              name="phone"
              className="input__field"
              onChange={handleChange}
              onBlur={(e) => validateField("phone", e.target.value)}
              aria-required="true"
              aria-invalid={!!errors.phone}
            />

            {/* Country code prefix dropdown */}
            <div ref={prefixRef} className="prefix-container">
              <input type="hidden" name="countryCode" value={prefix.value} />

              <button
                type="button"
                onClick={() => setPrefixOpen((v) => !v)}
                className={prefixBtnClass}
                aria-haspopup="listbox"
                aria-expanded={prefixOpen}
                aria-label={`رمز الدولة: ${prefix.label}`}
              >
                <span className="input__prefix-icon" />
                <span className="dropdown__label" />
                <span className="input__prefix-label">{prefix.label}</span>
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

              <ul role="listbox" className={prefixListClass} aria-label="رمز الدولة">
                <div className="prefix-list__scroll">
                  {PREFIX_OPTIONS.map((opt) => {
                    const isActive = opt.value === prefix.value;
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
                        <span>{opt.label}</span>
                        {isActive && (
                          <span className="prefix-option__check" aria-hidden="true">✓</span>
                        )}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>
          {errors.phone && <ErrorMessage message={errors.phone} />}
        </div>

        {/* ── Subject ── */}
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg">موضوع</label>
          <DgaTextInput
            name="subject"
            placeholder="اكتب موضوعك"
            size="lg"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            onBlur={() => {}}
            variant="darker"
          />
        </div>

        {/* ── Category ── */}
        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg">نوع الاختبار</label>
          <DgaDropdown
            placeholder="اقتراحات"
            size="lg"
            variant="darker"
            optionLabel="name"
            trackBy="value"
            className="w-full"
            value={formData.category}
            getSelectedOptions={(option: any) => {
              setFormData((prev) => ({ ...prev, category: option.value }));
            }}
            options={CATEGORY_OPTIONS}
          />
        </div>

        {/* ── Message ── */}
        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg">كيف يمكننا المساعدة؟</label>
          <DgaTextarea
            name="message"
            placeholder="اكتب رسالتك"
            variant="darker"
            value={formData.message}
            onChange={handleChange}
            cols={50}
            rows={4}
            scrollbar
            fullwidth
          />
        </div>

        {/* ── File Upload ── */}
        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg">رفع المرفقات</label>
          <FileUpload
            fileTypesText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وصيغ الملفات المدعومة تشمل .jpg و .png و .pdf."
            accept="image/*,.pdf"
            actionName="تصفح الملفات"
            showIcon={false}
            getUploadedFile={(files: UploadedFile[]) => {
              setFormData((prev) => ({ ...prev, file: files }));
            }}
          />
        </div>
      </div>

      {/* ── Submit ── */}
      <Button type="submit" variant="primary-brand" size="lg" label="إرسال" />
    </form>
  );
}

/* ==========================================================================
   Inline Error Message
   ========================================================================== */

// function ErrorMessage({ message }: { message: string }) {
//   return (
//     <div className="invalid-feedback feedback-error" role="alert">
//       <Image
//         alt="help icon"
//         aria-hidden="true"
//         width={16}
//         height={16}
//         className="inline-block icon-critical"
//         src="/assets/icons/stroke-standard/help-circle-stroke-rounded.svg"
//       />
//       <span>{message}</span>
//     </div>
//   );
// }
