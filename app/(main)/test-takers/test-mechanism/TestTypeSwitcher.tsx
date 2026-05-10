"use client";

import { useState } from "react";
import ContentSwitcher from "@/app/components/content-switcher/ContentSwitcher";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../../components/button/Button";

export interface TabData {
  label: string;
  image: string;
  imageAlt: string;
  title: string;
  descriptions: string[];
  buttonText: string;
  buttonLink?: string;
}

interface TestTypeSwitcherProps {
  inPersonTab?: TabData;
  remoteTab?: TabData;
}

const DEFAULT_IN_PERSON_TAB: TabData = {
  label: "حضوري",
  image: "/assets/image/In-person test.png",
  imageAlt: "اختبار همزة حضوري - متقدم يؤدي الاختبار في مركز رسمي",
  title: "اختبار همزة عبر الحاسوب",
  descriptions: [
    "يتم في مراكز الاختبار الرسمية",
    "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
  ],
  buttonText: "التسجيل في الإختبار",
};

const DEFAULT_REMOTE_TAB: TabData = {
  label: "عن بعد",
  image: "/assets/image/remote test.png",
  imageAlt: "اختبار همزة عن بعد - متقدم يؤدي الاختبار عبر الإنترنت",
  title: "اختبار همزة عبر الحاسوب",
  descriptions: [
    "يتم عبر المنصة المخصصة بالاختبار",
    "تصدر النتائج بين 4 إلى 6 أسابيع من أداء الاختبار.",
  ],
  buttonText: "التسجيل في الإختبار",
};

export default function TestTypeSwitcher({
  inPersonTab = DEFAULT_IN_PERSON_TAB,
  remoteTab = DEFAULT_REMOTE_TAB,
}: TestTypeSwitcherProps) {
  const tabs = [inPersonTab, remoteTab];
  const [selected, setSelected] = useState(0);
  const current = tabs[selected];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const switcherRef = useRef<any>(null);

  const handleClick = useCallback(() => {
    requestAnimationFrame(() => {
      const el = switcherRef.current;
      if (!el) return;
      const val = (el as unknown as { selected: number }).selected ?? 0;
      if (val !== selected) {
        setSelected(val);
      }
    });
  }, [selected]);

  useEffect(() => {
    const el = switcherRef.current;
    if (!el) return;
    el.addEventListener("click", handleClick);
    return () => el.removeEventListener("click", handleClick);
  }, [handleClick]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[40px] xl:gap-[80px] items-center w-full">
      {/* Right Column: Content */}
      <div
        className="flex flex-col gap-[24px] items-start"
        role="tabpanel"
        aria-live="polite"
      >
        {/* Toggle Tabs */}
        <ContentSwitcher
          size="md"
          items={tabs.map((t) => ({ label: t.label, content: "" }))}
        />

        {/* Title & Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
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

            <div className="!mt-[32px]">
              <Button
                label={current.buttonText}
                variant="primary-brand"
                size="lg"
                icon="arrow-up-right-01"
                iconClass="white-icon"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Column: Image */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-[16px] overflow-hidden"
          >
            <Image
              alt={current.imageAlt}
              width={600}
              height={400}
              priority
              className="w-full h-auto object-cover"
              src={current.image}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
