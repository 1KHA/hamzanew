"use client";

/**
 * FeedbackForm Component
 *
 * Client Component that renders a comprehensive feedback and suggestion form.
 *
 * @features
 * - Real-time validation for required fields, email format, and phone format.
 * - Custom accessible dropdowns for phone prefix and categories.
 * - File upload capability with drag-and-drop support.
 * - Accessible error messaging and focus management on submission.
 * - Optimized with reusable FormField component.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Button from "@/app/components/button/Button";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  DgaDropdown,
  DgaTextarea,
  DgaTextInput,
} from "platformscode-new-react";
import FileUpload, {
  UploadedFile,
} from "@/app/components/FileUpload/FileUpload";
import FormField from "@/app/components/form-field/FormField";
import "./feedback-form.css";

/* ==========================================================================
   Types
   ========================================================================== */

export interface PrefixOption {
  label: string;
  /** Actual country code value (e.g., "966") */
  value: string;
}

export interface FormData {
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

/** Validation messages config */
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

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  /* Phone prefix dropdown state */
  const [prefixOpen, setPrefixOpen] = useState(false);
  const [prefix, setPrefix] = useState<PrefixOption>(PREFIX_OPTIONS[0]);
  const prefixRef = useRef<HTMLDivElement>(null);

  /* Ref for focus management (accessibility) */
  const formRef = useRef<HTMLFormElement>(null);

  /*
   * ── Effect: Handle outside click and Escape key ──
   */
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

  /*
   * ── Handler: Input Change ──
   */
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  /*
   * ── Helper: Validate Single Field ──
   */
  const validateField = (name: string, value: string) => {
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

    /* Clear error if valid */
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  /*
   * ── Handler: Input Blur ──
   */
  const handleBlur = (e: any) => {
    validateField(e.target.name, e.target.value);
  };

  /*
   * ── Handler: Form Submit ──
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

      /* Accessibility: Focus first invalid field */
      const firstErrorField = REQUIRED_FIELDS.find((f) => newErrors[f]);
      if (firstErrorField && formRef.current) {
        const input = formRef.current.querySelector<HTMLInputElement>(
          `[name="${firstErrorField}"]`,
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
  };

  /*
   * ── Handler: Prefix Selection ──
   */
  const handlePrefixSelect = (opt: PrefixOption) => {
    setPrefix(opt);
    setPrefixOpen(false);
  };

  const handlePrefixKeyDown = (e: React.KeyboardEvent, opt: PrefixOption) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePrefixSelect(opt);
    }
  };

  /* Classes for prefix dropdown */
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

  /* ==========================================================================
     Success State
     ========================================================================== */

  if (submitted) {
    return (
      <div
        className="feedback-success section-spacing-4xl"
        role="status"
        aria-live="polite"
      >
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
     Form Render
     ========================================================================== */

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="نموذج الشكاوى والمقترحات"
    >
      <div className="feedback-form section-spacing-4xl">
        {/* ── Field: First Name ── */}
        <FormField
          label="الاسم الاول"
          required
          htmlFor="firstName"
          error={errors.firstName}
        >
          <DgaTextInput
            id="firstName"
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
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
        </FormField>

        {/* ── Field: Last Name ── */}
        <FormField
          label="الاسم الاخير"
          required
          htmlFor="lastName"
          error={errors.lastName}
        >
          <DgaTextInput
            id="lastName"
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
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
        </FormField>

        {/* ── Field: Email ── */}
        <FormField
          label="البريد الالكتروني"
          required
          htmlFor="email"
          error={errors.email}
        >
          <DgaTextInput
            id="email"
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
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </FormField>

        {/* ── Field: Phone with Prefix ── */}
        <FormField
          label="رقم الجوال"
          required
          htmlFor="phone-input"
          error={errors.phone}
        >
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
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />

            {/* Prefix Dropdown (Accessible Custom Select) */}
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
                    alt=""
                    aria-hidden="true"
                    width={20}
                    height={20}
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
        </FormField>

        {/* ── Field: Subject ── */}
        <FormField label="موضوع" htmlFor="subject">
          <DgaTextInput
            id="subject"
            name="subject"
            placeholder="اكتب موضوعك"
            size="lg"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            onBlur={() => {}}
            variant="darker"
          />
        </FormField>

        {/* ── Field: Category ── */}
        <FormField label="نوع الاختبار" htmlFor="category-select">
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
            // aria-labelledby="category-label" // Handled by FormField label via htmlFor context if applicable, or explicit aria-labelledby if DgaDropdown supports it
          />
        </FormField>

        {/* ── Field: Message ── */}
        <FormField label="كيف يمكننا المساعدة؟" htmlFor="message">
          <DgaTextarea
            id="message"
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
        </FormField>

        {/* ── Field: File Upload ── */}
        <FormField label="رفع المرفقات">
          <FileUpload
            fileTypesText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وصيغ الملفات المدعومة تشمل .jpg و .png و .pdf."
            accept="image/*,.pdf"
            actionName="تصفح الملفات"
            showIcon={false}
            getUploadedFile={(files: UploadedFile[]) => {
              setFormData((prev) => ({ ...prev, file: files }));
            }}
          />
        </FormField>
      </div>

      {/* ── Submit Button ── */}
      <Button
        type="submit"
        variant="primary-brand"
        size="lg"
        label="إرسال"
        aria-label="إرسال نموذج الشكاوى والمقترحات"
      />
    </form>
  );
}
