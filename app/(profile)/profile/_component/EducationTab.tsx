import { Controller, useFormContext } from "react-hook-form";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../update/ProfileForm";
import Dropdown, { type DropdownOption } from "@/app/components/dropdown/Dropdown";
const LANGUAGE_OPTIONS = [
  { name: "العربية", value: "ar" },
  { name: "الإنجليزية", value: "en" },
  { name: "الفرنسية", value: "fr" },
  { name: "أخرى", value: "other" },
];


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
        المؤهلات الدراسية
      </h2>
      <p className="text-sm text-gray-600 sr-only">
        قم بإدخال معلوماتك التعليمية بما في ذلك المؤهل الدراسي والمؤسسة
        التعليمية والتخصص
      </p>

      <div className="!grid !grid-cols-1 md:!grid-cols-6 !gap-8">
        <FormField
          label="آخر مؤهل دراسي"
          required
          error={errors.education?.message}
          className="md:!col-span-2"
        >
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder="اختر المؤهل"
                size="lg"
                variant="darker"
                extraClass="w-full"
                optionLabel="name"
                trackBy="value"
                options={educationOptions.length ? educationOptions : [
                  { name: "ثانوية عامة", value: "high_school" },
                  { name: "دبلوم", value: "diploma" },
                  { name: "بكالوريوس", value: "bachelor" },
                  { name: "ماجستير", value: "master" },
                  { name: "دكتوراه", value: "phd" },
                ]}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                error={!!errors.education}
              />
            )}
          />
        </FormField>

        <FormField
          label="المؤسسة التعلمية"
          required
          error={errors.institution?.message}
          className="md:!col-span-2"
        >
          <Controller
            name="institution"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder="اختر المؤسسة"
                size="lg"
                variant="darker"
                extraClass="w-full"
                optionLabel="name"
                trackBy="value"
                options={institutionOptions.length ? institutionOptions : [
                  { name: "جامعة الملك سعود", value: "ksu" },
                  { name: "جامعة القاهرة", value: "cairo" },
                ]}
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
          label="التخصص الدراسي"
          required
          error={errors.specialization?.message}
          className="md:!col-span-2"
        >
          <ControlledTextInput name="specialization" />
        </FormField>

        <FormField
          label="اللغة الأساسية في التعليم"
          required
          error={errors.basicLanguageInEducation?.message}
          className="md:!col-span-2"
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

        {/* spacer */}
        <div className="hidden md:block md:!col-span-2" />
      </div>
    </div>
  );
}
