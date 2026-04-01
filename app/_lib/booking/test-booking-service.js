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

export const fetchTestBookings = async function name(filter = null) {
  let serviceUrl = `${process.env.BASE_URL}/o/c/testbookings`;

  // Add filter parameter to URL if provided
  if (filter) {
    const encodedFilter = encodeURIComponent(filter);
    serviceUrl += `?filter=${encodedFilter}`;
  }

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
    console.log("response :" + JSON.stringify(res));
    throw new Error("Failed to fetch test bookings");
  }

  const content = await res.json();

  return content;
};

export const createTestBooking = async function name(bookingData) {
  if (!process.env.BASE_URL) {
    throw new Error("BASE_URL environment variable is not set");
  }

  const serviceUrl = `${process.env.BASE_URL}/o/c/testbookings`;

  const accessToken = await getAccessToken();

  if (accessToken === "" || accessToken === undefined || accessToken === null) {
    throw new Error("No access token");
  }

  const authorization = "Bearer " + accessToken;

  const cookieStore = await cookies();
  const language = cookieStore.get("lang")?.value || "ar-SA";

  const res = await makeApiCallWithRetry(serviceUrl, {
    method: "POST",
    headers: {
      Authorization: authorization,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    const errorText = await res
      .text()
      .catch(() => "Unable to read error response");
    console.error("Error response body:", errorText);
    throw new Error(
      `Failed to create test booking: ${res.status} ${res.statusText}`
    );
  }

  const content = await res.json();

  return content;
};

export const updateTestBooking = async function name(bookingId, bookingData) {
  if (!process.env.BASE_URL) {
    throw new Error("BASE_URL environment variable is not set");
  }

  if (!bookingId) {
    throw new Error("Booking ID is required");
  }

  const serviceUrl = `${process.env.BASE_URL}/o/c/testbookings/${bookingId}`;

  const accessToken = await getAccessToken();

  if (accessToken === "" || accessToken === undefined || accessToken === null) {
    throw new Error("No access token");
  }

  const authorization = "Bearer " + accessToken;

  const cookieStore = await cookies();
  const language = cookieStore.get("lang")?.value || "ar-SA";

  const res = await makeApiCallWithRetry(serviceUrl, {
    method: "PATCH",
    headers: {
      Authorization: authorization,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    const errorText = await res
      .text()
      .catch(() => "Unable to read error response");
    console.error("Error response body:", errorText);
    throw new Error(
      `Failed to update test booking: ${res.status} ${res.statusText}`
    );
  }

  const content = await res.json();

  return content;
};
