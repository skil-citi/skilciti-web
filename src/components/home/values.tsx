import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { values } from "@/lib/content";

export function Values({ compact = false }: { compact?: boolean }) {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our values"
          title="The principles behind every build"
          accent={["principles"]}
          description={
            compact
              ? undefined
              : "Technology changes fast. How we work with you doesn't — these four commitments shape every project we take on."
          }
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <SpotlightCard className="group relative h-full overflow-clip rounded-3xl p-7 sm:p-8">
                <span
                  aria-hidden
                  className="text-outline absolute -top-3 right-4 font-display text-8xl font-extrabold opacity-60 transition-transform duration-700 group-hover:-translate-y-1"
                >
                  0{i + 1}
                </span>
                <span className="relative grid size-14 place-items-center rounded-2xl border border-line bg-brand/10 text-brand-bright transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <v.icon className="size-7" aria-hidden />
                </span>
                <h3 className="relative mt-20 font-display text-2xl font-semibold text-ink">{v.title}</h3>
                <p className="relative mt-3 leading-relaxed text-ink-soft">{v.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
