import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { validateEarlyAccess } from "@/lib/early-access";
import { emailConfigured, sendSignupEmail } from "@/lib/notify-email";

/**
 * Early-access sign-ups. Each one is sent to every configured destination:
 * - Email to the team via Resend (RESEND_API_KEY, RESEND_FROM_EMAIL,
 *   EARLY_ACCESS_NOTIFY_EMAILS).
 * - Optional JSON webhook (EARLY_ACCESS_WEBHOOK_URL), e.g. a Google Sheet.
 * - In development only, a local data/early-access.jsonl file (git-ignored).
 * The request succeeds if at least one destination stored it.
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
  const tasks: Promise<unknown>[] = [];

  if (emailConfigured()) tasks.push(sendSignupEmail(entry));
  if (webhook) {
    tasks.push(
      fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(entry) }).then((res) => {
        if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      }),
    );
  }
  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), "data");
    tasks.push(mkdir(dir, { recursive: true }).then(() => appendFile(path.join(dir, "early-access.jsonl"), `${JSON.stringify(entry)}\n`)));
  }

  if (tasks.length === 0) {
    console.error("No early-access destination configured; sign-up not stored.");
    return Response.json({ error: "Sign-ups aren't open yet. Please try again soon." }, { status: 503 });
  }

  const results = await Promise.allSettled(tasks);
  results.forEach((r) => r.status === "rejected" && console.error("Early-access destination failed:", r.reason));
  if (!results.some((r) => r.status === "fulfilled")) {
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
