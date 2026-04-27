import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFAQTabs } from "@/app/_lib/helper-service";

export const dynamic = "force-dynamic";

const fallbackItems = [
  {
    id: 1,
    title: "ما الهدف من قسم الأسئلة الشائعة؟",
    content:
      "المرجع الوطني الاول للمعلومات والخدمات الحكومية الرقمية كافة في المملكة العربية السعودية والمصدر المتخصص في التسهيل على المواطنين والمقيمين ورجال الأعمال والزوّار للبحث والوصول بكل سهولة ویسر.",
    category: "الحساب",
  },
  {
    id: 2,
    title: "كيف يمكنني التسجيل في الاختبار؟",
    content:
      "يمكنك التسجيل من خلال انشاء حساب جديد في المنصة ثم التوجه الى قائمة الاختبارات المتاحة واختيار الموعد المناسب لك والبدء في اجراءات الدفع.",
    category: "الاختبار",
  },
  {
    id: 3,
    title: "ما هي طرق الدفع المتاحة؟",
    content:
      "نوفر خيارات دفع متعددة تشمل بطاقة مدى، فيزا، ماستركارد، وخدمة Apple Pay لتسهيل عملية التسجيل للمستخدمين.",
    category: "الدفع",
  },
  {
    id: 4,
    title: "هل يمكنني تغيير موعد الاختبار بعد الحجز؟",
    content:
      "نعم، يمكنك تعديل الموعد من خلال صفحة حجوزاتي قبل موعد الاختبار بـ 24 ساعة على الأقل، وذلك حسب توفر المقاعد في المواعيد البديلة.",
    category: "الاختبار",
  },
  {
    id: 5,
    title: "ما مدة الاختبار وكيف يتم احتساب الوقت؟",
    content:
      "تختلف مدة الاختبار بحسب نوعه، وتظهر لك المدة المحددة قبل البدء. يبدأ عدّاد الوقت تلقائياً عند الضغط على (ابدأ الاختبار)، ويتم حفظ تقدمك تلقائياً أثناء الإجابة.",
    category: "الاختبار",
  },
  {
    id: 6,
    title: "هل يمكنني إعادة الاختبار لتحسين الدرجة؟",
    content:
      "يمكنك إعادة الاختبار وفق سياسة كل اختبار. في حال كانت الإعادة متاحة، ستتمكن من حجز محاولة جديدة بعد انتهاء المحاولة السابقة وظهور نتيجتها.",
    category: "الاختبار",
  },
  {
    id: 7,
    title: "نسيت كلمة المرور، كيف يمكنني استعادتها؟",
    content:
      "اضغط على (نسيت كلمة المرور) في صفحة تسجيل الدخول، ثم أدخل بريدك الإلكتروني أو رقم الجوال لاستلام رمز التحقق وإعادة تعيين كلمة المرور.",
    category: "الحساب",
  },
  {
    id: 8,
    title: "كيف يمكنني تحديث بياناتي الشخصية؟",
    content:
      "يمكنك تحديث بياناتك من خلال (الملف الشخصي) ثم (تعديل البيانات). تأكد من حفظ التغييرات بعد التحديث، وقد تتطلب بعض الحقول تحققاً إضافياً.",
    category: "الحساب",
  },
  {
    id: 9,
    title: "هل يمكنني إنشاء أكثر من حساب بنفس رقم الجوال؟",
    content:
      "لا، يُسمح بحساب واحد لكل رقم جوال وبريد إلكتروني لضمان حماية المستخدم وتفادي تكرار السجلات. يمكنك تغيير البريد أو الجوال من إعدادات الحساب عند الحاجة.",
    category: "الحساب",
  },
  {
    id: 10,
    title: "هل الدفع آمن على المنصة؟",
    content:
      "نعم، تتم عمليات الدفع عبر مزود دفع معتمد باستخدام تشفير آمن. ولا نقوم بحفظ بيانات البطاقة على المنصة حفاظاً على الخصوصية.",
    category: "الدفع",
  },
  {
    id: 11,
    title: "تم خصم المبلغ ولم يتم تأكيد الحجز، ماذا أفعل؟",
    content:
      "قد يحدث ذلك بسبب تأخر في مزامنة عملية الدفع. انتظر عدة دقائق ثم حدّث الصفحة. إذا لم يظهر التأكيد خلال ساعة، تواصل مع الدعم وأرفق رقم العملية إن وجد.",
    category: "الدفع",
  },
  {
    id: 12,
    title: "هل يمكنني الحصول على فاتورة أو إيصال الدفع؟",
    content:
      "نعم، بعد إتمام الدفع ستجد الإيصال ضمن (المدفوعات) أو (الحجوزات). يمكنك تنزيله بصيغة PDF أو مشاركته عبر البريد الإلكتروني.",
    category: "الدفع",
  },
  {
    id: 13,
    title: "متى تظهر نتيجة الاختبار؟",
    content:
      "تظهر النتائج عادةً خلال فترة قصيرة بعد إنهاء الاختبار، وقد تختلف المدة حسب نوع الاختبار وآلية التصحيح. ستصلك إشعارات عند توفر النتيجة.",
    category: "النتائج والشهادات",
  },
  {
    id: 14,
    title: "كيف يمكنني تحميل الشهادة بعد اجتياز الاختبار؟",
    content:
      "بعد صدور النتيجة وظهور حالة (ناجح)، ستتمكن من تحميل الشهادة من صفحة (النتائج). كما يمكنك إعادة تنزيلها في أي وقت من حسابك.",
    category: "النتائج والشهادات",
  },
  {
    id: 15,
    title: "هل الشهادة تحتوي على رمز تحقق؟",
    content:
      "نعم، تتضمن الشهادة رمز تحقق فريد يمكن استخدامه للتحقق من صحتها. يمكنك مشاركة الشهادة مع الجهات المطلوبة وسيتمكنون من التأكد منها عبر صفحة التحقق.",
    category: "النتائج والشهادات",
  },
  {
    id: 16,
    title: "الموقع لا يفتح أو يتوقف عند التحميل، ما الحل؟",
    content:
      "جرّب تحديث الصفحة، ثم امسح ذاكرة التخزين المؤقت للمتصفح. يفضّل استخدام أحدث إصدار من المتصفح. إذا استمرت المشكلة، جرّب شبكة مختلفة أو تواصل مع الدعم.",
    category: "مشاكل تقنية",
  },
  {
    id: 17,
    title: "لا يصلني رمز التحقق (OTP)، ماذا أفعل؟",
    content:
      "تأكد من صحة رقم الجوال أو البريد الإلكتروني، وجرّب إعادة الإرسال بعد دقيقة. تحقق أيضاً من مجلد الرسائل غير المرغوب فيها للبريد. إذا لم يصل الرمز، تواصل مع الدعم.",
    category: "مشاكل تقنية",
  },
  {
    id: 18,
    title: "انقطع الاتصال أثناء الاختبار، هل ستضيع إجاباتي؟",
    content:
      "لا تقلق، يتم حفظ تقدمك تلقائياً بشكل دوري. عند عودة الاتصال، يمكنك تسجيل الدخول ومتابعة الاختبار وفق الوقت المتبقي وسياسة الاختبار.",
    category: "مشاكل تقنية",
  },
];

