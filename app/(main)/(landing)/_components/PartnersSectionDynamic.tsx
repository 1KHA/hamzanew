"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Partner } from "../_data/homeData";

const PartnersSection = dynamic(() => import("./PartnersSection"));

const Placeholder = () => (
  <div style={{ minHeight: 260, background: "#fff" }} aria-hidden="true" />
);

export default function PartnersSectionDynamic({ fallbackPartners }: { fallbackPartners?: Partner[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <Placeholder />;
  return <PartnersSection fallbackPartners={fallbackPartners} />;
}
