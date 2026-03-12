import { Metadata } from "next";
import PageHero from "@/app/components/page-hero/PageHero";
import HamzaOrgContent from "./HamzaOrgContent";

/**
 * Metadata for the Hamza Organization page.
 */
export const metadata: Metadata = {
  title: "المنظمات",
  description:""
};

const TYPES_OF_ORG = [
    {
        id:1,
        title:"المؤسسات الأكاديمية",
        icon:"course"
    },
    {
        id:2,
        title:"الجهات الحكومية",
        icon:"building-06"
    },
    {
        id:3,
        title:"أصحاب العمل",
        icon:"briefcase-06"
    },
    {
        id:4,
        title:"المعلمون",
        icon:"glasses"
    }
]

const WHY_HAMZA_TEST=[
    {
        id:1,
        no:"1",
        description:"معياري: مستند إلى الإطار الأوروبي المرجعي للغات (CEFR) لضمان دقة وموثوقية التقييم."
    },
    {
        id:2,
        no:"2",
        description:"توحيد المعايير: يوفّر إطارًا موحّدًا ومعتمدًا لقياس كفاءة اللغة العربية."
    },
    {
        id:3,
        no:"3",
        description:"مرونة التطبيق: متاح حضوريًا ومحوسبًا عن بُعد ليلائم مختلف الاحتياجات."
    },
]

const SANDERD_ORG = [
    {
        id:1,
        title:"التعليم",
        description:"توفّر اختبارات همزة قيمة مضافة للمؤسسات التعليمية من خلال تمكينها من قياس مستوى الطلاب المتقدمين بدقة وموضوعية، مما يساعد على تحسين قرارات القبول وتوجيه البرامج الأكاديمية بما يتناسب مع احتياجاتهم اللغوية.",
        icon:"pencil"
    },
    {
        id:2,
        title:"الهجرة",
        description:"تقبل جهات الهجرة التي تتطلب إثبات كفاءة في اللغة العربية اختبار همزة كمرجع رسمي لتقييم المتقدمين.",
        icon:"airplane-02"
    },
    {
        id:3,
        title:"أصحاب العمل",
        description:"يعتمد أرباب العمل على اختبار همزة للمساعدة في اختيار الكفاءات القادرة على التواصل والإنجاز في بيئات ناطقة بالعربية.",
        icon:"briefcase-06"
    },
    {
        id:4,
        title:"الهيئات المهنية",
        description:"تقبل الجمعيات والجهات العليا المعنية بالترخيص والتأهيل المهني اختبار همزة كإثبات لإتقان اللغة العربية.",
        icon:"building-03"
    },
]

const HERO_CONFIG = {
  title: "المنظمات",
  description: "اختبارات همزة هي اختبارات لغوية معيارية مُعدة من مجمع الملك سلمان العالمي للغة العربية لقياس كفايات اللغة العربية للناطقين بغيرها ومستندة إلى الإطار الأوروبي المرجعي المشترك للغات (Common European Framework of Reference for Languages - CEFR).",
  bgColor: "#FFF",
};
export default function page() {
  return( <>
     <PageHero
        heroMap={{ "/hamza-org": HERO_CONFIG }}
        defaultRoute="/hamza-org"
        breadcrumbsMax={2}
      />

      <section>
        <HamzaOrgContent
        TYPES_OF_ORG={TYPES_OF_ORG}
        WHY_HAMZA_TEST={WHY_HAMZA_TEST}
        SANDERD_ORG={SANDERD_ORG}
        />
      </section>

  
  </>);
}
