"use client";

import { useFormContext, Controller } from "react-hook-form";
import Dropdown from "@/app/components/dropdown/Dropdown";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
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
              className="w-full"
              value={field.value}
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
        <ControlledTextInput
          placeholder="المؤسسة التعليمية"
          name="institution"
          control={control}
          render={({ field }) => (
            <DgaDropdown
              placeholder="اختر المؤسسة"
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={educationInstitutionsOptions}
              className="w-full"
              value={field.value}
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
        <ControlledTextInput
          placeholder="التخصص الدراسي"
          name="specialization"
          control={control}
          render={({ field }) => (
            <DgaDropdown
              placeholder="اختر التخصص"
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={specializationOptions}
              className="w-full"
              value={field.value}
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
              className="w-full"
              value={field.value}
              getSelectedOptions={(opt: any) => field.onChange(opt)}
            />
          )}
        />
      </FormField>
    </div>
  );
}
