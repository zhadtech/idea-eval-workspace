# Domains

A **domain** is an industry or sector, such as steel, education, or pets. Stage 00_scout studies a few domains in each scan. Stages 01 and 02 use the note for the idea's domain, if it has one. `scripts/pick-domains.mjs` reads the Domains table. Keep its shape when you edit.

## How the scout picks domains
- **Chosen:** the domains that you name in the lens. They come first. A domain that is not in the table is fine. The scout proposes a row and a note for it at the gate.
- **Hot:** the domains with the most fresh signals in the scout's opening sweep of policy, big money, and the market. Policy and money signals count double. A signal loses half its weight every 90 days. A domain studied in the last 30 days waits its turn.
- **Wild:** a random domain that you do not know well (`Familiar: no`), and that no scan studied in the last 60 days. It takes you out of your information bubble. Hard domains are welcome.
- **Default:** 2 hot and 1 wild. The lens can ask for another mix.

## Barrier
How hard it is to enter the domain's core business: money, time, and lock-in. **Lock-in** = what makes it hard to stop, such as stock, machines, licenses, or contracts.

| Barrier | Meaning |
|---|---|
| 1 | Anyone can start online this month |
| 2 | Needs a skill or a small budget |
| 3 | Needs some capital, a permit, or industry contacts |
| 4 | Needs big capital, licenses, or long sales cycles |
| 5 | Only big groups or the state play in the core |

At barrier 4–5, do not enter the core. Look for a **side door**: sell to the industry, serve it, inform it, or train its people. The side doors are in `stages/00_scout/references/scout-method.md`.

## Domains
TODO(setup): Mark the domains you already follow closely as `Familiar: yes`. Switch off any domain you never want (`On: no`).

| ID | On | Domain | Barrier | Familiar | Why the barrier |
|---|---|---|---|---|---|
| DM01 | yes | Farming and farm goods | 3 | no | Land, weather, middlemen, export standards |
| DM02 | yes | Food and drink brands | 3 | no | Food-safety permits, shelf space, distribution |
| DM03 | yes | Retail and e-commerce | 2 | no | Easy to start online; thin margins and platform fees |
| DM04 | yes | Logistics and delivery | 3 | no | Fleets and warehouses cost money; price wars |
| DM05 | yes | Textiles, garments, and footwear | 3 | no | Factories, buyer audits, export orders |
| DM06 | yes | Electronics and semiconductors | 5 | no | Huge capital, foreign giants, rare skills |
| DM07 | yes | Steel and metals | 5 | no | Huge plants, a few big mills, world prices |
| DM08 | yes | Chemicals, plastics, and packaging | 4 | no | Plants, safety rules, input prices |
| DM09 | yes | Construction and building materials | 4 | no | Capital, licenses, relationships, late payment |
| DM10 | yes | Real estate and property services | 4 | no | Land, credit, and permits; very cyclical |
| DM11 | yes | Energy and power | 5 | no | State control, licenses, long contracts |
| DM12 | yes | Mining and raw materials | 5 | no | State licenses, capital, environmental rules |
| DM13 | yes | Cars, motorbikes, and electric vehicles | 5 | no | Capital, dealer networks, a few big makers |
| DM14 | yes | Transport infrastructure: roads, rail, ports, airports | 5 | no | State projects and big contractors |
| DM15 | yes | Pharma and medical devices | 5 | no | Licenses, product registration, strict ad rules |
| DM16 | yes | Healthcare services | 4 | no | Licensed staff, trust, strict rules |
| DM17 | yes | Education and training | 2 | no | Trust and results matter; low cost online |
| DM18 | yes | Banking, insurance, and fintech | 5 | no | Licenses, capital rules, trust |
| DM19 | yes | Stock market and investing | 4 | no | Advice needs a license (D03); trust |
| DM20 | yes | Tourism and hospitality | 3 | no | Seasons; booking platforms take a cut |
| DM21 | yes | Media, entertainment, and games | 2 | no | Cheap to start; hits are rare |
| DM22 | yes | Software and IT services | 2 | no | Skills more than capital; crowded |
| DM23 | yes | AI and data | 2 | no | Skills; fast change; big platforms |
| DM24 | yes | Telecom, cloud, and data centers | 5 | no | Licenses and huge capital |
| DM25 | yes | Waste, recycling, and water | 3 | no | Permits, collection networks, local rules |
| DM26 | yes | Fashion and beauty | 2 | no | Cheap to start; brand and ads cost money |
| DM27 | yes | Pets | 1 | no | Easy to start; trust and reviews matter |
| DM28 | yes | Elderly care and the silver economy | 3 | no | Trust, staff, family buyers |
| DM29 | yes | Legal, tax, and business services | 3 | no | Advice needs licenses; trust |
| DM30 | yes | Government buying and public tenders | 4 | no | Paperwork, relationships, slow payment |
| DM31 | yes | Sports, fitness, and wellness | 2 | no | Easy to start; crowded |
| DM32 | yes | Home, furniture, and interiors | 2 | no | Bulky goods cost a lot to ship; design is the edge |
| DM33 | yes | Kids and parenting | 2 | no | Trust and safety rules |
| DM34 | yes | Climate, carbon, and sustainability reports | 3 | no | New rules; the buyers are big firms |

