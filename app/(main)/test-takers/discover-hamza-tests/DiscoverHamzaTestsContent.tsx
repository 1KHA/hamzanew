"use client";
import { useState, useEffect } from "react";
import { DgaTabs } from "@/app/components/tabs/DgaTabs";
import Button from "@/app/components/button/Button";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import "@/app/components/card/card.css";
import { useRouter } from "next/navigation";


/**
 * Check if image URL is from localhost/private IP
 * If so, we need to use unoptimized to bypass Next.js SSRF protection
 */
function isLocalImage(url: string): boolean {
  if (!url) return false;
  return url.includes("localhost") || url.includes("127.0.0.1");
}

interface TabContentProp {
  title_icon: string;
  header: string;
  description: string;
  link: string;
  image: string;
}

interface AreYouReadyProps {
  titleText?: string;
  descriptionText?: string;
  buttonText?: string;
}

interface DiscoverHamzaTestsContentProps {
  tabsContent: TabContentProp[];
  areYouReady?: AreYouReadyProps;
  sectionTitle?: string;
  translations?: Record<string, string> | null;
}

/* Translation helper: prefers Liferay value, falls back to literal string */
function tx(key: string, translations: Record<string, string> | null | undefined, fallback: string): string {
  const val = translations?.[key];
  return val && val.trim() !== "" ? val : fallback;
}

/**
 * A reusable card component that displays the content for an active tab.
 * Includes a text section with a title, header, description, and link button on the Right (RTL),
 * and a promotional image on the left (RTL).
 *
 * @param {TabContentProp} props.tabContent - The data object containing the content to display.
 */
function TabContentCard({
  tabContent,
  sectionTitle,
  translations,
}: {
  tabContent: TabContentProp;
  sectionTitle?: string;
  translations?: Record<string, string> | null;
}) {
  return (
    <div className="!grid !grid-cols-1 lg:!grid-cols-3 !gap-[70px]">
      {/* Right side */}
      <div className="!flex !flex-col !gap-[32px] lg:!col-span-1">
        <div className="!flex !flex-col !gap-[14px]">
          {/* Tagline / Category Title */}
          <p
            className="!text-[#1B8354] !text-[18px] !flex !gap-[8px] !items-center !font-semibold"
            aria-hidden="true"
          >
            <span className="circular-green-outline" aria-hidden="true">
              <img
                alt={`${tabContent.title_icon} icon`}
                width={16}
                height={16}
                loading="eager"
                className="inline-block green-icon"
                src={`/assets/icons/stroke-standard/${tabContent.title_icon}-stroke-rounded.svg`}
              />
            </span>
            {sectionTitle || tx("hamza-test-types-title", translations, "انواع اختبارات همزة")}
          </p>

          {/* Main Card Heading */}
          <h3 className="display-sm-bold !text-[#161616]">
            {tabContent.header}
          </h3>

          {/* Card Description */}
          <p className="text-md-regular !text-[#000000]">
            {tabContent.description}
          </p>
        </div>

      </div>

      {/* Left Side Image */}
<figure className="card lg:!col-span-2">
        <div className="card-img-container">
          <Image
            src={tabContent.image}
            alt={`${tx("hamza-discover-test-image-alt", translations, "صورة توضيحية لـ")} ${tabContent.header}`}
            width={700}
            height={400}
            className="card-img !h-full"
            unoptimized={isLocalImage(tabContent.image)}
          />
        </div>
      </figure>
    </div>
  );
}

/**
 * Main logical wrapper for the Discover Hamza Tests tabbed section.
 * Manages the state of the active tab and provides the main container structure.
 *
 * @param {TabContentProp[]} props.tabsContent - The array of content data to feed into the tabs.
 */

export default function DiscoverHamzaTestsContent({
  tabsContent,
  areYouReady,
  sectionTitle,
  translations,
}: DiscoverHamzaTestsContentProps) {

  const [activeTab, setActiveTab] = useState<number>(1);
  const router = useRouter();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const firstTab = document.querySelector(
        ".dga-tabs-list__item:first-child",
      );
      if (firstTab) {
        firstTab.classList.add("dga-tabs-list__item--active");
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
    const allTabs = document.querySelectorAll(".dga-tabs-list__item");
    allTabs.forEach((tab) =>
      tab.classList.remove("dga-tabs-list__item--active"),
    );
    const activeTabElement = allTabs[tabId - 1];
    if (activeTabElement) {
      activeTabElement.classList.add("dga-tabs-list__item--active");
    }
  };

  return (
    <>
      <section aria-labelledby="discover-tests-title">
        {/* Visually Hidden Title for Screen Readers */}
        <h2 id="discover-tests-title" className="sr-only">
          {sectionTitle || tx("hamza-test-types-title", translations, "اختبارات همزة الأكاديمية والمفردات")}
        </h2>

        {/* Tab Navigation Menu */}
        <DgaTabs
          className="!mb-[32px] max-md:!overflow-auto"
          orientation="horizontal"
          divider
          size="lg"
          tabsList={[
            {
              label: tabsContent[0]?.header || tx("hamza-academic-test", translations, "اختبار همزة الأكاديمي"),
              tabIcon: "mortarboard-02",
              onClick: () => handleTabChange(1),
            },
            {
              label: tabsContent[1]?.header || tx("hamza-general-test", translations, "اختبار همزة العام"),
              tabIcon: "glasses",
              onClick: () => handleTabChange(2),
            },
            {
              label: tabsContent[2]?.header || tx("hamza-placement-test", translations, "اختبار همزة لتحديد المستوى"),
              tabIcon: "star",
              onClick: () => handleTabChange(3),
            },
            {
              label: tabsContent[3]?.header || tx("hamza-vocabulary-test", translations, "اختبار همزة المفردات"),
              tabIcon: "book-02",
              onClick: () => handleTabChange(4),
            },
          ]}
        />

        {/* Active Tab Content Region */}
        <div
          className="!mb-[60px] head"
          role="region"
          aria-live="polite"
          aria-atomic="true"
          id={`tab-content-${activeTab}`}
        >
          <div className="!space-y-[16px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabContentCard
                  tabContent={tabsContent[activeTab - 1]}
                  sectionTitle={sectionTitle}
                  translations={translations}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 2: Call to Action - Test Preparation
          ==================================================================== */}
      <section
        className="gap-[32px] !pt-[40px] !mt-[32px]"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col gap-[24px] bg-[#074D31] rounded-[16px] md:rounded-[24px] px-[24px] md:px-[80px] custom-container section-spacing-5xl cta-bg-pattern">
          {/* CTA Content */}
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <div className="flex flex-col gap-4">
              <h2 id="cta-title" className="display-sm-bold !text-white">
                {areYouReady?.titleText || tx("hamza-are-you-ready-title", translations, "هل أنت مستعد لاختبار همزة؟")}
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                {areYouReady?.descriptionText || tx("hamza-are-you-ready-description", translations, "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان.")}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            <Button
              label={areYouReady?.buttonText || tx("hamza-prepare-for-test", translations, "التحضير للاختبار")}
              variant="primary-neutral--on-color"
              size="lg"
              icon="arrow-up-right-01"
              className="w-full md:w-auto"
              onClick={() => {
                router.push("/test-takers/hamza-meran-course");
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
