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
 */
function mapApiProfile(apiData: any): Record<string, any> {
  if (!apiData || apiData.status === "FAIL") return {};
  return {
    firstName_ar: apiData.firstName_ar ?? apiData.firstName ?? "",
    secondName_ar: apiData.middleName_ar ?? apiData.secondName_ar ?? apiData.secondName ?? "",
    lastName_ar: apiData.lastName_ar ?? apiData.lastName ?? "",
    firstName_en: apiData.firstName_en ?? apiData.firstNameInEnglish ?? "",
    secondName_en: apiData.middleName_en ?? apiData.secondName_en ?? apiData.secondNameInEnglish ?? "",
    lastName_en: apiData.lastName_en ?? apiData.lastNameInEnglish ?? "",
    email: apiData.email ?? apiData.emailId ?? "",
    phone: apiData.phone ?? apiData.phoneNumber ?? "",
    birthDate: apiData.birthDate ?? "",
    nationality: apiData.nationality ?? "",
    motherTongue: apiData.motherTongue ?? "",
    identity: apiData.identity ?? "",
    identityNumber: apiData.identityNumber ?? "",
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
    zipCode: apiData.zipCode ?? "",
  };
}

export default async function ProfilePage() {
  let userProfile = null;
  try {
    const apiData = await getCachedUserProfile();
    if (apiData && apiData.status !== "FAIL") {
      userProfile = mapApiProfile(apiData);
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  const profileData = userProfile && Object.keys(userProfile).length > 0
    ? userProfile
    : mockUserInfo;

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
