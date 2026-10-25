import type { SVGProps } from "react";

/**
 * Hand-drawn icon set on a single 24px grid.
 *
 * No icon library, and deliberately no emoji anywhere in the product. Icons
 * are decorative by default — the accessible name always comes from the
 * control that wraps them.
 */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ── Direction ─────────────────────────────────────────────────────────── */

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Base>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </Base>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m14 6-6 6 6 6" />
    </Base>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m10 6 6 6-6 6" />
    </Base>
  );
}

/* ── Contact ───────────────────────────────────────────────────────────── */

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7.5 8.2 5.6a1.4 1.4 0 0 0 1.6 0L21 7.5" />
    </Base>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </Base>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.6 10.6V17" />
      <path d="M7.6 7.3v.1" />
      <path d="M11.6 17v-3.5a2.3 2.3 0 0 1 4.6 0V17" />
      <path d="M11.6 10.6V17" />
    </Base>
  );
}

/* ── Chrome ────────────────────────────────────────────────────────────── */

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 8h16" />
      <path d="M4 16h10" />
    </Base>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5.5v13" />
      <path d="M5.5 12h13" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Base>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="9" y="9" width="12" height="12" rx="2.5" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </Base>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </Base>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M9 4H4v5" />
      <path d="M15 20h5v-5" />
      <path d="M20 9V4h-5" />
      <path d="M4 15v5h5" />
    </Base>
  );
}

/* ── Rail navigation ───────────────────────────────────────────────────── */

export function HomeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M5.5 9.6V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.6" />
    </Base>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </Base>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m12 3 8.5 4.6L12 12.2 3.5 7.6 12 3Z" />
      <path d="m3.5 12.4 8.5 4.6 8.5-4.6" />
      <path d="m3.5 16.9 8.5 4.6 8.5-4.6" />
    </Base>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 7.5a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.5.7l1 1.2H19a2 2 0 0 1 2 2v7.1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </Base>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="2.5" />
      <path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
      <path d="M3 12.5h18" />
    </Base>
  );
}

export function AwardIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13.4-1.3 6.6 4.3-2.4 4.3 2.4L15 13.4" />
    </Base>
  );
}

/* ── Motifs ────────────────────────────────────────────────────────────── */

/** Four-point sparkle — the recurring decorative star from the reference. */
export function SparkleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 1.5c.5 5.3 1.8 7.9 6.9 8.9v.2c-5.1 1-6.4 3.6-6.9 8.9-.5-5.3-1.8-7.9-6.9-8.9v-.2c5.1-1 6.4-3.6 6.9-8.9Z" />
    </svg>
  );
}

export function ButterflyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M11.4 12c-1.4 2.6-3.6 4.6-6 4.9-1.9.2-3.2-1-3.3-2.8-.1-2.3 1.7-4.7 4.2-6.4 1.6-1 3.3-1.6 4.4-1.5.5 0 .7.3.7.8Z" />
      <path d="M12.6 12c1.4 2.6 3.6 4.6 6 4.9 1.9.2 3.2-1 3.3-2.8.1-2.3-1.7-4.7-4.2-6.4-1.6-1-3.3-1.6-4.4-1.5-.5 0-.7.3-.7.8Z" />
      <rect x="11.3" y="6" width="1.4" height="12" rx=".7" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M9 6.8c0-.8.9-1.3 1.6-.9l7.2 4.4c.6.4.6 1.3 0 1.7l-7.2 4.4c-.7.4-1.6-.1-1.6-.9Z" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </Base>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 14.5A8.2 8.2 0 0 1 9.5 4a8.3 8.3 0 1 0 10.5 10.5Z" />
    </Base>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 15.5v-11" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M4.5 19.5h15" />
    </Base>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </Base>
  );
}

/* ── Skill category glyphs ─────────────────────────────────────────────── */

export function FrontendIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.5" y="4" width="19" height="13" rx="2.5" />
      <path d="M2.5 8.5h19" />
      <path d="m9 11.5-1.8 2L9 15.5" />
      <path d="m14 11.5 1.8 2-1.8 2" />
      <path d="M9.5 20.5h5" />
    </Base>
  );
}

export function BackendIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="3.5" width="18" height="7" rx="2" />
      <rect x="3" y="13.5" width="18" height="7" rx="2" />
      <path d="M6.5 7h.01M6.5 17h.01" />
      <path d="M10.5 7h7M10.5 17h7" />
    </Base>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" />
      <path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" />
    </Base>
  );
}

export function AiIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 4.2a3 3 0 0 0-3 3v.4a2.8 2.8 0 0 0-1.8 4.6A2.9 2.9 0 0 0 9 17.1v.2a2.9 2.9 0 0 0 3 2.5" />
      <path d="M12 4.2a3 3 0 0 1 3 3v.4a2.8 2.8 0 0 1 1.8 4.6A2.9 2.9 0 0 1 15 17.1v.2a2.9 2.9 0 0 1-3 2.5" />
      <path d="M12 4.2v15.6" />
      <path d="M9 10.5h6" />
    </Base>
  );
}

export function DataIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3.5a8.5 8.5 0 1 0 8.5 8.5H12Z" />
      <path d="M14.5 3.9A8.5 8.5 0 0 1 20.1 9.5h-5.6Z" />
    </Base>
  );
}

export function DevopsIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m12 2.8 8 4.3v9.8l-8 4.3-8-4.3V7.1Z" />
      <path d="m4 7.1 8 4.3 8-4.3" />
      <path d="M12 11.4v9.8" />
    </Base>
  );
}

export const skillIconMap = {
  frontend: FrontendIcon,
  backend: BackendIcon,
  database: DatabaseIcon,
  ai: AiIcon,
  data: DataIcon,
  devops: DevopsIcon,
} as const;

export const socialIconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
} as const;
