import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";
import FileUpload, {
  UploadedFile,
} from "@/app/components/FileUpload/FileUpload";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../update/ProfileForm";
import DateField from "@/app/components/date-field/DateField";
import { DgaDropdown } from "@/lib/utils/platformscode";
import {
  PHONE_PREFIXES,
  getPrefixFromPhone,
  getDigitsFromPhone,
  type PrefixOption,
} from "@/lib/utils/phonePrefixes";
const ID_TYPE_OPTIONS = [
  { name: "هوية وطنية", value: "national_id" },
  { name: "إقامة", value: "iqama" },
  { name: "جواز سفر", value: "passport" },
];

const NATIONALITY_OPTIONS = [
  { name: "سعودي", value: "SA" },
  { name: "مصري", value: "EG" },
  { name: "أردني", value: "JO" },
  { name: "إماراتي", value: "AE" },
  { name: "كويتي", value: "KW" },
  { name: "أخرى", value: "OTHER" },
];

const LANGUAGE_OPTIONS = [
  { name: "العربية", value: "ar" },
  { name: "الإنجليزية", value: "en" },
  { name: "الفرنسية", value: "fr" },
  { name: "أخرى", value: "other" },
];
export default function PersonalInfoTab() {
  const {
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<UserProfileFormValues>();

  const [, setIdFile] = useState<UploadedFile[]>([]);

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
      className="!grid !gap-[16px]"
      role="tabpanel"
      aria-labelledby="tab-personal-info"
      id="panel-personal-info"
    >
      <h2 id="tab-personal-info" className="sr-only">
        المعلومات الشخصية
      </h2>
      <p className="text-sm text-gray-600 sr-only">
        قم بإدخال معلوماتك الشخصية بما في ذلك الاسم وتاريخ الميلاد والجنسية
        ومعلومات الهوية
      </p>

      {/* Arabic Name */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label="الاسم الاول"
          required
          error={errors.firstName_ar?.message}
        >
          <ControlledTextInput name="firstName_ar" />
        </FormField>

        <FormField
          label="الاسم الثاني"
          required
          error={errors.secondName_ar?.message}
        >
          <ControlledTextInput name="secondName_ar" />
        </FormField>

        <FormField
          label="الاسم الاخير"
          required
          error={errors.lastName_ar?.message}
        >
          <ControlledTextInput name="lastName_ar" />
        </FormField>
      </div>

      {/* English Name */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label="الاسم الاول (باللغة الإنجليزية)"
          required
          error={errors.firstName_en?.message}
        >
          <ControlledTextInput name="firstName_en" />
        </FormField>

        <FormField
          label="الاسم الثاني (باللغة الإنجليزية)"
          required
          error={errors.secondName_en?.message}
        >
          <ControlledTextInput name="secondName_en" />
        </FormField>

        <FormField
          label="الاسم الاخير (باللغة الإنجليزية)"
          required
          error={errors.lastName_en?.message}
        >
          <ControlledTextInput name="lastName_en" />
        </FormField>
      </div>

      {/* Other Personal Fields */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label="البريد الشبكي"
          required
          error={errors.email?.message}
          htmlFor="input-email"
        >
          <ControlledTextInput name="email" id="input-email" />
          <span id="email-help" className="sr-only">
            أدخل عنوان بريدك الشبكي المستخدم لتسجيل الدخول
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
                <input
                  id="phone-input"
                  placeholder="00 000 0000"
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
                  أدخل رقم جوالك مسبوقاً برمز الدولة
                </span>

                {/* Prefix Dropdown */}
                <div ref={prefixRef} className="prefix-container">
                  <button
                    type="button"
                    onClick={() => setPrefixOpen((v) => !v)}
                    className={prefixBtnClass}
                    aria-haspopup="listbox"
                    aria-expanded={prefixOpen}
                    aria-label={`رمز الدولة الحالي: ${selectedCountryPrefix.label}. اضغط لتغيير رمز الدولة`}
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
                    aria-label="اختر رمز الدولة"
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
        <FormField
          label="تاريخ الميلاد"
          required
          error={errors.birthDate?.message}
        >
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <DateField
                rtl
                fullwidth
                size="lg"
                variant="darker"
                error={!!errors.birthDate}
                onChange={(date: any) => {
                  field.onChange(date ? String(date) : "");
                }}
              />
            )}
          />
        </FormField>

        <FormField label="الجنسية" required error={errors.nationality?.message}>
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <DgaDropdown
                placeholder="اختر الجنسية"
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                options={NATIONALITY_OPTIONS}
                className="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
              />
            )}
          />
        </FormField>

        <FormField
          label="اللغة الام"
          required
          error={errors.motherTongue?.message}
        >
          <Controller
            name="motherTongue"
            control={control}
            render={({ field }) => (
              <DgaDropdown
                placeholder="اختر اللغة الام"
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                options={LANGUAGE_OPTIONS}
                className="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
              />
            )}
          />
        </FormField>
      </div>

      {/* Identity */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField label="الاثبات" required error={errors.identity?.message}>
          <Controller
            name="identity"
            control={control}
            render={({ field }) => (
              <DgaDropdown
                placeholder="اختر نوع الاثبات"
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                options={ID_TYPE_OPTIONS}
                className="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
              />
            )}
          />
        </FormField>

        <FormField
          label="ادخل رقم الاثبات"
          required
          error={errors.identityNumber?.message}
        >
          <ControlledTextInput name="identityNumber" />
        </FormField>
      </div>

      {/* File Upload */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label="ارفق نسخة من الاثبات"
          required
          error={errors.identityFile?.message as string | undefined}
          htmlFor="identity-file"
        >
          <Controller
            name="identityFile"
            control={control}
            render={({ field }) => (
              <FileUpload
                name="identity-file"
                fileTypesText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وصيغ الملفات المدعومة تشمل .pdf."
                accept=".pdf,.png,.jpg,.jpeg"
                actionName="تصفح الملفات"
                showIcon={false}
                getUploadedFile={(files: UploadedFile[]) => {
                  setIdFile(files);
                  field.onChange(files);
                }}
              />
            )}
          />
        </FormField>
      </div>
    </div>
  );
}
