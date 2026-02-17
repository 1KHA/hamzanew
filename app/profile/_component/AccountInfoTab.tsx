import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { DgaTextInput } from "platformscode-new-react";
import FormField from "@/app/components/form-field/FormField";

interface AccountInfoTabProps {
  userInfo: any;
  setUserInfo: (info: any) => void;
  errors: Record<string, string>;
  handleInputChange: (e: any) => void;
  handleBlur: (e: any) => void;
}

interface PrefixOption {
  label: string;
  value: string;
}

const PREFIX_OPTIONS: PrefixOption[] = [
  { label: "+966", value: "966" },
  { label: "+971", value: "971" },
  { label: "+965", value: "965" },
];

export default function AccountInfoTab({
  userInfo,
  setUserInfo,
  errors,
  handleInputChange,
  handleBlur,
}: AccountInfoTabProps) {
  const [prefixOpen, setPrefixOpen] = useState(false);
  const [prefix, setPrefix] = useState<PrefixOption>(PREFIX_OPTIONS[0]);
  const prefixRef = useRef<HTMLDivElement>(null);

  /* ── Helpers for Phone Management ── */
  const getPhoneNumber = () => {
    if (!userInfo.phone) return "";
    if (userInfo.phone.startsWith(prefix.value)) {
      return userInfo.phone.slice(prefix.value.length);
    }
    return userInfo.phone;
  };

  const handlePhoneChange = (e: any) => {
    const val = e.target.value;
    setUserInfo((prev: any) => ({
      ...prev,
      phone: prefix.value + val,
    }));
  };

  /* ── Close prefix dropdown on outside click / Escape ── */
  useEffect(() => {
    if (!prefixOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (prefixRef.current && !prefixRef.current.contains(e.target as Node)) {
        setPrefixOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setPrefixOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [prefixOpen]);

  /* ── Prefix handlers ── */
  const handlePrefixSelect = (opt: PrefixOption) => {
    const currentNumber = getPhoneNumber();
    setPrefix(opt);
    setUserInfo((prev: any) => ({
      ...prev,
      phone: opt.value + currentNumber,
    }));
    setPrefixOpen(false);
  };

  const handlePrefixKeyDown = (e: React.KeyboardEvent, opt: PrefixOption) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handlePrefixSelect(opt);
    }
  };

  /* ── Prefix button class ── */
  const prefixBtnClass = useMemo(
    () =>
      [
        "input__prefix input__prefix--solid input__dropdown-btn",
        "prefix-btn",
        prefixOpen ? "prefix-btn--open" : "",
      ]
        .filter(Boolean)
        .join(" "),
    [prefixOpen],
  );

  /* ── Prefix list class ── */
  const prefixListClass = useMemo(
    () =>
      [
        "input__dropdown-list prefix-list",
        prefixOpen ? "prefix-list--open" : "prefix-list--closed",
      ].join(" "),
    [prefixOpen],
  );

  return (
    <div
      className="!grid !grid-cols-1 !gap-[16px]"
      role="tabpanel"
      aria-labelledby="tab-account-info"
      id="panel-account-info"
    >
      <h2 id="tab-account-info" className="text-md-medium">
        معلومات الدخول
      </h2>
      <p className="text-sm text-gray-600 sr-only">
        قم بإدخال معلومات تسجيل الدخول الخاصة بك بما في ذلك البريد الإلكتروني
        وكلمة المرور ورقم الهاتف
      </p>
      <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
        <FormField
          label="البريد الالكتروني"
          required
          error={errors.email}
          htmlFor="input-email"
        >
          <DgaTextInput
            id="input-email"
            name="email"
            placeholder="مثال: user@example.com"
            size="lg"
            type="text"
            value={userInfo.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.email}
            variant="darker"
            aria-required="true"
            aria-describedby="email-help"
          />
          <span id="email-help" className="sr-only">
            أدخل عنوان بريدك الإلكتروني المستخدم لتسجيل الدخول
          </span>
        </FormField>

        <FormField
          label="كلمة المرور"
          required
          error={errors.password}
          htmlFor="input-password"
        >
          <DgaTextInput
            id="input-password"
            name="password"
            placeholder="أدخل كلمة المرور"
            size="lg"
            type="password"
            value={userInfo.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.password}
            variant="darker"
            aria-required="true"
            aria-describedby="password-help"
          />
          <span id="password-help" className="sr-only">
            يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
          </span>
        </FormField>

        <FormField
          label="رقم الجوال"
          required
          error={errors.phone}
          htmlFor="phone-input"
        >
          <div
            className={`input input--lg input--darker phone-input-wrapper ${
              errors.phone ? "input--error" : ""
            }`}
          >
            <input
              id="phone-input"
              placeholder="00 000 0000"
              type="tel"
              inputMode="numeric"
              value={getPhoneNumber()}
              name="phone"
              className="input__field"
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-invalid={!!errors.phone}
            />

            <div ref={prefixRef} className="prefix-container">
              <input type="hidden" name="countryCode" value={prefix.value} />

              <button
                type="button"
                onClick={() => setPrefixOpen((v) => !v)}
                className={prefixBtnClass}
                aria-haspopup="listbox"
                aria-expanded={prefixOpen}
                aria-label={`رمز الدولة: ${prefix.label}`}
              >
                <span className="input__prefix-icon" />
                <span className="dropdown__label" />
                <span className="input__prefix-label">{prefix.label}</span>
                <span className="input__prefix-chevron">
                  <Image
                    src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                    alt="arrow down icon"
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className="prefix-chevron-icon"
                  />
                </span>
              </button>

              <ul
                role="listbox"
                className={prefixListClass}
                aria-label="رمز الدولة"
              >
                <div className="prefix-list__scroll">
                  {PREFIX_OPTIONS.map((opt) => {
                    const isActive = opt.value === prefix.value;
                    return (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={isActive}
                        tabIndex={prefixOpen ? 0 : -1}
                        onClick={() => handlePrefixSelect(opt)}
                        onKeyDown={(e) => handlePrefixKeyDown(e, opt)}
                        className={`prefix-option ${
                          isActive ? "prefix-option--active" : ""
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isActive && (
                          <span
                            className="prefix-option__check"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                        )}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>
        </FormField>
      </div>
    </div>
  );
}
