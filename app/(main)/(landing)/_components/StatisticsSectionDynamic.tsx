"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const StatisticsSection = dynamic(() => import("./StatisticsSection"));

const Placeholder = () => (
  <div style={{ minHeight: 480, background: "#f9fafb" }} aria-hidden="true" />
);

export default function StatisticsSectionDynamic() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <Placeholder />;
  return <StatisticsSection />;
}
