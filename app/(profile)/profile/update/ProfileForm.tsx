"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DgaTabs } from "@/app/components/tabs/DgaTabs";
import "@/app/(main)/e-participation/(special)/feedback-and-suggestion/feedback-form.css";
import PersonalInfoTab from "../_component/PersonalInfoTab";
import EducationTab from "../_component/EducationTab";
import LocationTab from "../_component/LocationTab";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  getPrefixFromPhone,
  DEFAULT_PREFIX,
  getDigitsFromPhone,
} from "@/lib/utils/phonePrefixes";
import { updateUserProfile } from "@/app/_lib/profile-actions";
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
    password: z.string().min(8, getText("valPasswordMin")),
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
    identityFile: z
      .any()
      .refine((files) => files?.length > 0, getText("valIdentityFileRequired")),
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

  const userProfileSchema = createProfileSchema((key) => st("profile", key));

  const methods = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: buildDefaultValues(initialValues),
    mode: "all",
  });

  const onSubmit = async (data: UserProfileFormValues) => {
    try {
      const result = await updateUserProfile(data);
      if (result.status === "SUCCESS") {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setErrorMessage(result.message || st("profile", "toastErrorDefault"));
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage(st("profile", "toastErrorDefault"));
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    }
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
            <form id="profile-form" onSubmit={methods.handleSubmit(onSubmit)}>
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
            form="profile-form"
            type="submit"
            label={st("profile", "saveChanges")}
            variant="primary-brand"
            size="md"
            className="md:w-[100px] w-full"
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
