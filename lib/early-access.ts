// Shared between the early-access form and its API route.

export const ROLES = ["Creator", "Business", "Personal", "Agency"] as const;
export type Role = (typeof ROLES)[number];

export type EarlyAccessInput = {
  name: string;
  phone: string;
  email?: string;
  role: Role;
  instagram?: string;
};

export type FieldErrors = Partial<Record<keyof EarlyAccessInput, string>>;

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Validates raw form data. Returns the cleaned input, or per-field errors. */
export function validateEarlyAccess(raw: Record<string, unknown>): { data?: EarlyAccessInput; errors?: FieldErrors } {
  const name = clean(raw.name).slice(0, 80);
  const phone = clean(raw.phone).replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, "");
  const email = clean(raw.email).slice(0, 120);
  const role = clean(raw.role) as Role;
  const instagram = clean(raw.instagram).replace(/^@/, "").slice(0, 40);

  const errors: FieldErrors = {};
  if (name.length < 2) errors.name = "Tell us your name.";
  if (!/^[6-9]\d{9}$/.test(phone)) errors.phone = "Enter a 10-digit Indian mobile number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That email doesn't look right.";
  if (!ROLES.includes(role)) errors.role = "Pick one.";
  if (instagram && !/^[A-Za-z0-9._]{1,30}$/.test(instagram)) errors.instagram = "Use just your handle, like onetake.app";

  if (Object.keys(errors).length) return { errors };
  return { data: { name, phone: `+91${phone}`, email: email || undefined, role, instagram: instagram || undefined } };
}
