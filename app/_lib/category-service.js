"use server";

import { cookies } from "next/headers";

export const fetchJsonList = async function name(vocabularyName) {
  //   const serviceUrl =
  //     `${process.env.BASE_URL}${process.env.HAMZA_CATEGORY_SERVICE_API_URL}` +
  //     vocabularyName;

  const serviceUrl =
    `${process.env.BASE_URL}${process.env.HAMZA_CATEGORY_SERVICE_API_URL}` +
    vocabularyName;

  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
    );

  const cookieStore = await cookies();
  const language = cookieStore.get("lang")?.value || "ar-SA";

  const res = await fetch(serviceUrl, {
    method: "GET",
    headers: {
      Authorization: authorization,
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

export const fetchSubCategoryList = async function name(
  vocabularyId,
  parentCategoryId
) {
  const serviceUrl =
    `${process.env.BASE_URL}${process.env.HAMZA_CHILD_CATEGORY_SERVICE_API_URL}` +
    vocabularyId +
    "/" +
    parentCategoryId;

  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
    );

  const cookieStore = await cookies();
  const language = cookieStore.get("lang")?.value || "ar-SA";

  const res = await fetch(serviceUrl, {
    method: "GET",
    headers: {
      Authorization: authorization,
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
