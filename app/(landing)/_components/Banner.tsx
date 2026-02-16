"use client"
import { useState, useEffect } from "react";
import "../../styles/Button.css";

const slides = [
  {
    image: "/assets/image/hero.jpg",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
    buttonText: "المزيد",
  },
  {
    image: "/assets/image/hero.jpg",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
    buttonText: "المزيد",
  },
  {
    image: "/assets/image/hero.jpg",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
    buttonText: "المزيد",
  },
  {
    image: "/assets/image/hero.jpg",
    alt: "اختبارات همزة",
    title: "اختبارات همزة",
    description:
      "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
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
    <div className="relative c-mask h-[560px] w-full">
      <div className="embla-custom">
        {/* الصور فقط - بدون overlay */}
        <div
          className="embla-container"
          style={{ transform: `translateX(${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div className="embla-custom__slide" key={index}>
              <img
                src={slide.image}
                alt={slide.alt}
                className="custom-banner"
              />
            </div>
          ))}
        </div>

        {/* الـ Overlay ثابت فوق الكل */}
        <div className="overlay">
          {/* المحتوى */}
          <div className="hero w-[-webkit-fill-available] content !text-start">
            <h1 className="display-xl-semibold">{slides[currentSlide].title}</h1>
            {slides[currentSlide].description && (
              <div>
                <p className="!mb-[32px] text-xl-regular max-w-[720px]">
                  {slides[currentSlide].description}
                </p>
              </div>
            )}
            <button className="dga-btn dga-btn--md dga-btn--primary-neutral--on-color">
              <span className="dga-btn-label">{slides[currentSlide].buttonText}</span>
            </button>
          </div>

          {/* الشعار */}
          <div className="banner-logo">
            <img src="/assets/image/logo-stroke.png" alt="Logo" className="animate-spin-slow" />
          </div>
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