/**
 * Hamza Ambassadors Page
 *
 * This page displays information about the Hamza Ambassadors program.
 *
 * @accessibility
 * - Uses semantic HTML (<section>) for structure
 * - Uses aria-labelledby for section identification
 *
 * @returns {JSX.Element} The rendered Hamza Ambassadors page.
 */
import type { Metadata } from "next";
import { cookies } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("lang")?.value?.startsWith("en");
  return {
    title: isEn ? "Hamza Ambassadors" : "سفراء همزة",
    description: isEn
      ? "The Advisory Committee aims to provide consultations and recommendations related to developing measurement tools and approved standards."
      : "تهدف اللجنة الاستشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية لمختلف الفئات.",
  };
}
export default function HamzaAmbassadorsPage() {
  return (
      <section
        className="section-spacing-8xl custom-container !my-54"
        aria-labelledby="ambassadors-heading"
      >
      </section>
  );
}
