export const VISION_MISSION = [
  {
    title: "الرؤية",
    description: "الريادة عالميًا في تعزيز مكانة اللغة العربية عبر اختبارات كفاءة عالية الجودة، مبنية على معايير دولية ومعتمدة وموثوقة.",
    icon: "view",
  },
  {
    title: "الرسالة",
    description: "تقديم اختبارات عربية عالية الجودة، مبنية على معايير دولية، تمكّن المتعلمين والمهنيين من إثبات كفاءتهم، وتفتح أمامهــــــم آفاقًــــا أكـــاديـــميــــة ومهنيــــــة واسعــــــــــة.",
    icon: "mail-01",
  },
] as const;

export const VALUES = [
  { number: "1", title: "الموثوقية",  description: "تقديم نتائج دقيقة وثابتة تعتمد محلياً ودولياً." },
  { number: "2", title: "الموضوعية", description: "ضمان الحياد التام وخلو التقييم من أي تحيز." },
  { number: "3", title: "الجودة",     description: "الالتزام بالمعايير الدولية وأفضل الممارسات في القياس." },
  { number: "4", title: "الابتكار",   description: "تطوير مستمر وتبني أحدث التقنيات في الاختبارات." },
  { number: "5", title: "العالمية",   description: "اعتراف واعتماد دولي يعزز مكانة اللغة العربية عالميًا." },
] as const;

export const MORTAKAZAT = [
  {
    number: "1",
    title: "المرجعية الدولية",
    description: "تستند إلى الإطار الأوروبي المرجعي المشترك للغات (CEFR) لضمان اتساقها مع أفضل الممارسات العالمية",
  },
  {
    number: "2",
    title: "تنوع الاختبارات",
    description: "تغطي منظومة همزة أربعة مجالات رئيسة (أكاديمي، عام، تحديد المستوى، مفردات) لتلبية مختلف الاحتياجات التعليمية والمهنية",
  },
  {
    number: "3",
    title: "المرونة والأمان",
    description: "بنيت لتُطبق إلكترونيًا بمرونة عالية، مع اعتماد إجراءات صارمة لضمان الأمان وحماية البيانات",
  },
] as const;

/* ------------------------------------------------------------------
   English fallback data (used when API fails and locale = en-US)
   ------------------------------------------------------------------ */

export const VISION_MISSION_EN = [
  {
    title: "Vision",
    description: "Global leadership in enhancing the status of the Arabic language through high-quality proficiency tests built on international, accredited, and reliable standards.",
    icon: "view",
  },
  {
    title: "Mission",
    description: "To provide high-quality Arabic tests built on international standards that enable learners and professionals to demonstrate their proficiency and open wide academic and professional horizons for them.",
    icon: "mail-01",
  },
] as const;

export const VALUES_EN = [
  { number: "1", title: "Reliability", description: "Delivering accurate and consistent results recognized locally and internationally." },
  { number: "2", title: "Objectivity", description: "Ensuring complete neutrality and freedom from any bias in assessment." },
  { number: "3", title: "Quality", description: "Commitment to international standards and best practices in measurement." },
  { number: "4", title: "Innovation", description: "Continuous development and adoption of the latest technologies in testing." },
  { number: "5", title: "Global Reach", description: "International recognition and accreditation that enhance the status of the Arabic language globally." },
] as const;

export const MORTAKAZAT_EN = [
  {
    number: "1",
    title: "International Reference",
    description: "Based on the Common European Framework of Reference for Languages (CEFR) to ensure alignment with global best practices.",
  },
  {
    number: "2",
    title: "Test Diversity",
    description: "The Hamza ecosystem covers four main domains (Academic, General, Placement, Vocabulary) to meet various educational and professional needs.",
  },
  {
    number: "3",
    title: "Flexibility & Security",
    description: "Designed to be administered electronically with high flexibility, while adopting strict procedures to ensure security and data protection.",
  },
] as const;
