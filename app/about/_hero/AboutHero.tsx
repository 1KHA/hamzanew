"use client";

import { usePathname } from "next/navigation";
import styles from "./AboutHero.module.css";
import { heroMap } from "./heroMap";

export default function AboutHero() {
  const pathname = usePathname();

  // const hero = heroMap[pathname] ?? heroMap["/about"];
    const hero =
    heroMap[pathname] ??
    Object.entries(heroMap).find(([route]) => pathname.startsWith(route + "/"))?.[1] ??
    heroMap["/about"];
    
console.log(hero);
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{hero.title}</h1>
        <p className={styles.desc}>{hero.description}</p>
      </div>
    </section>
  );
}

