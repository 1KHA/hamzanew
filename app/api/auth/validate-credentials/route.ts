import { NextResponse } from "next/server";
import { validateUserCredentials } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "اسم المستخدم وكلمة المرور مطلوبان" },
        { status: 400 }
      );
    }

    const user = await validateUserCredentials(username, password);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      email: user.emailAddress,
    });
  } catch (error) {
    console.error("[validate-credentials] Error:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء التحقق" },
      { status: 500 }
    );
  }
}
