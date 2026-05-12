"use client";

/**
 * FeedbackForm Component
 *
 * Client Component that renders a comprehensive feedback and suggestion form.
 *
 * @features
 * - Real-time validation for required fields, email format, and phone format via Zod.
 * - Custom accessible dropdowns for phone prefix and categories.
 * - File upload capability with drag-and-drop support.
 * - Accessible error messaging and focus management on submission.
 * - Optimized with reusable FormField and ControlledTextInput components.
 *
 * @accessibility
 * - Uses semantic <form> with aria-label.
 * - Programmatic association between labels, help text, and error messages (aria-describedby).
 * - Focus management on validation errors.
 * - Keyboard-accessible custom prefix dropdown.
 * - ARIA live regions for success notifications and error states.
 */
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { st } from "@/app/_lib/static-text";
import FileUpload, {
  UploadedFile,
} from "@/app/components/FileUpload/FileUpload";
import Button from "@/app/components/button/Button";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import FormField from "@/app/components/form-field/FormField";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  DEFAULT_PREFIX,
  getDigitsFromPhone,
  getPrefixFromPhone,
  PHONE_PREFIXES,
  PrefixOption,
} from "@/lib/utils/phonePrefixes";
import Textarea from "@/app/components/textarea/Textarea";
import Dropdown from "@/app/components/dropdown/Dropdown";

import "./feedback-form.css";

/* ==========================================================================
   Schema Factory
   ========================================================================== */

function getFeedbackSchema(t: (scope: string, key: string) => string) {
  return z.object({
    firstName: z.string().min(1, t("eParticipation", "firstNameRequired")),
    lastName: z.string().min(1, t("eParticipation", "lastNameRequired")),
    email: z
      .string()
      .min(1, t("eParticipation", "emailRequired"))
      .email(t("eParticipation", "emailInvalid")),
    phone: z
      .string()
      .regex(/^\d+$/, t("eParticipation", "phoneDigitsOnly"))
      .refine(
        (val) => {
          const digits = getDigitsFromPhone(val);
          return digits.length >= 7;
        },
        { message: t("eParticipation", "phoneMinLength") },
      ),
    subject: z.string().optional(),
    category: z.string().optional(),
    message: z.string().optional(),
    file: z.array(z.any()).optional(),
  });
}

export type FeedbackSchema = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject?: string;
  category?: string;
  message?: string;
  file?: any[];
};

const INITIAL_VALUES: FeedbackSchema = {
  firstName: "",
  lastName: "",
  email: "",
  phone: DEFAULT_PREFIX.value,
  subject: "",
  category: "",
  message: "",
  file: [],
};

