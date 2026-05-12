import { Metadata } from "next";
import PolicyContent from "./PolicyContent";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return {
    title: st("eParticipation", "policyTitle", locale),
  };
}

export default function page() {
  return (
    <>
      <PolicyContent />
    </>
  );
}
