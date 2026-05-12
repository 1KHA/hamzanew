import type { Metadata } from "next";
import { cookies } from "next/headers";
import InstitutionsContent from "./InstitutionsContent";
import { st } from "@/app/_lib/static-text-server";
import "../about.css";
import "@/app/styles/Button.css";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return {
    title: st("about", "institutionsMetaTitle", locale),
    description: st("about", "institutionsMetaDescription", locale),
  };
}

export default async function InstitutionsPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return <InstitutionsContent locale={locale} />;
}
