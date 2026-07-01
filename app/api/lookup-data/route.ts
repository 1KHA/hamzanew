import { NextResponse } from "next/server";
import { fetchJsonList } from "@/app/_lib/category-service";
import { getFormattedCountriesList } from "@/app/_lib/countries-service";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Internal server error";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { error: "Type parameter is required" },
        { status: 400 }
      );
    }

    let data: unknown;

    switch (type) {
      case "nationality":
        data = await getFormattedCountriesList();
        break;
      case "motherTongue":
        data = await fetchJsonList("Mother tongue");
        break;
      case "educationalQualification":
        data = await fetchJsonList("Educational Qualification");
        break;
      case "educationalInstitution":
        data = await fetchJsonList("Educational Institution");
        break;
      case "academicSpecialization":
        data = await fetchJsonList("Academic specialization");
        break;
      case "timeZone":
        data = await fetchJsonList("Time zone");
        break;
      case "proof":
        data = await fetchJsonList("Proof");
        break;
      default:
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 }
        );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Error in lookup-data API route:", error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
