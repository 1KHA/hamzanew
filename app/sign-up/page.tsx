"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import ProgressIndicator from "@/app/components/progress-indicator/ProgressIndicator";
import Button from "@/app/components/button/Button";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  DEFAULT_PREFIX,
  getDigitsFromPhone,
  getPrefixFromPhone,
} from "@/app/profile/_data/phonePrefixes";
import "@/app/styles/Button.css";
import "./sign-up.css";
import AccountInfo from "./AccountInfo";
import PersonalInfo from "./PersonalInfo";
import EducationInfo from "./EducationInfo";
import LocationInfo from "./LocationInfo";

const STEPS = [
  { title: "معلومات الحساب", description: "وصف الخطوة" },
  { title: "المعلومات الشخصية", description: "وصف الخطوة" },
  { title: "المؤهلات الدراسية", description: "وصف الخطوة" },
  { title: "الموقع", description: "وصف الخطوة" },
];

const STEP_CONFIG = [
  {
    component: AccountInfo,
    fields: ["email", "phone", "password", "confirmPassword"],
  },
  {
    component: PersonalInfo,
    fields: [
      "firstName_ar",
      "firstName_en",
      "secondName_ar",
      "secondName_en",
      "lastName_ar",
      "lastName_en",
      "birthDate",
      "nationality",
      "motherTongue",
      "identity",
      "identityNumber",
    ],
  },
  {
    component: EducationInfo,
    fields: [
      "education",
      "basicLanguageInEducation",
      "institution",
      "specialization",
    ],
  },
  {
    component: LocationInfo,
    fields: [],
  },
];

