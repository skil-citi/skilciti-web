import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { CTA } from "@/components/home/cta";
import { Industries } from "@/components/home/industries";
import { ServiceArt } from "@/components/home/service-art";
import { Toolkit } from "@/components/home/toolkit";
import { PageHero } from "@/components/ui/page-hero";
import { Parallax } from "@/components/ui/parallax";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Mobile apps, web apps, websites, custom software, UI/UX design, systems consulting and ongoing support — Skilciti designs, builds and maintains the software your business runs on.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Full-spectrum software, design & systems expertise"
        accent={["software,", "design", "systems"]}
        description="From a single idea to a scaled platform — everything you need under one roof, delivered by a team that cares how it works and how it feels."
      >
        <ul className="flex flex-wrap gap-2.5">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
              >
                <s.icon className="size-4 text-brand-bright" aria-hidden />
                {s.short}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="relative pb-16 sm:pb-24">
        <div className="container-x space-y-24 sm:space-y-36">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={s.id}
                id={s.id}
                className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
              >
                {/* visual */}
                <Reveal x={flip ? 40 : -40} y={0} className={cn(flip && "lg:order-2")}>
                  <Parallax distance={28}>
                    <SpotlightCard className="relative overflow-clip rounded-[2rem] p-8 sm:p-12">
                      <div aria-hidden className="bg-grid fade-mask-radial pointer-events-none absolute inset-0 opacity-60" />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-brand/25 blur-[90px]"
                      />
                      <span className="absolute top-6 right-7 font-mono text-xs text-ink-faint">
                        0{i + 1} / 0{services.length}
                      </span>
                      <div className="relative flex h-56 items-center justify-center sm:h-72">
                        <ServiceArt id={s.id} />
                      </div>
                    </SpotlightCard>
                  </Parallax>
                </Reveal>

                {/* copy */}
                <div>
                  <Reveal y={14}>
                    <span className="grid size-14 place-items-center rounded-2xl border border-line bg-brand/10 text-brand-bright">
                      <s.icon className="size-7" aria-hidden />
                    </span>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h2 className="mt-6 font-display text-3xl leading-tight font-bold tracking-tight text-balance text-ink sm:text-4xl">
                      {s.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.16} y={16}>
                    <p className="mt-5 text-lg leading-relaxed text-ink-soft">{s.description}</p>
                  </Reveal>
                  <Reveal delay={0.24} y={16}>
                    <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-ink">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/20 text-brand-bright">
                            <Check className="size-3" strokeWidth={3} aria-hidden />
                          </span>
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.32} y={16}>
                    <Link
                      href={`/contact?service=${s.id}`}
                      className="group mt-9 inline-flex items-center gap-2 font-semibold text-brand-bright"
                    >
                      Discuss this service
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Industries />
      <Toolkit />
      <CTA />
    </>
  );
}
