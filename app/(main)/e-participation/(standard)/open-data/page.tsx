import OpenDataContent from "./OpenDataContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "البيانات المفتوحة"
};
export default function page() {
  return (
    <>
      <div className="content">
        <OpenDataContent />
      </div>
    </>
  );
}
