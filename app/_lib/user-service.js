"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const signUpUserSevice = async function signUpUserSevice(formData) {
  const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_SIGN_UP_API_URL}`;

  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
    );

  const res = await fetch(serviceUrl, {
    method: "POST",
    headers: {
      Authorization: authorization,
      Accept: "application/json",
    },
    body: formData,
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};

export async function getUserProfileInfo() {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const session = await getServerSession(authOptions);

    console.log("[getUserProfileInfo] Session from getServerSession:", JSON.stringify(session, null, 2));

    if (!session || !session.user) {
      console.log("[getUserProfileInfo] No session or no session.user");
      return null;
    }

    console.log("[getUserProfileInfo] Session user id:", session.user.id, "| email:", session.user.email, "| name:", session.user.name);

    const authorization =
      "Basic " +
      btoa(
        `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
      );

    const profileUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_USER_PROFILE_INFO}${session.user.id}`;
    console.log("[getUserProfileInfo] Fetching profile URL:", profileUrl);

    const response = await fetch(profileUrl, {
      method: "GET",
      headers: {
        Authorization: authorization,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log("[getUserProfileInfo] Profile API response status:", response.status);

    if (response.ok) {
      const userData = await response.json();
      console.log("[getUserProfileInfo] Profile API response body:", JSON.stringify(userData, null, 2));
      return userData;
    }

    console.log("[getUserProfileInfo] Profile API response NOT OK");
    return null;
  } catch (error) {
    console.error("[getUserProfileInfo] Error getting user data from token:", error);
    return null;
  }
}

export const updateUserProfileService = async function updateUserProfileService(formData) {
  const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_UPDATE_USER_PROFILE_API_URL}`;

  const authorization =
    "Basic " +
    btoa(
      `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
    );

  const res = await fetch(serviceUrl, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};
