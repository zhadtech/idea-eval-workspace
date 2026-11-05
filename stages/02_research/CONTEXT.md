# Stage 02 — Research

**Job:** Test each assumption with fresh, sourced evidence: a market appraisal for this idea.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `../01_frame/output/frame.md` | Pitch, type, market, domain, assumptions |
| 3 | `../../_config/idea-types.md` | "All types" and the section for this type only |
| 3 | `../../_config/sources.md` | "Freshness limits", "Where fresh data lives", "Search habits", "Info map", the library section for this market, and "Dead ends" |
| 3 | `../../_config/domains.md` | The note for this idea's domain only, if it has one |
| 3 | `../../_config/lessons.md` | "02_research" section only |
| 3 | `references/research-method.md` | Source rules, freshness, field checks, evidence strength, formats |

## Process
1. Run `node scripts/check-sources.mjs --limits`. Write today's date and the oldest allowed dates at the top of `research.md`.
2. Plan: for each assumption, pick the checks and sources. Start with the 3 riskiest. Start from the source library for the idea's market and the note for its domain. If the domain has no note, walk the info map. Skip the dead ends.
3. Search the web (WebSearch, WebFetch). Follow the freshness rules and limits in `research-method.md`. Open and read each page that gives you a number.
4. Write each finding as `F01`…: assumption ID, claim, number with its period, source ID, strength.
5. Fill each section of the report format, including the context scan.
6. Give each assumption a status: Supported, Mixed, Not supported, or Unknown.
7. List the field checks: the facts that only the user can get. Include the field checks from `frame.md`.
8. Run `node scripts/check-sources.mjs`. Fix each error: find a newer source, read the page, or lower the strength. Run it again until it reports no errors. Copy its summary into the `## Freshness` section.
9. Parallel work is allowed only for 8+ assumptions. Each sub-agent researches one group and writes only `output/parts/part-N.md`. Only you write `research.md` and `sources.json`. Renumber the findings and sources when you merge. Then delete `output/parts/`.

## Outputs
| File | Content |
|---|---|
| `output/research.md` | Findings, field checks, market appraisal, assumption status, freshness |
| `output/sources.json` | One entry per source. The format is in `research-method.md`. |
| `output/freshness.md` | Made by `scripts/check-sources.mjs`. Do not edit by hand. |

## Verify
- [ ] Each finding has a source ID in `sources.json`, or is marked `(estimate)` or `(owner)`.
- [ ] Each assumption has a status and at least one finding, or the searches tried.
- [ ] `check-sources.mjs` ran with no errors. No `strong` finding rests on a stale, undated, or unread source.
- [ ] Each Unknown assumption that a person could answer has a field check.
- [ ] Lessons applied: list the IDs, or "none".
Write the results under `## Verify` at the end of `research.md`.

## Review gate
Show the Unknown and Not supported assumptions first. Then show the stale sources, and the field checks ranked by impact. Ask the user to add local or personal knowledge, or to do a field check now. Log each answer as a finding with source `(owner)`, then run `check-sources.mjs` again. Wait for "go".

On autopilot (rule 3 in `CLAUDE.md`), do not stop. Write these questions under `## Open questions` at the end of `research.md`, and go on to stage 03.
