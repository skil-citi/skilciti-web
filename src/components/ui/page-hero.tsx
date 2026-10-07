import type { ReactNode } from "react";
import { Parallax } from "./parallax";
import { Reveal } from "./reveal";
import { Eyebrow } from "./section-heading";
import { SplitText } from "./split-text";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string[];
  description?: string;
  children?: ReactNode;
};

/** Shared inner-page header with parallax glow orbs and a faded grid. */
export function PageHero({ eyebrow, title, accent, description, children }: Props) {
  return (
    <section className="relative isolate overflow-clip pt-40 pb-16 sm:pt-48 sm:pb-24">
      <div aria-hidden className="bg-grid fade-mask-radial pointer-events-none absolute inset-0 -z-10" />
      <Parallax distance={70} className="pointer-events-none absolute -top-40 -left-32 -z-10">
        <div className="size-[34rem] rounded-full bg-brand/30 blur-[130px]" />
      </Parallax>
      <Parallax distance={110} className="pointer-events-none absolute top-10 -right-40 -z-10">
        <div className="size-[30rem] rounded-full bg-brand-bright/20 blur-[130px]" />
      </Parallax>
      <Parallax distance={90} rotate={25} className="pointer-events-none absolute right-[14%] bottom-8 -z-10 hidden lg:block">
        <div className="size-20 rotate-12 rounded-2xl border border-brand/40 bg-brand/10 backdrop-blur-sm" />
      </Parallax>

      <div className="container-x">
        <Reveal y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          trigger="mount"
          delay={0.1}
          text={title}
          accent={accent}
          className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6.4vw,5rem)] leading-[1.05] font-bold tracking-tight text-balance text-ink"
        />
        {description && (
          <Reveal delay={0.35} y={18}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{description}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.5} y={18}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
