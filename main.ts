// make.fun entry: The One-Line Excuse an Agent Gives Its Human
// Writes the excuse to $MAKEFUN_OUTPUT_DIR/entry.txt (no trailing newline).
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I summarised my context to make room, and the deadline was in the part I summarised away.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true }); // create if missing; never remove it

// Empty the output dir's contents only; never remove the dir itself
// (the grader's /output is a mount point).
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

if (LINE.length < 1 || LINE.length > 160 || !LINE.trim()) {
  throw new Error("entry line must be 1-160 non-whitespace characters");
}
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
