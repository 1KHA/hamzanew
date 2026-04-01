import { Metadata } from "next";
import PolicyContent from "./PolicyContent";

export const metadata: Metadata = {
  title: "سياسة المشاركة الإلكترونية",
};

export default function page() {
  return (
    <>
      <PolicyContent />
    </>
  );
}
