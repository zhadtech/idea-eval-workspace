# Scout method

A scan has five steps: sweep, pick domains, study each domain, turn signals into ideas, and rank. These rules are a start. Stage 05 and the scout gate improve them over time.

## What a signal is
A **signal** is a dated, sourced fact that something changed: demand, money, rules, costs, tools, or the price of information.
- Good: `<what> rose from <number> to <number> between <month> and <month> (<source>, read <date>)`. A number, a change, a date, and a page you read.
- Not a signal: an opinion, an old fact, a forecast with no base, or a trend that everyone knows with no new number.
- Each signal has a direction: `up`, `down`, or `new` (a rule, a tool, or a product that did not exist before).
- Each signal names its domain: a `DM` ID from `_config/domains.md`, a new domain name, or `none` if it spans many domains.
- **Fresh:** news and live data from the last 90 days. For statistics and company results: the latest release. Older facts can give context, but they are not signals.
- Read the page. A search summary is a lead, not a signal.

## 1. Sweep: follow the state and the big money
Do this first, before you pick domains. Use 4–6 searches, with the due policy and money feeds.
- **The state:** new laws and decrees, national and sector master plans, the public-investment plan, tax incentives, and pilot programs (FD17, FD29).
- **The big groups:** the plans, new units, and big projects of the 10–20 largest groups in the market (FD28). In Vietnam, start from the VN30 index. Their AGM papers (April–June) state the plan for the year.
- **The market:** one market-wide demand feed, for example FD01 or FD02.

Tag each signal with its domain. Then add one `sweep` row per domain to `output/domain-log.md`, with its number of policy, money, and market signals.

### Waves
In many markets, national plans and the largest groups move together. When both point at one domain within 12 months, money, roads, credit, and demand follow. Call it a **wave**.
- Do not fight a big group for its core business. Ride the edges: supply, serve, inform, or train the build-out.
- Ask who the wave leaves behind: small firms that must meet a new rule, workers who need new skills, buyers near the new projects, suppliers who must meet new standards.
- Write down the risks: plans slip or change; contracts may favor insiders; subcontractors may be paid late; one group's trouble can stall a whole wave.
- Stay clean. Drop any idea that needs favors or grey payments (hard noes, D03).

## 2. Pick the domains
Run `node scripts/pick-domains.mjs` after the sweep. Turn the lens into options:

| The lens says | Options |
|---|---|
| `auto` (the default) | `--hot 2 --wild 1` |
| `hot` | `--hot 3 --wild 0` |
| `random` | `--hot 0 --wild 3` |
| names, such as `steel, pharma` | `--domain steel,pharma --hot 0 --wild 0` |
| names `+ wild` | the same, with `--wild 1` |

## 3. Study each domain
About 8 searches or page reads per domain.
1. **Explain it in 5 lines** (always for a wild domain): how money moves, who pays whom, the big players, the barrier, and what is changing now.
2. **Map the best free info.** Use the domain note in `_config/domains.md` if there is one. If not, walk the info map in `_config/sources.md`.
3. **Check what info is bought** (below). Find at least one `info` signal per domain.
4. **Run the other due feeds with the domain as the search term,** for example the Meta Ad Library for "steel", or Reddit for "pharmacy software".

### What info is bought
Never pay, and never log in. Read the free parts: titles, prices, tables of contents, sample pages, and the sellers' own press releases.
- **Where:** market-research catalogs, data marketplaces, price services, shipment-data sellers, paid newsletters and groups, freelance gigs for data and research, expert networks, and tenders for studies (FD30–FD34).
- **Signs that people buy it:** a price, reviews, a subscriber or order count, client logos, many reports on the same topic, or job posts that ask for that data.
- **Write it as a signal** from an `info` feed: what is sold, the price, the sign of buyers, and where its data comes from.
- **The angle:** could the owner collect the same kind of data, or a narrower slice, from free and legal sources? Who would pay for it, and how often?
- **The legal line:** follow each site's terms and the personal-data law. Copying or reselling a paid report is piracy (D03).

