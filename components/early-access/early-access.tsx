"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import Link from "next/link";
import { Check, LoaderCircle, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { earlyAccess } from "@/lib/content";
import { ROLES, type FieldErrors, type Role } from "@/lib/early-access";
import { PRIVACY_HREF } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GradientButton } from "../gradient-button";

const EarlyAccessContext = createContext<(() => void) | null>(null);

/** Opens the early-access form. */
export function useEarlyAccess() {
  const open = useContext(EarlyAccessContext);
  if (!open) throw new Error("useEarlyAccess must be used inside <EarlyAccessProvider>");
  return open;
}

type Status = "idle" | "sending" | "done";

const inputClass =
  "h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-base text-foreground placeholder:text-mist/60 transition-colors focus:border-pink focus:outline-none aria-[invalid=true]:border-destructive";

function Field({ label, optional, error, id, children }: { label: string; optional?: boolean; error?: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium">
        {label}
        {optional && <span className="text-xs font-normal text-mist">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function EarlyAccessForm({ onClose }: { onClose: () => void }) {
  const ids = { name: useId(), phone: useId(), email: useId(), instagram: useId(), role: useId() };
  const [role, setRole] = useState<Role | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(form), role: role ?? "" };
    setStatus("sending");
    setFormError(null);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("done");
        return;
      }
      setErrors(json.errors ?? {});
      setFormError(json.errors ? null : (json.error ?? "Something went wrong. Please try again."));
    } catch {
      setFormError("Couldn't reach us. Check your connection and try again.");
    }
    setStatus("idle");
  }

  if (status === "done") {
    return (
      <motion.div className="py-6 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-ink">
          <Check className="size-8" strokeWidth={3} />
        </span>
        <h2 className="mt-5 text-3xl font-semibold">{earlyAccess.successTitle}</h2>
        <p className="mx-auto mt-2 max-w-xs text-mist">{earlyAccess.successBody}</p>
        <button type="button" onClick={onClose} className="mt-6 h-11 rounded-full border border-white/15 px-6 text-sm font-medium hover:bg-white/10">
          Done
        </button>
      </motion.div>
    );
  }

  const describe = (key: keyof FieldErrors, id: string) => (errors[key] ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {});

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field label="Name" id={ids.name} error={errors.name}>
        <input id={ids.name} name="name" autoComplete="name" required className={inputClass} placeholder="Your name" {...describe("name", ids.name)} />
      </Field>

      <Field label="WhatsApp number" id={ids.phone} error={errors.phone}>
        <div className="flex">
          <span className="grid h-12 place-items-center rounded-l-xl border border-r-0 border-white/15 bg-white/10 px-3 text-mist">+91</span>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            maxLength={14}
            className={cn(inputClass, "rounded-l-none")}
            placeholder="98765 43210"
            {...describe("phone", ids.phone)}
          />
        </div>
      </Field>

      <div role="radiogroup" aria-labelledby={ids.role} aria-describedby={errors.role ? `${ids.role}-error` : undefined}>
        <p id={ids.role} className="mb-1.5 text-sm font-medium">
          I&apos;m a
        </p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={role === r}
              onClick={() => setRole(r)}
              className={cn(
                "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
                role === r ? "border-transparent bg-brand text-white" : "border-white/15 bg-white/5 hover:bg-white/10",
              )}
            >
              {r}
            </button>
          ))}
        </div>
        {errors.role && (
          <p id={`${ids.role}-error`} className="mt-1.5 text-xs text-destructive">
            {errors.role}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" optional id={ids.email} error={errors.email}>
          <input id={ids.email} name="email" type="email" autoComplete="email" className={inputClass} placeholder="you@email.com" {...describe("email", ids.email)} />
        </Field>
        <Field label="Instagram" optional id={ids.instagram} error={errors.instagram}>
          <input id={ids.instagram} name="instagram" autoCapitalize="none" className={inputClass} placeholder="@yourhandle" {...describe("instagram", ids.instagram)} />
        </Field>
      </div>

      {/* Honeypot for bots; hidden from people and screen readers. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] size-px opacity-0" />

      {formError && (
        <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {formError}
        </p>
      )}

      <GradientButton type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? <LoaderCircle className="animate-spin" /> : earlyAccess.submit}
      </GradientButton>
      <p className="text-center text-xs text-mist">
        {earlyAccess.privacy}{" "}
        <Link href={PRIVACY_HREF} className="underline underline-offset-2 hover:text-foreground">
          Privacy policy
        </Link>
      </p>
    </form>
  );
}

/** Provides the early-access dialog to every CTA under it. */
export function EarlyAccessProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const lenis = useLenis();

  const show = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  // Links like /#early-access (e.g. from the blog) open the form on arrival.
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== "#early-access") return;
      history.replaceState(null, "", window.location.pathname + window.location.search);
      setOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFirst = setTimeout(() => panel.current?.querySelector<HTMLElement>("input, button")?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panel.current) return;
      // Keep focus inside the dialog.
      const items = panel.current.querySelectorAll<HTMLElement>('button, input:not([tabindex="-1"]), [href]');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
      opener.current?.focus();
    };
  }, [open, close, lenis]);

  return (
    <EarlyAccessContext.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
            data-lenis-prevent
          >
            <motion.div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-white/10 bg-ink-2 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-[2rem] sm:p-8"
              initial={{ y: "100%", opacity: 0.6 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-mist hover:bg-white/10 hover:text-foreground"
              >
                <X className="size-5" />
              </button>
              <div className="mb-6 pr-10">
                <h2 id={titleId} className="text-3xl font-semibold tracking-tight">
                  {earlyAccess.title}
                </h2>
                <p className="mt-2 text-sm text-mist">{earlyAccess.subtitle}</p>
              </div>
              <EarlyAccessForm onClose={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </EarlyAccessContext.Provider>
  );
}

type EarlyAccessButtonProps = {
  children: React.ReactNode;
  className?: string;
  /** "gradient" uses the brand button; "plain" renders a bare button you style yourself. */
  variant?: "gradient" | "plain";
  size?: "sm" | "md" | "lg";
};

/** Any CTA that should open the early-access form. */
export function EarlyAccessButton({ children, className, variant = "gradient", size = "md" }: EarlyAccessButtonProps) {
  const open = useEarlyAccess();
  if (variant === "plain") {
    return (
      <button type="button" onClick={open} className={className} aria-haspopup="dialog">
        {children}
      </button>
    );
  }
  return (
    <GradientButton size={size} className={className} onClick={open} aria-haspopup="dialog">
      {children}
    </GradientButton>
  );
}

/**
 * A real link to the early-access form (/#early-access). Works without
 * JavaScript; with it, opens the form in place when a provider is present.
 */
export function EarlyAccessLink({ children, className }: { children: React.ReactNode; className?: string }) {
  const open = useContext(EarlyAccessContext);
  return (
    <Link
      href="/#early-access"
      className={className}
      onClick={(e) => {
        if (!open) return;
        e.preventDefault();
        open();
      }}
    >
      {children}
    </Link>
  );
}
