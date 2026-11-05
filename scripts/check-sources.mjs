#!/usr/bin/env node
// check-sources.mjs: check how fresh the sources of a research run are.
// It reads the age limits from the "Freshness limits" table in _config/sources.md,
// the sources from stages/02_research/output/sources.json, and the findings table
// in the research.md next to it. It writes freshness.md next to sources.json.
// A strong finding may not rest on a stale, undated, or unread source.
// A medium finding may not rest only on search summaries.
// It exits with code 1 when it finds errors.
// No dependencies. Needs Node.js 18 or newer.
//
// Usage (from the workspace root):
//   node scripts/check-sources.mjs --limits     # today's date, and the oldest data each kind may use
//   node scripts/check-sources.mjs              # check the current run
//   node scripts/check-sources.mjs [sources.json] [--research <file>] [--out <file>] [--config <file>] [--today YYYY-MM-DD]

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE =
  "Usage: node scripts/check-sources.mjs [sources.json] [--limits] [--research <file>] [--out <file>] [--config <file>] [--today YYYY-MM-DD]";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const DAY = 86400000;
const MONTH = DAY * 30.4375;

function fail(msg) {
  console.error(`check-sources.mjs: ${msg}`);
  process.exit(1);
}

if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const opt = (name) => {
  const i = args.indexOf(name);
  if (i === -1) return null;
  if (!args[i + 1] || args[i + 1].startsWith("-")) fail(`${name} needs a value\n${USAGE}`);
  return args.splice(i, 2)[1];
};
const limitsOnly = args.includes("--limits");
if (limitsOnly) args.splice(args.indexOf("--limits"), 1);
const configPath = resolve(opt("--config") ?? join(root, "_config", "sources.md"));
const researchOpt = opt("--research");
const outOpt = opt("--out");
const todayOpt = opt("--today");
const unknown = args.find((a) => a.startsWith("-"));
if (unknown) fail(`unknown option ${unknown}\n${USAGE}`);
const sourcesPath = resolve(args[0] ?? join(root, "stages", "02_research", "output", "sources.json"));
const researchPath = resolve(researchOpt ?? join(dirname(sourcesPath), "research.md"));
const outPath = resolve(outOpt ?? join(dirname(sourcesPath), "freshness.md"));
const rel = (p) => {
  const r = relative(root, p);
  return r.startsWith("..") ? p : r || ".";
};

// --- Dates: whole days in UTC ---
const utc = (y, m0, d) => new Date(Date.UTC(y, m0, d)); // m0 = month 0-11
const endOfMonth = (y, m) => utc(y, m, 0); // m = month 1-12; day 0 of the next month is the last day of this one
const iso = (d) => d.toISOString().slice(0, 10);
const now = new Date();
const todayStr = todayOpt ?? new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10); // local date
if (!/^\d{4}-\d{2}-\d{2}$/.test(todayStr)) fail(`--today must look like 2026-11-05 (got "${todayStr}").`);
const today = new Date(`${todayStr}T00:00:00Z`);
if (Number.isNaN(today.getTime())) fail(`--today is not a real date: ${todayStr}`);

