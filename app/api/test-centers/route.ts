import { NextRequest, NextResponse } from "next/server";
import { fetchTestCenters } from "@/app/_lib/booking/test-center-service";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Internal server error";
}

export async function GET(request: NextRequest) {
  try {
    const filter = request.nextUrl.searchParams.get("filter");
    const data = await fetchTestCenters(filter || null);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in test-centers API route:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
