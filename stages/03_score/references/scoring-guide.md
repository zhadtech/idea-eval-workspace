# Scoring guide

## How to score
- Use the anchors in `criteria.md`. A 2 or a 4 falls between two anchors.
- Score the main variant from `frame.md`, not the best possible version.
- No evidence means a 3 at most, with `low` confidence.
- **Confidence:** `high` = strong findings. `medium` = medium findings, or strong but indirect. `low` = weak findings, estimates, or none.

## Bias checks (do these before you finish)
- "I would use it" is not demand. Look for people who already pay.
- Excitement is not evidence. Is the score backed by a finding?
- A big market does not mean you can reach it. Score what the user can reach.
- Already done by others? That is normal. Ask: is there a gap, a new audience, or a better workflow?

## Red team
Write the 3 strongest reasons this idea fails, as a smart competitor or investor would say them.

## Pre-mortem
"It is 12 months later. The idea failed." List the 3 most likely causes. For each one, name the assumption (`A..`) behind it.

## Scale angles (upside)
Ask each question. Keep only the answers that a finding supports.
- Another market, language, or country?
- Sell to businesses (B2B) as well as people?
- Sell the data, the workflow, or the tool, not only the output?
- One more way to earn from the same output?
- What would make it 10× bigger with the same hours?

## `scores.json` format

```json
{
  "idea_id": "IDEA-001",
  "title": "Faceless study-guide channel for SQL pros",
  "type": "T3",
  "scores": {
    "C01": { "score": 4, "confidence": "medium", "findings": ["F01", "F04"] }
  },
  "deal_breakers": {
    "D01": { "status": "clear", "findings": ["F02"], "note": "" }
  },
  "override": null
}
```

- `score`: a whole number, 1–5. `confidence`: `high`, `medium`, or `low`.
- `status`: `hit`, `clear`, or `unsure`.
- `override`: `null`, or `{ "verdict": "Park", "reason": "…" }`. Only the user may set it.

## Scorecard format

```markdown
# Scorecard — IDEA-NNN <title>

## Deal-breakers
| ID | Status | Findings | Note |

## Scores
| ID | Criterion | Score | Confidence | Why (with findings) |

## Red team
## Pre-mortem
## Upside
## Script result
<paste score-result.md here, as it is>
## Verify
```
