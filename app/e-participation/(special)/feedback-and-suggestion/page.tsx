"use client";

import Image from "next/image";
import Button from "@/app/components/button/Button";
import {
  DgaDropdown,
  DgaTextarea,
  DgaTextInput,
} from "platformscode-new-react";
import { useEffect, useRef, useState } from "react";
import FileUpload, { UploadedFile } from "@/app/components/FileUpload/FileUpload";

type PrefixOption = { label: string; value: string };

export default function Page() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    file:[] as UploadedFile[]
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [open, setOpen] = useState(false);

  const prefixOptions: PrefixOption[] = [
    { label: "+966", value: "966" },
    { label: "+971", value: "971" },
    { label: "+965", value: "965" },
  ];

  const [prefix, setPrefix] = useState<PrefixOption>(prefixOptions[0]);
  const prefixRootRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   function onDocClick(e: MouseEvent) {
  //     if (!prefixRootRef.current) return;
  //     if (!prefixRootRef.current.contains(e.target as Node)) setOpen(false);
  //   }
  //   function onEsc(e: KeyboardEvent) {
  //     if (e.key === "Escape") setOpen(false);
  //   }
  //   document.addEventListener("mousedown", onDocClick);
  //   document.addEventListener("keydown", onEsc);
  //   return () => {
  //     document.removeEventListener("mousedown", onDocClick);
  //     document.removeEventListener("keydown", onEsc);
  //   };
  // }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateField = (name: string, value: string) => {
    const requiredFields = ["firstName", "lastName", "email", "phone"];
    if (requiredFields.includes(name) && !value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "حقل إلزامي" }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (e: any) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e: any) => {
    //  onSubmit={(e) => {
    e.preventDefault();
    // Final validation before submit

    const requiredFields = ["firstName", "lastName", "email", "phone"];
    const newErrors: { [key: string]: string } = {};
    requiredFields.forEach((field) => {
      const value = formData[field as keyof typeof formData];
      if (typeof value === "string" && !value.trim()) {
        newErrors[field] = "حقل إلزامي";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalData = {
      ...formData,
      phone: `${prefix.value}${formData.phone}`,
    };

    console.log("Form Submitted:", finalData);
  };

  const ErrorMessage = () => (
    <div className="invalid-feedback flex! justify-start! gap-2! mt-1!">
      <Image
        alt="help-icon"
        width={16}
        height={16}
        className="inline-block red-icon"
        src={`/assets/icons/stroke-standard/help-circle-stroke-rounded.svg`}
      />
      حقل إلزامي
    </div>
  );

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="section-spacing-4xl grid! grid-cols-1 md:grid-cols-2! gap-6!">
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg font-bold!">
            الاسم الاول <span className="text-red-600">*</span>
          </label>
          <DgaTextInput
            name="firstName"
            placeholder="ادخل الاسم الاول"
            size="lg"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.firstName}
            variant="darker"
          />
          {errors.firstName && <ErrorMessage />}
        </div>

        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg font-bold!">
            الاسم الاخير <span className="text-red-600">*</span>
          </label>
          <DgaTextInput
            name="lastName"
            placeholder="ادخل الاسم الاخير"
            size="lg"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.lastName}
            variant="darker"
          />
          {errors.lastName && <ErrorMessage />}
        </div>

        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg font-bold!">
            البريد الالكتروني <span className="text-red-600">*</span>
          </label>
          <DgaTextInput
            name="email"
            placeholder="ادخل البريد الالكتروني"
            size="lg"
            type="text"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.email}
            variant="darker"
          />
          {errors.email && <ErrorMessage />}
        </div>

        {/* Phone with prefix dropdown */}
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg font-bold!">
            رقم الجوال <span className="text-red-600">*</span>
          </label>

          <div
            className={`input input--lg input--darker relative! ${
              errors.phone ? "input--error" : ""
            }`}
          >
            <input
              placeholder="5xxxxxxxx"
              type="tel"
              value={formData.phone}
              name="phone"
              className="input__field rtl:pr-[104px]! ltr:pl-[104px]!"
              onChange={handleChange}
              onBlur={(e) => validateField("phone", e.target.value)}
            />

            <div
              ref={prefixRootRef}
              className="absolute! top-0! h-full! z-10! rtl:end-0! ltr:start-0! flex! items-stretch!"
            >
              <input type="hidden" name="countryCode" value={prefix.value} />

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="
                  input__prefix input__prefix--solid input__dropdown-btn
                  h-full! flex! items-center! gap-2! px-4!
                  rtl:border-s! ltr:border-e! border-[#E5E7EB]!
                "
                aria-haspopup="listbox"
                aria-expanded={open}
              >
                <span className="input__prefix-icon" />
                <span className="dropdown__label" />
                <span className="input__prefix-label">{prefix.label}</span>

                <span className="input__prefix-chevron">
                  <Image
                    src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden
                    className={open ? "rotate-180" : ""}
                  />
                </span>
              </button>

              <ul
                role="listbox"
                className={[
                  "input__dropdown-list",
                  "absolute! top-full! mt-1!",
                  "rtl:end-0! ltr:start-0!",
                  "w-full!",
                  "overflow-hidden! border! border-[#E5E7EB]! bg-white! shadow-xl!",
                  "rounded-none!",
                  "origin-top!",
                  "transition-all! duration-200! ease-out!",
                  open
                    ? "opacity-100! translate-y-0! scale-100! pointer-events-auto"
                    : "opacity-0! -translate-y-1! scale-95! pointer-events-none",
                ].join(" ")}
              >
                <div className="max-h-56! overflow-auto!">
                  {prefixOptions.map((opt) => {
                    const active = opt.value === prefix.value;
                    return (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={active}
                        tabIndex={open ? 0 : -1}
                        onClick={() => {
                          setPrefix(opt);
                          setOpen(false);
                        }}
                        className={[
                          "cursor-pointer! select-none! px-3! py-2.5! text-sm!",
                          "flex! items-center! justify-between!",
                          active
                            ? "bg-[#EEF2FF]! text-[#111827]! font-medium!"
                            : "text-[#111827]! hover:bg-[#F3F4F6]!",
                        ].join(" ")}
                      >
                        <span>{opt.label}</span>
                        {active && (
                          <span className="text-xs! text-[#4F46E5]!">✓</span>
                        )}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>
          {errors.phone && <ErrorMessage />}
        </div>

        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg  font-bold!">موضوع</label>
          <DgaTextInput
            name="subject"
            placeholder="اكتب موضوعك"
            size="lg"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            onBlur={()=>{}}
            variant="darker"
          />
        </div>

        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className=" dga-label dga-label--lg font-bold!">
            نوع الاختبار
          </label>
          <DgaDropdown
            placeholder="اقتراحات"
            size="lg"
            variant="darker"
            optionLabel="name"
            trackBy="value"
            className="w-full"
            value={formData.category}
            // onChange={(val: any) =>
            //   setFormData((prev) => ({ ...prev, category: val.value }))
            // }
              getSelectedOptions={(option: any) => {
    console.log(option.name, option.value);
    setFormData((prev) => ({ ...prev, category: option.value }));
  }}
            options={[
              { name: "اختيار 1", value: "اختيار 1" },
              { name: "اختيار 2", value: "اختيار 2" },
              { name: "اختيار 3", value: "اختيار 3" },
              { name: "اختيار 4", value: "اختيار 4" },
            ]}
          />
        </div>

        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className=" dga-label dga-label--lg font-bold!">
            كيف يمكننا المساعدة؟
          </label>
          <DgaTextarea
            name="message"
            placeholder="اكتب رسالتك"
            variant="darker"
            value={formData.message}
            onChange={handleChange}
            cols={50}
            rows={4}
            scrollbar={true}
            fullwidth={true}
          />
        </div>

        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className=" dga-label dga-label--lg font-bold!">
            رفع المرفقات
          </label>
          <FileUpload
            fileTypesText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وصيغ الملفات المدعومة تشمل .jpg و .png و .pdf."
            accept="image/*,.pdf"
            actionName="تصفح الملفات"
            showIcon={false}
            getUploadedFile={(files: UploadedFile[]) => {
              console.log(files);
              setFormData((prev) => ({ ...prev, file: files }));
            }}
          />
        </div>
      </div>

      <Button type="submit" variant="primary-brand" size="lg" label="إرسال" />
    </form>
  );
}
