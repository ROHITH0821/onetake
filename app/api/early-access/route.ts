import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { validateEarlyAccess } from "@/lib/early-access";

/**
 * Early-access sign-ups.
 *
 * Production: set EARLY_ACCESS_WEBHOOK_URL (a Google Sheets Apps Script URL,
 * Zapier/Make webhook, Formspree endpoint, etc.). Each sign-up is POSTed there
 * as JSON.
 * Development: with no webhook set, sign-ups are appended to
 * data/early-access.jsonl (git-ignored) so the form works locally.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (typeof body.company === "string" && body.company.trim()) {
    return Response.json({ ok: true });
  }

  const { data, errors } = validateEarlyAccess(body);
  if (!data) return Response.json({ errors }, { status: 422 });

  const entry = { ...data, createdAt: new Date().toISOString(), source: "landing" };
  const webhook = process.env.EARLY_ACCESS_WEBHOOK_URL;

  try {
    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else if (process.env.NODE_ENV !== "production") {
      const dir = path.join(process.cwd(), "data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "early-access.jsonl"), `${JSON.stringify(entry)}\n`);
    } else {
      console.error("EARLY_ACCESS_WEBHOOK_URL is not set; sign-up not stored.");
      return Response.json({ error: "Sign-ups aren't open yet. Please try again soon." }, { status: 503 });
    }
  } catch (err) {
    console.error("Failed to store early-access sign-up", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
