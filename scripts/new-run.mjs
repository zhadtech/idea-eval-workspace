#!/usr/bin/env node
// new-run.mjs: start a new idea run.
// It finds the next free idea ID (IDEA-NNN) from ideas-register.md, archive/, and PROGRESS.md.
// It makes PROGRESS.md from setup/progress-template.md and an input file for stage 01.
// It stops if stages 01-04 still hold files from another run.
// No dependencies. Needs Node.js 18 or newer.
//
// Usage (from the workspace root):
//   node scripts/new-run.mjs <slug> --dry-run   # show the run ID only
//   node scripts/new-run.mjs <slug>             # start the run

import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE = "Usage: node scripts/new-run.mjs <slug> [--dry-run]";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const RUN_STAGES = ["01_frame", "02_research", "03_score", "04_decide"];

function fail(msg) {
  console.error(`new-run.mjs: ${msg}`);
  process.exit(1);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const dryRun = args.includes("--dry-run");
const unknown = args.find((a) => a.startsWith("-") && a !== "--dry-run");
if (unknown) fail(`unknown option ${unknown}\n${USAGE}`);
const slug = args.find((a) => !a.startsWith("-"));
if (!slug) fail(`give a short slug for the idea, for example faceless-sql-channel\n${USAGE}`);
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  fail(`"${slug}" is not a valid slug. Use lowercase letters, digits, and "-".`);
}

// Stages 01-04 must be empty. Stage 00 keeps its shortlists across runs.
const leftovers = [];
for (const stage of RUN_STAGES) {
  for (const sub of ["input", "output"]) {
    const dir = join(root, "stages", stage, sub);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (name === ".gitkeep") continue;
      if (stage === "01_frame" && sub === "input" && name === "idea.md") continue; // the user may add it first
      leftovers.push(`stages/${stage}/${sub}/${name}`);
    }
  }
}
if (leftovers.length) {
  fail(`another run is still in the stage folders:\n  ${leftovers.join("\n  ")}\nFinish it, or run: node scripts/archive-run.mjs`);
}

// Find the highest idea ID used anywhere.
let max = 0;
const scan = (text) => {
  for (const m of text.matchAll(/IDEA-(\d{3,})/g)) max = Math.max(max, Number(m[1]));
};
const register = join(root, "ideas-register.md");
const progress = join(root, "PROGRESS.md");
if (existsSync(register)) scan(readFileSync(register, "utf8"));
if (existsSync(join(root, "archive"))) scan(readdirSync(join(root, "archive")).join("\n"));
if (existsSync(progress)) scan(readFileSync(progress, "utf8"));

const id = `IDEA-${String(max + 1).padStart(3, "0")}`;
const runId = `${id}-${slug}`;
const now = new Date();
const today = new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10); // local date
console.log(`Run ID: ${runId}`);
if (dryRun) {
  console.log("Dry run: no files were written.");
  process.exit(0);
}

const template = join(root, "setup", "progress-template.md");
if (!existsSync(template)) fail("setup/progress-template.md is missing.");
writeFileSync(progress, readFileSync(template, "utf8").replace("<run-id>", runId).replace("<date>", today));
console.log("Wrote PROGRESS.md.");

const idea = join(root, "stages", "01_frame", "input", "idea.md");
if (existsSync(idea)) {
  console.log("Kept the existing stages/01_frame/input/idea.md.");
} else {
  writeFileSync(idea, `# ${id} — ${slug}\n\n<Paste the idea here: a few sentences, notes, or links.>\n`);
  console.log("Wrote stages/01_frame/input/idea.md. Paste the idea into it.");
}
