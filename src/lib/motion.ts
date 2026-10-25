import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Every section pulls from these so the whole page
 * eases the same way — consistency is what makes motion feel designed rather
 * than decorative.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.83, 0, 0.17, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.6,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 30,
  mass: 0.5,
};

/** Standard viewport config: fire once, slightly before the element is centred. */
export const viewportOnce = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/** Parent that releases children in sequence. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Per-word / per-line mask reveal. Pair with an `overflow-hidden` wrapper. */
export const maskReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};
