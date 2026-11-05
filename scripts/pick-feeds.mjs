#!/usr/bin/env node
// pick-feeds.mjs: choose which scout feeds to scan today.
// It reads the Feeds table in _config/scout-feeds.md and the past scans in
// stages/00_scout/output/feed-log.md. A feed is due when it is on and its cadence
// has passed since its last use. Due feeds rank by yield: the share of their ideas
// that the user kept at the scout gate. A new feed starts in the middle (0.50).
// The pick covers each category once if it can, then adds the best due feeds.
// It only prints. It changes no file.
// No dependencies. Needs Node.js 18 or newer.
//
// Usage (from the workspace root):
//   node scripts/pick-feeds.mjs [--max 8] [--market VN] [--category money,policy] [--today YYYY-MM-DD]
//   node scripts/pick-feeds.mjs --feeds <file> --log <file>     # read other files, for tests

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE =
  "Usage: node scripts/pick-feeds.mjs [--max 8] [--market VN,Global] [--category demand,money] [--today YYYY-MM-DD] [--feeds <file>] [--log <file>]";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const DAY = 86400000;
const CADENCE = { daily: 1, weekly: 7, monthly: 30, quarterly: 91, yearly: 365 };

function fail(msg) {
  console.error(`pick-feeds.mjs: ${msg}`);
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
const maxOpt = opt("--max");
const marketOpt = opt("--market");
const categoryOpt = opt("--category");
const todayOpt = opt("--today");
const feedsPath = resolve(opt("--feeds") ?? join(root, "_config", "scout-feeds.md"));
const logPath = resolve(opt("--log") ?? join(root, "stages", "00_scout", "output", "feed-log.md"));
if (args.length) fail(`unknown argument ${args[0]}\n${USAGE}`);
const max = maxOpt === null ? 8 : Number(maxOpt);
if (!Number.isInteger(max) || max < 1) fail(`--max needs a whole number of 1 or more (got "${maxOpt}").`);
const now = new Date();
const todayStr = todayOpt ?? new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10); // local date
if (!/^\d{4}-\d{2}-\d{2}$/.test(todayStr)) fail(`--today must look like 2026-11-05 (got "${todayStr}").`);
const today = new Date(`${todayStr}T00:00:00Z`);
const words = (s) =>
  (s ?? "")
    .split(/[,/]/)
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);
const rel = (p) => {
  const r = relative(root, p);
  return r.startsWith("..") ? p : r;
};

// Rows of the first table under "## <heading>" (or the first table in the file), keyed by the lower-case header.
function readTable(md, heading) {
  const lines = md.split(/\r?\n/);
  let i = 0;
  if (heading) {
    i = lines.findIndex((l) => l.trim().toLowerCase() === `## ${heading}`.toLowerCase());
    if (i === -1) return null;
    i++;
  }
  let header = null;
  const rows = [];
  for (; i < lines.length; i++) {
    const l = lines[i].trim();
    if (heading && /^##\s/.test(l)) break;
    if (!l.startsWith("|")) {
      if (header) break;
      continue;
    }
    const cells = l.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
    if (!header) {
      header = cells.map((c) => c.toLowerCase());
      continue;
    }
    if (cells.every((c) => /^:?-+:?$/.test(c))) continue;
    rows.push(Object.fromEntries(header.map((h, k) => [h, cells[k] ?? ""])));
  }
  return rows;
}

// --- The feed menu ---
if (!existsSync(feedsPath)) fail(`file not found: ${rel(feedsPath)}`);
const rows = readTable(readFileSync(feedsPath, "utf8"), "Feeds");
if (!rows?.length) fail(`no table under "## Feeds" in ${rel(feedsPath)}.`);
const missing = ["id", "on", "category", "market", "feed", "where", "cadence"].filter((k) => !(k in rows[0]));
if (missing.length) fail(`the Feeds table needs these columns: ${missing.join(", ")}.`);
const seen = new Set();
const feeds = rows.map((r) => {
  if (!/^FD\d{2,}$/.test(r.id)) fail(`"${r.id}" is not a feed ID like FD01.`);
  if (seen.has(r.id)) fail(`${r.id} is used twice in the Feeds table.`);
  seen.add(r.id);
  const cadence = r.cadence.toLowerCase();
  if (!(cadence in CADENCE)) fail(`${r.id}: cadence must be one of ${Object.keys(CADENCE).join(", ")} (got "${r.cadence}").`);
  return {
    id: r.id,
    on: /^y(es)?$/i.test(r.on),
    category: r.category.toLowerCase(),
    market: r.market,
    markets: words(r.market),
    feed: r.feed,
    where: r.where,
    cadence,
    days: CADENCE[cadence],
  };
});

// --- Past use, from the feed log ---
const stats = new Map(); // feed ID -> { last, ideas, kept }
if (existsSync(logPath)) {
  for (const r of readTable(readFileSync(logPath, "utf8"), null) ?? []) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date ?? "") || !r.feed) continue;
    const s = stats.get(r.feed) ?? { last: "", ideas: 0, kept: 0 };
    if (r.date > s.last) s.last = r.date;
    if (/^\d+$/.test(r.ideas ?? "") && /^\d+$/.test(r.kept ?? "")) {
      s.ideas += Number(r.ideas);
      s.kept += Number(r.kept);
    }
    stats.set(r.feed, s);
  }
}

