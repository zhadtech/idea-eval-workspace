#!/usr/bin/env node
// score.mjs: turn scores.json into a weighted score and a verdict.
// It reads the weights, deal-breakers, bands, and caps from _config/criteria.md,
// so the rules live in one place. It writes stages/03_score/output/score-result.md.
// No dependencies. Needs Node.js 18 or newer.
//
// Usage (from the workspace root):
//   node scripts/score.mjs                      # default paths
//   node scripts/score.mjs <scores.json> [--criteria <file>] [--out <file>]

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE = "Usage: node scripts/score.mjs [scores.json] [--criteria <file>] [--out <file>]";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);

function fail(msg) {
  console.error(`score.mjs: ${msg}`);
  process.exit(1);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const opt = (name) => {
  const i = args.indexOf(name);
  if (i === -1) return null;
  if (!args[i + 1] || args[i + 1].startsWith("-")) fail(`${name} needs a path\n${USAGE}`);
  return args.splice(i, 2)[1];
};
const criteriaPath = resolve(opt("--criteria") ?? join(root, "_config", "criteria.md"));
const outPath = resolve(opt("--out") ?? join(root, "stages", "03_score", "output", "score-result.md"));
const unknown = args.find((a) => a.startsWith("-"));
if (unknown) fail(`unknown option ${unknown}\n${USAGE}`);
const scoresPath = resolve(args[0] ?? join(root, "stages", "03_score", "output", "scores.json"));

for (const p of [criteriaPath, scoresPath]) if (!existsSync(p)) fail(`file not found: ${relative(root, p)}`);

// --- Read the rules from criteria.md ---
const md = readFileSync(criteriaPath, "utf8");
const criteria = [...md.matchAll(/^\|\s*(C\d{2})\s*\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|/gm)].map((m) => ({
  id: m[1], name: m[2], weight: Number(m[3]),
}));
const breakers = [...md.matchAll(/^\|\s*(D\d{2})\s*\|\s*([^|]+?)\s*\|/gm)].map((m) => ({ id: m[1], name: m[2] }));
const bands = [...md.matchAll(/^\|\s*(Pursue|Park|Drop)\s*\|\s*([\d.]+)\s*\|/gm)]
  .map((m) => ({ band: m[1], min: Number(m[2]) }))
  .sort((a, b) => b.min - a.min);
const capMatch = md.match(/^\|\s*Low-confidence cap\s*\|\s*(\d+)\s*\|/m);

if (!criteria.length) fail("no criteria rows (| C01 | name | weight |) found in criteria.md.");
if (bands.length !== 3) fail("criteria.md needs one band row each for Pursue, Park, and Drop.");
if (!capMatch) fail("criteria.md needs a row: | Low-confidence cap | <percent> |");
const lowCap = Number(capMatch[1]);
const totalWeight = criteria.reduce((s, c) => s + c.weight, 0);
if (totalWeight <= 0) fail("the criteria weights add up to 0.");

// --- Read and check scores.json ---
let data;
try {
  data = JSON.parse(readFileSync(scoresPath, "utf8"));
} catch (e) {
  fail(`${relative(root, scoresPath)} is not valid JSON: ${e.message}`);
}
const errors = [];
const warnings = [];
const scores = data.scores ?? {};
const dbs = data.deal_breakers ?? {};
if (!/^IDEA-\d{3,}$/.test(data.idea_id ?? "")) errors.push(`idea_id must look like IDEA-001 (got "${data.idea_id ?? ""}").`);

for (const c of criteria) {
  const s = scores[c.id];
  if (!s) { errors.push(`${c.id} (${c.name}) has no score.`); continue; }
  if (!Number.isInteger(s.score) || s.score < 1 || s.score > 5) errors.push(`${c.id}: score must be a whole number 1-5 (got ${s.score}).`);
  if (!["high", "medium", "low"].includes(s.confidence)) errors.push(`${c.id}: confidence must be high, medium, or low (got ${s.confidence}).`);
  const f = s.findings ?? [];
  if ((s.score >= 4 || s.score <= 2) && !f.length) warnings.push(`${c.id}: a score of ${s.score} cites no findings.`);
  if (!f.length && s.score > 3) errors.push(`${c.id}: no evidence means a 3 at most (got ${s.score}).`);
}
for (const id of Object.keys(scores)) if (!criteria.some((c) => c.id === id)) errors.push(`${id} is not a criterion in criteria.md.`);
for (const d of breakers) {
  const s = dbs[d.id];
  if (!s) errors.push(`${d.id} (${d.name}) has no status.`);
  else if (!["hit", "clear", "unsure"].includes(s.status)) errors.push(`${d.id}: status must be hit, clear, or unsure (got ${s.status}).`);
}
for (const id of Object.keys(dbs)) if (!breakers.some((d) => d.id === id)) errors.push(`${id} is not a deal-breaker in criteria.md.`);
const ov = data.override ?? null;
if (ov && (!["Pursue", "Park", "Drop"].includes(ov.verdict) || !String(ov.reason ?? "").trim())) {
  errors.push('override must be null, or { "verdict": "Pursue" | "Park" | "Drop", "reason": "<why>" }.');
}
if (errors.length) fail(`${errors.length} error(s) in ${relative(root, scoresPath)}:\n  ${errors.join("\n  ")}`);

// --- Compute ---
const rows = criteria.map((c) => ({ ...c, ...scores[c.id], points: (c.weight * scores[c.id].score) / totalWeight }));
const total = Math.round(rows.reduce((s, r) => s + r.points, 0) * 100) / 100;
const band = bands.find((b) => total >= b.min).band;
const lowShare = Math.round((rows.filter((r) => r.confidence === "low").reduce((s, r) => s + r.weight, 0) / totalWeight) * 100);
const hits = breakers.filter((d) => dbs[d.id].status === "hit");
const unsure = breakers.filter((d) => dbs[d.id].status === "unsure");

let verdict = band;
const caps = [];
if (hits.length) {
  verdict = "Drop";
  caps.push(`Deal-breaker hit: ${hits.map((d) => `${d.id} ${d.name}`).join("; ")} → Drop.`);
}
if (verdict === "Pursue" && unsure.length) {
  verdict = "Park";
  caps.push(`Unsure deal-breaker: ${unsure.map((d) => d.id).join(", ")} → Park until resolved.`);
}
if (verdict === "Pursue" && lowShare > lowCap) {
  verdict = "Park";
  caps.push(`Low-confidence weight ${lowShare}% is over the ${lowCap}% cap → Park until the evidence improves.`);
}
const final = ov ? ov.verdict : verdict;

// --- Report ---
const lines = [
  `# Score result — ${data.idea_id}${data.title ? ` ${data.title}` : ""}`,
  "",
  `Made by \`scripts/score.mjs\` from \`${relative(root, scoresPath)}\`. Do not edit by hand.`,
  "",
  "| ID | Criterion | Weight | Score | Confidence | Points | Findings |",
  "|---|---|---|---|---|---|---|",
  ...rows.map((r) => `| ${r.id} | ${r.name} | ${r.weight} | ${r.score} | ${r.confidence} | ${r.points.toFixed(2)} | ${(r.findings ?? []).join(", ") || "-"} |`),
  "",
  "| ID | Deal-breaker | Status |",
  "|---|---|---|",
  ...breakers.map((d) => `| ${d.id} | ${d.name} | ${dbs[d.id].status} |`),
  "",
  `- **Weighted score:** ${total.toFixed(2)} / 5`,
  `- **Band:** ${band} (Pursue ≥ ${bands[0].min}, Park ≥ ${bands[1].min})`,
  `- **Low-confidence weight:** ${lowShare}% (cap ${lowCap}%)`,
  ...caps.map((c) => `- **Cap:** ${c}`),
  `- **Rule verdict:** ${verdict}`,
  ...(ov ? [`- **Override by the user:** ${ov.verdict}. Reason: ${ov.reason}`] : []),
  `- **Final verdict:** ${final}`,
  ...(warnings.length ? ["", "## Warnings", ...warnings.map((w) => `- ${w}`)] : []),
  "",
];
writeFileSync(outPath, lines.join("\n"));
console.log(`Score ${total.toFixed(2)} · band ${band} · final verdict ${final}`);
for (const c of caps) console.log(`Cap: ${c}`);
for (const w of warnings) console.log(`Warning: ${w}`);
console.log(`Wrote ${relative(root, outPath)}.`);
