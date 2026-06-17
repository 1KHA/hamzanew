import { cookies } from "next/headers";
import { fetchWithAccessToken } from "./token-refresh-service";

export async function getTranslations() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const baseURL = `${process.env.BASE_URL}`;

  var URL = baseURL + "/o/hamza-test-language/language/english/get";
  if (locale === "ar-SA") {
    URL = baseURL + "/o/hamza-test-language/language/arabic/get";
  }

  const requestOptions = {
    method: "GET",
    // cache: "force-cache", // Optional: caching behavior
  };

  try {
    const res = await fetchWithAccessToken(URL, requestOptions);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const result = await res.text();

    return JSON.parse(result);
  } catch (error) {
    console.error(error);
    return null;
  }
}
