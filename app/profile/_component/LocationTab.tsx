import { useFormContext, Controller } from "react-hook-form";
import { DgaDropdown } from "platformscode-new-react";
import Button from "../../components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../UserProfile";

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
                options={[
                  { name: "اختيار 1", value: "اختيار 1" },
                  { name: "اختيار 2", value: "اختيار 2" },
                  { name: "اختيار 3", value: "اختيار 3" },
                  { name: "اختيار 4", value: "اختيار 4" },
                ]}
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
                options={[
                  { name: "اختيار 1", value: "اختيار 1" },
                  { name: "اختيار 2", value: "اختيار 2" },
                  { name: "اختيار 3", value: "اختيار 3" },
                  { name: "اختيار 4", value: "اختيار 4" },
                ]}
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
                options={[
                  { name: "اختيار 1", value: "اختيار 1" },
                  { name: "اختيار 2", value: "اختيار 2" },
                  { name: "اختيار 3", value: "اختيار 3" },
                  { name: "اختيار 4", value: "اختيار 4" },
                ]}
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
                options={[
                  { name: "اختيار 1", value: "اختيار 1" },
                  { name: "اختيار 2", value: "اختيار 2" },
                  { name: "اختيار 3", value: "اختيار 3" },
                  { name: "اختيار 4", value: "اختيار 4" },
                ]}
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
          label="تحديث"
          variant="primary-brand"
          size="md"
          className="md:w-[100px] w-full"
        />
      </div>
    </div>
  );
}
