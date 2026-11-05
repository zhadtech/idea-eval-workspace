# Stage 00 — Screen (optional)

**Job:** Rank a batch of raw ideas quickly, so only the best ones get a full run.

No web research here. It is a fast first cut from what is already known. Ideas from the scout bring their signals with them.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `input/ideas-batch.md` | Raw ideas, one per line or block |
| 4 | `../00_scout/output/scan-*.md` | Only the scans that the batch names: the signals behind scout ideas |
| 4 | `../../ideas-register.md` | Skip ideas already judged |
| 3 | `../../_config/criteria.md` | Deal-breakers, Quick test |
| 3 | `../../_config/owner-profile.md` | All |
| 3 | `../../_config/idea-types.md` | Type names only |
| 3 | `../../_config/domains.md` | The Domains table only |
| 3 | `../../_config/lessons.md` | "00_screen" section only |

## Process
1. Give each idea a batch ID: `Q01`, `Q02`, …. Merge duplicates.
2. Mark ideas already in the register as `seen: IDEA-NNN`.
3. Check the deal-breakers. A clear hit → Drop, with the `D` ID.
4. Answer the 5 quick-test questions: `y`, `n`, or `?`. For a scout idea, answer from its signals, and cite them.
5. Rank: ideas with no deal-breaker first, then most `y`, then fewest `?`.
6. Pick the top 3. Give one line on why, and the first question a full run must answer.

## Outputs
| File | Content |
|---|---|
| `output/shortlist-YYYY-MM-DD.md` | Table: ID, idea, domain (a `DM` ID), type (a T-ID from `idea-types.md`), deal-breaker, Q1–Q5, yes count, note. Then the top 3. |

## Verify
- [ ] Each idea in the batch appears once.
- [ ] Each Drop names a `D` ID.
- [ ] No ranking claim uses facts that need research. Those are marked `?`. Scout signals count as known.
- [ ] Lessons applied: list the IDs, or "none".
Write the results under `## Verify` at the end of the output.

## Review gate
Ask the user which idea gets a full run. Then run `node scripts/new-run.mjs <slug>` and copy the idea into `stages/01_frame/input/idea.md`. For a scout idea, copy its signals too. Wait for "go".
