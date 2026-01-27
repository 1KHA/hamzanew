"use client";
import Card from "@/app/components/card/Card";
import "../about.css";
export default function page() {
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

  const cards = cardsContent.map((card, index) => {
    return (
      <Card
        key={index}
        style={{
          borderRadius: "16px",        }}
        title={card.title}
        description={card.description}
        icon={card.icon}
      />
    );
  });

  const valuesCards = valuesCardsContents.map((content, index) => {
    return (
      <div key={index} className="about-value-card">
        <div className="about-value-card__header">
          <span className="about-value-card__badge">{content.number}</span>

          <div className="about-value-card__content">
            <h3 className="about-value-card__title">{content.title}</h3>
            <p className="about-value-card__desc">{content.description}</p>
          </div>
        </div>
      </div>
    );
  });


  
  const mortakazatCards = mortakazatCardsContents.map((content, index) => {
    return (
      <Card
        key={index}
        style={{
          borderRadius: "16px",
          display: "flex",
        
          border: "none"
        }}
        title={content.title}
        description={content.description}
        number={content.number}
      />
    );
  });
  return (
    <>


    

      <div className="stack">
        {/* first section */}
        <div className="about-us-cards-container custom-container">
          {/* cards */}
          {cards}
        </div>
        {/* second section */}
        <div className=" bg-color-grey-50 section-spacing-5xl">
          <div className="stack-8xl custom-container">
            <div className="section-head">
              <p className="section-title">استكشاف القيم الأساسية للمنظمة</p>
              <h1 className="section-header">الــقـــيـــم</h1>
            </div>

            <div className="about-cards">
              <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]">
                {valuesCards.slice(0, 3)}
              </div>

              <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[24px]">
                {valuesCards.slice(3, 5)}
              </div>
            </div>
          </div>
        </div>
        {/* third section */}
        <div className="stack bg-color-grey-50 section-spacing-10xl">
          <div className="stack-4xl custom-container">
            <div className="section-head">
              <h1 className="section-header">مرتكزات اختبارات همزة؟</h1>
            </div>

            <div className="about-cards">
              <div className="about-cards__row !items-stretch">{mortakazatCards}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