export async function GET(request: Request) {
  try {
    const content = await fetchContentWithKey(
      "ADDITIONAL_INFORMATION_FREQUENTLY_ASKED_QUESTIONS_CONTENT_KEY"
    );

    console.log("[FAQ API] Content fetched. Title:", content?.title);
    console.log("[FAQ API] contentFields count:", content?.contentFields?.length);
    console.log(
      "[FAQ API] contentFields names:",
      content?.contentFields?.map((f: any) => f.name)
    );

    // Dump raw first contentField for diagnosis
    if (content?.contentFields?.[0]) {
      console.log(
        "[FAQ API] RAW first contentField:",
        JSON.stringify(content.contentFields[0], null, 2)
      );
    }

    // Log first tab's nested structure to verify field names
    const firstTab = content?.contentFields?.find((f: any) => f.name === "TabFieldset");
    if (firstTab?.nestedContentFields) {
      console.log(
        "[FAQ API] First TabFieldset nested field names:",
        firstTab.nestedContentFields.map((f: any) => f.name)
      );
      const firstFAQ = firstTab.nestedContentFields.find((f: any) => f.name === "FAQFieldset");
      if (firstFAQ?.nestedContentFields) {
        console.log(
          "[FAQ API] First FAQFieldset nested field names:",
          firstFAQ.nestedContentFields.map((f: any) => f.name)
        );
      }
    }

    const faqTabs = extractFAQTabs(
      content?.contentFields,
      "TabFieldset",
      "FAQFieldset",
      "tabTitleText",
      "fqaQuestionText",
      "faqAnswerText"
    );

    console.log("[FAQ API] Extracted tabs count:", faqTabs?.length);
    faqTabs?.forEach((tab: any, i: number) => {
      console.log(`[FAQ API] Tab ${i}: "${tab.title}" — ${tab.faqs?.length} FAQs`);
      tab.faqs?.forEach((faq: any, j: number) => {
        console.log(`[FAQ API]   FAQ ${j}: Q="${faq.question?.substring(0, 60)}..." A="${faq.answer?.substring(0, 60)}..."`);
      });
    });

    if (faqTabs && faqTabs.length > 0) {
      const items = faqTabs.flatMap((tab: any, tabIndex: number) =>
        tab.faqs.map((faq: any, faqIndex: number) => ({
          id: tabIndex * 100 + faqIndex + 1,
          title: faq.question,
          content: faq.answer,
          category: tab.title,
        }))
      );

      console.log("[FAQ API] Returning", items.length, "FAQ items from backend");

      return NextResponse.json({
        header: { title: content?.title || "الأسئلة الشائعة" },
        items,
      });
    }

    console.warn("[FAQ API] extractFAQTabs returned empty — using fallback");
  } catch (error) {
    console.error("[FAQ API] Error fetching FAQ content:", error);
  }

  return NextResponse.json({
    header: { title: "الأسئلة الشائعة" },
    items: fallbackItems,
  });
}
