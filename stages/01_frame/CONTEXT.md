# Stage 01 — Frame

**Job:** Restate the idea so clearly that each part of it can be tested.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `input/idea.md` | The raw idea: sentences, notes, links |
| 3 | `../../_config/owner-profile.md` | All |
| 3 | `../../_config/idea-types.md` | Type names and "Frame" lines only |
| 3 | `references/frame-format.md` | Template and rules |

## Process
1. Read `idea.md`. If it has links, fetch them and summarize each in two lines.
2. Pick the main idea type (T1–T7) and any second type.
3. Fill the frame template: pitch, buyer, problem, offer, ways to earn, how it scales.
4. Find 2–4 variants: another audience, format, market, or scale. Pick the strongest one as the **main variant**. The rest go under "Variants".
5. List 6–12 assumptions, `A01`…. Each one must be true for the idea to work. Tag each one with the criterion it affects (`C01`–`C08`) and a way to test it.
6. Mark the 3 riskiest assumptions.

## Outputs
| File | Content |
|---|---|
| `output/frame.md` | The filled frame template |

## Verify
- [ ] Each assumption has a criterion ID and a test.
- [ ] Each criterion `C01`–`C08` has an assumption, or a one-line reason why not.
- [ ] The pitch fits in one sentence.
Write the results under `## Verify` at the end of the output.

## Review gate
Ask: Is this the idea you meant? Is the main variant right? What assumption is missing? Wait for "go".
