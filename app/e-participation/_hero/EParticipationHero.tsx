"use client";

import { usePathname } from "next/navigation";
import styles from "./EParticipationHero.module.css";
import { heroMap } from "./heroMap";
import DgaBreadcrumbs from "@/app/components/breadcrumbs/BreadCrumbs";

export default function EParticipationHero() {
  const pathname = usePathname();

  const hero =
    heroMap[pathname] ??
    Object.entries(heroMap).find(([route]) =>
      pathname.startsWith(route + "/"),
    )?.[1] ??
    heroMap["/e-participation"];

  const data = heroMap[pathname] ??
    heroMap["/e-participation"] ?? {
      title: "",
      description: "",
      bgColor: "#fff",
      breadcrumbs: [{ label: "الرئيسية", path: "/" }],
    };
  return (
    <section
      className={styles.hero}
      style={{ background: hero.bgColor ?? "#F7FDF9" }}
    >
      <div className="content">
        <div className={styles.inner}>
          {pathname === "/e-participation" ? (
            <DgaBreadcrumbs items={data.breadcrumbs ?? []} max={3} />
          ) : (
            <DgaBreadcrumbs items={data.breadcrumbs ?? []} max={4} />
          )}

          <h1 className={styles.title}>{hero.title}</h1>
          {hero.description && (
            <p className={styles.desc}>{hero.description}</p>
          )}
        </div>
      </div>
    </section>
    // <>
    // </>
  );
}
