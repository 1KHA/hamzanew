// import React, { useEffect, useRef, useState } from "react";
// import "./breadcrumbs.css";

// export interface BreadcrumbItem {
//   label: string;
//   path?: string;
//   disabled?: boolean;
// }

// type EllipsisItem = { ellipsis: true; items: BreadcrumbItem[] };

// export type DgaBreadcrumbsProps = {
//   items: BreadcrumbItem[];
//   max?: number;
//   onBreadcrumbClick?: (item: BreadcrumbItem, e?: React.MouseEvent) => void;
// };

// function isRTL(): boolean {
//   return (
//     typeof document !== "undefined" &&
//     (document.dir === "rtl" || document.documentElement.dir === "rtl")
//   );
// }

// export function DgaBreadcrumbs({
//   items = [],
//   max = 5,
//   onBreadcrumbClick,
// }: DgaBreadcrumbsProps) {
//   const rootRef = useRef<HTMLDivElement | null>(null);

//   const [breadcrumbItems, setBreadcrumbItems] = useState<
//     Array<BreadcrumbItem | EllipsisItem>
//   >([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   function renderItems(
//     itemsList: BreadcrumbItem[],
//     maxNum: number,
//   ): Array<BreadcrumbItem | EllipsisItem> {
//     if (!Array.isArray(itemsList)) return [];
//     if (itemsList.length <= maxNum) return itemsList.slice();

//     const effectiveMax = Math.max(3, maxNum);
//     const visibleCount = effectiveMax - 1; // reserve one spot for ellipsis
//     const firstHalf = Math.max(1, Math.floor(visibleCount / 2));
//     const secondHalf = Math.max(1, visibleCount - firstHalf);

//     const firstItems = itemsList.slice(0, firstHalf);
//     const lastItems = itemsList.slice(-secondHalf);
//     const middleItems = itemsList.slice(firstHalf, -secondHalf);

//     if (middleItems.length === 0) return [...firstItems, ...lastItems];

//     return [
//       ...firstItems,
//       { ellipsis: true, items: middleItems },
//       ...lastItems,
//     ];
//   }

//   useEffect(() => {
//     setBreadcrumbItems(renderItems(items, max));
//   }, [items, max]);

//   useEffect(() => {
//     function handleOutside(e: MouseEvent) {
//       if (!rootRef.current) return;
//       const target = e.target as Node;
//       if (target && !rootRef.current.contains(target)) setIsMenuOpen(false);
//     }

//     if (isMenuOpen) document.addEventListener("click", handleOutside);
//     return () => document.removeEventListener("click", handleOutside);
//   }, [isMenuOpen]);

//   function handleClick(e: React.MouseEvent, item: BreadcrumbItem) {
//     if (item.disabled) {
//       e.preventDefault();
//       return;
//     }

//     // let consumer override navigation by calling e.preventDefault()
//     onBreadcrumbClick?.(item, e);
//   }

//   const arrow = isRTL() ? (
//     <img
//       src="/assets/icons/stroke-standard/arrow-left-01-stroke-rounded.svg"
//       alt="arrow-left"
//       width={24}
//       height={24}
//       className="inline-block dga-breadcrumb-icon"
//     />
//   ) : (
//     <img
//       src="/assets/icons/stroke-standard/arrow-right-01-stroke-rounded.svg"
//       alt="arrow-right"
//       width={24}
//       height={24}
//       className="inline-block dga-breadcrumb-icon"
//     />
//   );

//   return (
//     <div ref={rootRef} className="dga-breadcrumb-root">
//       <nav aria-label="breadcrumb">
//         <ul
//           className={`dga-breadcrumb dga-breadcrumb--${isRTL() ? "rtl" : "ltr"}`}
//         >
//           {breadcrumbItems.map((item, idx) => {
//             // Ellipsis item
//             if ("ellipsis" in (item as any)) {
//               const ell = item as EllipsisItem;
//               return (
//                 <li key={`ell-${idx}`} className="dga-breadcrumb-item ellipsis">
//                   <span className="dga-breadcrumb-icon">{arrow}</span>

