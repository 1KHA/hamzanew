import type { Metadata } from "next";
import CommitteeContent from "./CommitteeContent";
import "../about.css";

export const metadata: Metadata = {
  title: "اللجنة الاستشارية ",
  description:
    "تهدف اللجنة استشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية.",
};

export default function PeriodicAdvisoryCommitteePage() {
  return <CommitteeContent />;
}
