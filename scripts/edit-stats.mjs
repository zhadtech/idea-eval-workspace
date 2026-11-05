#!/usr/bin/env node
// edit-stats.mjs: find the kinds of human edits that repeat across runs.
// It reads the log lines in EDIT-LOG.md:
//   YYYY-MM-DD | run | stage | kind | detail | fixed in
// A kind of edit seen in 2 or more runs is a repeat. Stage 05 must propose a rule for it.
// It also shows score drift: a criterion that the user keeps raising or lowering.
// Old lines with 5 fields (no kind) are counted as "untyped".
// It only prints. It changes no file.
// No dependencies. Needs Node.js 18 or newer.
//
// Usage (from the workspace root):
//   node scripts/edit-stats.mjs [EDIT-LOG.md] [--min 2]

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE = "Usage: node scripts/edit-stats.mjs [EDIT-LOG.md] [--min 2]";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function fail(msg) {
  console.error(`edit-stats.mjs: ${msg}`);
  process.exit(1);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
let min = 2;
const mi = args.indexOf("--min");
if (mi !== -1) {
  min = Number(args[mi + 1]);
  if (!Number.isInteger(min) || min < 1) fail(`--min needs a whole number of 1 or more\n${USAGE}`);
  args.splice(mi, 2);
}
const unknown = args.find((a) => a.startsWith("-"));
if (unknown) fail(`unknown option ${unknown}\n${USAGE}`);
const logPath = resolve(args[0] ?? join(root, "EDIT-LOG.md"));
const shown = relative(root, logPath).startsWith("..") ? logPath : relative(root, logPath);
if (!existsSync(logPath)) fail(`file not found: ${shown}`);

// --- Read the log lines ---
const lines = readFileSync(logPath, "utf8")
  .split(/\r?\n/)
  .filter((l) => /^\d{4}-\d{2}-\d{2}\s*\|/.test(l));
if (!lines.length) {
  console.log("No edits logged yet. Nothing repeats.");
  process.exit(0);
}

const groups = new Map(); // "stage kind" -> { stage, kind, runs, lines, fixed, last }
const allRuns = new Set();
let untyped = 0;
for (const line of lines) {
  const f = line.split("|").map((s) => s.trim());
  const [date, run = "?", stageText = "?"] = f;
  const fixed = f.at(-1) ?? "";
  let kinds = ["untyped"];
  if (f.length >= 6) kinds = f[3].split(",").map((k) => k.trim()).filter(Boolean);
  else untyped++;
  allRuns.add(run);
  const stage = stageText.match(/\d{2}/)?.[0] ?? stageText;
  for (const kind of kinds) {
    const key = `${stage} ${kind}`;
    const g = groups.get(key) ?? { stage, kind, runs: new Set(), lines: 0, fixed: 0, lastFix: "", last: "" };
    g.runs.add(run);
    g.lines++;
    if (fixed && !/^no$/i.test(fixed)) {
      g.fixed++;
      if (date > g.lastFix) g.lastFix = date;
    }
    if (date > g.last) g.last = date;
    groups.set(key, g);
  }
}

// --- Report ---
const sorted = [...groups.values()].sort((a, b) => b.runs.size - a.runs.size || a.stage.localeCompare(b.stage) || a.kind.localeCompare(b.kind));
console.log(`${shown}: ${lines.length} line(s) from ${allRuns.size} run(s).`);
console.log("");
console.log("| Stage | Kind | Runs | Lines | Fixed | Last |");
console.log("|---|---|---|---|---|---|");
for (const g of sorted) console.log(`| ${g.stage} | ${g.kind} | ${g.runs.size} | ${g.lines} | ${g.fixed} | ${g.last} |`);

const repeats = sorted.filter((g) => g.kind !== "untyped" && g.runs.size >= min);
console.log("");
if (repeats.length) {
  console.log(`Repeats (${min}+ runs). Stage 05 must propose a rule for each:`);
  for (const g of repeats) {
    let note = "";
    if (g.lastFix && g.last > g.lastFix) note = ` It came back after the fix of ${g.lastFix}, so that fix did not work.`;
    else if (g.lastFix) note = ` A fix was made on ${g.lastFix}. Check the next runs.`;
    console.log(`- ${g.stage} ${g.kind}: ${[...g.runs].join(", ")}.${note}`);
  }
} else {
  console.log(`Repeats (${min}+ runs): none.`);
}

const drift = new Map(); // C01 -> { up: Set, down: Set }
for (const g of groups.values()) {
  const m = g.kind.match(/^score:(C\d{2})([+-])$/i);
  if (!m) continue;
  const d = drift.get(m[1].toUpperCase()) ?? { up: new Set(), down: new Set() };
  for (const r of g.runs) (m[2] === "+" ? d.up : d.down).add(r);
  drift.set(m[1].toUpperCase(), d);
}
const drifting = [...drift.entries()].filter(([, d]) => d.up.size >= min || d.down.size >= min).sort();
if (drifting.length) {
  console.log("Score drift. Check these anchors in _config/criteria.md:");
  for (const [id, d] of drifting) {
    if (d.up.size >= min) console.log(`- ${id} raised by the user in ${d.up.size} runs: Claude scores it too low.`);
    if (d.down.size >= min) console.log(`- ${id} lowered by the user in ${d.down.size} runs: Claude scores it too high.`);
  }
} else {
  console.log(`Score drift (${min}+ runs): none.`);
}
if (untyped) console.log(`Untyped lines (old format, no kind): ${untyped}. Give each a kind to count it.`);
