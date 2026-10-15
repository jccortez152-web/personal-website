// Server-only: resolves demo video base names to files in public/videos at
// build time. A card gets a player only if <name>.mp4 exists, so dropping a
// new MP4 into public/videos (poster optional) and rebuilding is all it takes.
// Captions work the same way: public/videos/captions/<name>.vtt.

import { existsSync } from "node:fs";
import { join } from "node:path";

export type VideoAsset = { src: string; poster?: string; captions?: string };
export type VideoMap = Record<string, VideoAsset>;

const dir = join(process.cwd(), "public", "videos");

export function getVideos(names: (string | undefined)[]): VideoMap {
  const map: VideoMap = {};
  for (const name of names) {
    if (!name || !existsSync(join(dir, `${name}.mp4`))) continue;
    const hasPoster = existsSync(join(dir, "posters", `${name}.jpg`));
    const hasCaptions = existsSync(join(dir, "captions", `${name}.vtt`));
    map[name] = {
      src: `/videos/${name}.mp4`,
      poster: hasPoster ? `/videos/posters/${name}.jpg` : undefined,
      captions: hasCaptions ? `/videos/captions/${name}.vtt` : undefined,
    };
  }
  return map;
}
