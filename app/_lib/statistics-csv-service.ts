/**
 * Statistics CSV Service — Client-Safe Utilities
 *
 * Contains types and helper functions that can be used in both
 * server and client components. No Node fs imports here.
 */

export interface CSVStatEntry {
  /** Display name (Arabic from CSV) */
  name: string;
  totalTestTakers: string;
  nationalities: string;
  numberOfTests: string;
  participatingInstitutions: string;
}

export interface ParsedStatisticsData {
  countryStats: CSVStatEntry[];
  examTypeStats: CSVStatEntry[];
  yearStats: CSVStatEntry[];
  nationalityStats: CSVStatEntry[];
  globalEntry: CSVStatEntry | null;
}

export type FilterType = "country" | "examType" | "year" | "nationality";

/**
 * Get a specific stat entry by filter type and value.
 * Returns null if not found.
 */
export function getCSVStatByFilter(
  data: ParsedStatisticsData,
  filterType: FilterType,
  filterValue: string
): CSVStatEntry | null {
  let list: CSVStatEntry[];
  switch (filterType) {
    case "country":
      list = data.countryStats;
      break;
    case "examType":
      list = data.examTypeStats;
      break;
    case "year":
      list = data.yearStats;
      break;
    case "nationality":
      list = data.nationalityStats;
      break;
    default:
      return null;
  }
  return list.find((e) => e.name === filterValue) || null;
}

/**
 * Build dropdown options from a CSV dataset.
 * Each option has { label, value } shape.
 */
export function buildDropdownOptions(
  entries: CSVStatEntry[],
  globalLabel?: string
): { label: string; value: string }[] {
  const options = entries
    .filter((e) => e.name !== "كل الدول") // exclude global from regular list
    .map((e) => ({ label: e.name, value: e.name }));

  if (globalLabel) {
    return [{ label: globalLabel, value: "global" }, ...options];
  }
  return options;
}

/**
 * Resolve stats for display, falling back to global entry when needed.
 */
export function resolveCSVStats(
  data: ParsedStatisticsData,
  filterType: FilterType,
  filterValue: string
): CSVStatEntry {
  const entry = getCSVStatByFilter(data, filterType, filterValue);
  if (entry) return entry;
  if (data.globalEntry) return data.globalEntry;
  return {
    name: "global",
    totalTestTakers: "-",
    nationalities: "-",
    numberOfTests: "-",
    participatingInstitutions: "-",
  };
}
