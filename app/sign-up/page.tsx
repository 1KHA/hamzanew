"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DgaTextInput, DgaDropdown } from "platformscode-new-react";
import DateField from "../components/date-field/DateField";

import ProgressIndicator from "@/app/components/progress-indicator/ProgressIndicator";
import Button from "@/app/components/button/Button";
import FileUpload, { UploadedFile } from "@/app/components/FileUpload/FileUpload";
import NotificationToast from "@/app/components/notification-toast/NotificationToast";
import {
  DEFAULT_PREFIX,
  getDigitsFromPhone,
  getPrefixFromPhone,
  PHONE_PREFIXES,
  PrefixOption,
} from "@/app/profile/_data/phonePrefixes";
import "@/app/styles/Button.css";
import "./sign-up.css";

const STEPS = [
  { title: "معلومات الحساب", description: "وصف الخطوة" },
  { title: "المعلومات الشخصية", description: "وصف الخطوة" },
  { title: "المؤهلات الدراسية", description: "وصف الخطوة" },
  { title: "الموقع", description: "وصف الخطوة" },
];

const ID_TYPE_OPTIONS = [
  { name: "هوية وطنية", value: "national_id" },
  { name: "إقامة", value: "iqama" },
  { name: "جواز سفر", value: "passport" },
];

const NATIONALITY_OPTIONS = [
  { name: "سعودي", value: "SA" },
  { name: "مصري", value: "EG" },
  { name: "أردني", value: "JO" },
  { name: "إماراتي", value: "AE" },
  { name: "كويتي", value: "KW" },
  { name: "أخرى", value: "OTHER" },
];

const LANGUAGE_OPTIONS = [
  { name: "العربية", value: "ar" },
  { name: "الإنجليزية", value: "en" },
  { name: "الفرنسية", value: "fr" },
  { name: "أخرى", value: "other" },
];

const DEGREE_OPTIONS = [
  { name: "ثانوية عامة", value: "high_school" },
  { name: "دبلوم", value: "diploma" },
  { name: "بكالوريوس", value: "bachelor" },
  { name: "ماجستير", value: "master" },
  { name: "دكتوراه", value: "phd" },
];

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

const noop = () => { };

/* Reusable field-label wrapper for DgaTextInput (implicit label association) */
function FieldLabel({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="dga-form-control dga-form-control--fullwidth">
      <span className="dga-label dga-label--lg">
        {required && <span className="sign-up-page__required" aria-hidden="true">* </span>}
        {label}
      </span>
      {children}
    </label>
  );
}

/* Reusable field-label wrapper for non-input controls (DgaDropdown, FileUpload, DateField) */
function FieldGroup({ label, required, children, fullWidth = true }: { label: string; required?: boolean; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <div className={`dga-form-control${fullWidth ? " dga-form-control--fullwidth" : ""}`}>
      <span className="dga-label dga-label--lg">
        {required && <span className="sign-up-page__required" aria-hidden="true">* </span>}
        {label}
      </span>
      {children}
    </div>
  );
}

