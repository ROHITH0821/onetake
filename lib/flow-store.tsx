"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ClipType, VibeId } from "./mock-data";

export type Clip = { url: string; name: string; duration: number };

export type FlowState = {
  clip: Clip | null;
  /** True when the user chose to continue with the built-in sample. */
  sample: boolean;
  type: ClipType | null;
  vibe: VibeId | null;
  songId: string | null;
  captionStyle: string | null;
  language: string | null;
  length: string | null;
  format: string | null;
  note: string;
  chips: string[];
};

const initial: FlowState = {
  clip: null,
  sample: false,
  type: null,
  vibe: null,
  songId: null,
  captionStyle: null,
  language: null,
  length: null,
  format: null,
  note: "",
  chips: [],
};

const weights: [keyof FlowState, number][] = [
  ["vibe", 30],
  ["songId", 25],
  ["captionStyle", 15],
  ["language", 10],
  ["length", 10],
  ["format", 10],
];

export const editScore = (s: FlowState) =>
  weights.reduce((sum, [key, w]) => sum + (s[key] ? w : 0), 0);

type Ctx = {
  state: FlowState;
  set: (patch: Partial<FlowState>) => void;
  reset: () => void;
};

const FlowContext = createContext<Ctx | null>(null);

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initial);
  const set = useCallback((patch: Partial<FlowState>) => setState((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => setState(initial), []);
  const value = useMemo(() => ({ state, set, reset }), [state, set, reset]);
  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used inside <FlowProvider>");
  return ctx;
}

export const flowSteps = [
  { path: "/create/upload", label: "Upload" },
  { path: "/create/type", label: "Type" },
  { path: "/create/vibe", label: "Vibe" },
  { path: "/create/extras", label: "Extras" },
  { path: "/create/plan", label: "Plan" },
  { path: "/create/editing", label: "Editing" },
  { path: "/create/reveal", label: "Reveal" },
] as const;

export const formatTime = (seconds: number) => {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/** Final reel length in seconds for the chosen length toggle. */
export const reelSeconds = (s: FlowState) => {
  const full = s.clip?.duration ?? 45;
  if (s.length === "15s") return Math.min(15, full);
  if (s.length === "Full") return full;
  return Math.min(30, full);
};
