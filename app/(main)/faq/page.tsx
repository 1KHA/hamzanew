import type { ReactElement } from "react";
import PageHero from "@/app/components/page-hero/PageHero";
import { Metadata } from "next";
import FAQ from "./FAQ";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFAQTabs } from "@/app/_lib/helper-service";
import { getTranslations } from "@/app/_lib/getTranslations";

const HERO_CONFIG = {
  title: "الأسئلة الشائعة",
  description: "اعثر على إجابات للأسئلة الشائعة حول خدماتنا وسياساتنا.",
  bgColor: "#F7FDF9",
};

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description:
    "استكشف الأسئلة الشائعة حول اختبارات همزة، خدماتنا، وسياساتنا. اعثر على إجابات سريعة لمشاكل التقنية والحسابات.",
};

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

export default async function FAQPage(): Promise<ReactElement> {
  let items = fallbackItems;
  let heroTitle = HERO_CONFIG.title;
  let heroDescription = HERO_CONFIG.description;

  try {
    const [content, translations] = await Promise.all([
      fetchContentWithKey(
        "ADDITIONAL_INFORMATION_FREQUENTLY_ASKED_QUESTIONS_CONTENT_KEY"
      ),
      getTranslations(),
    ]);

    console.log("[FAQ Page] Content fetched. Title:", content?.title);
    console.log("[FAQ Page] contentFields count:", content?.contentFields?.length);
    console.log(
      "[FAQ Page] contentFields names:",
      content?.contentFields?.map((f: any) => f.name)
    );

    // Dump raw first contentField for diagnosis
    if (content?.contentFields?.[0]) {
      console.log(
        "[FAQ Page] RAW first contentField:",
        JSON.stringify(content.contentFields[0], null, 2)
      );
    }

    const faqTabs = extractFAQTabs(content?.contentFields);

    console.log("[FAQ Page] Extracted tabs count:", faqTabs?.length);
    faqTabs?.forEach((tab, i) => {
      console.log(`[FAQ Page] Tab ${i}: "${tab.title}" — ${tab.faqs?.length} FAQs`);
    });

    heroTitle =
      translations?.["hamza-page-contact-us-title"] || HERO_CONFIG.title;
    heroDescription =
      translations?.["hamza-page-contact-us-description"] ||
      HERO_CONFIG.description;

    if (faqTabs && faqTabs.length > 0) {
      items = faqTabs.flatMap((tab: any, tabIndex: number) =>
        tab.faqs.map((faq: any, faqIndex: number) => ({
          id: tabIndex * 100 + faqIndex + 1,
          title: faq.question,
          content: faq.answer,
          category: tab.title,
        }))
      );
      console.log("[FAQ Page] Using backend data:", items.length, "items");
    } else {
      console.warn(
        "[FAQ Page] extractFAQTabs returned empty — using fallback. " +
        "Check field names in RAW log above."
      );
    }
  } catch (error) {
    console.error("[FAQ Page] Error fetching FAQ content:", error);
  }

  const hero = { ...HERO_CONFIG, title: heroTitle, description: heroDescription };

  return (
    <main>
      <PageHero
        heroMap={{ "/faq": hero }}
        defaultRoute="/faq"
        breadcrumbsMax={2}
      />

      <section className="bg-white" aria-labelledby="faq-main-heading">
        <h1 id="faq-main-heading" className="sr-only">
          الأسئلة الشائعة والدعم الفني
        </h1>
        <FAQ items={items} />
      </section>
    </main>
  );
}
