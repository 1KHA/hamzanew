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
import Dropdown, { DropdownOption } from "@/app/components/dropdown/Dropdown";
import {
  PHONE_PREFIXES,
  getPrefixFromPhone,
  getDigitsFromPhone,
  type PrefixOption,
} from "@/lib/utils/phonePrefixes";
import { st } from "@/app/_lib/static-text";

function getIdTypeOptions(): DropdownOption[] {
  return [
    { name: st("profile", "idTypeNationalId"), value: "national_id" },
    { name: st("profile", "idTypeIqama"), value: "iqama" },
    { name: st("profile", "idTypePassport"), value: "passport" },
  ];
}

function getFallbackNationalityOptions(): DropdownOption[] {
  return [
    { name: st("profile", "fallbackNationalitySA"), value: "SA" },
    { name: st("profile", "fallbackNationalityEG"), value: "EG" },
    { name: st("profile", "fallbackNationalityJO"), value: "JO" },
    { name: st("profile", "fallbackNationalityAE"), value: "AE" },
    { name: st("profile", "fallbackNationalityKW"), value: "KW" },
    { name: st("profile", "fallbackNationalityOther"), value: "OTHER" },
  ];
}

function getFallbackMotherTongueOptions(): DropdownOption[] {
  return [
    { name: st("profile", "langAr"), value: "ar" },
    { name: st("profile", "langEn"), value: "en" },
    { name: st("profile", "langFr"), value: "fr" },
    { name: st("profile", "langOther"), value: "other" },
  ];
}

interface PersonalInfoTabProps {
  nationalityOptions?: DropdownOption[];
  motherTongueOptions?: DropdownOption[];
}

