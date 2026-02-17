import { DgaTextInput } from "platformscode-new-react";
import FileUpload from "../../components/FileUpload/FileUpload";
import FormField from "./FormField";

interface PersonalInfoTabProps {
  userInfo: any;
  setUserInfo: (info: any) => void;
  errors: Record<string, string>;
  handleInputChange: (e: any) => void;
  handleBlur: (e: any) => void;
}

export default function PersonalInfoTab({
  userInfo,
  setUserInfo,
  errors,
  handleInputChange,
  handleBlur,
}: PersonalInfoTabProps) {
  /* ── Helpers for Name Management ── */
  const getNamePart = (fullName: string, index: number) => {
    if (!fullName) return "";
    const parts = fullName.split(" ");
    return parts[index] || "";
  };

  const updateNamePart = (
    field: "fullName_ar" | "fullName_en",
    index: number,
    value: string,
  ) => {
    setUserInfo((prev: any) => {
      const currentFull = prev[field] || "";
      const parts = currentFull.split(" ");
      // Ensure specific length if needed, or just fill
      while (parts.length <= index) parts.push("");
      parts[index] = value;
      return {
        ...prev,
        [field]: parts.join(" ").trim(),
      };
    });
  };

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
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField label="الاسم الاول" required error={errors.firstName_ar}>
          <DgaTextInput
            name="firstName_ar"
            placeholder=""
            size="lg"
            type="text"
            value={getNamePart(userInfo.fullName_ar, 0)}
            onChange={(e: any) =>
              updateNamePart("fullName_ar", 0, e.target.value)
            }
            onBlur={handleBlur}
            error={!!errors.firstName_ar}
            variant="darker"
          />
        </FormField>

        <FormField label="الاسم الثاني" required error={errors.secondName_ar}>
          <DgaTextInput
            name="secondName_ar"
            placeholder=""
            size="lg"
            type="text"
            value={getNamePart(userInfo.fullName_ar, 1)}
            onChange={(e: any) =>
              updateNamePart("fullName_ar", 1, e.target.value)
            }
            onBlur={handleBlur}
            error={!!errors.secondName_ar}
            variant="darker"
          />
        </FormField>

        <FormField label="الاسم الاخير" required error={errors.lastName_ar}>
          <DgaTextInput
            name="lastName_ar"
            placeholder=""
            size="lg"
            type="text"
            value={getNamePart(userInfo.fullName_ar, 2)}
            onChange={(e: any) =>
              updateNamePart("fullName_ar", 2, e.target.value)
            }
            onBlur={handleBlur}
            error={!!errors.lastName_ar}
            variant="darker"
          />
        </FormField>
      </div>
      {/*  */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label="الاسم الاول (باللغة الإنجليزية)"
          required
          error={errors.firstName_en}
        >
          <DgaTextInput
            name="firstName_en"
            placeholder=""
            size="lg"
            type="text"
            value={getNamePart(userInfo.fullName_en, 0)}
            onChange={(e: any) =>
              updateNamePart("fullName_en", 0, e.target.value)
            }
            onBlur={handleBlur}
            error={!!errors.firstName_en}
            variant="darker"
          />
        </FormField>

        <FormField
          label="الاسم الثاني (باللغة الإنجليزية)"
          required
          error={errors.secondName_en}
        >
          <DgaTextInput
            name="secondName_en"
            placeholder=""
            size="lg"
            type="text"
            value={getNamePart(userInfo.fullName_en, 1)}
            onChange={(e: any) =>
              updateNamePart("fullName_en", 1, e.target.value)
            }
            onBlur={handleBlur}
            error={!!errors.secondName_en}
            variant="darker"
          />
        </FormField>

        <FormField
          label="الاسم الاخير (باللغة الإنجليزية)"
          required
          error={errors.lastName_en}
        >
          <DgaTextInput
            name="lastName_en"
            placeholder=""
            size="lg"
            type="text"
            value={getNamePart(userInfo.fullName_en, 2)}
            onChange={(e: any) =>
              updateNamePart("fullName_en", 2, e.target.value)
            }
            onBlur={handleBlur}
            error={!!errors.lastName_en}
            variant="darker"
          />
        </FormField>
      </div>
      {/*  */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField label="تاريخ الميلاد" required error={errors.birthDate}>
          <DgaTextInput
            name="birthDate"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.birthDate}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.birthDate}
            variant="darker"
          />
        </FormField>

        <FormField label="الجنسية" required error={errors.nationality}>
          <DgaTextInput
            name="nationality"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.nationality}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.nationality}
            variant="darker"
          />
        </FormField>

        <FormField label="اللغة الام" required error={errors.motherTongue}>
          <DgaTextInput
            name="motherTongue"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.motherTongue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.motherTongue}
            variant="darker"
          />
        </FormField>
      </div>
      {/*  */}
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField label="الاثبات" required error={errors.identity}>
          <DgaTextInput
            name="identity"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.identity}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.identity}
            variant="darker"
          />
        </FormField>

        <FormField
          label="ادخل رقم الاثبات"
          required
          error={errors.identityNumber}
        >
          <DgaTextInput
            name="identityNumber"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.identityNumber}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.identityNumber}
            variant="darker"
          />
        </FormField>
      </div>
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label="ارفق نسخة من الاثبات"
          required /* error not handled in original? */
        >
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
