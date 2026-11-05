# Retro format

## Rules
- **Friction** = anything that cost the user time or gave a wrong answer: an edit at a gate, an override, an Unknown assumption, a stale or missing source, a search with no result.
- Fix the cause, not the symptom. Symptom: "Research missed the co-packer price." Cause: "No step asks the user for quotes." Fix: "Stage 02 lists field checks for the user."
- Prefer the smallest change that would have prevented the friction.
- One proposal = one change in one file.
- Give each proposal a **scope**: `template` if it would help anyone who uses this workspace, `local` if it fits only this owner or market. `template` changes are worth copying back to the template repo.
- Do not repeat a proposal that `IMPROVEMENTS.md` shows as rejected, unless this run brings new evidence. Say what is new.
- A change to the **standard** needs the user's own words from this run as evidence. The standard = weights, bands, caps, deal-breakers, hard noes, and `owner-profile.md`.
- Scripts and past runs are out of scope here. Put a script idea under "Notes for a normal session".

## Proposal kinds
| Kind | Target |
|---|---|
| rule | A stage `CONTEXT.md`, or a file in a stage's `references/` |
| type | `_config/idea-types.md`: add or fix an idea type |
| anchor | `_config/criteria.md`: anchor text only |
| standard | Weights, bands, caps, or deal-breakers in `_config/criteria.md`, or `_config/owner-profile.md`. Quote the user. |
| source | `_config/sources.md`: add a source, fix a link, set `Checked`, add a dead end |
| feed | `_config/scout-feeds.md` |
| domain | `_config/domains.md`: add or fix a domain row, a barrier, or a domain note |
| lesson | `_config/lessons.md`: add, promote, or remove a lesson |

A **lesson** is a short rule that is not yet sure to hold in every run. Use `lesson` when the friction came up once. Use `rule` when it repeats, or when the fix is clearly right.

## Template

```markdown
# Retro — IDEA-NNN <title>

Run: <run-id> · Verdict: <verdict> <score> · Date: <date>

## What went well
- <keep doing this>

## Friction
| # | Stage | What happened | Evidence | Cause |
|---|---|---|---|---|
| 1 | 02 | The market size was 2024 data | F01, S01 | Report-seller pages show an old base year |

## Repeats across runs
<paste the output of `node scripts/edit-stats.mjs`>

## Proposals
| ID | Kind | Scope | Target | Change in one line | Evidence | Status |
|---|---|---|---|---|---|---|
| P01 | type | template | `_config/idea-types.md` | Add a food and drink product type | Frame note: no food type fits | proposed |

### P01 — <short title>
- **Target:** `<file>` › `<section>`
- **Scope:** `template` or `local`
- **Change:** <the exact text to add, or "replace X with Y">
- **Why:** <the friction it prevents, and the evidence>

## Lesson review
| Lesson | Used in this run? | Action: keep, promote, or remove | Why |
|---|---|---|---|

## Notes for a normal session
<script ideas and bigger changes that need testing>

## Verify
```
