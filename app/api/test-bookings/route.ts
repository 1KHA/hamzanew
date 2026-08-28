import { NextResponse } from "next/server";
import {
  fetchTestBookings,
  createTestBooking,
  updateTestBooking,
} from "@/app/_lib/booking/test-booking-service";
import { getUserAuth } from "@/app/_lib/user-token-service";

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
    const auth = await getUserAuth();
    if (!auth?.accessToken || auth.error) {
      return NextResponse.json(
        { error: "Unauthorized: user access token is required" },
        { status: 401 }
      );
    }

    const user = auth as unknown as {
      id?: string | number;
      email?: string;
      name?: string;
      accessToken: string;
      accessTokenExpires?: number;
    };

    console.log("[test-bookings POST] authenticated user:", {
      id: user.id,
      email: user.email,
      name: user.name,
      tokenPrefix: `${user.accessToken.slice(0, 6)}...${user.accessToken.slice(-6)}`,
      tokenExpires: user.accessTokenExpires,
      expiresInSeconds: user.accessTokenExpires
        ? Math.round((user.accessTokenExpires - Date.now()) / 1000)
        : null,
    });

    const body = (await request.json()) as Record<string, unknown>;
    console.log("[test-bookings POST] request body:", JSON.stringify(body, null, 2));

    const data = await createTestBooking(body, user.accessToken);
    console.log("[test-bookings POST] created booking:", JSON.stringify(data, null, 2));
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

    const auth = await getUserAuth();
    if (!auth?.accessToken || auth.error) {
      return NextResponse.json(
        { error: "Unauthorized: user access token is required" },
        { status: 401 }
      );
    }

    const user = auth as unknown as {
      id?: string | number;
      email?: string;
      name?: string;
      accessToken: string;
      accessTokenExpires?: number;
    };

    console.log("[test-bookings PATCH] authenticated user:", {
      id: user.id,
      email: user.email,
      name: user.name,
      tokenPrefix: `${user.accessToken.slice(0, 6)}...${user.accessToken.slice(-6)}`,
      tokenExpires: user.accessTokenExpires,
      expiresInSeconds: user.accessTokenExpires
        ? Math.round((user.accessTokenExpires - Date.now()) / 1000)
        : null,
    });

    const body = (await request.json()) as Record<string, unknown>;
    console.log("[test-bookings PATCH] request body:", JSON.stringify(body, null, 2));

    const data = await updateTestBooking(bookingId, body, user.accessToken);
    console.log("[test-bookings PATCH] updated booking:", JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in test-bookings PATCH route:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
