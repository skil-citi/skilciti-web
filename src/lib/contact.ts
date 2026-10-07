/** Shared between the contact form (client) and the /api/contact route (server). */
export const CONTACT_LIMITS = {
  name: 60,
  email: 120,
  subject: 140,
  message: 4000,
} as const;

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  service?: string;
  /** Honeypot — real users never fill this in. */
  company?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: Partial<ContactPayload>): { ok: true; data: ContactPayload } | { ok: false; error: string } {
  const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  const data: ContactPayload = {
    firstName: clean(input.firstName, CONTACT_LIMITS.name),
    lastName: clean(input.lastName, CONTACT_LIMITS.name),
    email: clean(input.email, CONTACT_LIMITS.email),
    subject: clean(input.subject, CONTACT_LIMITS.subject),
    message: clean(input.message, CONTACT_LIMITS.message),
    service: clean(input.service, 60),
    company: clean(input.company, 200),
  };

  if (!data.firstName) return { ok: false, error: "Please enter your first name." };
  if (!EMAIL_RE.test(data.email)) return { ok: false, error: "Please enter a valid email address." };
  if (!data.subject) return { ok: false, error: "Please add a subject." };
  if (data.message.length < 10) return { ok: false, error: "Please tell us a little more about your project." };

  return { ok: true, data };
}
