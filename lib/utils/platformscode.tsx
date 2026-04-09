"use client";

import dynamic from "next/dynamic";
import { InputSkeleton, TextareaSkeleton, TextSkeleton, AccordionSkeleton } from "@/app/components/skeleton/Skeleton";

// Map all components used from platformscode-new-react dynamically without SSR.
// { ssr: false } prevents "window is not defined" errors during Next.js SSR.
// The `loading` option renders a skeleton placeholder until the real component hydrates.

export const DgaDropdown = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaDropdown),
  { ssr: false, loading: InputSkeleton }
);

export const DgaTextInput = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaTextInput),
  { ssr: false, loading: InputSkeleton }
);

export const DgaTextarea = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaTextarea),
  { ssr: false, loading: TextareaSkeleton }
);

export const DgaLink = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaLink),
  { ssr: false, loading: TextSkeleton }
);

export const DgaListItem = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaListItem),
  { ssr: false, loading: TextSkeleton }
);

export const DgaAccordion = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaAccordion),
  { ssr: false, loading: AccordionSkeleton }
);

export const DgaCheckbox = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaCheckbox),
  { ssr: false, loading: InputSkeleton }
);

export const DgaRadioButton = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaRadioButton),
  { ssr: false, loading: InputSkeleton }
);

export const DgaChart = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaChart),
  { ssr: false, loading: () => <div className="skeleton" style={{ height: 300, width: "100%" }} aria-hidden="true" /> }
);

export const DgaContentSwitcher = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaContentSwitcher),
  { ssr: false, loading: InputSkeleton }
);

