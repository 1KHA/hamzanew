import { useFormContext } from "react-hook-form";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../UserProfile";

export default function EducationTab() {
  const {
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
          <ControlledTextInput name="education" />
        </FormField>

        <FormField
          label="المؤسسة التعلمية"
          required
          error={errors.institution?.message}
          className="md:!col-span-2"
        >
          <ControlledTextInput name="institution" />
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
          <ControlledTextInput name="basicLanguageInEducation" />
        </FormField>

        {/* spacer */}
        <div className="hidden md:block md:!col-span-2" />
      </div>
    </div>
  );
}
