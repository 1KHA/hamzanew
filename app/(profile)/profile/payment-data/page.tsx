import PaymentDataClient from "./PaymentDataClient";
import PaymentDataWrapper from "./PaymentDataWrapper";
import { getTranslations } from "@/app/_lib/getTranslations";

export default async function Page() {
  const translations = await getTranslations();
  return (
    <div id="midd-wrapper">
      <PaymentDataClient />
      <section className="cmn-section lightgrey-bg screen20-first-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <PaymentDataWrapper translations={translations} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