## 4. From signals to ideas
1. **Theme:** 2+ signals that point the same way, from different feeds if possible. Name the theme in 5 words or fewer.
2. **Angles:** for each theme, ask:
   - Who gains from this change, and what will they pay for?
   - What can the owner build with their strengths that rides it?
   - Can it earn in the owner's preferred ways (`owner-profile.md`)?
   - Why now? What makes it possible or needed this year, and not 2 years ago?
   - Does it work in one market and not yet in another?
   - Is there information that people buy here, which the owner could collect?
3. **Idea line:** one sentence: who gets what, and how it earns. Add the domain and the type (a T-ID from `idea-types.md`).
4. **Edge:** one line on why this owner can win against the top 3 players.
5. **Thin:** an idea with only 1 signal is marked `thin`. Keep at most 2 thin ideas.

Prefer the angles that fit the owner over the biggest trends. A big trend that the owner cannot reach is not an opportunity for them.

### Side doors for hard domains
At barrier 4–5, an idea must use a side door:
- **Data:** track prices, tenders, shipments, permits, or capacity. Sell a dashboard, an alert, or a newsletter.
- **Tools:** software for a frequent, painful task in the industry: quotes, compliance forms, stock.
- **Watch services:** alerts on rule changes and tenders; plain-language summaries of new rules.
- **Content and training:** explain the industry to newcomers, workers, or small buyers. No investment or health advice without a license (D03).
- **Matching:** connect small buyers and sellers of scrap, surplus stock, or used equipment.
- **Supply the build-out:** find what big projects need that a small player can supply.

### Entry cost
For each idea, write the entry cost in three parts, each marked `(estimate)`:
- **Money:** what it costs before the first sale.
- **Time:** months to the first output, at the owner's hours per week.
- **Lock-in:** what makes it hard to stop: stock, machines, licenses, or contracts.

High lock-in means a high opportunity cost. The money and the hours cannot go to the next idea.

## 5. Leave the bubble
- Each scan studies one wild domain, unless the lens says otherwise.
- Look at one market that is ahead (FD35). What sells there now may arrive in 1–3 years.
- Read at least one source in a language that the owner does not read. Translate it.
- A wild idea may be thin. Keep at most one thin wild idea in the top 5.

## Quick test from signals
Answer the 5 questions in `_config/criteria.md` with `y`, `n`, or `?`. A `y` needs a signal or a fact in the owner profile. Write the signal ID next to it, for example `y (SG03)`. Do not search more for this. Stage 00_screen and the full run test it later.

## Ranking
1. Ideas with no deal-breaker first. A barrier 4–5 idea without a side door is rejected.
2. Then more independent signals (from different feeds).
3. Then more `y` in the quick test.
4. Then fewer `?`.
5. Then the lower entry cost.
Keep the top 5. List the rest in one line each.

## Report format

```markdown
# Scout scan — YYYY-MM-DD

Status: waiting for review
Mode: by hand / scheduled
Lens: <markets · domains · categories · idea types> (from `input/lens.md`, or the default)

## Feeds used
<the table from `pick-feeds.mjs`, plus a "Result" column: signals found, or "nothing new">

## Sweep
<waves found: the domain, its policy signals, and its big-money signals>

## Domains studied
<the table from `pick-domains.mjs`. Then, for each domain: the 5-line explanation, its best free info, and what info is bought>

## Signals
| ID | Feed | Domain | What changed | Number | Date | Direction | Source |
|---|---|---|---|---|---|---|---|
| SG01 | FD29 | DM11 | … | … | 2026-10 | new | Publisher, title, URL |

## Themes
| Theme | Signals | So what |
|---|---|---|

## Ideas (ranked)
| Rank | Idea (one line) | Domain | Type | Signals | Edge | Entry cost | Deal-breaker | Q1–Q5 | Note |
|---|---|---|---|---|---|---|---|---|---|
| 1 | … | DM07 | T1 | SG01, SG04 | … | money · time · lock-in (estimate) | none | y y ? y y | side door: data |

## Rejected
<ideas that hit a deal-breaker, lack a side door, or repeat the register, with the reason>

## Revisits due
<Park ideas in the register whose revisit date has passed, and any signal about them>

## Proposed changes
<feeds to add, switch off, or fix; domain rows and notes to add or fix>

## Verify
```
