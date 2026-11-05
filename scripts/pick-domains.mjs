#!/usr/bin/env node
// pick-domains.mjs: choose which domains the scout studies today.
// A domain is an industry or sector, such as steel or education.
// It reads the Domains table in _config/domains.md and the history in
// stages/00_scout/output/domain-log.md. It picks three kinds of domain:
//   chosen: the ones you name with --domain (IDs or names). They come first.
//           A name that is not in the table is kept as a new domain.
//   hot:    the most signals in recent sweeps. Policy and money signals count double.
//           A signal loses half its weight every 90 days. A domain studied in the
//           last 30 days waits its turn.
//   wild:   a random domain that you do not know well (Familiar: no), and that no scan
//           studied in the last 60 days. The same seed gives the same pick.
//           The default seed is today's date.
// It only prints. It changes no file.
// No dependencies. Needs Node.js 18 or newer.
//
// Usage (from the workspace root):
//   node scripts/pick-domains.mjs [--domain DM07,pharma] [--hot 2] [--wild 1] [--seed <text>] [--today YYYY-MM-DD]
//   node scripts/pick-domains.mjs --domains <file> --log <file>     # read other files, for tests

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const USAGE =
  "Usage: node scripts/pick-domains.mjs [--domain DM07,pharma] [--hot 2] [--wild 1] [--seed <text>] [--today YYYY-MM-DD] [--domains <file>] [--log <file>]";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const DAY = 86400000;
const HALF_LIFE = 90; // days until a sweep signal counts half
const WINDOW = 365; // older sweep rows do not count
const HOT_REST = 30; // a domain studied this recently is not picked as hot
const WILD_REST = 60; // a domain studied this recently is not picked as wild
const STUDIED = new Set(["chosen", "hot", "wild"]);

function fail(msg) {
  console.error(`pick-domains.mjs: ${msg}`);
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
const domainOpt = opt("--domain");
const hotOpt = opt("--hot");
const wildOpt = opt("--wild");
const seedOpt = opt("--seed");
const todayOpt = opt("--today");
const domainsPath = resolve(opt("--domains") ?? join(root, "_config", "domains.md"));
const logPath = resolve(opt("--log") ?? join(root, "stages", "00_scout", "output", "domain-log.md"));
if (args.length) fail(`unknown argument ${args[0]}\n${USAGE}`);
const whole = (value, name, fallback) => {
  if (value === null) return fallback;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) fail(`${name} needs a whole number of 0 or more (got "${value}").`);
  return n;
};
const nHot = whole(hotOpt, "--hot", 2);
const nWild = whole(wildOpt, "--wild", 1);
const now = new Date();
const todayStr = todayOpt ?? new Date(now - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10); // local date
if (!/^\d{4}-\d{2}-\d{2}$/.test(todayStr)) fail(`--today must look like 2026-11-05 (got "${todayStr}").`);
const today = new Date(`${todayStr}T00:00:00Z`);
const seed = seedOpt ?? todayStr;
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

// A small seeded random number generator: the same seed always gives the same picks.
function hashText(text) {
  let h = 0x811c9dc5;
  for (const ch of text) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}
function seededRandom(a) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- The domain list ---
if (!existsSync(domainsPath)) fail(`file not found: ${rel(domainsPath)}`);
const md = readFileSync(domainsPath, "utf8");
const rows = readTable(md, "Domains");
if (!rows?.length) fail(`no table under "## Domains" in ${rel(domainsPath)}.`);
const missing = ["id", "on", "domain", "barrier", "familiar"].filter((k) => !(k in rows[0]));
if (missing.length) fail(`the Domains table needs these columns: ${missing.join(", ")}.`);
const withNote = new Set([...md.matchAll(/^###\s+(DM\d{2,})\b/gm)].map((m) => m[1]));
const seen = new Set();
const domains = rows.map((r) => {
  if (!/^DM\d{2,}$/.test(r.id)) fail(`"${r.id}" is not a domain ID like DM01.`);
  if (seen.has(r.id)) fail(`${r.id} is used twice in the Domains table.`);
  seen.add(r.id);
  const barrier = Number(r.barrier);
  if (!Number.isInteger(barrier) || barrier < 1 || barrier > 5) fail(`${r.id}: barrier must be a whole number 1-5 (got "${r.barrier}").`);
  return {
    id: r.id,
    name: r.domain,
    on: /^y(es)?$/i.test(r.on),
    familiar: /^y(es)?$/i.test(r.familiar),
    barrier,
    note: withNote.has(r.id),
    heat: 0,
    policy: 0,
    money: 0,
    market: 0,
    lastStudied: "",
  };
});
const byId = new Map(domains.map((d) => [d.id, d]));
const byName = new Map(domains.map((d) => [d.name.toLowerCase(), d]));

// --- Heat and rest, from the domain log ---
const daysAgo = (date) => Math.round((today - new Date(`${date}T00:00:00Z`)) / DAY);
const count = (v) => (/^\d+$/.test(v ?? "") ? Number(v) : 0);
if (existsSync(logPath)) {
  for (const r of readTable(readFileSync(logPath, "utf8"), null) ?? []) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date ?? "")) continue;
    const d = byId.get((r.domain ?? "").toUpperCase()) ?? byName.get((r.domain ?? "").toLowerCase());
    if (!d) continue; // a new domain that is not in the table yet
    const age = daysAgo(r.date);
    if (age < 0 || age > WINDOW) continue;
    const [p, m, k] = [count(r.policy), count(r.money), count(r.market)];
    d.heat += (2 * p + 2 * m + k) * 0.5 ** (age / HALF_LIFE);
    if (age <= HALF_LIFE) [d.policy, d.money, d.market] = [d.policy + p, d.money + m, d.market + k];
    if (STUDIED.has((r.mode ?? "").toLowerCase()) && r.date > d.lastStudied) d.lastStudied = r.date;
  }
}
const rested = (d, days) => !d.lastStudied || daysAgo(d.lastStudied) >= days;

