/**
 * Validation for the identity number field, shared by sign-up and profile
 * update so the two cannot drift apart.
 *
 * The rule depends on the selected identity type. Passport numbers are
 * alphanumeric in most countries (Saudi passports are a letter followed by
 * digits), so a digits-only rule rejects legitimate values. National ID and
 * Iqama numbers are exactly 10 digits.
 *
 * Identity types come from the Liferay "Proof" vocabulary; the keys below match
 * its category codes.
 */

export const IDENTITY_TYPE_PASSPORT = "passport";
export const IDENTITY_TYPE_NATIONAL_ID = "national_id";
export const IDENTITY_TYPE_IQAMA = "iqama";

const NATIONAL_ID_PATTERN = /^\d{10}$/;
const PASSPORT_PATTERN = /^[A-Za-z0-9]{6,12}$/;
/** Fallback for any identity type added to the vocabulary later. */
const GENERIC_PATTERN = /^[A-Za-z0-9]{1,20}$/;

/**
 * @param identityTypeKey the `key` of the selected Proof category, if any
 */
export function isValidIdentityNumber(
  value: string,
  identityTypeKey?: string
): boolean {
  const trimmed = (value ?? "").trim();

  if (!trimmed) return false;

  switch ((identityTypeKey ?? "").toLowerCase()) {
    case IDENTITY_TYPE_NATIONAL_ID:
    case IDENTITY_TYPE_IQAMA:
      return NATIONAL_ID_PATTERN.test(trimmed);
    case IDENTITY_TYPE_PASSPORT:
      return PASSPORT_PATTERN.test(trimmed);
    default:
      return GENERIC_PATTERN.test(trimmed);
  }
}

/**
 * Message key for the failure, so each form can render it in the active locale.
 */
export function identityNumberErrorKey(identityTypeKey?: string): string {
  switch ((identityTypeKey ?? "").toLowerCase()) {
    case IDENTITY_TYPE_NATIONAL_ID:
    case IDENTITY_TYPE_IQAMA:
      return "identityNumberNationalIdFormat";
    case IDENTITY_TYPE_PASSPORT:
      return "identityNumberPassportFormat";
    default:
      return "identityNumberFormat";
  }
}
