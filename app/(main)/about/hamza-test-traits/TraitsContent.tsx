"use client";

import Card from "@/app/components/card/Card";
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
import { TRAITS } from "./data";

const STAGGER  = 0.1;
const DURATION = 0.8;

export default function TraitsContent() {
  return (
    <div
      className="block-padding-10xl bg-color-grey-50"
      style={{
        backgroundImage: "url(/assets/image/bg-image.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "1233.365px 0px",
      }}
    >
      <section className="stack-xl custom-container" aria-labelledby="traits-heading">
        <ScrollReveal direction="up" duration={DURATION} delay={0} amount={0} margin="0px 0px -60px 0px">
          <h2 id="traits-heading" className="display-sm-bold">السمات</h2>
        </ScrollReveal>

        <ul className="grid-cols-4-gap-24" role="list">
          {TRAITS.map((trait, i) => (
            <ScrollReveal key={trait.number} role="listitem" direction="up" delay={i * STAGGER} duration={DURATION} amount={0} margin="0px 0px -60px 0px">
              <Card
                style={{ alignSelf: "stretch", flex: "1 0 0", border: "none" }}
                number={trait.number}
                title={trait.title}
                description={trait.description}
              />
            </ScrollReveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
