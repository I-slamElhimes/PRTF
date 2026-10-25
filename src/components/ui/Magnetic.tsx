"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { useHasFinePointer } from "@/hooks/useMediaQuery";

interface MagneticProps {
  children: ReactNode;
  /** Maximum pull in pixels. */
  strength?: number;
  className?: string;
}

/**
 * Pulls its child toward the cursor while hovered.
 *
 * Deliberately inert on touch devices and when reduced motion is requested —
 * a magnetic control that cannot be hovered is just a layout wrapper.
 */
export function Magnetic({ children, strength = 14, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useHasFinePointer();
  const enabled = finePointer && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    // Normalise by half-size so the pull is proportional, not absolute.
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={enabled ? { x: springX, y: springY } : undefined}
    >
      {children}
    </motion.div>
  );
}
