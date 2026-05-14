/**
 * Statistics CSV Parser — Server-Only
 *
 * Reads and parses `mdfiles/statistics.csv` using Node fs.
 * Import only from server components.
 */

import { readFileSync } from "fs";
import { join } from "path";
import type { ParsedStatisticsData, CSVStatEntry } from "./statistics-csv-service";

const CSV_PATH = join(process.cwd(), "statistics.csv");

// Column indices for each filter group (0-based)
const COL_COUNTRY_NAME = 0;
const COL_COUNTRY_TEST_TAKERS = 1;
const COL_COUNTRY_NATIONALITIES = 2;
const COL_COUNTRY_TESTS = 3;
const COL_COUNTRY_INSTITUTIONS = 4;

const COL_EXAM_NAME = 6;
const COL_EXAM_TEST_TAKERS = 7;
const COL_EXAM_NATIONALITIES = 8;
const COL_EXAM_TESTS = 9;
const COL_EXAM_INSTITUTIONS = 10;

const COL_YEAR_NAME = 12;
const COL_YEAR_TEST_TAKERS = 13;
const COL_YEAR_NATIONALITIES = 14;
const COL_YEAR_TESTS = 15;
const COL_YEAR_INSTITUTIONS = 16;

const COL_NATIONALITY_NAME = 18;
const COL_NATIONALITY_TEST_TAKERS = 19;
const COL_NATIONALITY_NATIONALITIES = 20;
const COL_NATIONALITY_TESTS = 21;
const COL_NATIONALITY_INSTITUTIONS = 22;

function extractGroup(
  row: string[],
  nameIdx: number,
  testTakersIdx: number,
  nationalitiesIdx: number,
  testsIdx: number,
  institutionsIdx: number
): CSVStatEntry | null {
  const name = row[nameIdx]?.trim();
  if (!name) return null;
  return {
    name,
    totalTestTakers: row[testTakersIdx]?.trim() || "-",
    nationalities: row[nationalitiesIdx]?.trim() || "-",
    numberOfTests: row[testsIdx]?.trim() || "-",
    participatingInstitutions: row[institutionsIdx]?.trim() || "-",
  };
}

/**
 * Parse the statistics CSV file.
 * Caches the result so repeated calls in the same process are cheap.
 */
let _cached: ParsedStatisticsData | null = null;

export function parseStatisticsCSV(): ParsedStatisticsData {
  if (_cached) return _cached;

  const raw = readFileSync(CSV_PATH, "utf-8");
  const lines = raw.replace(/^\uFEFF/, "").split(/\r?\n/);

  const countryStats: CSVStatEntry[] = [];
  const examTypeStats: CSVStatEntry[] = [];
  const yearStats: CSVStatEntry[] = [];
  const nationalityStats: CSVStatEntry[] = [];
  let globalEntry: CSVStatEntry | null = null;

  // Skip header row (row 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple split — no quoted commas in this dataset
    const cols = line.split(",");

    // Country group
    const countryEntry = extractGroup(
      cols,
      COL_COUNTRY_NAME,
      COL_COUNTRY_TEST_TAKERS,
      COL_COUNTRY_NATIONALITIES,
      COL_COUNTRY_TESTS,
      COL_COUNTRY_INSTITUTIONS
    );
    if (countryEntry) {
      countryStats.push(countryEntry);
      if (countryEntry.name === "كل الدول") {
        globalEntry = countryEntry;
      }
    }

    // Exam type group
    const examEntry = extractGroup(
      cols,
      COL_EXAM_NAME,
      COL_EXAM_TEST_TAKERS,
      COL_EXAM_NATIONALITIES,
      COL_EXAM_TESTS,
      COL_EXAM_INSTITUTIONS
    );
    if (examEntry) examTypeStats.push(examEntry);

    // Year group
    const yearEntry = extractGroup(
      cols,
      COL_YEAR_NAME,
      COL_YEAR_TEST_TAKERS,
      COL_YEAR_NATIONALITIES,
      COL_YEAR_TESTS,
      COL_YEAR_INSTITUTIONS
    );
    if (yearEntry) yearStats.push(yearEntry);

    // Nationality group
    const natEntry = extractGroup(
      cols,
      COL_NATIONALITY_NAME,
      COL_NATIONALITY_TEST_TAKERS,
      COL_NATIONALITY_NATIONALITIES,
      COL_NATIONALITY_TESTS,
      COL_NATIONALITY_INSTITUTIONS
    );
    if (natEntry) nationalityStats.push(natEntry);
  }

  _cached = { countryStats, examTypeStats, yearStats, nationalityStats, globalEntry };
  return _cached;
}
