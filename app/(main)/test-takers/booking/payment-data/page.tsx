import PaymentDataClient from "./PaymentDataClient";
import PaymentDataWrapper from "./PaymentDataWrapper";
import { getTranslations } from "@/app/_lib/getTranslations";

export default async function Page() {
  const translations = await getTranslations();
  return (
    <div id="midd-wrapper">
      <PaymentDataClient />
      <section className="cmn-section lightgrey-bg screen20-first-section w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PaymentDataWrapper translations={translations} />
        </div>
      </section>
    </div>
  );
}
