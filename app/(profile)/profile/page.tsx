import PageHero from "../../components/page-hero/PageHero";
import { Metadata } from "next";
import ProfileView from "./ProfileView";
import { getCachedUserProfile } from "@/app/_lib/session-cache";
import mockUserInfo from "./_data/mockUserInfo.json";

export const metadata: Metadata = {
  title: "الملف الشخصي",
};

/**
 * Maps API profile response to the shape expected by ProfileView.
 * Tries multiple possible field names from the Liferay API.
 *
 * Backend field names (from sign-up payload):
 *   firstName, firstNameInEnglish, secondName, secondNameInEnglish,
 *   lastName, lastNameInEnglish, emailId, phoneNumber,
 *   dayOfBirth/monthOfBirth/yearOfBirth, nationality, motherTongue,
 *   proofName (identity type), passportNumber (identity number),
 *   lastEducationalQualification, academicSpecialization, university,
 *   primaryLanguageOfEducation, timeZone, country, state, city,
 *   street, postalCode
 */
function mapApiProfile(apiData: any): Record<string, any> {
  if (!apiData || apiData.status === "FAIL") return {};

  // Build birthDate from split fields if needed
  let birthDate = apiData.birthDate || "";
  if (!birthDate && (apiData.dayOfBirth || apiData.monthOfBirth || apiData.yearOfBirth)) {
    const d = String(apiData.dayOfBirth || 1).padStart(2, "0");
    const m = String(apiData.monthOfBirth || 1).padStart(2, "0");
    const y = apiData.yearOfBirth || 2000;
    birthDate = `${y}-${m}-${d}`;
  }

  return {
    firstName_ar: apiData.firstName_ar ?? apiData.firstName ?? "",
    secondName_ar: apiData.middleName_ar ?? apiData.secondName_ar ?? apiData.secondName ?? "",
    lastName_ar: apiData.lastName_ar ?? apiData.lastName ?? "",
    firstName_en: apiData.firstName_en ?? apiData.firstNameInEnglish ?? "",
    secondName_en: apiData.middleName_en ?? apiData.secondName_en ?? apiData.secondNameInEnglish ?? "",
    lastName_en: apiData.lastName_en ?? apiData.lastNameInEnglish ?? "",
    email: apiData.email ?? apiData.emailId ?? "",
    phone: apiData.phone ?? apiData.phoneNumber ?? "",
    birthDate,
    nationality: apiData.nationality ?? "",
    motherTongue: apiData.motherTongue ?? "",
    identity: apiData.identity ?? apiData.proofName ?? "",
    identityNumber: apiData.identityNumber ?? apiData.passportNumber ?? "",
    identityFile: apiData.identityFile ?? "",
    education: apiData.education ?? apiData.lastEducationalQualification ?? "",
    basicLanguageInEducation: apiData.basicLanguageInEducation ?? apiData.primaryLanguageOfEducation ?? "",
    institution: apiData.institution ?? apiData.university ?? "",
    specialization: apiData.specialization ?? apiData.academicSpecialization ?? "",
    timezone: apiData.timezone ?? apiData.timeZone ?? "",
    country: apiData.country ?? "",
    state: apiData.state ?? "",
    city: apiData.city ?? "",
    postalAddress: apiData.postalAddress ?? apiData.street ?? "",
    zipCode: apiData.zipCode ?? apiData.postalCode ?? "",
  };
}

export default async function ProfilePage() {
  let userProfile = null;
  try {
    console.log("[ProfilePage] Fetching cached user profile...");
    const apiData = await getCachedUserProfile();
    console.log("[ProfilePage] Raw API data from getCachedUserProfile:", JSON.stringify(apiData, null, 2));

    if (apiData && apiData.status !== "FAIL") {
      userProfile = mapApiProfile(apiData);
      console.log("[ProfilePage] Mapped profile data:", JSON.stringify(userProfile, null, 2));
    } else {
      console.log("[ProfilePage] apiData is null or status is FAIL");
    }
  } catch (error) {
    console.error("[ProfilePage] Error fetching profile:", error);
  }

  const profileData = userProfile && Object.keys(userProfile).length > 0
    ? userProfile
    : mockUserInfo;

  console.log("[ProfilePage] Final profileData passed to ProfileView:", JSON.stringify(profileData, null, 2));

  const HERO_CONFIG = {
    title: "الملف الشخصي",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "الملف الشخصي", disabled: true },
    ],
  };

  return (
    <>
      <PageHero
        heroMap={{ "/profile": HERO_CONFIG }}
        defaultRoute="/profile"
        breadcrumbsMax={2}
      />

      <section
        aria-labelledby="profile-heading"
        className="profile-main-section"
      >
        <h1 id="profile-heading" className="sr-only">
          إدارة الملف الشخصي
        </h1>
        <div className="content" role="main">
          <ProfileView userProfile={profileData} />
        </div>
      </section>
    </>
  );
}
