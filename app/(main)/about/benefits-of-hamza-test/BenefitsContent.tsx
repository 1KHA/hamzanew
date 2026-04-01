"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";

const STAGGER  = 0.1;
const DURATION = 0.8;
const r = (i: number) => i * STAGGER;

interface Benefit {
  number: number;
  title: string;
  description: string;
}

interface OrgBenefit {
  number: string;
  content: string;
  icon: string;
}

const INITIAL_BENEFITS: Benefit[] = [
  {
    number: 1,
    title: "تمكين",
    description: "مجمع الملك سلمان العالمي للغة العربية من الريادة والمرجعية العالمية في خدمة اللغة العربية.",
  },
  {
    number: 2,
    title: "فتح أبواب الفرص",
    description: "يعزز فرصك الأكاديمية والمهنية في الجامعات وسوق العمل.",
  },
  {
    number: 3,
    title: "تطوير لغتك",
    description: "يساعدك الاختبار على معرفة مستواك بدقة، مما يمكّنك من وضع خطة واضحة لتحسين مهاراتك اللغوية",
  },
];

const INITIAL_ORG_BENEFITS: OrgBenefit[] = [
  { number: "01", content: "قياس الكفاءة اللغوية لدى متعلمي اللغة العربية من غير الناطقين بها", icon: "../assets/image/image 11.png" },
  { number: "02", content: "المفاضلة بين المتقدمين للبرامج الأكاديمية.", icon: "../assets/image/image 7.png" },
  { number: "03", content: "التنافس على المنح الدراسية.", icon: "../assets/image/image 8.png" },
  { number: "04", content: "قياس نواتج التعلم في المقررات الدراسية وتطوير مخرجات التعليم", icon: "../assets/image/image 10.png" },
  { number: "05", content: "الإعفاء من بعض المقررات الجامعية.", icon: "../assets/image/image 9.png" },
];

/* ── Sub-components ──────────────────────────────────────────────── */

function BenefitCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <li
      className="about-value-card"
      aria-label={`الفائدة ${number}: ${title} - ${description}`}
      style={{ borderRadius: "var(--radius-lg, 16px)", background: "#F9FAFB", listStyle: "none" }}
    >
      <div className="about-value-card__header">
        <span className="about-value-card__badge text-xl-bold" aria-hidden="true">{number}</span>
        <div className="about-value-card__content">
          <h3 className="about-value-card__title">{title}</h3>
          <p className="about-value-card__desc">{description}</p>
        </div>
      </div>
    </li>
  );
}

function OrgCard({ number, content, icon }: { number: string; content: string; icon: string }) {
  return (
    <article aria-label={`الفائدة ${number}: ${content}`}>
      <div className="sticky-card" style={{ position: "static", width: "100%", height: "auto" }} role="presentation">
        <p className="card-bg-id text-xl-bold lg:!hidden !me-auto" aria-hidden="true">{number}</p>
        <div className="card-inner">
          <div className="icon-wrapper" role="presentation">
            <img src={icon} alt="" aria-hidden="true" className="icon-img" />
          </div>
          <div className="card-content">
            <p className="card-bg-id text-xl-bold !hidden lg:!inline-flex" aria-hidden="true">{number}</p>
            <p className="text-lg-bold" lang="ar">{content}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */

export default function BenefitsContent() {
  const [title, setTitle] = useState("فوائد اختبارات همزة للمختبرين");
  const [description, setDescription] = useState(
    "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك."
  );
  const [benefits, setBenefits] = useState<Benefit[]>(INITIAL_BENEFITS);
  const [orgBenefits, setOrgBenefits] = useState<OrgBenefit[]>(INITIAL_ORG_BENEFITS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch main benefits data
        const mainResponse = await fetch("/api/benefits/main");
        const mainData = await mainResponse.json();

        if (mainData.title) {
          setTitle(mainData.title);
        }

        if (mainData.description) {
          setDescription(mainData.description);
        }

        if (mainData.benefits && mainData.benefits.length > 0) {
          setBenefits(mainData.benefits);
        }

        // Fetch how-to-benefit data
        const howToResponse = await fetch("/api/benefits/how-to");
        const howToData = await howToResponse.json();

        if (howToData.benefits && howToData.benefits.length > 0) {
          setOrgBenefits(howToData.benefits);
        }
      } catch (error) {
        console.error("Failed to fetch benefits data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      className="custom-container stack"
      style={{ display: "flex", padding: "clamp(20px, 5vw, 70px)", gap: "clamp(16px, 5vw, 70px)", borderRadius: 16, background: "#FFF" }}
    >
      {/* Section 1: Benefits for test takers */}
      <section className="flex-start-gap-80" aria-labelledby="takers-heading">
        <div className="stack-xl">
          <ScrollReveal direction="up" duration={DURATION} delay={r(0)} immediate>
            <header className="section-head">
              <p className="section-title">كيفية الإستفادة من همزة</p>
              <h2 id="takers-heading" className="display-sm-bold">{title}</h2>
            </header>
          </ScrollReveal>
          <ScrollReveal direction="up" duration={DURATION} delay={r(1)} immediate>
            <p className="description">
              {description}
            </p>
          </ScrollReveal>
        </div>

        <ul className="stack-lg" role="list" aria-label="قائمة فوائد الاختبار للمختبرين">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            benefits.map((b, i) => (
              <ScrollReveal key={b.number} role="listitem" direction="left" delay={r(i)} duration={DURATION} amount={0} margin="0px 0px -60px 0px">
                <BenefitCard {...b} />
              </ScrollReveal>
            ))
          )}
        </ul>
      </section>

      {/* Section 2: Benefits for organizations */}
      <section aria-labelledby="org-heading" className="org-benefits-section">
        <ScrollReveal direction="up" duration={DURATION} amount={0} margin="0px 0px -80px 0px">
          <header className="section-head">
            <p className="section-title">كيفية الاستفادة من همزة</p>
            <h2 id="org-heading" className="display-sm-bold">فوائد اختبارات همزة للجهات</h2>
          </header>
        </ScrollReveal>

        <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-[24px]">
          {orgBenefits.map((slide, i) => (
            <ScrollReveal key={slide.number} direction="up" delay={r(i)} duration={DURATION} amount={0} margin="0px 0px -60px 0px">
              <OrgCard {...slide} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}