"use client";

import { useFormContext, Controller } from "react-hook-form";
import Dropdown from "@/app/components/dropdown/Dropdown";
import FormField from "@/app/components/form-field/FormField";
import { NewUserFormValues } from "./SignUpForm";

interface EducationInfoProps {
  educationQualificationsOptions: any[];
  educationInstitutionsOptions: any[];
  specializationOptions: any[];
  motherTongueOptions: any[];
}

export default function EducationInfo({
  educationQualificationsOptions,
  educationInstitutionsOptions,
  specializationOptions,
  motherTongueOptions,
}: EducationInfoProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<NewUserFormValues>();

  return (
    <div className="sign-up-page__grid">
      <FormField
        label="آخر مؤهل دراسي"
        required
        error={errors.education?.message as string | undefined}
      >
        <Controller
          name="education"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="اختر المؤهل"
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={educationQualificationsOptions}
              extraClass="w-full"
              value={field.value?.key}
              getSelectedOptions={(opt: any) => field.onChange(opt)}
            />
          )}
        />
      </FormField>

      <FormField
        label="المؤسسة التعليمية"
        required
        error={errors.institution?.message as string | undefined}
      >
        <Controller
          name="institution"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="اختر المؤسسة"
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={educationInstitutionsOptions}
              extraClass="w-full"
              value={field.value?.key}
              getSelectedOptions={(opt: any) => field.onChange(opt)}
            />
          )}
        />
      </FormField>

      <FormField
        label="التخصص الدراسي"
        required
        error={errors.specialization?.message as string | undefined}
      >
        <Controller
          name="specialization"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="اختر التخصص"
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={specializationOptions}
              extraClass="w-full"
              value={field.value?.key}
              getSelectedOptions={(opt: any) => field.onChange(opt)}
            />
          )}
        />
      </FormField>

      <FormField
        label="اللغة الأساسية في التعليم"
        required
        error={errors.basicLanguageInEducation?.message as string | undefined}
      >
        <Controller
          name="basicLanguageInEducation"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="اختر اللغة"
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={motherTongueOptions}
              extraClass="w-full"
              value={field.value?.key}
              getSelectedOptions={(opt: any) => field.onChange(opt)}
            />
          )}
        />
      </FormField>
    </div>
  );
}
