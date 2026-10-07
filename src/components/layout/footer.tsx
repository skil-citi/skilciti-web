import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { nav, services, site } from "@/lib/content";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="relative overflow-clip border-t border-line bg-canvas-soft/60">
      <div aria-hidden className="bg-grid fade-mask-radial pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]"
      />

      <div className="container-x relative pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo className="h-9 w-auto text-ink" />
            <p className="mt-6 leading-relaxed text-pretty text-ink-soft">
              {site.tagline} We design, build and support the software that modern businesses run on.
            </p>
            <Button href="/contact" className="mt-8" arrow>
              Start a project
            </Button>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium tracking-[0.2em] text-ink-faint uppercase">Explore</h3>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink-soft transition-colors hover:text-brand-bright">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium tracking-[0.2em] text-ink-faint uppercase">Services</h3>
            <ul className="mt-6 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.id}`}
                    className="text-ink-soft transition-colors hover:text-brand-bright"
                  >
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs font-medium tracking-[0.2em] text-ink-faint uppercase">Get in touch</h3>
            <ul className="mt-6 space-y-4 text-ink-soft">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 transition-colors hover:text-brand-bright"
                >
                  <Mail className="size-4 text-brand-bright" aria-hidden />
                  {site.email}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-3 transition-colors hover:text-brand-bright"
                >
                  <Phone className="size-4 text-brand-bright" aria-hidden />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-brand-bright" aria-hidden />
                {site.location}
              </li>
            </ul>
          </div>
        </div>

        {/* oversized outline wordmark */}
        <div aria-hidden className="pointer-events-none mt-20 select-none">
          <p className="fade-mask-b bg-gradient-to-b from-brand/30 to-brand/5 bg-clip-text text-center font-display text-[clamp(4.5rem,22vw,20rem)] leading-[0.8] font-extrabold tracking-tight text-transparent">
            Skilciti
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-ink-faint sm:flex-row">
          <p>
            © <CurrentYear /> Skilciti. All rights reserved.
          </p>
          <p>Crafted in Nairobi, Kenya.</p>
        </div>
      </div>
    </footer>
  );
}
