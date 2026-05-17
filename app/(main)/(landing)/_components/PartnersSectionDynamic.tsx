"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import type { Partner } from "../_data/homeData";

const DynamicPartnersSection = dynamic(
  () => import("./PartnersSection"),
);

interface PartnersSectionDynamicProps {
  insideEntities?: { id: number; name: string; image: string }[];
  outsideEntities?: { id: number; name: string; image: string }[];
  insideTitle?: string;
  outsideTitle?: string;
  translations?: Record<string, string> | null;
  fallbackPartners?: Partner[];
}

export default function PartnersSectionDynamic({
  insideEntities,
  outsideEntities,
  insideTitle,
  outsideTitle,
  translations,
  fallbackPartners,
}: PartnersSectionDynamicProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DynamicPartnersSection
      insideEntities={insideEntities}
      outsideEntities={outsideEntities}
      insideTitle={insideTitle}
      outsideTitle={outsideTitle}
      translations={translations}
      fallbackPartners={fallbackPartners}
    />
  );
}