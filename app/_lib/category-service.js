"use server";

import { cookies } from "next/headers";
import { fetchWithAccessToken } from "./token-refresh-service";

export const fetchJsonList = async function fetchJsonList(vocabularyName) {
  //   const serviceUrl =
  //     `${process.env.BASE_URL}${process.env.HAMZA_CATEGORY_SERVICE_API_URL}` +
  //     vocabularyName;

  const serviceUrl =
    `${process.env.BASE_URL}${process.env.HAMZA_CATEGORY_SERVICE_API_URL}` +
    vocabularyName;

  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  const res = await fetchWithAccessToken(serviceUrl, {
    method: "GET",
    headers: {
      "Accept-Language": locale,
    },
    // cache: "force-cache", // Optional: caching behavior
  });

  if (!res.ok) {
    console.log("response :" + res);
    throw new Error("Failed to fetch content");
  }

  const content = await res.json();

  return content;
};

export const fetchSubCategoryList = async function fetchSubCategoryList(
  vocabularyId,
  parentCategoryId
) {
  const serviceUrl =
    `${process.env.BASE_URL}${process.env.HAMZA_CHILD_CATEGORY_SERVICE_API_URL}` +
    vocabularyId +
    "/" +
    parentCategoryId;

  const cookieStore = await cookies();
  const language = cookieStore.get("lang")?.value || "ar-SA";

  const res = await fetchWithAccessToken(serviceUrl, {
    method: "GET",
    headers: {
      "Accept-Language": language,
    },
    // cache: "force-cache", // Optional: caching behavior
  });

  if (!res.ok) {
    console.log("response :" + res);
    throw new Error("Failed to fetch content");
  }

  const content = await res.json();

  return content;
};
