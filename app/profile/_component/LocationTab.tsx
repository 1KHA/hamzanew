import { DgaDropdown, DgaTextInput } from "platformscode-new-react";
import Button from "../../components/button/Button";
import FormField from "@/app/components/form-field/FormField";

interface LocationTabProps {
  userInfo: any;
  setUserInfo: (info: any) => void;
  errors: Record<string, string>;
  handleInputChange: (e: any) => void;
  handleBlur: (e: any) => void;
  validateField: (name: string, value: any) => void;
}

export default function LocationTab({
  userInfo,
  setUserInfo,
  errors,
  handleInputChange,
  handleBlur,
  validateField,
}: LocationTabProps) {
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
        <FormField label="المنطقة الزمنية" required error={errors.timezone}>
          <DgaDropdown
            placeholder="اختر"
            size="lg"
            variant="darker"
            optionLabel="name"
            trackBy="value"
            className="w-full"
            value={userInfo.timezone}
            getSelectedOptions={(opt: any) => {
              setUserInfo((prev: any) => ({ ...prev, timezone: opt.value }));
              validateField("timezone", opt.value);
            }}
            error={!!errors.timezone}
            options={[
              { name: "اختيار 1", value: "اختيار 1" },
              { name: "اختيار 2", value: "اختيار 2" },
              { name: "اختيار 3", value: "اختيار 3" },
              { name: "اختيار 4", value: "اختيار 4" },
            ]}
          />
        </FormField>

        <FormField label="الدولة" required error={errors.country}>
          <DgaDropdown
            placeholder="اختر"
            size="lg"
            variant="darker"
            optionLabel="name"
            trackBy="value"
            className="w-full"
            value={userInfo.country}
            getSelectedOptions={(opt: any) => {
              setUserInfo((prev: any) => ({ ...prev, country: opt.value }));
              validateField("country", opt.value);
            }}
            error={!!errors.country}
            options={[
              { name: "اختيار 1", value: "اختيار 1" },
              { name: "اختيار 2", value: "اختيار 2" },
              { name: "اختيار 3", value: "اختيار 3" },
              { name: "اختيار 4", value: "اختيار 4" },
            ]}
          />
        </FormField>

        <FormField
          label="الولاية / المقاطعة / الإقليم"
          required
          error={errors.state}
        >
          <DgaDropdown
            placeholder="اختر"
            size="lg"
            variant="darker"
            optionLabel="name"
            trackBy="value"
            className="w-full"
            value={userInfo.state}
            getSelectedOptions={(opt: any) => {
              setUserInfo((prev: any) => ({ ...prev, state: opt.value }));
              validateField("state", opt.value);
            }}
            error={!!errors.state}
            options={[
              { name: "اختيار 1", value: "اختيار 1" },
              { name: "اختيار 2", value: "اختيار 2" },
              { name: "اختيار 3", value: "اختيار 3" },
              { name: "اختيار 4", value: "اختيار 4" },
            ]}
          />
        </FormField>

        <FormField label="المدينة" required error={errors.city}>
          <DgaDropdown
            placeholder="اختر"
            size="lg"
            variant="darker"
            optionLabel="name"
            trackBy="value"
            className="w-full"
            value={userInfo.city}
            getSelectedOptions={(opt: any) => {
              setUserInfo((prev: any) => ({ ...prev, city: opt.value }));
              validateField("city", opt.value);
            }}
            error={!!errors.city}
            options={[
              { name: "اختيار 1", value: "اختيار 1" },
              { name: "اختيار 2", value: "اختيار 2" },
              { name: "اختيار 3", value: "اختيار 3" },
              { name: "اختيار 4", value: "اختيار 4" },
            ]}
          />
        </FormField>

        <FormField label="العنوان" required error={errors.postalAddress}>
          <DgaTextInput
            name="postalAddress"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.postalAddress}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.postalAddress}
            variant="darker"
          />
        </FormField>

        <FormField label="الرمز البريدي" required error={errors.zipCode}>
          <DgaTextInput
            name="zipCode"
            placeholder=""
            size="lg"
            type="text"
            value={userInfo.zipCode}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.zipCode}
            variant="darker"
          />
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
