"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import Dropdown from "@/app/components/dropdown/Dropdown";
import DateField from "@/app/components/date-field/DateField";
import FileUpload, {
  UploadedFile,
} from "@/app/components/FileUpload/FileUpload";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import { NewUserFormValues } from "./SignUpForm";
import { st } from "@/app/_lib/static-text";

interface PersonalInfoProps {
  motherTongueOptions: any[];
  proofOptions: any[];
  countriesOptions: any[];
}

export default function PersonalInfo({
  motherTongueOptions,
  proofOptions,
  countriesOptions,
}: PersonalInfoProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<NewUserFormValues>();

  const t = (key: string) => st("signUp", key);

  const [, setIdFile] = useState<UploadedFile[]>([]);

  const handleEnglishOnlyInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    target.value = target.value.replace(/[^a-zA-Z\s'.-]/g, "");
  };

  return (
    <div className="sign-up-page__grid">
      <FormField
        label={t("firstNameAr")}
        required
        error={errors.firstName_ar?.message}
        htmlFor="first-name-ar"
      >
        <ControlledTextInput
          placeholder={t("firstNameAr")}
          name="firstName_ar"
          id="first-name-ar"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label={t("firstNameEn")}
        required
        error={errors.firstName_en?.message}
        htmlFor="first-name-en"
      >
        <ControlledTextInput
          placeholder={t("firstNameEn")}
          name="firstName_en"
          id="first-name-en"
          size="lg"
          variant="darker"
          onInput={handleEnglishOnlyInput}
        />
      </FormField>

      <FormField
        label={t("secondNameAr")}
        required
        error={errors.secondName_ar?.message}
        htmlFor="second-name-ar"
      >
        <ControlledTextInput
          placeholder={t("secondNameAr")}
          name="secondName_ar"
          id="second-name-ar"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label={t("secondNameEn")}
        required
        error={errors.secondName_en?.message}
        htmlFor="second-name-en"
      >
        <ControlledTextInput
          placeholder={t("secondNameEn")}
          name="secondName_en"
          id="second-name-en"
          size="lg"
          variant="darker"
          onInput={handleEnglishOnlyInput}
        />
      </FormField>

      <FormField
        label={t("lastNameAr")}
        required
        error={errors.lastName_ar?.message}
        htmlFor="last-name-ar"
      >
        <ControlledTextInput
          placeholder={t("lastNameAr")}
          name="lastName_ar"
          id="last-name-ar"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label={t("lastNameEn")}
        required
        error={errors.lastName_en?.message}
        htmlFor="last-name-en"
      >
        <ControlledTextInput
          placeholder={t("lastNameEn")}
          name="lastName_en"
          id="last-name-en"
          size="lg"
          variant="darker"
          onInput={handleEnglishOnlyInput}
        />
      </FormField>

      <FormField
        label={t("birthDateLabel")}
        required
        error={errors.birthDate?.message}
      >
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DateField
              rtl
              fullwidth
              size="lg"
              variant="darker"
              error={!!errors.birthDate}
              maxDate={new Date()}
              onChange={(date: any) => {
                field.onChange(date ? String(date) : "");
              }}
            />
          )}
        />
      </FormField>

      <FormField label={t("nationalityLabel")} required error={errors.nationality?.message}>
        <Controller
          name="nationality"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("nationalityPlaceholder")}
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={countriesOptions}
              extraClass="w-full"
              value={field.value}
              getSelectedOptions={(opt: any) => field.onChange(opt.key)}
            />
          )}
        />
      </FormField>

      <FormField
        label={t("motherTongueLabel")}
        required
        error={errors.motherTongue?.message as string | undefined}
      >
        <Controller
          name="motherTongue"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("motherTonguePlaceholder")}
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

      <FormField label={t("identityLabel")} required error={errors.identity?.message as string | undefined}>
        <Controller
          name="identity"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("identityPlaceholder")}
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={proofOptions}
              extraClass="w-full"
              value={field.value?.key}
              getSelectedOptions={(opt: any) => field.onChange(opt)}
            />
          )}
        />
      </FormField>

      <FormField
        label={t("identityNumberLabel")}
        required
        error={errors.identityNumber?.message}
        htmlFor="identity-number"
      >
        <ControlledTextInput
          placeholder={t("identityNumberLabel")}
          name="identityNumber"
          id="identity-number"
          type="tel"
          size="lg"
          variant="darker"
          maxLength={12}
          aria-describedby="identity-hint"
        />
        <p id="identity-hint" className="text-sm-regular text-gray-500 mt-1">
          {st("signUp", "identityNumberDigitsOnly")}
        </p>
      </FormField>

      <FormField
        label={t("identityFileLabel")}
        required
        error={errors.identityFile?.message as string | undefined}
        htmlFor="identity-file"
      >
        <Controller
          name="identityFile"
          control={control}
          render={({ field }) => (
            <FileUpload
              name="identity-file"
              fileTypesText={t("identityFileTypes")}
              accept=".pdf,.png,.jpg,.jpeg"
              actionName={t("browseFiles")}
              showIcon={false}
              getUploadedFile={(files: UploadedFile[]) => {
                setIdFile(files);
                field.onChange(files);
              }}
            />
          )}
        />
      </FormField>
    </div>
  );
}
