"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import styles from "./PageHero.module.css";
import DgaBreadcrumbs from "@/app/components/breadcrumbs/BreadCrumbs";

export type Crumb = { label: string; path?: string; disabled?: boolean };

export type HeroData = {
  title: string;
  description?: string;
  bgColor?: string;
  breadcrumbs?: Crumb[];
  externalLink?: { href: string; label: string; download?: boolean }; //download is optional here for downloading files
  date?: string;
};

type HeroMap = Record<string, HeroData>;

type BreadcrumbsMax =
  | number
  | ((pathname: string) => number)
  | { default: number; overrides?: Record<string, number> };

type PageHeroProps = {
  heroMap: HeroMap;
  defaultRoute: string;
  matchNested?: boolean;
  breadcrumbsMax?: BreadcrumbsMax;
  defaultBgColor?: string;
};

function normalizePathname(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/"))
    return pathname.slice(0, -1);
  return pathname;
}

function resolveHero(
  heroMap: HeroMap,
  pathnameRaw: string,
  defaultRoute: string,
  matchNested: boolean,
) {
  const pathname = normalizePathname(pathnameRaw);

  // exact match
  if (heroMap[pathname]) return heroMap[pathname];

  // nested match (longest prefix)
  if (matchNested) {
    const match = Object.keys(heroMap)
      .sort((a, b) => b.length - a.length)
      .find((route) => pathname.startsWith(route + "/"));

    if (match) return heroMap[match];
  }

  // default
  if (heroMap[defaultRoute]) return heroMap[defaultRoute];

  // hard fallback
  return {
    title: "",
    description: "",
    bgColor: "#fff",
    breadcrumbs: [{ label: "الرئيسة", path: "/" }],
  } satisfies HeroData;
}

export default function PageHero({
  heroMap,
  defaultRoute,
  matchNested = true,
  breadcrumbsMax = 5,
  defaultBgColor = "#F7FDF9",
}: PageHeroProps) {
  const pathnameFromHook = usePathname() ?? "/";
  const pathname = normalizePathname(pathnameFromHook);

  const hero = useMemo(
    () => resolveHero(heroMap, pathname, defaultRoute, matchNested),
    [heroMap, pathname, defaultRoute, matchNested],
  );

  const max =
    typeof breadcrumbsMax === "function"
      ? breadcrumbsMax(pathname)
      : typeof breadcrumbsMax === "object"
        ? (breadcrumbsMax.overrides?.[pathname] ?? breadcrumbsMax.default)
        : breadcrumbsMax;

  return (
    <section
      className={styles.hero}
      style={{ background: hero.bgColor ?? defaultBgColor }}
    >
      <div className={styles.heroContent}>
        <div className={styles.inner}>
          <DgaBreadcrumbs items={hero.breadcrumbs ?? []} max={max} />
          <h1 className="display-sm-bold">{hero.title}</h1>

          {hero.description ? (
            <p className="text-md-regular">{hero.description}</p>
          ) : null}

          {hero.externalLink ? (
            <div className={styles.actions}>
              <button
                type="button"
                className="dga-btn dga-btn--lg dga-btn--primary-brand"
            
                onClick={async () => {
                  const link = hero.externalLink;

                  if (!link) return;

                  if (link.download) {
                    try {
                      const response = await fetch(link.href);

                      if (!response.ok) {
                        throw new Error("Failed to download file");
                      }

                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);

                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "research-service.pdf";

                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);

                      window.URL.revokeObjectURL(url);
                      return;
                    } catch (error) {
                      console.error(error);

                      // fallback if download fails
                      window.open(link.href, "_blank", "noopener,noreferrer");
                      return;
                    }
                  }

                  window.open(link.href, "_blank", "noopener,noreferrer");
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

          {hero.date ? (
            <div className="!flex !justify-start !items-center !gap-[3px]">
              <img
                src="/assets/icons/stroke-standard/calendar-03-stroke-rounded.svg"
                width={20}
                height={20}
                alt="calendar-icon"
                className="gray-icon"
              />
              <p className="text-sm-medium !text-[#4d5761] !font-normal">
                {hero.date}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
