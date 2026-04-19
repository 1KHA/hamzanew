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

    if (!session || !session.user) {
      return null;
    }

    const authorization =
      "Basic " +
      btoa(
        `${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`
      );

    // If you have a custom API endpoint to validate/get user data from token
    const response = await fetch(
      `${process.env.BASE_URL}${process.env.HAMZA_GET_USER_PROFILE_INFO}` +
        session.user.id,
      {
        method: "GET",
        headers: {
          Authorization: authorization,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (response.ok) {
      const userData = await response.json();
      return userData;
    }

    return null;
  } catch (error) {
    console.error("Error getting user data from token:", error);
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
