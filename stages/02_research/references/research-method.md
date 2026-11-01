# Research method

## Source rules
- Prefer primary sources: official stats, company filings, platform data, price pages, and real reviews.
- Every number gets a source ID and a date. Use the newest data you can find.
- Put each source in `sources.json` once, then refer to it by ID.
- Write down searches that found nothing. Missing evidence is also a result.
- The user's own knowledge counts. Log it as a finding with source `(owner)`.
- Fermi estimates are allowed. Fermi = a rough calculation from known parts, like buyers × price × share. Show the math and mark it `(estimate)`.

## Evidence strength
| Strength | Meaning |
|---|---|
| strong | Primary data, or 2+ independent sources agree, and it is recent |
| medium | One good source, or older data, or an indirect sign |
| weak | One blog, an opinion, a forum post, or an estimate |

## Limits
- About 5 searches per assumption. Stop early when 2 strong sources agree.
- About 40 searches for the whole stage. If you need more, ask the user.
- Do not log in to sites or use paid tools unless the user says so.

## Report format

```markdown
# Research — IDEA-NNN <title>

## Findings
| ID | Assumption | Claim | Number | Source | Strength |
|---|---|---|---|---|---|
| F01 | A01 | … | … | S01 | strong |

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

## Verify
```
