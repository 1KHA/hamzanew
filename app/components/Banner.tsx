import { useState, useEffect } from "react";
import "../styles/Button.css";
const slides = [
  {
    image: "https://hmm.gov.sa/hmm_mgr/fup/202581122551_sli_file_new.JPG",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
    buttonText: "المزيد",
  },
  {
    image: "https://hmm.gov.sa/hmm_mgr/fup/20251021011641_sli_file.PNG",
    alt: "اعلان منصة خدمات الإعاشة",
    title: "اعلان منصة خدمات الإعاشة",
    description:
      "تُعلن أمــانة العاصمة المقدسة عن بـدء استقبــال طلبـات التأهيل لمتعهدي الإعـاشة في مكة المكرمة استعدادًا لموسم حج عام 1447هـ.",
    buttonText: "المزيد",
  },
  {
    image: "https://hmm.gov.sa/hmm_mgr/fup/202583101951_sli_file.PNG",
    alt: "الفرص الإستثمارية",
    title: "الفرص الإستثمارية",
    description:
      "تعلن أمانة العاصمة المقدسة عن إعادة طرح فرص استثمارية لتطوير مخطط منح ولي العهد رقم 9 الجزء ب",
    buttonText: "المزيد",
  },
  {
    image: "https://hmm.gov.sa/hmm_mgr/fup/202583102730_sli_file_new.PNG",
    alt: "تصنيف مصانع الخرسانة الجاهزة",
    title: "تصنيف مصانع الخرسانة الجاهزة",
    description: "اختبار اختبار اختباره",
    buttonText: "المزيد",
  },
];

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative c-mask h-[560px]">
      <div className="embla-custom">
        <div
          className="embla-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div className="embla-custom__slide" key={index}>
              <img
                src={slide.image}
                alt={slide.alt}
                className="custom-banner"
              />
              <div className="overlay">
                <div className="hero">
                  <h1>{slide.title}</h1>
                  {slide.description && <p>{slide.description}</p>}
                  <button className="dga-btn dga-btn--md dga-btn--secondary-outline">
                    <span className="dga-btn-label"> {slide.buttonText}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="embla__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`embla__dot ${currentSlide === index ? "embla__dot--selected" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
