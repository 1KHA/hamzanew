/**
 * phonePrefixes.ts
 *
 * Single source of truth for all country phone prefixes.
 *
 * Usage:
 * ```ts
 * import { PHONE_PREFIXES, DEFAULT_PREFIX, getPrefixFromPhone, getDigitsFromPhone } from "./_data/phonePrefixes";
 * ```
 */

// ─────────────────────────────────────────────
// Type
// ─────────────────────────────────────────────

export interface PrefixOption {
  /** Displayed in the dropdown button, e.g. "+966" */
  label: string;
  /** Stored as part of the RHF phone value, e.g. "966" */
  value: string;
  /** Country name — used for search/accessibility */
  country: string;
  /** Optional emoji flag */
  flag?: string;
}

// ─────────────────────────────────────────────
// Full prefix list (200+ countries)
// ─────────────────────────────────────────────

export const PHONE_PREFIXES: PrefixOption[] = [
  // ── Gulf & Middle East ──────────────────────
  { label: "+966", value: "966", country: "Saudi Arabia", flag: "🇸🇦" },
  { label: "+971", value: "971", country: "UAE", flag: "🇦🇪" },
  { label: "+965", value: "965", country: "Kuwait", flag: "🇰🇼" },
  { label: "+973", value: "973", country: "Bahrain", flag: "🇧🇭" },
  { label: "+974", value: "974", country: "Qatar", flag: "🇶🇦" },
  { label: "+968", value: "968", country: "Oman", flag: "🇴🇲" },
  { label: "+967", value: "967", country: "Yemen", flag: "🇾🇪" },
  { label: "+962", value: "962", country: "Jordan", flag: "🇯🇴" },
  { label: "+961", value: "961", country: "Lebanon", flag: "🇱🇧" },
  { label: "+963", value: "963", country: "Syria", flag: "🇸🇾" },
  { label: "+964", value: "964", country: "Iraq", flag: "🇮🇶" },
  { label: "+970", value: "970", country: "Palestine", flag: "🇵🇸" },
  { label: "+972", value: "972", country: "Israel", flag: "🇮🇱" },
  { label: "+98", value: "98", country: "Iran", flag: "🇮🇷" },

  // ── Africa ──────────────────────────────────
  { label: "+20", value: "20", country: "Egypt", flag: "🇪🇬" },
  { label: "+218", value: "218", country: "Libya", flag: "🇱🇾" },
  { label: "+216", value: "216", country: "Tunisia", flag: "🇹🇳" },
  { label: "+213", value: "213", country: "Algeria", flag: "🇩🇿" },
  { label: "+212", value: "212", country: "Morocco", flag: "🇲🇦" },
  { label: "+249", value: "249", country: "Sudan", flag: "🇸🇩" },
  { label: "+252", value: "252", country: "Somalia", flag: "🇸🇴" },
  { label: "+253", value: "253", country: "Djibouti", flag: "🇩🇯" },
  { label: "+251", value: "251", country: "Ethiopia", flag: "🇪🇹" },
  { label: "+254", value: "254", country: "Kenya", flag: "🇰🇪" },
  { label: "+255", value: "255", country: "Tanzania", flag: "🇹🇿" },
  { label: "+256", value: "256", country: "Uganda", flag: "🇺🇬" },
  { label: "+250", value: "250", country: "Rwanda", flag: "🇷🇼" },
  { label: "+257", value: "257", country: "Burundi", flag: "🇧🇮" },
  { label: "+258", value: "258", country: "Mozambique", flag: "🇲🇿" },
  { label: "+27", value: "27", country: "South Africa", flag: "🇿🇦" },
  { label: "+234", value: "234", country: "Nigeria", flag: "🇳🇬" },
  { label: "+233", value: "233", country: "Ghana", flag: "🇬🇭" },
  { label: "+225", value: "225", country: "Ivory Coast", flag: "🇨🇮" },
  { label: "+221", value: "221", country: "Senegal", flag: "🇸🇳" },
  { label: "+223", value: "223", country: "Mali", flag: "🇲🇱" },
  { label: "+222", value: "222", country: "Mauritania", flag: "🇲🇷" },
  { label: "+224", value: "224", country: "Guinea", flag: "🇬🇳" },
  { label: "+220", value: "220", country: "Gambia", flag: "🇬🇲" },
  { label: "+227", value: "227", country: "Niger", flag: "🇳🇪" },
  { label: "+226", value: "226", country: "Burkina Faso", flag: "🇧🇫" },
  { label: "+228", value: "228", country: "Togo", flag: "🇹🇬" },
  { label: "+229", value: "229", country: "Benin", flag: "🇧🇯" },
  { label: "+237", value: "237", country: "Cameroon", flag: "🇨🇲" },
  { label: "+236", value: "236", country: "C. African Republic", flag: "🇨🇫" },
  { label: "+235", value: "235", country: "Chad", flag: "🇹🇩" },
  { label: "+240", value: "240", country: "Equatorial Guinea", flag: "🇬🇶" },
  { label: "+241", value: "241", country: "Gabon", flag: "🇬🇦" },
  { label: "+242", value: "242", country: "Congo", flag: "🇨🇬" },
  { label: "+243", value: "243", country: "DR Congo", flag: "🇨🇩" },
  { label: "+244", value: "244", country: "Angola", flag: "🇦🇴" },
  { label: "+245", value: "245", country: "Guinea-Bissau", flag: "🇬🇼" },
  { label: "+238", value: "238", country: "Cape Verde", flag: "🇨🇻" },
  { label: "+239", value: "239", country: "São Tomé & Príncipe", flag: "🇸🇹" },
  { label: "+260", value: "260", country: "Zambia", flag: "🇿🇲" },
  { label: "+263", value: "263", country: "Zimbabwe", flag: "🇿🇼" },
  { label: "+264", value: "264", country: "Namibia", flag: "🇳🇦" },
  { label: "+265", value: "265", country: "Malawi", flag: "🇲🇼" },
  { label: "+266", value: "266", country: "Lesotho", flag: "🇱🇸" },
  { label: "+267", value: "267", country: "Botswana", flag: "🇧🇼" },
  { label: "+268", value: "268", country: "Eswatini", flag: "🇸🇿" },
  { label: "+261", value: "261", country: "Madagascar", flag: "🇲🇬" },
  { label: "+269", value: "269", country: "Comoros", flag: "🇰🇲" },
  { label: "+230", value: "230", country: "Mauritius", flag: "🇲🇺" },
  { label: "+231", value: "231", country: "Liberia", flag: "🇱🇷" },
  { label: "+232", value: "232", country: "Sierra Leone", flag: "🇸🇱" },

  // ── Asia ────────────────────────────────────
  { label: "+91", value: "91", country: "India", flag: "🇮🇳" },
  { label: "+92", value: "92", country: "Pakistan", flag: "🇵🇰" },
  { label: "+880", value: "880", country: "Bangladesh", flag: "🇧🇩" },
  { label: "+94", value: "94", country: "Sri Lanka", flag: "🇱🇰" },
  { label: "+977", value: "977", country: "Nepal", flag: "🇳🇵" },
  { label: "+975", value: "975", country: "Bhutan", flag: "🇧🇹" },
  { label: "+960", value: "960", country: "Maldives", flag: "🇲🇻" },
  { label: "+93", value: "93", country: "Afghanistan", flag: "🇦🇫" },
  { label: "+86", value: "86", country: "China", flag: "🇨🇳" },
  { label: "+81", value: "81", country: "Japan", flag: "🇯🇵" },
  { label: "+82", value: "82", country: "South Korea", flag: "🇰🇷" },
  { label: "+850", value: "850", country: "North Korea", flag: "🇰🇵" },
  { label: "+84", value: "84", country: "Vietnam", flag: "🇻🇳" },
  { label: "+66", value: "66", country: "Thailand", flag: "🇹🇭" },
  { label: "+60", value: "60", country: "Malaysia", flag: "🇲🇾" },
  { label: "+65", value: "65", country: "Singapore", flag: "🇸🇬" },
  { label: "+62", value: "62", country: "Indonesia", flag: "🇮🇩" },
  { label: "+63", value: "63", country: "Philippines", flag: "🇵🇭" },
  { label: "+95", value: "95", country: "Myanmar", flag: "🇲🇲" },
  { label: "+855", value: "855", country: "Cambodia", flag: "🇰🇭" },
  { label: "+856", value: "856", country: "Laos", flag: "🇱🇦" },
  { label: "+673", value: "673", country: "Brunei", flag: "🇧🇳" },
  { label: "+670", value: "670", country: "Timor-Leste", flag: "🇹🇱" },
  { label: "+976", value: "976", country: "Mongolia", flag: "🇲🇳" },
  { label: "+7", value: "7", country: "Russia / Kazakhstan", flag: "🇷🇺" },
  { label: "+996", value: "996", country: "Kyrgyzstan", flag: "🇰🇬" },
  { label: "+992", value: "992", country: "Tajikistan", flag: "🇹🇯" },
  { label: "+993", value: "993", country: "Turkmenistan", flag: "🇹🇲" },
  { label: "+998", value: "998", country: "Uzbekistan", flag: "🇺🇿" },
  { label: "+994", value: "994", country: "Azerbaijan", flag: "🇦🇿" },
  { label: "+374", value: "374", country: "Armenia", flag: "🇦🇲" },
  { label: "+995", value: "995", country: "Georgia", flag: "🇬🇪" },
  { label: "+90", value: "90", country: "Turkey", flag: "🇹🇷" },
  { label: "+886", value: "886", country: "Taiwan", flag: "🇹🇼" },
  { label: "+852", value: "852", country: "Hong Kong", flag: "🇭🇰" },
  { label: "+853", value: "853", country: "Macau", flag: "🇲🇴" },

  // ── Europe ──────────────────────────────────
  { label: "+44", value: "44", country: "United Kingdom", flag: "🇬🇧" },
  { label: "+49", value: "49", country: "Germany", flag: "🇩🇪" },
  { label: "+33", value: "33", country: "France", flag: "🇫🇷" },
  { label: "+39", value: "39", country: "Italy", flag: "🇮🇹" },
  { label: "+34", value: "34", country: "Spain", flag: "🇪🇸" },
  { label: "+351", value: "351", country: "Portugal", flag: "🇵🇹" },
  { label: "+31", value: "31", country: "Netherlands", flag: "🇳🇱" },
  { label: "+32", value: "32", country: "Belgium", flag: "🇧🇪" },
  { label: "+41", value: "41", country: "Switzerland", flag: "🇨🇭" },
  { label: "+43", value: "43", country: "Austria", flag: "🇦🇹" },
  { label: "+30", value: "30", country: "Greece", flag: "🇬🇷" },
  { label: "+47", value: "47", country: "Norway", flag: "🇳🇴" },
  { label: "+46", value: "46", country: "Sweden", flag: "🇸🇪" },
  { label: "+45", value: "45", country: "Denmark", flag: "🇩🇰" },
  { label: "+358", value: "358", country: "Finland", flag: "🇫🇮" },
  { label: "+353", value: "353", country: "Ireland", flag: "🇮🇪" },
  { label: "+48", value: "48", country: "Poland", flag: "🇵🇱" },
  { label: "+420", value: "420", country: "Czech Republic", flag: "🇨🇿" },
  { label: "+421", value: "421", country: "Slovakia", flag: "🇸🇰" },
  { label: "+36", value: "36", country: "Hungary", flag: "🇭🇺" },
  { label: "+40", value: "40", country: "Romania", flag: "🇷🇴" },
  { label: "+359", value: "359", country: "Bulgaria", flag: "🇧🇬" },
  { label: "+385", value: "385", country: "Croatia", flag: "🇭🇷" },
  { label: "+381", value: "381", country: "Serbia", flag: "🇷🇸" },
  { label: "+387", value: "387", country: "Bosnia", flag: "🇧🇦" },
  { label: "+382", value: "382", country: "Montenegro", flag: "🇲🇪" },
  { label: "+386", value: "386", country: "Slovenia", flag: "🇸🇮" },
  { label: "+389", value: "389", country: "North Macedonia", flag: "🇲🇰" },
  { label: "+355", value: "355", country: "Albania", flag: "🇦🇱" },
  { label: "+383", value: "383", country: "Kosovo", flag: "🇽🇰" },
  { label: "+380", value: "380", country: "Ukraine", flag: "🇺🇦" },
  { label: "+375", value: "375", country: "Belarus", flag: "🇧🇾" },
  { label: "+370", value: "370", country: "Lithuania", flag: "🇱🇹" },
  { label: "+371", value: "371", country: "Latvia", flag: "🇱🇻" },
  { label: "+372", value: "372", country: "Estonia", flag: "🇪🇪" },
  { label: "+354", value: "354", country: "Iceland", flag: "🇮🇸" },
  { label: "+356", value: "356", country: "Malta", flag: "🇲🇹" },
  { label: "+357", value: "357", country: "Cyprus", flag: "🇨🇾" },
  { label: "+352", value: "352", country: "Luxembourg", flag: "🇱🇺" },
  { label: "+423", value: "423", country: "Liechtenstein", flag: "🇱🇮" },
  { label: "+376", value: "376", country: "Andorra", flag: "🇦🇩" },
  { label: "+377", value: "377", country: "Monaco", flag: "🇲🇨" },
  { label: "+378", value: "378", country: "San Marino", flag: "🇸🇲" },
  { label: "+379", value: "379", country: "Vatican City", flag: "🇻🇦" },

  // ── Americas ────────────────────────────────
  // ⚠️ Long prefixes must come BEFORE short ones (e.g. 1787 before 1)
  { label: "+1787", value: "1787", country: "Puerto Rico", flag: "🇵🇷" },
  { label: "+1939", value: "1939", country: "Puerto Rico (2)", flag: "🇵🇷" },
  { label: "+1242", value: "1242", country: "Bahamas", flag: "🇧🇸" },
  { label: "+1246", value: "1246", country: "Barbados", flag: "🇧🇧" },
  { label: "+1264", value: "1264", country: "Anguilla", flag: "🇦🇮" },
  { label: "+1268", value: "1268", country: "Antigua & Barbuda", flag: "🇦🇬" },
  { label: "+1284", value: "1284", country: "British VI", flag: "🇻🇬" },
  { label: "+1340", value: "1340", country: "US Virgin Islands", flag: "🇻🇮" },
  { label: "+1345", value: "1345", country: "Cayman Islands", flag: "🇰🇾" },
  { label: "+1441", value: "1441", country: "Bermuda", flag: "🇧🇲" },
  { label: "+1473", value: "1473", country: "Grenada", flag: "🇬🇩" },
  { label: "+1649", value: "1649", country: "Turks & Caicos", flag: "🇹🇨" },
  { label: "+1664", value: "1664", country: "Montserrat", flag: "🇲🇸" },
  { label: "+1670", value: "1670", country: "N. Mariana Islands", flag: "🇲🇵" },
  { label: "+1671", value: "1671", country: "Guam", flag: "🇬🇺" },
  { label: "+1684", value: "1684", country: "American Samoa", flag: "🇦🇸" },
  { label: "+1758", value: "1758", country: "Saint Lucia", flag: "🇱🇨" },
  { label: "+1767", value: "1767", country: "Dominica", flag: "🇩🇲" },
  { label: "+1784", value: "1784", country: "St. Vincent", flag: "🇻🇨" },
  { label: "+1809", value: "1809", country: "Dominican Republic", flag: "🇩🇴" },
  { label: "+1868", value: "1868", country: "Trinidad & Tobago", flag: "🇹🇹" },
  { label: "+1869", value: "1869", country: "St. Kitts & Nevis", flag: "🇰🇳" },
  { label: "+1876", value: "1876", country: "Jamaica", flag: "🇯🇲" },
  { label: "+1", value: "1", country: "USA / Canada", flag: "🇺🇸" },
  { label: "+52", value: "52", country: "Mexico", flag: "🇲🇽" },
  { label: "+55", value: "55", country: "Brazil", flag: "🇧🇷" },
  { label: "+54", value: "54", country: "Argentina", flag: "🇦🇷" },
  { label: "+56", value: "56", country: "Chile", flag: "🇨🇱" },
  { label: "+57", value: "57", country: "Colombia", flag: "🇨🇴" },
  { label: "+58", value: "58", country: "Venezuela", flag: "🇻🇪" },
  { label: "+51", value: "51", country: "Peru", flag: "🇵🇪" },
  { label: "+593", value: "593", country: "Ecuador", flag: "🇪🇨" },
  { label: "+591", value: "591", country: "Bolivia", flag: "🇧🇴" },
  { label: "+595", value: "595", country: "Paraguay", flag: "🇵🇾" },
  { label: "+598", value: "598", country: "Uruguay", flag: "🇺🇾" },
  { label: "+592", value: "592", country: "Guyana", flag: "🇬🇾" },
  { label: "+597", value: "597", country: "Suriname", flag: "🇸🇷" },
  { label: "+53", value: "53", country: "Cuba", flag: "🇨🇺" },
  { label: "+509", value: "509", country: "Haiti", flag: "🇭🇹" },
  { label: "+502", value: "502", country: "Guatemala", flag: "🇬🇹" },
  { label: "+503", value: "503", country: "El Salvador", flag: "🇸🇻" },
  { label: "+504", value: "504", country: "Honduras", flag: "🇭🇳" },
  { label: "+505", value: "505", country: "Nicaragua", flag: "🇳🇮" },
  { label: "+506", value: "506", country: "Costa Rica", flag: "🇨🇷" },
  { label: "+507", value: "507", country: "Panama", flag: "🇵🇦" },

  // ── Oceania ─────────────────────────────────
  { label: "+61", value: "61", country: "Australia", flag: "🇦🇺" },
  { label: "+64", value: "64", country: "New Zealand", flag: "🇳🇿" },
  { label: "+679", value: "679", country: "Fiji", flag: "🇫🇯" },
  { label: "+675", value: "675", country: "Papua New Guinea", flag: "🇵🇬" },
  { label: "+677", value: "677", country: "Solomon Islands", flag: "🇸🇧" },
  { label: "+678", value: "678", country: "Vanuatu", flag: "🇻🇺" },
  { label: "+676", value: "676", country: "Tonga", flag: "🇹🇴" },
  { label: "+685", value: "685", country: "Samoa", flag: "🇼🇸" },
  { label: "+686", value: "686", country: "Kiribati", flag: "🇰🇮" },
  { label: "+674", value: "674", country: "Nauru", flag: "🇳🇷" },
  { label: "+688", value: "688", country: "Tuvalu", flag: "🇹🇻" },
  { label: "+691", value: "691", country: "Micronesia", flag: "🇫🇲" },
  { label: "+692", value: "692", country: "Marshall Islands", flag: "🇲🇭" },
  { label: "+680", value: "680", country: "Palau", flag: "🇵🇼" },
];