export default function SignUpPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  /* ── Step 1 fields ── */
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(DEFAULT_PREFIX.value);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ── Phone prefix dropdown ── */
  const [prefixOpen, setPrefixOpen] = useState(false);
  const prefixRef = useRef<HTMLDivElement>(null);
  const selectedCountryPrefix = getPrefixFromPhone(phone) || DEFAULT_PREFIX;
  const phoneDigitsOnly = getDigitsFromPhone(phone);

  useEffect(() => {
    if (!prefixOpen) return;
    const onClickOut = (e: MouseEvent) => {
      if (prefixRef.current && !prefixRef.current.contains(e.target as Node))
        setPrefixOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setPrefixOpen(false); };
    document.addEventListener("mousedown", onClickOut);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOut);
      document.removeEventListener("keydown", onEsc);
    };
  }, [prefixOpen]);

  const handlePrefixSelect = (opt: PrefixOption) => {
    setPhone(opt.value + phoneDigitsOnly);
    setPrefixOpen(false);
  };
  const handlePrefixKeyDown = (e: React.KeyboardEvent, opt: PrefixOption) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handlePrefixSelect(opt); }
  };
  const prefixBtnClass = ["input__prefix input__prefix--solid input__dropdown-btn", "prefix-btn", prefixOpen ? "prefix-btn--open" : ""].filter(Boolean).join(" ");
  const prefixListClass = ["input__dropdown-list prefix-list", prefixOpen ? "prefix-list--open" : "prefix-list--closed"].join(" ");

  /* ── Step 2 fields ── */
  const [firstNameAr, setFirstNameAr] = useState("");
  const [firstNameEn, setFirstNameEn] = useState("");
  const [secondNameAr, setSecondNameAr] = useState("");
  const [secondNameEn, setSecondNameEn] = useState("");
  const [thirdNameAr, setThirdNameAr] = useState("");
  const [thirdNameEn, setThirdNameEn] = useState("");
  const [nationality, setNationality] = useState("");
  const [motherLang, setMotherLang] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [, setIdFile] = useState<UploadedFile[]>([]);

  /* ── Step 3 fields ── */
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [major, setMajor] = useState("");
  const [eduLang, setEduLang] = useState("");

  /* ── Step 4 fields ── */
  const [timezone, setTimezone] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");

  const handleNext = () => {
    if (activeStep === STEPS.length) {
      setActiveStep(STEPS.length + 1);
      setSubmitted(true);
    } else {
      setActiveStep((s) => s + 1);
    }
  };
  const handleBack = () => setActiveStep((s) => Math.max(s - 1, 1));

  return (
    <div className="sign-up-page-wrapper">
      <div className="sign-up-page">

        {/* ── Right panel: Form ── */}
        <div className="sign-up-page__content">

          <div className="sign-up-page__header">
            <h1 className="display-sm-bold">إنشاء حساب جديد</h1>
            <p className="text-md-regular sign-up-page__subtitle">
              أنشئ حسابك في منصة اختبارات همزة بسهولة عبر إدخال بياناتك الأساسية .
              <br />
              بمجرد التسجيل يمكنك الوصول للاختبارات، متابعة النتائج، وإدارة ملفك الشخصي.
            </p>
          </div>

          <p className="text-sm-regular sign-up-page__required-note">
            <span className="sign-up-page__required" aria-hidden="true">*</span>
            &nbsp;المعلومات المطلوبة
          </p>

          {/* ══════════════════════════════════════
              Step 1: معلومات الحساب
          ══════════════════════════════════════ */}
          {activeStep === 1 && (
            <form className="sign-up-page__form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>

              <h2 className="text-md-bold sign-up-page__section-title">معلومات الحساب</h2>

              <div className="sign-up-page__grid">

                {/* Email — wrapping label (implicit association) */}
                <FieldLabel label="البريد الشبكي" required>
                  <DgaTextInput name="email" type="text" size="lg" variant="darker"
                    value={email} onChange={(e: any) => setEmail(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                {/* Phone — native input, keep htmlFor/id */}
                <div className="dga-form-control dga-form-control--fullwidth">
                  <label htmlFor="su-phone-input" className="dga-label dga-label--lg">
                    <span className="sign-up-page__required" aria-hidden="true">* </span>رقم الجوال
                  </label>
                  <div className="input input--lg input--darker phone-input-wrapper">
                    <input id="su-phone-input" placeholder="00 000 0000" type="tel" inputMode="numeric"
                      value={phoneDigitsOnly} className="input__field"
                      onChange={(e) => setPhone(selectedCountryPrefix.value + e.target.value)} />
                    <div ref={prefixRef} className="prefix-container">
                      <button type="button" onClick={() => setPrefixOpen((v) => !v)}
                        className={prefixBtnClass} aria-haspopup="listbox" aria-expanded={prefixOpen}
                        aria-label={`رمز الدولة الحالي: ${selectedCountryPrefix.label}. اضغط لتغيير رمز الدولة`}>
                        <span className="input__prefix-icon" />
                        <span className="input__prefix-label">{selectedCountryPrefix.label}</span>
                        <span className="input__prefix-chevron">
                          <Image src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                            alt="" width={20} height={20} aria-hidden="true" className="prefix-chevron-icon" />
                        </span>
                      </button>
                      <ul role="listbox" className={prefixListClass} aria-label="اختر رمز الدولة">
                        <div className="prefix-list__scroll">
                          {PHONE_PREFIXES.map((opt) => {
                            const isActive = opt.value === selectedCountryPrefix.value;
                            return (
                              <li key={opt.value} role="option" aria-selected={isActive}
                                tabIndex={prefixOpen ? 0 : -1}
                                onClick={() => handlePrefixSelect(opt)}
                                onKeyDown={(e) => handlePrefixKeyDown(e, opt)}
                                className={`prefix-option${isActive ? " prefix-option--active" : ""}`}>
                                <span>{opt.label}</span>
                                <span className="sr-only">{opt.country}</span>
                                {isActive && <span className="prefix-option__check" aria-hidden="true">✓</span>}
                              </li>
                            );
                          })}
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <FieldLabel label="كلمة السر" required>
                  <DgaTextInput name="password" type="password" size="lg" variant="darker"
                    value={password} onChange={(e: any) => setPassword(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                {/* Confirm Password */}
                <FieldLabel label="تأكيد كلمة السر" required>
                  <DgaTextInput name="confirm-password" type="password" size="lg" variant="darker"
                    value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

              </div>

              <div className="sign-up-page__actions">
                <Button label="التالي" variant="primary-brand" size="lg" type="submit" />
              </div>
            </form>
          )}

          {/* ══════════════════════════════════════
              Step 2: المعلومات الشخصية
          ══════════════════════════════════════ */}
          {activeStep === 2 && (
            <form className="sign-up-page__form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>

              <h2 className="text-md-bold sign-up-page__section-title">المعلومات الشخصية</h2>

              <div className="sign-up-page__grid">

                <FieldLabel label="الاسم الاول" required>
                  <DgaTextInput name="first-name-ar" type="text" size="lg" variant="darker"
                    value={firstNameAr} onChange={(e: any) => setFirstNameAr(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <FieldLabel label="الاسم الاول (باللغة الإنجليزية)" required>
                  <DgaTextInput name="first-name-en" type="text" size="lg" variant="darker"
                    value={firstNameEn} onChange={(e: any) => setFirstNameEn(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <FieldLabel label="الاسم الثاني" required>
                  <DgaTextInput name="second-name-ar" type="text" size="lg" variant="darker"
                    value={secondNameAr} onChange={(e: any) => setSecondNameAr(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <FieldLabel label="الاسم الثاني (باللغة الإنجليزية)" required>
                  <DgaTextInput name="second-name-en" type="text" size="lg" variant="darker"
                    value={secondNameEn} onChange={(e: any) => setSecondNameEn(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <FieldLabel label="الاسم الثالث" required>
                  <DgaTextInput name="third-name-ar" type="text" size="lg" variant="darker"
                    value={thirdNameAr} onChange={(e: any) => setThirdNameAr(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <FieldLabel label="الاسم الثالث (باللغة الإنجليزية)" required>
                  <DgaTextInput name="third-name-en" type="text" size="lg" variant="darker"
                    value={thirdNameEn} onChange={(e: any) => setThirdNameEn(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                {/* تاريخ الميلاد — DateField handles its own label/input association */}
                <FieldGroup label="تاريخ الميلاد" required>
                  <DateField rtl fullwidth size="lg" variant="darker"
                    onChange={(date) => console.log(date)} />
                </FieldGroup>

                <FieldGroup label="الجنسية" required>
                  <DgaDropdown placeholder="اختر الجنسية" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={NATIONALITY_OPTIONS} className="w-full"
                    value={nationality} getSelectedOptions={(opt: any) => setNationality(opt.value)} />
                </FieldGroup>

                <FieldGroup label="اللغة الأم" required>
                  <DgaDropdown placeholder="اختر اللغة الأم" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={LANGUAGE_OPTIONS} className="w-full"
                    value={motherLang} getSelectedOptions={(opt: any) => setMotherLang(opt.value)} />
                </FieldGroup>

                <FieldGroup label="الاثبات" required>
                  <DgaDropdown placeholder="اختر نوع الاثبات" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={ID_TYPE_OPTIONS} className="w-full"
                    value={idType} getSelectedOptions={(opt: any) => setIdType(opt.value)} />
                </FieldGroup>

                <FieldLabel label="ادخل رقم الاثبات" required>
                  <DgaTextInput name="id-number" type="text" size="lg" variant="darker"
                    value={idNumber} onChange={(e: any) => setIdNumber(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <div className="dga-form-control dga-form-control--fullwidth sign-up-page__field--full">
                  <span className="dga-label dga-label--lg">ارفق نسخة من الاثبات</span>
                  <FileUpload
                    fileTypesText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وتشمل الصيغ الدعومة .jpg و .png و .pdf."
                    accept="image/*,.pdf"
                    actionName="تصفح الملفات"
                    showIcon={false}
                    getUploadedFile={(files: UploadedFile[]) => setIdFile(files)}
                  />
                </div>

              </div>

              <div className="sign-up-page__actions">
                <Button label="التالي" variant="primary-brand" size="lg" type="submit" />
                <Button label="رجوع" variant="secondary" size="lg" type="button" onClick={handleBack} />
              </div>
            </form>
          )}

          {/* ══════════════════════════════════════
              Step 3: المؤهلات الدراسية
          ══════════════════════════════════════ */}
          {activeStep === 3 && (
            <form className="sign-up-page__form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>

              <h2 className="text-md-bold sign-up-page__section-title">المؤهلات الدراسية</h2>

              <div className="sign-up-page__grid">

                <FieldGroup label="آخر مؤهل دراسي" required>
                  <DgaDropdown placeholder="اختر المؤهل" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={DEGREE_OPTIONS} className="w-full"
                    value={degree} getSelectedOptions={(opt: any) => setDegree(opt.value)} />
                </FieldGroup>

                <FieldLabel label="المؤسسة التعليمية" required>
                  <DgaTextInput name="institution" type="text" size="lg" variant="darker"
                    value={institution} onChange={(e: any) => setInstitution(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <FieldLabel label="التخصص الدراسي" required>
                  <DgaTextInput name="major" type="text" size="lg" variant="darker"
                    value={major} onChange={(e: any) => setMajor(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <FieldGroup label="اللغة الأساسية في التعليم" required>
                  <DgaDropdown placeholder="اختر اللغة" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={LANGUAGE_OPTIONS} className="w-full"
                    value={eduLang} getSelectedOptions={(opt: any) => setEduLang(opt.value)} />
                </FieldGroup>

              </div>

              <div className="sign-up-page__actions">
                <Button label="التالي" variant="primary-brand" size="lg" type="submit" />
                <Button label="رجوع" variant="secondary" size="lg" type="button" onClick={handleBack} />
              </div>
            </form>
          )}

          {/* ══════════════════════════════════════
              Step 4: الموقع
          ══════════════════════════════════════ */}
          {activeStep === 4 && (
            <form className="sign-up-page__form" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>

              <h2 className="text-md-bold sign-up-page__section-title">الموقع</h2>

              <div className="sign-up-page__grid">

                <FieldGroup label="المنطقة الزمنية" required>
                  <DgaDropdown placeholder="اختر المنطقة الزمنية" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={TIMEZONE_OPTIONS} className="w-full"
                    value={timezone} getSelectedOptions={(opt: any) => setTimezone(opt.value)} />
                </FieldGroup>

                <FieldGroup label="الدولة" required>
                  <DgaDropdown placeholder="اختر الدولة" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={COUNTRY_OPTIONS} className="w-full"
                    value={country} getSelectedOptions={(opt: any) => setCountry(opt.value)} />
                </FieldGroup>

                <FieldGroup label="الولاية/المقاطعة/الإقليم" required>
                  <DgaDropdown placeholder="اختر الولاية" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={REGION_OPTIONS} className="w-full"
                    value={region} getSelectedOptions={(opt: any) => setRegion(opt.value)} />
                </FieldGroup>

                <FieldGroup label="المدينة" required>
                  <DgaDropdown placeholder="اختر المدينة" size="lg" variant="darker"
                    optionLabel="name" trackBy="value" options={CITY_OPTIONS} className="w-full"
                    value={city} getSelectedOptions={(opt: any) => setCity(opt.value)} />
                </FieldGroup>

                <FieldLabel label="الشارع" required>
                  <DgaTextInput name="street" type="text" size="lg" variant="darker"
                    value={street} onChange={(e: any) => setStreet(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

                <FieldLabel label="الرمز البريدي" required>
                  <DgaTextInput name="postal" type="text" size="lg" variant="darker"
                    value={postal} onChange={(e: any) => setPostal(e.target.value)} onBlur={noop} fullwidth />
                </FieldLabel>

              </div>

              <div className="sign-up-page__actions">
                <Button label="إنشاء الحساب" variant="primary-brand" size="lg" type="submit" />
                <Button label="رجوع" variant="secondary" size="lg" type="button" onClick={handleBack} />
              </div>
            </form>
          )}

          {/* ══════════════════════════════════════
              Success: تم إنشاء الحساب
          ══════════════════════════════════════ */}
          {submitted && (
            <div role="status" aria-live="polite">
              <NotificationToast
                type="success"
                leadText="تم إنشاء حسابك بنجاح"
                helperText="يرجى مراجعة بريدك الشبكي لتفعيل الحساب وإكمال عملية التسجيل"
                open
                variant="stroke"
                inline
              />
            </div>
          )}

        </div>{/* /.sign-up-page__content */}

        {/* ── Left panel: Progress Indicator ── */}
        <aside className="sign-up-page__sidebar" aria-label="خطوات إنشاء الحساب">
          <ProgressIndicator steps={STEPS} activeStep={activeStep} alignment="vertical" />
        </aside>

      </div>
    </div>
  );
}
