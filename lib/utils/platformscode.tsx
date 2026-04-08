"use client";

import dynamic from "next/dynamic";

// Map all components used from platformscode-new-react dynamically without SSR
// This prevents "window is not defined" errors during Next.js Server-Side Rendering
export const DgaDropdown = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaDropdown),
  { ssr: false }
);

export const DgaTextInput = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaTextInput),
  { ssr: false }
);

export const DgaTextarea = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaTextarea),
  { ssr: false }
);

export const DgaLink = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaLink),
  { ssr: false }
);

export const DgaListItem = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaListItem),
  { ssr: false }
);

export const DgaAccordion = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaAccordion),
  { ssr: false }
);

export const DgaCheckbox = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaCheckbox),
  { ssr: false }
);

export const DgaRadioButton = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaRadioButton),
  { ssr: false }
);

export const DgaChart = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaChart),
  { ssr: false }
);

export const DgaContentSwitcher = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaContentSwitcher),
  { ssr: false }
);
