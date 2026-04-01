"use client";

/**
 * Typewriter
 *
 * Renders text with a type-once animation and blinking cursor.
 * Triggers when the element enters the viewport (once).
 *
 * Usage
 * ─────
 * // Default – renders as a <span>
 * <Typewriter text="هل أنت مستعد؟" />
 *
 * // Custom element tag
 * <Typewriter text="مرحباً بالعالم" as="h2" className="display-sm-bold" />
 *
 * Props
 * ─────
 * text        string   The text to animate.
 * as          string   HTML tag to render (default "span").
 * className   string   Forwarded to the wrapper element.
 * typeSpeed   number   ms per character (default 60).
 * margin      string   IntersectionObserver rootMargin (default "0px 0px -60px 0px").
 * cursorChar  string   Cursor character (default "|").
 */

import { useRef, useState, useEffect, ElementType } from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterProps {
  text: string;
  as?: ElementType;
  className?: string;
  typeSpeed?: number;
  margin?: string;
  cursorChar?: string;
  [key: string]: unknown;
}

export default function Typewriter({
  text,
  as: Tag = "span",
  className,
  typeSpeed = 60,
  margin = "0px 0px -60px 0px",
  cursorChar = "|",
  ...rest
}: TypewriterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin } as Parameters<typeof useInView>[1]);
  const [displayed, setDisplayed] = useState("");
  const done = displayed.length === text.length;

  useEffect(() => {
    if (!inView || done) return;
    const timeout = setTimeout(
      () => setDisplayed(text.slice(0, displayed.length + 1)),
      typeSpeed
    );
    return () => clearTimeout(timeout);
  }, [displayed, inView, done, text, typeSpeed]);

  return (
    <Tag ref={ref} className={className} aria-label={text} {...rest}>
      <span aria-hidden="true">{displayed}</span>
      {!done && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          {cursorChar}
        </motion.span>
      )}
    </Tag>
  );
}
