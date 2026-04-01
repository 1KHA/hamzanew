import { cookies } from "next/headers";
import { getAccessToken, clearTokenCache } from "./token-refresh-service";

// Helper function to make API calls with retry logic for 401 and 400 errors
const makeApiCallWithRetry = async (url, options, isRetry = false) => {
  const res = await fetch(url, options);

  if (!res.ok && (res.status === 401 || res.status === 400) && !isRetry) {
    console.log(
      `Received ${res.status}, clearing token cache and retrying once...`
    );
    clearTokenCache();

    try {
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
    } catch (tokenError) {
      // If token fetch fails, don't retry again - propagate the error
      console.error("Failed to get fresh token for retry:", tokenError.message);
      // Return the original response instead of throwing, so caller can handle it
      return res;
    }
  }

  return res;
};

export const fetchContent = async function name(contnetId) {
  const contentURL =
    `${process.env.BASE_URL}${process.env.STRUCTURED_CONTENT_API_URL}` +
    contnetId;

  const accessToken = await getAccessToken();

  if (accessToken === "" || accessToken === undefined || accessToken === null) {
    throw new Error("No access token");
  }

  const authorization = "Bearer " + accessToken;

  const cookieStore = await cookies(); // Await cookies()
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  const res = await makeApiCallWithRetry(contentURL, {
    method: "GET",
    headers: {
      Authorization: authorization,
      "Accept-Language": locale,
      Accept: "application/json",
    },
    // cache: "force-cache", // Optional: caching behavior
  });

  if (!res.ok) {
    const errorText = await res
      .text()
      .catch(() => "Unable to read error response");
    console.log("status :" + res.status);
    console.log("response body :" + errorText);
    throw new Error(
      `Failed to fetch content: ${res.status} ${res.statusText}. ${
        errorText ? `Error: ${errorText}` : ""
      }`
    );
  }

  const content = await res.json();

  return content;
};

export const fetchContentWithKey = async function name(key) {
  const getContentByKeyURL = `${process.env.BASE_URL}${process.env.HAMZA_GET_CONTENT_KEY_URL}/${key}`;

  const accessToken = await getAccessToken();

  if (accessToken === "" || accessToken === undefined || accessToken === null) {
    throw new Error("No access token");
  }

  const authorization = "Bearer " + accessToken;

  const res = await makeApiCallWithRetry(getContentByKeyURL, {
    method: "GET",
    headers: {
      Authorization: authorization,
      Accept: "text/plain",
    },
  });

  if (!res.ok) {
    const errorText = await res
      .text()
      .catch(() => "Unable to read error response");
    console.log("status :" + res.status);
    console.log("response body :" + errorText);
    throw new Error(
      `Failed to fetch content: ${res.status} ${res.statusText}. ${
        errorText ? `Error: ${errorText}` : ""
      }`
    );
  }

  const contentKey = await res.text();

  const contentURL =
    `${process.env.BASE_URL}${process.env.STRUCTURED_CONTENT_API_URL}` +
    contentKey;

  const cookieStore = await cookies(); // Await cookies()
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  // Get fresh token for the second API call in case the first call triggered a token refresh
  const freshAccessToken = await getAccessToken();
  const freshAuthorization = "Bearer " + freshAccessToken;

  const res2 = await makeApiCallWithRetry(contentURL, {
    method: "GET",
    headers: {
      Authorization: freshAuthorization,
      "Accept-Language": locale,
      Accept: "application/json",
    },
    // cache: "force-cache", // Optional: caching behavior
  });

  if (!res2.ok) {
    const errorText = await res2
      .text()
      .catch(() => "Unable to read error response");
    console.log(key + " : " + contentKey);
    console.log("status :" + res2.status);
    console.log("response body :" + errorText);
    throw new Error(
      `Failed to fetch content for key ${key}: ${res2.status} ${
        res2.statusText
      }. ${errorText ? `Error: ${errorText}` : ""}`
    );
  }

  const content = await res2.json();

  return content;
};
