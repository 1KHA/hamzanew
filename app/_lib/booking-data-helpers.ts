import {
  createBookingData as createBookingDataRaw,
  getBookingData as getBookingDataRaw,
  storeBookingData as storeBookingDataRaw,
} from "./booking/booking-data-utils";
import type { BookingData } from "./booking-types";

export function getBookingData(): BookingData | null {
  return getBookingDataRaw() as unknown as BookingData | null;
}

export function createBookingData(params: BookingData): BookingData {
  return createBookingDataRaw(
    params as unknown as Parameters<typeof createBookingDataRaw>[0]
  ) as unknown as BookingData;
}

export function storeBookingData(bookingData: BookingData): void {
  storeBookingDataRaw(
    bookingData as unknown as Parameters<typeof storeBookingDataRaw>[0]
  );
}
