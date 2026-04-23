import "@/app/components/button/Button.css";

// Static first-slide text — all slides share the same content so this is
// always correct. SSR'd into initial HTML so it is the LCP candidate
// without waiting for client hydration.
export default function BannerHeroText() {
  return (
    <div className="overlay">
      <div className="hero w-[-webkit-fill-available] content !text-start">
        <h1 className="display-xl-semibold">اختبارات همزة</h1>
        <p className="!mb-[32px] text-xl-regular max-w-[720px]">
          منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة
        </p>
        <button
          type="button"
          className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color"
        >
          <span className="dga-btn-label">المزيد</span>
        </button>
      </div>
    </div>
  );
}
