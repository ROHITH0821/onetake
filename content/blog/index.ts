// Every post file is registered here. To add a post: create a file in this
// folder exporting `post`, then add it to the list below.
import { post as hindiTeluguCaptions } from "./hindi-telugu-captions-for-reels";
import { post as turnPhoneClipIntoReel } from "./turn-phone-clip-into-reel";
import type { PostInput } from "./types";
import { post as whyEditingAReelTakesHours } from "./why-editing-a-reel-takes-hours";
import { post as whyClipsNeverGetPosted } from "./why-phone-clips-never-get-posted";

export const posts: PostInput[] = [whyEditingAReelTakesHours, turnPhoneClipIntoReel, whyClipsNeverGetPosted, hindiTeluguCaptions];
