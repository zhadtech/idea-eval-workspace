# ICM brief format (Pursue only)

The brief is the input for `/icm-builder`. It answers the builder's fit check and its 8 discovery questions. Then the builder can skip most of its questions. Take the facts from this run's files. Do not invent new ones.

## Rules
- First, find the **repeatable workflow** inside the idea. A coffee franchise is not a workflow. "Make 4 local promo posts a week" or "check one new site location a week" is.
- If the idea holds more than one workflow, list them all. Mark the one to build first.
- Carry over the useful facts, such as the audience, competitors, prices, and the user's edge. They become the new workspace's `_config/` rules.

## Template

```markdown
# ICM brief — IDEA-NNN <title>

Source: `archive/IDEA-NNN-<slug>/` (verdict Pursue, score <x>)

## Workflows inside this idea
| # | Workflow | Repeats how often | Build first? |
|---|---|---|---|

## Fit check (for the first workflow)
- Sequential: …  Reviewable: …  Repeatable: …
- Parts that ICM does not fit, and what to use instead: …

## Answers to the builder's questions
1. One run produces: …
2. A run starts from: …
3. Steps today, and where they go wrong: …
4. Where a human must check or decide: …
5. What stays the same each run (audience, voice, format, rules): …
6. Tools, scripts, skills, or MCP servers per step: …
7. Where it runs: Claude Code, in the ICM_OS repo, in `<new-folder>/`
8. How often, and who runs it: …

## Seed rules for the new `_config/`
- Audience: … (F..)
- Competitors to beat, and how: … (F..)
- Prices and ways to earn: … (F..)
- The user's edge: …

## Kill criteria (copy from the verdict)
```
