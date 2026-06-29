"use server";

import { clearUserProfileCache, updateUserProfileCache } from "./session-cache";
import { getUserAuth } from "./user-token-service";

/**
 * Converts frontend form field names to backend API field names.
 * The Liferay backend expects the same shape as the sign-up payload.
 */
function mapFormToApiPayload(formData) {
  const payload = {
    firstName: formData.firstName_ar,
    firstNameInEnglish: formData.firstName_en,
    secondName: formData.secondName_ar,
    secondNameInEnglish: formData.secondName_en,
    lastName: formData.lastName_ar,
    lastNameInEnglish: formData.lastName_en,
    emailId: formData.email,
    phoneNumber: formData.phone,
    nationality: formData.nationality,
    motherTongue: formData.motherTongue,
    proofName: formData.identity,
    passportNumber: formData.identityNumber,
    lastEducationalQualification: formData.education,
    academicSpecialization: formData.specialization,
    university: formData.institution,
    primaryLanguageOfEducation: formData.basicLanguageInEducation,
    timeZone: formData.timezone,
    country: formData.country,
    state: formData.state,
    city: formData.city,
    street: formData.postalAddress,
    postalCode: formData.zipCode,
  };

  // Handle birthDate split into day/month/year
  if (formData.birthDate) {
    try {
      const date = new Date(formData.birthDate);
      if (!isNaN(date.getTime())) {
        payload.dayOfBirth = date.getDate();
        payload.monthOfBirth = date.getMonth() + 1;
        payload.yearOfBirth = date.getFullYear();
      }
    } catch {
      // ignore invalid date
    }
  }

  // Remove undefined/null fields to avoid overwriting backend data
  Object.keys(payload).forEach((key) => {
    if (payload[key] === undefined || payload[key] === null || payload[key] === "") {
      delete payload[key];
    }
  });

  return payload;
}

/**
 * Requests an OTP for the signed-in user before a profile edit. The returned
 * mfaToken must be paired with the emailed code on the subsequent update call.
 */
export async function requestProfileEditOtp() {
  try {
    const auth = await getUserAuth();

    if (!auth?.accessToken || auth.error) {
      return { status: "FAIL", message: "User not authenticated" };
    }

    const url = `${process.env.BASE_URL}/o/hamza-profile-self/request-profile-otp`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { raw: responseText };
    }

    if (response.ok && data.status === "SUCCESS") {
      return { status: "SUCCESS", mfaToken: data.mfaToken, message: data.message };
    }

    return {
      status: "FAIL",
      message:
        data.message ||
        data.error ||
        `Failed to send verification code (HTTP ${response.status})`,
    };
  } catch (error) {
    console.error("Error requesting profile-edit OTP:", error);
    return { status: "FAIL", message: "An error occurred while sending the verification code" };
  }
}

export async function updateUserProfile(profileData, otpContext = {}) {
  try {
    const auth = await getUserAuth();
    console.log(
      "[updateUserProfile] auth —",
      auth
        ? `hasAccessToken=${!!auth?.accessToken}, id=${auth?.id}, error=${auth?.error}`
        : "null"
    );

    if (!auth?.accessToken || auth.error) {
      return {
        status: "FAIL",
        message: "User not authenticated",
      };
    }

    // Note: do NOT add userId — CreateProfileRequest has no such field, and the
    // backend's strict JSON reader 500s on unknown properties. The endpoint
    // resolves the user by emailId + the OAuth-authenticated principal instead.
    const payload = mapFormToApiPayload(profileData);
    // OTP gate: the backend verifies + consumes this single-use code.
    if (otpContext.mfaToken) payload.mfaToken = otpContext.mfaToken;
    if (otpContext.otp) payload.otp = otpContext.otp;
    const body = JSON.stringify(payload);

    const updateUrl = `${process.env.BASE_URL}${process.env.HAMZA_UPDATE_USER_PROFILE_API_URL}`;
    console.log("[updateUserProfile] POST URL:", updateUrl);
    console.log("[updateUserProfile] payload:", body);

    // Make API call to update profile — runs as the signed-in user (their own token).
    const response = await fetch(
      updateUrl,
      {
        // Backend update-profile is @POST in ProfileSelfServiceApplication.
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body,
        cache: "no-store",
      }
    );

    const responseText = await response.text();
    let updatedProfileData;
    try {
      updatedProfileData = JSON.parse(responseText);
    } catch {
      updatedProfileData = { raw: responseText };
    }

    console.log("[updateUserProfile] response status:", response.status);
    console.log("[updateUserProfile] response RAW body:", responseText);
    console.log("[updateUserProfile] response data:", updatedProfileData);

    if (response.ok) {
      // Clear the cache so fresh data is fetched on next request
      await clearUserProfileCache();

      return {
        status: "SUCCESS",
        data: updatedProfileData,
        message: "Profile updated successfully",
      };
    } else {
      return {
        status: "FAIL",
        message: updatedProfileData.message || updatedProfileData.error || `Failed to update profile (HTTP ${response.status})`,
      };
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      status: "FAIL",
      message: "An error occurred while updating profile",
    };
  }
}

/**
 * Uploads a replacement ID / proof document for the signed-in user.
 * Expects a FormData with a "file" field. The Liferay endpoint stores the
 * file, repoints the profile at it, and deletes the previous document.
 */
export async function updateUserIdProof(formData) {
  try {
    const auth = await getUserAuth();

    if (!auth?.accessToken || auth.error) {
      return { status: "FAIL", message: "User not authenticated" };
    }

    const url = `${process.env.BASE_URL}/o/hamza-profile-self/update-id-proof`;

    // Note: do NOT set Content-Type — fetch sets the multipart boundary itself.
    const response = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${auth.accessToken}` },
      body: formData,
      cache: "no-store",
    });

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { raw: responseText };
    }

    if (response.ok) {
      await clearUserProfileCache();
      return { status: "SUCCESS", data };
    }

    return {
      status: "FAIL",
      message:
        data.message ||
        data.error ||
        `Failed to update ID document (HTTP ${response.status})`,
    };
  } catch (error) {
    console.error("Error updating ID proof:", error);
    return {
      status: "FAIL",
      message: "An error occurred while updating ID document",
    };
  }
}

export async function changeUserPassword(passwordData) {
  try {
    const auth = await getUserAuth();

    if (!auth?.accessToken || auth.error) {
      return {
        status: "FAIL",
        message: "User not authenticated",
      };
    }

    const payload = {
      ...passwordData,
      userId: auth.id,
    };

    // Make API call to change password — runs as the signed-in user (their own token).
    const response = await fetch(
      `${process.env.BASE_URL}${process.env.HAMZA_CHANGE_PASSWORD_API_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    if (response.ok) {
      const result = await response.json();

      // Clear the cache after password change
      await clearUserProfileCache();

      return result;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return error;
  }
}
