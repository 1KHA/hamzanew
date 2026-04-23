"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const SubscriptionSection = dynamic(() => import("./SubscriptionSection"));

const Placeholder = () => (
  <div style={{ minHeight: 200, background: "#074D31" }} aria-hidden="true" />
);

export default function SubscriptionSectionDynamic() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <Placeholder />;
  return <SubscriptionSection />;
}
