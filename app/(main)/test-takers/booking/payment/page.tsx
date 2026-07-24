import PaymentWrapper from "./PaymentWrapper";
import "./payment.css";
import { getTranslations } from "@/app/_lib/getTranslations";

export default async function Page() {
  const translations = await getTranslations();
  return (
    <div id="midd-wrapper">
      <section className="cmn-section lightgrey-bg screen20-first-section w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PaymentWrapper translations={translations} />
        </div>
      </section>
    </div>
  );
}
