#!/usr/bin/env node
// archive-run.mjs: move a finished idea run to archive/<run-id>/.
// It moves every file in stages/*/input/ and stages/*/output/ (but not .gitkeep)
// and PROGRESS.md. Then it makes a fresh PROGRESS.md from setup/progress-template.md.
// It skips stages/00_scout/ and stages/00_screen/: scans, the feed log, and shortlists stay for later runs.
// It does not touch _config/, references/, EDIT-LOG.md, or ideas-register.md.
// With no run ID, it reads "Run ID:" from PROGRESS.md.
// No dependencies. Needs Node.js 18 or newer.
//
// Usage (from the workspace root):
//   node scripts/archive-run.mjs [run-id] --dry-run   # show what will move
//   node scripts/archive-run.mjs [run-id]             # move it

import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE = "Usage: node scripts/archive-run.mjs [run-id] [--dry-run]";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function fail(msg) {
  console.error(`archive-run.mjs: ${msg}`);
  process.exit(1);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const dryRun = args.includes("--dry-run");
const unknown = args.find((a) => a.startsWith("-") && a !== "--dry-run");
if (unknown) fail(`unknown option ${unknown}\n${USAGE}`);
const progress = join(root, "PROGRESS.md");
let slug = args.find((a) => !a.startsWith("-"));
if (!slug && existsSync(progress)) slug = readFileSync(progress, "utf8").match(/^Run ID:\s*(IDEA-[^\s·]+)/m)?.[1];
if (!slug) fail(`give the run ID, for example IDEA-001-faceless-sql-channel\n${USAGE}`);
if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(slug)) {
  fail(`"${slug}" is not a valid slug. Use letters, digits, ".", "_", and "-".`);
}

const stagesDir = join(root, "stages");
if (!existsSync(stagesDir)) fail("no stages/ folder found next to scripts/.");
const dest = join(root, "archive", slug);
if (existsSync(dest)) fail(`archive/${slug} already exists. Nothing was moved.`);

const KEEP = new Set(["00_scout", "00_screen"]); // these stages are not part of one idea run
const moves = [];
for (const stage of readdirSync(stagesDir, { withFileTypes: true })) {
  if (!stage.isDirectory() || KEEP.has(stage.name)) continue;
  for (const sub of ["input", "output"]) {
    const dir = join(stagesDir, stage.name, sub);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (name !== ".gitkeep") moves.push([join(dir, name), join(dest, stage.name, sub, name)]);
    }
  }
}
if (!moves.length) fail("the stage input/ and output/ folders are empty. Nothing was moved.");

const template = join(root, "setup", "progress-template.md");
if (existsSync(progress)) moves.push([progress, join(dest, "PROGRESS.md")]);

const rel = (p) => relative(root, p);
console.log(`${dryRun ? "Would move" : "Moving"} ${moves.length} item(s) to archive/${slug}/:`);
for (const [from, to] of moves) console.log(`  ${rel(from)} -> ${rel(to)}`);
if (dryRun) {
  console.log("Dry run: nothing was moved.");
  process.exit(0);
}

for (const [from, to] of moves) {
  mkdirSync(dirname(to), { recursive: true });
  try {
    renameSync(from, to);
  } catch (e) {
    if (e.code !== "EXDEV") throw e;
    cpSync(from, to, { recursive: true }); // other disk: copy, then remove the original
    rmSync(from, { recursive: true });
  }
}

if (existsSync(template)) {
  copyFileSync(template, progress);
  console.log("Made a fresh PROGRESS.md from setup/progress-template.md.");
} else {
  console.log("Warning: setup/progress-template.md is missing. Make a new PROGRESS.md by hand.");
}
console.log(`Done. The run is in archive/${slug}/.`);
