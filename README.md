# Idea Evaluation Workspace

An ICM workspace. It judges whether an idea is worth your time and money. ICM means Interpretable Context Methodology: folders and markdown files guide the AI, one stage at a time. You check each stage.

**This repo is a blank template.** Copy it into a new repo of your own, and keep that copy private if your answers are personal. Your setup answers, runs, lessons, and logs then live in your copy. Changes that would help everyone are marked `template` in your `IMPROVEMENTS.md`, so you can send them back here.

## The pipeline

```text
market feeds ─► 00_scout (optional) ─► ideas ──┐
your ideas ────────────────────────────────────┴─► 00_screen (optional) ─► shortlist
one idea ─► 01_frame ─► 02_research ─► 03_score ─► 04_decide ─► 05_learn ─► Pursue / Park / Drop
               ▲            ▲             ▲            ▲            ▲             │
           you check    you check     you check    you decide   you accept        ▼
                                                                rule changes   Pursue: /icm-builder + icm-brief.md
```

| Stage | Claude makes | You check |
|---|---|---|
| 00_scout | A scan: fresh market signals turned into ranked ideas | Which ideas go to screening |
| 00_screen | A ranked shortlist from a batch of ideas | Which idea gets a full run |
| 01_frame | `frame.md`: the pitch, variants, assumptions, and field checks | Is this what you meant? |
| 02_research | `research.md`: sourced evidence, a market appraisal, and a freshness check | Weak spots and old data. Add what you know. |
| 03_score | `scorecard.md` and a script-made score | Change any score you disagree with |
| 04_decide | `verdict.md` (and `icm-brief.md` for Pursue) | The final call |
| 05_learn | `retro.md`: what went wrong, and up to 5 proposed rule changes | Accept or reject each change |

## First time
1. In this folder, run `claude`.
2. Type: `Set up this workspace.` Answer the questions (about 15 minutes).

## Each idea
1. Run `node scripts/new-run.mjs <short-name>`.
2. Paste the idea into `stages/01_frame/input/idea.md`.
3. Type: `Start the run.` For fewer stops, type: `Start the run on autopilot.` Then Claude stops only at the frame, the decision, and the learn gates.
4. At each gate, open the output file. Edit it if you want. Then type `go`.
5. At the end, Claude logs the verdict in `ideas-register.md`, runs the learn stage, and archives the run. Commit and push.

For many ideas at once: paste them into `stages/00_screen/input/ideas-batch.md` and type `Screen these ideas.`

## Let it find ideas for you
- Type: `Scout the market.` A scan has five steps:
  1. **Sweep:** where are the state and the biggest groups putting money? New laws, national plans, public investment, and the plans of the 10–20 largest groups. When both point at the same sector, that is a **wave**.
  2. **Pick domains:** a **domain** is an industry, such as steel, pharma, or pets. You can name them. If you do not, the scout takes 2 hot domains (the most policy and money signals) and 1 wild one (a random domain that you do not know well), to get you out of your information bubble.
  3. **Study each domain:** how money moves, where the best free info is, and what information people pay for. Paid data shows what is worth collecting. The scout never pays and never logs in.
  4. **Ideas:** in hard domains (steel, pharma, energy), the scout looks for side doors: data, tools, alerts, or training for the industry, not the core business. Each idea gets an entry cost: money, time, and lock-in.
  5. **Rank:** the best 5 ideas go to you. You keep the ones you like for screening.
- A **feed** is a place that shows market change, such as Google Trends, funding news, new laws, or a data marketplace. Turn feeds on or off in `_config/scout-feeds.md`, or let the scout pick the due ones. Feeds whose ideas you keep get picked more often.
- Domains live in `_config/domains.md`, with a barrier score (1–5) and notes on where the best info is. Mark the ones you already know as `Familiar: yes`, so the wild pick skips them.
- Give one scan a focus in `stages/00_scout/input/lens.md`, for example: "Markets: VN. Domains: steel, pharma + wild. Categories: all."
- On a schedule: in the Claude desktop app, ask: `Schedule the scout every Monday at 7:00 in this folder, in scheduled mode.` Each run writes `stages/00_scout/output/scan-<date>.md` and stops. Later, type `Review the scout scan.` Schedule it on one computer only.

## Fresh data
- `_config/sources.md` sets how old each kind of data may be. It also lists where fresh data lives, by market.
- `node scripts/check-sources.mjs` checks every source in a run. A strong finding cannot rest on old, undated, or unread pages.
- Free market-research pages (Statista, IMARC) always show a base year 1–2 years back. Fresher numbers come from company results, monthly statistics, sales data, and price pages.
- Some facts are not online at all: quotes, store terms, shelf prices. The frame and research stages list them as **field checks** for you. A phone call often beats 40 searches.
- A browser tool helps. Google Trends, Shopee, and ad libraries need JavaScript. Use Claude in Chrome, or the browser in the Claude desktop app.

## Save tokens
- Type `/clear` after each gate. The files keep the state. To continue, type `Continue.`

## Make it better over time
- After each run, stage 05 looks back. It reads your edits, the overrides, the old sources, and the dead ends. It proposes up to 5 small changes. You accept or reject each one.
- Accepted changes go into the stage contracts, `_config/`, or `_config/lessons.md`. `IMPROVEMENTS.md` logs each one, and the rejected ones too.
- `node scripts/edit-stats.mjs` shows the edits that repeat across runs. A repeat means a rule is wrong.
- The scout learns too. Feeds whose ideas you keep get picked more often, and each studied domain gets a note on where its best info is.
- Each change has a scope: `template` (helps anyone) or `local` (only you). Send the `template` ones back to the template repo.
- Your standard lives in `_config/criteria.md`. Weights, bands, and deal-breakers change only when you say so.
- A Pursue becomes a new workspace: run `/icm-builder` and give it `icm-brief.md`.
