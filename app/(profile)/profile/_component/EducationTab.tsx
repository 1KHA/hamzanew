import { Controller, useFormContext } from "react-hook-form";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../update/ProfileForm";
import Dropdown, { type DropdownOption } from "@/app/components/dropdown/Dropdown";
import { st } from "@/app/_lib/static-text";

function getLanguageOptions(): DropdownOption[] {
  return [
    { name: st("profile", "langAr"), value: "ar" },
    { name: st("profile", "langEn"), value: "en" },
    { name: st("profile", "langFr"), value: "fr" },
    { name: st("profile", "langOther"), value: "other" },
  ];
}

function getFallbackEducationOptions(): DropdownOption[] {
  return [
    { name: st("profile", "fallbackQualificationHighSchool"), value: "high_school" },
    { name: st("profile", "fallbackQualificationDiploma"), value: "diploma" },
    { name: st("profile", "fallbackQualificationBachelor"), value: "bachelor" },
    { name: st("profile", "fallbackQualificationMaster"), value: "master" },
    { name: st("profile", "fallbackQualificationPhd"), value: "phd" },
  ];
}

function getFallbackInstitutionOptions(): DropdownOption[] {
  return [
    { name: st("profile", "fallbackInstitutionKSU"), value: "ksu" },
    { name: st("profile", "fallbackInstitutionCairo"), value: "cairo" },
  ];
}

interface EducationTabProps {
  educationOptions?: DropdownOption[];
  institutionOptions?: DropdownOption[];
  specializationOptions?: DropdownOption[];
}

export default function EducationTab({
  educationOptions = [],
  institutionOptions = [],
  specializationOptions = [],
}: EducationTabProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserProfileFormValues>();

  return (
    <div
      className="!grid !gap-[16px]"
      role="tabpanel"
      aria-labelledby="tab-education"
      id="panel-education"
    >
      <h2 id="tab-education" className="sr-only">
        {st("profile", "srOnlyEducation")}
      </h2>
      <p className="text-sm text-gray-600 sr-only">
        {st("profile", "srOnlyEducation")}
      </p>

      <div className="!grid !grid-cols-1 md:!grid-cols-6 !gap-8">
        <FormField
          label={st("profile", "labelLastQualification")}
          required
          error={errors.education?.message}
          className="md:!col-span-2"
        >
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelectQualification")}
                size="lg"
                variant="darker"
                extraClass="w-full"
                optionLabel="name"
                trackBy="value"
                options={educationOptions.length ? educationOptions : getFallbackEducationOptions()}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                error={!!errors.education}
              />
            )}
          />
        </FormField>

        <FormField
          label={st("profile", "labelInstitutionShort")}
          required
          error={errors.institution?.message}
          className="md:!col-span-2"
        >
          <Controller
            name="institution"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelectInstitution")}
                size="lg"
                variant="darker"
                extraClass="w-full"
                optionLabel="name"
                trackBy="value"
                options={institutionOptions.length ? institutionOptions : getFallbackInstitutionOptions()}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                error={!!errors.institution}
              />
            )}
          />
        </FormField>

        {/* spacer */}
        <div className="hidden md:block md:!col-span-2" />

        <FormField
          label={st("profile", "labelSpecializationShort")}
          required
          error={errors.specialization?.message}
          className="md:!col-span-2"
        >
          <ControlledTextInput name="specialization" />
        </FormField>

        <FormField
          label={st("profile", "labelBasicLanguageShort")}
          required
          error={errors.basicLanguageInEducation?.message}
          className="md:!col-span-2"
        >
          <Controller
            name="basicLanguageInEducation"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelectLanguage")}
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                options={getLanguageOptions()}
                extraClass="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
              />
            )}
          />
        </FormField>

        {/* spacer */}
        <div className="hidden md:block md:!col-span-2" />
      </div>
    </div>
  );
}
