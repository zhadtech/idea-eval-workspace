# Edit log

One line per human edit at a review gate:
`YYYY-MM-DD | run | stage | kind | detail | fixed in (no / file)`

Use one kind from this list, so that `scripts/edit-stats.mjs` can count it. For two kinds, write two lines.

| Kind | When |
|---|---|
| `fact` | The user corrected or added a fact |
| `scope` | The user changed the idea itself: price, budget, channel, or market |
| `variant` | The user picked another main variant, or reframed the idea |
| `assumption` | The user added, removed, or rewrote an assumption |
| `source` | The user added, removed, or doubted a source |
| `score:C01+` or `score:C01-` | The user raised or lowered a criterion's score (use its ID) |
| `breaker:D01` | The user changed a deal-breaker's status, or overrode it (use its ID) |
| `verdict` | The user overrode the verdict |
| `format` | Wording, layout, or length |

If the same kind of edit appears in 2 or more runs, stage 05 proposes a change to a stage contract, a reference file, or `_config/`. Run `node scripts/edit-stats.mjs` to see the repeats.

Score changes count too. If the user often raises or lowers the same criterion, the anchors in `_config/criteria.md` are wrong. Fix them there.

## Log
