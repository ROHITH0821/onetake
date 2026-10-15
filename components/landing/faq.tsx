"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { priceLabel } from "@/lib/pricing";
import { Words } from "../scroll-fx";

const faqs = [
  { q: "How much does it cost?", a: `${priceLabel} per reel. No subscription, no hidden fees.` },
  { q: "What if I don't like the edit?", a: "You approve the plan first. You don't pay for what you don't approve." },
  { q: "Will it cut out the good part?", a: "The storyboard shows exactly which moments are used, in order, before anything is made." },
  { q: "My clip is in Hindi / Telugu / Tamil.", a: "Captions come in your language. Pick it when you choose your vibe." },
  // TODO: replace with the real privacy policy summary.
  { q: "Is my video private?", a: "Placeholder: details on how clips are stored and deleted are coming soon." },
  // TODO: confirm supported payment methods.
  { q: "How do I pay?", a: "Placeholder: UPI and cards, at the moment you approve your plan." },
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className="border-b border-white/10">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold"
        >
          {q}
          <ChevronDown className={`size-5 shrink-0 text-mist transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="pb-5 text-mist">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="Fair" accent="questions." />
        </h2>
        <ul className="mt-8 border-t border-white/10">
          {faqs.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  );
}
