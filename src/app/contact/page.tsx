import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Skilciti in Nairobi, Kenya to discuss your project, learn more about our services or ask any questions.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "Best for project briefs",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    hint: "Speak to the team",
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.location,
    href: undefined,
    hint: "Serving Kenya and beyond",
  },
] as const;

const next = [
  "Tell us about your idea, challenge or system.",
  "We get back to you to understand the details.",
  "You receive a clear, practical plan to move forward.",
];

function FormFallback() {
  return <div className="glass min-h-[40rem] animate-pulse rounded-[2rem]" aria-hidden />;
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We'd love to hear from you"
        accent={["love", "hear"]}
        description="Get in touch to discuss your project, learn more about our services or ask any questions."
      />

      <section className="relative pb-28 sm:pb-36">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="space-y-5">
            {channels.map((c, i) => {
              const inner = (
                <SpotlightCard className="group flex items-center gap-5 rounded-3xl p-6">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-brand/10 text-brand-bright transition-all duration-500 group-hover:bg-brand group-hover:text-on-brand">
                    <c.icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase">{c.label}</p>
                    <p className="mt-1 truncate font-display text-lg font-semibold text-ink sm:text-xl">{c.value}</p>
                    <p className="text-sm text-ink-soft">{c.hint}</p>
                  </div>
                  {c.href && (
                    <ArrowUpRight className="size-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-bright" />
                  )}
                </SpotlightCard>
              );
              return (
                <Reveal key={c.label} delay={i * 0.08} x={-24} y={0}>
                  {c.href ? (
                    <a href={c.href} className="block rounded-3xl">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={0.3} y={20}>
              <div className="rounded-3xl border border-line p-7">
                <p className="font-mono text-[11px] tracking-[0.2em] text-brand-bright uppercase">What happens next</p>
                <ol className="mt-5 space-y-4">
                  {next.map((step, i) => (
                    <li key={step} className="flex gap-4 text-ink-soft">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-xs text-ink">
                        {i + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <Reveal y={40} duration={1}>
            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
