import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SplitText } from "./split-text";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string[];
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-bright",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-gradient-to-r from-brand to-transparent" />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, accent, description, align = "left", className }: Props) {
  const center = align === "center";
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <Reveal y={12}>
        <Eyebrow className={center ? "justify-center" : undefined}>{eyebrow}</Eyebrow>
      </Reveal>
      <SplitText
        text={title}
        accent={accent}
        className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
      />
      {description && (
        <Reveal delay={0.15} y={16}>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
