import OpenDataContent from "./OpenDataContent";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value === "en-US" ? "en" : "ar";

  return {
    title: st("eParticipation", "openDataTitle", locale),
  };
}

export default function page() {
  return (
    <>
      <div className="content">
        <OpenDataContent />
      </div>
    </>
  );
}
