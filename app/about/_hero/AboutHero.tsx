"use client";

import { usePathname } from "next/navigation";
import styles from "./AboutHero.module.css";
import { heroMap } from "./heroMap";

export default function AboutHero() {
  const pathname = usePathname();

  const hero =
    heroMap[pathname] ??
    Object.entries(heroMap).find(([route]) =>
      pathname.startsWith(route + "/"),
    )?.[1] ??
    heroMap["/about"];

  return (
    <section
      className={styles.hero}
      dir="rtl"
      style={{ background: hero.bgColor ?? "#F7FDF9" }}
    >
      <div className={styles.inner}>
        <h1 className={styles.title}>{hero.title}</h1>
        {hero.description && <p className={styles.desc}>{hero.description}</p>}

        {hero.externalLink ? (
          <div className={styles.actions}>
            <button
              className="dga-btn dga-btn--lg dga-btn--primary-brand"
              onClick={() => {
                window.open(
                  hero.externalLink?.href,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              {hero.externalLink.label}
              <img
                className="dga-btn-icon"
                src="/assets/icons/stroke-standard/Trailing icon.png"
                alt=""
              />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
