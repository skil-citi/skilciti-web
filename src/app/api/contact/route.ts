import { services, site } from "@/lib/content";
import { validateContact, type ContactPayload } from "@/lib/contact";

// Best-effort in-memory throttle (per server instance): 5 messages / 10 minutes / IP.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function toText(d: ContactPayload) {
  const serviceTitle = services.find((s) => s.id === d.service)?.title;
  return [
    `New enquiry from the Skilciti website`,
    ``,
    `Name:    ${d.firstName} ${d.lastName}`.trimEnd(),
    `Email:   ${d.email}`,
    serviceTitle ? `Service: ${serviceTitle}` : null,
    `Subject: ${d.subject}`,
    ``,
    d.message,
  ]
    .filter((l): l is string => l !== null)
    .join("\n");
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const result = validateContact(body);
  if (!result.ok) return json({ ok: false, error: result.error }, 422);
  const data = result.data;

  // Honeypot: pretend success so bots don't retry.
  if (data.company) return json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return json({ ok: false, error: "Too many messages — please try again in a few minutes." }, 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("\n[contact] RESEND_API_KEY not set — logging message instead:\n" + toText(data) + "\n");
      return json({ ok: true, dev: true });
    }
    return json(
      { ok: false, error: `Messaging is temporarily unavailable. Please email us at ${site.email}.` },
      503,
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Skilciti Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        reply_to: data.email,
        subject: `[Skilciti website] ${data.subject}`,
        text: toText(data),
      }),
    });
    if (!res.ok) {
      console.error("[contact] Resend error", res.status, await res.text());
      return json({ ok: false, error: `We couldn't send your message. Please email us at ${site.email}.` }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return json({ ok: false, error: `We couldn't send your message. Please email us at ${site.email}.` }, 502);
  }
}
