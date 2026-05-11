/**
 * Static Bilingual Text Dictionary
 *
 * Holds AR / EN pairs for hardcoded UI text that does not come from the
 * Liferay translation API. Client components can import `st()` and use it
 * directly — no props drilling required.
 *
 * Usage:
 *   import { st } from "@/app/_lib/static-text";
 *   <button>{st("banner", "buttonMore")}</button>
 */

/* ------------------------------------------------------------------
   Dictionary
   ------------------------------------------------------------------ */

export const STATIC_TEXT: Record<string, Record<string, { ar: string; en: string }>> = {
  banner: {
    buttonMore: { ar: "المزيد", en: "More" },
    slideTitle: { ar: "اختبارات همزة", en: "Hamza Tests" },
    slideAlt: { ar: "اختبارات همزة", en: "Hamza Tests" },
    ariaBanner: { ar: "عرض شرائح البانر", en: "Banner slideshow" },
    ariaPlay: { ar: "تشغيل العرض التلقائي", en: "Play auto slideshow" },
    ariaPause: { ar: "إيقاف العرض التلقائي", en: "Pause auto slideshow" },
    ariaGoToSlide: { ar: "الانتقال إلى الشريحة", en: "Go to slide" },
    ariaNav: { ar: "التنقل بين الشرائح", en: "Slide navigation" },
    slideOf: { ar: "الشريحة", en: "Slide" },
    of: { ar: "من", en: "of" },
    slideDescription: {
      ar: "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
      en: "Hamza Test Platform is one of the technical tools supporting the King Salman Global Academy for Arabic Language initiative in building and activating standard Arabic language tests. The platform aims to introduce and implement Hamza tests, and provides qualitative data and indicators to support specialists, researchers, and related entities.",
    },
  },
  services: {
    sectionAria: { ar: "اختبارات همزة", en: "Hamza Tests" },
    heading: { ar: "تعرف على اختبارات همزة", en: "Discover Hamza Tests" },
    description: {
      ar: "نوفر خدمات إلكترونية للتسجيل في الاختبارات، مع تقديم معلومات واضحة ومبسطة عن كل اختبار",
      en: "We provide electronic services for test registration, with clear and simplified information about each test.",
    },
    carouselAria: { ar: "عرض الاختبارات المتاحة", en: "Available tests display" },
    register: { ar: "التسجيل للاختبار", en: "Register for the test" },
    more: { ar: "المزيد", en: "More" },
    generalTestTitle: { ar: "اختبار همزة العام", en: "Hamza General Test" },
    generalTestDesc: {
      ar: "اختبار محوسب، دقيق، يقيس كفايات اللغة العربية للناطقين بغيرها لأغراض أكاديمية.",
      en: "A computer-based, accurate test that measures Arabic language proficiency for non-native speakers for academic purposes.",
    },
    academicTestTitle: { ar: "اختبار همزة الأكاديمي", en: "Hamza Academic Test" },
    academicTestDesc: {
      ar: "اختبار لقياس كفايات اللغة العربية للناطقين بغيرها لأغراض عامة.",
      en: "A test to measure Arabic language proficiency for non-native speakers for general purposes.",
    },
    placementTestTitle: { ar: "اختبار تحديد المستوى", en: "Placement Test" },
    placementTestDesc: {
      ar: "اختبار لتحديد مستوى الكفاءة اللغوية العامة باللغة العربية لغير الناطقين بها لاستخدامه في البرامج الأكاديمية.",
      en: "A test to determine the general language proficiency level in Arabic for non-native speakers for use in academic programs.",
    },
    vocabularyTestTitle: { ar: "اختبار همزة المفردات", en: "Hamza Vocabulary Test" },
    vocabularyTestDesc: {
      ar: "اختبار معياري لقياس مستويات المفردات لدى الناطقين بغير العربية لأغراض مختلفة.",
      en: "A standardized test to measure vocabulary levels among non-Arabic speakers for various purposes.",
    },
  },
  news: {
    sectionAria: { ar: "الأخبار والمقالات", en: "News & Articles" },
    heading: { ar: "الأخبار والمقالات", en: "News & Articles" },
    showAll: { ar: "عرض الكل", en: "View All" },
    description: {
      ar: "نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير الاختبارات المعيارية للغة العربية",
      en: "We present the latest news and specialized articles on Hamza tests and the development of standard Arabic language tests.",
    },
    carouselAria: { ar: "آخر الأخبار", en: "Latest News" },
    readMore: { ar: "قراءة المزيد", en: "Read More" },
  },
  statistics: {
    sectionAria: { ar: "إحصائيات همزة", en: "Hamza Statistics" },
    showAll: { ar: "عرض الكل", en: "View All" },
    headingFallback: { ar: "همزة في أرقام", en: "Hamza in Numbers" },
    descriptionFallback: {
      ar: "يعرض قسم إحصائيات همزة بيانات عن عدد المختبرين عالميًا، وتنوّع الجنسيات والدول، إضافة إلى أعداد المختبرين في مراكز الاختبار.",
      en: "The Hamza Statistics section displays data on the number of test takers worldwide, the diversity of nationalities and countries, in addition to the number of test takers at test centers.",
    },
    statsAria: { ar: "الإحصائيات العامة", en: "General Statistics" },
    countryLabel: { ar: "الدولة", en: "Country" },
    countryPlaceholder: { ar: "اختر الدولة...", en: "Select a country..." },
    testTypeLabel: { ar: "نوع الاختبار", en: "Test Type" },
    testTypePlaceholder: { ar: "اختبار عام", en: "General Test" },
    testAcademic: { ar: "اختبار أكاديمي", en: "Academic Test" },
    testGeneral: { ar: "اختبار عام", en: "General Test" },
    testPlacement: { ar: "تحديد المستوى", en: "Placement" },
    testVocabulary: { ar: "مفردات", en: "Vocabulary" },
    yearLabel: { ar: "السنة", en: "Year" },
    nationalityLabel: { ar: "الجنسية", en: "Nationality" },
    nationalityPlaceholder: { ar: "اختر الجنسية", en: "Select nationality..." },
    globeAlt: { ar: "خريطة إحصائيات همزة", en: "Hamza Statistics Map" },
    globalOption: { ar: "العالم", en: "Global" },
    statCenters: { ar: "مراكز الاختبار", en: "Test Centers" },
    statNationalities: { ar: "عدد الجنسيات", en: "Nationalities" },
    statCountries: { ar: "عدد الدول", en: "Countries" },
    statTesters: { ar: "مختبر عالميًا", en: "Testers Worldwide" },
  },
  partners: {
    sectionFallback: { ar: "الشركاء", en: "Partners" },
    tabInside: { ar: "داخل المملكة العربية السعودية", en: "Inside the Kingdom of Saudi Arabia" },
    tabOutside: { ar: "دول أخرى", en: "Other Countries" },
    listAria: { ar: "قائمة الشركاء", en: "Partners List" },
  },
  subscription: {
    sectionAria: { ar: "التسجيل في النشرة البريدية", en: "Newsletter Subscription" },
    logoAlt: { ar: "شعار همزة", en: "Hamza Logo" },
    heading: { ar: "سجل اهتمامك", en: "Register Your Interest" },
    description: {
      ar: "سجل اهتمامك بالاختبارات المعيارية للغة العربية واحصل على أحدث التحديثات والأخبار.",
      en: "Register your interest in standard Arabic language tests and get the latest updates and news.",
    },
    formAria: { ar: "نموذج الاشتراك في النشرة البريدية", en: "Newsletter Subscription Form" },
    placeholder: { ar: "ادخل البريد الشبكي", en: "Enter your email address" },
    inputAria: { ar: "البريد الشبكي للاشتراك في النشرة البريدية", en: "Email for newsletter subscription" },
    submitButton: { ar: "مشاركة", en: "Subscribe" },
  },
  footer: {
    footerAria: { ar: "تذييل الصفحة", en: "Footer" },
    colSummary: { ar: "ملخص", en: "Summary" },
    navSummaryAria: { ar: "ملخص", en: "Summary" },
    aboutHamza: { ar: "عن همزة", en: "About Hamza" },
    newsAndEvents: { ar: "الأخبار والأحداث", en: "News & Events" },
    testTypes: { ar: "أنواع اختبارات همزة", en: "Types of Hamza Tests" },
    colImportantLinks: { ar: "روابط مهمة", en: "Important Links" },
    navImportantLinksAria: { ar: "روابط مهمة", en: "Important Links" },
    nationalPortal: { ar: "بوابة الخدمة الوطنية", en: "National Service Portal" },
    openData: { ar: "البيانات الحكومية المفتوحة", en: "Open Government Data" },
    nationalStrategy: { ar: "الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي", en: "National Strategy for Data & AI" },
    opensInNewWindow: { ar: "يفتح في نافذة جديدة", en: "Opens in a new window" },
    colContactSupport: { ar: "الاتصال والدعم", en: "Contact & Support" },
    navContactSupportAria: { ar: "الاتصال والدعم", en: "Contact & Support" },
    contactUs: { ar: "تواصل معنا", en: "Contact Us" },
    reportCorruption: { ar: "الإبلاغ عن الفساد", en: "Report Corruption" },
    colFollowUs: { ar: "تابعنا على", en: "Follow Us" },
    socialListAria: { ar: "تابعنا على وسائل التواصل الاجتماعي", en: "Follow us on social media" },
    twitter: { ar: "تويتر X", en: "Twitter X" },
    whatsapp: { ar: "واتساب", en: "WhatsApp" },
    youtube: { ar: "يوتيوب", en: "YouTube" },
    linkedin: { ar: "لينكد إن", en: "LinkedIn" },
    snapchat: { ar: "سناب شات", en: "Snapchat" },
    instagram: { ar: "انستغرام", en: "Instagram" },
    facebook: { ar: "فيسبوك", en: "Facebook" },
    tiktok: { ar: "تيك توك", en: "TikTok" },
    termsConditions: { ar: "الشروط و الأحكام", en: "Terms & Conditions" },
    faq: { ar: "الاسئلة الشائعة", en: "FAQ" },
    sitemap: { ar: "خريطة الموقع", en: "Sitemap" },
    copyright: { ar: "جميع الحقوق محفوظة لمجمع الملك سلمان العالمي للغة العربية © 2026", en: "All rights reserved to the King Salman Global Academy for Arabic Language © 2026" },
    ksaaLabel: { ar: "مجمع الملك سلمان العالمي للغة العربية", en: "King Salman Global Academy for Arabic Language" },
    ksaaLogoAlt: { ar: "مجمع الملك سلمان العالمي للغة العربية", en: "King Salman Global Academy for Arabic Language" },
    lastModifiedSiteLabel: { ar: "آخر تعديل للموقع", en: "Last site update" },
    timePm: { ar: "2:00 م", en: "2:00 PM" },
    accessibilityTools: { ar: "أدوات الاتاحة والوصول", en: "Accessibility Tools" },
    zoomIn: { ar: "تكبير النص", en: "Zoom In" },
    zoomOut: { ar: "تصغير النص", en: "Zoom Out" },
    changeViewMode: { ar: "تغيير وضع العرض", en: "Change View Mode" },
  },
  lastModified: {
    pageLabel: { ar: "آخر تعديل للصفحة", en: "Last page update" },
    siteLabel: { ar: "آخر تعديل للموقع", en: "Last site update" },
    timeSuffix: { ar: "بتوقيت السعودية", en: "Saudi Arabia time" },
  },
  about: {
    /* ── About landing page cards ─────────────────────────────────────── */
    navAria: { ar: "أقسام عن همزة", en: "About Hamza Sections" },
    whoWeAre: { ar: "من نحن", en: "Who We Are" },
    testTraits: { ar: "سمات اختبار همزة", en: "Hamza Test Traits" },
    benefits: { ar: "أهمية اختبارات همزة", en: "Benefits of Hamza Tests" },
    institutions: { ar: "المؤسسات والدول التي تقبل همزة", en: "Institutions & Countries" },
    advisoryCommittee: { ar: "اللجنة الاستشارية الدولية", en: "International Advisory Committee" },
    ambassadors: { ar: "سفراء همزة", en: "Hamza Ambassadors" },
    eParticipation: { ar: "المشاركة الالكترونية", en: "E-Participation" },
    /* ── Who We Are ───────────────────────────────────────────────────── */
    visionTitle: { ar: "الرؤية", en: "Vision" },
    visionDesc: { ar: "الريادة عالميًا في تعزيز مكانة اللغة العربية عبر اختبارات كفاءة عالية الجودة، مبنية على معايير دولية ومعتمدة وموثوقة.", en: "Global leadership in enhancing the status of the Arabic language through high-quality proficiency tests built on international, accredited, and reliable standards." },
    missionTitle: { ar: "الرسالة", en: "Mission" },
    missionDesc: { ar: "تقديم اختبارات عربية عالية الجودة، مبنية على معايير دولية، تمكّن المتعلمين والمهنيين من إثبات كفاءتهم، وتفتح أمامهم آفاقًا أكاديمية ومهنية واسعة.", en: "To provide high-quality Arabic tests built on international standards that enable learners and professionals to demonstrate their proficiency and open wide academic and professional horizons for them." },
    valuesTitle: { ar: "الــقـــيـــم", en: "Our Values" },
    value1Title: { ar: "الموثوقية", en: "Reliability" },
    value1Desc: { ar: "تقديم نتائج دقيقة وثابتة تعتمد محلياً ودولياً.", en: "Delivering accurate and consistent results recognized locally and internationally." },
    value2Title: { ar: "الموضوعية", en: "Objectivity" },
    value2Desc: { ar: "ضمان الحياد التام وخلو التقييم من أي تحيز.", en: "Ensuring complete neutrality and freedom from any bias in assessment." },
    value3Title: { ar: "الجودة", en: "Quality" },
    value3Desc: { ar: "الالتزام بالمعايير الدولية وأفضل الممارسات في القياس.", en: "Commitment to international standards and best practices in measurement." },
    value4Title: { ar: "الابتكار", en: "Innovation" },
    value4Desc: { ar: "تطوير مستمر وتبني أحدث التقنيات في الاختبارات.", en: "Continuous development and adoption of the latest technologies in testing." },
    value5Title: { ar: "العالمية", en: "Global Reach" },
    value5Desc: { ar: "اعتراف واعتماد دولي يعزز مكانة اللغة العربية عالميًا.", en: "International recognition and accreditation that enhance the status of the Arabic language globally." },
    pillarsTitle: { ar: "مرتكزات اختبارات همزة؟", en: "Why Hamza Test?" },
    pillar1Title: { ar: "المرجعية الدولية", en: "International Reference" },
    pillar1Desc: { ar: "تستند إلى الإطار الأوروبي المرجعي المشترك للغات (CEFR) لضمان اتساقها مع أفضل الممارسات العالمية.", en: "Based on the Common European Framework of Reference for Languages (CEFR) to ensure alignment with global best practices." },
    pillar2Title: { ar: "تنوع الاختبارات", en: "Test Diversity" },
    pillar2Desc: { ar: "تغطي منظومة همزة أربعة مجالات رئيسة (أكاديمي، عام، تحديد المستوى، مفردات) لتلبية مختلف الاحتياجات التعليمية والمهنية.", en: "The Hamza ecosystem covers four main domains (Academic, General, Placement, Vocabulary) to meet various educational and professional needs." },
    pillar3Title: { ar: "المرونة والأمان", en: "Flexibility & Security" },
    pillar3Desc: { ar: "بنيت لتُطبق إلكترونيًا بمرونة عالية، مع اعتماد إجراءات صارمة لضمان الأمان وحماية البيانات.", en: "Designed to be administered electronically with high flexibility, while adopting strict procedures to ensure security and data protection." },
    /* ── Benefits ─────────────────────────────────────────────────────── */
    benefitSectionTitle: { ar: "كيفية الإستفادة من همزة", en: "How to Benefit from Hamza" },
    benefitTakersTitle: { ar: "فوائد اختبارات همزة للمختبرين", en: "Benefits for Test Takers" },
    benefitTakersDesc: { ar: "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.", en: "Hamza tests provide a standardized and reliable approach to measuring Arabic language proficiency, used by individuals seeking to study, work, or immigrate to Arabic-speaking countries. These tests support institutions in selecting the most suitable students and building capable workforces." },
    benefit1Title: { ar: "تمكين", en: "Empowerment" },
    benefit1Desc: { ar: "مجمع الملك سلمان العالمي للغة العربية من الريادة والمرجعية العالمية في خدمة اللغة العربية.", en: "King Salman Global Academy for Arabic Language leads globally in serving the Arabic language." },
    benefit2Title: { ar: "فتح أبواب الفرص", en: "Open Opportunities" },
    benefit2Desc: { ar: "يعزز فرصك الأكاديمية والمهنية في الجامعات وسوق العمل.", en: "Enhances your academic and professional opportunities in universities and the job market." },
    benefit3Title: { ar: "تطوير لغتك", en: "Develop Your Language" },
    benefit3Desc: { ar: "يساعدك الاختبار على معرفة مستواك بدقة، مما يمكّنك من وضع خطة واضحة لتحسين مهاراتك اللغوية.", en: "Helps you accurately assess your level, enabling you to create a clear plan to improve your language skills." },
    orgBenefit1: { ar: "قياس الكفاءة اللغوية لدى متعلمي اللغة العربية من غير الناطقين بها", en: "Measure Arabic language proficiency among non-native speakers." },
    orgBenefit2: { ar: "المفاضلة بين المتقدمين للبرامج الأكاديمية.", en: "Compare applicants for academic programs." },
    orgBenefit3: { ar: "التنافس على المنح الدراسية.", en: "Compete for scholarships." },
    orgBenefit4: { ar: "قياس نواتج التعلم في المقررات الدراسية وتطوير مخرجات التعليم", en: "Measure learning outcomes and improve educational outputs." },
    orgBenefit5: { ar: "الإعفاء من بعض المقررات الجامعية.", en: "Exemption from some university courses." },
    benefitsForOrgsTitle: { ar: "فوائد اختبارات همزة للجهات", en: "Benefits for Organizations" },
    benefitCardAria: { ar: "الفائدة", en: "Benefit" },
    benefitListAria: { ar: "قائمة فوائد الاختبار للمختبرين", en: "List of benefits for test takers" },
    /* ── Hamza Test Traits ────────────────────────────────────────────── */
    traitsTitle: { ar: "السمات", en: "Traits" },
    trait1Title: { ar: "مصممة بأفضل معايير الأمان", en: "Designed with Best Security Standards" },
    trait1Desc: { ar: "تضمن حماية البيانات، والتحقق من هوية المختبرين باستخدام تقنيات حديثة.", en: "Ensures data protection and verifies test taker identity using modern technologies." },
    trait2Title: { ar: "مُحوسبة وسهلة التطبيق", en: "Computerized & Easy to Apply" },
    trait2Desc: { ar: "يمكن تطبيقها في المراكز التعليمية أو عن بُعد، مع تجربة استخدام سلسة للمتقدمين والمشرفين.", en: "Can be applied in educational centers or remotely, with a smooth user experience." },
    trait3Title: { ar: "شاملة وتقيس مختلف المهارات اللغوية", en: "Comprehensive & Measures Various Language Skills" },
    trait3Desc: { ar: "تغطي مهارات القراءة، الكتابة، الاستماع، والتراكيب اللغوية، لتقديم صورة متكاملة عن مستوى المتقدم.", en: "Covers reading, writing, listening, and linguistic structures for a comprehensive assessment." },
    trait4Title: { ar: "معيارية وموثوقة", en: "Standardized & Reliable" },
    trait4Desc: { ar: "تعتمد همزة على أسس علمية ومعايير قياس معتمدة لضمان دقة النتائج وعدالتها بين جميع المتقدمين.", en: "Built on scientific foundations and accredited measurement standards to ensure accuracy and fairness." },
    /* ── Periodic Advisory Committee ──────────────────────────────────── */
    committeeTitle: { ar: "اللجنة الاستشارية الدولية", en: "International Advisory Committee" },
    committeeDesc: { ar: "تهدف اللجنة الاستشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية.", en: "The Advisory Committee aims to provide consultations and recommendations related to developing measurement tools and approved standards, contributing to sustainable improvement in future directions for measuring Arabic language skills." },
    viewAll: { ar: "عرض الكل", en: "View All" },
    tasksTitle: { ar: "المهام الرئيسة", en: "Main Tasks" },
    membersTitle: { ar: "أعضاء اللجنة الاستشارية الدورية", en: "Periodic Advisory Committee Members" },
    task1: { ar: "مراجعة الأطر المنهجية والمعايير المرجعية لاختبارات همزة.", en: "Review methodological frameworks and reference standards for Hamza tests." },
    task2: { ar: "تقديم التوصيات العلمية لدعم السياسات التطويرية وضمان الجودة.", en: "Provide scientific recommendations to support developmental policies and ensure quality." },
    task3: { ar: "تغطي مهارات القراءة، الكتابة، الاستماع، والتراكيب اللغوية، لتقديم صورة متكاملة عن مستوى المتقدم.", en: "Cover reading, writing, listening, and linguistic structures for a comprehensive assessment." },
    task4: { ar: "تقييم تقارير الصلاحية والموثوقية وتقديم الملاحظات العلمية حولها.", en: "Evaluate validity and reliability reports and provide scientific observations." },
    task5: { ar: "الإسهام في ربط المشروع بخبرات وممارسات عالمية في مجال تعليم اللغات وقياسها.", en: "Contribute to connecting the project with global expertise in language education and assessment." },
    task6: { ar: "دعم استدامة الاختبارات من خلال المشورة في القضايا العلمية والأكاديمية المستجدة.", en: "Support test sustainability through consultation on emerging scientific and academic issues." },
    /* ── Institutions ─────────────────────────────────────────────────── */
    insideKsa: { ar: "داخل المملكة العربية السعودية", en: "Inside Saudi Arabia" },
    otherCountries: { ar: "دول أخرى", en: "Other Countries" },
    ctaHeading: { ar: "هل أنت مستعد للانضمام إلينا؟", en: "Are you ready to join us?" },
    resourcesAria: { ar: "الموارد والإحصائيات", en: "Resources & Statistics" },
    /* ── Institutions ─────────────────────────────────────────────────── */
    institutionsSectionSubtitle: { ar: "كن جزءًا من مجتمع همزة", en: "Be Part of the Hamza Community" },
    institutionsHeading: { ar: "الجهات التي طبقت اختبار همزة", en: "Institutions That Applied Hamza Test" },
    institutionLogoAlt: { ar: "شعار المؤسسة", en: "Institution Logo" },
    resource1Title: { ar: "إحصائيات الاختبارات", en: "Test Statistics" },
    resource1Desc: { ar: "يُساعد اختبار همزة الناس حول العالم. يمكنك معرفة أداء المتقدمين السابقين للاختبار من خلال صفحة الإحصائيات لدينا.", en: "Hamza test helps people around the world. You can learn about the performance of previous test takers through our statistics page." },
    resource1Action: { ar: "تصفح الاحصائيات", en: "Browse Statistics" },
    resource2Title: { ar: "احصل على النتائج التي تستحقها", en: "Get the Results You Deserve" },
    resource2Desc: { ar: "نوفر لك مجموعة واسعة من الموارد لمساعدتك في الحصول على نتائج الاختبار التي تحتاجها. تابع تقدمك، واحصل على المساعدة، واكتشف المزيد عبر صفحة الموارد لدينا.", en: "We provide you with a wide range of resources to help you get the test results you need. Track your progress, get help, and discover more on our resources page." },
    resource2Action: { ar: "التحضير للإختبار", en: "Prepare for the Test" },
    ctaDesc: { ar: "انضم إلى آلاف المؤسسات والشركات في العالم العربي التي تعتمد همزة لاختيار الموظفين القادرين على التواصل باحترافية وإتقان.", en: "Join thousands of institutions and companies in the Arab world that rely on Hamza to select employees who can communicate professionally and proficiently." },
    ctaButton: { ar: "إنضم إلينا", en: "Join Us" },
    /* ── Hamza Ambassadors ────────────────────────────────────────────── */
    ambassadorsTitle: { ar: "سفراء همزة", en: "Hamza Ambassadors" },
    ambassadorsDesc: { ar: "تهدف اللجنة الاستشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية لمختلف الفئات.", en: "The Advisory Committee aims to provide consultations and recommendations related to developing measurement tools and approved standards, contributing to sustainable improvement in future directions for measuring Arabic language skills for various categories." },
  },
};

/* ------------------------------------------------------------------
   Helpers
   ------------------------------------------------------------------ */

function getLocale(): "ar" | "en" {
  if (typeof document === "undefined") return "ar"; // SSR safe default
  const lang = document.documentElement.lang;
  if (lang?.startsWith("en")) return "en";
  return "ar";
}

/**
 * Static text lookup.
 *
 * @param scope  - Top-level category in STATIC_TEXT (e.g. "banner")
 * @param key    - Key inside that scope (e.g. "buttonMore")
 * @param locale - Optional locale override ("ar" | "en"). If omitted, reads from the DOM.
 * @returns The Arabic or English string, or the key itself if not found.
 */
export function st(scope: string, key: string, locale?: "ar" | "en"): string {
  const activeLocale = locale || getLocale();
  const scopeDict = STATIC_TEXT[scope];
  if (!scopeDict) return key;
  const entry = scopeDict[key];
  if (!entry) return key;
  return entry[activeLocale] || entry.ar || key;
}
