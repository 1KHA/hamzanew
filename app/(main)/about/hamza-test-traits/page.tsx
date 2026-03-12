import type { Metadata } from "next";
import TraitsContent from "./TraitsContent";
import "../about.css";

export const metadata: Metadata = {
  title: "سمات إختبار همزة",
  description:
    "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.",
};

export default function HamzaTestTraitsPage() {
  return <TraitsContent />;
}
