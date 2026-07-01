import { NextResponse } from "next/server";
import { getCachedUserProfile } from "@/app/_lib/session-cache";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Internal server error";
}

export async function GET() {
  try {
    const userProfileData = await getCachedUserProfile();

    if (!userProfileData) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    if (userProfileData.status === "FAIL") {
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(userProfileData);
  } catch (error: unknown) {
    console.error("Error in user-profile API route:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
