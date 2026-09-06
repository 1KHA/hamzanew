"use client";

import { useFormContext, Controller } from "react-hook-form";
import Dropdown from "@/app/components/dropdown/Dropdown";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import { NewUserFormValues } from "./SignUpForm";
import { st } from "@/app/_lib/static-text";

interface LocationInfoProps {
  timezoneOptions: any[];
  countriesOptions: any[];
}

export default function LocationInfo({
  timezoneOptions,
  countriesOptions,
}: LocationInfoProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<NewUserFormValues>();

  const t = (key: string) => st("signUp", key);

  const handleDigitsOnlyInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    target.value = target.value.replace(/\D/g, "");
  };

  return (
    <div className="sign-up-page__grid">
      <FormField
        label={t("timezoneLabel")}
        required
        error={errors.timezone?.message as string | undefined}
      >
        <Controller
          name="timezone"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("timezonePlaceholder")}
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={timezoneOptions}
              extraClass="w-full"
              value={field.value?.key}
              error={!!errors.timezone}
              getSelectedOptions={(opt: any) => field.onChange(opt)}
            />
          )}
        />
      </FormField>

      <FormField label={t("countryLabel")} required error={errors.country?.message}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder={t("countryPlaceholder")}
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
        label={t("stateLabel")}
        required
        error={errors.state?.message}
      >
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <ControlledTextInput
              name="state"
              placeholder={t("statePlaceholder")}
              size="lg"
              variant="darker"
            />
          )}
        />
      </FormField>

      <FormField label={t("cityLabel")} required error={errors.city?.message}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <ControlledTextInput
              name="city"
              placeholder={t("cityPlaceholder")}
              size="lg"
              variant="darker"
            />
          )}
        />
      </FormField>

      <FormField
        label={t("streetLabel")}
        required
        error={errors.postalAddress?.message}
        htmlFor="input-street"
      >
        <ControlledTextInput
          placeholder={t("streetPlaceholder")}
          name="postalAddress"
          id="input-street"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label={t("zipLabel")}
        required
        error={errors.zipCode?.message}
        htmlFor="input-postal"
      >
        <ControlledTextInput
          placeholder={t("zipLabel")}
          name="zipCode"
          id="input-postal"
          type="tel"
          size="lg"
          variant="darker"
          onInput={handleDigitsOnlyInput}
        />
      </FormField>
    </div>
  );
}
