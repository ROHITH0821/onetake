import type { EarlyAccessInput } from "./early-access";

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** True when Resend and at least one recipient are configured. */
export const emailConfigured = () =>
  Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL && process.env.EARLY_ACCESS_NOTIFY_EMAILS);

/** Emails the team about a new early-access sign-up via the Resend API. */
export async function sendSignupEmail(entry: EarlyAccessInput & { createdAt: string }) {
  const to = (process.env.EARLY_ACCESS_NOTIFY_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const rows: [string, string | undefined][] = [
    ["Name", entry.name],
    ["WhatsApp", entry.phone],
    ["Role", entry.role],
    ["Email", entry.email],
    ["Instagram", entry.instagram ? `@${entry.instagram}` : undefined],
    ["Signed up", new Date(entry.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
      <h2 style="margin:0 0 12px">New OneTake early-access sign-up</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .filter(([, v]) => v)
          .map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escape(v!)}</strong></td></tr>`)
          .join("")}
      </table>
      <p style="margin-top:16px"><a href="https://wa.me/${entry.phone.replace("+", "")}">Message on WhatsApp</a></p>
    </div>`;

  const text = rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `OneTake <${process.env.RESEND_FROM_EMAIL}>`,
      to,
      subject: `New early-access sign-up: ${entry.name} (${entry.role})`,
      html,
      text,
      ...(entry.email ? { reply_to: entry.email } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}
