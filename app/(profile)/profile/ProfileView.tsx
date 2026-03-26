"use client";
import Button from "@/app/components/button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import mockUserInfo from "./_data/mockUserInfo.json";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import "./ProfileView.css";

const accountSchema = z.object({
  oldPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
  newPassword: z
    .string()
    .min(8, "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل"),
});

type AccountFormValues = z.infer<typeof accountSchema>;

interface InfoField {
  label: string;
  value: React.ReactNode;
}

interface InfoTableProps {
  title: string;
  rows: InfoField[][];
  editTabId: number; // Prop to specify which tab should be active in the edit view
}

function InfoTable({ title, rows, editTabId }: InfoTableProps) {
  const router = useRouter();
  return (
    <div className="info-table">
      {/* Header */}
      <div className="info-table__header">
        <h3 className="text-md-bold !text-neutral-900">{title}</h3>
        <Button
          label="تعديل"
          icon="edit-02"
          variant="secondary-outline"
          iconPosition="left"
          size="sm"
          onClick={() => {
            // Include the tabId in the URL query parameters
            router.push(`/profile/update?tab=${editTabId}`);
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4 !gap-6 !p-6 !border-b !border-neutral-100"
          >
            {row.map((field, colIndex) => (
              <div key={colIndex} className="info-table__field">
                <span className="text-sm-regular !text-[#6C737F]">
                  {field.label}
                </span>
                <span className="text-md-medium !text-[#1F2A37] flex items-center justify-start gap-2">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfileView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentView = searchParams.get("view");

  const methods = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: AccountFormValues) => {
    console.log("Form Submitted:", data);
  };

  const nationalityMap: Record<string, string> = {
    KW: "كويتي",
    SA: "سعودي",
    US: "أمريكي",
  };
  const langMap: Record<string, string> = { ar: "العربية", en: "الإنجليزية" };
  const identityMap: Record<string, string> = {
    national_id: "هوية وطنية",
    passport: "جواز سفر",
  };
  const educationMap: Record<string, string> = {
    bachelor: "بكالوريوس",
    master: "ماجستير",
    phd: "دكتوراه",
  };

  const personalInfoRows = [
    [
      { label: "الاسم الاول بالعربي", value: mockUserInfo.firstName_ar || "-" },
      {
        label: "الاسم الثاني بالعربي",
        value: mockUserInfo.middleName_ar || "-",
      },
      { label: "الاسم الثالث بالعربي", value: mockUserInfo.lastName_ar || "-" },
      {
        label: "الاسم الاول بالانجليزي",
        value: mockUserInfo.firstName_en || "-",
      },
      {
        label: "الاسم الثاني بالانجليزي",
        value: mockUserInfo.middleName_en || "-",
      },
      {
        label: "الاسم الثالث بالانجليزي",
        value: mockUserInfo.lastName_en || "-",
      },
      {
        label: "البريد الالكتروني",
        value: mockUserInfo.email || "-",
      },
      { label: "رقم الجوال", value: mockUserInfo.phone || "-" },
      {
        label: "تاريخ الميلاد",
        value: (
          <>
            <img
              src="/assets/icons/stroke-standard/calendar-03-stroke-rounded.svg"
              width={20}
              height={20}
              className="gray-icon"
              alt=""
            />
            <span>{mockUserInfo.birthDate || "-"}</span>
          </>
        ),
      },
    ],
    [
      {
        label: "الجنسية",
        value:
          nationalityMap[mockUserInfo.nationality] ||
          mockUserInfo.nationality ||
          "-",
      },
      {
        label: "لغة الأم",
        value:
          langMap[mockUserInfo.motherTongue] ||
          mockUserInfo.motherTongue ||
          "-",
      },
      {
        label: "الإثبات",
        value:
          identityMap[mockUserInfo.identity] || mockUserInfo.identity || "-",
      },
      {
        label: "رقم الإثبات",
        value: (
          <>
            <img
              src="/assets/icons/stroke-standard/identity-card-stroke-rounded.svg"
              width={20}
              height={20}
              className="gray-icon"
              alt=""
            />
            <span>{mockUserInfo.identityNumber || "-"}</span>
          </>
        ),
      },
    ],
  ];

  const educationInfoRows = [
    [
      {
        label: "المؤهل الدراسي",
        value:
          educationMap[mockUserInfo.education] || mockUserInfo.education || "-",
      },
      { label: "التخصص", value: mockUserInfo.specialization || "-" },
      { label: "الجامعة", value: mockUserInfo.institution || "-" },
      {
        label: "اللغة الأساسية في التعليم",
        value: (
          <span>
            {langMap[mockUserInfo.basicLanguageInEducation] ||
              mockUserInfo.basicLanguageInEducation ||
              "-"}
          </span>
        ),
      },
    ],
  ];

  const locationInfoRows = [
    [
      {
        label: "الدولة",
        value: mockUserInfo.country || "-",
      },
      { label: "المنطقة", value: mockUserInfo.state || "-" },
      { label: "المدينة", value: mockUserInfo.city || "-" },
      {
        label: "العنوان البريدي",
        value: <span>{mockUserInfo.postalAddress || "-"}</span>,
      },
      {
        label: "الرمز البريدي",
        value: <span>{mockUserInfo.zipCode || "-"}</span>,
      },
    ],
  ];
  if (currentView === "security") {
    return (
      <div className="flex flex-col gap-6">
        <FormProvider {...methods}>
          <form
            id="security-info-form"
            onSubmit={methods.handleSubmit(onSubmit)}
            className="info-table"
          >
            {/* Header */}
            <div className="info-table__header">
              <h3 className="text-md-bold !text-neutral-900">كلمة المرور</h3>
            </div>

            {/* Content */}
            <div className="!grid !grid-cols-1 md:!grid-cols-3 !p-[32px]">
              <div className="flex flex-col gap-8">
                <FormField
                  label="كلمة المرور القديمة"
                  error={methods.formState.errors.oldPassword?.message}
                >
                  <ControlledTextInput
                    name="oldPassword"
                    type="password"
                    size="lg"
                    variant="darker"
                  />
                </FormField>
                <FormField
                  label="كلمة المرور الجديدة"
                  error={methods.formState.errors.newPassword?.message}
                >
                  <ControlledTextInput
                    name="newPassword"
                    type="password"
                    size="lg"
                    variant="darker"
                  />
                </FormField>
              </div>
            </div>
            {/* Form Actions — linked via form id */}
            <div className="flex gap-[12px] justify-end !p-[24px]">
              <Button
                form="security-info-form"
                type="submit"
                label="حفظ التغييرات"
                variant="primary-brand"
                size="md"
                className="md:w-[100px] w-full"
              />
              <Button
                form="security-info-form"
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
          </form>
        </FormProvider>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      <InfoTable
        title="المعلومات الشخصية"
        rows={personalInfoRows}
        editTabId={1}
      />
      <InfoTable
        title="المعلومات الدراسية"
        rows={educationInfoRows}
        editTabId={2}
      />
      <InfoTable title="معلومات الموقع" rows={locationInfoRows} editTabId={3} />
    </div>
  );
}
