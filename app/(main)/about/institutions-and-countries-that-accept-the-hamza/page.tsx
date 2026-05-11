import type { Metadata } from "next";
import { cookies } from "next/headers";
import InstitutionsContent from "./InstitutionsContent";
import "../about.css";
import "@/app/styles/Button.css";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("lang")?.value?.startsWith("en");
  return {
    title: isEn ? "Institutions & Countries" : "المؤسسات والدول التي تقبل همزة",
    description: isEn
      ? "Institutions around the world rely on Hamza test to assess Arabic language proficiency, including universities, government bodies, professional organizations, recruitment companies, and immigration authorities."
      : "تعتمد بعض المؤسسات حول العالم على اختبار همزة لتقييم الكفاءة في اللغة العربية تشمل هذه المؤسسات: الجامعات، الجهات الحكومية، الهيئات المهنية، شركات التوظيف، وجهات الهجرة في الدول الناطقة بالعربية أو المهتمة بها.",
  };
}

export default function InstitutionsPage() {
  return <InstitutionsContent />;
}