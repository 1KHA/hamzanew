"use client";

import { useFormContext, Controller } from "react-hook-form";
import Dropdown from "@/app/components/dropdown/Dropdown";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import { NewUserFormValues } from "./page";

const DEGREE_OPTIONS = [
  { name: "ثانوية عامة", value: "high_school" },
  { name: "دبلوم", value: "diploma" },
  { name: "بكالوريوس", value: "bachelor" },
  { name: "ماجستير", value: "master" },
  { name: "دكتوراه", value: "phd" },
];

const LANGUAGE_OPTIONS = [
  { name: "العربية", value: "ar" },
  { name: "الإنجليزية", value: "en" },
  { name: "الفرنسية", value: "fr" },
  { name: "أخرى", value: "other" },
];

export default function EducationInfo() {
  const {
    control,
    formState: { errors },
  } = useFormContext<NewUserFormValues>();

  return (
    <div className="sign-up-page__grid">
      <FormField
        label="آخر مؤهل دراسي"
        required
        error={errors.education?.message}
      >
        <Controller
          name="education"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="اختر المؤهل"
              size="lg"
              variant="darker"
              optionLabel="name"
              trackBy="value"
              options={DEGREE_OPTIONS}
              extraClass="w-full"
              value={field.value}
              getSelectedOptions={(opt: any) => field.onChange(opt.value)}
            />
          )}
        />
      </FormField>

      <FormField
        label="المؤسسة التعليمية"
        required
        error={errors.institution?.message}
        htmlFor="input-institution"
      >
        <ControlledTextInput
          placeholder="المؤسسة التعليمية"
          name="institution"
          id="input-institution"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label="التخصص الدراسي"
        required
        error={errors.specialization?.message}
        htmlFor="input-specialization"
      >
        <ControlledTextInput
          placeholder="التخصص الدراسي"
          name="specialization"
          id="input-specialization"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label="اللغة الأساسية في التعليم"
        required
        error={errors.basicLanguageInEducation?.message}
      >
        <Controller
          name="basicLanguageInEducation"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="اختر اللغة"
              size="lg"
              variant="darker"
              optionLabel="name"
              trackBy="value"
              options={LANGUAGE_OPTIONS}
              extraClass="w-full"
              value={field.value}
              getSelectedOptions={(opt: any) => field.onChange(opt.value)}
            />
          )}
        />
      </FormField>
    </div>
  );
}