## Domain notes
One note per domain. The scout proposes a note at its gate for each studied domain that has none. Notes start short and grow with each scan. Without a note, use the info map in `_config/sources.md`.

Format:

```markdown
### DMxx <name>
- **Barrier:** <why, in one or two lines>
- **Best free info:** <regulator and registry, association, top firms' reports, trade data, prices, tenders, trade press>
- **Info that is bought:** <paid reports, data and price services, tools; with prices if known>
- **Side doors:** <angles for an outsider with little capital>
- **Traps:** <legal, cash, or cycle risks>
- **Checked:** <date, or "not yet">
```

### DM07 Steel and metals
- **Barrier:** A few large mills make most of the steel. A plant costs billions of dollars. Prices follow world markets, led by China.
- **Best free info:** the national steel association (in Vietnam: VSA, vsa.com.vn); quarterly results and AGM plans of the largest listed mills; trade-remedy cases on steel (in Vietnam: the Trade Remedies Authority, on moit.gov.vn); customs data for HS chapters 72–73 (HS = the world's codes for traded goods); iron ore prices (World Bank Pink Sheet); public-investment and building news, which drive demand.
- **Info that is bought:** steel price services (for example SteelOrbis, Fastmarkets, Mysteel, SMM); shipment data (for example Volza, Panjiva); lists of new building projects; credit checks on buyers.
- **Side doors:** price and tender alerts for small traders and builders; a marketplace for scrap, surplus stock, and used machines; quote tools for builders; plain-language summaries of trade-remedy rules for exporters.
- **Traps:** big price swings; builders often pay late; one trade case can change prices overnight.
- **Checked:** not yet

### DM15 Pharma and medical devices
- **Barrier:** A drug factory needs a GMP license (Good Manufacturing Practice). Each product needs a registration. Ads for medicines have strict rules. Health advice needs a license (D03).
- **Best free info:** the drug regulator's registry and news (in Vietnam: the Drug Administration of Vietnam, dav.gov.vn); public results of hospital drug tenders; reports and AGM plans of the largest listed drug makers and pharmacy chains; clinical-trial registries (clinicaltrials.gov, the WHO trial registry); customs data for HS chapter 30.
- **Info that is bought:** sales audits of pharmacies and hospitals (for example IQVIA); tender databases; drug price lists; services that track rule changes; lists of doctors and pharmacies.
- **Side doors:** tender tracking for suppliers; software for small pharmacies (stock and expiry dates); digests of rule changes for small distributors; price tools that give facts, not advice.
- **Traps:** anything that looks like medical advice (D03); patient data and privacy law; long sales cycles with hospitals.
- **Checked:** not yet
