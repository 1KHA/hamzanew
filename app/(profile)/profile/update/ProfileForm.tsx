"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DgaTabs } from "@/app/components/tabs/DgaTabs";
import OtpInput from "@/app/components/otp-input/OtpInput";
import "@/app/(main)/e-participation/(special)/feedback-and-suggestion/feedback-form.css";
import {
  identityNumberErrorKey,
  isValidIdentityNumber,
} from "@/lib/identity-number";
import PersonalInfoTab from "../_component/PersonalInfoTab";
import EducationTab from "../_component/EducationTab";
import LocationTab from "../_component/LocationTab";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  getPrefixFromPhone,
  DEFAULT_PREFIX,
  getDigitsFromPhone,
} from "@/lib/utils/phonePrefixes";
import {
  updateUserProfile,
  updateUserIdProof,
  requestProfileEditOtp,
} from "@/app/_lib/profile-actions";
import { Suspense } from "react";
import Button from "@/app/components/button/Button";
import { st } from "@/app/_lib/static-text";

// ─────────────────────────────────────────
//   Schema factory (locale-aware)
// ─────────────────────────────────────────
function createProfileSchema(getText: (key: string) => string) {
  return z.object({
    // Account Info
    email: z
      .string()
      .min(1, getText("valEmailRequired"))
      .email(getText("valEmailInvalid")),
    // Profile editing does not change the password (that's the separate
    // change-password flow), so it is not required here.
    password: z.string().optional(),
    phone: z
      .string()
      .regex(/^\d+$/, getText("valPhoneDigitsOnly"))
      .refine(
        (val) => {
          const digits = getDigitsFromPhone(val);
          return digits.length >= 7;
        },
        { message: getText("valPhoneMinLength") },
      ),
    // Personal Info
    firstName_ar: z.string().min(1, getText("valFirstNameArRequired")),
    secondName_ar: z.string().min(1, getText("valSecondNameArRequired")),
    lastName_ar: z.string().min(1, getText("valLastNameArRequired")),
    firstName_en: z.string().min(1, getText("valFirstNameEnRequired")),
    secondName_en: z.string().min(1, getText("valSecondNameEnRequired")),
    lastName_en: z.string().min(1, getText("valLastNameEnRequired")),
    birthDate: z.string().min(1, getText("valBirthDateRequired")),
    nationality: z.string().min(1, getText("valNationalityRequired")),
    motherTongue: z.string().min(1, getText("valMotherTongueRequired")),
    identity: z.string().min(1, getText("valIdentityRequired")),
    identityNumber: z.string().min(1, getText("valIdentityNumberRequired")),
    // In edit mode the ID document was already uploaded at sign-up, so a new
    // upload is optional. The existing file is surfaced via identityFileName /
    // fileEntryId and shown as a download link.
    identityFile: z.any().optional(),
    identityFileName: z.string().optional(),
    fileEntryId: z.string().optional(),
    // Education
    education: z.string().min(1, getText("valEducationRequired")),
    basicLanguageInEducation: z.string().min(1, getText("valBasicLanguageRequired")),
    institution: z.string().min(1, getText("valInstitutionRequired")),
    specialization: z.string().min(1, getText("valSpecializationRequired")),
    // Location
    timezone: z.string().min(1, getText("valTimezoneRequired")),
    country: z.string().min(1, getText("valCountryRequired")),
    state: z.string().min(1, getText("valStateRequired")),
    city: z.string().min(1, getText("valCityRequired")),
    postalAddress: z.string().min(1, getText("valPostalAddressRequired")),
    zipCode: z.string().min(1, getText("valZipCodeRequired")),
  })
  // Same identity-number rule as sign-up (lib/identity-number) so a value
  // accepted here could also have been entered at registration.
  .superRefine((data, ctx) => {
    if (
      data.identityNumber &&
      !isValidIdentityNumber(data.identityNumber, data.identity)
    ) {
      ctx.addIssue({
        code: "custom",
        message: getText(identityNumberErrorKey(data.identity)),
        path: ["identityNumber"],
      });
    }
  });
}

