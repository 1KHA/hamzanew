import type { Metadata } from "next";
import BenefitsContent from "./BenefitsContent";
import "@/app/components/scroll-frame/ScrollFrame.css";
import "../about.css";

export const metadata: Metadata = {
  title: "أهمية اختبارات همزة",
  description: "",
};

export default function BenefitsOfHamzaTestPage() {
  return (
    <div
      className="bg-color-grey-50"
      style={{ padding: "clamp(16px, 3vw, 32px) clamp(16px, 6vw, 80px)" }}
    >
      <BenefitsContent />
    </div>
  );
}
