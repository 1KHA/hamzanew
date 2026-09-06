"use client";

import { useFormContext, Controller } from "react-hook-form";
import Dropdown from "@/app/components/dropdown/Dropdown";
import FormField from "@/app/components/form-field/FormField";
import { NewUserFormValues } from "./SignUpForm";
import { st } from "@/app/_lib/static-text";

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

  const t = (key: string) => st("signUp", key);

  return (
    <div className="sign-up-page__grid">
      <FormField
        label={t("educationLabel")}
        required
        error={errors.education?.message as string | undefined}
      >
        <Controller
          name="education"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("educationPlaceholder")}
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
        label={t("institutionLabel")}
        required
        error={errors.institution?.message as string | undefined}
      >
        <Controller
          name="institution"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("institutionPlaceholder")}
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
        label={t("specializationLabel")}
        required
        error={errors.specialization?.message as string | undefined}
      >
        <Controller
          name="specialization"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("specializationPlaceholder")}
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
        label={t("basicLanguageLabel")}
        required
        error={errors.basicLanguageInEducation?.message as string | undefined}
      >
        <Controller
          name="basicLanguageInEducation"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("basicLanguagePlaceholder")}
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
