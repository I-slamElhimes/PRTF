import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving Tailwind conflicts predictably. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Clamp `value` into the inclusive range [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation — used for frame-rate independent easing. */
export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

/** Deterministic pseudo-random in [0, 1) so visuals stay stable across renders. */
export function seeded(seed: number): number {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}