// --- Filter, rank, pick ---
const wantMarkets = marketOpt ? words(marketOpt) : null;
const wantCategories = categoryOpt ? words(categoryOpt) : null;
if (wantCategories) {
  const known = new Set(feeds.map((f) => f.category));
  const bad = wantCategories.filter((c) => !known.has(c));
  if (bad.length) fail(`no feed has the category ${bad.join(", ")}. Categories: ${[...known].join(", ")}.`);
}
const pool = feeds.filter(
  (f) =>
    f.on &&
    (!wantMarkets || f.markets.includes("global") || f.markets.some((m) => wantMarkets.includes(m))) &&
    (!wantCategories || wantCategories.includes(f.category)),
);
for (const f of pool) {
  const s = stats.get(f.id);
  f.since = s?.last ? Math.round((today - new Date(`${s.last}T00:00:00Z`)) / DAY) : Infinity;
  f.ideas = s?.ideas ?? 0;
  f.kept = s?.kept ?? 0;
  f.yield = (f.kept + 1) / (f.ideas + 2); // smoothed: a new feed starts at 0.50
  f.due = f.since >= f.days;
}
const due = pool.filter((f) => f.due).sort((a, b) => b.yield - a.yield || b.since - a.since || a.id.localeCompare(b.id));
const picked = [];
for (const category of new Set(due.map((f) => f.category))) {
  if (picked.length >= max) break;
  picked.push(due.find((f) => f.category === category)); // the best due feed of each category first
}
for (const f of due) {
  if (picked.length >= max) break;
  if (!picked.includes(f)) picked.push(f);
}

// --- Print ---
const why = (f) =>
  `${f.since === Infinity ? "never used" : `last used ${f.since} days ago (${f.cadence})`} · yield ${f.yield.toFixed(2)}` +
  (f.ideas ? ` (kept ${f.kept} of ${f.ideas} ideas)` : "");
const filters = [wantMarkets && `market ${wantMarkets.join(", ")} + global`, wantCategories && `category ${wantCategories.join(", ")}`].filter(Boolean);
console.log(
  `Today: ${todayStr} · Feeds on${filters.length ? ` (${filters.join("; ")})` : ""}: ${pool.length} · Due: ${due.length} · Picked: ${picked.length} (max ${max})`,
);
if (!picked.length) {
  console.log("No feed is due. Name feeds under \"Extra feeds\" in stages/00_scout/input/lens.md to scan them anyway.");
  process.exit(0);
}
console.log("");
console.log("| ID | Category | Market | Feed | Where | Why |");
console.log("|---|---|---|---|---|---|");
for (const f of picked) console.log(`| ${f.id} | ${f.category} | ${f.market} | ${f.feed} | ${f.where} | ${why(f)} |`);
const overMax = due.filter((f) => !picked.includes(f));
const notDue = pool.filter((f) => !f.due);
if (overMax.length) console.log(`\nDue, but over the max: ${overMax.map((f) => f.id).join(", ")}`);
if (notDue.length) console.log(`Not due yet: ${notDue.map((f) => `${f.id} (${f.since} days ago, ${f.cadence})`).join(", ")}`);
