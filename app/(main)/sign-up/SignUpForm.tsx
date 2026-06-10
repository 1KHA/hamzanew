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
} from "@/lib/utils/phonePrefixes";
import { signUpUserSevice } from "@/app/_lib/user-service";
import { st } from "@/app/_lib/static-text";
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
      "identityFile",
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
//   Schema factory (locale-aware)
// ─────────────────────────────────────────
function createSignUpSchema(getText: (key: string) => string) {
  return z
    .object({
      /* ── Step 1 account info ── */
      email: z
        .string()
        .min(1, getText("emailRequired"))
        .email(getText("emailInvalid")),
      password: z
        .string()
        .min(1, getText("passwordRequired"))
        .min(8, getText("passwordMin"))
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
          getText("passwordWeak"),
        ),
      confirmPassword: z.string(),
      phone: z
        .string()
        .refine(
          (val) => {
            const digits = getDigitsFromPhone(val);
            return /^\d+$/.test(digits);
          },
          { message: getText("phoneDigitsOnly") },
        )
        .refine(
          (val) => {
            const digits = getDigitsFromPhone(val);
            return digits.length >= 7;
          },
          { message: getText("phoneMin7") },
        )
        .refine(
          (val) => {
            const digits = getDigitsFromPhone(val);
            return digits.length <= 12;
          },
          { message: getText("phoneMax12") },
        ),

      /* ── Step 2 personal info ── */
      firstName_ar: z.string().min(1, getText("firstNameArRequired")),
      secondName_ar: z.string().min(1, getText("secondNameArRequired")),
      lastName_ar: z.string().min(1, getText("lastNameArRequired")),
      firstName_en: z
        .string()
        .min(1, getText("firstNameEnRequired"))
        .regex(/^[a-zA-Z\s'.-]+$/, getText("englishOnly")),
      secondName_en: z
        .string()
        .min(1, getText("secondNameEnRequired"))
        .regex(/^[a-zA-Z\s'.-]+$/, getText("englishOnly")),
      lastName_en: z
        .string()
        .min(1, getText("lastNameEnRequired"))
        .regex(/^[a-zA-Z\s'.-]+$/, getText("englishOnly")),
      birthDate: z.string().min(1, getText("birthDateRequired")),
      nationality: z.string().min(1, getText("nationalityRequired")),
      motherTongue: z.any().refine((val) => val && val.key, getText("motherTongueRequired")),
      identity: z.any().refine((val) => val && val.key, getText("identityRequired")),
      identityNumber: z
        .string()
        .min(1, getText("identityNumberRequired"))
        .regex(/^\d{1,12}$/, getText("identityNumberDigitsOnly")),
      identityFile: z
        .any()
        .refine((files) => files?.length > 0, getText("identityFileRequired")),

      /* ── Step 3 education info ── */
      education: z.any().refine((val) => val && val.key, getText("educationRequired")),
      basicLanguageInEducation: z.any().refine((val) => val && val.key, getText("basicLanguageRequired")),
      institution: z.any().refine((val) => val && val.key, getText("institutionRequired")),
      specialization: z.any().refine((val) => val && val.key, getText("specializationRequired")),

      /* ── Step 4 location ── */
      timezone: z.any().refine((val) => val && val.key, getText("timezoneRequired")),
      country: z.string().min(1, getText("countryRequired")),
      state: z.string().min(1, getText("stateRequired")),
      city: z.string().min(1, getText("cityRequired")),
      postalAddress: z.string().min(1, getText("postalAddressRequired")),
      zipCode: z
        .string()
        .min(1, getText("zipCodeRequired"))
        .regex(/^\d+$/, getText("zipCodeDigitsOnly")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: getText("confirmPasswordMismatch"),
      path: ["confirmPassword"],
    });
}

export type NewUserFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;

interface SignUpFormProps {
  motherTongueOptions: any[];
  educationQualificationsOptions: any[];
  educationInstitutionsOptions: any[];
  proofOptions: any[];
  specializationOptions: any[];
  timezoneOptions: any[];
  countriesOptions: any[];
}

export default function SignUpForm({
  motherTongueOptions,
  educationQualificationsOptions,
  educationInstitutionsOptions,
  proofOptions,
  specializationOptions,
  timezoneOptions,
  countriesOptions,
}: SignUpFormProps) {
  const [activeStep, setActiveStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const newUserSchema = createSignUpSchema((key) => st("signUp", key));

  const methods = useForm<NewUserFormValues>({
    resolver: zodResolver(newUserSchema),
    defaultValues:
      process.env.NODE_ENV === "development"
        ? {
            email: "sophia.williams@example.com",
            password: "Password123!",
            confirmPassword: "Password123!",
            phone: "1501234567",
            firstName_ar: "صوفيا",
            secondName_ar: "جيمس",
            lastName_ar: "وليامز",
            firstName_en: "Sophia",
            secondName_en: "Jamce",
            lastName_en: "Williams",
            birthDate: "1998-09-11",
            nationality: "SA",
            motherTongue: motherTongueOptions[0] || { key: 1, label: "العربية" },
            identity: proofOptions[0] || { key: 1, label: "جواز سفر" },
            identityNumber: "313059213",
            identityFile: [],
            education: educationQualificationsOptions[0] || { key: 1, label: "بكالوريوس" },
            basicLanguageInEducation: motherTongueOptions[0] || { key: 1, label: "العربية" },
            institution: educationInstitutionsOptions[0] || { key: 1, label: "جامعة" },
            specialization: specializationOptions[0] || { key: 1, label: "لغويات" },
            timezone: timezoneOptions[0] || { key: 1, label: "GMT+3" },
            country: "SA",
            state: "riyadh",
            city: "riyadh_city",
            postalAddress: "123 Main St",
            zipCode: "90001",
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
            motherTongue: undefined,
            identity: undefined,
            identityNumber: "",
            identityFile: [],
            education: undefined,
            basicLanguageInEducation: undefined,
            institution: undefined,
            specialization: undefined,
            timezone: undefined,
            country: "",
            state: "",
            city: "",
            postalAddress: "",
            zipCode: "",
          },
    mode: "all",
  });

  /**
   * Final submit — called when the user clicks "إنشاء الحساب" on the last step.
   * Builds the API payload, attaches the identity file, and calls signUpUserSevice.
   */
  const onSubmit = async (data: NewUserFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // ── Build the JSON payload ──────────────────────────────────────────
      const payload = {
        firstName: data.firstName_ar,
        firstNameInEnglish: data.firstName_en,
        secondName: data.secondName_ar,
        secondNameInEnglish: data.secondName_en,
        lastName: data.lastName_ar,
        lastNameInEnglish: data.lastName_en,
        fullNameInEnglish: `${data.firstName_en} ${data.secondName_en} ${data.lastName_en}`,
        emailId: data.email,
        password: data.password,
        phoneNumber: data.phone,
        dayOfBirth: data.birthDate ? new Date(data.birthDate).getDate() : undefined,
        monthOfBirth: data.birthDate ? new Date(data.birthDate).getMonth() + 1 : undefined,
        yearOfBirth: data.birthDate ? new Date(data.birthDate).getFullYear() : undefined,
        nationality: data.nationality,
        motherTongue: data.motherTongue?.key,
        proofName: data.identity?.key,
        passportNumber: data.identityNumber,
        university: data.institution?.key,
        lastEducationalQualification: data.education?.key,
        academicSpecialization: data.specialization?.key,
        primaryLanguageOfEducation: data.basicLanguageInEducation?.key,
        timeZone: data.timezone?.key,
        country: data.country,
        state: data.state,
        city: data.city,
        street: data.postalAddress,
        postalCode: data.zipCode,
      };

      // ── Build FormData (file + JSON) ────────────────────────────────────
      const formData = new FormData();

      // Extract the actual File object from the UploadedFile array
      const uploadedFiles = data.identityFile as any[];
      if (uploadedFiles && uploadedFiles.length > 0) {
        const actualFile: File | undefined = uploadedFiles[0]?.file;
        if (actualFile) {
          formData.append("file", actualFile);
        }
      }

      formData.append("data", JSON.stringify(payload));

      // ── Call the API ────────────────────────────────────────────────────
      console.log("Sign-up payload being sent:", payload);
      const result = await signUpUserSevice(formData);
      console.log("Sign-up result:", result);

      if (result && result.status !== "FAIL") {
        // Success — advance to the confirmation screen
        setActiveStep(STEPS.length + 1);
        setSubmitted(true);
      } else {
        setSubmitError(
          result?.message ||
            "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
        );
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setSubmitError("حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
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

          {activeStep <= STEPS.length && (
            <p className="text-sm-regular sign-up-page__required-note">
              <span className="sign-up-page__required" aria-hidden="true">
                *
              </span>
              &nbsp;المعلومات المطلوبة
            </p>
          )}

          {/* ══════════════════════════════════════
              Dynamic Form Steps
          ══════════════════════════════════════ */}
          {activeStep <= STEPS.length && (
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
                      const isValid = await methods.trigger(
                        config.fields as any,
                      );
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

                    <CurrentComponent
                      motherTongueOptions={motherTongueOptions}
                      proofOptions={proofOptions}
                      countriesOptions={countriesOptions}
                      educationQualificationsOptions={educationQualificationsOptions}
                      educationInstitutionsOptions={educationInstitutionsOptions}
                      specializationOptions={specializationOptions}
                      timezoneOptions={timezoneOptions}
                    />

                    {/* API error on last step */}
                    {isLastStep && submitError && (
                      <p
                        className="sign-up-page__api-error text-sm-regular"
                        role="alert"
                        aria-live="assertive"
                      >
                        {submitError}
                      </p>
                    )}

                    <div className="sign-up-page__actions">
                      <Button
                        label={
                          isLastStep
                            ? isSubmitting
                              ? "جاري إنشاء الحساب..."
                              : "إنشاء الحساب"
                            : "التالي"
                        }
                        variant="primary-brand"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                      />
                      {stepNumber > 1 && (
                        <Button
                          label="رجوع"
                          variant="secondary"
                          size="lg"
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                        />
                      )}
                    </div>
                  </form>
                );
              })}
            </FormProvider>
          )}

          {/* ══════════════════════════════════════
              Success: تم إنشاء الحساب
          ══════════════════════════════════════ */}
          {submitted && (
            <div
              className="sign-up-page__acknowledgment"
              role="status"
              aria-live="polite"
            >
              <NotificationToast
                type="success"
                leadText="تم إنشاء حسابك بنجاح"
                helperText="يرجى مراجعة بريدك الشبكي لتفعيل الحساب وإكمال عملية التسجيل"
                open
                variant="stroke"
                inline
              />
              <Button
                label="الذهاب إلى تسجيل الدخول"
                variant="primary-brand"
                size="lg"
                onClick={() => (window.location.href = "/sign-in")}
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
