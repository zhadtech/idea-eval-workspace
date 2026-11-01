# Stage 03 — Score

**Job:** Score the idea on each criterion from the evidence, then attack the result.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `../01_frame/output/frame.md` | Pitch, Assumptions |
| 4 | `../02_research/output/research.md` | All |
| 3 | `../../_config/criteria.md` | All |
| 3 | `../../_config/owner-profile.md` | Limits, Hard noes |
| 3 | `references/scoring-guide.md` | Method, file formats |

## Process
1. Check each deal-breaker (`D01`…): hit, clear, or unsure. Cite findings.
2. Score each criterion 1–5 with the anchors. Cite findings. Set the confidence.
3. Red team: write the strongest case against the idea. Then do a pre-mortem.
4. Upside: run the scale angles. Raise a score only if a finding supports it.
5. Write `scores.json`.
6. Run `node scripts/score.mjs`. Fix any errors that it reports. Copy its result into `scorecard.md` as it is. Do not change the number.

## Outputs
| File | Content |
|---|---|
| `output/scores.json` | Scores, confidence, findings, deal-breakers |
| `output/score-result.md` | Made by the script. Do not edit by hand. |
| `output/scorecard.md` | Reasons for each score, red team, pre-mortem, upside, script result |

## Verify
- [ ] Each criterion and deal-breaker in `criteria.md` is in `scores.json`.
- [ ] Each score of 4–5 or 1–2 cites at least one finding.
- [ ] The script ran with no errors. The scorecard shows its result as it is.
Write the results under `## Verify` at the end of `scorecard.md`.

## Review gate
Show the total, the band, and any caps. Ask the user which scores they disagree with. If they change a score, edit `scores.json` and run the script again. Wait for "go".
