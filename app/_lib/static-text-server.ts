/**
 * Static Bilingual Text Dictionary — Server-Safe
 *
 * No "use client" directive. The `st()` helper requires an explicit
 * `locale` parameter; it never touches the DOM.
 *
 * Usage (server components):
 *   import { st } from "@/app/_lib/static-text-server";
 *   <h1>{st("banner", "slideTitle", locale)}</h1>
 */

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
    globalOption: { ar: "كل الدول", en: "Global" },
    yearLabel: { ar: "السنة", en: "Year" },
    countryLabel: { ar: "الدولة", en: "Country" },
    countryPlaceholder: { ar: "اختر الدولة", en: "Select Country" },
    testTypeLabel: { ar: "نوع الاختبار", en: "Test Type" },
    testTypePlaceholder: { ar: "اختبار همزة الأكاديمي", en: "Hamza Academic Test" },
    testAcademic: { ar: "اختبار همزة الأكاديمي", en: "Hamza Academic Test" },
    testGeneral: { ar: "اختبار همزة العام", en: "Hamza General Test" },
    testPlacement: { ar: "اختبار تحديد المستوى", en: "Placement Test" },
    testVocabulary: { ar: "اختبار المفردات", en: "Vocabulary Test" },
    nationalityLabel: { ar: "الجنسية", en: "Nationality" },
    nationalityPlaceholder: { ar: "الجنسية", en: "Nationality" },
    globeAlt: { ar: "خريطة العالم", en: "World Map" },
    statCenters: { ar: "مراكز الاختبار", en: "Test Centers" },
    statNationalities: { ar: "جنسيات", en: "Nationalities" },
    statCountries: { ar: "دولة", en: "Countries" },
    statTesters: { ar: "مختبرين", en: "Testers" },
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
    email: { ar: "البريد الإلكتروني", en: "Email" },
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
  navActions: {
    signIn: { ar: "تسجيل الدخول", en: "Sign In" },
    search: { ar: "بحث", en: "Search" },
    profile: { ar: "الملف الشخصي", en: "Profile" },
    signOut: { ar: "تسجيل الخروج", en: "Sign Out" },
    userMenu: { ar: "قائمة المستخدم", en: "User Menu" },
    openMenu: { ar: "فتح قائمة التنقل", en: "Open navigation menu" },
    closeMenu: { ar: "إغلاق القائمة", en: "Close menu" },
    scrollLeft: { ar: "تمرير القائمة يساراً", en: "Scroll menu left" },
    scrollRight: { ar: "تمرير القائمة يميناً", en: "Scroll menu right" },
    mainNav: { ar: "التنقل الرئيسي", en: "Main navigation" },
    pageMenu: { ar: "قائمة الصفحات", en: "Page menu" },
    homeLink: { ar: "الصفحة الرئيسة - همزة", en: "Homepage - Hamza" },
    searchAria: { ar: "البحث", en: "Search" },
    searchIcon: { ar: "أيقونة البحث", en: "Search icon" },
    userIcon: { ar: "أيقونة المستخدم", en: "User icon" },
    menuIcon: { ar: "أيقونة القائمة", en: "Menu icon" },
    actionIcon: { ar: "أيقونة الإجراء", en: "Action icon" },
    hamzaLogo: { ar: "شعار همزة", en: "Hamza Logo" },
    myAccount: { ar: "حسابي", en: "My Account" },
  },
  digitalSignature: {
    badge: { ar: "موقع حكومي مسجل لدى هيئة الحكومة الرقمية", en: "Official government website of the Government of the Kingdom of Saudi Arabia" },
    verify: { ar: "كيف تتحقق", en: "How to verify" },
    panelLabel: { ar: "تفاصيل التحقق من الموقع", en: "Site verification details" },
    domainTitle: { ar: "روابط المواقع الالكترونية الرسمية السعودية تنتهي بـ", en: "Links to official Saudi websites end with" },
    domainBody: { ar: "جميع روابط المواقع الرسمية التابعة للجهات الحكومية في المملكة العربية السعودية تنتهي بـ .gov.sa", en: "All links to official websites of government agencies in the Kingdom of Saudi Arabia end with .gov.sa" },
    httpsTitle: { ar: "المواقع الالكترونية الحكومية تستخدم بروتوكول", en: "Government websites use the" },
    httpsSuffix: { ar: "للتشفير و الأمان.", en: "protocol for encryption and security." },
    httpsBody: { ar: "المواقع الالكترونية الآمنة في المملكة العربية السعودية تستخدم بروتوكول HTTPS للتشفير.", en: "Secure websites in the Kingdom of Saudi Arabia use the HTTPS protocol for encryption." },
    dgaAlt: { ar: "شعار هيئة الحكومة الرقمية", en: "Digital Government Authority logo" },
    dgaLabel: { ar: "مسجل لدى هيئة الحكومة الرقمية برقم:", en: "Registered with the Digital Government Authority under number:" },
    langBtn: { ar: "English", en: "عربي" },
    langAriaLabel: { ar: "Switch language to English", en: "تبديل اللغة إلى العربية" },
  },
  about: {
    /* ── About landing page cards ─────────────────────────────────────────────── */
    navAria: { ar: "أقسام عن همزة", en: "About Hamza Sections" },
    whoWeAre: { ar: "من نحن", en: "Who We Are" },
    testTraits: { ar: "سمات اختبار همزة", en: "Hamza Test Traits" },
    benefits: { ar: "أهمية اختبارات همزة", en: "Benefits of Hamza Tests" },
    benefitsSubtitle: { ar: "كيفية الإستفادة من همزة", en: "Benefits of Hamza Test" },
    benefitsTakersTitle: { ar: "فوائد اختبارات همزة للمختبرين", en: "Benefits of Hamza Tests for Test Takers" },
    benefitsDescription: {
      ar: "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.",
      en: "Hamza tests provide a standardized and reliable approach to measuring proficiency in the Arabic language. They are used by individuals seeking to study, work, or immigrate to Arabic-speaking countries. These tests support institutions in selecting the most suitable students, building workforces capable of communicating effectively in professional and educational environments, and attracting talent to your organization.",
    },
    benefitsOrgTitle: { ar: "فوائد اختبارات همزة للجهات", en: "Benefits of Hamza Tests for Organizations" },
    benefitsOrgSubtitle: { ar: "كيفية الاستفادة من همزة", en: "How to Benefit from Hamza" },
    institutions: { ar: "المؤسسات والدول التي تقبل همزة", en: "Institutions & Countries Accepting Hamza" },
    committee: { ar: "اللجنة الاستشارية الدولية", en: "International Advisory Committee" },
    ambassadors: { ar: "سفراء همزة", en: "Hamza Ambassadors" },
    eParticipation: { ar: "المشاركة الالكترونية", en: "E-Participation" },

    /* ── Hero descriptions ────────────────────────────────────────────────────── */
    heroAboutDescription: {
      ar: "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
      en: "Hamza Test Platform is one of the technical tools supporting the King Salman Global Academy for Arabic Language initiative in building and activating standard Arabic language tests. The platform aims to introduce and implement Hamza tests, and provides qualitative data and indicators to support specialists, researchers, and related entities.",
    },
    heroWhoWeAreDescription: {
      ar: "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها. وتهدف المنصة إلى التعريف باختبارات همزة وتطبيقها، كما تتيح توفير بيانات ومؤشرات نوعية لدعم المختصين والباحثين والجهات ذات العلاقة",
      en: "Hamza Test Platform is one of the technical tools supporting the King Salman Global Academy for Arabic Language initiative in building and activating standard Arabic language tests. The platform aims to introduce and implement Hamza tests, and provides qualitative data and indicators to support specialists, researchers, and related entities.",
    },
    heroCommitteeDescription: {
      ar: "تهدف اللجنة الاستشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية.",
      en: "The advisory committee aims to benefit from providing consultations and raising recommendations and activities related to developing measurement tools and approved standards, contributing to the sustainability of improvement and development in future directions in this field, to adopt the best periodic practices in measuring Arabic language skills.",
    },
    heroInstitutionsDescription: {
      ar: "تعتمد بعض المؤسسات حول العالم على اختبار همزة لتقييم الكفاءة في اللغة العربية تشمل هذه المؤسسات: الجامعات، الجهات الحكومية، الهيئات المهنية، شركات التوظيف، وجهات الهجرة في الدول الناطقة بالعربية أو المهتمة بها.",
      en: "Some institutions around the world rely on the Hamza test to assess competence in the Arabic language. These institutions include: universities, government agencies, professional bodies, recruitment companies, and immigration authorities in Arabic-speaking countries or those interested in it.",
    },
    heroAmbassadorsDescription: {
      ar: "تهدف اللجنة الاستشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية لمختلف الفئات.",
      en: "The advisory committee aims to benefit from providing consultations and raising recommendations and activities related to developing measurement tools and approved standards, contributing to the sustainability of improvement and development in future directions in this field, to adopt the best periodic practices in measuring Arabic language skills for different categories.",
    },
    heroTraitsDescription: {
      ar: "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.",
      en: "Hamza tests provide a standardized and reliable approach to measuring competence in the Arabic language. They are used by individuals seeking to study, work, or immigrate to Arabic-speaking countries. These tests support institutions in selecting the most suitable students, building cadres capable of communicating effectively in work and education environments, and attracting competencies to your entity.",
    },

    /* ── Institutions page ────────────────────────────────────────────────────── */
    institutionsMetaTitle: { ar: "المؤسسات والدول التي تقبل همزة", en: "Institutions & Countries Accepting Hamza" },
    institutionsMetaDescription: {
      ar: "تعتمد بعض المؤسسات حول العالم على اختبار همزة لتقييم الكفاءة في اللغة العربية تشمل هذه المؤسسات: الجامعات، الجهات الحكومية، الهيئات المهنية، شركات التوظيف، وجهات الهجرة في الدول الناطقة بالعربية أو المهتمة بها.",
      en: "Some institutions around the world rely on the Hamza test to assess competence in the Arabic language. These institutions include: universities, government agencies, professional bodies, recruitment companies, and immigration authorities in Arabic-speaking countries or those interested in it.",
    },
    institutionsSectionTitle: { ar: "كن جزءًا من مجتمع همزة", en: "Be part of the Hamza community" },
    institutionsHeading: { ar: "الجهات التي طبقت اختبار همزة", en: "Institutions that have implemented the Hamza test" },
    institutionsLogoAlt: { ar: "شعار المؤسسة", en: "Institution logo" },
    resourcesSectionAria: { ar: "الموارد والإحصائيات", en: "Resources and statistics" },
    institutionsCtaTitle: { ar: "هل أنت مستعد للانضمام إلينا؟", en: "Are you ready to join us?" },
    institutionsCtaDesc: {
      ar: "انضم إلى آلاف المؤسسات والشركات في العالم العربي التي تعتمد همزة لاختيار الموظفين القادرين على التواصل باحترافية وإتقان.",
      en: "Join thousands of institutions and companies in the Arab world that rely on Hamza to select employees capable of communicating professionally and proficiently.",
    },
    institutionsCtaButton: { ar: "إنضم إلينا", en: "Join us" },
    institutionsCtaButtonAria: { ar: "انضم إلينا الآن", en: "Join us now" },
  },
  feedback: {
    /* ── Main question ────────────────────────────────────────────────────────── */
    sectionAria: { ar: "تقييم الصفحة", en: "Page Rating" },
    question: { ar: "هل كانت هذه الصفحة مفيدة؟", en: "Was this page helpful?" },
    yes: { ar: "نعم", en: "Yes" },
    no: { ar: "لا", en: "No" },
    closeAria: { ar: "إغلاق نموذج التقييم", en: "Close feedback form" },
    close: { ar: "إغلاق", en: "Close" },
    submittedMessage: { ar: "تم إرسال ملاحظاتك!", en: "Your feedback has been sent!" },

    /* ── Stats ────────────────────────────────────────────────────────────────── */
    statsText: { ar: "{percent}% من المستخدمين قالوا نعم من {count} تعليقًا", en: "{percent}% of users said yes out of {count} comments" },
    statsAria: { ar: "{percent} بالمئة من المستخدمين قالوا نعم، من أصل {count} تعليق", en: "{percent} percent of users said yes, out of {count} comments" },

    /* ── Survey panel ─────────────────────────────────────────────────────────── */
    surveyPanelAria: { ar: "نموذج التقييم التفصيلي", en: "Detailed feedback form" },
    notificationLead: { ar: "مهم", en: "Important" },
    notificationContent: { ar: "نرجو منك استكمال الاستبيان لإرسال التقييم", en: "Please complete the survey to submit feedback" },
    reasonLegend: { ar: "يرجى إخبارنا بالسبب", en: "Please tell us why" },
    reasonHint: { ar: "(يمكنك تحديد خيارات متعددة)", en: "(You can select multiple options)" },
    reasonError: { ar: "يرجى اختيار سبب واحد على الأقل", en: "Please select at least one reason" },
    notesLabel: { ar: "الملاحظات", en: "Notes" },
    genderLegend: { ar: "أنا", en: "I am" },
    genderMale: { ar: "ذكر", en: "Male" },
    genderFemale: { ar: "أنثى", en: "Female" },
    genderError: { ar: "يرجى تحديد الجنس", en: "Please select your gender" },

    /* ── Footer links ─────────────────────────────────────────────────────────── */
    footerInfo: { ar: "لمزيد من المعلومات، يمكنك مراجعة", en: "For more information, please review" },
    eParticipationLabel: { ar: "بيان المشاركة الإلكترونية", en: "E-Participation Statement" },
    subscriptionRulesLabel: { ar: "قواعد الاشتراك", en: "Subscription Rules" },
    submitAria: { ar: "إرسال التقييم", en: "Submit feedback" },
    submit: { ar: "إرسال", en: "Submit" },

    /* ── Yes options ──────────────────────────────────────────────────────────── */
    yesOptionRelevant: { ar: "المحتوى ذو صلة", en: "Content is relevant" },
    yesOptionWellWritten: { ar: "كان مكتوبًا بشكل جيد", en: "Well written" },
    yesOptionEasyFormat: { ar: "التنسيق سهَّل القراءة", en: "Easy to read format" },
    yesOptionOther: { ar: "شيء آخر", en: "Something else" },

    /* ── No options ───────────────────────────────────────────────────────────── */
    noOptionNotRelevant: { ar: "المحتوى غير ذو صلة", en: "Content is not relevant" },
    noOptionNotAccurate: { ar: "المحتوى غير دقيق", en: "Content is not accurate" },
    noOptionTooLong: { ar: "المحتوى طويل جدًا", en: "Content is too long" },
    noOptionOther: { ar: "شيء آخر", en: "Something else" },
  },
};

/**
 * Static text lookup — server-safe version.
 *
 * @param locale - Optional locale (defaults to "ar"). This function never touches the DOM.
 */
export function st(scope: string, key: string, locale?: "ar" | "en"): string {
  const activeLocale = locale || "ar";
  const scopeDict = STATIC_TEXT[scope];
  if (!scopeDict) return key;
  const entry = scopeDict[key];
  if (!entry) return key;
  return entry[activeLocale] || entry.ar || key;
}
