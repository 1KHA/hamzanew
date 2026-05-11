import PageHero from "@/app/components/page-hero/PageHero";
import ProfileForm from "./ProfileForm";
import { Metadata } from "next";
import { getCachedUserProfile } from "@/app/_lib/session-cache";
import { fetchJsonList } from "@/app/_lib/category-service";
import { getFormattedCountriesList } from "@/app/_lib/countries-service";
import mockUserInfo from "../_data/mockUserInfo.json";
import type { DropdownOption } from "@/app/components/dropdown/Dropdown";

export const metadata: Metadata = {
  title: "الملف الشخصي - تعديل",
};

/**
 * Maps API profile response to the form field shape.
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
function mapApiProfileToForm(apiData: any): Record<string, any> {
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

/**
 * Maps category API response to DgaDropdown options shape.
 */
function mapCategoryOptions(raw: any[]): DropdownOption[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item: any) => ({
      name: item.label ?? item.name ?? item.title ?? "",
      value: String(item.key ?? item.value ?? item.categoryId ?? item.id ?? ""),
    }))
    .filter((opt) => opt.name && opt.value);
}

export default async function ProfileUpdatePage() {
  let profileValues = {} as Record<string, any>;
  let nationalityOptions: DropdownOption[] = [];
  let motherTongueOptions: DropdownOption[] = [];
  let educationOptions: DropdownOption[] = [];
  let institutionOptions: DropdownOption[] = [];
  let specializationOptions: DropdownOption[] = [];
  let countryOptions: DropdownOption[] = [];
  let timezoneOptions: DropdownOption[] = [];

  try {
    console.log("[ProfileUpdatePage] Starting profile data fetch...");

    const [
      apiProfile,
      countriesRaw,
      motherTongueRaw,
      educationRaw,
      institutionRaw,
      specializationRaw,
      timezoneRaw,
    ] = await Promise.all([
      getCachedUserProfile().catch((err: any) => {
        console.warn("[ProfileUpdatePage] Failed to fetch user profile:", err?.message);
        return null;
      }),
      getFormattedCountriesList().catch((err: any) => {
        console.warn("Failed to fetch countries:", err?.message);
        return [];
      }),
      fetchJsonList("Mother tongue").catch((err: any) => {
        console.warn("Failed to fetch mother tongue:", err?.message);
        return [];
      }),
      fetchJsonList("Educational Qualification").catch((err: any) => {
        console.warn("Failed to fetch education:", err?.message);
        return [];
      }),
      fetchJsonList("Educational Institution").catch((err: any) => {
        console.warn("Failed to fetch institutions:", err?.message);
        return [];
      }),
      fetchJsonList("Academic specialization").catch((err: any) => {
        console.warn("Failed to fetch specialization:", err?.message);
        return [];
      }),
      fetchJsonList("Time zone").catch((err: any) => {
        console.warn("Failed to fetch timezones:", err?.message);
        return [];
      }),
    ]);

    console.log("[ProfileUpdatePage] Raw apiProfile from getCachedUserProfile:", JSON.stringify(apiProfile, null, 2));

    if (apiProfile && apiProfile.status !== "FAIL") {
      profileValues = mapApiProfileToForm(apiProfile);
      console.log("[ProfileUpdatePage] Mapped profileValues:", JSON.stringify(profileValues, null, 2));
    } else {
      console.log("[ProfileUpdatePage] apiProfile is null or status is FAIL, using mock data");
    }

    countryOptions = (countriesRaw || []).map((c: any) => ({
      name: c.label || c.name || "",
      value: c.key || c.value || "",
    }));

    nationalityOptions = countryOptions;
    motherTongueOptions = mapCategoryOptions(motherTongueRaw);
    educationOptions = mapCategoryOptions(educationRaw);
    institutionOptions = mapCategoryOptions(institutionRaw);
    specializationOptions = mapCategoryOptions(specializationRaw);
    timezoneOptions = mapCategoryOptions(timezoneRaw);
  } catch (error) {
    console.error("Error fetching profile update data:", error);
  }

  const initialValues =
    Object.keys(profileValues).length > 0 ? profileValues : mockUserInfo;

  console.log("[ProfileUpdatePage] Final initialValues passed to ProfileForm:", JSON.stringify(initialValues, null, 2));

  const HERO_CONFIG = {
    title: "الملف الشخصي",
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: "الرئيسة", path: "/" },
      { label: "الملف الشخصي", path: "/profile" },
      { label: "تعديل", disabled: true },
    ],
  };

  return (
    <>
      <PageHero
        heroMap={{ "/profile": HERO_CONFIG }}
        defaultRoute="/profile"
        breadcrumbsMax={3}
      />

      <section
        aria-labelledby="profile-heading"
        className="profile-main-section"
      >
        <h1 id="profile-heading" className="sr-only">
          إدارة الملف الشخصي
        </h1>
        <div className="content" role="main">
          <ProfileForm
            initialValues={initialValues}
            nationalityOptions={nationalityOptions}
            motherTongueOptions={motherTongueOptions}
            educationOptions={educationOptions}
            institutionOptions={institutionOptions}
            specializationOptions={specializationOptions}
            countryOptions={countryOptions}
            timezoneOptions={timezoneOptions}
          />
        </div>
      </section>
    </>
  );
}
