/**
 * Time utility functions for handling Saudi time (GMT+3)
 */

/**
 * Create a Date object from date and time components in GMT+3 timezone
 * This ensures the date is created in GMT+3, not local timezone
 * @param {string|Date} date - Date string or Date object (date part only)
 * @param {number} hours - Hours (0-23) in GMT+3
 * @param {number} minutes - Minutes (0-59), default 0
 * @param {number} seconds - Seconds (0-59), default 0
 * @returns {Date} Date object representing the specified time in GMT+3
 */
export function createDateInSaudiTime(date, hours, minutes = 0, seconds = 0) {
  // Parse the date to get year, month, day
  const dateObj = date instanceof Date ? date : new Date(date);

  // Extract date components (these are in local timezone, but we only need the date part)
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Format hours, minutes, seconds
  const h = String(hours).padStart(2, "0");
  const m = String(minutes).padStart(2, "0");
  const s = String(seconds).padStart(2, "0");

  // Create ISO string with GMT+3 timezone offset
  // This tells JavaScript to interpret the time as GMT+3
  const saudiTimeString = `${year}-${month}-${day}T${h}:${m}:${s}+03:00`;

  // Parse as Date object - JavaScript will correctly interpret the timezone
  // and store the equivalent UTC time internally
  return new Date(saudiTimeString);
}

/**
 * Get the current date and time in Saudi time (GMT+3)
 * This function gets the current time and returns it as if it were in Saudi timezone (GMT+3)
 * Since dates from the service (testDate, startTime, endTime, registrationDate) are in GMT+3,
 * we need to compare with current time in GMT+3
 *
 * The function uses Intl.DateTimeFormat to get the current time components in Saudi timezone,
 * then creates a Date object that represents that moment in time.
 *
 * @returns {Date} Current date/time as a Date object representing the current moment in Saudi timezone
 */
export function getCurrentSaudiTime() {
  const now = new Date();

  // Use Intl.DateTimeFormat to get current time in Saudi Arabia timezone (Asia/Riyadh)
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Format the current time in Saudi timezone and get the parts
  const parts = formatter.formatToParts(now);
  const year = parts.find((p) => p.type === "year").value;
  const month = parts.find((p) => p.type === "month").value;
  const day = parts.find((p) => p.type === "day").value;
  const hour = parts.find((p) => p.type === "hour").value;
  const minute = parts.find((p) => p.type === "minute").value;
  const second = parts.find((p) => p.type === "second").value;

  // Create an ISO string in Saudi timezone (GMT+3)
  // Format: YYYY-MM-DDTHH:mm:ss+03:00
  const saudiTimeString = `${year}-${month}-${day}T${hour}:${minute}:${second}+03:00`;

  // Parse the string as a Date object - this will correctly interpret it as GMT+3
  // The Date object stores UTC time internally, but represents the correct moment
  return new Date(saudiTimeString);
}

/**
 * Add hours to a Date object that represents a time in Saudi timezone (GMT+3)
 * This ensures the addition is done in the Saudi time context and returns a Date
 * object that represents the new time in GMT+3
 * @param {Date} date - Date object representing a time in GMT+3
 * @param {number} hours - Number of hours to add
 * @returns {Date} New Date object with hours added, representing the time in GMT+3
 */
export function addHoursInSaudiTime(date, hours) {
  // Add hours to the UTC timestamp (24 hours is always 24 hours regardless of timezone)
  const hoursInMs = hours * 60 * 60 * 1000;
  const newTime = date.getTime() + hoursInMs;
  const newDate = new Date(newTime);

  // Get the new time components in Saudi timezone to ensure we're working in GMT+3 context
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(newDate);
  const year = parts.find((p) => p.type === "year").value;
  const month = parts.find((p) => p.type === "month").value;
  const day = parts.find((p) => p.type === "day").value;
  const hour = parts.find((p) => p.type === "hour").value;
  const minute = parts.find((p) => p.type === "minute").value;
  const second = parts.find((p) => p.type === "second").value;

  // Create ISO string with GMT+3 timezone offset to ensure it's in Saudi time context
  const saudiTimeString = `${year}-${month}-${day}T${hour}:${minute}:${second}+03:00`;

  // Parse as Date object - JavaScript will correctly interpret the timezone
  return new Date(saudiTimeString);
}

/**
 * Normalize a date to date-only (no time) in Saudi timezone (GMT+3)
 * This ensures date comparisons are done in Saudi time context
 * @param {string|Date} date - Date string or Date object
 * @returns {Date} Normalized date (date only, midnight) in Saudi timezone context
 */
export function normalizeDateInSaudiTime(date) {
  if (!date) return null;
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Get date components in Saudi timezone
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Riyadh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  
  const parts = formatter.formatToParts(dateObj);
  const year = parseInt(parts.find((p) => p.type === "year").value, 10);
  const month = parseInt(parts.find((p) => p.type === "month").value, 10) - 1; // Month is 0-indexed
  const day = parseInt(parts.find((p) => p.type === "day").value, 10);
  
  // Create a date at midnight in Saudi timezone (GMT+3)
  // Format: YYYY-MM-DDT00:00:00+03:00
  const saudiDateString = `${String(year).padStart(4, "0")}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}T00:00:00+03:00`;
  
  return new Date(saudiDateString);
}

/**
 * Convert a date string or Date object to Saudi time (GMT+3)
 * This is useful when comparing dates from the service which are in GMT+3
 * @param {string|Date} date - Date string or Date object
 * @returns {Date} Date in GMT+3
 */
export function toSaudiTime(date) {
  if (!date) return null;
  const dateObj = date instanceof Date ? date : new Date(date);
  // If the date is already in GMT+3 format from the service, we need to ensure
  // it's treated as GMT+3 when comparing
  return dateObj;
}