//                   <button
//                     type="button"
//                     aria-haspopup="true"
//                     aria-expanded={isMenuOpen}
//                     className="link link--md link--neutral ellipsis-button "
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setIsMenuOpen((s) => !s);
//                     }}
//                   >
//                     <img
//                       src="/assets/icons/stroke-standard/more-horizontal-stroke-rounded.svg"
//                       alt="more"
//                       width={16}
//                       height={16}
//                     />
//                   </button>

//                   {isMenuOpen && (
//                     <ul className="dga-breadcrumb-dropdown">
//                       {ell.items.map((it) => (
//                         <li
//                           key={it.label}
//                           className="dga-breadcrumb-dropdown-item"
//                         >
//                           <a
//                             href={it.disabled ? undefined : it.path}
//                             onClick={(e) => {
//                               setIsMenuOpen(false);
//                               handleClick(e, it);
//                             }}
//                             // className={it.disabled ? "disabled-link" : undefined}
//                             className={`link ${it.disabled ? "disabled-link" : ""}`}
//                             aria-disabled={it.disabled}
//                           >
//                             {/* <span className="link__label">{it.label}</span> */}
//                             {it.label}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </li>
//               );
//             }

//             // Normal breadcrumb item
//             const b = item as BreadcrumbItem;
//             const isLast = idx === breadcrumbItems.length - 1;
//             const isFirst = idx === 0;

//             const content = b.path ? (
//               // ✅ clickable even if last, as long as it has a path
//               <a
//                 href={b.disabled ? undefined : b.path}
//                 onClick={(e) => handleClick(e, b)}
//                 className={`link link--md link--neutral ${b.disabled ? "disabled-link" : ""} ${
//                   isLast ? "link_current" : ""
//                 }`}
//                 aria-disabled={b.disabled}
//                 aria-current={isLast ? "page" : undefined}
//               >
//                 {/* <span className="link__label"> */}
//                 {b.label}
//                 {/* </span> */}
//               </a>
//             ) : (
//               <a
//                 className={`link link--md link--neutral ${b.disabled ? "disabled-link" : ""} link_empty ${
//                   isLast ? "link_current" : ""
//                 }`}
//                 aria-disabled={b.disabled}
//                 aria-current={isLast ? "page" : undefined}
//               >
//                 {/* <span className="link__label"> */}
//                 {b.label}
//                 {/* </span> */}
//               </a>
//             );

//             return (
//               <li
//                 key={`item-${idx}`}
//                 className={`dga-breadcrumb-item ${isLast ? "active" : ""}`}
//               >
//                 {!isFirst && <span>{arrow}</span>}
//                 {content}
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     </div>
//   );
// }

// export default DgaBreadcrumbs;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ CHANGED: added Next.js router
import "./breadcrumbs.css";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  disabled?: boolean;
}

type EllipsisItem = { ellipsis: true; items: BreadcrumbItem[] };

export type DgaBreadcrumbsProps = {
  items: BreadcrumbItem[];
  max?: number;
  onBreadcrumbClick?: (item: BreadcrumbItem, e?: React.MouseEvent) => void;
};

function isRTL(): boolean {
  return (
    typeof document !== "undefined" &&
    (document.dir === "rtl" || document.documentElement.dir === "rtl")
  );
}

