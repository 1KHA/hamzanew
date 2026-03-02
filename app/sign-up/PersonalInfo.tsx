"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import { DgaDropdown } from "platformscode-new-react";
import DateField from "../components/date-field/DateField";
import FileUpload, {
  UploadedFile,
} from "@/app/components/FileUpload/FileUpload";
import FormField from "../components/form-field/FormField";
import ControlledTextInput from "../components/form-field/ControlledTextInput";
import { NewUserFormValues } from "./page";

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

export default function PersonalInfo() {
  const {
    control,
    formState: { errors },
  } = useFormContext<NewUserFormValues>();

  const [, setIdFile] = useState<UploadedFile[]>([]);

  return (
    <div className="sign-up-page__grid">
      <FormField
        label="الاسم الاول"
        required
        error={errors.firstName_ar?.message}
        htmlFor="first-name-ar"
      >
        <ControlledTextInput
          name="firstName_ar"
          id="first-name-ar"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label="الاسم الاول (باللغة الإنجليزية)"
        required
        error={errors.firstName_en?.message}
        htmlFor="first-name-en"
      >
        <ControlledTextInput
          name="firstName_en"
          id="first-name-en"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label="الاسم الثاني"
        required
        error={errors.secondName_ar?.message}
        htmlFor="second-name-ar"
      >
        <ControlledTextInput
          name="secondName_ar"
          id="second-name-ar"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label="الاسم الثاني (باللغة الإنجليزية)"
        required
        error={errors.secondName_en?.message}
        htmlFor="second-name-en"
      >
        <ControlledTextInput
          name="secondName_en"
          id="second-name-en"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label="الاسم الأخير"
        required
        error={errors.lastName_ar?.message}
        htmlFor="last-name-ar"
      >
        <ControlledTextInput
          name="lastName_ar"
          id="last-name-ar"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label="الاسم الأخير (باللغة الإنجليزية)"
        required
        error={errors.lastName_en?.message}
        htmlFor="last-name-en"
      >
        <ControlledTextInput
          name="lastName_en"
          id="last-name-en"
          size="lg"
          variant="darker"
        />
      </FormField>

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
        label="اللغة الأم"
        required
        error={errors.motherTongue?.message}
      >
        <Controller
          name="motherTongue"
          control={control}
          render={({ field }) => (
            <DgaDropdown
              placeholder="اختر اللغة الأم"
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
        htmlFor="identity-number"
      >
        <ControlledTextInput
          name="identityNumber"
          id="identity-number"
          size="lg"
          variant="darker"
        />
      </FormField>

      <div className="dga-form-control dga-form-control--fullwidth sign-up-page__field--full">
        <span className="dga-label dga-label--lg">ارفق نسخة من الاثبات</span>
        <FileUpload
          fileTypesText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وتشمل الصيغ الدعومة .jpg و .png و .pdf."
          accept="image/*,.pdf"
          actionName="تصفح الملفات"
          showIcon={false}
          getUploadedFile={(files: UploadedFile[]) => setIdFile(files)}
        />
      </div>
    </div>
  );
}
