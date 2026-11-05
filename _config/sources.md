# Sources

Where fresh data lives, and how old data may be. Stages 00_scout and 02_research read this file. `scripts/check-sources.mjs` reads the "Freshness limits" table. Keep the table shape when you edit.

## Freshness limits
**Age** = today minus the end of the period that a number describes. That period is the **data period**. Example: a market size for 2024 has the data period `2024`. On 2026-11-05 it is about 22 months old.

| Kind | Max age (months) | Covers |
|---|---|---|
| live | 3 | Prices, listings, sold counts, shelf checks, app ranks, search trends, ads running now |
| news | 12 | News, trade press, company announcements |
| filing | 18 | Company results, annual reports, stock-exchange filings, earnings calls |
| official | 18 | Government statistics, customs data, central-bank data, reports by public bodies |
| survey | 24 | Consumer surveys and shopper panels |
| report | 18 | Market-research summaries (Statista, IMARC, Mordor, and similar) and data-firm reports |
| study | 120 | Academic and lab studies |
| law | - | Laws, decrees, and platform rules. No age limit, but check that the rule is still in force. |
| owner | - | The user's own knowledge, quotes, and field checks |

- Over the limit = **stale**. A stale source may still be used. Its finding is `medium` at most, and the claim says how old the number is.
- No date = **undated**. It counts as stale. Look for the date before you give up: the page footer, an "updated" line, the report cover, the PDF properties.
- `-` = no age limit.

## Where fresh data lives
Fastest first. Plan at least one source per assumption from rungs 1–5.

| Rung | Where | How fresh | Kind |
|---|---|---|---|
| 1 | Live pages: price pages, marketplace listings and sold counts, app ranks, Google Trends, ad libraries | Today | live |
| 2 | Field checks by the user: quotes, calls, shelf photos, test orders | This week | owner |
| 3 | Company results: quarterly reports, investor slides, earnings calls | Last quarter | filing |
| 4 | Government statistics: monthly and quarterly releases, customs data | Last month or quarter | official |
| 5 | News and trade press, searched by date | Last 90 days | news |
| 6 | Yearly reports by public bodies, shopper panels, and data firms: USDA FAS GAIN, e-Conomy SEA | Last year | official, survey, report |
| 7 | Market-research summaries: Statista, IMARC, Mordor, Grand View | 1–2 years behind | report |

**Why rung 7 is old:** report sellers put an old base year on their free pages. The new numbers sit behind a paywall. A search for "<market> market size" finds mostly these pages. Use them for a rough size only. Never let one be the only source of a strong finding.

## Search habits that find new data
- Put the period in the query: `2026`, `Q3 2026`, `H1 2026`, or `tháng 10/2026` (Vietnamese for "October 2026").
- Search in the market's language as well as in English.
- Name the kind of source: `quarterly results`, `báo cáo tài chính quý 3` (Vietnamese for "Q3 financial report"), `site:gov.vn`, `filetype:pdf`.
- Search news by date. If the search tool has a fresh or deep mode, use it for prices, recent numbers, and news.
- Many live pages need JavaScript: Google Trends, Shopee, TikTok Creative Center, ad libraries. A fetch tool often gets an empty page. Use a browser tool if one is connected. Read only. Never log in.
- A news article that quotes a number is a lead. Find the original: the company report, the statistics release, or the data firm's page. Cite that.

