"use client";

import Image from "next/image";
import ScrollReveal from "../../../components/scroll-reveal/ScrollReveal";
import { TEST_INFO, type InfoCard } from "./data";

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

export default function VocabularyTestContent() {
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
              اختبار همزة المفردات
            </p>

            <h1 id="test-sections-title" className="display-sm-bold">
              أقسام الاختبار
            </h1>

            <p className="text-md-regular max-w-[900px]">
              يقيس هذا الاختبار مستويات المفردات اللغوية لدى المتعلمين، ويُعد
              امتدادًا مطوّرًا للاختبار الأصلي الخاص بمستويات المفردات. ويعتمد
              على منهجية الاختبار من متعدد، مما يتيح قياسًا دقيقًا ومنهجيًا
              لقدرة المتعلمين على فهم المفردات واستخدامها عبر مستويات مختلفة،
              ويسهم في تشخيص كفاءتهم اللغوية بشكل موضوعي وموثوق.
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
        {TEST_INFO.map((card, i) => (
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
