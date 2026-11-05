# Stage 05 — Learn

**Job:** Look back at the run that just ended. Turn its friction into small changes, so the next run goes better.

The workspace changes its own rules here, and only with the user's yes. Run this stage after every run. If nothing needs to change, say so in one line and go to the gate.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `../../PROGRESS.md` | Decisions |
| 4 | `../../EDIT-LOG.md` | This run's lines |
| 4 | `../01_frame/output/frame.md` | Verify, open issues |
| 4 | `../02_research/output/research.md` | Assumption status, Field checks, Searches with no result, Freshness, Open questions, Verify |
| 4 | `../02_research/output/freshness.md` | Errors, warnings, stale and undated sources |
| 4 | `../02_research/output/sources.json` | Sources that gave good data |
| 4 | `../03_score/output/scorecard.md` | Low-confidence scores, Verify |
| 4 | `../04_decide/output/verdict.md` | Decision, override, "What would change this verdict" |
| 3 | `../../_config/lessons.md` | All |
| 3 | `../../IMPROVEMENTS.md` | The last 20 lines: recent changes and rejected proposals |
| 3 | `references/retro-format.md` | Rules, proposal kinds, template |

## Process
1. Run `node scripts/edit-stats.mjs`. It lists the kinds of edits that repeat across runs, and any score drift.
2. List the friction in this run: each user edit or correction, each override, each Unknown assumption, each search with no result, each freshness error or warning, each open question from autopilot, and each Verify caveat.
3. Find the cause of each item. Ask: would a rule, a source, an idea type, or a lesson have prevented it? If it was a one-off, say so and move on.
4. Write proposals `P01`…, at most 5. Each proposal is one change in one file, with the exact text and a scope (`template` or `local`). Name the evidence: the run, and the finding, source, or edit-log line. Follow the rules in `retro-format.md`.
5. Each repeat from step 1 needs a rule proposal, or a one-line reason why not.
6. Review the lessons. Count the ones this run applied: each stage's Verify names them. Propose to promote a lesson used in 2+ runs into its stage. Propose to remove a lesson not used in the last 5 runs.
7. Put good new sources and new dead ends into one `source` proposal for `_config/sources.md`. Put what this run learned about its domain into one `domain` proposal for `_config/domains.md`.
8. Write `output/retro.md`.

## Outputs
| File | Content |
|---|---|
| `output/retro.md` | What went well, friction, repeats, proposals, lesson review |
| A file named in an accepted proposal: `_config/*.md`, `stages/*/CONTEXT.md`, or `stages/*/references/*.md` | After the gate only: the exact accepted change |
| `../../_config/lessons.md` | After the gate only: accepted lessons, and the `used` counts |
| `../../IMPROVEMENTS.md` | After the gate only: one line per proposal, accepted or rejected |

## Verify
- [ ] Each proposal names one target file, the exact change, and its evidence.
- [ ] Each repeat from `edit-stats.mjs` has a rule proposal, or a reason why not.
- [ ] No proposal edits a script or a past run. A change to the standard quotes the user.
Write the results under `## Verify` at the end of `retro.md`.

## Review gate
Show each proposal in one line. Ask: "Which do you accept? For example: P01, P03. Or all, or none." After the answer:
1. Apply each accepted proposal exactly as written. Update the `used` counts in `_config/lessons.md`.
2. Add one line per proposal to `IMPROVEMENTS.md`, with its scope: accepted, or rejected with the user's reason.
3. Mark each proposal in `retro.md` as accepted or rejected.
4. Run `node scripts/archive-run.mjs`.
5. Suggest a commit message. For Pursue, say: "Run `/icm-builder` and give it `archive/<run-id>/04_decide/output/icm-brief.md`."
