import { useFormContext } from "react-hook-form";
import FileUpload from "../../components/FileUpload/FileUpload";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../UserProfile";

export default function PersonalInfoTab() {
  const {
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
          <ControlledTextInput name="birthDate" />
        </FormField>

        <FormField label="الجنسية" required error={errors.nationality?.message}>
          <ControlledTextInput name="nationality" />
        </FormField>

        <FormField
          label="اللغة الام"
          required
          error={errors.motherTongue?.message}
        >
          <ControlledTextInput name="motherTongue" />
        </FormField>
      </div>

      {/* Identity */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField label="الاثبات" required error={errors.identity?.message}>
          <ControlledTextInput name="identity" />
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
