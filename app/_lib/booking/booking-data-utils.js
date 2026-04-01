/**
 * Uniform booking data structure and utilities
 * This ensures consistent booking data format across all booking-related components
 */

/**
 * Standard booking data structure
 * @typedef {Object} BookingData
 * @property {string} testCenterId - Test center ID
 * @property {string} testId - Selected test ID
 * @property {string} testDate - Test date (ISO string)
 * @property {string} selectedTimeSlot - Time slot in format "00-02"
 * @property {Object} startTime - Start time object with key and name
 * @property {Object} endTime - End time object with key and name
 * @property {string} testType - Test type key (e.g., "GeneralTest")
 * @property {string} testTypeName - Test type name
 * @property {Object} testTypeName_i18n - Test type names in different languages
 * @property {string} selectedDate - Selected date (ISO string)
 * @property {Object} testStatus - Test status object
 * @property {number} capacity - Test capacity
 * @property {Object} originalBookingData - Original booking data if any
 */

/**
 * Create a standard booking data object
 * @param {Object} params - Booking parameters
 * @param {string} params.testCenterId - Test center ID
 * @param {string} params.testId - Selected test ID
 * @param {string} params.testDate - Test date (ISO string)
 * @param {string} params.selectedTimeSlot - Time slot in format "00-02"
 * @param {Object} params.startTime - Start time object
 * @param {Object} params.endTime - End time object
 * @param {string} params.testType - Test type key
 * @param {string} params.testTypeName - Test type name
 * @param {Object} params.testTypeName_i18n - Test type names in different languages
 * @param {Date|string} params.selectedDate - Selected date
 * @param {Object} params.testStatus - Test status object
 * @param {number} params.capacity - Test capacity
 * @param {Object} params.originalBookingData - Original booking data if any
 * @returns {BookingData} Standard booking data object
 */
export function createBookingData({
  testCenterId,
  testId,
  testDate,
  selectedTimeSlot,
  startTime,
  endTime,
  testType,
  testTypeName,
  testTypeName_i18n,
  selectedDate,
  testStatus,
  capacity,
  originalBookingData = null,
}) {
  return {
    testCenterId,
    testId,
    testDate,
    selectedTimeSlot,
    startTime,
    endTime,
    testType,
    testTypeName: testTypeName || "",
    testTypeName_i18n: testTypeName_i18n || { ar_SA: "", en_US: "" },
    selectedDate:
      selectedDate instanceof Date ? selectedDate.toISOString() : selectedDate,
    testStatus,
    capacity,
    originalBookingData,
  };
}

/**
 * Store booking data in sessionStorage
 * @param {BookingData} bookingData - Booking data to store
 */
export function storeBookingData(bookingData) {
  try {
    sessionStorage.setItem("testBookingData", JSON.stringify(bookingData));
    console.log("Booking data stored:", bookingData);
  } catch (error) {
    console.error("Error storing booking data:", error);
    throw error;
  }
}

/**
 * Retrieve booking data from sessionStorage
 * @returns {BookingData|null} Booking data or null if not found
 */
export function getBookingData() {
  try {
    const storedData = sessionStorage.getItem("testBookingData");
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error("Error retrieving booking data:", error);
    return null;
  }
}

/**
 * Clear booking data from sessionStorage
 */
export function clearBookingData() {
  try {
    sessionStorage.removeItem("testBookingData");
  } catch (error) {
    console.error("Error clearing booking data:", error);
  }
}
