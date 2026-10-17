import { AudioLines, Captions, Clock, Scissors, Sparkles, type LucideIcon } from "lucide-react";

/** Maps icon names used in lib/content.ts to lucide icons. */
export const icons: Record<string, LucideIcon> = {
  audio: AudioLines,
  captions: Captions,
  clock: Clock,
  scissors: Scissors,
  sparkles: Sparkles,
};