// --- Chosen ---
const picks = [];
const taken = new Set();
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
for (const raw of (domainOpt ?? "").split(/[,/]/).map((s) => s.trim()).filter(Boolean)) {
  const key = raw.toLowerCase();
  const exact = byId.get(raw.toUpperCase()) ?? byName.get(key);
  let matches = exact ? [exact] : domains.filter((d) => new RegExp(`\\b${escape(key)}\\b`, "i").test(d.name));
  if (!matches.length) matches = domains.filter((d) => d.name.toLowerCase().includes(key));
  if (matches.length > 1) fail(`"${raw}" matches ${matches.map((d) => `${d.id} ${d.name}`).join("; ")}. Use an ID.`);
  if (matches.length === 1) {
    const d = matches[0];
    if (taken.has(d.id)) continue;
    taken.add(d.id);
    picks.push({ kind: "chosen", d, why: d.on ? "you named it" : "you named it (it is switched off)" });
  } else {
    picks.push({
      kind: "chosen",
      d: { id: "new", name: raw, barrier: "?", familiar: null, note: false },
      why: "not in the table yet: propose a row and a note at the gate",
    });
  }
}

// --- Hot ---
const hotPool = domains
  .filter((d) => d.on && !taken.has(d.id) && d.heat > 0 && rested(d, HOT_REST))
  .sort((a, b) => b.heat - a.heat || a.barrier - b.barrier || a.id.localeCompare(b.id));
for (const d of hotPool.slice(0, nHot)) {
  taken.add(d.id);
  picks.push({ kind: "hot", d, why: `heat ${d.heat.toFixed(1)}: ${d.policy} policy, ${d.money} money, ${d.market} market signals in 90 days` });
}

// --- Wild ---
const wildBase = domains.filter((d) => d.on && !taken.has(d.id) && rested(d, WILD_REST));
const strangers = wildBase.filter((d) => !d.familiar);
const wildPool = strangers.length ? strangers : wildBase;
const random = seededRandom(hashText(seed));
const bag = [...wildPool];
for (let i = 0; i < nWild && bag.length; i++) {
  const d = bag.splice(Math.floor(random() * bag.length), 1)[0];
  taken.add(d.id);
  const pool = `${wildPool.length} ${strangers.length ? "unfamiliar " : ""}domains not studied in ${WILD_REST} days`;
  picks.push({ kind: "wild", d, why: `random pick from ${pool}` });
}

// --- Print ---
console.log(`Today: ${todayStr} · Domains on: ${domains.filter((d) => d.on).length} · With sweep heat: ${domains.filter((d) => d.heat > 0).length} · Seed: "${seed}"`);
if (!picks.length) {
  console.log("Nothing picked. Name domains with --domain, or raise --hot or --wild.");
  process.exit(0);
}
const yesNo = (v) => (v === null ? "?" : v ? "yes" : "no");
console.log("");
console.log("| Pick | ID | Domain | Barrier | Familiar | Note | Why |");
console.log("|---|---|---|---|---|---|---|");
for (const p of picks) console.log(`| ${p.kind} | ${p.d.id} | ${p.d.name} | ${p.d.barrier} | ${yesNo(p.d.familiar)} | ${yesNo(p.d.note)} | ${p.why} |`);
console.log("");
if (nHot > hotPool.length) {
  console.log(`Only ${hotPool.length} domain(s) can be hot: the others have no sweep signals, or were studied in the last ${HOT_REST} days. Run the sweep first.`);
}
const hard = picks.filter((p) => typeof p.d.barrier === "number" && p.d.barrier >= 4).map((p) => p.d.id);
if (hard.length) console.log(`Barrier 4-5 (${hard.join(", ")}): ideas there must use a side door.`);
const noNote = picks.filter((p) => !p.d.note).map((p) => (p.d.id === "new" ? p.d.name : p.d.id));
if (noNote.length) console.log(`No domain note (${noNote.join(", ")}): walk the info map in _config/sources.md, then propose a note at the gate.`);
