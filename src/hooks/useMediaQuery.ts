"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a media query.
 *
 * Returns `false` during SSR and on the first client paint, then settles to the
 * real value. Consumers must therefore treat `false` as "not yet known" and
 * render the lighter branch first — which is also the safer default for
 * performance-sensitive visuals.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on pointer-precise devices — gates cursor and hover-only behaviour. */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** True from the `lg` breakpoint up. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