## Info map: where the best free info lives in any domain
Walk this list when a domain has no note in `_config/domains.md`, or when its note is thin.
1. **The regulator** and its public registry: licenses, product registrations, recalls, fines.
2. **The industry association:** member lists, yearly reports, conference programs.
3. **The 5 largest firms:** annual reports, investor slides, AGM papers, quarterly results. They describe their market for free, often better than paid reports. An **AGM** is the yearly shareholder meeting. Its papers state the plan for the year.
4. **Trade data:** imports and exports by HS code (the world's codes for traded goods): customs data, UN Comtrade (comtradeplus.un.org).
5. **Prices:** input and output price series from exchanges, ministries, and the World Bank.
6. **Tenders:** the public procurement portal shows what the state buys in this domain.
7. **Jobs:** job posts in the domain. What firms hire for shows where they invest.
8. **Insiders:** trade press, forums, groups, and channels of people who work in the domain.
9. **Research:** patents (patents.google.com) and papers (scholar.google.com) on new technology.

## Source library
Good places to start, by market. Stage 05 adds sources that worked, fixes broken ones, and records dead ends. `Checked` = the last date someone confirmed that the source works and is current. The template ships with a Global section and one example market, Vietnam.

TODO(setup): Add a section for each market you sell to.

### Global
| Source | Where | Kind | Gives | Updates | Checked |
|---|---|---|---|---|---|
| Google Trends | trends.google.com | live | Search interest and rising queries, by country | Daily | not yet |
| Meta Ad Library | facebook.com/ads/library | live | Ads running now, by keyword and country. Ads that run for months usually pay off. | Live | not yet |
| TikTok Creative Center | ads.tiktok.com/business/creativecenter | live | Trending hashtags, top ads, and top products, by country | Daily | not yet |
| App Store, Google Play | apps.apple.com, play.google.com | live | Ranks, ratings, reviews | Daily | not yet |
| SEC EDGAR | sec.gov/edgar | filing | Filings of US-listed firms: 10-K, 10-Q, 8-K | Daily | not yet |
| USDA FAS GAIN reports | fas.usda.gov/data | official | Free country reports on food, retail, and farm markets | New reports each week | 2026-11-05 |
| World Bank commodity prices (Pink Sheet) | worldbank.org/en/research/commodity-markets | official | Monthly prices: coffee, sugar, oil, metals | Monthly | not yet |
| Crunchbase News | news.crunchbase.com | news | Funding rounds: which problems investors pay to solve | Daily | not yet |

### Vietnam
| Source | Where | Kind | Gives | Updates | Checked |
|---|---|---|---|---|---|
| National Statistics Office (Cục Thống kê, Ministry of Finance; was GSO) | nso.gov.vn | official | Monthly socio-economic report: retail sales, CPI, tourism, trade | Monthly, early the next month | 2026-11-05 |
| Government news portal | en.baochinhphu.vn | official | Monthly economic figures in English; new policies | Daily | 2026-11-05 |
| USDA FAS GAIN: Vietnam | fas.usda.gov/data (search "Vietnam") | official | Free yearly reports: Coffee Annual (May–June), Retail Foods, Food Processing Ingredients | Yearly per topic | 2026-11-05 |
| Worldpanel by Numerator (was Kantar Worldpanel) | worldpanelbynumerator.com/asia-pacific/vietnam | survey | FMCG Monitor: home spending by category and channel. Free summaries. | Quarterly | 2026-11-05 |
| Metric.vn | metric.vn | report | E-commerce sales by category and brand on Shopee, TikTok Shop, Lazada, and Tiki | Monthly, quarterly | 2026-11-05 |
| Q&Me | qandme.net | survey | Free consumer surveys and trend reports | Monthly | 2026-11-05 |
| CafeF, Vietstock | cafef.vn, vietstock.vn | filing | Quarterly results of listed firms | Quarterly | not yet |
| Thư viện Pháp luật | thuvienphapluat.vn | law | Laws and decrees, with their status. "Còn hiệu lực" = still in force. | Daily | not yet |
| National legal database | vbpl.vn | law | Official legal texts | Daily | not yet |
| Vietnam Food Administration | vfa.gov.vn | law | Food-safety rules, product declarations | As needed | not yet |
| Vietnam Customs | customs.gov.vn | official | Import and export data | Monthly | not yet |
| Shopee, Lazada, Bách Hóa Xanh, WinMart | shopee.vn, lazada.vn, bachhoaxanh.com, winmart.vn | live | Prices, sold counts, reviews | Live | not yet |
| Business news | e.vnexpress.net, vneconomy.vn, vir.com.vn | news | Business and market news | Daily | not yet |
| Vietnam Briefing | vietnam-briefing.com | news | Law and tax changes, in plain English | Weekly | not yet |

### Dead ends
Searches that found nothing. Do not repeat them without a new angle.

| Date | Market | Search | Why it failed | Try instead |
|---|---|---|---|---|
