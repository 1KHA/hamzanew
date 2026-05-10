
import Image from "next/image";
import ScrollReveal from "../../../components/scroll-reveal/ScrollReveal";
import { TEST_INFO, type InfoCard } from "./data";

/* ==========================================================================
   Type Definitions
   ========================================================================== */

interface TestSectionItem {
  testTitleText: string;
  testDetailsText: string;
}

interface TestSectionsData {
  title?: string;
  descriptionText?: string;
  testSectionsList?: TestSectionItem[];
}

interface HeaderData {
  titleText?: string;
  descriptionText?: string;
  buttonText?: string;
}

interface VocabularyTestContentProps {
  header?: HeaderData;
  testSections?: TestSectionsData;
}

/* ==========================================================================
   Sub Components
   ========================================================================== */

const STAGGER  = 0.22;
const DURATION = 0.9;
const AMOUNT   = 0.4;

function TestInfoCard({ icon, title, description }: InfoCard) {
  return (
    <article className="card !border-none">
      <div className="flex flex-row gap-[24px] items-start">
        <span className="square-green" aria-hidden="true">
          <Image
            src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
            alt=""
            width={28}
            height={28}
            unoptimized
            className="inline-block white-icon"
          />
        </span>
        <div className="card-content flex-1 flex flex-col items-start text-start">
          <h3 className="text-lg-semibold">{title}</h3>
          <p className="text-md-regular">{description}</p>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================================
   Main Export
   ========================================================================== */

export default function VocabularyTestContent({ header, testSections }: VocabularyTestContentProps) {
  // Use dynamic data if available, otherwise fallback to static data
  const headerTitle = header?.titleText || "اختبار همزة المفردات";
  const sectionTitle = testSections?.title || "أقسام الاختبار";
  const sectionDescription = testSections?.descriptionText || "يقيس هذا الاختبار مستويات المفردات اللغوية لدى المتعلمين، ويُعد امتدادًا مطوّرًا للاختبار الأصلي الخاص بمستويات المفردات. ويعتمد على منهجية الاختبار من متعدد، مما يتيح قياسًا دقيقًا ومنهجيًا لقدرة المتعلمين على فهم المفردات واستخدامها عبر مستويات مختلفة، ويسهم في تشخيص كفاءتهم اللغوية بشكل موضوعي وموثوق.";

  // Transform API data to component format if available
  const dynamicTestInfo: InfoCard[] = testSections?.testSectionsList?.map((item, index) => ({
    icon: getIconForIndex(index),
    title: item.testTitleText,
    description: item.testDetailsText,
  })) || [];

  // Use dynamic test info if available, otherwise fallback to static
  const testInfo = dynamicTestInfo.length > 0 ? dynamicTestInfo : TEST_INFO;

  return (
    <>
      {/* Header */}
      <ScrollReveal direction="up" delay={0} duration={DURATION} amount={AMOUNT}>
        <header>
          <div className="flex flex-col gap-[14px]">
            <p className="!text-[#1B8354] !text-[18px] flex gap-[8px] items-center !font-semibold">
              <span className="circular-green-outline" aria-hidden="true">
                <Image
                  src="/assets/icons/stroke-standard/book-02-stroke-rounded.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  priority
                  className="inline-block green-icon"
                />
              </span>
              {headerTitle}
            </p>

            <h1 id="test-sections-title" className="display-sm-bold">
              {sectionTitle}
            </h1>

            <p className="text-md-regular max-w-[900px]">
              {sectionDescription}
            </p>
          </div>
        </header>
      </ScrollReveal>

      {/* Info Cards — staggered one by one */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-[24px]"
        role="list"
        aria-label="معلومات اختبار همزة المفردات"
      >
        {testInfo.map((card, i) => (
          <ScrollReveal
            key={i}
            role="listitem"
            direction="up"
            delay={(i + 1) * STAGGER}
            duration={DURATION}
            amount={AMOUNT}
          >
            <TestInfoCard {...card} />
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}

/* ==========================================================================
   Helper Functions
   ========================================================================== */

/**
 * Maps index to icon name for dynamic test info
 */
function getIconForIndex(index: number): string {
  const iconMap: Record<number, string> = {
    0: "chart-column",
    1: "right-to-left-list-bullet",
    2: "time-02",
    3: "book-open-01",
    4: "message-01",
    // Add more mappings as needed
  };
  
  return iconMap[index] || "chart-column"; // Default to chart icon
}