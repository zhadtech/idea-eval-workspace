#!/usr/bin/env node
// register.mjs: add the verdict of the current run to ideas-register.md.
// It reads the front matter of stages/04_decide/output/verdict.md.
// If the idea ID is already in the register, it replaces that row.
// No dependencies. Needs Node.js 18 or newer.
//
// Usage (from the workspace root):
//   node scripts/register.mjs [verdict.md] --dry-run   # show the row only
//   node scripts/register.mjs [verdict.md]             # write it

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE = "Usage: node scripts/register.mjs [verdict.md] [--dry-run]";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function fail(msg) {
  console.error(`register.mjs: ${msg}`);
  process.exit(1);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const dryRun = args.includes("--dry-run");
const unknown = args.find((a) => a.startsWith("-") && a !== "--dry-run");
if (unknown) fail(`unknown option ${unknown}\n${USAGE}`);
const verdictPath = resolve(args.find((a) => !a.startsWith("-")) ?? join(root, "stages", "04_decide", "output", "verdict.md"));
const registerPath = join(root, "ideas-register.md");
if (!existsSync(verdictPath)) fail(`file not found: ${relative(root, verdictPath)}`);
if (!existsSync(registerPath)) fail("ideas-register.md is missing.");

const fm = readFileSync(verdictPath, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fm) fail("verdict.md has no front matter (the block between --- lines at the top).");
const meta = Object.fromEntries(
  fm[1].split(/\r?\n/).map((l) => l.match(/^(\w+):\s*(.*)$/)).filter(Boolean).map((m) => [m[1], m[2].trim()]),
);
const missing = ["id", "title", "type", "score", "verdict"].filter((k) => !meta[k]);
if (missing.length) fail(`front matter is missing: ${missing.join(", ")}`);
if (!/^IDEA-\d{3,}$/.test(meta.id)) fail(`id must look like IDEA-001 (got "${meta.id}").`);
if (!["Pursue", "Park", "Drop"].includes(meta.verdict)) fail(`verdict must be Pursue, Park, or Drop (got "${meta.verdict}").`);

const cell = (s) => s.replace(/\|/g, "/");
const now = new Date();
const today = new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10); // local date
const row = `| ${meta.id} | ${cell(meta.title)} | ${cell(meta.type)} | ${meta.score} | ${meta.verdict} | ${today} | ${cell(meta.revisit || "-")} |`;

const lines = readFileSync(registerPath, "utf8").split("\n");
const at = lines.findIndex((l) => l.startsWith(`| ${meta.id} |`));
if (at !== -1) {
  lines[at] = row;
} else {
  const header = lines.findIndex((l) => /^\|---/.test(l));
  if (header === -1) fail("ideas-register.md has no table.");
  let end = header + 1;
  while (end < lines.length && lines[end].startsWith("|")) end++;
  lines.splice(end, 0, row);
}

console.log(`${at !== -1 ? "Replace" : "Add"}: ${row}`);
if (dryRun) {
  console.log("Dry run: the register was not changed.");
  process.exit(0);
}
writeFileSync(registerPath, lines.join("\n"));
console.log("Updated ideas-register.md.");
