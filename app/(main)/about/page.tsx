import type { Metadata } from "next";
import { cookies } from "next/headers";
import AboutContent from "./AboutContent";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const isEn = cookieStore.get("lang")?.value?.startsWith("en");
  return {
    title: isEn ? "About Hamza" : "عن همزة",
    description: isEn
      ? "Learn about Hamza project, its goals, and the services it provides in the field of language proficiency assessment."
      : "تعرف على مشروع همزة، أهدافه، والخدمات التي يقدمها في مجال قياس الكفاية اللغوية.",
    openGraph: {
      title: isEn ? "About Hamza" : "عن همزة",
      description: isEn
        ? "Learn about Hamza project, its goals, and the services it provides in the field of language proficiency assessment."
        : "تعرف على مشروع همزة، أهدافه، والخدمات التي يقدمها في مجال قياس الكفاية اللغوية.",
    },
  };
}

export default function AboutPage() {
  return (
    <section className="content">
      <AboutContent />
    </section>
  );
}
