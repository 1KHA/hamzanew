"use client";

import { useRef } from "react";

export interface OtpInputProps {
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
  idPrefix?: string;
  ariaLabel?: string;
  cellAriaLabel?: (index: number) => string;
}

export default function OtpInput({
  value,
  onChange,
  hasError = false,
  idPrefix = "otp",
  ariaLabel = "رمز التحقق المكون من 6 أرقام",
  cellAriaLabel = (i) => `الخانة ${i + 1} من 6`,
}: OtpInputProps) {
  const cells = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

  const update = (i: number, char: string) => {
    const d = char.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = d;
    onChange(next.join(""));
    if (d && i < 5) cells.current[i + 1]?.focus();
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        const next = [...digits];
        next[i] = "";
        onChange(next.join(""));
      } else if (i > 0) {
        cells.current[i - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      cells.current[Math.min(i + 1, 5)]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      cells.current[Math.max(i - 1, 0)]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(text);
    cells.current[Math.min(text.length, 5)]?.focus();
  };

  return (
    <div className="otp-input" role="group" aria-label={ariaLabel} dir="ltr">
      {digits.map((d, i) => (
        <div
          key={i}
          className={[
            "input input--lg input--darker otp-input__wrapper",
            d ? "otp-input__wrapper--filled" : "",
            hasError ? "input--error" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <input
            ref={(el) => {
              cells.current[i] = el;
            }}
            id={i === 0 ? `${idPrefix}-0` : undefined}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={d}
            onChange={(e) => update(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className="input__field otp-input__cell"
            aria-label={cellAriaLabel(i)}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-required="true"
          />
        </div>
      ))}
    </div>
  );
}
