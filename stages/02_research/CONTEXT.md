# Stage 02 — Research

**Job:** Test each assumption with sourced evidence: a market appraisal for this idea.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `../01_frame/output/frame.md` | Pitch, type, assumptions |
| 3 | `../../_config/idea-types.md` | "All types" and the section for this type only |
| 3 | `references/research-method.md` | Source rules, evidence strength, report format |

## Process
1. Plan: for each assumption, pick the checks and sources. Start with the 3 riskiest.
2. Search the web (WebSearch, WebFetch). Follow the limits in `research-method.md`.
3. Write each finding as `F01`…: assumption ID, claim, number, source ID, strength.
4. Fill each section of the report format, including the context scan.
5. Give each assumption a status: Supported, Mixed, Not supported, or Unknown.
6. Parallel work is allowed only for 8+ assumptions. Each sub-agent researches one group and writes only `output/parts/part-N.md`. Only you write `research.md` and `sources.json`. Renumber the findings and sources when you merge. Then delete `output/parts/`.

## Outputs
| File | Content |
|---|---|
| `output/research.md` | Findings, market appraisal, assumption status |
| `output/sources.json` | `[{ "id": "S01", "title", "url", "publisher", "date", "accessed" }]` |

## Verify
- [ ] Each finding has a source ID in `sources.json`, or is marked `(estimate)` or `(owner)`.
- [ ] Each assumption has a status and at least one finding, or the searches tried.
- [ ] No "strong" finding is based on one blog or on trend data more than 2 years old.
Write the results under `## Verify` at the end of `research.md`.

## Review gate
Show the Unknown and Not supported assumptions first. Ask the user to add local or personal knowledge. Log it as a finding with source `(owner)`. Wait for "go".
