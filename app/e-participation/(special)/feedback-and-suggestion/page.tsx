"use client";

import Image from "next/image";
import Button from "@/app/components/button/Button";
import {
  DgaDropdown,
  DgaFileUpload,
  DgaLabel,
  DgaTextarea,
  DgaTextInput,
} from "platformscode-new-react";
import { useEffect, useRef, useState } from "react";
import FileUpload from "@/app/components/FileUpload/FileUpload";

type PrefixOption = { label: string; value: string };

export default function Page() {
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);

  const prefixOptions: PrefixOption[] = [
    { label: "+966", value: "966" },
    { label: "+971", value: "971" },
    { label: "+965", value: "965" },
  ];

  const [prefix, setPrefix] = useState<PrefixOption>(prefixOptions[0]);

  // close dropdown on outside click + ESC
  const prefixRootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!prefixRootRef.current) return;
      if (!prefixRootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <form>
      <div className="section-spacing-4xl !grid !grid-cols-1 md:!grid-cols-2 !gap-6">
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg !font-bold">
            الاسم الاول <span className="text-red-600">*</span>
          </label>
          <DgaTextInput
            // label="الاسم الاول"
            feedbackIconType="error"
            name="firstName"
            placeholder="ادخل الاسم الاول"
            size="lg"
            type="text"
            defaultValue=""
            variant="darker"
            //    sx={{
            //   "& .dga-label": {
            //     fontWeight: "700" // أو القيمة التي تمثل semibold
            //   }
            // }}
          />
        </div>
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg !font-bold">
            الاسم الاخير <span className="text-red-600">*</span>
          </label>

          <DgaTextInput
            // label="الاسم الاخير"
            feedbackIconType="error"
            name="lastName"
            placeholder="ادخل الاسم الاخير"
            size="lg"
            type="text"
            defaultValue=""
            variant="darker"
          />
        </div>
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg !font-bold">
            البريد الالكتروني <span className="text-red-600">*</span>
          </label>
          <DgaTextInput
            // label="البريد الالكتروني"
            feedbackIconType="error"
            name="email"
            placeholder="ادخل البريد الالكتروني"
            size="lg"
            defaultValue=""
            variant="darker"
          />
        </div>
        {/* Phone with prefix dropdown */}
        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg !font-bold">
            رقم الجوال <span className="text-red-600">*</span>
          </label>

          {/* positioning context */}
          <div className="input input--lg input--darker !relative">
            {/* make room for prefix on the correct side */}
            <input
              placeholder="5xxxxxxxx"
              type="tel"
              value={phone}
              name="phone"
              className="input__field rtl:!pr-[104px] ltr:!pl-[104px]"
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Prefix pinned to the corner (RTL: right | LTR: left) */}
            <div
              ref={prefixRootRef}
              className="!absolute !top-0 !h-full !z-10 rtl:!end-0 ltr:!start-0 !flex !items-stretch"
            >
              {/* Hidden input to submit prefix value with the form */}
              <input type="hidden" name="countryCode" value={prefix.value} />

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="
                  input__prefix input__prefix--solid input__dropdown-btn
                  !h-full !flex !items-center !gap-2 !px-4
                  rtl:!border-s ltr:!border-e !border-[#E5E7EB]
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

              {/* Dropdown aligned to the same corner (RTL right | LTR left) */}
              <ul
                role="listbox"
                aria-label="Country code"
                className={[
                  "input__dropdown-list",
                  "!absolute !top-full !mt-1",
                  "rtl:!end-0 ltr:!start-0",
                  "!w-full",
                  "!overflow-hidden !border !border-[#E5E7EB] !bg-white !shadow-xl",
                  "!rounded-none", // remove radius
                  "!origin-top",
                  "!transition-all !duration-200 !ease-out",
                  open
                    ? "!opacity-100 !translate-y-0 !scale-100 pointer-events-auto"
                    : "!opacity-0 !-translate-y-1 !scale-95 pointer-events-none",
                ].join(" ")}
              >
                <div className="!max-h-56 !overflow-auto">
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setPrefix(opt);
                            setOpen(false);
                          }
                        }}
                        className={[
                          "!cursor-pointer !select-none !px-3 !py-2.5 !text-sm",
                          "!flex !items-center !justify-between",
                          "!transition-colors",
                          active
                            ? "!bg-[#EEF2FF] !text-[#111827] !font-medium"
                            : "!text-[#111827] hover:!bg-[#F3F4F6]",
                          "focus:!outline-none focus:!bg-[#E5E7EB]",
                        ].join(" ")}
                      >
                        <span>{opt.label}</span>
                        {active && (
                          <span className="!text-xs !text-[#4F46E5]">✓</span>
                        )}
                      </li>
                    );
                  })}
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div className="dga-form-control dga-form-control--fullwidth">
          <label className="dga-label dga-label--lg  !font-bold">موضوع</label>
          <DgaTextInput
            // label="موضوع"
            feedbackIconType="error"
            name="subject"
            placeholder="اكتب موضوعك"
            size="lg"
            type="text"
            defaultValue=""
            variant="darker"
          />
        </div>
        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className=" dga-label dga-label--lg !font-bold">
            نوع الاختبار
          </label>
          <DgaDropdown
            placeholder="اقتراحات"
            size="lg"
            variant="darker"
            optionLabel="label"
            trackBy="value"
            className="w-full"
            options={[
              { name: "اختيار 1", value: "اختيار 1" },
              { name: "اختيار 2", value: "اختيار 2" },
              { name: "اختيار 3", value: "اختيار 3" },
              { name: "اختيار 4", value: "اختيار 4" },
            ]}
          />
        </div>
        {/* <DgaDropdown
          options={[
            { name: "اختيار 1", value: "اختيار 1" },
            { name: "اختيار 2", value: "اختيار 2" },
            { name: "اختيار 3", value: "اختيار 3" },
            { name: "اختيار 4", value: "اختيار 4" },
          ]}
          placeholder="اقتراحات"
          size="lg"
          variant="darker"
          className="!w-full"
        /> */}
        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className=" dga-label dga-label--lg !font-bold">
            كيف يمكننا المساعدة؟
          </label>
          <DgaTextarea
            // label="كيف يمكننا المساعدة؟"
            placeholder="اكتب رسالتك"
            variant="darker"
            cols={50}
            rows={4}
            scrollbar={true}
            fullwidth={true}
          />
        </div>
        <div className="input-group dga-form-control dga-form-control--fullwidth">
          <label className=" dga-label dga-label--lg !font-bold">
            رفع المرفقات
          </label>
          <FileUpload
            // title="رفع المرفقات"
            fileTypesText="الحد الأقصى لحجم الملف المسموح به هو 2 ميجابايت، وصيغ الملفات المدعومة تشمل .jpg و .png و .pdf."
            accept="image/*,.pdf"
            // maximumFilesSize={2 * 1024 * 1024} // 2MB
            // getUploadedFile={handleFilesChange}
            // uploadFileOverSize={handleError}
            actionName="تصفح الملفات"
            showIcon={false}
          />
        </div>
    
      </div>

      <Button variant="primary-brand" size="lg" label="إرسال" />
    </form>
  );
}
