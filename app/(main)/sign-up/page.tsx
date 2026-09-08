/**
 * Sign Up Page - Server Component
 * 
 * Fetches all dropdown options from backend API and passes them to the client component.
 */

import {
  fetchJsonList,
} from "@/app/_lib/category-service";
import { getFormattedCountriesList } from "@/app/_lib/countries-service";
import SignUpForm from "./SignUpForm";

export default async function SignUpPage() {
  // Fetch all dropdown data in parallel with error handling.
  // (Educational Institution and Academic specialization are free-text inputs
  // now, so their vocabularies are no longer fetched.)
  let motherTongueOptions = [];
  let educationQualificationsOptions = [];
  let proofOptions = [];
  let timezoneOptions = [];
  let countriesOptions = [];

  try {
    [
      motherTongueOptions,
      educationQualificationsOptions,
      proofOptions,
      timezoneOptions,
      countriesOptions,
    ] = await Promise.all([
      fetchJsonList("Mother tongue").catch((err) => {
        console.warn("Failed to fetch Mother tongue options:", err.message);
        return [];
      }),
      fetchJsonList("Educational Qualification").catch((err) => {
        console.warn("Failed to fetch Educational Qualification options:", err.message);
        return [];
      }),
      fetchJsonList("Proof").catch((err) => {
        console.warn("Failed to fetch Proof options:", err.message);
        return [];
      }),
      fetchJsonList("Time zone").catch((err) => {
        console.warn("Failed to fetch Time zone options:", err.message);
        return [];
      }),
      getFormattedCountriesList().catch((err) => {
        console.warn("Failed to fetch countries list:", err.message);
        return [];
      }),
    ]);
  } catch (error) {
    console.error("Error fetching sign-up data:", error);
  }

  return (
    <SignUpForm
      motherTongueOptions={motherTongueOptions}
      educationQualificationsOptions={educationQualificationsOptions}
      proofOptions={proofOptions}
      timezoneOptions={timezoneOptions}
      countriesOptions={countriesOptions}
    />
  );
}
