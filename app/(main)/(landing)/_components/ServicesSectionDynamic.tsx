"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Service } from "../_data/homeData";

const ServicesSection = dynamic(() => import("./ServicesSection"));

const Placeholder = () => (
  <div style={{ minHeight: 380, background: "#f9fafb" }} aria-hidden="true" />
);

export default function ServicesSectionDynamic({ services }: { services: Service[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <Placeholder />;
  return <ServicesSection services={services} />;
}
