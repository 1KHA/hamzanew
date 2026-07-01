import { NextResponse } from "next/server";
import {
  fetchTestBookings,
  createTestBooking,
  updateTestBooking,
} from "@/app/_lib/booking/test-booking-service";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Internal server error";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = searchParams.get("testId");
    const emailId = searchParams.get("emailId");
    const customFilter = searchParams.get("filter");

    if (customFilter) {
      const data = await fetchTestBookings(customFilter);
      return NextResponse.json(data);
    }

    if (emailId) {
      const filter = `emailId eq '${emailId}' and (testBookingStatus ne 'Completed' or testBookingStatus ne 'Cancelled')`;
      const data = await fetchTestBookings(filter);
      return NextResponse.json(data);
    }

    if (testId) {
      const formattedTestId = String(testId).padStart(6, "0");
      const filter = `r_testRelationship_c_testId eq '${formattedTestId}'`;
      const data = await fetchTestBookings(filter);
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: "testId, emailId, or filter is required" },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error("Error in test-bookings API route:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const data = await createTestBooking(body);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in test-bookings POST route:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json(
        { error: "bookingId is required" },
        { status: 400 }
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const data = await updateTestBooking(bookingId, body);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in test-bookings PATCH route:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
