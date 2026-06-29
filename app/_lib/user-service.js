"use server";
import { fetchWithAccessToken } from "./token-refresh-service";
import { getUserAuth } from "./user-token-service";

export const signUpUserSevice = async function signUpUserSevice(formData) {
  const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_SIGN_UP_API_URL}`;

  const res = await fetchWithAccessToken(serviceUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};

/**
 * MFA step 1 — validate email + password and trigger an OTP email.
 * POST /login  body: { email, password }
 * On success the backend emails the OTP and returns an mfaToken (ticket key)
 * that must be presented to verify-otp / resend-otp. The OTP itself is never
 * returned. A FAIL with 401 means invalid credentials.
 */
export const loginRequestService = async function loginRequestService(
  email,
  password
) {
  try {
    const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_LOGIN_API_URL}`;

    const response = await fetchWithAccessToken(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    const data = await parseResponseBody(response);

    const status = response.ok && data.status === "SUCCESS" ? "SUCCESS" : "FAIL";
    if (status === "FAIL") {
      console.warn(
        "[loginRequestService] backend returned non-success:",
        response.status,
        data
      );
    }

    return {
      status,
      message: data.message || data.error || "",
      code: data.code,
      mfaToken: data.mfaToken,
    };
  } catch (error) {
    console.error("[loginRequestService] error:", error);
    return { status: "FAIL", message: "An error occurred while signing in" };
  }
};

// Note: OTP verification is NOT a standalone service action — it runs inside
// NextAuth authorize() (see lib/auth.ts verifyOtpTicket) so the session can only
// be issued after the OTP is verified server-side. Calling verify-otp separately
// from the client would let the session be minted without it (MFA bypass).

/**
 * Resend a login OTP for an in-progress MFA session.
 * POST /login/resend-otp  body: { mfaToken }
 * Returns a fresh mfaToken; the previous one is invalidated server-side.
 */
export const resendOtpService = async function resendOtpService(mfaToken) {
  try {
    const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_RESEND_OTP_API_URL}`;

    const response = await fetchWithAccessToken(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ mfaToken }),
      cache: "no-store",
    });

    const data = await parseResponseBody(response);

    return {
      status: response.ok && data.status === "SUCCESS" ? "SUCCESS" : "FAIL",
      message: data.message || data.error || "",
      code: data.code,
      mfaToken: data.mfaToken,
    };
  } catch (error) {
    console.error("[resendOtpService] error:", error);
    return { status: "FAIL", message: "An error occurred while resending the code" };
  }
};

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

    const response = await fetchWithAccessToken(serviceUrl, {
      method: "POST",
      headers: {
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

    const response = await fetchWithAccessToken(serviceUrl, {
      method: "GET",
      headers: {
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

    const response = await fetchWithAccessToken(serviceUrl, {
      method: "POST",
      headers: {
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

/**
 * Activate a newly-registered account using the token from the activation email.
 * POST /activate-account  body: { token }
 */
export const activateAccountService = async function activateAccountService(token) {
  try {
    const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_ACTIVATE_ACCOUNT_API_URL}`;
    console.log("HAMZA_ACTIVATE_ACCOUNT_API_URL serviceUrl: " + serviceUrl);

    const response = await fetchWithAccessToken(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });

    const data = await parseResponseBody(response);

    return {
      status: response.ok && data.status === "SUCCESS" ? "SUCCESS" : "FAIL",
      message: data.message || data.error || "",
      code: data.code,
    };
  } catch (error) {
    console.error("[activateAccountService] error:", error);
    return { status: "FAIL", message: "An error occurred while activating the account" };
  }
};

/**
 * Resend the account-activation link for an unactivated account.
 * POST /activate-account/resend  body: { email }
 */
export const resendActivationService = async function resendActivationService(email) {
  try {
    const serviceUrl = `${process.env.BASE_URL}${process.env.HAMZA_RESEND_ACTIVATION_API_URL}`;

    const response = await fetchWithAccessToken(serviceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const data = await parseResponseBody(response);

    return {
      status: response.ok && data.status === "SUCCESS" ? "SUCCESS" : "FAIL",
      message: data.message || data.error || "",
      code: data.code,
    };
  } catch (error) {
    console.error("[resendActivationService] error:", error);
    return { status: "FAIL", message: "An error occurred while resending the activation link" };
  }
};

export async function getUserProfileInfo() {
  try {
    const auth = await getUserAuth();

    if (!auth?.accessToken || auth.error) {
      console.log("[getUserProfileInfo] No user token / refresh failed");
      return null;
    }

    console.log("[getUserProfileInfo] User id:", auth.id, "| email:", auth.email);

    const profileUrl = `${process.env.BASE_URL}${process.env.HAMZA_GET_USER_PROFILE_INFO}${auth.id}`;
    console.log("[getUserProfileInfo] Fetching profile URL:", profileUrl);

    // Runs as the signed-in user (their own token).
    const response = await fetch(profileUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
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

  const auth = await getUserAuth();
  if (!auth?.accessToken || auth.error) {
    return { status: "FAIL", message: "User not authenticated" };
  }

  // Runs as the signed-in user (their own token).
  const res = await fetch(serviceUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};
