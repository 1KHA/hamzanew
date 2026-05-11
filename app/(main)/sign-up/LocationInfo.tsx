"use client";

import { useFormContext, Controller } from "react-hook-form";
import Dropdown from "@/app/components/dropdown/Dropdown";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import { NewUserFormValues } from "./SignUpForm";

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

  return (
    <div className="sign-up-page__grid">
      <FormField
        label="المنطقة الزمنية"
        required
        error={errors.timezone?.message as string | undefined}
      >
        <Controller
          name="timezone"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="اختر المنطقة الزمنية"
              size="lg"
              variant="darker"
              optionLabel="label"
              trackBy="key"
              options={timezoneOptions}
              extraClass="w-full"
              value={field.value}
              error={!!errors.timezone}
              getSelectedOptions={(opt: any) => field.onChange(opt)}
            />
          )}
        />
      </FormField>

      <FormField label="الدولة" required error={errors.country?.message}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="اختر الدولة"
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
        label="الولاية/المقاطعة/الإقليم"
        required
        error={errors.state?.message}
      >
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <ControlledTextInput
              name="state"
              placeholder="أدخل الولاية"
              size="lg"
              variant="darker"
            />
          )}
        />
      </FormField>

      <FormField label="المدينة" required error={errors.city?.message}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <ControlledTextInput
              name="city"
              placeholder="أدخل المدينة"
              size="lg"
              variant="darker"
            />
          )}
        />
      </FormField>

      <FormField
        label="الشارع"
        required
        error={errors.postalAddress?.message}
        htmlFor="input-street"
      >
        <ControlledTextInput
          placeholder="اسم الشارع"
          name="postalAddress"
          id="input-street"
          size="lg"
          variant="darker"
        />
      </FormField>

      <FormField
        label="الرمز البريدي"
        required
        error={errors.zipCode?.message}
        htmlFor="input-postal"
      >
        <ControlledTextInput
          placeholder="الرمز البريدي"
          name="zipCode"
          id="input-postal"
          size="lg"
          variant="darker"
        />
      </FormField>
    </div>
  );
}
