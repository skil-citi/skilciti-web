import type { Metadata } from "next";
import { Compass, Cpu, Lightbulb } from "lucide-react";
import { CTA } from "@/components/home/cta";
import { Process } from "@/components/home/process";
import { Values } from "@/components/home/values";
import { Logo } from "@/components/brand/logo";
import { PageHero } from "@/components/ui/page-hero";
import { Parallax } from "@/components/ui/parallax";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Skilciti is a Kenya-based software company founded on a passion for technology and design — building innovative, impactful digital solutions for businesses of all sizes.",
  alternates: { canonical: "/about" },
};

const pillars = [
  {
    icon: Lightbulb,
    title: "Inventive thinking",
    body: "We question the brief, explore options and find smarter ways to solve the real problem.",
  },
  {
    icon: Cpu,
    title: "Technical proficiency",
    body: "Clean, scalable engineering across web, mobile and cloud — built to last, not just to launch.",
  },
  {
    icon: Compass,
    title: "Strategic planning",
    body: "Roadmaps and architecture that connect every feature to your business goals.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Skilciti"
        title="Built on a passion for technology & design"
        accent={["technology", "design"]}
        description="Skilciti is a Kenya-based software company dedicated to delivering innovative, impactful digital solutions — for startups, established companies and individual entrepreneurs alike."
      />

      {/* ------------------------------ story ------------------------------ */}
      <section className="relative py-20 sm:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <Reveal y={12}>
              <Eyebrow>Our story</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-3xl leading-tight font-bold tracking-tight text-balance text-ink sm:text-4xl">
                From a love of great products to a dependable digital partner.
              </h2>
            </Reveal>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              <Reveal delay={0.15} y={16}>
                <p>
                  Skilciti was founded with a passion for technology and design. Since then we&rsquo;ve grown into a
                  trusted collaborator for businesses across many sectors — from e-commerce and healthcare to
                  education, finance, logistics and the public sector.
                </p>
              </Reveal>
              <Reveal delay={0.25} y={16}>
                <p>
                  We specialize in user-friendly, scalable apps and visually captivating, functional websites — and
                  increasingly in the systems that sit behind them, from management platforms to digital registries. Whether you need a product built from scratch, a
                  platform modernized or an expert second opinion on your architecture, we work as an extension of
                  your team.
                </p>
              </Reveal>
              <Reveal delay={0.35} y={16}>
                <p className="font-display text-2xl font-semibold text-ink">
                  Let&rsquo;s build something amazing together.
                </p>
              </Reveal>
            </div>
          </div>

          {/* pillars with parallax logo orb */}
          <div className="relative">
            <Parallax distance={50} className="pointer-events-none absolute -top-10 -right-4 z-10 hidden sm:block">
              <div className="glass grid size-24 place-items-center rounded-[1.75rem] shadow-2xl shadow-black/30">
                <Logo variant="mark" className="size-14" />
              </div>
            </Parallax>
            <div className="space-y-5 sm:pt-10">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1} x={30} y={0}>
                  <SpotlightCard className="group flex gap-5 rounded-3xl p-6 sm:p-7">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-brand/10 text-brand-bright transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <p.icon className="size-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-soft">{p.body}</p>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ vision ----------------------------- */}
      <section className="relative overflow-clip py-28 sm:py-40">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 h-[30rem] w-[64rem] max-w-full -translate-x-1/2 -translate-y-1/2"
            style={{ background: "radial-gradient(closest-side, rgb(var(--glow) / 0.16), transparent)" }}
          />
          <Parallax distance={120} className="absolute top-[6%] left-[4%]">
            <span className="text-outline font-display text-[18rem] leading-none font-extrabold select-none sm:text-[26rem]">
              &ldquo;
            </span>
          </Parallax>
        </div>
        <div className="container-x relative">
          <div className="mx-auto max-w-5xl">
            <Eyebrow>Our vision</Eyebrow>
            <Reveal y={30} duration={1.1}>
              <blockquote className="mt-8 font-display text-[clamp(1.8rem,4.2vw,3.4rem)] leading-[1.2] font-semibold tracking-tight text-ink">
                To be the <span className="text-gradient">go-to digital partner</span> in Kenya and beyond,
                delivering transformative app and website solutions that redefine how businesses connect with their
                audiences.
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      <Values />
      <Process />
      <CTA />
    </>
  );
}
