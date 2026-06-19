import { NextResponse } from "next/server";
import { getUserAuth } from "@/app/_lib/user-token-service";

/**
 * Streams the signed-in user's uploaded ID/proof document from Liferay.
 * Runs server-side so it can inject the user's bearer token (a browser <a>
 * download link can't send Authorization headers). The Liferay endpoint
 * ownership-checks that the user only gets their own file.
 */
export async function GET() {
  const auth = (await getUserAuth()) as
    | (Record<string, any> & { accessToken?: string; id?: string | number; error?: string })
    | null;

  if (!auth?.accessToken || auth.error) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = `${process.env.BASE_URL}/o/hamza-profile-self/id-proof/${auth.id}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${auth.accessToken}` },
    cache: "no-store",
  });

  if (!res.ok || !res.body) {
    return new NextResponse("Not found", { status: res.status || 404 });
  }

  return new NextResponse(res.body, {
    status: 200,
    headers: {
      "Content-Type":
        res.headers.get("content-type") || "application/octet-stream",
      "Content-Disposition":
        res.headers.get("content-disposition") || "inline",
    },
  });
}
