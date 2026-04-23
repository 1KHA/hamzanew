
import type { ReactElement } from "react";
import TableOfContent, {
  type TocSection,
} from "@/app/components/table-of-content/TableOfContent";
import "./terms.css";

/* ── Sections data ── */

const TOC_SECTIONS: TocSection[] = [
  { Name: "القيود على الاستخدام", Target: "usage-restrictions" },
  { Name: "التسجيل واستخدام الحساب", Target: "account-registration" },
  { Name: "حقوق الملكية الفكرية", Target: "intellectual-property" },
  { Name: "مسؤولية المستخدم", Target: "user-responsibility" },
  { Name: "سياسة الخصوصية", Target: "privacy-policy" },
  { Name: "التعديلات على الشروط", Target: "terms-modifications" },
];

/* ── Component ── */

export default function TermsContent(): ReactElement {
  return (
    <section className="terms" aria-labelledby="terms-heading">
      <div className="terms__container">
        {/* Sidebar – Table of Content */}
        <aside className="terms__sidebar">
          <TableOfContent
            sections={TOC_SECTIONS}
            title="شروط الاستخدام"
            subTitle="في هذه الصفحة"
            defaultActiveId="usage-restrictions"
          />
        </aside>

        {/* Main Content */}
        <article className="terms__content">
          {/* 1. القيود على الاستخدام */}
          <div className="terms__section" id="usage-restrictions">
            <h2 className="display-xs-bold terms__section-title">
              القيود على الاستخدام
            </h2>
            <p className="text-md-regular terms__paragraph">
              يُحظر على المستخدمين استخدام المنصة لأي أغراض غير مشروعة أو غير
              مصرّح بها. يشمل ذلك على سبيل المثال لا الحصر: محاولة الوصول غير
              المصرّح به إلى أنظمة المنصة، أو نقل أي محتوى ضار أو فيروسات، أو
              استخدام المنصة بطريقة قد تُلحق الضرر بالخوادم أو الشبكات المرتبطة
              بها.
            </p>
            <p className="text-md-regular terms__paragraph">
              كما يُمنع استخدام أي أدوات آلية أو برامج لجمع البيانات من المنصة
              دون إذن كتابي مسبق. تحتفظ المنصة بحق تعليق أو إنهاء حساب أي
              مستخدم يُخالف هذه القيود دون إشعار مسبق.
            </p>
          </div>

          {/* 2. التسجيل واستخدام الحساب */}
          <div className="terms__section" id="account-registration">
            <h2 className="display-xs-bold terms__section-title">
              التسجيل واستخدام الحساب
            </h2>
            <p className="text-md-regular terms__paragraph">
              يتطلب الوصول إلى بعض خدمات المنصة إنشاء حساب مستخدم. يلتزم
              المستخدم بتقديم معلومات صحيحة ودقيقة عند التسجيل، وتحديثها عند
              الحاجة. يتحمّل المستخدم المسؤولية الكاملة عن الحفاظ على سرية بيانات
              حسابه، بما في ذلك اسم المستخدم وكلمة المرور.
            </p>
            <p className="text-md-regular terms__paragraph">
              يُسمح بحساب واحد فقط لكل مستخدم، ولا يجوز مشاركة بيانات الدخول مع
              أي طرف آخر. في حال الاشتباه بأي استخدام غير مصرّح به للحساب، يجب
              على المستخدم إبلاغ إدارة المنصة فوراً.
            </p>
          </div>

          {/* 3. حقوق الملكية الفكرية */}
          <div className="terms__section" id="intellectual-property">
            <h2 className="display-xs-bold terms__section-title">
              حقوق الملكية الفكرية
            </h2>
            <p className="text-md-regular terms__paragraph">
              جميع المحتويات المتاحة على المنصة، بما في ذلك النصوص والصور
              والتصاميم والشعارات والرسومات والبرمجيات، هي ملكية فكرية محمية
              لصالح منصة همزة أو الجهات المرخّصة لها. لا يجوز نسخ أو توزيع أو
              تعديل أو إعادة نشر أي محتوى من المنصة دون الحصول على إذن كتابي
              مسبق.
            </p>
            <p className="text-md-regular terms__paragraph">
              يُمنح المستخدم ترخيصاً محدوداً وغير حصري للاستخدام الشخصي فقط. أي
              استخدام تجاري للمحتوى يتطلب موافقة خطية من إدارة المنصة.
            </p>
          </div>

          {/* 4. مسؤولية المستخدم */}
          <div className="terms__section" id="user-responsibility">
            <h2 className="display-xs-bold terms__section-title">
              مسؤولية المستخدم
            </h2>
            <p className="text-md-regular terms__paragraph">
              يتحمل المستخدم المسؤولية الكاملة عن جميع الأنشطة التي تتم من خلال
              حسابه. يلتزم المستخدم باستخدام المنصة وفقاً للأنظمة والقوانين
              المعمول بها في المملكة العربية السعودية، ويتعهد بعدم انتهاك حقوق أي
              طرف ثالث.
            </p>
            <p className="text-md-regular terms__paragraph">
              في حال إخلال المستخدم بأي من هذه الشروط، تحتفظ المنصة بحق اتخاذ
              الإجراءات المناسبة، بما في ذلك تعليق الحساب أو إنهائه، بالإضافة إلى
              اللجوء إلى الوسائل القانونية المتاحة.
            </p>
          </div>

          {/* 5. سياسة الخصوصية */}
          <div className="terms__section" id="privacy-policy">
            <h2 className="display-xs-bold terms__section-title">
              سياسة الخصوصية
            </h2>
            <p className="text-md-regular terms__paragraph">
              تلتزم المنصة بحماية خصوصية المستخدمين وفقاً لنظام حماية البيانات
              الشخصية المعمول به في المملكة العربية السعودية. يتم جمع البيانات
              الشخصية واستخدامها فقط للأغراض المحددة في سياسة الخصوصية، ولا يتم
              مشاركتها مع أطراف ثالثة إلا بموافقة المستخدم أو وفقاً لمتطلبات
              قانونية.
            </p>
            <p className="text-md-regular terms__paragraph">
              يحق للمستخدم طلب الاطلاع على بياناته الشخصية المحفوظة لدى المنصة أو
              طلب تعديلها أو حذفها وفقاً للإجراءات المتبعة.
            </p>
          </div>

          {/* 6. التعديلات على الشروط */}
          <div className="terms__section" id="terms-modifications">
            <h2 className="display-xs-bold terms__section-title">
              التعديلات على الشروط
            </h2>
            <p className="text-md-regular terms__paragraph">
              تحتفظ المنصة بحق تعديل هذه الشروط والأحكام في أي وقت دون إشعار
              مسبق. تُعتبر التعديلات سارية المفعول فور نشرها على المنصة.
              يُنصح المستخدمون بمراجعة هذه الصفحة بشكل دوري للاطلاع على أي
              تحديثات.
            </p>
            <p className="text-md-regular terms__paragraph">
              استمرار استخدام المنصة بعد نشر التعديلات يُعدّ موافقة ضمنية على
              الشروط المحدّثة.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
