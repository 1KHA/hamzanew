"use client";

import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
}

const directionMap = {
  up:    { y: 50,   x: 0   },
  down:  { y: -50,  x: 0   },
  left:  { y: 0,    x: 60  },
  right: { y: 0,    x: -60 },
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance,
  duration = 0.65,
}: ScrollRevealProps) {
  const offset = directionMap[direction];
  const initial = {
    opacity: 0,
    y: distance !== undefined ? (direction === "up" ? distance : direction === "down" ? -distance : 0) : offset.y,
    x: distance !== undefined ? (direction === "left" ? distance : direction === "right" ? -distance : 0) : offset.x,
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
