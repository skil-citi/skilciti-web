import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { toolkit } from "@/lib/content";

export function Toolkit() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Toolkit"
          title="A modern toolkit for modern products"
          accent={["modern", "toolkit"]}
          align="center"
          description="We choose the right tools for the problem — proven where it counts, cutting-edge where it pays off."
        />

        <div className="mt-16 grid gap-px overflow-clip rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {toolkit.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.06} y={20} className="bg-canvas-soft p-7">
              <h3 className="font-mono text-xs tracking-[0.2em] text-brand-bright uppercase">{group.group}</h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ink-soft">
                    <span aria-hidden className="size-1.5 rotate-45 bg-brand/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
