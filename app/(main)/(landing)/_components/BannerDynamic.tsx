"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Slide } from "../_data/homeData";

const Banner = dynamic(() => import("./Banner"));

// Mount guard defers the carousel controls + non-first slide images until after
// the LCP content (BannerHero image + BannerHeroText) is painted.
export default function BannerDynamic({ slides }: { slides: Slide[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <Banner slides={slides} />;
}
