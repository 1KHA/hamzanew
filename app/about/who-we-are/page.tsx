/*
 * Who We Are Page (Server Component)
 *
 * This page provides an overview of the organization's vision, mission, values, and core principles.
 * It is optimized for server-side rendering and follows the Leaf Design Pattern.
 *
 * @accessibility
 * - Uses semantic HTML with proper heading hierarchy
 * - Ensures all interactive elements are keyboard accessible
 * - Provides descriptive labels for screen readers
 *
 * @performance
 * - Optimized for server-side rendering
 * - Avoids inline styles and unnecessary computations
 */

import Card from "@/app/components/card/Card";
import "../about.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على رؤية ورسالة مشروع همزة، وقيمه الأساسية ومرتكزاته في تقديم اختبارات كفاءة لغوية معتمدة دولياً.",
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * Static data for the vision and mission cards
 */
const cardsContent = [
  {
    title: "الرؤية",
    description:
      "الريادة عالميًا في تعزيز مكانة اللغة العربية عبر اختبارات كفاءة عالية الجودة، مبنية على معايير دولية ومعتمدة وموثوقة.",
    icon: "view",
  },
  {
    title: "الرسالة",
    description:
      "تقديم اختبارات عربية عالية الجودة، مبنية على معايير دولية، تمكّن المتعلمين والمهنيين من إثبات كفاءتهم، وتفتح أمامهــــــم آفاقًــــا أكـــاديـــميــــة ومهنيــــــة واسعــــــــــة.",
    icon: "mail-01",
  },
];

/**
 * Static data for the values cards
 */
const valuesCardsContents = [
  {
    number: "1",
    title: "الموثوقية",
    description: "تقديم نتائج دقيقة وثابتة تعتمد محلياً ودولياً.",
  },
  {
    number: "2",
    title: "الموضوعية",
    description: "ضمان الحياد التام وخلو التقييم من أي تحيز.",
  },
  {
    number: "3",
    title: "الجودة",
    description: "الالتزام بالمعايير الدولية وأفضل الممارسات في القياس.",
  },
  {
    number: "4",
    title: "الابتكار",
    description: "تطوير مستمر وتبني أحدث التقنيات في الاختبارات.",
  },
  {
    number: "5",
    title: "العالمية",
    description: "اعتراف واعتماد دولي يعزز مكانة اللغة العربية عالميًا.",
  },
];

/**
 * Static data for the core principles cards
 */
const mortakazatCardsContents = [
  {
    number: "1",
    title: "المرجعية الدولية",
    description:
      "تستند إلى الإطار الأوروبي المرجعي المشترك للغات (CEFR) لضمان اتساقها مع أفضل الممارسات العالمية",
  },
  {
    number: "2",
    title: "تنوع الاختبارات",
    description:
      "تغطي منظومة همزة أربعة مجالات رئيسة (أكاديمي، عام، تحديد المستوى، مفردات) لتلبية مختلف الاحتياجات التعليمية والمهنية",
  },
  {
    number: "3",
    title: "المرونة والأمان",
    description:
      "بنيت لتُطبق إلكترونيًا بمرونة عالية، مع اعتماد إجراءات صارمة لضمان الأمان وحماية البيانات",
  },
];

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * WhoWeArePage Component
 *
 * Renders the vision, mission, values, and core principles of the organization.
 *
 * @returns {JSX.Element} The "Who We Are" page
 */
export default function WhoWeArePage() {
  return (
    <div className="stack">
      {/* Vision and Mission Section */}
      <section
        className="about-us-cards-container custom-container"
        aria-labelledby="vision-mission"
      >
        <h2 id="vision-mission" className="sr-only">
          الرؤية والرسالة
        </h2>
        {cardsContent.map((card, index) => (
          <Card
            key={index}
            style={{ borderRadius: "16px" }}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </section>

      {/* Values Section */}
      <section
        className="bg-color-grey-50 section-spacing-5xl"
        aria-labelledby="values"
      >
        <div className="stack-8xl custom-container">
          <header className="section-head">
            <p className="section-title">استكشاف القيم الأساسية للمنظمة</p>
            <h2 id="values" className="section-header">
              الــقـــيـــم
            </h2>
          </header>

          <div className="about-cards">
            <ul
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]"
              role="list"
            >
              {valuesCardsContents.slice(0, 3).map((content, index) => (
                <li key={index} className="about-value-card">
                  <div className="about-value-card__header">
                    <span className="about-value-card__badge">
                      {content.number}
                    </span>
                    <div className="about-value-card__content">
                      <h3 className="about-value-card__title">
                        {content.title}
                      </h3>
                      <p className="about-value-card__desc">
                        {content.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <ul
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]"
              role="list"
            >
              {valuesCardsContents.slice(3, 5).map((content, index) => (
                <li key={index} className="about-value-card">
                  <div className="about-value-card__header">
                    <span className="about-value-card__badge">
                      {content.number}
                    </span>
                    <div className="about-value-card__content">
                      <h3 className="about-value-card__title">
                        {content.title}
                      </h3>
                      <p className="about-value-card__desc">
                        {content.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section
        className="stack bg-color-grey-50 section-spacing-10xl"
        aria-labelledby="core-principles"
      >
        <div className="stack-4xl custom-container">
          <header className="section-head">
            <h2 id="core-principles" className="section-header">
              مرتكزات اختبارات همزة؟
            </h2>
          </header>

          <div className="about-cards">
            <div className="about-cards__row !items-stretch">
              {mortakazatCardsContents.map((content, index) => (
                <Card
                  key={index}
                  style={{ borderRadius: "16px", border: "none" }}
                  title={content.title}
                  description={content.description}
                  number={content.number}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