// ─────────────────────────────────────────────
// Default prefix (shown before user interacts)
// ─────────────────────────────────────────────

/** The default prefix — Saudi Arabia (+966) */
export const DEFAULT_PREFIX: PrefixOption = PHONE_PREFIXES[0];

// ─────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────

/**
 * Finds which prefix a stored phone value starts with.
 *
 * ⚠️ Sorts by value length descending to correctly match longer prefixes first.
 * Example: "1787..." must match "+1787" (Puerto Rico) before "+1" (USA).
 *
 * @param phone - The full phone value stored in RHF (e.g. "9660501234567")
 * @returns The matched PrefixOption, or DEFAULT_PREFIX if none matched
 *
 * @example
 * getPrefixFromPhone("9660501234567") → { label: "+966", value: "966", ... }
 * getPrefixFromPhone("17871234567")   → { label: "+1787", value: "1787", ... }
 * getPrefixFromPhone("")              → DEFAULT_PREFIX (+966)
 */
export function getPrefixFromPhone(phone: string): PrefixOption {
  const sorted = [...PHONE_PREFIXES].sort(
    (a, b) => b.value.length - a.value.length,
  );
  return sorted.find((opt) => phone.startsWith(opt.value)) ?? DEFAULT_PREFIX;
}

/**
 * Strips the prefix from a phone value, returning only the subscriber digits.
 *
 * @param phone - The full phone value stored in RHF (e.g. "9660501234567")
 * @returns Digits without prefix (e.g. "0501234567")
 *
 * @example
 * getDigitsFromPhone("9660501234567") → "0501234567"
 * getDigitsFromPhone("17871234567")   → "1234567"
 */
export function getDigitsFromPhone(phone: string): string {
  const prefix = getPrefixFromPhone(phone);
  return phone.startsWith(prefix.value)
    ? phone.slice(prefix.value.length)
    : phone;
}
