import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50" />

      <div className="shell relative">
        <p className="eyebrow text-rose-400">Error 404</p>
        <h1 className="mt-6 max-w-2xl font-display text-[clamp(2.5rem,8vw,5rem)] leading-[1.02] tracking-[-0.04em] text-mist-50">
          This node isn&rsquo;t on the graph.
        </h1>
        <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-mist-400">
          The page you were looking for does not exist, or it has moved somewhere else.
        </p>

        <Link
          href="/"
          className="mt-9 inline-flex h-12 items-center gap-2.5 rounded-full bg-mist-50 px-6 text-[0.9rem] font-medium text-void-950 transition-colors duration-300 hover:bg-white"
        >
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
