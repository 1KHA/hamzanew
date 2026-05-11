import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "عن همزة",
  description: "تعرف على مشروع همزة، أهدافه، والخدمات التي يقدمها في مجال قياس الكفاية اللغوية.",
  openGraph: {
    title: "عن همزة",
    description: "تعرف على مشروع همزة، أهدافه، والخدمات التي يقدمها في مجال قياس الكفاية اللغوية.",
  },
};

export default function AboutPage() {
  return (
    <section className="content">
      <AboutContent />
    </section>
  );
}
