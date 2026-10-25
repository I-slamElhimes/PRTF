"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { useHasFinePointer } from "@/hooks/useMediaQuery";

/**
 * A trailing ring that reacts to what is underneath it.
 *
 * The native cursor is intentionally left visible — replacing it entirely
 * costs precision and accessibility for a purely decorative gain. This ring
 * sits behind it as an accent, and is disabled on touch and reduced motion.
 */
export function CustomCursor() {
  const finePointer = useHasFinePointer();
  const prefersReducedMotion = useReducedMotion();
  const enabled = finePointer && !prefersReducedMotion;

  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<"default" | "interactive">("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 34, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 400, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea");
      setVariant(interactive ? "interactive" : "default");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-screen"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
            animate={{
              width: variant === "interactive" ? 46 : 26,
              height: variant === "interactive" ? 46 : 26,
              borderColor:
                variant === "interactive" ? "rgba(34,211,238,0.75)" : "rgba(140,170,235,0.34)",
              backgroundColor:
                variant === "interactive" ? "rgba(34,211,238,0.07)" : "rgba(34,211,238,0)",
            }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
