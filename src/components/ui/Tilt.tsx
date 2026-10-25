"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  intensity?: number;
  /** Perspective depth — lower values exaggerate the effect. */
  perspective?: number;
}

/**
 * Cursor-driven 3D perspective for project cards.
 *
 * Kept deliberately shallow (a few degrees). Enough to give the card weight
 * on hover without turning reading into a moving target.
 */
export function Tilt({ children, className, intensity = 5, perspective = 1200 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useHasFinePointer();
  const enabled = finePointer && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ perspective }} className={cn("[transform-style:preserve-3d]", className)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
