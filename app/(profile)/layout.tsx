import type { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getCachedUserProfile } from "@/app/_lib/session-cache";
import ProfileLayoutClient from "./ProfileLayoutClient";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Try to get real user data from the profile API
  let userName = "";
  let userEmail = "";

  try {
    const apiData = await getCachedUserProfile();
    if (apiData && apiData.status !== "FAIL") {
      // Build name from Arabic names (same logic as ProfileView)
      const firstName = apiData.firstName_ar ?? apiData.firstName ?? "";
      const secondName = apiData.middleName_ar ?? apiData.secondName_ar ?? apiData.secondName ?? "";
      const lastName = apiData.lastName_ar ?? apiData.lastName ?? "";
      userName = `${firstName} ${secondName} ${lastName}`.trim();

      // Fallback to English names if Arabic is empty
      if (!userName) {
        const firstNameEn = apiData.firstName_en ?? apiData.firstNameInEnglish ?? "";
        const lastNameEn = apiData.lastName_en ?? apiData.lastNameInEnglish ?? "";
        userName = `${firstNameEn} ${lastNameEn}`.trim();
      }

      userEmail = apiData.email ?? apiData.emailId ?? "";
    }
  } catch (error) {
    console.error("[ProfileLayout] Error fetching profile for sidebar:", error);
  }

  // Fallback to session data if profile API returned nothing
  if (!userName || !userEmail) {
    try {
      const session = await getServerSession(authOptions);
      if (session?.user) {
        userName = session.user.name || "";
        userEmail = session.user.email || "";
      }
    } catch (error) {
      console.error("[ProfileLayout] Error fetching session for sidebar:", error);
    }
  }

  console.log("[ProfileLayout] Sidebar data — name:", userName, "| email:", userEmail);

  return (
    <ProfileLayoutClient userName={userName} userEmail={userEmail}>
      {children}
    </ProfileLayoutClient>
  );
}
