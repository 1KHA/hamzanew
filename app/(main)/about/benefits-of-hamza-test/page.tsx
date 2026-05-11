import type { Metadata } from "next";
import { cookies } from "next/headers";
import BenefitsContent from "./BenefitsContent";
import "@/app/components/scroll-frame/ScrollFrame.css";
import "../about.css";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("lang")?.value?.startsWith("en");
  return {
    title: isEn ? "Benefits of Hamza Tests" : "أهمية اختبارات همزة",
    description: "",
  };
}

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
