import type { Metadata } from "next";
import WhoWeAreContent from "./WhoWeAreContent";
import "../about.css";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على رؤية ورسالة مشروع همزة، وقيمه الأساسية ومرتكزاته في تقديم اختبارات كفاءة لغوية معتمدة دولياً.",
};

export default async function WhoWeArePage() {
  let apiData = null;

  try {
    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseURL}/api/about/who-we-are`, {
      cache: "no-store",
    });
    if (res.ok) {
      apiData = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch who-we-are content:", error);
  }

  return <WhoWeAreContent apiData={apiData} />;
}
