"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { DgaContentSwitcher } from "platformscode-new-react";
import Image from "next/image";
import Button from "../../components/button/Button";

const TEST_TYPES = [
  {
    label: "حضوري",
    image: "/assets/image/In-person test.png",
    imageAlt: "اختبار همزة حضوري - متقدم يؤدي الاختبار في مركز رسمي",
    title: "اختبار همزة عبر الحاسوب",
    descriptions: [
      "يتم في مراكز الاختبار الرسمية",
      "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
    ],
  },
  {
    label: "عن بعد",
    image: "/assets/image/remote test.png",
    imageAlt: "اختبار همزة عن بعد - متقدم يؤدي الاختبار عبر الإنترنت",
    title: "اختبار همزة عبر الحاسوب",
    descriptions: [
      "يتم عبر المنصة المخصصة بالاختبار",
      "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
    ],
  },
] as const;

export default function TestTypeSwitcher() {
  const [selected, setSelected] = useState(0);
  const [visible, setVisible] = useState(true);
  const current = TEST_TYPES[selected];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const switcherRef = useRef<any>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    requestAnimationFrame(() => {
      const el = switcherRef.current;
      if (!el) return;
      const val = (el as unknown as { selected: number }).selected ?? 0;
      if (val !== selected) {
        setVisible(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setSelected(val);
          setVisible(true);
        }, 250);
      }
    });
  }, [selected]);

  useEffect(() => {
    const el = switcherRef.current;
    if (!el) return;
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, [handleClick]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const transitionStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[40px] xl:gap-[80px] items-center w-full">

      {/* Right Column: Content */}
      <div className="flex flex-col gap-[24px] items-start" role="tabpanel" aria-live="polite">
        {/* Toggle Tabs */}
        <DgaContentSwitcher
          ref={switcherRef}
          size="md"
          items={TEST_TYPES.map((t) => ({ label: t.label, content: "" }))}
        />

        {/* Title & Description */}
        <div
          className="transition-[opacity,transform] duration-300 ease-in-out"
          style={transitionStyle}
        >
          <h2 id="test-type-title" className="display-xs-bold text-[#101828]">
            {current.title}
          </h2>

          <div className="flex flex-col gap-[8px] mt-[24px]">
            {current.descriptions.map((desc, i) => (
              <p key={i} className="text-md-regular text-[#475467]">
                {desc}
              </p>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          label="التسجيل في الإختبار"
          variant="primary-brand"
          size="lg"
          icon="arrow-up-right-01"
          iconClass="white-icon"
        />
      </div>

      {/* Left Column: Image */}
      <div className="relative">
        <div
          className="rounded-[16px] overflow-hidden transition-[opacity,transform] duration-300 ease-in-out"
          style={transitionStyle}
        >
          <Image
            alt={current.imageAlt}
            width={600}
            height={400}
            priority
            className="w-full h-auto object-cover"
            src={current.image}
          />
        </div>
      </div>
    </div>
  );
}
