import { Marquee } from "@/components/ui/marquee";
import { marqueeItems } from "@/lib/content";

export function TechMarquee() {
  return (
    <section aria-label="Capabilities" className="relative border-y border-line bg-canvas-soft/50 py-7">
      <Marquee>
        {marqueeItems.map((item) => (
          <span
            key={item}
            className="flex items-center gap-10 font-display text-xl font-semibold whitespace-nowrap text-ink-soft sm:text-2xl"
          >
            {item}
            <span aria-hidden className="size-2 rotate-45 bg-brand" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