// ─────────────────────────────────────────
//   Schema defined
// ─────────────────────────────────────────
const newUserSchema = z
  .object({
    /* ── Step 1 account info ── */
    email: z
      .string()
      .min(1, "البريد الشبكي مطلوب")
      .email("البريد الشبكي غير صحيح"),
    password: z
      .string()
      .min(8, "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل"),
    confirmPassword: z.string(),
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

    /* ── Step 2 personal info ── */
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

    /* ── Step 3 education info ── */
    education: z.string().min(1, "المؤهل الدراسي مطلوب"),
    basicLanguageInEducation: z.string().min(1, "لغة التعليم مطلوبة"),
    institution: z.string().min(1, "المؤسسة مطلوبة"),
    specialization: z.string().min(1, "التخصص مطلوب"),

    /* ── Step 4 location ── */
    timezone: z.string().min(1, "المنطقة الزمنية مطلوبة"),
    country: z.string().min(1, "الدولة مطلوبة"),
    state: z.string().min(1, "المنطقة مطلوبة"),
    city: z.string().min(1, "المدينة مطلوبة"),
    postalAddress: z.string().min(1, "العنوان البريدي مطلوب"),
    zipCode: z.string().min(1, "الرمز البريدي مطلوب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات السر غير متطابقة",
    path: ["confirmPassword"],
  });
export type NewUserFormValues = z.infer<typeof newUserSchema>;

export default function SignUpPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema),
    defaultValues:
      process.env.NODE_ENV === "development"
        ? {
            email: "testuser@example.com",
            password: "Password123",
            confirmPassword: "Password123",
            phone: "966555123456",
            firstName_ar: "أحمد",
            secondName_ar: "محمد",
            lastName_ar: "علي",
            firstName_en: "Ahmed",
            secondName_en: "Mohammed",
            lastName_en: "Ali",
            birthDate: "1995-05-15",
            nationality: "SA",
            motherTongue: "ar",
            identity: "national_id",
            identityNumber: "1055555555",
            education: "bachelor",
            basicLanguageInEducation: "ar",
            institution: "جامعة الملك سعود",
            specialization: "هندسة برمجيات",
            timezone: "Asia/Riyadh",
            country: "SA",
            state: "riyadh",
            city: "riyadh_city",
            postalAddress: "طريق الملك فهد",
            zipCode: "12211",
          }
        : {
            email: "",
            password: "",
            confirmPassword: "",
            phone: (() => {
              const raw = "";
              const hasPrefix =
                getPrefixFromPhone(raw).value !== DEFAULT_PREFIX.value ||
                raw.startsWith(DEFAULT_PREFIX.value);
              return hasPrefix ? raw : DEFAULT_PREFIX.value + raw;
            })(),
            firstName_ar: "",
            secondName_ar: "",
            lastName_ar: "",
            firstName_en: "",
            secondName_en: "",
            lastName_en: "",
            birthDate: "",
            nationality: "",
            motherTongue: "",
            identity: "",
            identityNumber: "",
            education: "",
            basicLanguageInEducation: "",
            institution: "",
            specialization: "",
            timezone: "",
            country: "",
            state: "",
            city: "",
            postalAddress: "",
            zipCode: "",
          },
    mode: "all",
  });

  const onSubmit = (data: NewUserFormValues) => {
    console.log("Form Submitted ✅", data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleNext = () => {
    if (activeStep === STEPS.length) {
      setActiveStep(STEPS.length + 1);
      setSubmitted(true);
    } else {
      setActiveStep((s) => s + 1);
    }
  };
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 1));
  const {
    formState: { errors },
  } = methods;
  return (
    <div className="sign-up-page-wrapper">
      <div className="sign-up-page">
        {/* ── Right panel: Form ── */}
        <div className="sign-up-page__content">
          <div className="sign-up-page__header">
            <h1 className="display-sm-bold">إنشاء حساب جديد</h1>
            <p className="text-md-regular sign-up-page__subtitle">
              أنشئ حسابك في منصة اختبارات همزة بسهولة عبر إدخال بياناتك الأساسية
              .
              <br />
              بمجرد التسجيل يمكنك الوصول للاختبارات، متابعة النتائج، وإدارة ملفك
              الشخصي.
            </p>
          </div>

          <p className="text-sm-regular sign-up-page__required-note">
            <span className="sign-up-page__required" aria-hidden="true">
              *
            </span>
            &nbsp;المعلومات المطلوبة
          </p>

          {/* ══════════════════════════════════════
              Dynamic Form Steps
          ══════════════════════════════════════ */}
          <FormProvider {...methods}>
            {STEP_CONFIG.map((config, index) => {
              const stepNumber = index + 1;
              if (activeStep !== stepNumber) return null;

              const CurrentComponent = config.component;
              const isLastStep = stepNumber === STEPS.length;

              const handleStepSubmit = isLastStep
                ? methods.handleSubmit(onSubmit)
                : async (e: React.FormEvent) => {
                    e.preventDefault();
                    const isValid = await methods.trigger(config.fields as any);
                    if (isValid) {
                      handleNext();
                    }
                  };

              return (
                <form
                  key={stepNumber}
                  className="sign-up-page__form"
                  onSubmit={handleStepSubmit}
                >
                  <h2 className="text-md-bold sign-up-page__section-title">
                    {STEPS[index].title}
                  </h2>

                  <CurrentComponent />

                  <div className="sign-up-page__actions">
                    <Button
                      label={isLastStep ? "إنشاء الحساب" : "التالي"}
                      variant="primary-brand"
                      size="lg"
                      type="submit"
                    />
                    {stepNumber > 1 && (
                      <Button
                        label="رجوع"
                        variant="secondary"
                        size="lg"
                        type="button"
                        onClick={handleBack}
                      />
                    )}
                  </div>
                </form>
              );
            })}
          </FormProvider>
          {/* ══════════════════════════════════════
              Success: تم إنشاء الحساب
          ══════════════════════════════════════ */}
          {submitted && (
            <div role="status" aria-live="polite">
              <NotificationToast
                type="success"
                leadText="تم إنشاء حسابك بنجاح"
                helperText="يرجى مراجعة بريدك الشبكي لتفعيل الحساب وإكمال عملية التسجيل"
                open
                variant="stroke"
                inline
              />
            </div>
          )}
        </div>
        {/* /.sign-up-page__content */}

        {/* ── Left panel: Progress Indicator ── */}
        <aside
          className="sign-up-page__sidebar"
          aria-label="خطوات إنشاء الحساب"
        >
          <ProgressIndicator
            steps={STEPS}
            activeStep={activeStep}
            alignment="vertical"
          />
        </aside>
      </div>
    </div>
  );
}
