"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { siteConfig } from "@/data/site";
import { clearLocalCv, readCvFile, readLocalCv, type LocalCv } from "@/lib/cvStore";

interface CvContextValue {
  /** What the Download button should serve right now. */
  href: string | null;
  filename: string;
  /** True when a locally-uploaded file is overriding the published one. */
  isLocal: boolean;
  local: LocalCv | null;
  upload: (file: File) => Promise<{ ok: boolean; error?: string }>;
  reset: () => void;
}

const CvContext = createContext<CvContextValue>({
  href: null,
  filename: "CV.pdf",
  isLocal: false,
  local: null,
  upload: async () => ({ ok: false }),
  reset: () => {},
});

export const useCv = () => useContext(CvContext);

export function CvProvider({ children }: { children: ReactNode }) {
  const [local, setLocal] = useState<LocalCv | null>(null);

  // Read after mount: localStorage does not exist during SSR, and reading it
  // in render would desynchronise the server and client markup.
  useEffect(() => {
    setLocal(readLocalCv());
  }, []);

  const upload = useCallback(async (file: File) => {
    const result = await readCvFile(file);
    if (!result.ok) return { ok: false, error: result.error };
    setLocal(result.cv);
    return { ok: true };
  }, []);

  const reset = useCallback(() => {
    clearLocalCv();
    setLocal(null);
  }, []);

  const value = useMemo<CvContextValue>(
    () => ({
      href: local ? local.dataUrl : (siteConfig.cv?.href ?? null),
      filename: local ? local.filename : (siteConfig.cv?.filename ?? "CV.pdf"),
      isLocal: local !== null,
      local,
      upload,
      reset,
    }),
    [local, upload, reset],
  );

  return <CvContext.Provider value={value}>{children}</CvContext.Provider>;
}
