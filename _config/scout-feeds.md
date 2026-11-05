# Scout feeds

The menu for stage 00_scout. A **feed** is a place that shows market change: searches, sales, money, rules, or new tools. Turn a feed on or off in the `On` column. `scripts/pick-feeds.mjs` reads the Feeds table. Keep its shape when you edit.

## Default lens
A **lens** is the focus of one scan. The scout uses this one when `stages/00_scout/input/lens.md` does not exist. A lens file uses the same six lines.
- **Markets:** TODO(setup): your markets, for example "VN, Global".
- **Domains:** auto (2 hot + 1 wild). Or `hot`, `random`, or names such as "steel, pharma". Add "+ wild" after names to add one wild domain. The domains are in `domains.md`.
- **Categories:** all
- **Idea types:** all in `idea-types.md`
- **Feeds per scan:** 8
- **Extra feeds:** none

## How the scout picks feeds
- A feed is **due** when it is on and its cadence has passed since its last use.
- Due feeds rank by **yield**: the share of their ideas that the user kept at the scout gate. A new feed starts in the middle.
- Each scan covers each category once if it can. Then it fills up with the best due feeds.
- To scan a feed that is off or not due, name it under "Extra feeds" in the lens.

## Categories
| Category | Question it answers |
|---|---|
| demand | What do people search for and buy more of? |
| pain | What do people complain about, or ask for? |
| money | Where is money moving: funding, results, sales data? |
| policy | Which new rules or statistics open or close a market? |
| funnel | Who pays to reach buyers now, and with what offer? |
| supply | What got cheaper, or newly possible? |
| info | What information do people pay for? Data that sells is a hint about data worth collecting. |

## Feeds
| ID | On | Category | Market | Feed | Where | Signal | Cadence |
|---|---|---|---|---|---|---|---|
| FD01 | yes | demand | Global | Google Trends: Trending now | trends.google.com/trending (set the country) | Searches that jumped in the last 1–7 days | weekly |
| FD02 | yes | demand | Global | Exploding Topics | explodingtopics.com | Topics with steady growth over months | monthly |
| FD03 | yes | demand | VN | Shopee and TikTok Shop best sellers | shopee.vn; TikTok Shop (search a category, sort by sales) | Products with high and rising sold counts | weekly |
| FD04 | yes | demand | Global | Etsy and Gumroad best sellers | etsy.com, gumroad.com/discover | Digital products that sell: prices, review counts | monthly |
| FD05 | yes | demand | Global | App Store and Google Play top charts | apps.apple.com, play.google.com (by country) | Apps that climb the charts | weekly |
| FD06 | no | demand | US | Amazon Movers & Shakers | amazon.com/gp/movers-and-shakers | Products with the biggest jump in sales rank in 24 hours | weekly |
| FD07 | no | demand | Global | SteamDB trends | steamdb.info | Games that gain players and followers | monthly |
| FD08 | yes | pain | Global | Reddit requests | reddit.com/search: "is there an app", "I would pay for", "how do you automate" | Jobs that people want done, and say they would pay for | weekly |
| FD09 | yes | pain | Global | Bad reviews of the leaders | 1–2 star reviews on app stores, Amazon, Etsy | Gaps that the top products leave open | monthly |
| FD10 | yes | pain | VN | Vietnamese forums | voz.vn, tinhte.vn | Local complaints and requests | monthly |
| FD11 | yes | money | Global | Funding news | news.crunchbase.com, techcrunch.com | Which problems investors pay to solve | weekly |
| FD12 | yes | money | SEA, VN | Southeast Asia deal news | e27.co, techinasia.com (free headlines) | Funding and buyouts in Vietnam and the region | weekly |
| FD13 | yes | money | VN | Quarterly results of listed firms | cafef.vn, vietstock.vn | Which consumer segments grow or shrink | quarterly |
| FD14 | yes | money | VN | E-commerce sales data | metric.vn, qandme.net | Sales by category and platform | monthly |
| FD15 | yes | money | SEA, VN | e-Conomy SEA report | economysea.withgoogle.com | Size and growth of the digital economy, by country and sector | yearly |
| FD16 | no | money | US | US filings and earnings | sec.gov/edgar, company investor pages | Segment growth at platforms such as Shopify, Etsy, Meta, Amazon | quarterly |
| FD17 | yes | policy | VN | New laws and decrees | thuvienphapluat.vn, chinhphu.vn | New rules that open or close a market | weekly |
| FD18 | yes | policy | VN | Monthly socio-economic report | nso.gov.vn, en.baochinhphu.vn | Retail sales, tourism, CPI, by month | monthly |
| FD19 | yes | policy | Global | USDA FAS GAIN reports | fas.usda.gov/data | Country reports on food, retail, and farm markets | monthly |
| FD20 | no | policy | US | Federal Register | federalregister.gov | New US rules, by agency and topic | monthly |
| FD21 | yes | funnel | Global | Meta Ad Library | facebook.com/ads/library (search a keyword, set the country) | Who pays for ads now. Ads that run for months usually make money. | weekly |
| FD22 | yes | funnel | Global | TikTok Creative Center | ads.tiktok.com/business/creativecenter | Trending hashtags, top ads, and top products, by country | weekly |
| FD23 | yes | funnel | Global | Product Hunt | producthunt.com | New products, and which ones people vote for | weekly |
| FD24 | no | funnel | Global | Affiliate marketplaces | ClickBank marketplace, accesstrade.vn | Offers that pay out and sell | monthly |
| FD25 | no | funnel | Global | Kickstarter and Indiegogo | kickstarter.com/discover | Pre-orders: demand with money behind it | monthly |
| FD26 | yes | supply | Global | AI model and tool releases | huggingface.co (trending), AI company news pages | New abilities that make a product cheap to build | weekly |
| FD27 | no | supply | Global | Commodity prices | worldbank.org/en/research/commodity-markets | Input costs: coffee, sugar, oil, metals | monthly |
| FD28 | yes | money | Global | Big groups' plans and new units | Investor pages, news, and AGM papers of the 10–20 largest groups in the market (in Vietnam: the VN30 index; AGMs run April–June) | Where the biggest groups will put money this year | monthly |
| FD29 | yes | policy | Global | National plans and public investment | The government portal, ministry master plans, the public-investment plan, budget news | Sectors that the state will fund and build | monthly |
| FD30 | yes | info | Global | Market-research catalogs | researchandmarkets.com, mordorintelligence.com, imarcgroup.com (search the domain; read titles, prices, and tables of contents) | What buyers pay to know, and how much | monthly |
| FD31 | yes | info | Global | Data marketplaces | datarade.ai, aws.amazon.com/data-exchange, rapidapi.com | Datasets and data feeds for sale, by domain, with prices | monthly |
| FD32 | yes | info | Global | Freelance data and research gigs | upwork.com, fiverr.com, freelancer.com (search "<domain> data", "lead list", "market research") | What businesses pay people to collect | monthly |
| FD33 | yes | info | Global | Paid newsletters and groups | substack.com (category leaderboards), patreon.com | What experts sell, and how many people pay | monthly |
| FD34 | yes | info | Global | Trade and shipment data sellers | volza.com, panjiva.com, importgenius.com | Shipment data that importers and exporters buy | quarterly |
| FD35 | yes | demand | Global | Ahead markets | Best-seller lists and trend news from markets that are ahead of yours (translate them) | What sells there now may arrive here in 1–3 years | monthly |
