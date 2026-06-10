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

/**
 * Builds the shared Basic auth header used by the profile service endpoints.
 */
function getBasicAuthHeader() {
  return (
    "Basic " +
    btoa(`${process.env.BASIC_AUTH_USERNAME}:${process.env.BASIC_AUTH_PASSWORD}`)
  );
}

/**
 * Safely parses a fetch Response body as JSON, falling back to raw text.
 */
async function parseResponseBody(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

/**
 * Step 1 — Request a password reset link.
 * POST /forgot-password  body: { email }
 */
export const requestPasswordResetService = async function requestPasswordResetService(
  email
) {
  try {
    const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_FORGOT_PASSWORD_API_URL}`;

    const response = await fetch(serviceUrl, {
      method: "POST",
      headers: {
        Authorization: getBasicAuthHeader(),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const data = await parseResponseBody(response);

    return {
      status: response.ok ? "SUCCESS" : "FAIL",
      message:
        data.message ||
        data.error ||
        (response.ok
          ? "Reset link sent"
          : `Failed to send reset link (HTTP ${response.status})`),
      data,
    };
  } catch (error) {
    console.error("[requestPasswordResetService] error:", error);
    return { status: "FAIL", message: "An error occurred while sending the reset link" };
  }
};

/**
 * Step 2 — Validate a reset token from the emailed link.
 * GET /reset-password/validate?token=...
 */
export const validateResetTokenService = async function validateResetTokenService(
  token
) {
  try {
    const serviceUrl = `${process.env.BASE_URL}${
      process.env.HAMZA_VALIDATE_RESET_TOKEN_API_URL
    }?token=${encodeURIComponent(token)}`;

    const response = await fetch(serviceUrl, {
      method: "GET",
      headers: {
        Authorization: getBasicAuthHeader(),
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await parseResponseBody(response);

    return {
      valid: response.ok,
      message:
        data.message ||
        data.error ||
        (response.ok ? "Token is valid" : "Invalid or expired token"),
      data,
    };
  } catch (error) {
    console.error("[validateResetTokenService] error:", error);
    return { valid: false, message: "An error occurred while validating the token" };
  }
};

/**
 * Step 3 — Reset the password using a validated token.
 * POST /reset-password  body: { token, newPassword }
 */
export const resetPasswordService = async function resetPasswordService(
  token,
  newPassword
) {
  try {
    const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_RESET_PASSWORD_API_URL}`;

    const response = await fetch(serviceUrl, {
      method: "POST",
      headers: {
        Authorization: getBasicAuthHeader(),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
      cache: "no-store",
    });

    const data = await parseResponseBody(response);

    return {
      status: response.ok ? "SUCCESS" : "FAIL",
      message:
        data.message ||
        data.error ||
        (response.ok
          ? "Password reset successfully"
          : `Failed to reset password (HTTP ${response.status})`),
      data,
    };
  } catch (error) {
    console.error("[resetPasswordService] error:", error);
    return { status: "FAIL", message: "An error occurred while resetting the password" };
  }
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
