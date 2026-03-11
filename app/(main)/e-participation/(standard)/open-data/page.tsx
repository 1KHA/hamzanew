import OpenDataContent from "./OpenDataContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التطوير المشترك والافكار"
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
