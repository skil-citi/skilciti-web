"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > prev && latest > 320);
  });

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open, lenis]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-130%" : "0%" }}
        transition={{ duration: 0.45, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={cn(
            "mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border pr-2 pl-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 sm:h-16",
            scrolled || open
              ? "border-line bg-[var(--nav-bg)] shadow-lg shadow-black/10 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <Link href="/" aria-label="Skilciti — home" onClick={() => setOpen(false)} className="shrink-0 text-ink">
            <Logo className="h-7 w-auto sm:h-[30px]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-line bg-card-hover"
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button href="/contact" size="sm">
                Get started
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="glass grid size-10 place-items-center rounded-full text-ink md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) 2.75rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.75rem)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-canvas/95 backdrop-blur-2xl md:hidden"
          >
            <div className="bg-grid fade-mask-radial pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative flex min-h-full flex-col justify-between px-7 pt-28 pb-10">
              <nav aria-label="Mobile" className="flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.07, duration: 0.7, ease } }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "group flex items-baseline gap-4 py-2 font-display text-5xl font-bold tracking-tight",
                        isActive(item.href) ? "text-gradient" : "text-ink",
                      )}
                    >
                      <span className="font-mono text-xs font-medium text-ink-faint">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6 } }}
                className="mt-12 space-y-3 text-sm text-ink-soft"
              >
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3">
                    <Mail className="size-4 text-brand-bright" /> {site.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phoneHref}`} className="flex items-center gap-3">
                    <Phone className="size-4 text-brand-bright" /> {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="size-4 text-brand-bright" /> {site.location}
                </li>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
