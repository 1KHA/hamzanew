import { Metadata } from "next";
import DiscoverHamzaTestsContent from "./DiscoverHamzaTestsContent";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "اكتشف اختبارات همزة",
  description: "اكتشف اختبارات همزة",
};

interface TabContent {
  title_icon: string;
  header: string;
  description: string;
  link: string;
  image: string;
}

interface AreYouReadyData {
  titleText: string;
  descriptionText: string;
  buttonText: string;
}

async function getDiscoverHamzaTestsData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/test-takers/discover-hamza-tests`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      console.error("Failed to fetch discover hamza tests data:", response.status);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching discover hamza tests data:", error);
    return null;
  }
}

// Static fallback data
const staticTabsContent: TabContent[] = [
  {
    title_icon: "mortarboard-02",
    header: "اختبار همزة الأكاديمي",
    description:
      "يعد متطلبا لدراسة في الجامعات أو المعاهد العليا، حيث يركّز على تقييم المهارات اللغة العربية الأكاديمية .",
    link: "/types-of-tests/hamza-academic-test",
    image: "/assets/image/academic-test.png",
  },
  {
    title_icon: "glasses",
    header: "اختبار همزة العام",
    description:
      "يُعد اختبار همزة العام أداة موثوقة لقياس كفاءة اللغة العربية للناطقين بغيرها للأغراض العامة.",
    link: "/types-of-tests/hamza-general-test",
    image: "/assets/image/photo2.jpg",
  },
  {
    title_icon: "star",
    header: "اختبار همزة لتحديد المستوى!!",
    description:
      "ضمم الاختبار ليقيس معرفة المتعلم باللغة العربية من خلال أربعة أقسام رئيسية: الاستماع، القراءة، المفردات، والقواعد، وذلك بهدف اختيار المستوى المناسب للمختبر عند التحاقه بالبرنامج المستهدف.",
    link: "/types-of-tests/hamza-placement-test",
    image: "/assets/image/placement-test.png",
  },
  {
    title_icon: "book-02",
    header: "اختبار همزة المفردات",
    description:
      "اختبار معياري لقياس مفردات العربية لدى غير الناطقين بها، يصنّف الكلمات إلى خمسة مستويات من الشيوع، من الأكثر إلى الأقل. طُوِّف وفق إجراءات علمية دقيقة بمراجعة خبراء واختبارات صدق لضمان التدرج في الصعوبة. وتكمن أهميته في تشخيص المستوى اللغوي للمتعلمين في جانب المفردات، بوصفها أساس النجاح اللغوي.",
    link: "/types-of-tests/hamza-vocabulary-test",
    image: "/assets/image/vocabulary-test.png",
  },
];

const staticAreYouReady: AreYouReadyData = {
  titleText: "هل أنت مستعد لاختبار همزة؟",
  descriptionText: "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان.",
  buttonText: "التحضير للاختبار",
};

export default async function DiscoverHamzaTestsPage() {
  const data = await getDiscoverHamzaTestsData();
  
  // Use dynamic data if available, otherwise fallback to static
  const tabsContent = data?.typeOfTests?.tabsContent?.length > 0 
    ? data.typeOfTests.tabsContent 
    : staticTabsContent;
  
  const areYouReady = data?.areYouReady 
    ? {
        titleText: data.areYouReady.titleText || staticAreYouReady.titleText,
        descriptionText: data.areYouReady.descriptionText || staticAreYouReady.descriptionText,
        buttonText: data.areYouReady.buttonText || staticAreYouReady.buttonText,
      }
    : staticAreYouReady;
  
  return (
    <section className="bg-[#F9FAFB] !py-[20px] lg:!py-[40px] cta-bg-logo">
      <div className="custom-container relative z-10">
        <DiscoverHamzaTestsContent 
          tabsContent={tabsContent} 
          areYouReady={areYouReady}
        />
      </div>
    </section>
  );
}