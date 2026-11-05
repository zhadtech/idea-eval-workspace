# Stage 04 — Decide

**Job:** Turn the score into one decision and one concrete next step.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `../03_score/output/score-result.md` | Total, band, caps, final verdict |
| 4 | `../03_score/output/scorecard.md` | Red team, Pre-mortem, Upside, Open questions |
| 4 | `../01_frame/output/frame.md` | Pitch, Variants |
| 4 | `../02_research/output/research.md` | Open questions; for Pursue, also the market appraisal |
| 4 | `../../ideas-register.md` | Related ideas |
| 3 | `../../_config/lessons.md` | "04_decide" section only |
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
- [ ] Lessons applied: list the IDs, or "none".
Write the results under `## Verify` at the end of `verdict.md`.

## Review gate
On autopilot, first show the open questions from stages 02 and 03. If an answer changes a finding or a score, go back to stage 03 and run the script again.

Show the verdict in one line. Ask: "Pursue, Park, or Drop?" The decision is the user's. After "go":
1. `node scripts/register.mjs`
2. Go to stage 05: `stages/05_learn/CONTEXT.md`. Its gate archives the run.