/* ==========================================================================
   Component
   ========================================================================== */

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [prefixOpen, setPrefixOpen] = useState(false);
  const prefixRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const getCategoryOptions = () => [
    { name: st("eParticipation", "catSuggestions"), value: "اقتراحات" },
    { name: st("eParticipation", "catComplaints"), value: "شكاوي" },
    { name: st("eParticipation", "catInquiries"), value: "استفسارات" },
    { name: st("eParticipation", "catReports"), value: "بلاغات" },
  ];

  const feedbackSchema = getFeedbackSchema(st);

  const methods = useForm<FeedbackSchema>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: INITIAL_VALUES,
    mode: "all",
  });

  const {
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  /* Derive UI state from watched RHF value */
  const fullPhone = watch("phone") || "";
  const selectedCountryPrefix = getPrefixFromPhone(fullPhone) || DEFAULT_PREFIX;
  const phoneDigitsOnly = getDigitsFromPhone(fullPhone);

  /** Close prefix dropdown on click-outside or Escape */
  useEffect(() => {
    if (!prefixOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (prefixRef.current && !prefixRef.current.contains(e.target as Node)) {
        setPrefixOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPrefixOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [prefixOpen]);

  const handlePrefixSelect = (opt: PrefixOption) => {
    setValue("phone", opt.value + phoneDigitsOnly);
    setPrefixOpen(false);
    trigger("phone");
  };

  const handlePrefixKeyDown = (e: React.KeyboardEvent, opt: PrefixOption) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePrefixSelect(opt);
    }
  };

  const onSubmit = (data: FeedbackSchema) => {
    console.log("Form Submitted:", data);
    setSubmitted(true);
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

  if (submitted) {
    return (
      <div
        className="suggestion-success section-spacing-4xl"
        role="status"
        aria-live="polite"
      >
        <NotificationToast
          type="success"
          leadText={st("eParticipation", "successLeadText")}
          helperText={st("eParticipation", "successHelperText")}
          open
          variant="stroke"
          inline
        />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        ref={formRef}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        aria-label={st("eParticipation", "formAriaLabel")}
      >
        <div className="suggestion-form section-spacing-4xl">
          {/* First Name */}
          <FormField
            label={st("eParticipation", "firstNameLabel")}
            required
            error={errors.firstName?.message}
            htmlFor="firstName"
          >
            <ControlledTextInput
              name="firstName"
              id="firstName"
              placeholder={st("eParticipation", "firstNamePlaceholder")}
              aria-required={true}
              aria-describedby={
                errors.firstName ? "firstName-error" : "firstName-help"
              }
            />
            <span id="firstName-help" className="sr-only">
              {st("eParticipation", "firstNameHelp")}
            </span>
          </FormField>

          {/* Last Name */}
          <FormField
            label={st("eParticipation", "lastNameLabel")}
            required
            error={errors.lastName?.message}
            htmlFor="lastName"
          >
            <ControlledTextInput
              name="lastName"
              id="lastName"
              placeholder={st("eParticipation", "lastNamePlaceholder")}
              aria-required={true}
              aria-describedby={
                errors.lastName ? "lastName-error" : "lastName-help"
              }
            />
            <span id="lastName-help" className="sr-only">
              {st("eParticipation", "lastNameHelp")}
            </span>
          </FormField>

          {/* Email */}
          <FormField
            label={st("eParticipation", "emailLabel")}
            required
            error={errors.email?.message}
            htmlFor="email"
          >
            <ControlledTextInput
              name="email"
              id="email"
              placeholder={st("eParticipation", "emailPlaceholder")}
              aria-required={true}
              aria-describedby={errors.email ? "email-error" : "email-help"}
            />
            <span id="email-help" className="sr-only">
              {st("eParticipation", "emailHelp")}
            </span>
          </FormField>

          {/* Phone with Prefix */}
          <FormField
            label={st("eParticipation", "phoneLabel")}
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
                  <input
                    id="phone-input"
                    placeholder={st("eParticipation", "phonePlaceholder")}
                    type="tel"
                    inputMode="numeric"
                    value={phoneDigitsOnly}
                    className="input__field"
                    onChange={(e) => {
                      field.onChange(
                        selectedCountryPrefix.value + e.target.value,
                      );
                    }}
                    onBlur={() => {
                      field.onBlur();
                      trigger("phone");
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.phone?.message}
                    aria-describedby={
                      errors.phone ? "phone-input-error" : "phone-help"
                    }
                  />
                  <span id="phone-help" className="sr-only">
                    {st("eParticipation", "phoneHelp")}
                  </span>

                  {/* Prefix Dropdown */}
                  <div ref={prefixRef} className="prefix-container">
                    <button
                      type="button"
                      onClick={() => setPrefixOpen((v) => !v)}
                      className={prefixBtnClass}
                      aria-haspopup="listbox"
                      aria-expanded={prefixOpen}
                      aria-label={st("eParticipation", "prefixAriaLabel").replace("{label}", selectedCountryPrefix.label)}
                    >
                      <span className="input__prefix-icon" />
                      <span className="input__prefix-label">
                        {selectedCountryPrefix.label}
                      </span>
                      <span className="input__prefix-chevron">
                        <Image
                          src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                          alt=""
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
                      aria-label={st("eParticipation", "prefixListAriaLabel")}
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
                              <span>{opt.label}</span>
                              <span className="sr-only">{opt.country}</span>
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

          {/* Subject */}
          <FormField
            label={st("eParticipation", "subjectLabel")}
            error={errors.subject?.message}
            htmlFor="subject"
          >
            <ControlledTextInput
              name="subject"
              id="subject"
              placeholder={st("eParticipation", "subjectPlaceholder")}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
          </FormField>

          {/* Category */}
          <FormField
            label={st("eParticipation", "categoryLabel")}
            error={errors.category?.message}
            htmlFor="category-select"
          >
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div
                  id="category-wrapper"
                  aria-describedby={
                    errors.category ? "category-select-error" : undefined
                  }
                >
                  <Dropdown
                    id="category-select"
                    placeholder={st("eParticipation", "categoryPlaceholder")}
                    size="lg"
                    variant="darker"
                    optionLabel="name"
                    trackBy="value"
                    extraClass="w-full"
                    value={field.value}
                    getSelectedOptions={(option: any) => {
                      field.onChange(option.value);
                    }}
                    options={getCategoryOptions()}
                  />
                </div>
              )}
            />
          </FormField>

          {/* Message */}
          <FormField
            label={st("eParticipation", "messageLabel")}
            error={errors.message?.message}
            htmlFor="message"
          >
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="message"
                  placeholder={st("eParticipation", "messagePlaceholder")}
                  variant="darker"
                  cols={50}
                  rows={4}
                  scrollbar
                  fullwidth
                  error={!!errors.message}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
              )}
            />
          </FormField>

          {/* File Upload */}
          <FormField label={st("eParticipation", "fileUploadLabel")}>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <FileUpload
                  fileTypesText={st("eParticipation", "fileTypesText")}
                  accept=".pdf,.png,.jpg,.jpeg"
                  actionName={st("eParticipation", "browseFiles")}
                  showIcon={false}
                  getUploadedFile={(files: UploadedFile[]) => {
                    field.onChange(files);
                  }}
                />
              )}
            />
          </FormField>
        </div>

        <Button
          type="submit"
          variant="primary-brand"
          size="lg"
          label={st("eParticipation", "submitBtn")}
          aria-label={st("eParticipation", "submitAriaLabel")}
        />
      </form>
    </FormProvider>
  );
}
