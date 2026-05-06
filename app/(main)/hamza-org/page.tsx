import { Metadata } from "next";
import PageHero from "@/app/components/page-hero/PageHero";
import HamzaOrgContent from "./HamzaOrgContent";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { getTranslations } from "@/app/_lib/getTranslations";
import { cookies } from "next/headers";

/**
 * Metadata for the Hamza Organization page.
 */
export const metadata: Metadata = {
  title: "المنظمات",
  description: "",
};

export const dynamic = "force-dynamic";

// Static fallback data
const staticTypesOfOrg = [
  { id: 1, title: "المؤسسات الأكاديمية", icon: "course" },
  { id: 2, title: "الجهات الحكومية", icon: "building-06" },
  { id: 3, title: "أصحاب العمل", icon: "briefcase-06" },
  { id: 4, title: "المعلمون", icon: "glasses" },
];

const staticWhyHamzaTest = [
  {
    id: 1,
    no: "1",
    description:
      "معياري: مستند إلى الإطار الأوروبي المرجعي للغات (CEFR) لضمان دقة وموثوقية التقييم.",
  },
  {
    id: 2,
    no: "2",
    description:
      "توحيد المعايير: يوفّر إطارًا موحّدًا ومعتمدًا لقياس كفاءة اللغة العربية.",
  },
  {
    id: 3,
    no: "3",
    description:
      "مرونة التطبيق: متاح حضوريًا ومحوسبًا عن بُعد ليلائم مختلف الاحتياجات.",
  },
];

const staticSanderdOrg = [
  {
    id: 1,
    title: "التعليم",
    description:
      "توفّر اختبارات همزة قيمة مضافة للمؤسسات التعليمية من خلال تمكينها من قياس مستوى الطلاب المتقدمين بدقة وموضوعية، مما يساعد على تحسين قرارات القبول وتوجيه البرامج الأكاديمية بما يتناسب مع احتياجاتهم اللغوية.",
    icon: "pencil",
  },
  {
    id: 2,
    title: "الهجرة",
    description:
      "تقبل جهات الهجرة التي تتطلب إثبات كفاءة في اللغة العربية اختبار همزة كمرجع رسمي لتقييم المتقدمين.",
    icon: "airplane-02",
  },
  {
    id: 3,
    title: "أصحاب العمل",
    description:
      "يعتمد أرباب العمل على اختبار همزة للمساعدة في اختيار الكفاءات القادرة على التواصل والإنجاز في بيئات ناطقة بالعربية.",
    icon: "briefcase-06",
  },
  {
    id: 4,
    title: "الهيئات المهنية",
    description:
      "تقبل الجمعيات والجهات العليا المعنية بالترخيص والتأهيل المهني اختبار همزة كإثبات لإتقان اللغة العربية.",
    icon: "building-03",
  },
];

const staticHeroConfig = {
  title: "المنظمات",
  description:
    "اختبارات همزة هي اختبارات لغوية معيارية مُعدة من مجمع الملك سلمان العالمي للغة العربية لقياس كفايات اللغة العربية للناطقين بغيرها ومستندة إلى الإطار الأوروبي المرجعي المشترك للغات (Common European Framework of Reference for Languages - CEFR).",
  bgColor: "#FFF",
};

