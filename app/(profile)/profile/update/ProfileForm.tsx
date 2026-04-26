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

// ─────────────────────────────────────────
//   Schema defined
// ─────────────────────────────────────────
const userProfileSchema = z.object({
  // Account Info
  email: z
    .string()
    .min(1, "البريد الشبكي مطلوب")
    .email("البريد الشبكي غير صحيح"),
  password: z.string().min(8, "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل"),
  phone: z
    .string()
    .regex(/^\d+$/, "يجب أن يحتوي رقم الجوال على أرقام فقط")
    .refine(
      (val) => {
        const digits = getDigitsFromPhone(val);
        return digits.length >= 7;
      },
      { message: "رقم الجوال غير صحيح (7 أرقام على الأقل بعد رمز الدولة)" },
    ),
  // Personal Info
  firstName_ar: z.string().min(1, "الاسم الأول مطلوب"),
  secondName_ar: z.string().min(1, "الاسم الثاني مطلوب"),
  lastName_ar: z.string().min(1, "الاسم الأخير مطلوب"),
  firstName_en: z.string().min(1, "الاسم الأول باللغة الإنجليزية مطلوب"),
  secondName_en: z.string().min(1, "الاسم الثاني باللغة الإنجليزية مطلوب"),
  lastName_en: z.string().min(1, "الاسم الأخير باللغة الإنجليزية مطلوب"),
  birthDate: z.string().min(1, "تاريخ الميلاد مطلوب"),
  nationality: z.string().min(1, "الجنسية مطلوبة"),
  motherTongue: z.string().min(1, "اللغة الأم مطلوبة"),
  identity: z.string().min(1, "الإثبات مطلوب"),
  identityNumber: z.string().min(1, "رقم الإثبات مطلوب"),
  identityFile: z
    .any()
    .refine((files) => files?.length > 0, "نسخة من الإثبات مطلوبة"),
  // Education
  education: z.string().min(1, "المؤهل الدراسي مطلوب"),
  basicLanguageInEducation: z.string().min(1, "لغة التعليم مطلوبة"),
  institution: z.string().min(1, "المؤسسة مطلوبة"),
  specialization: z.string().min(1, "التخصص مطلوب"),
  // Location
  timezone: z.string().min(1, "المنطقة الزمنية مطلوبة"),
  country: z.string().min(1, "الدولة مطلوبة"),
  state: z.string().min(1, "المنطقة مطلوبة"),
  city: z.string().min(1, "المدينة مطلوبة"),
  postalAddress: z.string().min(1, "العنوان البريدي مطلوب"),
  zipCode: z.string().min(1, "الرمز البريدي مطلوب"),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;

export interface DropdownOption {
  name: string;
  value: string;
}

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
        setErrorMessage(result.message || "فشل تحديث الملف الشخصي");
        setShowError(true);
        setTimeout(() => setShowError(false), 5000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("حدث خطأ أثناء تحديث الملف الشخصي");
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
          leadText="نجاح"
          helperText="تم تحديث الملف الشخصي بنجاح"
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      )}
      {showError && (
        <NotificationToast
          type="error"
          vPosition="bottom"
          hPosition="left"
          leadText="خطأ"
          helperText={errorMessage}
          open={showError}
          onClose={() => setShowError(false)}
        />
      )}

      <section
        className="section-spacing-5xl !bg-white !p-[32px] !rounded-[8px] !h-fit !mb-16"
        aria-label="نموذج الملف اشخصي"
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
              label: "المعلومات الشخصية",
              tabIcon: "user",
              onClick: () => handleTabChange(1),
            },
            {
              label: "المؤهلات الدراسية",
              tabIcon: "mortarboard-02",
              onClick: () => handleTabChange(2),
            },
            {
              label: "الموقع",
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
            label="حفظ التغييرات"
            variant="primary-brand"
            size="md"
            className="md:w-[100px] w-full"
          />
          <Button
            form="profile-form"
            type="button"
            label="إلغاء"
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
