# Idea Evaluation Workspace (ICM)

## What this is
An ICM workspace. It turns one raw idea into a verdict: **Pursue**, **Park**, or **Drop**. It runs in 4 stages. An optional screen stage ranks many ideas first. The user checks the output at each review gate.

(00_screen) → 01_frame → 02_research → 03_score → 04_decide → `/icm-builder` (Pursue only)

## Map
- `CONTEXT.md` — which stage to run for a task.
- `_config/` — shared rules: `owner-profile.md` (the user, hard noes), `criteria.md` (criteria, weights, deal-breakers, bands), `idea-types.md` (research plan per idea type).
- `stages/NN_name/CONTEXT.md` — the contract for each stage.
- `scripts/` — `new-run.mjs` starts a run. `score.mjs` does the score math. `register.mjs` logs the verdict. `archive-run.mjs` moves a finished run.
- `ideas-register.md` — every idea judged so far.
- `PROGRESS.md` — current run. `EDIT-LOG.md` — edits across runs.
- `archive/` — finished runs. Do not read unless asked.

## Rules
1. Before you work in a stage, read its `CONTEXT.md`. Load only its Inputs.
2. Write only to the paths in the stage's Outputs table.
3. Stop at each review gate. Say what to check. Wait for "go".
4. The files on disk are the truth. Use the edited file, not your memory of it.
5. IDs: idea `IDEA-NNN`, assumption `A01`, finding `F01`, source `S01`, criterion `C01`, deal-breaker `D01`. Keep them the same in every stage. A finding names its assumption. A score names its findings.
6. Get the score and the band from `scripts/score.mjs`. Do not do the math.
7. Update `PROGRESS.md` after each step.
8. When the user edits an output, add a line to `EDIT-LOG.md`.
9. Stop servers and delete temp files that you started or made.
10. If `_config/` contains `TODO(setup)`, run `setup/questionnaire.md` first.
11. Be honest, not kind. The user has too many ideas and needs focus. A clear Drop is a good result.
12. A fact needs a source ID. Mark a guess as `(estimate)`.

## Talk style
Simple English. Short sentences. Active voice. One idea per sentence. Define a technical word the first time you use it.
