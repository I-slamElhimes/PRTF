"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  /** False until the stored preference has been read, to avoid a flash. */
  ready: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggle: () => {},
  ready: false,
});

export const useTheme = () => useContext(ThemeContext);

export const THEME_STORAGE_KEY = "ieh-theme";

/**
 * Inline script that runs before first paint.
 *
 * Reads the stored choice (falling back to the OS preference) and stamps
 * `data-theme` on <html> synchronously, so the correct palette is already in
 * place when the first frame renders — no white flash on a dark-theme site.
 */
export const themeInitScript = `(function(){try{var k="${THEME_STORAGE_KEY}";var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: light)").matches;var t=s||(m?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  // Adopt whatever the pre-paint script already decided.
  useEffect(() => {
    const current = (document.documentElement.getAttribute("data-theme") as Theme | null) ?? "dark";
    setTheme(current);
    setReady(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((previous) => {
      const next: Theme = previous === "dark" ? "light" : "dark";
      const root = document.documentElement;

      // Suppress transitions during the swap on reduced-motion setups, where a
      // cross-fading page is exactly what the user asked not to see.
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        root.setAttribute("data-theme-instant", "");
        window.setTimeout(() => root.removeAttribute("data-theme-instant"), 60);
      }

      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Private mode or blocked storage — the choice just will not persist.
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle, ready }}>{children}</ThemeContext.Provider>;
}
