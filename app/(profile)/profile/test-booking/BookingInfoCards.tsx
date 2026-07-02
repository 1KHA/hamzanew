"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { t } from "@/app/_lib/translationContext";
import type {
  LookupData,
  LookupOption,
  TranslationDict,
  UserProfile,
} from "@/app/_lib/booking-types";
import "./bookingInfoCards.css";

// Helper function to find display name from lookup options
const getDisplayName = (key: string | undefined, options: LookupOption[]) => {
  if (!key || !options || !Array.isArray(options)) return "";
  const option = options.find(
    (opt) => opt.key === key || opt.key === key?.toLowerCase()
  );
  // Handle both 'name' and 'label' properties (countries use 'label', others use 'name')
  return option?.name || option?.label || key;
};

interface BookingInfoCardsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
  translations: TranslationDict;
}

export default function BookingInfoCards({
  onPrevious,
  onNext,
  onLoadingChange,
  translations,
}: BookingInfoCardsProps) {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [lookupData, setLookupData] = useState<LookupData>({
    nationalityOptions: [],
    motherTongueOptions: [],
    educationQualificationsOptions: [],
    educationInstitutionsOptions: [],
    specializationOptions: [],
    timezoneOptions: [],
    proofOptions: [],
  });
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [lookupLoaded, setLookupLoaded] = useState(false);

  const isLoading = !profileLoaded || !lookupLoaded;

  // Notify parent component about loading state changes
  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading || !userProfile);
    }
  }, [isLoading, userProfile, onLoadingChange]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = (await response.json()) as UserProfile & {
            status?: string;
          };
          if (data && data.status !== "FAIL") {
            setUserProfile(data);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setProfileLoaded(true);
      }
    };

    void fetchUserProfile();
  }, []);

  // Fetch lookup data
  useEffect(() => {
    const fetchLookupData = async () => {
      try {
        const [
          nationalityRes,
          motherTongueRes,
          educationQualRes,
          educationInstRes,
          specializationRes,
          timezoneRes,
          proofRes,
        ] = await Promise.all([
          fetch("/api/lookup-data?type=nationality"),
          fetch("/api/lookup-data?type=motherTongue"),
          fetch("/api/lookup-data?type=educationalQualification"),
          fetch("/api/lookup-data?type=educationalInstitution"),
          fetch("/api/lookup-data?type=academicSpecialization"),
          fetch("/api/lookup-data?type=timeZone"),
          fetch("/api/lookup-data?type=proof"),
        ]);

        const [
          nationalityData,
          motherTongueData,
          educationQualData,
          educationInstData,
          specializationData,
          timezoneData,
          proofData,
        ] = await Promise.all([
          nationalityRes.ok ? ((await nationalityRes.json()) as LookupOption[]) : [],
          motherTongueRes.ok ? ((await motherTongueRes.json()) as LookupOption[]) : [],
          educationQualRes.ok ? ((await educationQualRes.json()) as LookupOption[]) : [],
          educationInstRes.ok ? ((await educationInstRes.json()) as LookupOption[]) : [],
          specializationRes.ok ? ((await specializationRes.json()) as LookupOption[]) : [],
          timezoneRes.ok ? ((await timezoneRes.json()) as LookupOption[]) : [],
          proofRes.ok ? ((await proofRes.json()) as LookupOption[]) : [],
        ]);

        setLookupData({
          nationalityOptions: nationalityData || [],
          motherTongueOptions: motherTongueData || [],
          educationQualificationsOptions: educationQualData || [],
          educationInstitutionsOptions: educationInstData || [],
          specializationOptions: specializationData || [],
          timezoneOptions: timezoneData || [],
          proofOptions: proofData || [],
        });
      } catch (error) {
        console.error("Error fetching lookup data:", error);
      } finally {
        setLookupLoaded(true);
      }
    };

    void fetchLookupData();
  }, []);

  // Build cards data from user profile
  const cards = useMemo(() => {
    if (!userProfile) {
      // Return empty cards while loading
      return [
        {
          id: "location",
          variant: "primary",
          fields: [
            {
              label: t(
                "hamza-profile-full-name-in--arabic-and-english",
                translations
              ),
              value: "",
            },
            { label: "\u00A0", value: "" },
            { label: t("hamza-email-id-form", translations), value: "" },
            { label: t("hamza-phone-number-form", translations), value: "" },
          ],
        },
        {
          id: "education",
          variant: "secondary",
          fields: [
            {
              label: t(
                "hamza-latest-educational-qualification-form",
                translations
              ),
              value: "",
            },
            {
              label: t(
                "hamza-home-page-map-nationality-text-form",
                translations
              ),
              value: "",
            },
            { label: t("hamza-mother-tongue-form", translations), value: "" },
            {
              label: t("hamza-passport-number-form", translations),
              value: "",
            },
          ],
        },
        {
          id: "contact",
          variant: "tertiary",
          fields: [
            { label: t("hamza-time-zone-form", translations), value: "" },
            {
              label: t("hamza-state-form", translations),
              value: "",
            },
            {
              label: t("hamza-city-form", translations),
              value: "",
            },
            {
              label: t("hamza-zip-code-form", translations),
              value: "",
            },
          ],
          cta: {
            label: t("hamza-next", translations),
            type: "button",
          },
        },
      ];
    }

    // Build full name in Arabic and English
    const fullNameAr = `${userProfile.firstName || ""} ${
      userProfile.secondName || ""
    } ${userProfile.lastName || ""}`.trim();
    const fullNameEn = `${userProfile.firstNameInEnglish || ""} ${
      userProfile.secondNameInEnglish || ""
    } ${userProfile.lastNameInEnglish || ""}`.trim();
    const fullNameDisplay =
      fullNameAr && fullNameEn
        ? `${fullNameAr} / ${fullNameEn}`
        : fullNameAr || fullNameEn || "";

    // Build phone number with extension
    const phoneNumber =
      userProfile.phoneExtension && userProfile.phoneNumber
        ? `${userProfile.phoneExtension} ${userProfile.phoneNumber}`
        : userProfile.phoneNumber || "";

    // Get display names from lookup data
    const nationalityDisplay = getDisplayName(
      userProfile.nationality,
      lookupData.nationalityOptions
    );
    const motherTongueDisplay = getDisplayName(
      userProfile.motherTongue,
      lookupData.motherTongueOptions
    );
    const educationDisplay = getDisplayName(
      userProfile.lastEducationalQualification,
      lookupData.educationQualificationsOptions
    );
    const timezoneDisplay = getDisplayName(
      userProfile.timeZone,
      lookupData.timezoneOptions
    );
    const proofDisplay = getDisplayName(
      userProfile.passportNumber,
      lookupData.proofOptions
    );

    return [
      {
        id: "location",
        variant: "primary",
        fields: [
          {
            label: t(
              "hamza-profile-full-name-in-arabic-and-english",
              translations
            ),
            value: fullNameDisplay,
          },
          { label: "\u00A0", value: fullNameEn },
          {
            label: t("hamza-email-id-form", translations),
            value: userProfile.emailId || "",
          },
          {
            label: t("hamza-phone-number-form", translations),
            value: phoneNumber,
          },
        ],
      },
      {
        id: "education",
        variant: "secondary",
        fields: [
          {
            label: t(
              "hamza-latest-educational-qualification-form",
              translations
            ),
            value: educationDisplay,
          },
          {
            label: t("hamza-home-page-map-nationality-text-form", translations),
            value: nationalityDisplay,
          },
          {
            label: t("hamza-mother-tongue-form", translations),
            value: motherTongueDisplay,
          },
          {
            label: t("hamza-passport-number-form", translations),
            value: proofDisplay,
          },
        ],
      },
      {
        id: "contact",
        variant: "tertiary",
        fields: [
          {
            label: t("hamza-time-zone-form", translations),
            value: timezoneDisplay,
          },
          {
            label: t("hamza-state-form", translations),
            value: userProfile.state || userProfile.province || "",
          },
          {
            label: t("hamza-city-form", translations),
            value: userProfile.city || "",
          },
          {
            label: t("hamza-zip-code-form", translations),
            value: userProfile.postalCode || "",
          },
        ],
        cta: {
          label: t("hamza-next", translations),
          type: "button",
        },
      },
    ];
  }, [userProfile, lookupData, translations]);

  // Default navigation handlers
  const handlePrevious =
    onPrevious ||
    (() => {
      // Get testCenterId from sessionStorage if available
      try {
        const storedData = sessionStorage.getItem("testBookingData");
        if (storedData) {
          const bookingData = JSON.parse(storedData) as {
            testCenterId?: string | number;
          };
          if (bookingData.testCenterId) {
            router.push(`/profile/test-booking/${bookingData.testCenterId}`);
            return;
          }
        }
      } catch (error) {
        console.error("Error retrieving booking data:", error);
      }
      // Fallback to test centers page
      router.push("/test-takers/test-centers");
    });

  const handleNext = onNext || (() => router.push("/profile/payment"));

  return (
    <section className="hamza-booking-info-wrapper">
      {isLoading || !userProfile ? (
        <div
          className="loader-container"
          style={{
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        cards.map((card) => (
          <article
            key={card.id}
            className={`hamza-booking-info-card hamza-booking-info-card--${card.variant}`}
          >
            <div className="hamza-booking-info-body">
              {card.fields.map((field) => (
                <div className="hamza-booking-info-field" key={field.label}>
                  <span className="hamza-booking-info-label">
                    {field.label}
                  </span>
                  <span className="hamza-booking-info-value">
                    {field.value}
                  </span>
                </div>
              ))}
              {card.cta && (
                <div className="appointment-actions">
                  <button className="btn-previous" onClick={handlePrevious}>
                    {t("hamza-previous", translations) || "Previous"}
                  </button>
                  <button className="btn-next" onClick={handleNext}>
                    {t("hamza-next", translations) || "Next"}
                  </button>
                </div>
              )}
            </div>
          </article>
        ))
      )}
    </section>
  );
}
