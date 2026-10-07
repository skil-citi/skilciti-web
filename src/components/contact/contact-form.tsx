"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_LIMITS } from "@/lib/contact";
import { services, site, type ServiceId } from "@/lib/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-2xl border border-line bg-canvas-soft/60 px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-faint outline-none transition-[border-color,box-shadow,background-color] duration-300 hover:border-line-strong focus:border-brand-bright focus:bg-canvas-soft focus:shadow-[0_0_0_4px_rgb(var(--glow)/0.16)]";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ink">
      {children}
      {optional && <span className="text-xs font-normal text-ink-faint">Optional</span>}
    </label>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("service");
  const [service, setService] = useState<ServiceId | "">(
    services.some((s) => s.id === preset) ? (preset as ServiceId) : "",
  );
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");
    setFirstName(String(fd.get("firstName") ?? ""));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          email: fd.get("email"),
          subject: fd.get("subject"),
          message: fd.get("message"),
          company: fd.get("company"),
          service,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setService("");
      setStatus("success");
    } catch {
      setError(`Network error. Please try again, or email us at ${site.email}.`);
      setStatus("error");
    }
  }

  return (
    <div className="glass relative overflow-clip rounded-[2rem] p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand/20 blur-[90px]"
      />

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-[26rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <svg viewBox="0 0 52 52" className="size-24" aria-hidden>
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                className="stroke-brand-bright"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.path
                d="M15 27 l8 8 l15 -17"
                fill="none"
                className="stroke-brand-bright"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
            <h3 className="mt-8 font-display text-3xl font-bold text-ink">
              Thank you{firstName ? `, ${firstName}` : ""}!
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
              Your message is on its way to the Skilciti team. We&rsquo;ll be in touch soon to talk about your
              project.
            </p>
            <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            className="relative space-y-6"
            noValidate={false}
          >
            {/* honeypot — hidden from people, tempting to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-clip">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-ink">
                What do you need? <span className="text-xs font-normal text-ink-faint">Optional</span>
              </p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Service of interest">
                {services.map((s) => {
                  const active = service === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setService(active ? "" : s.id)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                        active
                          ? "border-brand-bright bg-brand/20 text-ink shadow-[0_0_0_3px_rgb(var(--glow)/0.15)]"
                          : "border-line text-ink-soft hover:border-line-strong hover:text-ink",
                      )}
                    >
                      {s.short}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  maxLength={CONTACT_LIMITS.name}
                  autoComplete="given-name"
                  placeholder="Jane"
                  className={field}
                />
              </div>
              <div>
                <Label htmlFor="lastName" optional>
                  Last name
                </Label>
                <input
                  id="lastName"
                  name="lastName"
                  maxLength={CONTACT_LIMITS.name}
                  autoComplete="family-name"
                  placeholder="Wanjiku"
                  className={field}
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={CONTACT_LIMITS.email}
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={field}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <input
                  id="subject"
                  name="subject"
                  required
                  maxLength={CONTACT_LIMITS.subject}
                  placeholder="e.g. A mobile app for my business"
                  className={field}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message">Your message</Label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={CONTACT_LIMITS.message}
                rows={6}
                placeholder="Tell us about your idea, goals and timeline…"
                className={cn(field, "resize-y")}
              />
            </div>

            <div aria-live="polite">
              {status === "error" && (
                <p className="flex items-start gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 [html[data-theme=light]_&]:text-red-700">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-faint">
                Or email us directly at{" "}
                <a href={`mailto:${site.email}`} className="text-brand-bright underline-offset-4 hover:underline">
                  {site.email}
                </a>
              </p>
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send className="size-4" aria-hidden />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
