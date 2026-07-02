import PaymentWrapper from "./PaymentWrapper";
import "./payment.css";
import { getTranslations } from "@/app/_lib/getTranslations";

export default async function Page() {
  const translations = await getTranslations();
  return (
    <div id="midd-wrapper">
      <section className="cmn-section lightgrey-bg screen20-first-section">
        <div className="container">
          <PaymentWrapper translations={translations} />
        </div>
      </section>
    </div>
  );
}
