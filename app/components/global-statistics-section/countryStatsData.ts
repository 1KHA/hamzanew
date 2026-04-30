/**
 * Country Statistics Data Registry
 *
 * Maps country codes to their stat translation keys and fallback values.
 * The component looks up translations dynamically; missing keys fall back
 * to the static values defined here.
 */

export interface CountryStatEntry {
  code: string;
  name: string;
  /** Translation key suffix, e.g. "saudi-arabia" */
  suffix: string;
  fallback: {
    totalCandidates: string;
    onsiteExams: string;
    remoteExams: string;
    nationalities: string;
    institutions: string;
  };
}

/**
 * Registry of countries that have statistics available.
 * Expand this list as more countries get data in Liferay.
 */
export const COUNTRY_STATS_REGISTRY: CountryStatEntry[] = [
  {
    code: "SA",
    name: "السعودية",
    suffix: "saudi-arabia",
    fallback: {
      totalCandidates: "1.2M",
      onsiteExams: "1.3k",
      remoteExams: "18",
      nationalities: "10",
      institutions: "1.2k",
    },
  },
  {
    code: "US",
    name: "الولايات المتحدة",
    suffix: "united-states",
    fallback: {
      totalCandidates: "200k",
      onsiteExams: "150",
      remoteExams: "3",
      nationalities: "5",
      institutions: "120",
    },
  },
  {
    code: "GB",
    name: "المملكة المتحدة",
    suffix: "united-kingdom",
    fallback: {
      totalCandidates: "80k",
      onsiteExams: "50",
      remoteExams: "1",
      nationalities: "3",
      institutions: "45",
    },
  },
  {
    code: "EG",
    name: "مصر",
    suffix: "egypt",
    fallback: {
      totalCandidates: "150k",
      onsiteExams: "80",
      remoteExams: "2",
      nationalities: "4",
      institutions: "70",
    },
  },
  {
    code: "AE",
    name: "الإمارات العربية المتحدة",
    suffix: "united-arab-emirates",
    fallback: {
      totalCandidates: "90k",
      onsiteExams: "60",
      remoteExams: "2",
      nationalities: "4",
      institutions: "55",
    },
  },
];

/**
 * Quick lookup map: countryCode -> CountryStatEntry
 */
export const COUNTRY_STATS_MAP: Record<string, CountryStatEntry> =
  COUNTRY_STATS_REGISTRY.reduce((acc, entry) => {
    acc[entry.code] = entry;
    return acc;
  }, {} as Record<string, CountryStatEntry>);

/**
 * Resolved statistics for a given country or global.
 */
export interface ResolvedStats {
  totalCandidates: string;
  onsiteExams: string;
  remoteExams: string;
  nationalities: string;
  institutions: string;
}

/**
 * Build stat keys for a country suffix.
 */
function buildKeys(suffix: string) {
  return {
    totalCandidates: `hamza-total-candidates-${suffix}`,
    onsiteExams: `hamza-onsite-exams-${suffix}`,
    remoteExams: `hamza-remote-exams-${suffix}`,
    nationalities: `hamza-nationalities-${suffix}`,
    institutions: `hamza-institutions-${suffix}`,
  };
}

/**
 * Get global stat keys.
 */
function buildGlobalKeys() {
  return {
    totalCandidates: "hamza-total-candidates-globally-stated",
    onsiteExams: "hamza-onsite-exams-globally-stated",
    remoteExams: "hamza-remote-exams-globally-stated",
    nationalities: "hamza-nationalities-globally-stated",
    institutions: "hamza-institutions-globally-stated",
  };
}

/**
 * Resolve statistics for a country code or "global".
 * Looks up translation keys first, falls back to static values.
 */
export function getCountryStats(
  countryCode: string,
  translations?: Record<string, string> | null
): ResolvedStats {
  const t = translations || {};

  if (countryCode === "global") {
    const keys = buildGlobalKeys();
    return {
      totalCandidates: t[keys.totalCandidates] || "1.5M",
      onsiteExams: t[keys.onsiteExams] || "1.5k",
      remoteExams: t[keys.remoteExams] || "22",
      nationalities: t[keys.nationalities] || "12",
      institutions: t[keys.institutions] || "1.5k",
    };
  }

  const entry = COUNTRY_STATS_MAP[countryCode];
  if (!entry) {
    // Unknown country — return global fallback
    return getCountryStats("global", translations);
  }

  const keys = buildKeys(entry.suffix);
  return {
    totalCandidates: t[keys.totalCandidates] || entry.fallback.totalCandidates,
    onsiteExams: t[keys.onsiteExams] || entry.fallback.onsiteExams,
    remoteExams: t[keys.remoteExams] || entry.fallback.remoteExams,
    nationalities: t[keys.nationalities] || entry.fallback.nationalities,
    institutions: t[keys.institutions] || entry.fallback.institutions,
  };
}

/**
 * Get dropdown options for countries that have stats.
 * Only includes countries that exist in both the registry AND the provided countries list.
 */
export function getCountryDropdownOptions(
  availableCountries: { code: string; name: string }[]
) {
  const availableCodes = new Set(availableCountries.map((c) => c.code));
  const registryCodes = COUNTRY_STATS_REGISTRY.map((e) => e.code);

  console.log(
    `[Stats] Available country codes from API:`,
    Array.from(availableCodes)
  );
  console.log(`[Stats] Registry country codes:`, registryCodes);

  const countryOptions = COUNTRY_STATS_REGISTRY.filter((entry) =>
    availableCodes.has(entry.code)
  ).map((entry) => ({
    label: entry.name,
    value: entry.code,
  }));

  console.log(`[Stats] Matched countries for dropdown: ${countryOptions.length}`);

  return [
    { label: "العالم", value: "global" },
    ...countryOptions,
  ];
}
