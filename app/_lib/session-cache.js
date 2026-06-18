"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getUserProfileInfo } from "./user-service";

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// In-memory cache for server-side caching
const profileCache = new Map();

export async function getCachedUserProfile() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return null;
    }

    const userId = session.user.id;

    // Caching disabled — always fetch fresh profile data.
    // const cacheKey = `profile_${userId}`;
    //
    // // Check if we have cached data in memory
    // const cachedEntry = profileCache.get(cacheKey);
    //
    // if (cachedEntry) {
    //   const { data, timestamp } = cachedEntry;
    //   const now = Date.now();
    //
    //   // If cache is still valid, return cached data
    //   if (now - timestamp < CACHE_DURATION) {
    //     console.log("[getCachedUserProfile] Cache HIT for userId:", userId);
    //     return data;
    //   } else {
    //     // Cache expired, remove it
    //     console.log("[getCachedUserProfile] Cache EXPIRED for userId:", userId);
    //     profileCache.delete(cacheKey);
    //   }
    // } else {
    //   console.log("[getCachedUserProfile] Cache MISS for userId:", userId);
    // }

    const userProfileData = await getUserProfileInfo();

    // if (userProfileData && userProfileData.status !== "FAIL") {
    //   // Cache the data in memory
    //   profileCache.set(cacheKey, {
    //     data: userProfileData,
    //     timestamp: Date.now(),
    //   });
    //   console.log("[getCachedUserProfile] Cached profile data for userId:", userId);
    // }

    return userProfileData;
  } catch (error) {
    console.error("[getCachedUserProfile] Error getting cached user profile:", error);
    return null;
  }
}

export async function clearUserProfileCache() {
  try {
    const session = await getServerSession(authOptions);

    if (session && session.user) {
      const userId = session.user.id;
      const cacheKey = `profile_${userId}`;

      // Clear the cached profile data from memory
      profileCache.delete(cacheKey);
    }
  } catch (error) {
    console.error("Error clearing user profile cache:", error);
  }
}

export async function updateUserProfileCache(updatedProfileData) {
  try {
    const session = await getServerSession(authOptions);

    if (session && session.user) {
      const userId = session.user.id;
      const cacheKey = `profile_${userId}`;

      // Update the cached profile data
      profileCache.set(cacheKey, {
        data: updatedProfileData,
        timestamp: Date.now(),
      });
    }
  } catch (error) {
    console.error("Error updating user profile cache:", error);
  }
}
