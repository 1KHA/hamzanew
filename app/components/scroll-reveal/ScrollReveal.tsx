"use client";

/**
 * ScrollReveal
 *
 * Generic entrance-animation wrapper powered by Framer Motion.
 * Drop it around any element on any page — no repeated animation code needed.
 *
 * Usage examples
 * ─────────────
 * // Simple fade-up (default)
 * <ScrollReveal><MyCard /></ScrollReveal>
 *
 * // Slide in from left, with delay and custom duration
 * <ScrollReveal direction="left" delay={0.4} duration={0.9}>
 *   <MyCard />
 * </ScrollReveal>
 *
 * // Inside a role="list" parent — forward the listitem role
 * {items.map((item, i) => (
 *   <ScrollReveal key={i} delay={i * 0.22} role="listitem">
 *     <ItemCard item={item} />
 *   </ScrollReveal>
 * ))}
 *
 * Props
 * ─────
 * direction  "up" | "down" | "left" | "right"   default "up"
 *            The side the element enters from.
 * distance   number (px)                          default per direction
 *            How far the element travels.
 * delay      number (s)                           default 0
 * duration   number (s)                           default 0.65
 * ease       Framer Motion Easing string/array    default "easeInOut"
 * amount     0–1  fraction of element visible     default 0.4
 *            before the animation fires.
 *            Higher = user must scroll further in before it starts.
 * className  forwarded to the motion.div
 * role       forwarded to the motion.div  (e.g. "listitem")
 */

import { motion, type Easing } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  role?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  ease?: Easing | Easing[];
  amount?: number;
  margin?: string;
  /** Fire on mount instead of on scroll (for above-the-fold content) */
  immediate?: boolean;
}

/** Default travel distance per direction (px). */
const DEFAULT_DISTANCE: Record<Direction, number> = {
  up:    40,
  down:  40,
  left:  50,
  right: 50,
};

/** Axis + sign for each direction. */
const AXIS: Record<Direction, { axis: "x" | "y"; sign: 1 | -1 }> = {
  up:    { axis: "y", sign:  1 },  // starts below  → moves up
  down:  { axis: "y", sign: -1 },  // starts above  → moves down
  left:  { axis: "x", sign: -1 },  // starts left   → moves right
  right: { axis: "x", sign:  1 },  // starts right  → moves left
};

export default function ScrollReveal({
  children,
  className,
  role,
  direction  = "up",
  distance,
  delay      = 0,
  duration   = 0.65,
  ease       = "easeInOut",
  amount     = 0.4,
  margin,
  immediate  = false,
}: ScrollRevealProps) {
  const { axis, sign } = AXIS[direction];
  const travel = (distance ?? DEFAULT_DISTANCE[direction]) * sign;

  const initial = { opacity: 0, [axis]: travel };
  const visible = { opacity: 1, x: 0, y: 0 };

  if (immediate) {
    return (
      <motion.div
        className={className}
        role={role}
        initial={initial}
        animate={visible}
        transition={{ duration, delay, ease }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      role={role}
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, amount, margin }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
