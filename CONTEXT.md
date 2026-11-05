# Routing

| If the user wants to… | Read |
|---|---|
| Set up the workspace (first time) | `setup/questionnaire.md` |
| Find new ideas in market signals ("Scout the market") | `stages/00_scout/CONTEXT.md` |
| Scout one or more domains you choose ("Scout steel and pharma") | `stages/00_scout/CONTEXT.md`, with those names as the lens's domains |
| Run the scout on a schedule ("scheduled mode") | `stages/00_scout/CONTEXT.md`, then stop at its gate (rule 15) |
| Review a scout scan | The newest `stages/00_scout/output/scan-*.md` with `Status: waiting for review`, then the review gate in `stages/00_scout/CONTEXT.md` |
| Rank a batch of ideas quickly | `stages/00_screen/CONTEXT.md` |
| Judge one idea (new run) | Run `node scripts/new-run.mjs <slug>`, then `stages/01_frame/CONTEXT.md` |
| Judge one idea with fewer stops | The same, on autopilot (rule 3 in `CLAUDE.md`) |
| Add or check evidence | `stages/02_research/CONTEXT.md` |
| Check how fresh the sources are | Run `node scripts/check-sources.mjs` |
| Re-score after an edit | `stages/03_score/CONTEXT.md` |
| Make the decision | `stages/04_decide/CONTEXT.md` |
| Look back on a run and improve the workspace | `stages/05_learn/CONTEXT.md` |
| Continue a run | `PROGRESS.md`, then the stage it names |
| See past verdicts | `ideas-register.md` |
| See how the workspace changed | `IMPROVEMENTS.md` |

## Shared files
- `_config/owner-profile.md` — who the user is, their limits, and their hard noes.
- `_config/criteria.md` — criteria, weights, deal-breakers, verdict bands, quick test.
- `_config/idea-types.md` — research plan and revenue models for each idea type.
- `_config/sources.md` — freshness limits, where fresh data lives, the source library, dead ends.
- `_config/scout-feeds.md` — the scout's feeds, categories, and default lens.
- `_config/domains.md` — the domains (industries) the scout can study, their barriers, and notes on where the best info is.
- `_config/lessons.md` — lessons from past runs, by stage.
