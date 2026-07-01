import { getTranslations } from "@/app/_lib/getTranslations";
import TestBookingBaseClient from "./TestBookingBaseClient";

export default async function Page() {
  const translations = await getTranslations();

  return <TestBookingBaseClient translations={translations} />;
}
