# Verdict format

`scripts/register.mjs` reads the front matter. Keep the keys and the `---` lines.

```markdown
---
id: IDEA-001
title: Faceless study-guide channel for SQL pros
type: T3
score: 3.92
verdict: Pursue
revisit: -
---

# Verdict — IDEA-001 <title>

**Decision:** Pursue / Park / Drop. Score 3.92 (band: Pursue).

## Why (3 bullets, each with a finding or score ID)

## What would change this verdict
<the 1–2 facts that would flip it>

## Next steps
<fill only the part for the decision>

### Pursue
- **First 3 actions, this week:** …
- **Kill criteria:** <the 30-day result that means stop, for example "under 100 email sign-ups">
- **Build the workflow:** run `/icm-builder` with `icm-brief.md`.

### Park
- **Revisit trigger:** <a date, or an event such as "when the tool gets an API">
- **What to watch:** …

### Drop
- **Salvage:** <a part, skill, or finding to reuse in another idea>

## Related ideas
<IDs from the register that this helps, blocks, or replaces>

## Verify
```

- `revisit`: a date (`YYYY-MM-DD`) for Park, or `-`.
- If the user overrode the script, add `**Override:** <reason>` under Decision.
