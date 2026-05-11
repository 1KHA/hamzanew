import type { Metadata } from "next";
import InstitutionsContent from "./InstitutionsContent";
import "../about.css";
import "@/app/styles/Button.css";

export const metadata: Metadata = {
  title: "المؤسسات والدول التي تقبل همزة",
  description:
    "تعتمد بعض المؤسسات حول العالم على اختبار همزة لتقييم الكفاءة في اللغة العربية تشمل هذه المؤسسات: الجامعات، الجهات الحكومية، الهيئات المهنية، شركات التوظيف، وجهات الهجرة في الدول الناطقة بالعربية أو المهتمة بها.",
};

export default function InstitutionsPage() {
  return <InstitutionsContent />;
}