// The end of the latest period named in a text, or null. It reads "2026-10-15", "2026-10",
// "2026-Q2", "Q2 2026", "H1 2026", "2025/26", "2026/10", "10/2026", "Oct 2026", "2024 data", "about 2016–2018".
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
function periodEnd(value) {
  if (value === null || value === undefined) return null;
  let text = ` ${value} `;
  const ends = [];
  const take = (re, toDate) => {
    text = text.replace(re, (...m) => {
      const d = toDate(m);
      if (d && !Number.isNaN(d.getTime())) ends.push(d);
      return " "; // so that a bare-year match below cannot reuse these digits
    });
  };
  const monthOf = (letter, n) => (letter.toUpperCase() === "Q" ? n * 3 : n <= 2 ? n * 6 : 0);
  take(/(\d{4})-(\d{2})-(\d{2})/g, (m) => utc(+m[1], +m[2] - 1, +m[3]));
  take(/(\d{4})-(\d{2})(?!\d)/g, (m) => (+m[2] >= 1 && +m[2] <= 12 ? endOfMonth(+m[1], +m[2]) : null));
  take(/(\d{4})\s*-?\s*([QH])([1-4])\b/gi, (m) => (monthOf(m[2], +m[3]) ? endOfMonth(+m[1], monthOf(m[2], +m[3])) : null));
  take(/\b([QH])([1-4])\s*[/-]?\s*(\d{4})/gi, (m) => (monthOf(m[1], +m[2]) ? endOfMonth(+m[3], monthOf(m[1], +m[2])) : null));
  take(/(\d{4})\/(\d{2})(?!\d)/g, (m) => {
    const [y, two] = [+m[1], +m[2]];
    if (two === (y + 1) % 100) return utc(y + 1, 11, 31); // a split year, such as the crop year 2025/26
    return two >= 1 && two <= 12 ? endOfMonth(y, two) : null; // year/month, such as 2026/10
  });
  take(/(?<!\d)(\d{1,2})\/(\d{4})(?!\d)/g, (m) => (+m[1] >= 1 && +m[1] <= 12 ? endOfMonth(+m[2], +m[1]) : null));
  take(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{4})/gi, (m) =>
    endOfMonth(+m[2], MONTHS.indexOf(m[1].toLowerCase()) + 1),
  );
  take(/(?<!\d)((?:19|20)\d{2})(?!\d)/g, (m) => utc(+m[1], 11, 31));
  return ends.length ? new Date(Math.max(...ends.map((d) => d.getTime()))) : null;
}

