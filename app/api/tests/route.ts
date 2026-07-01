import { NextResponse } from "next/server";
import { fetchTests } from "@/app/_lib/booking/tests-service";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Internal server error";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter");
    const testId = searchParams.get("testId");

    let customFilter = filter;
    if (!customFilter && testId) {
      customFilter = `id eq '${testId}'`;
    }

    const data = await fetchTests(null, customFilter);
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in tests API route:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
