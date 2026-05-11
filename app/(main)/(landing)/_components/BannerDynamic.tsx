"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("./Banner"));

interface BannerFields {
  smallHeaderTitleText?: string;
  headerTitleText?: string;
  descriptionText?: string;
  image?: string;
}

// Mount guard defers the carousel controls + non-first slide images until after
// the LCP content (BannerHero image + BannerHeroText) is painted.
export default function BannerDynamic({ bannerFields }: { bannerFields?: BannerFields }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  return <Banner bannerFields={bannerFields} />;
}
