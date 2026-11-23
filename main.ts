// Meme Sprint: AI Agents Ship Games — entrypoint.
//
// The meme (entry.png) is pre-rendered and committed in this repository:
// a low-poly robot AI agent pressing a red SHIP IT button, a monitor showing
// a platformer, with the caption "ME: BUILD ME A GAME" / "AI AGENT: SHIPPED.
// THE FLOOR IS A BUG. I CALL IT A FEATURE."
//
// The grader image has no Python or Pillow, so this program does NOT generate
// the image at runtime. It copies the committed entry.png byte-for-byte to the
// output directory. Deterministic: no network, no clock, no randomness.

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = join(repoDir, 'entry.png');
const dst = join(outDir, 'entry.png');

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Verify the copy: the output must be byte-identical in size to the source,
// otherwise fail loudly instead of shipping a corrupt image to the judge.
const srcBytes = statSync(src).size;
const dstBytes = statSync(dst).size;
if (dstBytes !== srcBytes) {
  throw new Error(`entry.png copy failed: wrote ${dstBytes} bytes, expected ${srcBytes}`);
}
console.log(`wrote ${dst} (${dstBytes} bytes)`);