export function DgaBreadcrumbs({
  items = [],
  max = 5,
  onBreadcrumbClick,
}: DgaBreadcrumbsProps) {
  const router = useRouter(); // ✅ CHANGED: initialize router
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [breadcrumbItems, setBreadcrumbItems] = useState<
    Array<BreadcrumbItem | EllipsisItem>
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function renderItems(
    itemsList: BreadcrumbItem[],
    maxNum: number
  ): Array<BreadcrumbItem | EllipsisItem> {
    if (!Array.isArray(itemsList)) return [];
    if (itemsList.length <= maxNum) return itemsList.slice();

    const effectiveMax = Math.max(3, maxNum);
    const visibleCount = effectiveMax - 1; // reserve one spot for ellipsis
    const firstHalf = Math.max(1, Math.floor(visibleCount / 2));
    const secondHalf = Math.max(1, visibleCount - firstHalf);

    const firstItems = itemsList.slice(0, firstHalf);
    const lastItems = itemsList.slice(-secondHalf);
    const middleItems = itemsList.slice(firstHalf, -secondHalf);

    if (middleItems.length === 0) return [...firstItems, ...lastItems];

    return [
      ...firstItems,
      { ellipsis: true, items: middleItems },
      ...lastItems,
    ];
  }

  useEffect(() => {
    setBreadcrumbItems(renderItems(items, max));
  }, [items, max]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!rootRef.current) return;
      const target = e.target as Node;
      if (target && !rootRef.current.contains(target)) setIsMenuOpen(false);
    }

    if (isMenuOpen) document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [isMenuOpen]);

  function handleClick(e: React.MouseEvent, item: BreadcrumbItem) {
    // keep disabled behavior
    if (item.disabled) {
      e.preventDefault();
      return;
    }

    // ✅ SAME: allow parent hook (analytics etc.)
    onBreadcrumbClick?.(item, e);

    // ✅ CHANGED: if parent prevented default, do NOT navigate
    if (e.defaultPrevented) return;

    // ✅ CHANGED: do Next.js SPA navigation (redirect user without reload)
    if (item.path) {
      e.preventDefault();      // prevent normal <a> full page reload
      router.push(item.path);  // redirect user
    }
  }

  const arrow = isRTL() ? (
    <img
      src="/assets/icons/stroke-standard/arrow-left-01-stroke-rounded.svg"
      alt="arrow-left"
      width={24}
      height={24}
      className="inline-block"
    />
  ) : (
    <img
      src="/assets/icons/stroke-standard/arrow-right-01-stroke-rounded.svg"
      alt="arrow-right"
      width={24}
      height={24}
      className="inline-block"
    />
  );

  return (
    <div ref={rootRef} className="dga-breadcrumb-root">
      <nav aria-label="breadcrumb">
        <ul className={`dga-breadcrumb dga-breadcrumb--${isRTL() ? "rtl" : "ltr"}`}>
          {breadcrumbItems.map((item, idx) => {
            // Ellipsis item
            if ("ellipsis" in (item as any)) {
              const ell = item as EllipsisItem;

              return (
                <li key={`ell-${idx}`} className="dga-breadcrumb-item ellipsis">
                  <span className="dga-breadcrumb-icon">{arrow}</span>

                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                    className="ellipsis-button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen((s) => !s);
                    }}
                  >
                    <img
                      src="/assets/icons/stroke-standard/more-horizontal-stroke-rounded.svg"
                      alt="more"
                      width={16}
                      height={16}
                    />
                  </button>

                  {isMenuOpen && (
                    <ul className="dga-breadcrumb-dropdown">
                      {ell.items.map((it) => (
                        <li key={it.label} className="dga-breadcrumb-dropdown-item">
                          <a
                            href={it.disabled ? undefined : it.path}
                            onClick={(e) => {
                              setIsMenuOpen(false);
                              handleClick(e, it); // ✅ uses router.push inside
                            }}
                            className={`link ${it.disabled ? "disabled-link" : ""}`}
                            aria-disabled={it.disabled}
                          >
                            {it.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            // Normal breadcrumb item
            const b = item as BreadcrumbItem;
            const isLast = idx === breadcrumbItems.length - 1;
            const isFirst = idx === 0;

            return (
              <li
                key={`item-${idx}`}
                className={`dga-breadcrumb-item ${isLast ? "active" : ""}`}
                aria-current={isLast ? "page" : undefined}
              >
                {!isFirst && <span className="dga-breadcrumb-icon">{arrow}</span>}

                {b.path ? (
                  <a
                    href={b.disabled ? undefined : b.path}
                    onClick={(e) => handleClick(e, b)} // ✅ uses router.push inside
                    className={`link ${b.disabled ? "disabled-link" : ""} ${
                      isLast ? "link_current" : ""
                    }`}
                    aria-disabled={b.disabled}
                  >
                    {b.label}
                  </a>
                ) : (
                  <span
                    className={`link link_empty ${b.disabled ? "disabled-link" : ""} ${
                      isLast ? "link_current" : ""
                    }`}
                    aria-disabled={b.disabled}
                  >
                    {b.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default DgaBreadcrumbs;
