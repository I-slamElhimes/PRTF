"use client";

import { cn } from "@/lib/utils";
import { useCv } from "@/components/layout/CvProvider";
import { Magnetic } from "@/components/ui/Magnetic";
import { DownloadIcon } from "@/components/ui/Icons";

/**
 * Download the CV.
 *
 * A plain anchor with `download` — it fetches the real PDF sitting in
 * /public/cv, so replacing that one file publishes a new CV with no code
 * change. Renders nothing at all when `siteConfig.cv` is null, so the button
 * can never become a dead link.
 */
export function CvButton({
  size = "md",
  variant = "outline",
  className,
}: {
  size?: "md" | "lg";
  variant?: "outline" | "primary";
  className?: string;
}) {
  const { href, filename } = useCv();
  if (!href) return null;

  const isLarge = size === "lg";

  return (
    <Magnetic className="inline-block">
      <a
        href={href}
        download={filename}
        className={cn(
          "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full tracking-wide transition-all duration-300",
          isLarge ? "h-[3.4rem] px-8 text-[0.9rem]" : "h-11 px-6 text-[0.82rem]",
          variant === "primary"
            ? "grad-accent text-white shadow-[0_18px_48px_-18px_rgba(236,72,153,0.85)]"
            : "border border-white/14 bg-white/[0.03] text-mist-100 backdrop-blur-sm hover:border-rose-400/50 hover:text-white",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.22),transparent)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-full motion-reduce:hidden"
        />
        <span className="relative z-10">Download CV</span>
        <DownloadIcon className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
      </a>
    </Magnetic>
  );
}
