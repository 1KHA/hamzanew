"use server";

import { cookies } from "next/headers";

export const searchlNewsArticles = async function name(
  searchText,
  selectedYear,
  selectedArticleType,
  page = 1,
  pageSize = 10
) {
  const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_ARTICLES_URL}/NEWS_ARTICLES/News article types`;
  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
    );

  const cookieStore = await cookies(); // Await cookies()
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  // Append query parameter to the URL
  const urlWithParam = new URL(serviceUrl);
  urlWithParam.searchParams.append("searchText", searchText);
  urlWithParam.searchParams.append("selectedYear", selectedYear);
  urlWithParam.searchParams.append("locale", locale);
  urlWithParam.searchParams.append("selectedArticleType", selectedArticleType);
  urlWithParam.searchParams.append("page", page.toString());
  urlWithParam.searchParams.append("pageSize", pageSize.toString());

  const res = await fetch(urlWithParam, {
    method: "POST",
    headers: {
      Authorization: authorization,
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

export const searchLatestNewsArticles = async function name(
  searchText,
  selectedYear,
  selectedArticleType
) {
  const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_ARTICLES_URL}/LATEST_NEWS_ARTICLES/Latest news article type`;
  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
    );

  const cookieStore = await cookies(); // Await cookies()
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  // Append query parameter to the URL
  const urlWithParam = new URL(serviceUrl);
  urlWithParam.searchParams.append("searchText", searchText);
  urlWithParam.searchParams.append("selectedYear", selectedYear);
  urlWithParam.searchParams.append("locale", locale);
  urlWithParam.searchParams.append("selectedArticleType", selectedArticleType);

  const res = await fetch(urlWithParam, {
    method: "POST",
    headers: {
      Authorization: authorization,
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

export const getNewsArticles = async function name(entryClassPK) {
  const cookieStore = await cookies(); // Await cookies()
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_ARTICLE_URL}/${locale}/${entryClassPK}`;
  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
    );

  // Append query parameter to the URL
  const urlWithParam = new URL(serviceUrl);

  const res = await fetch(urlWithParam, {
    method: "GET",
    headers: {
      Authorization: authorization,
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

export const searchResearchArticles = async function name(
  searchText,
  selectedYear,
  selectedArticleType,
  page = 1,
  pageSize = 10
) {
  const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_ARTICLES_URL}/RESEARCH_ARTICLE/Research article type`;
  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
    );

  const cookieStore = await cookies(); // Await cookies()
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  // Append query parameter to the URL
  const urlWithParam = new URL(serviceUrl);
  urlWithParam.searchParams.append("searchText", searchText);
  urlWithParam.searchParams.append("selectedYear", selectedYear);
  urlWithParam.searchParams.append("locale", locale);
  urlWithParam.searchParams.append("selectedArticleType", selectedArticleType);
  urlWithParam.searchParams.append("page", page.toString());
  urlWithParam.searchParams.append("pageSize", pageSize.toString());
  const res = await fetch(urlWithParam, {
    method: "POST",
    headers: {
      Authorization: authorization,
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

export const searchReportsAndStatisticsArticles = async function name(
  searchText,
  selectedYear,
  selectedArticleType,
  page = 1,
  pageSize = 10
) {
  const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_ARTICLES_URL}/REPORTS_AND_STATISTICS_ARTICLE/Reports & Statistics article type`;
  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
    );

  const cookieStore = await cookies(); // Await cookies()
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  // Append query parameter to the URL
  const urlWithParam = new URL(serviceUrl);
  urlWithParam.searchParams.append("searchText", searchText);
  urlWithParam.searchParams.append("selectedYear", selectedYear);
  urlWithParam.searchParams.append("locale", locale);
  urlWithParam.searchParams.append("selectedArticleType", selectedArticleType);
  urlWithParam.searchParams.append("page", page.toString());
  urlWithParam.searchParams.append("pageSize", pageSize.toString());
  const res = await fetch(urlWithParam, {
    method: "POST",
    headers: {
      Authorization: authorization,
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
