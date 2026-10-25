"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useCv } from "@/components/layout/CvProvider";
import { CheckIcon, CloseIcon, UploadIcon } from "@/components/ui/Icons";

/**
 * Opens a real file picker and swaps the CV the Download button serves.
 *
 * The site is static, so the file is stored in this browser rather than
 * published — the status line says exactly that instead of implying an upload
 * reached a server.
 */
export function UploadCvButton({ className }: { className?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, reset, isLocal, local } = useCv();
  const [status, setStatus] = useState<{ kind: "ok" | "error"; message: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const onPick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset the input so re-picking the same filename still fires `change`.
    event.target.value = "";
    if (!file) return;

    setBusy(true);
    const result = await upload(file);
    setBusy(false);

    setStatus(
      result.ok
        ? { kind: "ok", message: `${file.name} is now used for download on this browser.` }
        : { kind: "error", message: result.error ?? "Upload failed." },
    );
    window.setTimeout(() => setStatus(null), 6000);
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={onPick}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        aria-label={isLocal ? `Replace CV (currently ${local?.filename})` : "Upload a CV PDF"}
        className="group relative inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-full border border-white/12 bg-void-900/70 pl-5 pr-4 text-[0.8rem] tracking-wide text-mist-100 backdrop-blur-xl transition-colors duration-300 hover:border-rose-400/50 disabled:opacity-60"
      >
        <span className="grad-accent absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative">{busy ? "Reading" : "Upload CV"}</span>
        <UploadIcon className="relative h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
        {isLocal ? (
          <span
            aria-hidden="true"
            className="relative h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_var(--color-rose-400)]"
          />
        ) : null}
      </button>

      {/* Status + a way back to the published file */}
      <AnimatePresence>
        {status || isLocal ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="glass-node absolute right-0 top-[calc(100%+0.6rem)] z-50 w-72 rounded-2xl p-3.5"
          >
            {status ? (
              <p
                role="status"
                className={cn(
                  "flex items-start gap-2 text-[0.75rem] leading-snug",
                  status.kind === "ok" ? "text-mist-200" : "text-rose-300",
                )}
              >
                {status.kind === "ok" ? (
                  <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
                ) : (
                  <CloseIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                )}
                {status.message}
              </p>
            ) : null}

            {isLocal ? (
              <div className={cn(status ? "mt-3 border-t border-white/[0.08] pt-3" : undefined)}>
                <p className="text-[0.7rem] leading-snug text-mist-500">
                  Stored in this browser only. To publish it to visitors, replace{" "}
                  <code className="text-mist-300">public/cv/</code> and redeploy.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-2 text-[0.72rem] text-rose-300 underline decoration-rose-400/40 underline-offset-4 transition-colors hover:text-rose-200"
                >
                  Use the published CV again
                </button>
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
