import type { Metadata } from "next";
import { CTA } from "@/components/home/cta";
import { Hero } from "@/components/home/hero";
import { Industries } from "@/components/home/industries";
import { Manifesto } from "@/components/home/manifesto";
import { Process } from "@/components/home/process";
import { ServicesBento } from "@/components/home/services-bento";
import { TechMarquee } from "@/components/home/tech-marquee";
import { Toolkit } from "@/components/home/toolkit";
import { Values } from "@/components/home/values";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesBento />
      <Manifesto />
      <Process />
      <Industries />
      <Toolkit />
      <Values />
      <CTA />
    </>
  );
}
