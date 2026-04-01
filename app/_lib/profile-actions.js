"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { clearUserProfileCache, updateUserProfileCache } from "./session-cache";

export async function updateUserProfile(profileData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return {
        status: "FAIL",
        message: "User not authenticated",
      };
    }

    const authorization =
      "Basic " +
      btoa(
        `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
      );

    // Make API call to update profile
    const response = await fetch(
      `${process.env.BASE_URL}${process.env.HAMZA_UPDATE_USER_PROFILE_API_URL}`,
      {
        method: "PUT",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...profileData,
          userId: session.user.id,
        }),
      }
    );

    if (response.ok) {
      const updatedProfileData = await response.json();

      // Clear the cache so fresh data is fetched on next request
      await clearUserProfileCache();

      return {
        status: "SUCCESS",
        data: updatedProfileData,
        message: "Profile updated successfully",
      };
    } else {
      const errorData = await response.json();
      return {
        status: "FAIL",
        message: errorData.message || "Failed to update profile",
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

export async function changeUserPassword(passwordData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return {
        status: "FAIL",
        message: "User not authenticated",
      };
    }

    const authorization =
      "Basic " +
      btoa(
        `${process.env.BASIC_AUTH_USERNAME} : ${process.env.BASIC_AUTH_PASSWORD}`
      );

    const payload = {
      ...passwordData,
      userId: session.user.id,
    };

    // Make API call to change password
    const response = await fetch(
      `${process.env.BASE_URL}${process.env.HAMZA_CHANGE_PASSWORD_API_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
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
