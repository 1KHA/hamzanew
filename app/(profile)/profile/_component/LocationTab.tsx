import { useFormContext, Controller } from "react-hook-form";
import Dropdown, { DropdownOption } from "@/app/components/dropdown/Dropdown";
import Button from "@/app/components/button/Button";
import FormField from "@/app/components/form-field/FormField";
import ControlledTextInput from "@/app/components/form-field/ControlledTextInput";
import type { UserProfileFormValues } from "../update/ProfileForm";
import { st } from "@/app/_lib/static-text";

function getRegionOptions(): DropdownOption[] {
  return [
    { name: st("profile", "fallbackRegionRiyadh"), value: "riyadh" },
    { name: st("profile", "fallbackRegionMakkah"), value: "makkah" },
    { name: st("profile", "fallbackRegionEastern"), value: "eastern" },
    { name: st("profile", "fallbackRegionMadinah"), value: "madinah" },
  ];
}

function getCityOptions(): DropdownOption[] {
  return [
    { name: st("profile", "fallbackCityRiyadh"), value: "riyadh_city" },
    { name: st("profile", "fallbackCityJeddah"), value: "jeddah" },
    { name: st("profile", "fallbackCityMakkah"), value: "makkah_city" },
    { name: st("profile", "fallbackCityMadinah"), value: "madinah_city" },
    { name: st("profile", "fallbackCityDammam"), value: "dammam" },
  ];
}

function getFallbackTimezoneOptions(): DropdownOption[] {
  return [
    { name: st("profile", "fallbackTimezoneRiyadh"), value: "Asia/Riyadh" },
    { name: st("profile", "fallbackTimezoneCairo"), value: "Africa/Cairo" },
    { name: st("profile", "fallbackTimezoneDubai"), value: "Asia/Dubai" },
    { name: st("profile", "fallbackTimezoneLondon"), value: "Europe/London" },
  ];
}

function getFallbackCountryOptions(): DropdownOption[] {
  return [
    { name: st("profile", "fallbackCountrySA"), value: "SA" },
    { name: st("profile", "fallbackCountryEG"), value: "EG" },
    { name: st("profile", "fallbackCountryJO"), value: "JO" },
    { name: st("profile", "fallbackCountryAE"), value: "AE" },
    { name: st("profile", "fallbackCountryKW"), value: "KW" },
  ];
}

interface LocationTabProps {
  countryOptions?: DropdownOption[];
  timezoneOptions?: DropdownOption[];
}

export default function LocationTab({
  countryOptions = [],
  timezoneOptions = [],
}: LocationTabProps) {
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
        {st("profile", "srOnlyLocation")}
      </h2>
      <p className="text-sm text-gray-600 sr-only">
        {st("profile", "srOnlyLocation")}
      </p>

      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        {/* ── Timezone ── */}
        <FormField
          label={st("profile", "labelTimezoneShort")}
          required
          error={errors.timezone?.message}
        >
          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelectTimezone")}
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                extraClass="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
                error={!!errors.timezone}
                options={timezoneOptions.length ? timezoneOptions : getFallbackTimezoneOptions()}
              />
            )}
          />
        </FormField>

        {/* ── Country ── */}
        <FormField label={st("profile", "labelCountryShort")} required error={errors.country?.message}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelectCountry")}
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                extraClass="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
                error={!!errors.country}
                options={countryOptions.length ? countryOptions : getFallbackCountryOptions()}
              />
            )}
          />
        </FormField>

        {/* ── State ── */}
        <FormField
          label={st("profile", "labelStateShort")}
          required
          error={errors.state?.message}
        >
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelect")}
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                extraClass="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
                error={!!errors.state}
                options={getRegionOptions()}
              />
            )}
          />
        </FormField>

        {/* ── City ── */}
        <FormField label={st("profile", "labelCityShort")} required error={errors.city?.message}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder={st("profile", "placeholderSelect")}
                size="lg"
                variant="darker"
                optionLabel="name"
                trackBy="value"
                extraClass="w-full"
                value={field.value}
                getSelectedOptions={(opt: any) => field.onChange(opt.value)}
                error={!!errors.city}
                options={getCityOptions()}
              />
            )}
          />
        </FormField>

        {/* ── Postal Address ── */}
        <FormField
          label={st("profile", "labelAddressShort")}
          required
          error={errors.postalAddress?.message}
        >
          <ControlledTextInput name="postalAddress" />
        </FormField>

        {/* ── Zip Code ── */}
        <FormField
          label={st("profile", "labelZipCodeShort")}
          required
          error={errors.zipCode?.message}
        >
          <ControlledTextInput name="zipCode" />
        </FormField>
      </div>
    </div>
  );
}
