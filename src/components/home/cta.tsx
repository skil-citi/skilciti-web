import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Parallax } from "@/components/ui/parallax";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";
import { site } from "@/lib/content";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal y={50} scale={0.97} duration={1.1}>
          <div className="gradient-border relative isolate overflow-clip rounded-[2rem] border border-line bg-canvas-soft/70 px-6 py-20 text-center sm:px-16 sm:py-28">
            {/* background decoration */}
            <div aria-hidden className="bg-grid fade-mask-radial pointer-events-none absolute inset-0 -z-10 opacity-70" />
            <Parallax distance={50} className="pointer-events-none absolute -top-32 left-1/4 -z-10">
              <div className="size-[26rem] rounded-full bg-brand/35 blur-[110px]" />
            </Parallax>
            <Parallax distance={80} className="pointer-events-none absolute -right-24 -bottom-40 -z-10">
              <div className="size-[24rem] rounded-full bg-brand-bright/25 blur-[110px]" />
            </Parallax>

            <p className="font-mono text-xs tracking-[0.25em] text-brand-bright uppercase">Ready when you are</p>
            <SplitText
              text="Let's build something amazing together!"
              accent={["amazing"]}
              className="mx-auto mt-6 max-w-3xl font-display text-4xl leading-[1.08] font-bold tracking-tight text-ink sm:text-6xl"
            />
            <Reveal delay={0.2} y={16}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                Tell us about your idea, your challenge or the system that&rsquo;s slowing you down. We&rsquo;ll help
                you find the smartest way forward.
              </p>
            </Reveal>
            <Reveal delay={0.3} y={16}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Magnetic>
                  <Button href="/contact" size="lg" arrow>
                    Start your project
                  </Button>
                </Magnetic>
                <Button href={`mailto:${site.email}`} variant="secondary" size="lg">
                  <Mail className="size-4" aria-hidden />
                  {site.email}
                </Button>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
