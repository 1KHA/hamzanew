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

const tabsContent: TabContent[] = [
  {
    title_icon: "mortarboard-02",
    header: "اختبار همزة الأكاديمي",
    description:
      "يعد متطلبا لدراسة في الجامعات أو المعاهد العليا، حيث يركّز على تقييم المهارات اللغة العربية الأكاديمية .",
    link: "/test-takers/hamza-academic-test",
    image: "/assets/image/academic-test.png",
  },
  {
    title_icon: "glasses",
    header: "اختبار همزة العام",
    description:
      "يُعد اختبار همزة العام أداة موثوقة لقياس كفاءة اللغة العربية للناطقين بغيرها للأغراض العامة.",
    link: "/test-takers/hamza-general-test",
    image: "/assets/image/photo2.jpg",
  },
  {
    title_icon: "star",
    header: "اختبار همزة لتحديد المستوى",
    description:
      "ضمم الاختبار ليقيس معرفة المتعلم باللغة العربية من خلال أربعة أقسام رئيسية: الاستماع، القراءة، المفردات، والقواعد، وذلك بهدف اختيار المستوى المناسب للمختبر عند التحاقه بالبرنامج المستهدف.",
    link: "/test-takers/hamza-placement-test",
    image: "/assets/image/hero.png",
  },
  {
    title_icon: "book-02",
    header: "اختبار همزة المفردات",
    description:
      "اختبار معياري لقياس مفردات العربية لدى غير الناطقين بها، يصنّف الكلمات إلى خمسة مستويات من الشيوع، من الأكثر إلى الأقل. طُوَّر وفق إجراءات علمية دقيقة بمراجعة خبراء واختبارات صدق لضمان التدرج في الصعوبة. وتكمن أهميته في تشخيص المستوى اللغوي للمتعلمين في جانب المفردات، بوصفها أساس النجاح اللغوي.",
    link: "/test-takers/hamza-vocabulary-test",
    image: "/assets/image/academic-test.png",
  },
];

export default function DiscoverHamzaTestsPage() {
  return (
    <section className="bg-[#F9FAFB] !py-[20px] lg:!py-[40px]">
      <div className="custom-container">
        <DiscoverHamzaTestsContent tabsContent={tabsContent} />
      </div>
    </section>
  );
}
