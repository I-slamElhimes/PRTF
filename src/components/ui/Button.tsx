"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  magnetic?: boolean;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: never;
  type?: never;
  disabled?: never;
}

interface ActionProps extends BaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

type ButtonProps = LinkProps | ActionProps;

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-55";

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-[0.82rem]",
  lg: "h-[3.4rem] px-8 text-[0.9rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "grad-accent text-white shadow-[0_18px_48px_-18px_rgba(236,72,153,0.85)] hover:shadow-[0_22px_58px_-16px_rgba(168,85,247,0.95)]",
  outline:
    "border border-white/14 bg-white/[0.03] text-mist-100 backdrop-blur-sm hover:border-rose-400/50 hover:text-white",
  ghost: "text-mist-300 hover:text-white",
};

/**
 * The single interactive control across the site.
 *
 * Renders a real anchor when given `href` and a real `<button>` otherwise, so
 * keyboard and assistive-technology semantics are never approximated.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  magnetic = true,
  ...props
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      {/* Single-pass light sweep on hover — no looping shimmer. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.22),transparent)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-full motion-reduce:hidden"
      />
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5">{icon}</span>
      ) : null}
    </>
  );

  const element =
    "href" in props && props.href !== undefined ? (
      <a
        href={props.href}
        className={classes}
        {...(props.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    ) : (
      <button type={props.type ?? "button"} onClick={props.onClick} disabled={props.disabled} className={classes}>
        {content}
      </button>
    );

  if (!magnetic) return element;
  return <Magnetic className="inline-block">{element}</Magnetic>;
}
