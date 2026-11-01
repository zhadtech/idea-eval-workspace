# Idea Evaluation Workspace

An ICM workspace. It judges whether an idea is worth your time and money. ICM means Interpretable Context Methodology: folders and markdown files guide the AI, one stage at a time. You check each stage.

## The pipeline

```text
many ideas ─► 00_screen (optional) ─► shortlist
one idea  ─► 01_frame ─► 02_research ─► 03_score ─► 04_decide ─► Pursue / Park / Drop
                 ▲             ▲             ▲            ▲              │
             you check     you check     you check    you decide         ▼
                                                              Pursue: /icm-builder + icm-brief.md
```

| Stage | Claude makes | You check |
|---|---|---|
| 00_screen | A ranked shortlist from a batch of ideas | Which idea gets a full run |
| 01_frame | `frame.md`: the pitch, variants, and assumptions | Is this what you meant? |
| 02_research | `research.md`: sourced evidence and a market appraisal | Weak spots. Add what you know. |
| 03_score | `scorecard.md` and a script-made score | Change any score you disagree with |
| 04_decide | `verdict.md` (and `icm-brief.md` for Pursue) | The final call |

## First time
1. In this folder, run `claude`.
2. Type: `Set up this workspace.` Answer the questions (about 10 minutes).

## Each idea
1. Run `node scripts/new-run.mjs <short-name>`.
2. Paste the idea into `stages/01_frame/input/idea.md`.
3. Type: `Start the run.`
4. At each gate, open the output file. Edit it if you want. Then type `go`.
5. At the end, Claude logs the verdict in `ideas-register.md` and archives the run. Commit and push.

For many ideas at once: paste them into `stages/00_screen/input/ideas-batch.md` and type `Screen these ideas.`

## Save tokens
- Type `/clear` after each gate. The files keep the state. To continue, type `Continue.`

## Make it better over time
- Your standard lives in `_config/criteria.md`. Change the weights there, not in a run.
- If you change the same kind of score in two runs, `EDIT-LOG.md` shows it. Then fix the anchors.
- A Pursue becomes a new workspace: run `/icm-builder` and give it `icm-brief.md`.
