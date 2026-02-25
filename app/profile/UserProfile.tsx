"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { DgaTabs } from "../components/tabs/DgaTabs";
import "@/app/e-participation/(special)/feedback-and-suggestion/feedback-form.css";
import AccountInfoTab from "./_component/AccountInfoTab";
import PersonalInfoTab from "./_component/PersonalInfoTab";
import EducationTab from "./_component/EducationTab";
import LocationTab from "./_component/LocationTab";
import NotificationToast from "../components/notification-toast/NotificationToast";
import mockUserInfo from "./_data/mockUserInfo.json";
import {
  getPrefixFromPhone,
  DEFAULT_PREFIX,
  getDigitsFromPhone,
} from "./_data/phonePrefixes";

// ─────────────────────────────────────────
//   Schema defined here, inside this file
// ─────────────────────────────────────────
const userProfileSchema = z.object({
  // Account Info
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(8, "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل"),
  phone: z.string().refine(
    (val) => {
      // Use getDigitsFromPhone to correctly strip the prefix based on the
      // actual PHONE_PREFIXES list — handles variable-length prefixes
      // (e.g. +1 vs +1787) correctly, unlike a generic regex.
      const digits = getDigitsFromPhone(val);
      return digits.length >= 7;
    },
    { message: "رقم الجوال غير صحيح (7 أرقام على الأقل بعد رمز الدولة)" },
  ),
  // Personal Info
  firstName_ar: z.string().min(1, "الاسم الأول مطلوب"),
  secondName_ar: z.string().min(1, "الاسم الثاني مطلوب"),
  lastName_ar: z.string().min(1, "الاسم الأخير مطلوب"),
  firstName_en: z.string().min(1, "First name is required"),
  secondName_en: z.string().min(1, "Second name is required"),
  lastName_en: z.string().min(1, "Last name is required"),
  birthDate: z.string().min(1, "تاريخ الميلاد مطلوب"),
  nationality: z.string().min(1, "الجنسية مطلوبة"),
  motherTongue: z.string().min(1, "اللغة الأم مطلوبة"),
  identity: z.string().min(1, "الإثبات مطلوب"),
  identityNumber: z.string().min(1, "رقم الإثبات مطلوب"),
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
 * UserProfile Component (Client Component)
 *
 * A comprehensive user profile management interface with tabbed navigation.
 * Allows users to manage account information, personal details, educational qualifications,
 * and location data through an intuitive multi-tab interface.
 *
 * @component
 * @returns {JSX.Element} The complete user profile form with tabs
 */
export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<number>(1);
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
      firstName_ar: mockUserInfo.fullName_ar?.split(" ")[0] || "",
      secondName_ar: mockUserInfo.fullName_ar?.split(" ")[1] || "",
      lastName_ar: mockUserInfo.fullName_ar?.split(" ")[2] || "",
      firstName_en: mockUserInfo.fullName_en?.split(" ")[0] || "",
      secondName_en: mockUserInfo.fullName_en?.split(" ")[1] || "",
      lastName_en: mockUserInfo.fullName_en?.split(" ")[2] || "",
      birthDate: mockUserInfo.birthDate || "",
      nationality: mockUserInfo.nationality || "",
      motherTongue: mockUserInfo.motherTongue || "",
      identity: mockUserInfo.identity || "",
      identityNumber: mockUserInfo.identityNumber || "",
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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const firstTab = document.querySelector(
        ".dga-tabs-list__item:first-child",
      );
      if (firstTab) {
        firstTab.classList.add("dga-tabs-list__item--active");
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
    const allTabs = document.querySelectorAll(".dga-tabs-list__item");
    allTabs.forEach((tab) =>
      tab.classList.remove("dga-tabs-list__item--active"),
    );
    const activeTabElement = allTabs[tabId - 1];
    if (activeTabElement) {
      activeTabElement.classList.add("dga-tabs-list__item--active");
    }
  };

  return (
    <section
      className="section-spacing-5xl !bg-white !p-[32px] !rounded-[8px] !h-fit !mb-[80px]"
      aria-label="نموذج الملف الشخصي"
      role="form"
    >
      {/* Tabbed Navigation Interface */}
      <DgaTabs
        className="!mb-[32px] max-md:!overflow-auto"
        orientation="horizontal"
        divider
        size="lg"
        tabsList={[
          {
            label: "معلومات الحساب",
            tabIcon: "square-lock-02",
            onClick: () => handleTabChange(1),
          },
          {
            label: "المعلومات الشخصية",
            tabIcon: "user",
            onClick: () => handleTabChange(2),
          },
          {
            label: "المؤهلات الدراسية",
            tabIcon: "mortarboard-02",
            onClick: () => handleTabChange(3),
          },
          {
            label: "الموقع",
            tabIcon: "location-01",
            onClick: () => handleTabChange(4),
          },
        ]}
      />

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

      {/* Tab Content Container */}
      <div className="mb-[40px] head" role="region" aria-live="polite">
        <div className="!space-y-[16px]">
          {/* FormProvider shares form context to all child tab components */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {activeTab === 1 && <AccountInfoTab />}
              {activeTab === 2 && <PersonalInfoTab />}
              {activeTab === 3 && <EducationTab />}
              {activeTab === 4 && <LocationTab />}
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
