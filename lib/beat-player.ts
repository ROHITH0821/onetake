"use client";

import { useSyncExternalStore } from "react";
import type { Song } from "./mock-data";

// Tiny WebAudio groove so the mock sound cards have a real 15s preview
// without shipping audio files.

export const PREVIEW_SECONDS = 15;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;
let current: string | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function tone(ac: AudioContext, out: AudioNode, type: OscillatorType, freq: number, at: number, dur: number, gain: number, dropTo?: number) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  if (dropTo) osc.frequency.exponentialRampToValueAtTime(dropTo, at + dur);
  g.gain.setValueAtTime(gain, at);
  g.gain.exponentialRampToValueAtTime(0.001, at + dur);
  osc.connect(g).connect(out);
  osc.start(at);
  osc.stop(at + dur + 0.02);
}

function hat(ac: AudioContext, out: AudioNode, at: number) {
  if (!noise) {
    noise = ac.createBuffer(1, ac.sampleRate * 0.1, ac.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = ac.createBufferSource();
  const hp = ac.createBiquadFilter();
  const g = ac.createGain();
  src.buffer = noise;
  hp.type = "highpass";
  hp.frequency.value = 7000;
  g.gain.setValueAtTime(0.25, at);
  g.gain.exponentialRampToValueAtTime(0.001, at + 0.06);
  src.connect(hp).connect(g).connect(out);
  src.start(at);
}

const semi = (root: number, n: number) => root * Math.pow(2, n / 12);

export function stopPreview() {
  clearTimeout(timer);
  if (ctx && master) {
    const m = master;
    m.gain.setTargetAtTime(0, ctx.currentTime, 0.03);
    setTimeout(() => m.disconnect(), 250);
  }
  master = null;
  if (current !== null) {
    current = null;
    emit();
  }
}

export function playPreview(song: Song) {
  stopPreview();
  ctx ??= new AudioContext();
  void ctx.resume();
  const ac = ctx;
  master = ac.createGain();
  master.gain.value = 0.3;
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1800;
  lp.connect(master);
  master.connect(ac.destination);

  const beat = 60 / song.bpm;
  const start = ac.currentTime + 0.05;
  const bass = [0, 0, 7, 5, 0, 0, 3, 5];
  const arp = [12, 15, 19, 22, 24, 19, 15, 22];
  for (let i = 0; i * beat < PREVIEW_SECONDS; i++) {
    const t = start + i * beat;
    tone(ac, master, "sine", 150, t, 0.22, 0.9, 40);
    hat(ac, master, t + beat / 2);
    tone(ac, lp, song.wave, semi(song.root, bass[i % bass.length]), t, beat * 0.9, 0.35);
    tone(ac, lp, "triangle", semi(song.root * 2, arp[i % arp.length]), t, beat * 0.45, 0.12);
    tone(ac, lp, "triangle", semi(song.root * 2, arp[(i + 3) % arp.length]), t + beat / 2, beat * 0.45, 0.1);
  }

  current = song.id;
  emit();
  timer = setTimeout(stopPreview, PREVIEW_SECONDS * 1000);
}

export function togglePreview(song: Song) {
  if (current === song.id) stopPreview();
  else playPreview(song);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

/** Id of the song currently previewing, or null. */
export function usePlayingId() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
