# Research method

## Source rules
- Prefer primary sources: official stats, company filings, platform data, price pages, and real reviews.
- Every number gets a source ID and its period, for example "€16.44m (2024)".
- Put each source in `sources.json` once, then refer to it by ID.
- Write down searches that found nothing. Missing evidence is also a result.
- The user's own knowledge counts. Log it as a finding with source `(owner)`.
- Fermi estimates are allowed. Fermi = a rough calculation from known parts, like buyers × price × share. Show the math and mark it `(estimate)`.

## Freshness
The rules live in `_config/sources.md`: the age limit for each kind of source, and the ladder of where fresh data lives.
- Start with `node scripts/check-sources.mjs --limits`. It prints today's date and the oldest data each kind may use.
- Plan from the top of the ladder down. Market-research summaries (rung 7) come last.
- Follow the search habits in `_config/sources.md`: the period in the query, the market's language, the kind of source.
- Open and read the page behind every number you use. A number seen only in a search summary is `weak`. Its source gets `"read": "snippet"`.
- For a law or a rule, check in an official legal database that it is still in force. Record `in_force` in `sources.json`.
- A stale or undated source may still be used. Its finding is `medium` at most. Say how old the number is in the claim.
- When the newest number is old, search once more for a newer sign: a company result, a monthly statistic, a sold count, or a price page.

## Field checks
Some facts are not online: supplier quotes, store terms, shelf prices in one city, what a distributor takes. Only the user can get them. They are often the freshest data of all.
- List them under `## Field checks for the owner`: the question, whom to ask, the number needed, and the assumption it tests.
- Rank them by how much the answer can change the score.
- When the user brings an answer, log it as a finding with source `(owner)`.

## Evidence strength
| Strength | Meaning |
|---|---|
| strong | Primary data, or 2+ independent sources agree. Each source is within its age limit, and you read the page. |
| medium | One good source, a stale or undated source, or an indirect sign |
| weak | One blog, an opinion, a forum post, an estimate, or a search summary only |

`scripts/check-sources.mjs` checks the parts of this table that a script can check: age, dates, and pages read.

## Limits
- About 5 searches per assumption. Stop early when 2 strong sources agree.
- At least 2 searches per assumption before you mark it Unknown. Make one of them in the market's language.
- About 40 searches for the whole stage. Page reads do not count. If you need more, ask the user.
- Do not log in to sites or use paid tools unless the user says so.

## `sources.json` format

```json
[
  {
    "id": "S01",
    "title": "Socio-economic situation, September 2026",
    "url": "https://www.nso.gov.vn/...",
    "publisher": "National Statistics Office of Vietnam",
    "kind": "official",
    "published": "2026-10-06",
    "data_period": "2026-09",
    "accessed": "2026-10-20",
    "read": "full"
  },
  {
    "id": "S02",
    "title": "Decree on food safety (example)",
    "url": "https://thuvienphapluat.vn/...",
    "publisher": "Government of Vietnam",
    "kind": "law",
    "published": "2018-02-02",
    "accessed": "2026-10-20",
    "read": "full",
    "in_force": "yes",
    "note": "Status 'Còn hiệu lực' on thuvienphapluat.vn, checked 2026-10-20"
  }
]
```

- `kind`: one kind from the "Freshness limits" table in `_config/sources.md`.
- `published`: when the page or the report came out: `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`. Write `unknown` if you cannot find it.
- `data_period`: the latest real period that the numbers describe. Examples: `2025`, `2026-Q2`, `2026-10`, `2025/26`. For a forecast, use its base year, not the forecast year. For a live page, leave it out: the access date counts.
- `accessed`: the date you read it, `YYYY-MM-DD`.
- `read`: `full` if you read the page, `snippet` if you saw only a search summary.
- `in_force`: for kind `law` only: `yes`, `no`, or `unknown`. Say in `note` where you checked.
- `note`: optional.

## Report format

```markdown
# Research — IDEA-NNN <title>

As of: <today>. Oldest allowed data: live <date>, news <date>, filing and official <date>, report <date>. (From `check-sources.mjs --limits`.)

## Findings
| ID | Assumption | Claim | Number | Source | Strength |
|---|---|---|---|---|---|
| F01 | A01 | … | … (2026-Q2) | S01 | strong |

## Field checks for the owner
| # | Question | Ask whom | Number needed | Tests | Can change |
|---|---|---|---|---|---|
| 1 | … | … | … | A03 | C02 |

## Market appraisal
### Demand
### Buyers and buying power
<who, how many, how much they spend; top-down and bottom-up size (estimate)>
### Competitors
| Name | What they do | Signs of revenue | Winning or losing | Why |
|---|---|---|---|---|
### Money
<prices, margins, costs per sale, platform fees>
### Cost to start
### Context scan
<season, weather, geography, culture, trends, law: each as a risk or an opportunity>
### Opportunities found
<gaps, underserved groups, timing windows>

## Assumption status
| ID | Status | Findings | Note |
|---|---|---|---|
| A01 | Supported / Mixed / Not supported / Unknown | F01, F03 | … |

## Searches with no result

## Freshness
<copy the "Summary" from `freshness.md`, as it is>

## Verify
```
