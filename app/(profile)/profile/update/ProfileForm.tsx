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
import mockUserInfo from "../_data/mockUserInfo.json";
import {
  getPrefixFromPhone,
  DEFAULT_PREFIX,
  getDigitsFromPhone,
} from "@/lib/utils/phonePrefixes";
import SideNav from "@/app/components/side-nav/SideNav";

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

// Export the type so tab components can use it with useFormContext<UserProfileFormValues>()
export type UserProfileFormValues = z.infer<typeof userProfileSchema>;

/**
 * ProfileForm Component (Client Component)
 *
 * A comprehensive user profile management interface with tabbed navigation.
 * Allows users to manage account information, personal details, educational qualifications,
 * and location data through an intuitive multi-tab interface.
 *
 * @component
 * @returns {JSX.Element} The complete user profile form with tabs
 */
function ProfileFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log(searchParams);
  const rawTab = searchParams.get("tab");
  const parsedTab = rawTab ? parseInt(rawTab, 10) : 1;
  const initialTabId =
    !isNaN(parsedTab) && parsedTab >= 1 && parsedTab <= 3 ? parsedTab : 1;
  const [activeTab, setActiveTab] = useState<number>(initialTabId);
  const [showSuccess, setShowSuccess] = useState(false);

  // Single hook replaces: useState(userInfo), useState(errors),
  //    handleInputChange, handleBlur, validateField, and handleSubmit
  const methods = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      email: mockUserInfo.email || "",
      password: mockUserInfo.password || "",
      // Ensure a prefix is always stored — use DEFAULT_PREFIX if the
      // stored value doesn't already start with a known country code
      phone: (() => {
        const raw = mockUserInfo.phone || "";
        const hasPrefix =
          getPrefixFromPhone(raw).value !== DEFAULT_PREFIX.value ||
          raw.startsWith(DEFAULT_PREFIX.value);
        return hasPrefix ? raw : DEFAULT_PREFIX.value + raw;
      })(),
      firstName_ar: mockUserInfo.firstName_ar || "",
      secondName_ar: mockUserInfo.middleName_ar || "",
      lastName_ar: mockUserInfo.lastName_ar || "",
      firstName_en: mockUserInfo.firstName_en || "",
      secondName_en: mockUserInfo.middleName_en || "",
      lastName_en: mockUserInfo.lastName_en || "",
      birthDate: mockUserInfo.birthDate || "",
      nationality: mockUserInfo.nationality || "",
      motherTongue: mockUserInfo.motherTongue || "",
      identity: mockUserInfo.identity || "",
      identityNumber: mockUserInfo.identityNumber || "",
      identityFile: mockUserInfo.identityFile || "",
      education: mockUserInfo.education || "",
      basicLanguageInEducation: mockUserInfo.basicLanguageInEducation || "",
      institution: mockUserInfo.institution || "",
      specialization: mockUserInfo.specialization || "",
      timezone: mockUserInfo.timezone || "",
      country: mockUserInfo.country || "",
      state: mockUserInfo.state || "",
      city: mockUserInfo.city || "",
      postalAddress: mockUserInfo.postalAddress || "",
      zipCode: mockUserInfo.zipCode || "",
    },
    mode: "all",
  });

  const onSubmit = (data: UserProfileFormValues) => {
    console.log("Form Submitted ✅", data);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };
  console.log(activeTab);

  // The DgaTabs component accepts a 0-indexed 'activeTab' prop
  // This makes sure React state natively handles DOM styling!
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

      <section
        className="section-spacing-5xl !bg-white !p-[32px] !rounded-[8px] !h-fit !mb-16"
        aria-label="نموذج الملف اشخصي"
        role="form"
      >
        {/* Tabbed Navigation Interface */}
        <DgaTabs
          className="!mb-[32px] max-md:!overflow-auto"
          orientation="horizontal"
          divider
          size="lg"
          activeTab={activeTab - 1}
          onTabChange={handleTabChange}
          tabsList={[
            // {
            //   label: "معلومات الحساب",
            //   tabIcon: "square-lock-02",
            //   onClick: () => handleTabChange(1),
            // },
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

        {/* Tab Content */}
        <div className="mb-[40px]" role="region" aria-live="polite">
          <FormProvider {...methods}>
            <form id="profile-form" onSubmit={methods.handleSubmit(onSubmit)}>
              {activeTab === 1 && <PersonalInfoTab />}
              {activeTab === 2 && <EducationTab />}
              {activeTab === 3 && <LocationTab />}
            </form>
          </FormProvider>
        </div>
        {/* Form Actions — linked via form id */}
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

import { Suspense } from "react";
import Button from "@/app/components/button/Button";

export default function ProfileForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileFormContent />
    </Suspense>
  );
}
