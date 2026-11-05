# Stage 00 — Scout (optional)

**Job:** Find where the market moves. Sweep the state and the big money, study a few domains, and turn fresh signals into ideas that fit the owner. The ideas go to stage 00_screen.

It runs by hand, or on a schedule with nobody at the gate. It never starts another stage. It never touches `PROGRESS.md`, so it can run while an idea run is open.

## Inputs
| Layer | Path | Use |
|---|---|---|
| 4 | `input/lens.md` | Optional: the focus of this scan (markets, domains, categories, idea types, extra feeds) |
| 4 | `../../ideas-register.md` | Ideas already judged; Park ideas due for a revisit |
| 3 | `../../_config/scout-feeds.md` | Default lens, categories, feeds |
| 3 | `../../_config/domains.md` | How domains are picked, Barrier, the Domains table, and the notes for the picked domains only |
| 3 | `../../_config/owner-profile.md` | All |
| 3 | `../../_config/criteria.md` | Deal-breakers, Quick test |
| 3 | `../../_config/idea-types.md` | Type names only |
| 3 | `../../_config/sources.md` | "Search habits" and "Info map" only |
| 3 | `../../_config/lessons.md` | "00_scout" section only |
| 3 | `references/scout-method.md` | Sweep, waves, domains, info that is bought, side doors, entry cost, ranking, report format |

## Process
1. Set the lens. Use `input/lens.md` if it exists. If not, use the default lens in `scout-feeds.md`.
2. Run `node scripts/pick-feeds.mjs` with the lens: `--market`, `--category`, and `--max`. It prints today's date and the feeds that are due.
3. **Sweep:** follow the state and the big money, as in `scout-method.md`. Tag each signal with a domain. Add the `sweep` rows to `output/domain-log.md`.
4. **Pick domains:** run `node scripts/pick-domains.mjs` with the options from the lens (see `scout-method.md`).
5. **Study each picked domain:** explain it, map its best free info, check what info is bought, and run the other due feeds for it.
6. Write each signal as `SG01`…: feed, domain, what changed, the number, the date, the direction, and the source with its URL.
7. Group the signals into themes. Turn each theme into 1–3 ideas. Use a side door for barrier 4–5. Write the entry cost of each idea.
8. Check each idea: the deal-breakers first, then the 5 quick-test questions.
9. Rank the ideas. Drop any idea that is already in the register. List the Park ideas whose revisit date has passed.
10. Write the scan report. Add one row per feed used to `output/feed-log.md`. In `output/domain-log.md`, set the mode of each studied domain (`chosen`, `hot`, or `wild`), and add a row for a studied domain that had no sweep row. Leave `Kept` as `?`.

Budget: about 40 searches or page reads in all.

## Outputs
| File | Content |
|---|---|
| `output/scan-YYYY-MM-DD.md` | Lens, feeds, sweep, domains studied, signals, themes, ranked ideas, revisits due, proposed changes |
| `output/feed-log.md` | One row per feed per scan: date, feed, signals, ideas, kept |
| `output/domain-log.md` | One row per domain per scan: date, domain, mode, policy, money, market, ideas, kept |
| `../00_screen/input/ideas-batch.md` | After the gate only: the ideas that the user keeps, added at the end |
| `../../_config/scout-feeds.md` | After the gate only: the feed changes that the user accepts |
| `../../_config/domains.md` | After the gate only: the domain rows and notes that the user accepts |
| `../../IMPROVEMENTS.md` | After the gate only: one line per accepted change |

## Verify
- [ ] Each signal has a feed ID, a domain, a date, a number or a plain fact, and a source with a URL.
- [ ] No signal breaks the freshness rule in `scout-method.md`.
- [ ] Each studied domain has its 5-line explanation and at least one `info` signal.
- [ ] Each idea names 2+ signals, or is marked `thin`. Each idea has an entry cost.
- [ ] No idea in the top 5 hits a deal-breaker. Each barrier 4–5 idea uses a side door. No idea repeats one in the register.
- [ ] Lessons applied: list the IDs, or "none".
Write the results under `## Verify` at the end of the scan.

## Review gate
**Scheduled run** (the prompt says "scheduled mode"): stop after the scan. Leave `Status: waiting for review`. Ask nothing. Do not commit. If `_config/` still has `TODO(setup)`, do not scan: write a scan file that says "Setup is needed first", and stop.

**With the user:** show the top 5 ideas, one line each, with their domain and signals. Ask which ideas to keep. Then:
1. Add the kept ideas to the end of `../00_screen/input/ideas-batch.md`. Create the file if needed. Give each idea its domain, type, signal IDs, and the scan file name.
2. Fill in `Kept` in `output/feed-log.md` and `output/domain-log.md` for this scan.
3. Show the proposed changes: feeds, domain rows, and a note for each studied domain that has none. Apply only the ones that the user accepts. Log each one in `IMPROVEMENTS.md`, with its scope (`template` or `local`).
4. Set `Status: reviewed`. Offer to run stage 00_screen.