export default function PersonalInfoTab({
  nationalityOptions = [],
  motherTongueOptions = [],
}: PersonalInfoTabProps) {
  const {
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext<UserProfileFormValues>();

  const [, setIdFile] = useState<UploadedFile[]>([]);

  // Name of the ID document uploaded at sign-up (if any). When present we show
  // a download link and treat a fresh upload as optional.
  const existingFileName = watch("identityFileName");

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
        {st("profile", "srOnlyPersonalInfo")}
      </h2>
      <p className="text-sm text-gray-600 sr-only">
        {st("profile", "srOnlyPersonalInfo")}
      </p>

      {/* Arabic Name */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label={st("profile", "labelFirstName")}
          required
          error={errors.firstName_ar?.message}
        >
          <ControlledTextInput name="firstName_ar" />
        </FormField>

        <FormField
          label={st("profile", "labelSecondName")}
          required
          error={errors.secondName_ar?.message}
        >
          <ControlledTextInput name="secondName_ar" />
        </FormField>

        <FormField
          label={st("profile", "labelLastName")}
          required
          error={errors.lastName_ar?.message}
        >
          <ControlledTextInput name="lastName_ar" />
        </FormField>
      </div>

      {/* English Name */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label={st("profile", "labelFirstNameEnShort")}
          required
          error={errors.firstName_en?.message}
        >
          <ControlledTextInput name="firstName_en" />
        </FormField>

        <FormField
          label={st("profile", "labelSecondNameEnShort")}
          required
          error={errors.secondName_en?.message}
        >
          <ControlledTextInput name="secondName_en" />
        </FormField>

        <FormField
          label={st("profile", "labelLastNameEnShort")}
          required
          error={errors.lastName_en?.message}
        >
          <ControlledTextInput name="lastName_en" />
        </FormField>
      </div>

      {/* Other Personal Fields */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label={st("profile", "labelEmailShort")}
          required
          error={errors.email?.message}
          htmlFor="input-email"
        >
          <ControlledTextInput name="email" id="input-email" />
          <span id="email-help" className="sr-only">
            {st("profile", "ariaEmailHelp")}
          </span>
        </FormField>

        {/* Phone — Controller wraps the full phone UI (input + prefix dropdown) */}
        <FormField
          label={st("profile", "labelPhoneShort")}
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
                  placeholder={st("profile", "phonePlaceholder")}
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
                  {st("profile", "ariaPhoneHelp")}
                </span>

                {/* Prefix Dropdown */}
                <div ref={prefixRef} className="prefix-container">
                  <button
                    type="button"
                    onClick={() => setPrefixOpen((v) => !v)}
                    className={prefixBtnClass}
                    aria-haspopup="listbox"
                    aria-expanded={prefixOpen}
                    aria-label={st("profile", "ariaPrefixLabel").replace("{label}", selectedCountryPrefix.label)}
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
                    aria-label={st("profile", "ariaPrefixList")}
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
          label={st("profile", "labelBirthDateShort")}
          required
          error={errors.birthDate?.message}
        >
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => {
              // field.value is either an ISO "YYYY-MM-DD" (initial load) or a
              // Date.toString() (after the user picks one). Parse the ISO form
              // as a LOCAL date so it doesn't shift a day in negative-offset
              // timezones.
              const raw = field.value ? String(field.value) : "";
              const isoMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(raw);
              const parsed = isoMatch
                ? new Date(
                    Number(isoMatch[1]),
                    Number(isoMatch[2]) - 1,
                    Number(isoMatch[3]),
                  )
                : raw
                  ? new Date(raw)
                  : null;
              return (
                <DateField
                  rtl
                  fullwidth
                  size="lg"
                  variant="darker"
                  value={parsed && !isNaN(parsed.getTime()) ? parsed : null}
                  error={!!errors.birthDate}
                  onChange={(date: any) => {
                    field.onChange(date ? String(date) : "");
                  }}
                />
              );
            }}
          />
        </FormField>

        <FormField label={st("profile", "labelNationalityShort")} required error={errors.nationality?.message}>
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelectNationality")}
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                options={nationalityOptions.length ? nationalityOptions : getFallbackNationalityOptions()}
                extraClass="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
              />
            )}
          />
        </FormField>

        <FormField
          label={st("profile", "labelMotherTongueShort")}
          required
          error={errors.motherTongue?.message}
        >
          <Controller
            name="motherTongue"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelectMotherTongue")}
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                options={motherTongueOptions.length ? motherTongueOptions : getFallbackMotherTongueOptions()}
                extraClass="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
              />
            )}
          />
        </FormField>
      </div>

      {/* Identity */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField label={st("profile", "labelIdentityShort")} required error={errors.identity?.message}>
          <Controller
            name="identity"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelectIdType")}
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                options={getIdTypeOptions()}
                extraClass="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
              />
            )}
          />
        </FormField>

        <FormField
          label={st("profile", "labelIdentityNumberShort")}
          required
          error={errors.identityNumber?.message}
        >
          <ControlledTextInput name="identityNumber" />
        </FormField>
      </div>

      {/* File Upload */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label={st("profile", "labelIdentityFileShort")}
          // The document was uploaded at sign-up, so re-uploading is only
          // required when none exists yet.
          required={!existingFileName}
          error={errors.identityFile?.message as string | undefined}
          htmlFor="identity-file"
        >
          {existingFileName && (
            <a
              href="/api/profile/id-proof"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mb-2 text-sm text-brand-600 underline underline-offset-2 hover:opacity-80"
            >
              <Image
                src="/assets/icons/stroke-standard/file-02-stroke-rounded.svg"
                alt=""
                width={18}
                height={18}
                aria-hidden="true"
              />
              <span>{existingFileName}</span>
            </a>
          )}
          <Controller
            name="identityFile"
            control={control}
            render={({ field }) => (
              <FileUpload
                name="identity-file"
                fileTypesText={st("profile", "fileUploadTypesText")}
                accept=".pdf,.png,.jpg,.jpeg"
                actionName={
                  existingFileName
                    ? st("profile", "fileUploadReplaceAction")
                    : st("profile", "fileUploadAction")
                }
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
