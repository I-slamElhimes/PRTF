"use client";

import { navItems, siteConfig, socialLinks } from "@/data/site";
import { ArrowDownIcon, socialIconMap } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  const availableSocials = socialLinks.filter((link) => link.href !== null);

  return (
    <footer className="relative border-t border-white/[0.08]">
      <div className="shell py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <p className="font-display text-[1.05rem] tracking-tight text-mist-100">
              Islam <span className="text-mist-400">El Himes</span>
            </p>
            <p className="mt-2.5 text-[0.85rem] leading-relaxed text-mist-500">
              Full Stack Developer and Computer Engineering student, building toward AI and Data
              Science.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer">
            <p className="eyebrow text-[0.625rem]">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3 lg:grid-cols-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[0.85rem] text-mist-400 transition-colors duration-300 hover:text-mist-100"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="eyebrow text-[0.625rem]">Elsewhere</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 block break-all text-[0.85rem] text-mist-300 transition-colors duration-300 hover:text-rose-300"
            >
              {siteConfig.email}
            </a>

            {availableSocials.length > 0 ? (
              <ul className="mt-4 flex gap-2">
                {availableSocials.map((link) => {
                  const Icon = socialIconMap[link.icon];
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-mist-400 transition-colors duration-300 hover:border-rose-400/50 hover:text-mist-100"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.7rem] text-mist-600">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <p className="text-[0.7rem] text-mist-600">Next.js · TypeScript · Motion</p>
            <a
              href="#hero"
              className="group flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-mist-500 transition-colors duration-300 hover:text-mist-100"
            >
              Back to top
              <ArrowDownIcon className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
