import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    
    console.log("Hamza Ambassadors API - Language:", locale);
    
    const content = await fetchContentWithKey(
      "HAMZA_HOMEPAGE_WHO_WE_ARE_HAMZA_AMBASSADORS_CONTENT_KEY"
    );

    console.log("Hamza Ambassadors Content - Title:", content?.title);
    console.log("Hamza Ambassadors Content - Fields:", JSON.stringify(content?.contentFields));

    const fields = extractFields(
      content?.contentFields,
      ["titleText", "descriptionText", "viewAllButtonText"]
    ) as { titleText?: string; descriptionText?: string; viewAllButtonText?: string };

    // Use titleText (the custom localized field) as the primary title
    // Fall back to content.title if titleText is not available
    const title = fields?.titleText || content?.title || "سفراء همزة";

    return NextResponse.json({
      title: title,
      titleText: fields?.titleText || "سفراء همزة",
      descriptionText: fields?.descriptionText || "",
      viewAllButtonText: fields?.viewAllButtonText || "عرض الكل",
      locale: locale,
    });
  } catch (error) {
    console.error("Error fetching hamza ambassadors content:", error);
    return NextResponse.json(
      {
        title: "سفراء همزة",
        titleText: "سفراء همزة",
        descriptionText: "",
        viewAllButtonText: "عرض الكل",
      },
      { status: 500 }
    );
  }
}