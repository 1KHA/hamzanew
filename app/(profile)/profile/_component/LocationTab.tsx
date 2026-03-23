import { useFormContext, Controller } from "react-hook-form";
import { DgaDropdown } from "platformscode-new-react";
import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../update/ProfileForm";
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
export default function LocationTab() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserProfileFormValues>();

  return (
    <div
      className="!grid !gap-[16px]"
      role="tabpanel"
      aria-labelledby="tab-location"
      id="panel-location"
    >
      <h2 id="tab-location" className="sr-only">
        معلومات الموقع
      </h2>
      <p className="text-sm text-gray-600 sr-only">
        قم بإدخال معلومات موقعك بما في ذلك المنطقة الزمنية والدولة والمدينة
        والعنوان
      </p>

      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        {/* ── Timezone ── */}
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
                placeholder="اختر"
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                className="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
                error={!!errors.timezone}
                options={TIMEZONE_OPTIONS}
              />
            )}
          />
        </FormField>

        {/* ── Country ── */}
        <FormField label="الدولة" required error={errors.country?.message}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <DgaDropdown
                placeholder="اختر"
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                className="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
                error={!!errors.country}
                options={COUNTRY_OPTIONS}
              />
            )}
          />
        </FormField>

        {/* ── State ── */}
        <FormField
          label="الولاية / المقاطعة / الإقليم"
          required
          error={errors.state?.message}
        >
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <DgaDropdown
                placeholder="اختر"
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                className="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
                error={!!errors.state}
                options={REGION_OPTIONS}
              />
            )}
          />
        </FormField>

        {/* ── City ── */}
        <FormField label="المدينة" required error={errors.city?.message}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <DgaDropdown
                placeholder="اختر"
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                className="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
                error={!!errors.city}
                options={CITY_OPTIONS}
              />
            )}
          />
        </FormField>

        {/* ── Postal Address ── */}
        <FormField
          label="العنوان"
          required
          error={errors.postalAddress?.message}
        >
          <ControlledTextInput name="postalAddress" />
        </FormField>

        {/* ── Zip Code ── */}
        <FormField
          label="الرمز البريدي"
          required
          error={errors.zipCode?.message}
        >
          <ControlledTextInput name="zipCode" />
        </FormField>
      </div>

      <div className="!flex !justify-center !mt-4 md:!justify-end">
        <Button
          type="submit"
          label="حفظ التغييرات"
          variant="primary-brand"
          size="md"
          className="md:w-[100px] w-full"
        />
      </div>
    </div>
  );
}
