import { Metadata } from "next";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";
import CoursePlayer from "./CoursePlayer";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  return {
    title: st("meranCourse", "playerMetaTitle", locale),
    description: st("meranCourse", "playerMetaDescription", locale),
  };
}

export default function CoursePlayerPage() {
  return <CoursePlayer />;
}