export default async function HamzaOrgPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";

  // Fetch translations and all Liferay content in parallel
  const [
    translations,
    orgHeaderContent,
    academicInstitutionsContent,
    whyHamzaTestContent,
    hamzaTestVerficationContent,
    hamzaForOrganizationsContent,
  ] = await Promise.all([
    getTranslations().catch((err) => {
      console.error("[HamzaOrg] Failed to fetch translations:", err);
      return null;
    }),
    fetchContentWithKey("ORGANIZATION_ORGANIZATION_HEADER_CONTENT_KEY").catch((err) => {
      console.error("[HamzaOrg] Failed to fetch org header:", err);
      return null;
    }),
    fetchContentWithKey("ORGANIZATION_HAMZA_FOR_INSTITUTIONS_CONTENT_KEY").catch((err) => {
      console.error("[HamzaOrg] Failed to fetch academic institutions:", err);
      return null;
    }),
    fetchContentWithKey("ORGANIZATION_WHY_HAMZA_MATTERS_FOR_INSTITUTIONS_CONTENT_KEY").catch((err) => {
      console.error("[HamzaOrg] Failed to fetch why hamza:", err);
      return null;
    }),
    fetchContentWithKey(
      "ORGANIZATION_ENTITIES_VERIFICATION_OF_CERTIFICATE_AUTHENTICITY_CONTENT_KEY"
    ).catch((err) => {
      console.error("[HamzaOrg] Failed to fetch verification:", err);
      return null;
    }),
    fetchContentWithKey(
      "ORGANIZATION_ENTITIES_HAMZA_FOR_ORGANIZATIONS_HAMZA_FOR_ORGANIZATIONS_CONTENT_KEY"
    ).catch((err) => {
      console.error("[HamzaOrg] Failed to fetch hamza for orgs:", err);
      return null;
    }),
  ]);

  /* ── Section 1: Organization Header (hero title + description only) ── */
  const orgHeaderFields = extractFields(orgHeaderContent?.contentFields, [
    "titleText",
    "descriptionText",
  ]) as { titleText?: string; descriptionText?: string };

  const heroTitle = orgHeaderFields?.titleText || staticHeroConfig.title;
  const heroDescription =
    orgHeaderFields?.descriptionText || staticHeroConfig.description;

  /* ── Section 2: Academic Institutions Tile Cards ── */
  const academicInstitutionsList = extractList(
    academicInstitutionsContent?.contentFields,
    "Fieldset",
    { titleText: "titleText", image: "image" }
  );

  const typesOfOrg = academicInstitutionsList?.length
    ? academicInstitutionsList.map((item: any, index: number) => ({
        id: index + 1,
        title: item.titleText || "",
        image: item.image || "",
        icon: staticTypesOfOrg[index]?.icon || "course",
      }))
    : staticTypesOfOrg;

  /* ── Section 2: Why Hamza Test ── */
  const whyHamzaFields = extractFields(whyHamzaTestContent?.contentFields, [
    "titleText",
    "descriptionText",
  ]) as { titleText?: string; descriptionText?: string };

  const whyHamzaList = extractList(
    whyHamzaTestContent?.contentFields,
    "whyHamzaTestFieldset",
    { pointNumberText: "pointNumberText", pointDescriptionText: "pointDescriptionText" }
  );

  const whyHamzaTest = whyHamzaList?.length
    ? whyHamzaList.map((item: any, index: number) => ({
        id: index + 1,
        no: item.pointNumberText || `${index + 1}`,
        description: item.pointDescriptionText || "",
      }))
    : staticWhyHamzaTest;

  const whyHamzaTitle = whyHamzaFields?.titleText || whyHamzaTestContent?.title || "لماذا اختبار همزة؟";

  /* ── Section 3: Certificate Verification ── */
  const verificationFields = extractFields(
    hamzaTestVerficationContent?.contentFields,
    ["descriptionText", "buttonText", "additionalText", "placeholderText"]
  ) as {
    descriptionText?: string;
    buttonText?: string;
    additionalText?: string;
    placeholderText?: string;
  };

  const verificationData = {
    title: hamzaTestVerficationContent?.title || "التحقق من موثوقية الشهادات",
    description:
      verificationFields?.descriptionText ||
      "يمكن للجهات المعتمدة أو أي طرف التحقق من صحة الشهادات، للتأكد من اعتمادها وموثوقيتها.",
    buttonText: verificationFields?.buttonText || "تحقق",
    labelText: verificationFields?.additionalText || "رقم الشهادة",
    placeholder: verificationFields?.placeholderText || "أدخل رقم الشهادة",
  };

  /* ── Section 4: Hamza for Organizations ── */
  const hamzaForOrgsFields = extractFields(
    hamzaForOrganizationsContent?.contentFields,
    ["descriptionText", "image"]
  ) as { descriptionText?: string; image?: string };

  const hamzaForOrgsList = extractList(
    hamzaForOrganizationsContent?.contentFields,
    "ListFieldset",
    { categoryName: "categoryName", categoryDescription: "categoryDescription" }
  );

  const sanderdOrg = hamzaForOrgsList?.length
    ? hamzaForOrgsList.map((item: any, index: number) => ({
        id: index + 1,
        title: item.categoryName || "",
        description: item.categoryDescription || "",
        icon: staticSanderdOrg[index]?.icon || "pencil",
      }))
    : staticSanderdOrg;

  const standardOrgTitle = hamzaForOrganizationsContent?.title || "المنظمات";
  const standardOrgDescription =
    hamzaForOrgsFields?.descriptionText ||
    "بفضل معياريته واعتماده على الإطار الأوروبي المرجعي المشترك للغات (CEFR)، يوفّر اختبار همزة للمؤسسات حول العالم أداة دقيقة وموثوقة لاختيار المرشحين الأكفأ في عدة مجالات تعليمية ومهنية وغيرها.";

  return (
    <>
      <PageHero
        heroMap={{
          "/hamza-org": {
            title: heroTitle,
            description: heroDescription,
            bgColor: "#FFF",
          },
        }}
        defaultRoute="/hamza-org"
        breadcrumbsMax={2}
        translations={translations || undefined}
      />

      <section>
        <HamzaOrgContent
          typesOfOrg={typesOfOrg}
          whyHamzaTest={whyHamzaTest}
          sanderdOrg={sanderdOrg}
          verificationData={verificationData}
          whyHamzaTitle={whyHamzaTitle}
          standardOrgTitle={standardOrgTitle}
          standardOrgDescription={standardOrgDescription}
          translations={translations}
          locale={locale}
        />
      </section>
    </>
  );
}