// --- Age limits from _config/sources.md ---
if (!existsSync(configPath)) fail(`file not found: ${rel(configPath)}`);
const section = readFileSync(configPath, "utf8")
  .split(/^## /m)
  .find((s) => s.startsWith("Freshness limits"));
if (!section) fail(`${rel(configPath)} needs a "## Freshness limits" section.`);
const limits = new Map();
for (const m of section.matchAll(/^\|\s*([a-z]+)\s*\|\s*(\d+|-)\s*\|/gm)) limits.set(m[1], m[2] === "-" ? null : Number(m[2]));
if (!limits.size) fail('the "Freshness limits" table has no rows like "| live | 3 | … |".');
const kindList = [...limits.keys()].join(", ");

if (limitsOnly) {
  console.log(`Today: ${todayStr}`);
  console.log("Oldest allowed data, by kind. The data period must end on or after the date shown.");
  for (const [kind, max] of limits) {
    const line = max === null ? "no age limit" : `${String(max).padStart(3)} months -> ${iso(new Date(today.getTime() - max * MONTH))}`;
    console.log(`  ${kind.padEnd(8)} ${line}`);
  }
  console.log("Write these dates at the top of research.md. Put the year in your search queries.");
  process.exit(0);
}

// --- Sources ---
if (!existsSync(sourcesPath)) fail(`file not found: ${rel(sourcesPath)}`);
let list;
try {
  list = JSON.parse(readFileSync(sourcesPath, "utf8"));
} catch (e) {
  fail(`${rel(sourcesPath)} is not valid JSON: ${e.message}`);
}
if (!Array.isArray(list)) fail(`${rel(sourcesPath)} must be a JSON array of sources.`);

const errors = [];
const warnings = [];
const byId = new Map();
const sources = list.map((s, i) => {
  const id = typeof s?.id === "string" && s.id ? s.id : `entry ${i + 1}`;
  if (!/^S\d{2,}$/.test(id)) errors.push(`${id}: "id" must look like S01.`);
  if (byId.has(id)) errors.push(`${id}: this ID is used twice.`);
  const kind = s?.kind;
  if (!kind) errors.push(`${id}: "kind" is missing. Use one of: ${kindList}.`);
  else if (!limits.has(kind)) errors.push(`${id}: kind "${kind}" is not in the Freshness limits table. Use one of: ${kindList}.`);
  const accessed = typeof s?.accessed === "string" ? s.accessed : "";
  const accessedOk = /^\d{4}-\d{2}-\d{2}$/.test(accessed);
  if (!accessedOk) errors.push(`${id}: "accessed" must be a date like ${todayStr}.`);
  else if (accessed > todayStr) errors.push(`${id}: "accessed" (${accessed}) is after today (${todayStr}).`);
  if (!["full", "snippet"].includes(s?.read)) errors.push(`${id}: "read" must be "full" or "snippet".`);
  if (kind === "law" && !["yes", "no", "unknown"].includes(s?.in_force)) errors.push(`${id}: a law needs "in_force": "yes", "no", or "unknown".`);

  // Which date counts: the data period, then the publish date ("date" is the old field name),
  // then, for a live page only, the access date.
  let basis = null;
  let end = null;
  for (const value of [s?.data_period, s?.published ?? s?.date]) {
    const e = periodEnd(value);
    if (e) {
      [basis, end] = [String(value), e];
      break;
    }
  }
  if (!end && kind === "live" && accessedOk) [basis, end] = [`accessed ${accessed}`, new Date(`${accessed}T00:00:00Z`)];
  if (end && end.getUTCFullYear() > today.getUTCFullYear()) {
    warnings.push(`${id}: the period "${basis}" is in a future year. For a forecast, set data_period to its base year.`);
  }
  const age = end ? Math.max(0, (today - Math.min(end, today)) / MONTH) : null;
  const limit = limits.has(kind) ? limits.get(kind) : undefined;
  let status;
  if (limit === undefined) status = "no kind";
  else if (limit === null) status = "no limit";
  else if (age === null) status = "undated";
  else status = age > limit ? "stale" : "fresh";
  if (status === "undated") warnings.push(`${id}: no date found. Find the publish date or the period of the numbers. Until then it counts as stale.`);
  const row = { id, kind: kind ?? "-", basis, end, age, limit, status, read: s?.read ?? "-", inForce: s?.in_force, title: String(s?.title ?? "") };
  byId.set(id, row);
  return row;
});

// --- Findings table in research.md ---
function readFindings(md) {
  const lines = md.split(/\r?\n/);
  const start = lines.findIndex((l) => /^##\s+Findings\b/i.test(l.trim()));
  if (start === -1) return null;
  let header = null;
  const rows = [];
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i].trim();
    if (/^#{1,2}\s/.test(l)) break;
    if (!l.startsWith("|")) {
      if (rows.length) break;
      continue;
    }
    const cells = l.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
    if (!header) {
      header = cells.map((c) => c.toLowerCase());
      continue;
    }
    if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
    rows.push(cells);
  }
  if (!header) return [];
  const col = (name) => header.findIndex((h) => h.startsWith(name));
  const [iId, iSrc, iStr] = [col("id"), col("source"), col("strength")];
  if (iId === -1 || iSrc === -1 || iStr === -1) return [];
  return rows
    .filter((r) => /^F\d+/.test(r[iId] ?? ""))
    .map((r) => ({
      id: r[iId],
      sources: [...new Set([...(r[iSrc] ?? "").matchAll(/\bS\d{2,}\b/g)].map((m) => m[0]))],
      strength: ((r[iStr] ?? "").toLowerCase().match(/\b(strong|medium|weak)\b/) ?? [])[1] ?? null,
      ownerOrEstimate: /owner|estimate/i.test(r.join(" ")),
    }));
}

let findings = null;
if (!existsSync(researchPath)) {
  warnings.push(`${rel(researchPath)} not found, so the findings were not checked.`);
} else {
  findings = readFindings(readFileSync(researchPath, "utf8"));
  if (findings === null) warnings.push(`no "## Findings" section in ${rel(researchPath)}, so the findings were not checked.`);
  else if (!findings.length) warnings.push(`no finding rows (| F01 | … |) under "## Findings" in ${rel(researchPath)}.`);
}
const cited = new Set();
for (const f of findings ?? []) {
  const known = [];
  for (const sid of f.sources) {
    cited.add(sid);
    if (byId.has(sid)) known.push(byId.get(sid));
    else errors.push(`${f.id} cites ${sid}, which is not in sources.json.`);
  }
  if (!f.strength) {
    warnings.push(`${f.id}: no strength (strong, medium, or weak).`);
    continue;
  }
  if (f.strength === "strong") {
    for (const s of known) {
      if (s.status === "stale") errors.push(`${f.id} is strong, but ${s.id} is stale (${s.age.toFixed(1)} months; limit ${s.limit}). Find a newer source, or make it medium.`);
      if (s.status === "undated") errors.push(`${f.id} is strong, but ${s.id} has no date. Find the date, or make it medium.`);
      if (s.read === "snippet") errors.push(`${f.id} is strong, but ${s.id} was seen only in a search summary. Read the page, or make it weak.`);
      if (s.kind === "law" && s.inForce !== "yes") errors.push(`${f.id} is strong, but ${s.id} is a law that is not confirmed in force. Check it, or make it medium.`);
    }
  }
  if (f.strength === "medium" && known.length && known.every((s) => s.read === "snippet")) {
    errors.push(`${f.id} is medium, but each of its sources was seen only in a search summary. Read a page, or make it weak.`);
  }
  if (f.strength !== "weak" && !f.sources.length && !f.ownerOrEstimate) warnings.push(`${f.id} is ${f.strength} but names no source.`);
}
if (findings) for (const s of sources) if (!cited.has(s.id)) warnings.push(`${s.id} is not cited by any finding.`);

// --- Report ---
const count = (st) => sources.filter((s) => s.status === st).length;
const share = (n) => (sources.length ? `${Math.round((n / sources.length) * 100)}%` : "0%");
const withDate = sources.filter((s) => s.end);
const aged = withDate
  .filter((s) => typeof s.limit === "number" && s.end.getUTCFullYear() <= today.getUTCFullYear()) // skip forecast years
  .sort((a, b) => a.end - b.end);
const fullRead = sources.filter((s) => s.read === "full").length;
const strengthCount = (st) => (findings ?? []).filter((f) => f.strength === st).length;
const cell = (v) => String(v).replace(/\|/g, "/").replace(/\s+/g, " ").trim();
const statusLine =
  `Sources: ${sources.length}. Fresh ${count("fresh")} · stale ${count("stale")} · undated ${count("undated")} · no age limit ${count("no limit")}` +
  `${count("no kind") ? ` · no kind ${count("no kind")}` : ""}.`;
const summary = [
  `- ${statusLine}`,
  `- With a date: ${withDate.length} of ${sources.length} (${share(withDate.length)}). Read in full: ${fullRead} of ${sources.length} (${share(fullRead)}).`,
  ...(aged.length ? [`- Newest data: ${aged.at(-1).basis} (${aged.at(-1).id}). Oldest data: ${aged[0].basis} (${aged[0].id}).`] : []),
  ...(findings ? [`- Findings: ${findings.length}. Strong ${strengthCount("strong")} · medium ${strengthCount("medium")} · weak ${strengthCount("weak")}.`] : []),
  `- Errors: ${errors.length}. Warnings: ${warnings.length}.`,
];
const statusCell = (s) => (s.kind === "law" ? `no limit; in force: ${s.inForce ?? "?"}` : s.status);
const lines = [
  "# Freshness check",
  "",
  `Made by \`scripts/check-sources.mjs\` on ${todayStr} from \`${rel(sourcesPath)}\`. Do not edit by hand.`,
  "",
  "| ID | Kind | Data period | Age (months) | Limit | Status | Read | Title |",
  "|---|---|---|---|---|---|---|---|",
  ...sources.map(
    (s) =>
      `| ${s.id} | ${s.kind} | ${cell(s.basis ?? "-")} | ${s.age === null ? "-" : s.age.toFixed(1)} | ${s.limit === null ? "none" : (s.limit ?? "-")} | ${statusCell(s)} | ${s.read} | ${cell(s.title)} |`,
  ),
  "",
  "## Summary",
  ...summary,
  ...(errors.length ? ["", "## Errors", ...errors.map((e) => `- ${e}`)] : []),
  ...(warnings.length ? ["", "## Warnings", ...warnings.map((w) => `- ${w}`)] : []),
  "",
];
writeFileSync(outPath, lines.join("\n"));
console.log(statusLine);
for (const e of errors) console.log(`Error: ${e}`);
for (const w of warnings) console.log(`Warning: ${w}`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s). Wrote ${rel(outPath)}.`);
process.exit(errors.length ? 1 : 0);
