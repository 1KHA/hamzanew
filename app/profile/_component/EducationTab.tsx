import { DgaTextInput } from "platformscode-new-react";
import FormField from "./FormField";

interface EducationTabProps {
  userInfo: any;
  errors: Record<string, string>;
  handleInputChange: (e: any) => void;
  handleBlur: (e: any) => void;
}

export default function EducationTab({
  userInfo,
  errors,
  handleInputChange,
  handleBlur,
}: EducationTabProps) {
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
          error={errors.education}
          className="md:!col-span-2"
        >
          <DgaTextInput
            name="education"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.education}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.education}
            variant="darker"
          />
        </FormField>

        <FormField
          label="المؤسسة التعلمية"
          required
          error={errors.institution}
          className="md:!col-span-2"
        >
          <DgaTextInput
            name="institution"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.institution}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.institution}
            variant="darker"
          />
        </FormField>

        {/* spacer to force wrap + keep last third empty */}
        <div className="hidden md:block md:!col-span-2" />

        <FormField
          label="التخصص الدراسي"
          required
          error={errors.specialization}
          className="md:!col-span-2"
        >
          <DgaTextInput
            name="specialization"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.specialization}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.specialization}
            variant="darker"
          />
        </FormField>

        <FormField
          label="اللغة الأساسية في التعليم"
          required
          error={errors.basicLanguageInEducation}
          className="md:!col-span-2"
        >
          <DgaTextInput
            name="basicLanguageInEducation"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.basicLanguageInEducation}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.basicLanguageInEducation}
            variant="darker"
          />
        </FormField>
        {/* spacer to force wrap + keep last third empty */}
        <div className="hidden md:block md:!col-span-2" />
      </div>
    </div>
  );
}
