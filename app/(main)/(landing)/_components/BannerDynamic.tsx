"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import("./Banner"));

// Mount guard defers the spinning logo + carousel dot controls until after
// the LCP hero text (rendered by BannerHeroText server component) is painted.
export default function BannerDynamic() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <Banner />;
}
