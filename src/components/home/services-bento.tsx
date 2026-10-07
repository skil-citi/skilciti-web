import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { services, type ServiceId } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ServiceArt } from "./service-art";

const spans: Record<ServiceId, string> = {
  "custom-software": "lg:col-span-7",
  "mobile-apps": "lg:col-span-5",
  "web-apps": "lg:col-span-4",
  websites: "lg:col-span-4",
  "ui-ux": "lg:col-span-4",
  consulting: "lg:col-span-5",
  support: "lg:col-span-7",
};

export function ServicesBento() {
  return (
    <section id="services" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title="Everything you need to design, build & scale"
          accent={["design,", "build", "scale"]}
          description="One partner from the first sketch to the final deploy — mobile and web apps, custom software, thoughtful design and the systems thinking that holds it all together."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08} className={cn("h-full", spans[s.id])}>
              <SpotlightCard className="group flex h-full flex-col overflow-clip rounded-3xl p-7 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl border border-line bg-brand/10 text-brand-bright transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <s.icon className="size-6" aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                </div>

                <div className="my-7 flex h-36 items-center justify-center opacity-80 transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100">
                  <ServiceArt id={s.id} />
                </div>

                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.description}</p>

                <Link
                  href={`/services#${s.id}`}
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright after:absolute after:inset-0 after:content-['']"
                >
                  Learn more
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
