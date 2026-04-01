import type { Metadata } from "next";
import WhoWeAreContent from "./WhoWeAreContent";
import "../about.css";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرف على رؤية ورسالة مشروع همزة، وقيمه الأساسية ومرتكزاته في تقديم اختبارات كفاءة لغوية معتمدة دولياً.",
};

export default function WhoWeArePage() {
  return <WhoWeAreContent />;
}
