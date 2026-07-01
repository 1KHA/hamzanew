import type { BookingData } from "@/app/_lib/booking-types";

export function createBookingData(params: Partial<BookingData>): BookingData {
  const {
    testCenterId,
    testId = null,
    testDate = null,
    selectedTimeSlot = null,
    startTime = null,
    endTime = null,
    testType = null,
    testTypeName = "",
    testTypeName_i18n = { ar_SA: "", en_US: "" },
    selectedDate = null,
    testStatus = null,
    capacity = null,
    originalBookingData = null,
  } = params;

  return {
    testCenterId,
    testId,
    testDate,
    selectedTimeSlot,
    startTime,
    endTime,
    testType,
    testTypeName,
    testTypeName_i18n,
    selectedDate:
      selectedDate instanceof Date ? selectedDate.toISOString() : selectedDate,
    testStatus,
    capacity,
    originalBookingData,
  };
}

export function storeBookingData(bookingData: BookingData): void {
  try {
    sessionStorage.setItem("testBookingData", JSON.stringify(bookingData));
    console.log("Booking data stored:", bookingData);
  } catch (error) {
    console.error("Error storing booking data:", error);
    throw error;
  }
}

export function getBookingData(): BookingData | null {
  try {
    const storedData = sessionStorage.getItem("testBookingData");
    if (storedData) {
      return JSON.parse(storedData) as BookingData;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving booking data:", error);
    return null;
  }
}

export function clearBookingData(): void {
  try {
    sessionStorage.removeItem("testBookingData");
  } catch (error) {
    console.error("Error clearing booking data:", error);
  }
}