export type UserProfileFormValues = z.infer<ReturnType<typeof createProfileSchema>>;

import type { DropdownOption } from "@/app/components/dropdown/Dropdown";

interface ProfileFormProps {
  initialValues?: Partial<UserProfileFormValues>;
  nationalityOptions?: DropdownOption[];
  motherTongueOptions?: DropdownOption[];
  educationOptions?: DropdownOption[];
  institutionOptions?: DropdownOption[];
  specializationOptions?: DropdownOption[];
  countryOptions?: DropdownOption[];
  timezoneOptions?: DropdownOption[];
}

// ─────────────────────────────────────────
//   Default values builder
// ─────────────────────────────────────────
function buildDefaultValues(
  initial: Partial<UserProfileFormValues> = {},
): UserProfileFormValues {
  const rawPhone = initial.phone || "";
  const hasPrefix =
    getPrefixFromPhone(rawPhone).value !== DEFAULT_PREFIX.value ||
    rawPhone.startsWith(DEFAULT_PREFIX.value);

  return {
    email: initial.email || "",
    password: initial.password || "",
    phone: hasPrefix ? rawPhone : DEFAULT_PREFIX.value + rawPhone,
    firstName_ar: initial.firstName_ar || "",
    secondName_ar: initial.secondName_ar || "",
    lastName_ar: initial.lastName_ar || "",
    firstName_en: initial.firstName_en || "",
    secondName_en: initial.secondName_en || "",
    lastName_en: initial.lastName_en || "",
    birthDate: initial.birthDate || "",
    nationality: initial.nationality || "",
    motherTongue: initial.motherTongue || "",
    identity: initial.identity || "",
    identityNumber: initial.identityNumber || "",
    identityFile: initial.identityFile || "",
    identityFileName: initial.identityFileName || "",
    fileEntryId: initial.fileEntryId || "",
    education: initial.education || "",
    basicLanguageInEducation: initial.basicLanguageInEducation || "",
    institution: initial.institution || "",
    specialization: initial.specialization || "",
    timezone: initial.timezone || "",
    country: initial.country || "",
    state: initial.state || "",
    city: initial.city || "",
    postalAddress: initial.postalAddress || "",
    zipCode: initial.zipCode || "",
  };
}

// Fields belonging to each tab (1 = Personal, 2 = Education, 3 = Location).
// Used to validate only the active tab on Save.
const TAB_FIELDS: Record<number, (keyof UserProfileFormValues)[]> = {
  1: [
    "firstName_ar", "secondName_ar", "lastName_ar",
    "firstName_en", "secondName_en", "lastName_en",
    "email", "phone", "birthDate", "nationality", "motherTongue",
    "identity", "identityNumber", "identityFile",
  ],
  2: ["education", "institution", "specialization", "basicLanguageInEducation"],
  3: ["timezone", "country", "state", "city", "postalAddress", "zipCode"],
};

/**
 * ProfileForm Component (Client Component)
 */
