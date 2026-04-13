"use server";

import { cookies } from "next/headers";

export const fetchCountriesList = async function name() {
  const serviceUrl =
    `${process.env.BASE_URL}` +
    "/o/headless-admin-address/v1.0/countries?pageSize=500&fields=a2,title_i18n";

  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
    );

  const res = await fetch(serviceUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authorization,
    },
    redirect: "follow",
    // cache: "force-cache", // Optional: caching behavior
  });

  if (!res.ok) {
    console.log("response :" + res);
    throw new Error("Failed to fetch countries");
  }

  const content = await res.json();

  return content;
};

export const getFormattedCountriesList = async function name() {
  try {
    // Get language from cookie
    const cookieStore = await cookies();
    const language = cookieStore.get("lang")?.value || "ar-SA";

    const countriesData = await fetchCountriesList();

    if (!countriesData || !countriesData.items) {
      return [];
    }

    const formattedCountries = countriesData.items.map((country) => {
      // Determine which language title to use based on cookie value
      let countryLabel;
      if (language === "en-US") {
        countryLabel = country.title_i18n?.en_US;
      } else {
        countryLabel = country.title_i18n?.ar_SA;
      }

      return {
        label: countryLabel,
        key: country.a2?.toLowerCase() || "",
      };
    });

    // Sort countries alphabetically by label
    return formattedCountries.sort((a, b) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error("Error formatting countries list:", error);
    return [];
  }
};
