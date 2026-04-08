"use client";

import { useFormContext, Controller } from "react-hook-form";
import { DgaDropdown } from "@/lib/utils/platformscode";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import { NewUserFormValues } from "./page";

const TIMEZONE_OPTIONS = [
  { name: "توقيت الرياض (GMT+3)", value: "Asia/Riyadh" },
  { name: "توقيت القاهرة (GMT+2)", value: "Africa/Cairo" },
  { name: "توقيت دبي (GMT+4)", value: "Asia/Dubai" },
  { name: "توقيت لندن (GMT+0)", value: "Europe/London" },
];

const COUNTRY_OPTIONS = [
  { name: "المملكة العربية السعودية", value: "SA" },
  { name: "مصر", value: "EG" },
  { name: "الأردن", value: "JO" },
  { name: "الإمارات", value: "AE" },
  { name: "الكويت", value: "KW" },
];

const REGION_OPTIONS = [
  { name: "منطقة الرياض", value: "riyadh" },
  { name: "منطقة مكة المكرمة", value: "makkah" },
  { name: "المنطقة الشرقية", value: "eastern" },
  { name: "منطقة المدينة المنورة", value: "madinah" },
];

const CITY_OPTIONS = [
  { name: "الرياض", value: "riyadh_city" },
  { name: "جدة", value: "jeddah" },
  { name: "مكة المكرمة", value: "makkah_city" },
  { name: "المدينة المنورة", value: "madinah_city" },
  { name: "الدمام", value: "dammam" },
];

export default function LocationInfo() {
  const {
    control,
    formState: { errors },
  } = useFormContext<NewUserFormValues>();

  return (
    <div className="sign-up-page__grid">
      <FormField
        label="المنطقة الزمنية"
        required
        error={errors.timezone?.message}
      >
        <Controller
          name="timezone"
          control={control}
          render={({ field }) => (
            <DgaDropdown
              placeholder="اختر المنطقة الزمنية"
              size="lg"
              variant="darker"
              optionLabel="name"
              trackBy="value"
              options={TIMEZONE_OPTIONS}
              className="w-full"
              value={field.value}
              error={!!errors.timezone}
              getSelectedOptions={(opt: any) => field.onChange(opt.value)}
            />
          )}
        />
      </FormField>

      <FormField label="الدولة" required error={errors.country?.message}>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <DgaDropdown
              placeholder="اختر الدولة"
              size="lg"
              variant="darker"
              optionLabel="name"
              trackBy="value"
              options={COUNTRY_OPTIONS}
              className="w-full"
              value={field.value}
              getSelectedOptions={(opt: any) => field.onChange(opt.value)}
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
            <DgaDropdown
              placeholder="اختر الولاية"
              size="lg"
              variant="darker"
              optionLabel="name"
              trackBy="value"
              options={REGION_OPTIONS}
              className="w-full"
              value={field.value}
              getSelectedOptions={(opt: any) => field.onChange(opt.value)}
            />
          )}
        />
      </FormField>

      <FormField label="المدينة" required error={errors.city?.message}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <DgaDropdown
              placeholder="اختر المدينة"
              size="lg"
              variant="darker"
              optionLabel="name"
              trackBy="value"
              options={CITY_OPTIONS}
              className="w-full"
              value={field.value}
              getSelectedOptions={(opt: any) => field.onChange(opt.value)}
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
