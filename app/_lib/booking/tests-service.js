"use server";

import { cookies } from "next/headers";
import { getAccessToken, clearTokenCache } from "../token-refresh-service";

// Helper function to make API calls with retry logic for 401 and 400 errors
const makeApiCallWithRetry = async (url, options, isRetry = false) => {
  const res = await fetch(url, options);

  if (!res.ok && (res.status === 401 || res.status === 400) && !isRetry) {
    console.log(
      `Received ${res.status}, clearing token cache and retrying once...`
    );
    clearTokenCache();

    // Get fresh token and retry
    const freshToken = await getAccessToken();
    const newOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${freshToken}`,
      },
    };

    return await makeApiCallWithRetry(url, newOptions, true);
  }

  return res;
};

export const fetchTests = async function name(
  testId = null,
  customFilter = null
) {
  if (!process.env.BASE_URL) {
    throw new Error("BASE_URL environment variable is not set");
  }

  let serviceUrl = `${process.env.BASE_URL}/o/c/tests`;

  // Add custom filter if provided (takes precedence)
  if (customFilter) {
    serviceUrl += `?filter=${encodeURIComponent(customFilter)}`;
  } else if (testId) {
    // Add filter if testId is provided
    serviceUrl += `?filter=id eq '${testId}'`;
  }

  console.log("Fetching tests from:", serviceUrl);

  const accessToken = await getAccessToken();

  if (accessToken === "" || accessToken === undefined || accessToken === null) {
    throw new Error("No access token");
  }

  const authorization = "Bearer " + accessToken;

  const cookieStore = await cookies();
  const language = cookieStore.get("lang")?.value || "ar-SA";

  const res = await makeApiCallWithRetry(serviceUrl, {
    method: "GET",
    headers: {
      Authorization: authorization,
      Accept: "application/json",
      "Accept-Language": language,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch tests:", {
      status: res.status,
      statusText: res.statusText,
      url: serviceUrl,
    });
    const errorText = await res
      .text()
      .catch(() => "Unable to read error response");
    console.error("Error response body:", errorText);
    throw new Error(`Failed to fetch tests: ${res.status} ${res.statusText}`);
  }

  const content = await res.json();

  return content;
};
