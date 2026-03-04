import { Controller, useFormContext } from "react-hook-form";
import FileUpload from "../../components/FileUpload/FileUpload";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../UserProfile";
import DateField from "@/app/components/date-field/DateField";
import { DgaDropdown } from "platformscode-new-react";
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
    formState: { errors },
  } = useFormContext<UserProfileFormValues>();

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
        <FormField label="ارفق نسخة من الاثبات" required>
          <FileUpload
            name="identityProof"
            fileTypesText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وصيغ الملفات المدعومة تشمل .jpg و .png و .pdf."
            accept="image/*,.pdf"
            actionName="تصفح الملفات"
            showIcon={false}
            getUploadedFile={() => {}}
          />
        </FormField>
      </div>
    </div>
  );
}
