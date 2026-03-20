import { Metadata } from "next";
import CoursePlayer from "./CoursePlayer";

export const metadata: Metadata = {
  title: "دورة مران همزة - مشاهدة الدروس",
  description:
    "شاهد دروس دورة مران همزة وتابع تقدمك في المهارات الأربع: الاستماع، والقراءة، والكتابة، والتحدث.",
};

export default function CoursePlayerPage() {
  return <CoursePlayer />;
}
