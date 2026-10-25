"use client";

/**
 * Local CV override.
 *
 * The site is statically hosted, so there is no server to upload to. Rather
 * than faking a network call, "Upload CV" stores the chosen PDF in this
 * browser (as a data URL in localStorage) and the Download button serves that
 * copy instead of the published one.
 *
 * This is genuinely useful — swap the file, check how it downloads, keep it
 * across reloads — but it is local to one browser. Visitors still receive the
 * file committed at `public/cv/`, and the UI says so rather than implying the
 * upload published anything.
 */

export const CV_STORAGE_KEY = "ieh-cv-local";

/** Comfortably under the ~5MB localStorage budget once base64-inflated. */
export const MAX_CV_BYTES = 3 * 1024 * 1024;

export interface LocalCv {
  dataUrl: string;
  filename: string;
  size: number;
  updatedAt: string;
}

export function readLocalCv(): LocalCv | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CV_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LocalCv>;
    if (typeof parsed.dataUrl !== "string" || !parsed.dataUrl.startsWith("data:application/pdf")) {
      return null;
    }
    return {
      dataUrl: parsed.dataUrl,
      filename: parsed.filename ?? "CV.pdf",
      size: parsed.size ?? 0,
      updatedAt: parsed.updatedAt ?? "",
    };
  } catch {
    return null;
  }
}

export function clearLocalCv(): void {
  try {
    window.localStorage.removeItem(CV_STORAGE_KEY);
  } catch {
    // Storage blocked — nothing was persisted to begin with.
  }
}

export type CvReadResult = { ok: true; cv: LocalCv } | { ok: false; error: string };

/** Validate then read the file. Rejects anything that is not a real PDF. */
export function readCvFile(file: File): Promise<CvReadResult> {
  return new Promise((resolve) => {
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      resolve({ ok: false, error: "That file is not a PDF." });
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      resolve({
        ok: false,
        error: `That PDF is ${(file.size / 1024 / 1024).toFixed(1)}MB — the limit is 3MB.`,
      });
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => resolve({ ok: false, error: "That file could not be read." });
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl.startsWith("data:application/pdf")) {
        resolve({ ok: false, error: "That file is not a valid PDF." });
        return;
      }

      const cv: LocalCv = {
        dataUrl,
        filename: file.name,
        size: file.size,
        updatedAt: new Date().toISOString(),
      };

      try {
        window.localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cv));
      } catch {
        resolve({ ok: false, error: "Browser storage is full or blocked." });
        return;
      }
      resolve({ ok: true, cv });
    };
    reader.readAsDataURL(file);
  });
}