function ProfileFormContent({
  initialValues,
  nationalityOptions,
  motherTongueOptions,
  educationOptions,
  institutionOptions,
  specializationOptions,
  countryOptions,
  timezoneOptions,
}: ProfileFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawTab = searchParams.get("tab");
  const parsedTab = rawTab ? parseInt(rawTab, 10) : 1;
  const initialTabId =
    !isNaN(parsedTab) && parsedTab >= 1 && parsedTab <= 3 ? parsedTab : 1;
  const [activeTab, setActiveTab] = useState<number>(initialTabId);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ── OTP gate state ──────────────────────────────────────────────
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [mfaToken, setMfaToken] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  // Form values captured at Save time, applied once the OTP is verified.
  const pendingValuesRef = useRef<UserProfileFormValues | null>(null);

  const userProfileSchema = createProfileSchema((key) => st("profile", key));

  const methods = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: buildDefaultValues(initialValues),
    mode: "all",
  });

  // Resend cooldown countdown.
  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  // Applies the edit. The ID document (verify-only on the backend) MUST be sent
  // before the profile update (which consumes the single-use OTP), otherwise the
  // file upload's OTP check would fail against an already-consumed ticket.
  const performUpdate = async (
    data: UserProfileFormValues,
    otpContext: { mfaToken: string; otp: string },
  ): Promise<{ ok: boolean; message?: string }> => {
    const files = data.identityFile as Array<{ file?: File }> | undefined;
    const newFile =
      Array.isArray(files) && files.length > 0 ? files[0]?.file : null;

    if (newFile) {
      const fd = new FormData();
      fd.append("file", newFile);
      fd.append("mfaToken", otpContext.mfaToken);
      fd.append("otp", otpContext.otp);
      const fileResult = await updateUserIdProof(fd);
      if (fileResult.status !== "SUCCESS") {
        return { ok: false, message: fileResult.message };
      }
    }

    const result = await updateUserProfile(data, otpContext);
    if (result.status !== "SUCCESS") {
      return { ok: false, message: result.message };
    }
    return { ok: true };
  };

  // Save validates ONLY the active tab's fields, then requests an OTP and opens
  // the verification modal. Fields on the other tabs keep their loaded values
  // (sent as-is), so the backend still receives a complete payload.
  const handleSave = async () => {
    const fieldsToValidate = TAB_FIELDS[activeTab] ?? [];
    const isValid = await methods.trigger(fieldsToValidate);
    if (!isValid) return;

    pendingValuesRef.current = methods.getValues();
    setOtpError("");
    setOtpValue("");
    setOtpSending(true);
    const res = await requestProfileEditOtp();
    setOtpSending(false);

    if (res.status === "SUCCESS" && res.mfaToken) {
      setMfaToken(res.mfaToken);
      setResendIn(60);
      setOtpModalOpen(true);
    } else {
      setErrorMessage(res.message || st("profile", "toastErrorDefault"));
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
  };

  const handleOtpVerify = async () => {
    if (otpValue.length < 6 || !pendingValuesRef.current) return;
    setOtpVerifying(true);
    setOtpError("");
    const res = await performUpdate(pendingValuesRef.current, {
      mfaToken,
      otp: otpValue,
    });
    setOtpVerifying(false);

    if (res.ok) {
      setOtpModalOpen(false);
      setOtpValue("");
      pendingValuesRef.current = null;
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } else {
      // Keep the modal open so the user can retry or resend.
      setOtpError(res.message || st("profile", "otpInvalid"));
      setOtpValue("");
    }
  };

  const handleOtpResend = async () => {
    if (resendIn > 0 || otpSending) return;
    setOtpSending(true);
    setOtpError("");
    const res = await requestProfileEditOtp();
    setOtpSending(false);
    if (res.status === "SUCCESS" && res.mfaToken) {
      setMfaToken(res.mfaToken);
      setOtpValue("");
      setResendIn(60);
    } else {
      setOtpError(res.message || st("profile", "toastErrorDefault"));
    }
  };

  const handleOtpCancel = () => {
    setOtpModalOpen(false);
    setOtpValue("");
    setOtpError("");
    pendingValuesRef.current = null;
  };

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <>
      {showSuccess && (
        <NotificationToast
          type="success"
          vPosition="bottom"
          hPosition="left"
          leadText={st("profile", "toastSuccessLead")}
          helperText={st("profile", "toastSuccessHelper")}
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      )}
      {showError && (
        <NotificationToast
          type="error"
          vPosition="bottom"
          hPosition="left"
          leadText={st("profile", "toastErrorLead")}
          helperText={errorMessage}
          open={showError}
          onClose={() => setShowError(false)}
        />
      )}

      <section
        className="section-spacing-5xl !bg-white !p-[32px] !rounded-[8px] !h-fit !mb-16"
        aria-label={st("profile", "ariaFormLabel")}
        role="form"
      >
        <DgaTabs
          className="!mb-[32px] max-md:!overflow-auto"
          orientation="horizontal"
          divider
          size="lg"
          activeTab={activeTab - 1}
          onTabChange={handleTabChange}
          tabsList={[
            {
              label: st("profile", "tabPersonalInfo"),
              tabIcon: "user",
              onClick: () => handleTabChange(1),
            },
            {
              label: st("profile", "tabEducation"),
              tabIcon: "mortarboard-02",
              onClick: () => handleTabChange(2),
            },
            {
              label: st("profile", "tabLocation"),
              tabIcon: "location-01",
              onClick: () => handleTabChange(3),
            },
          ]}
        />

        <div className="mb-[40px]" role="region" aria-live="polite">
          <FormProvider {...methods}>
            <form
              id="profile-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              {activeTab === 1 && (
                <PersonalInfoTab
                  nationalityOptions={nationalityOptions}
                  motherTongueOptions={motherTongueOptions}
                />
              )}
              {activeTab === 2 && (
                <EducationTab
                  educationOptions={educationOptions}
                  institutionOptions={institutionOptions}
                  specializationOptions={specializationOptions}
                />
              )}
              {activeTab === 3 && (
                <LocationTab
                  countryOptions={countryOptions}
                  timezoneOptions={timezoneOptions}
                />
              )}
            </form>
          </FormProvider>
        </div>
        <div className="flex gap-[12px] justify-end !pt-[24px]">
          <Button
            type="button"
            onClick={handleSave}
            disabled={otpSending || otpModalOpen}
            label={
              otpSending
                ? st("profile", "otpSending")
                : st("profile", "saveChanges")
            }
            variant="primary-brand"
            size="md"
            className="md:w-auto w-full"
          />
          <Button
            form="profile-form"
            type="button"
            label={st("profile", "cancel")}
            variant="secondary-outline"
            size="md"
            className="md:w-[100px] w-full"
            onClick={() => {
              methods.reset();
              router.push("/profile");
            }}
          />
        </div>
      </section>

      {otpModalOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="otp-modal-title"
        >
          <div className="w-full max-w-[440px] rounded-[12px] bg-white p-[32px] shadow-xl">
            <h2
              id="otp-modal-title"
              className="text-lg font-semibold text-[#101828]"
            >
              {st("profile", "otpModalTitle")}
            </h2>
            <p className="mt-2 mb-6 text-sm text-[#475467]">
              {st("profile", "otpModalDescription")}
            </p>

            <OtpInput
              value={otpValue}
              onChange={setOtpValue}
              hasError={!!otpError}
              ariaLabel={st("profile", "otpModalTitle")}
            />

            {otpError && (
              <p className="mt-3 text-sm text-[#d92d20]" role="alert">
                {otpError}
              </p>
            )}

            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={handleOtpResend}
                disabled={resendIn > 0 || otpSending}
                className="text-sm text-brand-600 underline underline-offset-2 disabled:cursor-not-allowed disabled:text-[#98a2b3] disabled:no-underline"
              >
                {resendIn > 0
                  ? st("profile", "otpResendIn").replace("{s}", String(resendIn))
                  : st("profile", "otpResend")}
              </button>
            </div>

            <div className="mt-6 flex gap-[12px]">
              <Button
                type="button"
                onClick={handleOtpVerify}
                disabled={otpValue.length < 6 || otpVerifying}
                label={
                  otpVerifying
                    ? st("profile", "otpVerifying")
                    : st("profile", "otpVerify")
                }
                variant="primary-brand"
                size="md"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleOtpCancel}
                label={st("profile", "cancel")}
                variant="secondary-outline"
                size="md"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProfileForm(props: ProfileFormProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileFormContent {...props} />
    </Suspense>
  );
}
