# Idea Evaluation Workspace (ICM)

## What this is
An ICM workspace. It turns one raw idea into a verdict: **Pursue**, **Park**, or **Drop**. It runs in 4 stages, then a short learn stage that improves the workspace. Two optional stages come first: scout follows the state and the big money, studies a few domains, and turns fresh signals into ideas; screen ranks many ideas. The user checks the output at each review gate.

(00_scout) → (00_screen) → 01_frame → 02_research → 03_score → 04_decide → 05_learn → `/icm-builder` (Pursue only)

## Map
- `CONTEXT.md` — which stage to run for a task.
- `_config/` — shared rules: `owner-profile.md` (the user, hard noes), `criteria.md` (criteria, weights, deal-breakers, bands), `idea-types.md` (research plan per idea type), `sources.md` (freshness limits, source library, dead ends), `scout-feeds.md` (the scout's feeds and default lens), `domains.md` (industries the scout can study, with barriers and notes), `lessons.md` (lessons from past runs, by stage).
- `stages/NN_name/CONTEXT.md` — the contract for each stage.
- `scripts/` — `new-run.mjs` starts a run. `check-sources.mjs` checks how fresh the sources are. `score.mjs` does the score math. `register.mjs` logs the verdict. `edit-stats.mjs` finds edits that repeat across runs. `archive-run.mjs` moves a finished run. `pick-feeds.mjs` picks the scout's feeds. `pick-domains.mjs` picks the scout's domains.
- `ideas-register.md` — every idea judged so far.
- `PROGRESS.md` — current run. `EDIT-LOG.md` — human edits across runs. `IMPROVEMENTS.md` — every change the workspace made to its own rules.
- `archive/` — finished runs. Do not read unless asked.

## Rules
1. Before you work in a stage, read its `CONTEXT.md`. Load only its Inputs.
2. Write only to the paths in the stage's Outputs table.
3. Stop at each review gate. Say what to check. Wait for "go". **Autopilot:** if the user asks for it when the run starts, gates 02 and 03 do not stop. They write their questions under `## Open questions` and go on. Gates 01, 04, and 05 always stop. Write `Mode: autopilot` in `PROGRESS.md`.
4. The files on disk are the truth. Use the edited file, not your memory of it.
5. IDs: idea `IDEA-NNN`, assumption `A01`, finding `F01`, source `S01`, criterion `C01`, deal-breaker `D01`, signal `SG01`, feed `FD01`, domain `DM01`, lesson `L01`, proposal `P01`. Keep them the same in every stage. A finding names its assumption. A score names its findings.
6. Get the score and the band from `scripts/score.mjs`. Do not do the math. Get today's date and the age of sources from `scripts/check-sources.mjs`.
7. Update `PROGRESS.md` after each step.
8. When the user edits an output, add a line to `EDIT-LOG.md`, with a kind from its list.
9. Stop servers and delete temp files that you started or made.
10. If `_config/` contains `TODO(setup)`, run `setup/questionnaire.md` first.
11. Be honest, not kind. The user has too many ideas and needs focus. A clear Drop is a good result.
12. A fact needs a source ID and a date. Mark a guess as `(estimate)`.
13. Fresh data first. Follow the freshness limits in `_config/sources.md`. If you use old data, say how old it is.
14. The workspace changes its own rules only in stage 05, at the scout gate (feeds and domains only), or when the user asks directly. Each change needs the user's yes, and a line in `IMPROVEMENTS.md`.
15. A scheduled run never waits at a gate and never starts another stage. It writes its output, marks it `waiting for review`, and stops.

## Talk style
Simple English. Short sentences. Active voice. One idea per sentence. Define a technical word the first time you use it.
