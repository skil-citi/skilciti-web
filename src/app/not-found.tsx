import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative grid min-h-[100svh] place-items-center overflow-clip px-6 text-center">
      <div aria-hidden className="bg-grid fade-mask-radial pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[120px]"
      />
      <div className="relative">
        <p className="font-mono text-sm tracking-[0.25em] text-brand-bright uppercase">Error 404</p>
        <h1 className="text-gradient mt-4 font-display text-[clamp(6rem,24vw,16rem)] leading-none font-extrabold tracking-tighter">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          This page drifted off the map. Let&rsquo;s get you back to something that works.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" arrow>
            Back home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
