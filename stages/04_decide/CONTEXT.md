# Stage 04 — Decide

**Job:** Turn the score into one decision and one concrete next step.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `../03_score/output/score-result.md` | Total, band, caps, final verdict |
| 4 | `../03_score/output/scorecard.md` | Red team, Pre-mortem, Upside |
| 4 | `../01_frame/output/frame.md` | Pitch, Variants |
| 4 | `../02_research/output/research.md` | Pursue only: market appraisal |
| 4 | `../../ideas-register.md` | Related ideas |
| 3 | `references/verdict-format.md` | Verdict template |
| 3 | `references/icm-brief-format.md` | Pursue only: brief template |

## Process
1. Use the script's final verdict. If the user overrides it, write the reason in `verdict.md`.
2. Write `verdict.md` from the template. Fill the part for Pursue, Park, or Drop.
3. Pursue only: write `icm-brief.md`. It is the input for `/icm-builder`.
4. Check the register for related ideas. Name any that this result helps or replaces.

## Outputs
| File | Content |
|---|---|
| `output/verdict.md` | Front matter, decision, reasons, next steps |
| `output/icm-brief.md` | Pursue only: answers for `/icm-builder` |

## Verify
- [ ] The front matter `verdict` and `score` match `score-result.md`, or the override has a reason.
- [ ] Pursue has kill criteria. Park has a revisit trigger. Drop has a salvage line.
Write the results under `## Verify` at the end of `verdict.md`.

## Review gate
Show the verdict in one line. Ask: "Pursue, Park, or Drop?" The decision is the user's. After "go":
1. `node scripts/register.mjs`
2. `node scripts/archive-run.mjs`
3. Suggest a commit message. For Pursue, say: "Run `/icm-builder` and give it `archive/<run-id>/04_decide/output/icm-brief.md`."
