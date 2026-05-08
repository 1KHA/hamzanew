import type { Metadata } from "next";
import { cookies } from "next/headers";
import WhoWeAreContent from "./WhoWeAreContent";
import { getTranslations } from "@/app/_lib/getTranslations";
import "../about.css";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على رؤية ورسالة مشروع همزة، وقيمه الأساسية ومرتكزاته في تقديم اختبارات كفاءة لغوية معتمدة دولياً.",
};

export default async function WhoWeArePage() {
  let apiData = null;
  let translations = null;
  let langCookie = "ar-SA";

  try {
    const cookieStore = await cookies();
    langCookie = cookieStore.get("lang")?.value || "ar-SA";

    const baseURL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const [res, transRes] = await Promise.all([
      fetch(`${baseURL}/api/about/who-we-are`, {
        cache: "no-store",
        headers: {
          Cookie: `lang=${langCookie}`,
        },
      }),
      getTranslations().catch((err) => {
        console.error("[WhoWeAre] Failed to fetch translations:", err);
        return null;
      }),
    ]);

    if (res.ok) {
      apiData = await res.json();
    }
    translations = transRes;
  } catch (error) {
    console.error("Failed to fetch who-we-are content:", error);
  }

  return (
    <WhoWeAreContent
      apiData={apiData}
      translations={translations}
      locale={langCookie}
    />
  );
}
