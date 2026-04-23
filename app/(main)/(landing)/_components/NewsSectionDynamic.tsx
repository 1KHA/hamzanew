"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { NewsArticle } from "../_data/homeData";

// Dynamically import the heavy NewsSection (code-split chunk)
const NewsSection = dynamic(() => import("./NewsSection"));

const Placeholder = () => (
  <div style={{ minHeight: 520, background: "#f9fafb" }} aria-hidden="true" />
);

// Uses a mount guard so that during SSR the component renders only the
// placeholder — card images (photo2.jpg etc.) never appear in the initial
// HTML, preventing them from competing with the hero as the LCP element.
export default function NewsSectionDynamic({ articles }: { articles: NewsArticle[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <Placeholder />;
  return <NewsSection articles={articles} />;
}
